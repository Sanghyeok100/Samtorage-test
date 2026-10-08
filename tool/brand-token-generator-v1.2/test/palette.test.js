import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { contrastRatio, hexToOklch, relativeLuminance } from '../src/color.js';
import { generateBrandTokens, validateConfig } from '../src/generator.js';
import { auditMagicPairs, BRAND_GRADES, generatePalette, generateSecondary, GRADE_BANDS, MAGIC_RULES, magicRuleFor, PALETTE_LEVELS, summarizeMagicPairs } from '../src/palette.js';
import { renderCss, renderMarkdown } from '../src/output.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function assertPalette(palette) {
  assert.deepEqual(palette.tones.map((tone) => tone.level), PALETTE_LEVELS);
  assert.equal(palette.tones.length, 13);
  assert.equal(new Set(palette.tones.map((tone) => tone.hex)).size, 13);
  assert.deepEqual(palette.tones.filter((tone) => !tone.isEndpoint).map((tone) => tone.level), BRAND_GRADES);
  assert.equal(palette.tones[0].hex, '#FFFFFF');
  assert.equal(palette.tones[12].hex, '#000000');
  assert.equal(palette.pairs.length, 41);
  assert.deepEqual(palette.ruleSummary.map((rule) => rule.pairCount), [41, 32, 17, 6]);
  for (let i = 0; i < 13; i += 1) {
    const tone = palette.tones[i];
    assert.equal(tone.contrast.white, contrastRatio(tone.hex, '#FFFFFF'));
    assert.equal(tone.luminance, relativeLuminance(tone.hex));
    assert.ok(tone.luminance >= GRADE_BANDS[tone.level][0] && tone.luminance <= GRADE_BANDS[tone.level][1]);
    assert.ok(Math.abs(tone.contrast.white / tone.targetContrast - 1) < 0.012, `${tone.hex}: target mismatch`);
    if (i > 0) assert.ok(tone.contrast.white > palette.tones[i - 1].contrast.white);
    for (let j = i + 1; j < 13; j += 1) {
      const actual = contrastRatio(tone.hex, palette.tones[j].hex);
      const gap = palette.tones[j].level - tone.level;
      for (const [minimumGap, ratio] of [[40, 3], [50, 4.5], [70, 7], [90, 15]]) {
        if (gap >= minimumGap) assert.ok(actual >= ratio, `${palette.sourceHex}: ${tone.level} / ${palette.tones[j].level} = ${actual}`);
      }
    }
  }
  assert.ok(palette.pairs.every((pair) => pair.passes && pair.ratio >= pair.requiredContrast));
  const grade50 = palette.tones.find((tone) => tone.level === 50);
  assert.ok(grade50.contrast.white >= 4.5 && grade50.contrast.black >= 4.5);
}

test('Both palettes have 11 brand grades plus two endpoints, and every rule passes', () => {
  const result = generateBrandTokens({ primary: '#123E88' });
  assertPalette(result.palettes.primary);
  assertPalette(result.palettes.secondary);
  assert.equal(result.palettes.primary.sourceHex, '#123E88');
  assert.equal(result.primary, '#123E88');
  assert.notEqual(result.palettes.primary.tones.find((tone) => tone.level === 50).hex, '#123E88');
  assert.equal(result.tokens[0].hex, '#123E88');
});

