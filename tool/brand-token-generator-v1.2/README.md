# Brand Token Generator v1.2

Generate Primary/Secondary brand colors with a **0–100 grade system** matching the supplied magic-number diagram. There are 11 brand grades (5–95), plus white 0 and black 100. Default/Hover/Pressed/Subtle generation remains available. Node.js/JavaScript only; no package installation or network access is required at runtime.

**한국어 설명**

첨부 이미지처럼 등급 숫자의 차이를 매직넘버로 사용합니다. 브랜드 팔레트 11단계와 흰색·검정 기준점을 생성하며, 기존 상태 컬러 기능도 유지합니다.

## Start in VS Code

Use Node.js 22 or newer. Open the utility in VS Code and select **Terminal → New Terminal**. For the installed copy:

```powershell
cd "C:\Users\WS-DESIGN\Desktop\designsystem\tool\brand-token-generator-v1.2"
node generate-brand-colors.js "#123E88"
```

If this folder itself is already open, run only the second line. Always quote HEX colors; PowerShell treats unquoted `#` as a comment. The first run creates `output/brand-tokens.md` and `output/brand-tokens.css`. Open the Markdown preview to read all checks.

```powershell
# Keep a separate palette
node generate-brand-colors.js "#FFCC00" --out "output/yellow"

# Intentionally replace the two generated files
node generate-brand-colors.js "#FFCC00" --force
```

**한국어 설명**

상위 폴더는 `tools`가 아닌 `tool`입니다. 새 버전은 `brand-token-generator-v1.2`에서 실행합니다. 결과는 `output`에 저장되며, 다시 생성할 때는 다른 `--out` 폴더를 지정하거나 의도적으로 교체할 경우 `--force`를 추가합니다.

## Magic-number rules

**Magic number = absolute difference between grade numbers.** It does not mean the number of swatches between two colors, HSL lightness percentage, or OKLCH L percentage.

| Minimum grade difference | Minimum actual contrast | Example |
| --- | --- | --- |
| 40 | 3:1 | 0 ↔ 40 |
| 50 | 4.5:1 | 0 ↔ 50 |
| 70 | 7:1 | 10 ↔ 80 |
| 90 | 15:1 | 10 ↔ 100 |

