# Brand tokens v1.1

## Generation summary

- Source Primary: `#123E88` (oklch(38.1889% 0.132901 260.380))
- Source Secondary: `#56498B` (auto, hue offset 30°)
- Contrast target: **4.5:1** for state text and palette best-text checks.
- Palette pair rule: **step gap ≥ 5 → actual contrast ≥ 4.5:1**, separately for Primary and Secondary.
- All PASS/FAIL results use unrounded ratios; displayed numbers are rounded.

The 11 target ratios against white are 21^(index/10), for indices 0 through 10. Continuous five-step ratios are √21 ≈ 4.5826:1; every eligible final HEX pair is checked independently.
Levels 50 and 950 are white and black endpoints. Source colors are preserved separately and are not forced into level 500.

**한국어 설명**

Primary·Secondary를 각각 11단계로 생성합니다. 흰색 기준 목표 대비율로 단계를 정한 뒤, 같은 팔레트에서 5단계 이상 떨어진 모든 색상 조합이 최소 4.5:1인지 최종 HEX로 검사합니다. 양 끝은 흰색·검정이며 원본 색상은 별도로 보존합니다.

## Primary 11-tone palette

Source: `#123E88`. Nearest level by white contrast: **800** (not an exact source-color match).
Minimum actual contrast across all 21 eligible pairs: **4.5481:1**.

| Level | Final HEX | Target on white | Actual on white | Black text | Best text | Best-text target |
| --- | --- | --- | --- | --- | --- | --- |
| 50 | #FFFFFF | 1.0000:1 | 1.0000:1 FAIL | 21.0000:1 PASS | #000000 | 21.0000:1 PASS |
| 100 | #CBDFFF | 1.3559:1 | 1.3515:1 FAIL | 15.5384:1 PASS | #000000 | 15.5384:1 PASS |
| 200 | #9BC1FF | 1.8384:1 | 1.8316:1 FAIL | 11.4657:1 PASS | #000000 | 11.4657:1 PASS |
| 300 | #73A4F8 | 2.4927:1 | 2.5016:1 FAIL | 8.3946:1 PASS | #000000 | 8.3946:1 PASS |
| 400 | #5C8BDD | 3.3798:1 | 3.3914:1 FAIL | 6.1922:1 PASS | #000000 | 6.1922:1 PASS |
| 500 | #4675C4 | 4.5826:1 | 4.5632:1 PASS | 4.6020:1 PASS | #000000 | 4.6020:1 PASS |
| 600 | #325FAD | 6.2134:1 | 6.2205:1 PASS | 3.3759:1 FAIL | #FFFFFF | 6.2205:1 PASS |
| 700 | #1E4B96 | 8.4247:1 | 8.3932:1 PASS | 2.5020:1 FAIL | #FFFFFF | 8.3932:1 PASS |
| 800 | #09367F | 11.4229:1 | 11.3775:1 PASS | 1.8457:1 FAIL | #FFFFFF | 11.3775:1 PASS |
| 900 | #00205A | 15.4881:1 | 15.5068:1 PASS | 1.3542:1 FAIL | #FFFFFF | 15.5068:1 PASS |
| 950 | #000000 | 21.0000:1 | 21.0000:1 PASS | 1.0000:1 FAIL | #FFFFFF | 21.0000:1 PASS |

Targets use white as the reference; PASS/FAIL in the text columns uses the configured text threshold.
The stored HEX is the closest searched color to the continuous contrast target, so target and actual may differ slightly.

**한국어 설명**

흰색 기준 목표 대비율에 맞춘 11단계입니다. 목표값과 최종 HEX의 실제 대비율을 함께 표시합니다. Best text는 흰색·검정 중 대비가 높은 색이며, 통과 표시는 설정한 텍스트 대비 기준으로 판정합니다.

### Five-step pair checks

