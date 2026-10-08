import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { contrastRatio, hexToOklch } from '../src/color.js';
import { generateBrandTokens, validateConfig } from '../src/generator.js';
import { generatePalette, generateSecondary, PALETTE_LEVELS, PALETTE_TARGETS } from '../src/palette.js';
import { renderCss, renderMarkdown } from '../src/output.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function assertPalette(palette) {
  assert.deepEqual(palette.tones.map((tone) => tone.level), PALETTE_LEVELS);
  assert.equal(palette.tones.length, 11);
  assert.equal(new Set(palette.tones.map((tone) => tone.hex)).size, 11);
  assert.equal(palette.tones[0].hex, '#FFFFFF');
  assert.equal(palette.tones[10].hex, '#000000');
  assert.equal(palette.pairs.length, 21);
  assert.equal(palette.pairs.filter((pair) => pair.gap === 5).length, 6);
  for (let i = 0; i < 11; i += 1) {
    const tone = palette.tones[i];
    assert.equal(tone.contrast.white, contrastRatio(tone.hex, '#FFFFFF'));
    assert.ok(Math.abs(tone.contrast.white / PALETTE_TARGETS[i] - 1) < 0.012, `${tone.hex}: target mismatch`);
    if (i > 0) assert.ok(tone.contrast.white > palette.tones[i - 1].contrast.white);
    for (let j = i + 5; j < 11; j += 1) {
      const actual = contrastRatio(tone.hex, palette.tones[j].hex);
      assert.ok(actual >= 4.5, `${palette.sourceHex}: ${tone.level} / ${palette.tones[j].level} = ${actual}`);
    }
  }
  assert.ok(palette.pairs.every((pair) => pair.passes && pair.ratio >= 4.5));
}

test('Both palettes have 11 target-contrast tones and all 21 eligible pairs pass', () => {
  const result = generateBrandTokens({ primary: '#123E88' });
  assertPalette(result.palettes.primary);
  assertPalette(result.palettes.secondary);
  assert.equal(result.palettes.primary.sourceHex, '#123E88');
  assert.equal(result.primary, '#123E88');
  assert.notEqual(result.palettes.primary.tones[5].hex, '#123E88');
  assert.equal(result.tokens[0].hex, '#123E88');
});

test('Five steps refers to positions: exact-five pairs include 50/500 and 500/950', () => {
  const palette = generatePalette('#FFCC00');
  assert.deepEqual(palette.pairs.filter((pair) => pair.gap === 5).map(({ from, to }) => [from, to]),
    [[50, 500], [100, 600], [200, 700], [300, 800], [400, 900], [500, 950]]);
  assert.ok(contrastRatio(palette.tones[0].hex, palette.tones[1].hex) < 4.5);
});

test('Contrast guarantee holds for RGB-grid, saturated, neutral, and random seeds', () => {
  const seeds = new Set(['#000000', '#FFFFFF', '#777777', '#FFFF00', '#FF00FF', '#00FFFF', '#123E88', '#FFCC00']);
  for (const r of [0, 85, 170, 255]) {
    for (const g of [0, 85, 170, 255]) {
      for (const b of [0, 85, 170, 255]) seeds.add(`#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`);
    }
  }
  let state = 8741;
  for (let i = 0; i < 160; i += 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    seeds.add(`#${(state & 0xFFFFFF).toString(16).padStart(6, '0')}`);
  }
  for (const seed of seeds) assertPalette(generatePalette(seed));
});

test('Secondary auto is deterministic, permits hue offsets, and preserves manual HEX', () => {
  const auto = generateSecondary('#123E88');
  assert.equal(auto.sourceHex, '#56498B');
  assert.equal(auto.mode, 'auto');
  assert.deepEqual(generateSecondary('#123E88'), auto);
  const alternate = generateSecondary('#123E88', 'auto', -30);
  assert.notEqual(alternate.sourceHex, auto.sourceHex);
  const originalHue = hexToOklch('#123E88').h;
  const rotatedHue = hexToOklch(auto.sourceHex).h;
  assert.ok(Math.abs(rotatedHue - originalHue - 30) < 2);
  const manual = generateBrandTokens({ primary: '#FFCC00', secondary: '#abc' });
  assert.equal(manual.secondary.mode, 'manual');
  assert.equal(manual.secondary.sourceHex, '#AABBCC');
  assert.equal(manual.palettes.secondary.sourceHex, '#AABBCC');
  for (const token of manual.secondary.tokens) assert.ok(contrastRatio(token.hex, token.text) >= 4.5);
});

