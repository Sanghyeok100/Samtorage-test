#!/usr/bin/env node
import { readFile, mkdir, lstat, writeFile, unlink, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateBrandTokens, validateConfig } from './src/generator.js';
import { renderCss, renderMarkdown } from './src/output.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const HELP = `Brand Token Generator

Usage:
  node generate-brand-colors.js "#123E88"
  npm run generate -- --primary "#FFCC00"

Options:
  --primary HEX         Override config Primary (3 or 6 HEX digits)
  --config FILE         Read JSON config (default: this utility's config.json)
  --text COLOR          Solid text: white, black, or auto (default: white)
  --min-contrast RATIO  Contrast target, 3 through 21 (default: 4.5)
  --out DIRECTORY      Output path, relative to your terminal directory
  --force              Replace the two existing generated files
  --help, -h           Show this help

Without --out, outputDir in the config is relative to the config file.
Quote HEX colors, especially in PowerShell. No package install is required.
`;

function parseArgs(args) {
  const options = {};
  const seen = new Set();
  const flags = { '--primary': 'primary', '--config': 'config', '--text': 'textColor', '--min-contrast': 'minContrast', '--out': 'out' };
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') { options.help = true; continue; }
    const key = arg === '--force' ? 'force' : flags[arg] ?? (!arg.startsWith('-') ? 'primary' : undefined);
    if (!key) throw new Error(`Unknown option: ${arg}. Use --help.`);
    if (seen.has(key)) throw new Error(`Option ${key} was supplied more than once.`);
    seen.add(key);
    if (key === 'force') { options.force = true; continue; }
    const value = flags[arg] ? args[++i] : arg;
    if (value === undefined || value.startsWith('--')) throw new Error(`Missing value for ${arg}.`);
    if (!value.trim()) throw new Error(`Empty value for ${arg}.`);
    options[key] = key === 'minContrast' ? Number(value) : value;
  }
  return options;
}

async function fileInfo(file) {
  try { return await lstat(file); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

async function saveOutputs(directory, files, force) {
  // Preflight both names before changing either file.
  for (const [name] of files) {
    const file = path.join(directory, name);
    const existing = await fileInfo(file);
    if (existing && (!force || !existing.isFile() || existing.isSymbolicLink())) {
      throw new Error(`Refusing to replace ${file}. ${force ? 'Target must be a regular file.' : 'Choose --out or use --force to replace generated files.'}`);
    }
  }
  await mkdir(directory, { recursive: true });
  if (!force) {
    const created = [];
    try {
      for (const [name, content] of files) {
        const file = path.join(directory, name);
        await writeFile(file, content, { encoding: 'utf8', flag: 'wx' });
        created.push(file);
      }
    } catch (error) {
      await Promise.allSettled(created.map((file) => unlink(file)));
      throw error;
    }
    return;
  }
  // Stage complete files before replacement. The two renames are not a transaction.
  const staged = [];
  try {
    for (const [name, content] of files) {
      const temporary = path.join(directory, `.${name}.${process.pid}.${Date.now()}.tmp`);
      await writeFile(temporary, content, { encoding: 'utf8', flag: 'wx' });
      staged.push([temporary, path.join(directory, name)]);
    }
    for (const [temporary, destination] of staged) await rename(temporary, destination);
  } finally {
    await Promise.allSettled(staged.map(([temporary]) => unlink(temporary)));
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) { console.log(HELP); return; }
  const configPath = path.resolve(args.config ?? path.join(root, 'config.json'));
  let input;
  try { input = JSON.parse(await readFile(configPath, 'utf8')); }
  catch (error) { throw new Error(`Could not read JSON config at ${configPath}: ${error.message}`); }
  // Validate the file even if CLI overrides would conceal an invalid value.
  const config = validateConfig(input);
  for (const key of ['primary', 'textColor', 'minContrast']) {
    if (args[key] !== undefined) config[key] = args[key];
  }
  const result = generateBrandTokens(config);
  const directory = args.out ? path.resolve(args.out) : path.resolve(path.dirname(configPath), result.config.outputDir);
  await saveOutputs(directory, [
    ['brand-tokens.md', renderMarkdown(result)],
    ['brand-tokens.css', renderCss(result)],
  ], args.force);
  console.log(`Primary ${result.primary}; contrast target ${result.config.minContrast}:1`);
  console.table(result.tokens.map((token) => ({
    state: token.name, hex: token.hex, text: token.text,
    contrast: `${token.contrast.selected.toFixed(4)}:1`, adjusted: token.adjusted ? 'yes' : 'no',
  })));
  for (const warning of result.warnings) console.warn(`Note: ${warning}`);
  console.log(`Saved ${path.join(directory, 'brand-tokens.md')}\nSaved ${path.join(directory, 'brand-tokens.css')}`);
}

main().catch((error) => { console.error(`Error: ${error.message}`); process.exitCode = 1; });