| Lighter level | Darker level | Step gap | Actual contrast | Result |
| --- | --- | --- | --- | --- |
| 50 | 500 | 5 | 4.5632:1 | PASS |
| 50 | 600 | 6 | 6.2205:1 | PASS |
| 50 | 700 | 7 | 8.3932:1 | PASS |
| 50 | 800 | 8 | 11.3775:1 | PASS |
| 50 | 900 | 9 | 15.5068:1 | PASS |
| 50 | 950 | 10 | 21.0000:1 | PASS |
| 100 | 600 | 5 | 4.6027:1 | PASS |
| 100 | 700 | 6 | 6.2103:1 | PASS |
| 100 | 800 | 7 | 8.4185:1 | PASS |
| 100 | 900 | 8 | 11.4739:1 | PASS |
| 100 | 950 | 9 | 15.5384:1 | PASS |
| 200 | 700 | 5 | 4.5825:1 | PASS |
| 200 | 800 | 6 | 6.2120:1 | PASS |
| 200 | 900 | 7 | 8.4665:1 | PASS |
| 200 | 950 | 8 | 11.4657:1 | PASS |
| 300 | 800 | 5 | 4.5481:1 | PASS |
| 300 | 900 | 6 | 6.1988:1 | PASS |
| 300 | 950 | 7 | 8.3946:1 | PASS |
| 400 | 900 | 5 | 4.5724:1 | PASS |
| 400 | 950 | 6 | 6.1922:1 | PASS |
| 500 | 950 | 5 | 4.6020:1 | PASS |

Step gap counts positions in the 11-level list, not subtraction of numeric token labels.
The 4.5:1 guarantee applies within this palette. It does not automatically cover original source colors, state tokens, or arbitrary mixtures with the other palette.

**한국어 설명**

5레벨 차이는 목록에서 다섯 칸 떨어진 관계입니다. 예: 50↔500, 100↔600, 500↔950. 5단계 이상 떨어진 21개 조합을 최종 HEX로 검사합니다. 원본 색상·상태 색상·Primary와 Secondary를 섞은 조합은 별도로 검사해야 합니다.

## Secondary 11-tone palette

Source: `#56498B`. Nearest level by white contrast: **700** (not an exact source-color match).
Minimum actual contrast across all 21 eligible pairs: **4.5690:1**.

| Level | Final HEX | Target on white | Actual on white | Black text | Best text | Best-text target |
| --- | --- | --- | --- | --- | --- | --- |
| 50 | #FFFFFF | 1.0000:1 | 1.0000:1 FAIL | 21.0000:1 PASS | #000000 | 21.0000:1 PASS |
| 100 | #DED9FF | 1.3559:1 | 1.3570:1 FAIL | 15.4751:1 PASS | #000000 | 15.4751:1 PASS |
| 200 | #C1B6FF | 1.8384:1 | 1.8417:1 FAIL | 11.4027:1 PASS | #000000 | 11.4027:1 PASS |
| 300 | #A69BE4 | 2.4927:1 | 2.4910:1 FAIL | 8.4302:1 PASS | #000000 | 8.4302:1 PASS |
| 400 | #8E82CA | 3.3798:1 | 3.3892:1 FAIL | 6.1961:1 PASS | #000000 | 6.1961:1 PASS |
| 500 | #786CB2 | 4.5826:1 | 4.5786:1 PASS | 4.5865:1 PASS | #000000 | 4.5865:1 PASS |
| 600 | #64579B | 6.2134:1 | 6.2159:1 PASS | 3.3785:1 FAIL | #FFFFFF | 6.2159:1 PASS |
| 700 | #514385 | 8.4247:1 | 8.4289:1 PASS | 2.4914:1 FAIL | #FFFFFF | 8.4289:1 PASS |
| 800 | #3E2F6E | 11.4229:1 | 11.4342:1 PASS | 1.8366:1 FAIL | #FFFFFF | 11.4342:1 PASS |
| 900 | #291855 | 15.4881:1 | 15.4854:1 PASS | 1.3561:1 FAIL | #FFFFFF | 15.4854:1 PASS |
| 950 | #000000 | 21.0000:1 | 21.0000:1 PASS | 1.0000:1 FAIL | #FFFFFF | 21.0000:1 PASS |

