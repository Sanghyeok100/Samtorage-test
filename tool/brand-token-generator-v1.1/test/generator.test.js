import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { contrastRatio, hexToOklch, normalizeHex, oklchToHex } from '../src/color.js';
import { generateBrandTokens, validateConfig } from '../src/generator.js';
import { renderCss, renderMarkdown } from '../src/output.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const close = (actual, expected, tolerance = 1e-6) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);

test('HEX normalization accepts shorthand and rejects alpha / malformed input', () => {
  assert.equal(normalizeHex(' #aBc '), '#AABBCC');
  assert.equal(normalizeHex('123e88'), '#123E88');
  for (const input of ['#1234', '#12345678', '#12', '#GGGGGG', 'red', '', null, 123]) {
    assert.throws(() => normalizeHex(input), /HEX/);
  }
});

test('WCAG reference ratios and the unrounded 4.5 boundary', () => {
  close(contrastRatio('#000000', '#FFFFFF'), 21);
  close(contrastRatio('#123E88', '#123E88'), 1);
  close(contrastRatio('#FF0000', '#FFFFFF'), 3.9984767707539985);
  close(contrastRatio('#777777', '#FFFFFF'), 4.478089453577214);
  assert.ok(contrastRatio('#777777', '#FFFFFF') < 4.5);
  assert.ok(contrastRatio('#767676', '#FFFFFF') > 4.5);
});

test('Known Oklab red reference and exact HEX round trips', () => {
  const red = hexToOklch('#FF0000');
  close(red.L, 0.6279553606);
  close(red.C, 0.2576833077);
  close(red.h, 29.2338852);
  for (const hex of ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#777777', '#123E88', '#FFCC00']) {
    assert.equal(oklchToHex(hexToOklch(hex)).hex, hex);
  }
  assert.equal(hexToOklch('#FFFFFF').C, 0);
});

test('Out-of-gamut colors reduce chroma rather than clip RGB channels', () => {
  const result = oklchToHex({ L: 0.9, C: 0.4, h: 30 });
  assert.equal(result.gamutReduced, true);
  assert.ok(result.mapped.C < 0.4);
  close(result.mapped.L, 0.9);
  close(result.mapped.h, 30);
  close(result.oklch.L, 0.9, 0.003);
  close(result.oklch.h, 30, 1);
});

test('Blue keeps source Default and expected darker state spacing', () => {
  const result = generateBrandTokens({ primary: '#123E88' });
  assert.equal(result.tokens[0].hex, '#123E88');
  assert.equal(result.solidShift, 0);
  close(result.tokens[0].oklch.L - result.tokens[1].oklch.L, 0.08, 0.004);
  close(result.tokens[0].oklch.L - result.tokens[2].oklch.L, 0.16, 0.004);
  assert.equal(result.tokens[3].text, '#000000');
});

test('Bright Primary is corrected for white text without collapsing the ramp', () => {
  const result = generateBrandTokens({ primary: '#FFCC00' });
  assert.notEqual(result.tokens[0].hex, '#FFCC00');
  assert.ok(result.solidShift < 0);
  assert.equal(new Set(result.tokens.slice(0, 3).map((token) => token.hex)).size, 3);
  close(result.tokens[0].oklch.L - result.tokens[1].oklch.L, 0.08, 0.006);
  assert.ok(result.warnings.some((warning) => warning.startsWith('Default changed')));
});

test('Auto uses consistent black text for yellow; black mode brightens dark colors', () => {
  const auto = generateBrandTokens({ primary: '#FFCC00', textColor: 'auto' });
  assert.equal(auto.solidText, '#000000');
  assert.equal(auto.tokens[0].hex, '#FFCC00');
  assert.ok(auto.tokens.slice(0, 3).every((token) => token.text === '#000000'));
  const black = generateBrandTokens({ primary: '#000000', textColor: 'black' });
  assert.ok(black.solidShift > 0);
  assert.ok(black.tokens[0].oklch.L > black.tokens[1].oklch.L);
  assert.ok(black.tokens[1].oklch.L > black.tokens[2].oklch.L);
});

test('Extreme endpoints, high thresholds, and Subtle adjustment remain passing', () => {
  for (const primary of ['#000000', '#FFFFFF', '#777777', '#FFFF00', '#0000FF', '#00FF00']) {
    for (const textColor of ['white', 'black', 'auto']) {
      for (const minContrast of [3, 4.5, 7, 21]) {
        const result = generateBrandTokens({ primary, textColor, minContrast, subtleLightness: 0.8 });
        for (const token of result.tokens) {
          const actual = contrastRatio(token.hex, token.text);
          assert.ok(actual >= minContrast, `${primary} / ${textColor} / ${token.name}: ${actual} < ${minContrast}`);
          assert.equal(token.contrast.selected, actual);
        }
      }
    }
  }
  const extreme = generateBrandTokens({ primary: '#000000' });
  assert.ok(extreme.warnings.some((warning) => warning.includes('identical HEX')));
  const subtle = generateBrandTokens({ primary: '#123E88', subtleLightness: 0.8, minContrast: 21 });
  assert.equal(subtle.tokens[3].hex, '#FFFFFF');
  assert.ok(subtle.tokens[3].lightnessShift > 0);
});

