import { clamp, contrastRatio, hexToOklch, normalizeHex, oklchToHex, relativeLuminance } from './color.js';

export const BRAND_GRADES = Object.freeze([5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95]);
export const PALETTE_LEVELS = Object.freeze([0, ...BRAND_GRADES, 100]);
export const MAGIC_RULES = Object.freeze([
  Object.freeze({ magicNumber: 40, minContrast: 3 }),
  Object.freeze({ magicNumber: 50, minContrast: 4.5 }),
  Object.freeze({ magicNumber: 70, minContrast: 7 }),
  Object.freeze({ magicNumber: 90, minContrast: 15 }),
]);
// Grades 0–90 and 100: USWDS relative-luminance bands.
// https://designsystem.digital.gov/design-tokens/color/overview/#magic-number
// Grade 95 is a local extension for the user's KRDS-style 11-brand-grade scale.
// Its narrow band also preserves magic 90 >= 15:1 when paired with grade 5.
export const GRADE_BANDS = Object.freeze(Object.fromEntries([
  [0, [1, 1]], [5, [0.850, 0.930]], [10, [0.750, 0.820]],
  [20, [0.500, 0.650]], [30, [0.350, 0.450]], [40, [0.225, 0.300]],
  [50, [0.175, 0.183]], [60, [0.100, 0.125]], [70, [0.050, 0.070]],
  [80, [0.020, 0.040]], [90, [0.005, 0.015]], [95, [0.002, 0.004]], [100, [0, 0]],
].map(([grade, band]) => [grade, Object.freeze(band)])));
const WHITE = '#FFFFFF';
const BLACK = '#000000';

export function magicRuleFor(firstGrade, secondGrade) {
  if (!PALETTE_LEVELS.includes(firstGrade) || !PALETTE_LEVELS.includes(secondGrade)) throw new Error('Unknown color grade.');
  const gap = Math.abs(firstGrade - secondGrade);
  return MAGIC_RULES.filter((rule) => gap >= rule.magicNumber).at(-1) ?? null;
}

function colorAtLuminance(seed, target, band) {
  if (target === 1) return oklchToHex({ ...seed, L: 1 });
  if (target === 0) return oklchToHex({ ...seed, L: 0 });
  let low = 0;
  let high = 1;
  let best;
  let bestError = Infinity;
  // Search OKLCH L, but judge the rounded sRGB HEX luminance, not L itself.
  for (let i = 0; i < 36; i += 1) {
    const L = (low + high) / 2;
    const candidate = oklchToHex({ ...seed, L });
    const actual = relativeLuminance(candidate.hex);
    const error = Math.abs(actual - target);
    if (actual >= band[0] && actual <= band[1] && error < bestError) {
      best = candidate;
      bestError = error;
    }
    if (actual < target) low = L;
    else high = L;
  }
  if (!best) throw new Error('Could not fit a rounded HEX into its grade luminance band. No files will be written.');
  return best;
}

export function auditMagicPairs(first, second = first) {
  const pairs = [];
  for (let i = 0; i < first.tones.length; i += 1) {
    const start = second === first ? i + 1 : 0;
    for (let j = start; j < second.tones.length; j += 1) {
      const a = first.tones[i];
      const b = second.tones[j];
      const rule = magicRuleFor(a.level, b.level);
      if (!rule) continue;
      const ratio = contrastRatio(a.hex, b.hex);
      pairs.push({ from: a.level, to: b.level, fromHex: a.hex, toHex: b.hex,
        gap: Math.abs(a.level - b.level), requiredContrast: rule.minContrast,
        ratio, passes: ratio >= rule.minContrast });
    }
  }
  return pairs;
}

export function summarizeMagicPairs(pairs) {
  return MAGIC_RULES.map((rule) => {
    const eligible = pairs.filter((pair) => pair.gap >= rule.magicNumber);
    return { ...rule, pairCount: eligible.length,
      minimumActualContrast: eligible.length ? Math.min(...eligible.map((pair) => pair.ratio)) : null,
      passes: eligible.length > 0 && eligible.every((pair) => pair.ratio >= rule.minContrast) };
  });
}

export function generatePalette(primary, textMinContrast = 4.5) {
  const sourceHex = normalizeHex(primary);
  if (!Number.isFinite(textMinContrast) || textMinContrast < 3 || textMinContrast > 21) {
    throw new Error('Palette text contrast must be between 3 and 21.');
  }
  const seed = hexToOklch(sourceHex);
  const tones = PALETTE_LEVELS.map((level, index) => {
    const band = GRADE_BANDS[level];
    const targetLuminance = (band[0] + band[1]) / 2;
    const color = colorAtLuminance(seed, targetLuminance, band);
    const luminance = relativeLuminance(color.hex);
    if (luminance < band[0] || luminance > band[1]) throw new Error(`Grade ${level} is outside its luminance band.`);
    const white = contrastRatio(color.hex, WHITE);
    const black = contrastRatio(color.hex, BLACK);
    const text = white >= black ? WHITE : BLACK;
    const targetContrast = 1.05 / (targetLuminance + 0.05);
    return {
      level, index, isEndpoint: level === 0 || level === 100,
      hex: color.hex, oklch: color.oklch, gamutReduced: color.gamutReduced,
      luminance, luminanceBand: band, targetLuminance, targetContrast,
      contrast: { white, black, selected: Math.max(white, black) },
      targetError: white - targetContrast, text,
      passes: { white: white >= textMinContrast, black: black >= textMinContrast, selected: Math.max(white, black) >= textMinContrast },
    };
  });
  for (let i = 1; i < tones.length; i += 1) {
    if (tones[i].luminance >= tones[i - 1].luminance) throw new Error('Palette is not strictly ordered by luminance.');
  }
  const palette = { sourceHex, tones, textMinContrast };
  const pairs = auditMagicPairs(palette);
  const ruleSummary = summarizeMagicPairs(pairs);
  if (pairs.some((pair) => !pair.passes) || ruleSummary.some((rule) => !rule.passes)) {
    throw new Error(`Palette for ${sourceHex} failed its magic-number rules after HEX rounding. No files will be written.`);
  }
  const sourceContrast = contrastRatio(sourceHex, WHITE);
  const nearest = tones.reduce((best, tone) => Math.abs(Math.log(tone.contrast.white / sourceContrast))
    < Math.abs(Math.log(best.contrast.white / sourceContrast)) ? tone : best);
  return { ...palette, pairs, ruleSummary, brandToneCount: BRAND_GRADES.length,
    minimumActualContrast: Math.min(...pairs.map((pair) => pair.ratio)), nearestLevel: nearest.level };
}

export function generateSecondary(primary, secondary = 'auto', hueOffset = 30) {
  if (secondary !== 'auto') return { sourceHex: normalizeHex(secondary), mode: 'manual', hueOffset: null, neutralFallback: false };
  if (!Number.isFinite(hueOffset) || hueOffset < -180 || hueOffset > 180) throw new Error('Secondary hue offset must be between -180 and 180 degrees.');
  const base = hexToOklch(primary);
  const neutralFallback = base.C < 0.005;
  // Retain the v1.1 Secondary suggestion; harmony remains a visual choice.
  const target = neutralFallback ? { L: 0.55, C: 0.08, h: 260 }
    : { L: clamp(base.L, 0.45, 0.7), C: Math.min(base.C * 0.8, 0.18), h: (base.h + hueOffset + 360) % 360 };
  return { sourceHex: oklchToHex(target).hex, mode: 'auto', hueOffset: neutralFallback ? null : hueOffset, neutralFallback };
}