Targets use white as the reference; PASS/FAIL in the text columns uses the configured text threshold.
The stored HEX is the closest searched color to the continuous contrast target, so target and actual may differ slightly.

**한국어 설명**

흰색 기준 목표 대비율에 맞춘 11단계입니다. 목표값과 최종 HEX의 실제 대비율을 함께 표시합니다. Best text는 흰색·검정 중 대비가 높은 색이며, 통과 표시는 설정한 텍스트 대비 기준으로 판정합니다.

### Five-step pair checks

| Lighter level | Darker level | Step gap | Actual contrast | Result |
| --- | --- | --- | --- | --- |
| 50 | 500 | 5 | 4.5786:1 | PASS |
| 50 | 600 | 6 | 6.2159:1 | PASS |
| 50 | 700 | 7 | 8.4289:1 | PASS |
| 50 | 800 | 8 | 11.4342:1 | PASS |
| 50 | 900 | 9 | 15.4854:1 | PASS |
| 50 | 950 | 10 | 21.0000:1 | PASS |
| 100 | 600 | 5 | 4.5805:1 | PASS |
| 100 | 700 | 6 | 6.2113:1 | PASS |
| 100 | 800 | 7 | 8.4260:1 | PASS |
| 100 | 900 | 8 | 11.4113:1 | PASS |
| 100 | 950 | 9 | 15.4751:1 | PASS |
| 200 | 700 | 5 | 4.5768:1 | PASS |
| 200 | 800 | 6 | 6.2086:1 | PASS |
| 200 | 900 | 7 | 8.4084:1 | PASS |
| 200 | 950 | 8 | 11.4027:1 | PASS |
| 300 | 800 | 5 | 4.5901:1 | PASS |
| 300 | 900 | 6 | 6.2165:1 | PASS |
| 300 | 950 | 7 | 8.4302:1 | PASS |
| 400 | 900 | 5 | 4.5690:1 | PASS |
| 400 | 950 | 6 | 6.1961:1 | PASS |
| 500 | 950 | 5 | 4.5865:1 | PASS |

Step gap counts positions in the 11-level list, not subtraction of numeric token labels.
The 4.5:1 guarantee applies within this palette. It does not automatically cover original source colors, state tokens, or arbitrary mixtures with the other palette.

**한국어 설명**

5레벨 차이는 목록에서 다섯 칸 떨어진 관계입니다. 예: 50↔500, 100↔600, 500↔950. 5단계 이상 떨어진 21개 조합을 최종 HEX로 검사합니다. 원본 색상·상태 색상·Primary와 Secondary를 섞은 조합은 별도로 검사해야 합니다.

## Primary state tokens

Solid text: `#FFFFFF`. Solid L shift: **+0.000000**. Subtle text: `#000000`.

| State | Initial HEX | Final HEX | White text | Black text | Best text | Used text |
| --- | --- | --- | --- | --- | --- | --- |
| default | #123E88 | #123E88 | 10.1435:1 PASS | 2.0703:1 FAIL | #FFFFFF | #FFFFFF |
| hover | #00286C | #00286C | 13.8153:1 PASS | 1.5201:1 FAIL | #FFFFFF | #FFFFFF |
| pressed | #001745 | #001745 | 17.3770:1 PASS | 1.2085:1 FAIL | #FFFFFF | #FFFFFF |
| subtle | #EBF2FF | #EBF2FF | 1.1244:1 FAIL | 18.6773:1 PASS | #000000 | #000000 |

