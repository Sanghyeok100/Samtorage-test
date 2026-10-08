import { clamp, contrastRatio, hexToOklch, normalizeHex, oklchToHex } from './color.js';
import { auditMagicPairs, generatePalette, generateSecondary, summarizeMagicPairs } from './palette.js';

export const DEFAULTS = Object.freeze({
  primary: '#123E88', textColor: 'white', minContrast: 4.5,
  hoverDelta: 0.08, pressedDelta: 0.16,
  subtleLightness: 0.96, subtleChromaFactor: 0.15, outputDir: 'output',
  secondary: 'auto', secondaryHueOffset: 30,
});
const WHITE = '#FFFFFF';
const BLACK = '#000000';

export function validateConfig(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Config must be a JSON object.');
  for (const key of Object.keys(input)) {
    if (!Object.hasOwn(DEFAULTS, key)) throw new Error(`Unknown config option: ${key}`);
  }
  const config = { ...DEFAULTS, ...input };
  config.primary = normalizeHex(config.primary);
  if (config.secondary !== 'auto') config.secondary = normalizeHex(config.secondary);
  if (!['white', 'black', 'auto'].includes(config.textColor)) throw new Error('textColor must be white, black, or auto.');
  for (const key of ['minContrast', 'hoverDelta', 'pressedDelta', 'subtleLightness', 'subtleChromaFactor', 'secondaryHueOffset']) {
    if (typeof config[key] !== 'number' || !Number.isFinite(config[key])) throw new Error(`${key} must be a finite number.`);
  }
  if (config.secondaryHueOffset < -180 || config.secondaryHueOffset > 180) throw new Error('secondaryHueOffset must be between -180 and 180 degrees.');
  if (config.minContrast < 3 || config.minContrast > 21) throw new Error('minContrast must be between 3 and 21. Use 4.5 for normal text.');
  if (!(config.hoverDelta > 0 && config.hoverDelta < config.pressedDelta && config.pressedDelta < 1)) {
    throw new Error('State deltas must satisfy 0 < hoverDelta < pressedDelta < 1.');
  }
  if (config.subtleLightness < 0.8 || config.subtleLightness > 1) throw new Error('subtleLightness must be between 0.8 and 1.');
  if (config.subtleChromaFactor < 0 || config.subtleChromaFactor > 1) throw new Error('subtleChromaFactor must be between 0 and 1.');
  if (typeof config.outputDir !== 'string' || !config.outputDir.trim()) throw new Error('outputDir must be a nonempty path.');
  return config;
}

// Find the first passing shift on a bounded grid, then refine that interval.
// Every predicate checks the rounded HEX that will actually be written to CSS.
function findPassingShift(evaluate, passes, direction, limit) {
  const initial = evaluate(0);
  if (passes(initial)) return { value: initial, shift: 0 };
  const steps = Math.ceil(limit / 0.002);
  let lastFail = 0;
  for (let i = 1; i <= steps; i += 1) {
    const distance = limit * i / steps;
    let value = evaluate(direction * distance);
    if (passes(value)) {
      let low = lastFail;
      let high = distance;
      for (let j = 0; j < 24; j += 1) {
        const middle = (low + high) / 2;
        const candidate = evaluate(direction * middle);
        if (passes(candidate)) { high = middle; value = candidate; }
        else low = middle;
      }
      return { value, shift: direction * high };
    }
    lastFail = distance;
  }
  throw new Error('Could not meet the requested contrast. No tokens were produced.');
}

function makeToken(name, candidate, final, text, minContrast, lightnessShift) {
  const white = contrastRatio(final.hex, WHITE);
  const black = contrastRatio(final.hex, BLACK);
  const recommendedText = white >= black ? WHITE : BLACK;
  return {
    name, candidateHex: candidate.hex, candidateOklch: candidate.oklch,
    hex: final.hex, oklch: final.oklch, text,
    contrast: { white, black, selected: contrastRatio(final.hex, text) },
    passes: { white: white >= minContrast, black: black >= minContrast },
    recommendedText, recommendedPasses: Math.max(white, black) >= minContrast,
    adjusted: final.hex !== candidate.hex, lightnessShift,
    gamutReduced: final.gamutReduced,
  };
}

