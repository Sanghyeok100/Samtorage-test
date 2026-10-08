# Brand tokens

- Source Primary: `#FFCC00` (oklch(86.5209% 0.176828 90.382))
- Contrast target: **4.5:1**
- Solid text: `#FFFFFF`; Subtle text: `#000000`
- Solid ramp lightness shift: **-0.295635** (absolute OKLCH L units).

## Final tokens

| State | Initial HEX | Final HEX | White text | Black text | Best text | Used text |
| --- | --- | --- | --- | --- | --- | --- |
| default | #FFCC00 | #917300 | 4.5101:1 PASS | 4.6562:1 PASS | #000000 | #FFFFFF |
| hover | #E0B300 | #765D00 | 6.2949:1 PASS | 3.3361:1 FAIL | #FFFFFF | #FFFFFF |
| pressed | #C29B00 | #5C4800 | 8.8161:1 PASS | 2.3820:1 FAIL | #FFFFFF | #FFFFFF |
| subtle | #F9F2DE | #F9F2DE | 1.1180:1 FAIL | 18.7836:1 PASS | #000000 | #000000 |

PASS/FAIL uses unrounded ratios. Displayed ratios are rounded for reading.
White and black are alternative foregrounds; they are not both required to pass.
Best text is the higher-contrast choice per state. Used text stays consistent across the solid states.

## Conversion and adjustments

| State | Final OKLCH (from saved HEX) | L shift | HEX changed | Final gamut reduction |
| --- | --- | --- | --- | --- |
| default | oklch(56.8462% 0.116184 90.498) | -0.295635 | Yes | Yes |
| hover | oklch(48.9630% 0.100070 90.409) | -0.295635 | Yes | Yes |
| pressed | oklch(41.1017% 0.084005 90.499) | -0.295635 | Yes | Yes |
| subtle | oklch(96.1290% 0.027374 90.904) | +0.000000 | No | No |

Initial candidates: Default = source Primary, Hover = L − hoverDelta, Pressed = L − pressedDelta; L is clamped to 0–1.
Subtle = L 0.96, source chroma × 0.15.
If needed, the entire solid ramp shifts toward black for white text or toward white for black text. Subtle only shifts toward white for black text.
Hue stays fixed during adjustment; chroma decreases when needed for sRGB. Rounded HEX conversion can slightly change the measured OKLCH.

## Notes

- Default changed from the supplied Primary to meet the selected text contrast across the solid ramp.
- Chroma was reduced for some final colors to fit sRGB while keeping the target hue and lightness.
- These checks cover opaque text on the exact token background. Recheck transparency, gradients, images, and other foregrounds.
- Text contrast alone does not verify focus rings, component boundaries, or overall accessibility.

## References

- [WCAG 2.2 text contrast](https://www.w3.org/TR/WCAG22/#contrast-minimum)
- [WCAG relative luminance](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance)
- [Oklab conversion by Björn Ottosson](https://bottosson.github.io/posts/oklab/)