These thresholds follow [KRDS color guidance](https://www.krds.go.kr/html/site/style/style_02.html). The strongest applicable threshold is checked for every pair; for example, a grade difference of 90 requires 15:1, which also exceeds the lower thresholds. A difference below 40 has no automatic guarantee from this system.

Grades in order:

```text
0 | 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 100
```

The 11 interior grades are the brand palette. Grade 0 is pure white, and 100 is pure black. Source identity colors are stored separately, not forced into grade 50. Grade 50 is adjusted to support at least 4.5:1 against both white and black.

**한국어 설명**

예를 들어 5↔50은 다섯 칸 차이지만 매직넘버는 45이므로 3:1 기준을 적용합니다. 0↔50은 여섯 칸 차이지만 매직넘버 50으로 4.5:1을 적용합니다. 11개 브랜드 단계는 5·10·20·30·40·50·60·70·80·90·95이며, 0·100은 양끝 기준점입니다.

## Generation and auditing

1. Convert source HEX to OKLCH.
2. Set each grade's target relative luminance to the middle of its band.
3. Search OKLCH L for a rounded sRGB HEX within that band. Keep source hue/chroma where possible; reduce chroma to fit sRGB.
4. Measure actual WCAG relative luminance and contrast from the saved HEX.
5. Audit all applicable pairs within Primary, within Secondary, and between Primary/Secondary.
6. Stop before saving if a grade or pair fails.

The grade bands below come from [USWDS](https://designsystem.digital.gov/design-tokens/color/overview/#magic-number), except grade 95, which is a local extension to support the supplied 11-brand-grade diagram. These are generator targets, not a claim that these generated colors are official KRDS or USWDS tokens.

| Grade | Relative luminance range |
| --- | --- |
| 0 | 1.000–1.000 |
| 5 | 0.850–0.930 |
| 10 | 0.750–0.820 |
| 20 | 0.500–0.650 |
| 30 | 0.350–0.450 |
| 40 | 0.225–0.300 |
| 50 | 0.175–0.183 |
| 60 | 0.100–0.125 |
| 70 | 0.050–0.070 |
| 80 | 0.020–0.040 |
| 90 | 0.005–0.015 |
| 95 | 0.002–0.004 (local extension) |
| 100 | 0.000–0.000 |

Target contrast against white is `1.05 / (target luminance + 0.05)`. Actual target ratios may differ slightly after HEX quantization; actual band membership and every applicable pair are always checked without rounding. The report displays both target and measured values.

**한국어 설명**

등급마다 상대 휘도 범위를 정하고, 그 범위에 들어가는 최종 HEX를 찾도록 명도를 보정합니다. 95등급 범위는 이번 도구의 확장값입니다. 생성된 색상은 공식 팔레트 복제가 아니라 브랜드 입력값으로 만든 결과이며, 최종 HEX로 매직넘버 조건을 직접 검사합니다.

## Secondary and interaction states

Secondary behavior is unchanged from v1.1. Automatic generation rotates Primary's hue by +30° by default, uses 80% chroma capped at 0.18, and keeps seed L within 0.45–0.70. Near-neutral Primary (C < 0.005) uses a muted-blue fallback (L 0.55, C 0.08, hue 260°), reported explicitly. This is a starting suggestion for visual review, not a universal harmony test.

```powershell
node generate-brand-colors.js "#123E88" --secondary "#008577" --out "output/custom"
node generate-brand-colors.js "#123E88" --secondary-hue -30 --out "output/other-hue"
```

Default/Hover/Pressed/Subtle are still generated separately for both sources. Hover and Pressed start at source L minus the configured deltas. If selected state text fails, move the entire solid ramp darker for white text or lighter for black text. Subtle uses black text. Extreme colors can produce identical states, with a warning.

**한국어 설명**

Secondary 자동 제안과 기존 상태 생성 방식은 유지합니다. 직접 Secondary HEX나 색상 각도 차이를 지정할 수 있습니다. 상태 컬러와 원본 색상은 숫자 등급 팔레트에 포함되지 않으므로 매직넘버 보장은 별도로 적용하지 않습니다.

## Configuration and commands

Edit `config.json`, then rerun. CLI overrides are applied after validating the file.

| Setting | Default | Meaning |
| --- | --- | --- |
| `primary` | `#123E88` | Opaque 3-/6-digit HEX |
| `secondary` | `auto` | Suggested color or explicit HEX |
| `secondaryHueOffset` | `30` | Rotation in degrees, −180 through 180 |
| `textColor` | `white` | Solid state text: white, black, auto |
| `minContrast` | `4.5` | State-text and grade best-text check, range 3–21 |
| `hoverDelta` | `0.08` | Absolute source L subtraction for Hover |
| `pressedDelta` | `0.16` | Absolute source L subtraction for Pressed |
| `subtleLightness` | `0.96` | Subtle L, range 0.8–1 |
| `subtleChromaFactor` | `0.15` | Subtle chroma multiplier, range 0–1 |
| `outputDir` | `output` | Relative to the config file |

L uses a 0–1 scale: 0.08 means eight percentage points. Require `0 < hoverDelta < pressedDelta < 1`. `auto` chooses one consistent solid text color per family. The four magic-number thresholds are fixed and independent of `minContrast`. Setting text to 7:1 does not redefine the grade rules; tones without a passing white/black foreground are marked FAIL with a warning.

```powershell
npm run generate -- --primary "#123E88"
node generate-brand-colors.js --config "./my-brand.json"
node generate-brand-colors.js "#123E88" --min-contrast 7 --out "output/aaa"
node generate-brand-colors.js --help
npm test
```

**한국어 설명**

설정 파일과 명령어 사용법은 기존 버전과 같습니다. `minContrast`는 상태 텍스트와 흰색·검정 추천 텍스트 검사 기준이며 매직넘버 40·50·70·90 규칙은 별도로 고정합니다. 7:1 설정에서는 일부 등급의 추천 텍스트가 실패할 수 있으니 보고서를 확인하세요.

## CSS and migration from v1.1

New grades use an explicit `grade` namespace. The v1.1 50–950 scale is not exported or silently relabeled. Update stylesheet references when adopting the new scale; existing interaction-state variable names remain valid.

```css
/* Mixed palettes, magic number 60 - 10 = 50: checked >= 4.5:1 */
.brand-panel {
  background: var(--brand-primary-grade-10);
  color: var(--brand-secondary-grade-60);
}

/* Suggested black/white foreground for this grade */
.brand-badge {
  background: var(--brand-secondary-grade-50);
  color: var(--brand-on-secondary-grade-50);
}

/* Existing state names */
.button-primary {
  background: var(--brand-primary);
  color: var(--brand-on-primary);
}
.button-primary:hover { background: var(--brand-primary-hover); }
.button-primary:active { background: var(--brand-primary-pressed); }
```

Load `output/brand-tokens.css` in your app via CSS import or a stylesheet link. Source variables preserve identity HEX but do not carry a grade guarantee. The approved repository Neutral / 0–950 scale is separate; its numeric labels must not be treated as these magic-number grades.

**한국어 설명**

새 변수는 `--brand-primary-grade-50`처럼 등급임을 명시합니다. 기존 v1.1 숫자 팔레트를 사용하는 CSS는 새 변수로 연결해야 합니다. Hover·Pressed 변수 이름은 유지합니다. 기존 승인 Neutral 팔레트의 숫자는 이번 등급 체계와 의미가 다르므로 매직넘버를 자동 적용하지 마세요.

## Files, protection, and scope

```text
brand-token-generator-v1.2/
├── generate-brand-colors.js
├── config.json
├── package.json
├── README.md
├── src/
│   ├── color.js
│   ├── palette.js
│   ├── generator.js
│   └── output.js
├── test/
│   ├── generator.test.js
│   └── palette.test.js
├── examples/blue/ and examples/yellow/
└── output/                     # Created on first run
```

v1.0/v1.1 and their output are preserved. Only the new utility folder is added to the design-system project. Base, Theme, neutral, semantic-status, and focus rules are not changed.

`--out` is relative to the terminal directory; configured `outputDir` is relative to the config file. Existing generated files are protected unless `--force` is explicit. Only the two fixed generated filenames are replaced, and targets must be regular files. Forced writes stage complete contents first; replacing the two files is not one transaction. Avoid concurrent generation into one output folder.

The Markdown report includes grade bands/targets, actual white/black contrast, four-rule summaries, all within-family and mixed pair checks, source colors, state corrections, and warnings. Tests cover reference math, every rule, grade-band membership, saturated/neutral/extreme/random inputs, cross-family pairs, CSS values, overrides, invalid input, and no-overwrite behavior.

Guarantees apply to the exact opaque generated grade HEX pairs. Recheck opacity, gradients, images, source/state colors, other foregrounds, focus rings, and component boundaries. Normal-size text uses at least 4.5:1; the 3:1 rule alone does not establish AA contrast for normal text. The 15:1 requirement is a KRDS high-contrast target, not a separate WCAG conformance level.

**한국어 설명**

이전 버전과 승인 문서는 보존하고 v1.2 폴더를 별도로 추가합니다. 결과 보고서에서 네 가지 규칙과 Primary·Secondary 혼합 조합을 확인할 수 있습니다. 보장은 생성한 불투명 등급 색상 조합에 적용되며, 일반 본문에 매직넘버 40의 3:1만 적용하지 마세요.

## References

- [KRDS color and magic numbers](https://www.krds.go.kr/html/site/style/style_02.html)
- [USWDS grade-luminance bands](https://designsystem.digital.gov/design-tokens/color/overview/#magic-number)
- [WCAG contrast ratio](https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio)
- [Oklab conversion matrices](https://bottosson.github.io/posts/oklab/)

**한국어 설명**

KRDS 매직넘버 기준과 USWDS 상대 휘도 범위를 참고하고, Oklab 변환 및 WCAG 대비율 공식으로 결과를 계산합니다. 95등급 범위는 별도로 명시한 도구 확장값입니다.
