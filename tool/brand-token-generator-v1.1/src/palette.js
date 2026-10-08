import { clamp, contrastRatio, hexToOklch, normalizeHex, oklchToHex } from './color.js';

export const PALETTE_LEVELS = Object.freeze([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]);
export const PALETTE_GAP = 5;
export const PALETTE_MIN_CONTRAST = 4.5;
const WHITE = '#FFFFFF';
const BLACK = '#000000';

// Targets are evenly spaced in log contrast, not in OKLCH lightness.
// Before HEX rounding, every five-step ratio is sqrt(21) = 4.5826...,
// providing room above the approved 4.5:1 minimum.
export const PALETTE_TARGETS = Object.freeze(PALETTE_LEVELS.map((_, i) => 21 ** (i / 10)));

function colorAtContrast(seed, target) {
  if (target === 1) return oklchToHex({ ...seed, L: 1 });
  if (target === 21) return oklchToHex({ ...seed, L: 0 });
  let low = 0;
  let high = 1;
  let best;
  let bestError = Infinity;
  // Search the actual sRGB HEX ratio. Keep the closest candidate even when
  // the target falls between two quantized colors.
  for (let i = 0; i < 36; i += 1) {
    const L = (low + high) / 2;
    const candidate = oklchToHex({ ...seed, L });
    const actual = contrastRatio(candidate.hex, WHITE);
    const error = Math.abs(Math.log(actual / target));
    if (error < bestError) { best = candidate; bestError = error; }
    if (actual > target) low = L;
    else high = L;
  }
  return best;
}

export function generatePalette(primary, textMinContrast = 4.5) {
  const sourceHex = normalizeHex(primary);
  if (!Number.isFinite(textMinContrast) || textMinContrast < 3 || textMinContrast > 21) {
    throw new Error('Palette text contrast must be between 3 and 21.');
  }
  const seed = hexToOklch(sourceHex);
  const tones = PALETTE_LEVELS.map((level, index) => {
    const targetContrast = PALETTE_TARGETS[index];
    const color = colorAtContrast(seed, targetContrast);
    const white = contrastRatio(color.hex, WHITE);
    const black = contrastRatio(color.hex, BLACK);
    const text = white >= black ? WHITE : BLACK;
    return {
      level, index, hex: color.hex, oklch: color.oklch, gamutReduced: color.gamutReduced,
      targetContrast, contrast: { white, black, selected: Math.max(white, black) },
      targetError: white - targetContrast, text,
      passes: { white: white >= textMinContrast, black: black >= textMinContrast, selected: Math.max(white, black) >= textMinContrast },
    };
  });
  for (let i = 1; i < tones.length; i += 1) {
    if (tones[i].contrast.white <= tones[i - 1].contrast.white) throw new Error('Palette is not strictly ordered by luminance.');
  }
  const pairs = [];
  // Validate every eligible pair, including gaps larger than five steps.
  for (let i = 0; i < tones.length; i += 1) {
    for (let j = i + PALETTE_GAP; j < tones.length; j += 1) {
      const ratio = contrastRatio(tones[i].hex, tones[j].hex);
      pairs.push({ from: tones[i].level, to: tones[j].level, gap: j - i, ratio, passes: ratio >= PALETTE_MIN_CONTRAST });
    }
  }
  if (pairs.some((pair) => !pair.passes)) {
    throw new Error(`Palette for ${sourceHex} failed the five-step 4.5:1 rule after HEX rounding. No files will be written.`);
  }
  const sourceContrast = contrastRatio(sourceHex, WHITE);
  const nearest = tones.reduce((best, tone) => Math.abs(Math.log(tone.contrast.white / sourceContrast))
    < Math.abs(Math.log(best.contrast.white / sourceContrast)) ? tone : best);
  return {
    sourceHex, tones, pairs, stepGap: PALETTE_GAP, minPairContrast: PALETTE_MIN_CONTRAST,
    minimumActualContrast: Math.min(...pairs.map((pair) => pair.ratio)),
    nearestLevel: nearest.level, textMinContrast,
  };
}

export function generateSecondary(primary, secondary = 'auto', hueOffset = 30) {
  if (secondary !== 'auto') return { sourceHex: normalizeHex(secondary), mode: 'manual', hueOffset: null, neutralFallback: false };
  if (!Number.isFinite(hueOffset) || hueOffset < -180 || hueOffset > 180) {
    throw new Error('Secondary hue offset must be between -180 and 180 degrees.');
  }
  const base = hexToOklch(primary);
  const neutralFallback = base.C < 0.005;
  // This is a deterministic starting suggestion, not a universal harmony test.
  // Near-neutral Primary colors have no useful hue; use a documented blue seed.
  const target = neutralFallback ? { L: 0.55, C: 0.08, h: 260 }
    : { L: clamp(base.L, 0.45, 0.7), C: Math.min(base.C * 0.8, 0.18), h: (base.h + hueOffset + 360) % 360 };
  return { sourceHex: oklchToHex(target).hex, mode: 'auto', hueOffset: neutralFallback ? null : hueOffset, neutralFallback };
}