function generateStateTokens(config) {
  const base = hexToOklch(config.primary);
  const source = oklchToHex(base);
  // Preserve the supplied HEX exactly instead of relying on a conversion round-trip.
  source.hex = config.primary;
  const text = config.textColor === 'auto'
    ? (contrastRatio(config.primary, WHITE) >= contrastRatio(config.primary, BLACK) ? WHITE : BLACK)
    : config.textColor === 'white' ? WHITE : BLACK;
  const offsets = [0, -config.hoverDelta, -config.pressedDelta];
  const candidates = offsets.map((offset, i) => i === 0 ? source : oklchToHex({ ...base, L: clamp(base.L + offset) }));
  const solidAt = (shift) => shift === 0 ? candidates
    : offsets.map((offset) => oklchToHex({ ...base, L: clamp(base.L + offset + shift) }));
  // Shift the entire solid ramp together to keep Hover and Pressed darker.
  // Clamping at black/white may still collapse states; report this explicitly.
  const solid = findPassingShift(solidAt,
    (colors) => colors.every((color) => contrastRatio(color.hex, text) >= config.minContrast),
    text === WHITE ? -1 : 1, 1 + config.pressedDelta);
  const subtleTarget = { ...base, L: config.subtleLightness, C: base.C * config.subtleChromaFactor };
  const subtleCandidate = oklchToHex(subtleTarget);
  const subtle = findPassingShift(
    (shift) => shift === 0 ? subtleCandidate : oklchToHex({ ...subtleTarget, L: clamp(subtleTarget.L + shift) }),
    (color) => contrastRatio(color.hex, BLACK) >= config.minContrast, 1, 1 - config.subtleLightness);
  const tokens = ['default', 'hover', 'pressed'].map((name, i) =>
    makeToken(name, candidates[i], solid.value[i], text, config.minContrast, solid.shift));
  tokens.push(makeToken('subtle', subtleCandidate, subtle.value, BLACK, config.minContrast, subtle.shift));
  const warnings = [];
  if (tokens.some((token) => token.contrast.selected < config.minContrast)) throw new Error('Final contrast validation failed.');
  if (tokens[0].hex !== config.primary) warnings.push('Default changed from the supplied Primary to meet the selected text contrast across the solid ramp.');
  if (new Set(tokens.slice(0, 3).map((token) => token.hex)).size < 3) {
    warnings.push('Some solid states have identical HEX values near the lightness limits. Add a non-color interaction cue or choose a less extreme Primary.');
  }
  if (config.minContrast < 4.5) warnings.push('This threshold is below 4.5:1; it does not establish WCAG AA contrast for normal-size text.');
  if (tokens.some((token) => token.gamutReduced)) warnings.push('Chroma was reduced for some final colors to fit sRGB while keeping the target hue and lightness.');
  return { config, primary: config.primary, primaryOklch: base, solidText: text, solidShift: solid.shift, tokens, warnings };
}

export function generateBrandTokens(input = {}) {
  const config = validateConfig(input);
  const primary = generateStateTokens(config);
  const suggestion = generateSecondary(config.primary, config.secondary, config.secondaryHueOffset);
  const secondary = { ...generateStateTokens({ ...config, primary: suggestion.sourceHex }), ...suggestion };
  const palettes = {
    primary: generatePalette(config.primary, config.minContrast),
    secondary: generatePalette(suggestion.sourceHex, config.minContrast),
  };
  const crossPairs = auditMagicPairs(palettes.primary, palettes.secondary);
  const crossRuleSummary = summarizeMagicPairs(crossPairs);
  if (crossPairs.some((pair) => !pair.passes) || crossRuleSummary.some((rule) => !rule.passes)) {
    throw new Error('Primary/Secondary mixed pairs failed their magic-number rules. No files will be written.');
  }
  const warnings = [...primary.warnings, ...secondary.warnings.map((warning) => `Secondary: ${warning}`)];
  if (suggestion.neutralFallback) warnings.push('Primary is near-neutral; automatic Secondary uses the documented muted-blue seed. Supply secondary HEX to choose another direction.');
  if (Object.values(palettes).some((palette) => palette.tones.some((tone) => !tone.passes.selected))) {
    warnings.push(`Some palette tones cannot meet the ${config.minContrast}:1 text target with either pure white or pure black. Check each tone before using it for that text size/target.`);
  }
  return { ...primary, secondary, palettes, crossPairs, crossRuleSummary, warnings };
}