test('Near-neutral Primary has an identified Secondary fallback', () => {
  for (const primary of ['#000000', '#FFFFFF', '#808080']) {
    const result = generateBrandTokens({ primary });
    assert.equal(result.secondary.neutralFallback, true);
    assert.equal(result.secondary.hueOffset, null);
    assert.ok(result.warnings.some((warning) => warning.includes('near-neutral')));
    assertPalette(result.palettes.secondary);
  }
});

test('Text target does not weaken the fixed five-step 4.5 rule or hide AAA failures', () => {
  const low = generateBrandTokens({ primary: '#123E88', minContrast: 3 });
  assert.equal(low.palettes.primary.minPairContrast, 4.5);
  assertPalette(low.palettes.primary);
  const high = generateBrandTokens({ primary: '#123E88', minContrast: 7 });
  const middle = high.palettes.primary.tones[5];
  assert.equal(middle.passes.selected, false);
  assert.ok(high.warnings.some((warning) => warning.includes('Some palette tones')));
  assert.ok(renderCss(high).includes('FAIL at 7:1 target'));
  assertPalette(high.palettes.primary);
});

test('The CSS exports actual audited colors and preserves existing Primary state names', () => {
  const result = generateBrandTokens();
  const css = renderCss(result);
  const declarations = [...css.matchAll(/^\s+(--[\w-]+):\s+(#[\dA-F]{6});/gm)];
  const values = new Map(declarations.map((match) => [match[1], match[2]]));
  assert.equal(values.size, declarations.length, 'duplicate CSS variable names');
  assert.equal(values.get('--brand-primary-source'), '#123E88');
  assert.equal(values.get('--brand-secondary-source'), result.secondary.sourceHex);
  assert.equal(values.get('--brand-primary'), '#123E88');
  assert.equal(values.get('--brand-primary-hover'), '#00286C');
  assert.equal(values.get('--brand-primary-pressed'), '#001745');
  for (const [family, palette] of Object.entries(result.palettes)) {
    for (const tone of palette.tones) {
      assert.equal(values.get(`--brand-${family}-${tone.level}`), tone.hex);
      assert.equal(values.get(`--brand-on-${family}-${tone.level}`), tone.text);
    }
    for (let i = 0; i < 11; i += 1) {
      for (let j = i + 5; j < 11; j += 1) {
        assert.ok(contrastRatio(values.get(`--brand-${family}-${PALETTE_LEVELS[i]}`), values.get(`--brand-${family}-${PALETTE_LEVELS[j]}`)) >= 4.5);
      }
    }
  }
  const markdown = renderMarkdown(result);
  assert.ok(markdown.includes('Primary 11-tone palette'));
  assert.ok(markdown.includes('Secondary 11-tone palette'));
  assert.ok(markdown.includes('| 50 | 500 | 5 |'));
  assert.ok(markdown.includes('한국어 설명'));
});

test('Invalid Secondary settings and attempts to silently alter the approved gap fail', () => {
  for (const config of [{ secondary: null }, { secondary: '#1234' }, { secondaryHueOffset: '30' },
    { secondaryHueOffset: NaN }, { secondaryHueOffset: -181 }, { secondaryHueOffset: 181 }, { paletteGap: 4 }]) {
    assert.throws(() => validateConfig(config));
  }
  assert.throws(() => generatePalette('#123E88', 22));
});

test('CLI handles manual Secondary, hue override, and invalid values without output', (t) => {
  const prefix = path.join(tmpdir(), 'brand-palette-cli-test-');
  const directory = mkdtempSync(prefix);
  t.after(() => {
    assert.ok(path.resolve(directory).startsWith(path.resolve(prefix)));
    rmSync(directory, { recursive: true, force: true });
  });
  const run = (args) => spawnSync(process.execPath, [path.join(root, 'generate-brand-colors.js'), ...args], { encoding: 'utf8', cwd: root });
  const out = path.join(directory, 'manual');
  const manual = run(['#123E88', '--secondary', '#008577', '--out', out]);
  assert.equal(manual.status, 0, manual.stderr);
  assert.match(manual.stdout, /secondary: 11 tones; 21 pairs at gap >= 5 PASS/);
  assert.match(readFileSync(path.join(out, 'brand-tokens.css'), 'utf8'), /--brand-secondary-source: #008577;/);
  const other = run(['#123E88', '--secondary-hue', '-30', '--out', path.join(directory, 'alternate')]);
  assert.equal(other.status, 0, other.stderr);
  const invalidOut = path.join(directory, 'invalid');
  for (const args of [['--secondary', 'not-a-color'], ['--secondary-hue', 'NaN'], ['--secondary-hue', '181']]) {
    assert.equal(run([...args, '--out', invalidOut]).status, 1);
    assert.ok(!existsSync(invalidOut));
  }
});
