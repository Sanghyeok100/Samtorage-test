// sRGB / Oklab matrices: https://bottosson.github.io/posts/oklab/
// Contrast: https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function normalizeHex(value) {
  if (typeof value !== 'string' || !/^#?(?:[\da-f]{3}|[\da-f]{6})$/i.test(value.trim())) {
    throw new Error('Primary must be a 3- or 6-digit HEX color, for example "#123E88". Alpha is not supported.');
  }
  let hex = value.trim().replace(/^#/, '');
  if (hex.length === 3) hex = [...hex].map((char) => char + char).join('');
  return `#${hex.toUpperCase()}`;
}

export function hexToRgb(hex) {
  const normalized = normalizeHex(hex);
  return [1, 3, 5].map((start) => Number.parseInt(normalized.slice(start, start + 2), 16) / 255);
}

const toLinear = (value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
const toSrgb = (value) => value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
const rgbToHex = (rgb) => `#${rgb.map((value) => Math.round(clamp(value) * 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;

export function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(first, second) {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function hexToOklch(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const labB = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  const C = Math.hypot(a, labB);
  // Neutral colors have no meaningful hue; avoid floating-point noise.
  return { L: clamp(L), C: C < 1e-7 ? 0 : C, h: C < 1e-7 ? 0 : (Math.atan2(labB, a) * 180 / Math.PI + 360) % 360 };
}

function oklchToLinearRgb({ L, C, h }) {
  const a = C * Math.cos(h * Math.PI / 180);
  const b = C * Math.sin(h * Math.PI / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ];
}

export function oklchToHex(color) {
  if (!color || !['L', 'C', 'h'].every((key) => Number.isFinite(color[key])) || color.C < 0) {
    throw new Error('OKLCH requires finite L, C, and h, with C >= 0.');
  }
  const target = { ...color, L: clamp(color.L) };
  const inGamut = (rgb) => rgb.every((channel) => channel >= -1e-7 && channel <= 1 + 1e-7);
  let mapped = { ...target };
  if (!inGamut(oklchToLinearRgb(mapped))) {
    // Keep hue and lightness; reduce chroma until the color fits sRGB.
    let low = 0;
    let high = target.C;
    for (let i = 0; i < 28; i += 1) {
      const middle = (low + high) / 2;
      if (inGamut(oklchToLinearRgb({ ...target, C: middle }))) low = middle;
      else high = middle;
    }
    mapped.C = low;
  }
  const hex = rgbToHex(oklchToLinearRgb(mapped).map(toSrgb));
  return { hex, oklch: hexToOklch(hex), mapped, gamutReduced: target.C - mapped.C > 1e-6 };
}

export function formatOklch({ L, C, h }) {
  return `oklch(${(L * 100).toFixed(4)}% ${C.toFixed(6)} ${h.toFixed(3)})`;
}
