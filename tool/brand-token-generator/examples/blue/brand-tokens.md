# Brand tokens

- Source Primary: `#123E88` (oklch(38.1889% 0.132901 260.380))
- Contrast target: **4.5:1**
- Solid text: `#FFFFFF`; Subtle text: `#000000`
- Solid ramp lightness shift: **+0.000000** (absolute OKLCH L units).

## Final tokens

| State | Initial HEX | Final HEX | White text | Black text | Best text | Used text |
| --- | --- | --- | --- | --- | --- | --- |
| default | #123E88 | #123E88 | 10.1435:1 PASS | 2.0703:1 FAIL | #FFFFFF | #FFFFFF |
| hover | #00286C | #00286C | 13.8153:1 PASS | 1.5201:1 FAIL | #FFFFFF | #FFFFFF |
| pressed | #001745 | #001745 | 17.3770:1 PASS | 1.2085:1 FAIL | #FFFFFF | #FFFFFF |
| subtle | #EBF2FF | #EBF2FF | 1.1244:1 FAIL | 18.6773:1 PASS | #000000 | #000000 |

PASS/FAIL uses unrounded ratios. Displayed ratios are rounded for reading.
White and black are alternative foregrounds; they are not both required to pass.
Best text is the higher-contrast choice per state. Used text stays consistent across the solid states.

## Conversion and adjustments

| State | Final OKLCH (from saved HEX) | L shift | HEX changed | Final gamut reduction |
| --- | --- | --- | --- | --- |
| default | oklch(38.1889% 0.132901 260.380) | +0.000000 | No | No |
| hover | oklch(30.2449% 0.126061 260.390) | +0.000000 | No | Yes |
| pressed | oklch(22.2904% 0.092250 260.264) | +0.000000 | No | Yes |
| subtle | oklch(95.9676% 0.019007 263.009) | +0.000000 | No | Yes |

Initial candidates: Default = source Primary, Hover = L − hoverDelta, Pressed = L − pressedDelta; L is clamped to 0–1.
Subtle = L 0.96, source chroma × 0.15.
If needed, the entire solid ramp shifts toward black for white text or toward white for black text. Subtle only shifts toward white for black text.
Hue stays fixed during adjustment; chroma decreases when needed for sRGB. Rounded HEX conversion can slightly change the measured OKLCH.

## Notes

- Chroma was reduced for some final colors to fit sRGB while keeping the target hue and lightness.
- These checks cover opaque text on the exact token background. Recheck transparency, gradients, images, and other foregrounds.
- Text contrast alone does not verify focus rings, component boundaries, or overall accessibility.

## References

- [WCAG 2.2 text contrast](https://www.w3.org/TR/WCAG22/#contrast-minimum)
- [WCAG relative luminance](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance)
- [Oklab conversion by Björn Ottosson](https://bottosson.github.io/posts/oklab/)