test('Reproducible color sweep audits actual HEX and both text alternatives', () => {
  let seed = 123456;
  for (let i = 0; i < 72; i += 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const primary = `#${(seed & 0xFFFFFF).toString(16).padStart(6, '0')}`;
    const textColor = ['white', 'black', 'auto'][i % 3];
    const minContrast = [4.5, 7][i % 2];
    const result = generateBrandTokens({ primary, textColor, minContrast });
    for (const token of result.tokens) {
      assert.ok(contrastRatio(token.hex, token.text) >= minContrast);
      assert.equal(token.passes.white, contrastRatio(token.hex, '#FFFFFF') >= minContrast);
      assert.equal(token.passes.black, contrastRatio(token.hex, '#000000') >= minContrast);
    }
    assert.deepEqual(generateBrandTokens({ primary, textColor, minContrast }), result);
  }
});

test('Invalid configs fail instead of silently changing policy', () => {
  for (const config of [null, [], { typo: true }, { minContrast: 2.9 }, { minContrast: 21.1 },
    { minContrast: '4.5' }, { minContrast: NaN }, { textColor: 'purple' }, { hoverDelta: 0 },
    { pressedDelta: 0.04 }, { subtleLightness: 0.5 }, { subtleChromaFactor: 1.1 }, { outputDir: '' }]) {
    assert.throws(() => validateConfig(config));
  }
});

test('CSS values and Markdown describe the same audited HEX values', () => {
  const result = generateBrandTokens({ primary: '#777777' });
  const css = renderCss(result);
  const markdown = renderMarkdown(result);
  for (const token of result.tokens) {
    const suffix = token.name === 'default' ? '' : `-${token.name}`;
    assert.ok(css.includes(`--brand-primary${suffix}: ${token.hex};`));
    assert.ok(markdown.includes(`| ${token.name} | ${token.candidateHex} | ${token.hex} |`));
  }
  assert.ok(css.includes('--brand-on-primary: #FFFFFF;'));
  assert.equal(renderCss(result), css);
});

function temporaryFolder(t) {
  const prefix = path.join(tmpdir(), 'brand-token-generator-test-');
  const folder = mkdtempSync(prefix);
  t.after(() => {
    // Delete only this test's verified, uniquely created temporary folder.
    assert.ok(path.resolve(folder).startsWith(path.resolve(prefix)));
    rmSync(folder, { recursive: true, force: true });
  });
  return folder;
}
const cli = (args, cwd = root) => spawnSync(process.execPath, [path.join(root, 'generate-brand-colors.js'), ...args], { cwd, encoding: 'utf8' });

test('CLI generates both files, protects existing output, and supports explicit force', (t) => {
  const folder = temporaryFolder(t);
  const args = ['#FFCC00', '--out', folder];
  const first = cli(args);
  assert.equal(first.status, 0, first.stderr);
  const cssPath = path.join(folder, 'brand-tokens.css');
  const mdPath = path.join(folder, 'brand-tokens.md');
  const css = readFileSync(cssPath, 'utf8');
  const md = readFileSync(mdPath, 'utf8');
  writeFileSync(path.join(folder, 'unrelated.txt'), 'leave me alone');
  const second = cli(['#123E88', '--out', folder]);
  assert.equal(second.status, 1);
  assert.match(second.stderr, /Refusing to replace/);
  assert.equal(readFileSync(cssPath, 'utf8'), css);
  assert.equal(readFileSync(mdPath, 'utf8'), md);
  const forced = cli(['#123E88', '--out', folder, '--force']);
  assert.equal(forced.status, 0, forced.stderr);
  assert.match(readFileSync(cssPath, 'utf8'), /--brand-primary: #123E88;/);
  assert.equal(readFileSync(path.join(folder, 'unrelated.txt'), 'utf8'), 'leave me alone');
});

test('CLI custom config path resolves output relative to config, not working directory', (t) => {
  const folder = temporaryFolder(t);
  const configPath = path.join(folder, 'custom.json');
  writeFileSync(configPath, JSON.stringify({ primary: '#abc', outputDir: 'tokens' }));
  const run = cli(['--config', configPath, '--text', 'auto', '--min-contrast', '7'], tmpdir());
  assert.equal(run.status, 0, run.stderr);
  assert.ok(existsSync(path.join(folder, 'tokens', 'brand-tokens.md')));
  assert.match(readFileSync(path.join(folder, 'tokens', 'brand-tokens.md'), 'utf8'), /Contrast target: \*\*7:1\*\*/);
});

test('CLI invalid inputs create no output and help needs no config', (t) => {
  const folder = temporaryFolder(t);
  const out = path.join(folder, 'not-created');
  for (const args of [['#GGGGGG'], ['--primary'], ['--unknown'], ['--min-contrast', 'NaN'], ['--text', 'purple'], ['#123E88', '--primary', '#FFFFFF']]) {
    const run = cli([...args, '--out', out]);
    assert.equal(run.status, 1);
    assert.ok(!existsSync(out));
  }
  const badConfig = path.join(folder, 'bad.json');
  writeFileSync(badConfig, '{ invalid JSON');
  assert.equal(cli(['--config', badConfig, '--out', out]).status, 1);
  assert.ok(!existsSync(out));
  const help = execFileSync(process.execPath, [path.join(root, 'generate-brand-colors.js'), '--help', '--config', badConfig], { encoding: 'utf8' });
  assert.match(help, /Usage:/);
});