| State | Final OKLCH (from saved HEX) | L shift | HEX changed | Final gamut reduction |
| --- | --- | --- | --- | --- |
| default | oklch(38.1889% 0.132901 260.380) | +0.000000 | No | No |
| hover | oklch(30.2449% 0.126061 260.390) | +0.000000 | No | Yes |
| pressed | oklch(22.2904% 0.092250 260.264) | +0.000000 | No | Yes |
| subtle | oklch(95.9676% 0.019007 263.009) | +0.000000 | No | Yes |

State generation preserves v1.0 behavior: Default starts at the source, Hover/Pressed use the configured L deltas. If needed, shift the solid ramp together to pass the used-text target.

**한국어 설명**

기존 상태 컬러 생성 방식을 유지합니다. 원본에서 Hover·Pressed 명도를 낮추고, 사용하는 텍스트 대비가 부족하면 상태 색상의 명도를 함께 보정합니다. 상태 컬러와 11단계 팔레트는 별도로 출력합니다.

## Secondary state tokens

Solid text: `#FFFFFF`. Solid L shift: **+0.000000**. Subtle text: `#000000`.

| State | Initial HEX | Final HEX | White text | Black text | Best text | Used text |
| --- | --- | --- | --- | --- | --- | --- |
| default | #56498B | #56498B | 7.7163:1 PASS | 2.7215:1 FAIL | #FFFFFF | #FFFFFF |
| hover | #413373 | #413373 | 10.7922:1 PASS | 1.9459:1 FAIL | #FFFFFF | #FFFFFF |
| pressed | #2D1D5B | #2D1D5B | 14.5997:1 PASS | 1.4384:1 FAIL | #FFFFFF | #FFFFFF |
| subtle | #F1F0FC | #F1F0FC | 1.1284:1 FAIL | 18.6098:1 PASS | #000000 | #000000 |

| State | Final OKLCH (from saved HEX) | L shift | HEX changed | Final gamut reduction |
| --- | --- | --- | --- | --- |
| default | oklch(45.0351% 0.105450 290.587) | +0.000000 | No | No |
| hover | oklch(37.1158% 0.105802 290.364) | +0.000000 | No | No |
| pressed | oklch(29.0523% 0.105662 290.116) | +0.000000 | No | No |
| subtle | oklch(95.9377% 0.016017 289.931) | +0.000000 | No | No |

State generation preserves v1.0 behavior: Default starts at the source, Hover/Pressed use the configured L deltas. If needed, shift the solid ramp together to pass the used-text target.

**한국어 설명**

기존 상태 컬러 생성 방식을 유지합니다. 원본에서 Hover·Pressed 명도를 낮추고, 사용하는 텍스트 대비가 부족하면 상태 색상의 명도를 함께 보정합니다. 상태 컬러와 11단계 팔레트는 별도로 출력합니다.

## Notes

- Chroma was reduced for some final colors to fit sRGB while keeping the target hue and lightness.
- Automatic Secondary is a hue-based suggestion; visual harmony still depends on the project. Override it with an explicit HEX when needed.
- Hue is held during generation; chroma decreases for sRGB. Rounded HEX can slightly change measured OKLCH.
- Checks cover opaque, solid-color pairs. Recheck opacity, gradients, images, different foregrounds, and cross-palette combinations.
- No Base Design System, neutral, semantic-status, or focus values are generated or modified.

**한국어 설명**

자동 Secondary는 색상 각도 기반 제안입니다. 프로젝트 분위기에 맞는지 확인하고 직접 HEX를 지정할 수 있습니다. 이 결과는 브랜드용 토큰이며 Base Design System과 승인된 중립·상태·포커스 규칙을 변경하지 않습니다.

## References

- [WCAG 2.2 text contrast](https://www.w3.org/TR/WCAG22/#contrast-minimum)
- [WCAG relative luminance](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance)
- [Oklab conversion by Björn Ottosson](https://bottosson.github.io/posts/oklab/)

**한국어 설명**

대비율은 WCAG 상대 휘도 공식을 사용하며, 색상 변환은 Oklab 변환 행렬을 사용합니다.
