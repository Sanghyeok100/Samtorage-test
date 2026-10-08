# Brand Token Generator

A small JavaScript utility for a design-system repo. Enter a Primary HEX color, generate an OKLCH state palette, check white/black text contrast, and save Markdown and CSS tokens. No framework, external packages, or network calls.

## Start in VS Code

1. Install [Node.js](https://nodejs.org/en/download) version 22 or newer if you do not already have it.
2. Open this `brand-token-generator` folder in VS Code. You can also copy the entire folder into an existing repo, for example `tools/brand-token-generator`.
3. Select **Terminal → New Terminal**, then run:

```powershell
node --version
node generate-brand-colors.js "#123E88"
```

Run the command from this utility's folder. Always quote HEX colors: an unquoted `#` starts a comment in PowerShell. `npm install` is unnecessary.

The first run creates `output/brand-tokens.md` and `output/brand-tokens.css`. Open the Markdown file and use **Open Preview** in VS Code to read the report.

To generate another color and intentionally replace those two files:

```powershell
node generate-brand-colors.js "#FFCC00" --force
```

Alternatively, keep palettes in separate folders:

```powershell
node generate-brand-colors.js "#FFCC00" --out "output/yellow"
```

Example palettes are included under `examples/`. They do not occupy your default `output/` directory.

## File structure

```text
brand-token-generator/
├── generate-brand-colors.js   # Command-line entry point and file saving
├── config.json               # Beginner-friendly defaults
├── package.json              # npm shortcuts; no dependencies
├── README.md
├── src/
│   ├── color.js              # HEX, sRGB, OKLCH, WCAG calculations
│   ├── generator.js          # State palette and contrast adjustment
│   └── output.js             # Markdown and CSS formatting
├── test/
│   └── generator.test.js     # Math, palette and command-line checks
├── examples/
│   ├── blue/                 # Supplied #123E88
│   └── yellow/               # Bright Primary requiring white-text correction
└── output/                   # Created on your first run
    ├── brand-tokens.md
    └── brand-tokens.css
```

## Edit the defaults

Change `primary` in `config.json`, save it, then run `node generate-brand-colors.js`. Use `--force` if the output already exists.

| Setting | Default | Meaning |
| --- | --- | --- |
| `primary` | `#123E88` | Opaque 3- or 6-digit HEX, with or without `#` |
| `textColor` | `white` | Foreground for Default/Hover/Pressed: `white`, `black`, or `auto` |
| `minContrast` | `4.5` | Required ratio for the **used text**; range 3–21 |
| `hoverDelta` | `0.08` | Subtract 0.08 from source OKLCH L |
| `pressedDelta` | `0.16` | Subtract 0.16 from source L; must exceed hoverDelta |
| `subtleLightness` | `0.96` | Initial Subtle L; range 0.8–1 |
| `subtleChromaFactor` | `0.15` | Subtle chroma = source chroma × 0.15 |
| `outputDir` | `output` | Output folder, relative to the config file |

L uses a 0–1 scale. A delta of `0.08` means **8 percentage points**, not an 8% relative reduction. State deltas must satisfy `0 < hoverDelta < pressedDelta < 1`. Subtle always uses black text.

`auto` chooses whichever of pure white or pure black has higher contrast against the source Primary, then keeps that text color for all three solid states. It still adjusts the ramp if Hover or Pressed would fail.

For [WCAG 2.2 text contrast](https://www.w3.org/TR/WCAG22/#contrast-minimum), normal text generally requires 4.5:1; large text requires 3:1. Large text means at least 18 pt, or 14 pt bold. A target of 7:1 can be used for AAA normal-text contrast. Selecting 3:1 does not establish AA contrast for normal text. These are text-pair checks, not a certification of your full interface.

## How the colors are generated

1. Normalize HEX and convert sRGB → linear sRGB → Oklab → OKLCH.
2. Make initial candidates: Default = original Primary; Hover = L − 0.08; Pressed = L − 0.16; Subtle = L 0.96 with lower chroma.
3. Fit candidates into sRGB by reducing chroma at fixed target hue/lightness. This is a simple conservative mapping, not the CSS specification's full gamut-mapping algorithm.
4. Check both white and black text against the **rounded 6-digit HEX** that will be saved.
5. If the selected text fails on any solid state, shift the entire solid ramp's L downward for white text or upward for black text until all three pass. A bounded search refines the passing shift. This preserves the configured L spacing where limits allow it.
6. Adjust Subtle toward white if needed for black text. Recheck all used-text pairs before writing files.

Default stays exactly equal to the supplied Primary when the entire solid ramp already passes. With white text, a bright Primary may become much darker. With black text, even a passing Default may lighten so that Pressed passes too. The source, initial candidates, final colors, adjustment amounts, and gamut reductions are recorded in the report.

L is clamped to 0–1. Near pure black/white or with very demanding contrast, states can become identical; the report warns about this. A color-only interaction change may be insufficient, so review the palette visually and add other interaction cues as needed.

White and black are alternative text choices: **both do not need to pass**. The report shows each ratio, PASS/FAIL, the higher-contrast recommendation, and the text color actually used. PASS/FAIL uses unrounded numbers. The CSS exports HEX values, with descriptive OKLCH comments, so browser rounding of a separate OKLCH declaration cannot invalidate the checked pair.

## Commands and options

```powershell
# npm shortcut (the -- forwards options to the utility)
npm run generate -- --primary "#123E88"

# Keep Primary brighter by choosing black text when appropriate
node generate-brand-colors.js "#FFCC00" --text auto --out "output/yellow-auto"

# Stronger contrast target
node generate-brand-colors.js "#123E88" --min-contrast 7 --out "output/aaa"

# Use your own config file
node generate-brand-colors.js --config "./my-brand.json"

# Help and checks
node generate-brand-colors.js --help
npm test
```

`--out` is relative to the terminal's working directory; `outputDir` is relative to the chosen config file. Absolute paths are also accepted. Options override the validated config. Unknown keys, invalid JSON, invalid colors, missing values, and invalid numeric settings fail with a readable error and a nonzero exit code.

Without `--force`, an existing generated file prevents replacement of either output. With `--force`, only the two fixed filenames in the chosen output directory are replaced; target files must be regular files. Other files are left alone. Forced writes stage complete contents first, but replacement of the two files is not a single filesystem transaction. Do not run multiple generators into the same output directory simultaneously.

## Use the CSS tokens

Load the generated CSS with a stylesheet link or import it from your application's CSS:

```html
<link rel="stylesheet" href="./output/brand-tokens.css">
```

```css
.button-primary {
  background: var(--brand-primary);
  color: var(--brand-on-primary);
}
.button-primary:hover { background: var(--brand-primary-hover); }
.button-primary:active { background: var(--brand-primary-pressed); }
.brand-subtle {
  background: var(--brand-primary-subtle);
  color: var(--brand-on-primary-subtle);
}
```

Adjust the stylesheet path to your app. Recheck contrast if you add opacity, blend modes, gradients, images, or different text colors. Focus rings and UI boundaries need separate checks against the surfaces beside them; this utility does not generate a focus token.

For programmatic use:

```js
import { generateBrandTokens } from './src/generator.js';
const result = generateBrandTokens({ primary: '#123E88', textColor: 'white' });
console.log(result.tokens);
```

The calculation module does not read or write files. Output is deterministic, with no timestamps or network requests.

## Calculation references

- [Oklab conversion matrices by Björn Ottosson](https://bottosson.github.io/posts/oklab/)
- [WCAG 2.2 contrast ratio](https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio)
- [WCAG relative luminance and sRGB transfer function](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance)
