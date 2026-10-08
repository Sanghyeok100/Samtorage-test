# Brand Token Generator v1.1

Generate Primary and Secondary palettes with **11 contrast-targeted levels** and a verified **five-step minimum contrast of 4.5:1**. Default/Hover/Pressed/Subtle generation remains available for both brand colors. JavaScript/Node.js only; no external packages or network requests.

**한국어 설명**

Primary와 Secondary를 목표 대비율 기반 11단계로 생성합니다. 같은 팔레트에서 5단계 이상 떨어진 모든 조합은 최종 HEX 기준 최소 4.5:1을 검사합니다. 기존 Default·Hover·Pressed·Subtle 생성 기능도 유지합니다.

## Start in VS Code

1. Use [Node.js](https://nodejs.org/en/download) version 22 or newer.
2. Open this utility folder in VS Code, then select **Terminal → New Terminal**.
3. Run:

```powershell
node generate-brand-colors.js "#123E88"
```

For the installed design-system copy, change to this exact folder first:

```powershell
cd "C:\Users\WS-DESIGN\Desktop\designsystem\tool\brand-token-generator-v1.1"
node generate-brand-colors.js "#123E88"
```

The first run creates `output/brand-tokens.md` and `output/brand-tokens.css`. Open Markdown with **Open Preview** in VS Code. No `npm install` is needed. Always quote HEX: unquoted `#` starts a comment in PowerShell.

Keep another palette in a new folder, or explicitly replace generated files:

```powershell
node generate-brand-colors.js "#FFCC00" --out "output/yellow"
node generate-brand-colors.js "#FFCC00" --force
```

**한국어 설명**

VS Code 아래 터미널에서 실행합니다. 설치된 새 버전 폴더 이름은 `brand-token-generator-v1.1`이고, 상위 폴더는 `tools`가 아닌 `tool`입니다. 결과는 `output`에 저장됩니다. 기존 결과를 바꾸려면 `--force`를 붙이고, 별도로 보존하려면 `--out`으로 다른 폴더를 지정합니다.

## Files and versioning

```text
tool/
├── brand-token-generator/          # Original v1.0; preserved
└── brand-token-generator-v1.1/
    ├── generate-brand-colors.js
    ├── config.json
    ├── package.json
    ├── README.md
    ├── src/
    │   ├── color.js                # HEX, sRGB, OKLCH, WCAG math
    │   ├── palette.js              # Target ratios and Secondary suggestion
    │   ├── generator.js            # Palette and state generation
    │   └── output.js               # Markdown/CSS formatting
    ├── test/
    │   ├── generator.test.js       # Existing state/CLI regression checks
    │   └── palette.test.js         # New palette and Secondary checks
    ├── examples/
    │   ├── blue/
    │   └── yellow/
    └── output/                     # Created on your first run
```

Copy this entire utility folder into another repository if needed. Brand values belong to Theme/Client Brand tokens; this utility does not change Base Design System, neutral, semantic-status, or focus values. Existing versions and their generated output are preserved.

**한국어 설명**

저장소의 버전 보존 규칙에 따라 v1.0을 그대로 두고 v1.1을 별도 폴더로 추가합니다. 다른 프로젝트에서도 폴더 전체를 복사해 사용할 수 있습니다. 승인된 공통 기반과 상태 색상 문서는 변경하지 않습니다.

## Eleven levels and the five-step rule

Levels, from light to dark:

```text
50 → 100 → 200 → 300 → 400 → 500 → 600 → 700 → 800 → 900 → 950
```

The reference background for the targets is **white, #FFFFFF**, consistent with the repository's contrast reporting convention. Target ratios are `21^(index/10)` for indices 0–10:

```text
1.0000, 1.3559, 1.8384, 2.4927, 3.3798, 4.5826,
6.2134, 8.4247, 11.4229, 15.4881, 21.0000
```

Search OKLCH L for each target, keeping source hue/chroma where sRGB allows it. Reduce chroma at fixed target L/hue to fit sRGB, then audit the rounded HEX. The Markdown report shows target and actual ratios, which may differ slightly because 8-bit HEX is discrete.

Before rounding, each five-step pair has contrast `sqrt(21) ≈ 4.5826:1`, giving room above 4.5:1. The utility checks **all 21 pairs with a positional gap of at least five**, including these six exact-five pairs:

| Lighter level | Darker level | Positions apart |
| --- | --- | --- |
| 50 | 500 | 5 |
| 100 | 600 | 5 |
| 200 | 700 | 5 |
| 300 | 800 | 5 |
| 400 | 900 | 5 |
| 500 | 950 | 5 |

Five steps means list positions, not numeric subtraction. Each Primary/Secondary palette is audited separately. The guarantee does not cover mixed Primary/Secondary pairs, source colors, state colors, opacity, or gradients. A failing final palette stops the command before any output files are written.

The endpoints are intentionally pure white (50) and pure black (950). Source Primary/Secondary are preserved separately, **not forced into level 500**. The closest level by white contrast is reported, but it is not necessarily an exact HEX or perceptual color match.

**한국어 설명**

단순 명도 등분이 아니라 흰색 기준 목표 대비율에 맞춰 생성합니다. 예를 들어 100과 600, 500과 950은 다섯 칸 차이입니다. 팔레트마다 5단계 이상 떨어진 21개 조합을 최종 HEX로 검사하며, 원본 색상은 별도로 보존합니다. 모든 목표를 담기 위해 50은 흰색, 950은 검정입니다. 원본 브랜드 색상이 500과 같다고 가정하지 마세요.

## Secondary generation

Default `secondary: "auto"` is a deterministic hue-based suggestion:

- Rotate Primary's OKLCH hue by `secondaryHueOffset`, default **+30°**.
- Use 80% of Primary chroma, capped at 0.18.
- Keep seed L within 0.45–0.70, then fit to sRGB.
- For near-neutral Primary (C < 0.005), use a documented muted-blue seed: L 0.55, C 0.08, hue 260°. The report identifies this fallback; hue rotation does not apply to it.
- Generate Secondary's own 11 levels and four interaction states from the suggested seed.

Hue rotation is a starting suggestion, not a universal measure of harmony. Supply a chosen HEX to override it:

```powershell
node generate-brand-colors.js "#123E88" --secondary "#008577" --out "output/custom"
node generate-brand-colors.js "#123E88" --secondary-hue -30 --out "output/other-hue"
```

**한국어 설명**

기본 Secondary는 Primary의 색상 각도를 +30° 이동한 제안입니다. 채도와 밝기를 조절하고 별도 팔레트를 생성합니다. 색상 조화는 프로젝트 분위기에 따라 검토해야 하며, `--secondary`로 원하는 색을 직접 지정할 수 있습니다. 무채색 Primary는 색상 각도가 없으므로 명시된 차분한 파랑을 제안합니다.

## Configuration

Edit `config.json`, save, and rerun the command. CLI flags override validated configuration.

| Setting | Default | Meaning |
| --- | --- | --- |
| `primary` | `#123E88` | Original opaque 3-/6-digit HEX |
| `secondary` | `auto` | Automatic suggestion or explicit HEX |
| `secondaryHueOffset` | `30` | Hue rotation in degrees, −180 through 180 |
| `textColor` | `white` | Solid state text: white, black, auto |
| `minContrast` | `4.5` | State text / palette best-text threshold; 3–21 |
| `hoverDelta` | `0.08` | Subtract from source L for Hover |
| `pressedDelta` | `0.16` | Subtract from source L for Pressed |
| `subtleLightness` | `0.96` | Subtle target L, 0.8–1 |
| `subtleChromaFactor` | `0.15` | Subtle chroma multiplier, 0–1 |
| `outputDir` | `output` | Relative to the config file |

The approved **five-step / 4.5:1 palette-pair rule is fixed** and independent of `minContrast`. Raising text checks to 7:1 does not turn palette pair checks into 7:1. Some palette tones cannot support 7:1 with either white or black; these are marked FAIL with a warning instead of changing the target ladder.

L uses 0–1. Delta 0.08 is eight percentage points, not 8% relative reduction. State deltas must satisfy `0 < hoverDelta < pressedDelta < 1`. `auto` state text chooses white/black against each source and keeps it consistent across that family's solid states. Subtle uses black text.

**한국어 설명**

Primary와 Secondary는 설정 파일에서도 바꿀 수 있습니다. `minContrast`는 사용하는 텍스트의 대비 검사 기준이며, 승인된 5단계 차이 최소 4.5:1 규칙은 별도로 고정합니다. 7:1로 설정하면 일부 팔레트의 흰색·검정 텍스트가 실패할 수 있으므로 보고서를 확인하세요.

## Output and CSS usage

Markdown includes both 11-tone tables, all eligible pair checks, source colors, automatic Secondary details, state corrections, and warnings. PASS/FAIL uses unrounded ratios. White and black are alternative foregrounds; both do not need to pass.

CSS exports source colors, numbered palette values, matching best-contrast text values, and interaction states. HEX values are the exact audited colors; OKLCH comments are descriptive.

```css
/* A checked five-position pair from the same palette */
.brand-panel {
  background: var(--brand-primary-100);
  color: var(--brand-primary-600);
}

/* A suggested white/black text foreground for a numbered tone */
.brand-badge {
  background: var(--brand-secondary-500);
  color: var(--brand-on-secondary-500);
}

/* Existing state-token usage remains valid */
.button-primary {
  background: var(--brand-primary);
  color: var(--brand-on-primary);
}
.button-primary:hover { background: var(--brand-primary-hover); }
.button-primary:active { background: var(--brand-primary-pressed); }
```

Load `output/brand-tokens.css` into your application using a stylesheet link or CSS import. `--brand-primary-source` and `--brand-secondary-source` preserve identity colors; check contrast before using them as UI backgrounds. Source and state values are not part of the numbered-palette guarantee.

**한국어 설명**

Markdown에는 목표·실제 대비율과 팔레트 조합 검사 결과가 들어갑니다. CSS는 숫자 팔레트와 대응 텍스트 색상, 기존 상태 색상을 함께 제공합니다. 위 예제의 Primary 100과 600은 검증된 다섯 칸 차이 조합입니다. CSS 파일을 실제 앱에 연결해야 화면에 적용됩니다.

## Commands and safeguards

```powershell
npm run generate -- --primary "#123E88"
node generate-brand-colors.js --config "./my-brand.json"
node generate-brand-colors.js "#123E88" --min-contrast 7 --out "output/aaa"
node generate-brand-colors.js --help
npm test
```

`--out` is relative to your terminal directory; configured `outputDir` is relative to the config file. Absolute paths work too. Unknown options/config keys, invalid JSON/HEX/settings, and invalid palettes stop with a readable error and a nonzero exit code.

Existing output is protected unless `--force` is supplied. Only `brand-tokens.md` and `brand-tokens.css` in the chosen folder are replaced; target files must be regular files. Complete contents are staged first on forced writes, but the two replacements are not one filesystem transaction. Do not generate concurrently into one output folder.

State Default starts at its source color. If the selected text fails, the whole solid ramp moves darker for white text or lighter for black text. Chroma is reduced as needed for sRGB; states can collapse at lightness limits and will produce a warning. Palette creation preserves the target ladder separately from state adjustment.

**한국어 설명**

기존 결과를 의도적으로 교체할 때만 `--force`를 사용하세요. 잘못된 입력이나 대비 규칙 실패가 있으면 파일을 생성하지 않습니다. 상태 색상은 기존 방식으로 보정하며, 명도 한계에서 같은 색이 되면 경고합니다.

## Validation and scope

Tests cover WCAG/Oklab reference values, actual HEX contrast, 11-level order/targets, every qualifying pair, saturated/neutral/extreme colors, Secondary overrides/fallback, output consistency, no-overwrite behavior, invalid input, and deterministic generation.

Normal text generally requires 4.5:1; large text requires 3:1 under [WCAG 2.2](https://www.w3.org/TR/WCAG22/#contrast-minimum). Large means at least 18 pt, or 14 pt bold. A 7:1 setting can check AAA normal-text contrast. Text-pair checks alone do not certify the full interface. Recheck other foregrounds, cross-family mixtures, transparency, images, gradients, focus rings, and component boundaries.

**한국어 설명**

참조 계산값, 최종 HEX, 모든 5단계 이상 조합, 무채색·고채도·검정·흰색, Secondary 지정, 파일 보호를 검사합니다. 팔레트 대비 검사만으로 전체 접근성이 검증되는 것은 아니며 실제 사용 조합과 표면을 확인해야 합니다.

## Calculation references

- [Oklab conversion matrices by Björn Ottosson](https://bottosson.github.io/posts/oklab/)
- [WCAG 2.2 contrast ratio](https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio)
- [WCAG relative luminance](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance)

**한국어 설명**

색상 변환은 Oklab 행렬, 대비율은 WCAG 상대 휘도 공식을 사용합니다. 목표 대비율 생성은 이 공식을 기준으로 설계했으며 특정 UI 프레임워크에 의존하지 않습니다.