test('Magic number is numeric grade difference, not five list positions', () => {
  const palette = generatePalette('#FFCC00');
  assert.deepEqual(MAGIC_RULES.map((rule) => [rule.magicNumber, rule.minContrast]), [[40, 3], [50, 4.5], [70, 7], [90, 15]]);
  assert.equal(magicRuleFor(5, 50).minContrast, 3);
  assert.equal(magicRuleFor(0, 50).minContrast, 4.5);
  assert.equal(magicRuleFor(10, 80).minContrast, 7);
  assert.equal(magicRuleFor(10, 100).minContrast, 15);
  assert.equal(magicRuleFor(100, 10).minContrast, 15);
  assert.equal(magicRuleFor(0, 30), null);
  assert.throws(() => magicRuleFor(0, 950), /Unknown color grade/);
  const oldFivePositions = contrastRatio(palette.tones[1].hex, palette.tones[6].hex);
  assert.ok(oldFivePositions >= 3 && oldFivePositions < 4.5);
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

test('Mixed palettes pass every applicable threshold for varied independent hues', () => {
  for (const primary of ['#123E88', '#FF0000', '#FFFF00', '#00FF00', '#000000', '#FFFFFF']) {
    for (const secondary of ['#008577', '#FF00FF', '#FFCC00', '#777777']) {
      const a = generatePalette(primary);
      const b = generatePalette(secondary);
      const pairs = auditMagicPairs(a, b);
      assert.equal(pairs.length, 82);
      for (const first of a.tones) {
        for (const second of b.tones) {
          const gap = Math.abs(first.level - second.level);
          const ratio = contrastRatio(first.hex, second.hex);
          for (const [minimumGap, minimumRatio] of [[40, 3], [50, 4.5], [70, 7], [90, 15]]) {
            if (gap >= minimumGap) assert.ok(ratio >= minimumRatio);
          }
        }
      }
      assert.ok(summarizeMagicPairs(pairs).every((rule) => rule.passes));
    }
  }
});

test('Auditor measures real HEX and detects corruption even with stale passing metadata', () => {
  const a = generatePalette('#123E88');
  const b = structuredClone(generatePalette('#FFCC00'));
  b.tones.find((tone) => tone.level === 90).hex = '#FFFFFF';
  const audited = auditMagicPairs(a, b);
  const bad = audited.find((pair) => pair.from === 0 && pair.to === 90);
  assert.equal(bad.ratio, 1);
  assert.equal(bad.requiredContrast, 15);
  assert.equal(bad.passes, false);
  assert.equal(summarizeMagicPairs(audited).find((rule) => rule.magicNumber === 90).passes, false);
});

test('Relative-luminance reference values and exact endpoint bands', () => {
  assert.equal(relativeLuminance('#FFFFFF'), 1);
  assert.equal(relativeLuminance('#000000'), 0);
  assert.equal(relativeLuminance('#FF0000'), 0.2126);
  const palette = generatePalette('#0000FF');
  assert.deepEqual(palette.tones[0].luminanceBand, [1, 1]);
  assert.deepEqual(palette.tones[12].luminanceBand, [0, 0]);
  assert.deepEqual(palette.tones.find((tone) => tone.level === 95).luminanceBand, [0.002, 0.004]);
});

test('Text target does not alter the four magic-number rules or hide AAA failures', () => {
  const low = generateBrandTokens({ primary: '#123E88', minContrast: 3 });
  assert.deepEqual(low.palettes.primary.ruleSummary.map((rule) => rule.minContrast), [3, 4.5, 7, 15]);
  assertPalette(low.palettes.primary);
  const high = generateBrandTokens({ primary: '#123E88', minContrast: 7 });
  const middle = high.palettes.primary.tones.find((tone) => tone.level === 50);
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
      assert.equal(values.get(`--brand-${family}-grade-${tone.level}`), tone.hex);
      assert.equal(values.get(`--brand-on-${family}-grade-${tone.level}`), tone.text);
    }
    for (const pair of palette.pairs) {
      assert.ok(contrastRatio(values.get(`--brand-${family}-grade-${pair.from}`), values.get(`--brand-${family}-grade-${pair.to}`)) >= pair.requiredContrast);
    }
  }
  assert.equal(values.has('--brand-primary-50'), false, 'do not reuse the old 50-950 namespace');
  for (const pair of result.crossPairs) {
    assert.ok(contrastRatio(values.get(`--brand-primary-grade-${pair.from}`), values.get(`--brand-secondary-grade-${pair.to}`)) >= pair.requiredContrast);
  }
  const markdown = renderMarkdown(result);
  assert.ok(markdown.includes('Primary grade palette'));
  assert.ok(markdown.includes('Secondary grade palette'));
  assert.ok(markdown.includes('| 0 | 50 | 50 | 4.5:1 |'));
  assert.ok(markdown.includes('Mixed Primary/Secondary checks'));
  assert.ok(markdown.includes('한국어 설명'));
});

test('Invalid Secondary settings and attempts to silently alter fixed magic rules fail', () => {
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
  assert.match(manual.stdout, /secondary: 11 brand grades \+ 2 endpoints; 41 magic-number pairs PASS/);
  assert.match(manual.stdout, /Mixed Primary\/Secondary: 82 magic-number pairs PASS/);
  assert.match(readFileSync(path.join(out, 'brand-tokens.css'), 'utf8'), /--brand-secondary-source: #008577;/);
  const other = run(['#123E88', '--secondary-hue', '-30', '--out', path.join(directory, 'alternate')]);
  assert.equal(other.status, 0, other.stderr);
  const invalidOut = path.join(directory, 'invalid');
  for (const args of [['--secondary', 'not-a-color'], ['--secondary-hue', 'NaN'], ['--secondary-hue', '181']]) {
    assert.equal(run([...args, '--out', invalidOut]).status, 1);
    assert.ok(!existsSync(invalidOut));
  }
});
