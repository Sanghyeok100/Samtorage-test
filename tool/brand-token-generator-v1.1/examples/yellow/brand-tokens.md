# Brand tokens v1.1

## Generation summary

- Source Primary: `#FFCC00` (oklch(86.5209% 0.176828 90.382))
- Source Secondary: `#93AB38` (auto, hue offset 30°)
- Contrast target: **4.5:1** for state text and palette best-text checks.
- Palette pair rule: **step gap ≥ 5 → actual contrast ≥ 4.5:1**, separately for Primary and Secondary.
- All PASS/FAIL results use unrounded ratios; displayed numbers are rounded.

The 11 target ratios against white are 21^(index/10), for indices 0 through 10. Continuous five-step ratios are √21 ≈ 4.5826:1; every eligible final HEX pair is checked independently.
Levels 50 and 950 are white and black endpoints. Source colors are preserved separately and are not forced into level 500.

**한국어 설명**

Primary·Secondary를 각각 11단계로 생성합니다. 흰색 기준 목표 대비율로 단계를 정한 뒤, 같은 팔레트에서 5단계 이상 떨어진 모든 색상 조합이 최소 4.5:1인지 최종 HEX로 검사합니다. 양 끝은 흰색·검정이며 원본 색상은 별도로 보존합니다.

## Primary 11-tone palette

Source: `#FFCC00`. Nearest level by white contrast: **100** (not an exact source-color match).
Minimum actual contrast across all 21 eligible pairs: **4.5704:1**.

| Level | Final HEX | Target on white | Actual on white | Black text | Best text | Best-text target |
| --- | --- | --- | --- | --- | --- | --- |
| 50 | #FFFFFF | 1.0000:1 | 1.0000:1 FAIL | 21.0000:1 PASS | #000000 | 21.0000:1 PASS |
| 100 | #FFDA6E | 1.3559:1 | 1.3543:1 FAIL | 15.5057:1 PASS | #000000 | 15.5057:1 PASS |
| 200 | #E8BA00 | 1.8384:1 | 1.8333:1 FAIL | 11.4547:1 PASS | #000000 | 11.4547:1 PASS |
| 300 | #C89F00 | 2.4927:1 | 2.4955:1 FAIL | 8.4151:1 PASS | #000000 | 8.4151:1 PASS |
| 400 | #AA8800 | 3.3798:1 | 3.3703:1 FAIL | 6.2309:1 PASS | #000000 | 6.2309:1 PASS |
| 500 | #8F7200 | 4.5826:1 | 4.5903:1 PASS | 4.5749:1 PASS | #FFFFFF | 4.5903:1 PASS |
| 600 | #775E00 | 6.2134:1 | 6.2030:1 PASS | 3.3855:1 FAIL | #FFFFFF | 6.2030:1 PASS |
| 700 | #5F4B00 | 8.4247:1 | 8.4236:1 PASS | 2.4930:1 FAIL | #FFFFFF | 8.4236:1 PASS |
| 800 | #483800 | 11.4229:1 | 11.4055:1 PASS | 1.8412:1 FAIL | #FFFFFF | 11.4055:1 PASS |
| 900 | #2E2300 | 15.4881:1 | 15.4801:1 PASS | 1.3566:1 FAIL | #FFFFFF | 15.4801:1 PASS |
| 950 | #000000 | 21.0000:1 | 21.0000:1 PASS | 1.0000:1 FAIL | #FFFFFF | 21.0000:1 PASS |

Targets use white as the reference; PASS/FAIL in the text columns uses the configured text threshold.
The stored HEX is the closest searched color to the continuous contrast target, so target and actual may differ slightly.

**한국어 설명**

흰색 기준 목표 대비율에 맞춘 11단계입니다. 목표값과 최종 HEX의 실제 대비율을 함께 표시합니다. Best text는 흰색·검정 중 대비가 높은 색이며, 통과 표시는 설정한 텍스트 대비 기준으로 판정합니다.

### Five-step pair checks

| Lighter level | Darker level | Step gap | Actual contrast | Result |
| --- | --- | --- | --- | --- |
| 50 | 500 | 5 | 4.5903:1 | PASS |
| 50 | 600 | 6 | 6.2030:1 | PASS |
| 50 | 700 | 7 | 8.4236:1 | PASS |
| 50 | 800 | 8 | 11.4055:1 | PASS |
| 50 | 900 | 9 | 15.4801:1 | PASS |
| 50 | 950 | 10 | 21.0000:1 | PASS |
| 100 | 600 | 5 | 4.5801:1 | PASS |
| 100 | 700 | 6 | 6.2197:1 | PASS |
| 100 | 800 | 7 | 8.4215:1 | PASS |
| 100 | 900 | 8 | 11.4300:1 | PASS |
| 100 | 950 | 9 | 15.5057:1 | PASS |
| 200 | 700 | 5 | 4.5947:1 | PASS |
| 200 | 800 | 6 | 6.2213:1 | PASS |
| 200 | 900 | 7 | 8.4438:1 | PASS |
| 200 | 950 | 8 | 11.4547:1 | PASS |
| 300 | 800 | 5 | 4.5704:1 | PASS |
| 300 | 900 | 6 | 6.2032:1 | PASS |
| 300 | 950 | 7 | 8.4151:1 | PASS |
| 400 | 900 | 5 | 4.5931:1 | PASS |
| 400 | 950 | 6 | 6.2309:1 | PASS |
| 500 | 950 | 5 | 4.5749:1 | PASS |

Step gap counts positions in the 11-level list, not subtraction of numeric token labels.
The 4.5:1 guarantee applies within this palette. It does not automatically cover original source colors, state tokens, or arbitrary mixtures with the other palette.

**한국어 설명**

5레벨 차이는 목록에서 다섯 칸 떨어진 관계입니다. 예: 50↔500, 100↔600, 500↔950. 5단계 이상 떨어진 21개 조합을 최종 HEX로 검사합니다. 원본 색상·상태 색상·Primary와 Secondary를 섞은 조합은 별도로 검사해야 합니다.

## Secondary 11-tone palette

Source: `#93AB38`. Nearest level by white contrast: **300** (not an exact source-color match).
Minimum actual contrast across all 21 eligible pairs: **4.5732:1**.

| Level | Final HEX | Target on white | Actual on white | Black text | Best text | Best-text target |
| --- | --- | --- | --- | --- | --- | --- |
| 50 | #FFFFFF | 1.0000:1 | 1.0000:1 FAIL | 21.0000:1 PASS | #000000 | 21.0000:1 PASS |
| 100 | #CEE878 | 1.3559:1 | 1.3603:1 FAIL | 15.4382:1 PASS | #000000 | 15.4382:1 PASS |
| 200 | #B0CA59 | 1.8384:1 | 1.8359:1 FAIL | 11.4385:1 PASS | #000000 | 11.4385:1 PASS |
| 300 | #96AE3C | 2.4927:1 | 2.4951:1 FAIL | 8.4165:1 PASS | #000000 | 8.4165:1 PASS |
| 400 | #7F951B | 3.3798:1 | 3.3777:1 FAIL | 6.2172:1 PASS | #000000 | 6.2172:1 PASS |
| 500 | #697E00 | 4.5826:1 | 4.5802:1 PASS | 4.5850:1 PASS | #000000 | 4.5850:1 PASS |
| 600 | #566800 | 6.2134:1 | 6.2207:1 PASS | 3.3758:1 FAIL | #FFFFFF | 6.2207:1 PASS |
| 700 | #455300 | 8.4247:1 | 8.4326:1 PASS | 2.4903:1 FAIL | #FFFFFF | 8.4326:1 PASS |
| 800 | #333E00 | 11.4229:1 | 11.4766:1 PASS | 1.8298:1 FAIL | #FFFFFF | 11.4766:1 PASS |
| 900 | #202700 | 15.4881:1 | 15.5369:1 PASS | 1.3516:1 FAIL | #FFFFFF | 15.5369:1 PASS |
| 950 | #000000 | 21.0000:1 | 21.0000:1 PASS | 1.0000:1 FAIL | #FFFFFF | 21.0000:1 PASS |

Targets use white as the reference; PASS/FAIL in the text columns uses the configured text threshold.
The stored HEX is the closest searched color to the continuous contrast target, so target and actual may differ slightly.

**한국어 설명**

흰색 기준 목표 대비율에 맞춘 11단계입니다. 목표값과 최종 HEX의 실제 대비율을 함께 표시합니다. Best text는 흰색·검정 중 대비가 높은 색이며, 통과 표시는 설정한 텍스트 대비 기준으로 판정합니다.

### Five-step pair checks

| Lighter level | Darker level | Step gap | Actual contrast | Result |
| --- | --- | --- | --- | --- |
| 50 | 500 | 5 | 4.5802:1 | PASS |
| 50 | 600 | 6 | 6.2207:1 | PASS |
| 50 | 700 | 7 | 8.4326:1 | PASS |
| 50 | 800 | 8 | 11.4766:1 | PASS |
| 50 | 900 | 9 | 15.5369:1 | PASS |
| 50 | 950 | 10 | 21.0000:1 | PASS |
| 100 | 600 | 5 | 4.5732:1 | PASS |
| 100 | 700 | 6 | 6.1992:1 | PASS |
| 100 | 800 | 7 | 8.4371:1 | PASS |
| 100 | 900 | 8 | 11.4220:1 | PASS |
| 100 | 950 | 9 | 15.4382:1 | PASS |
| 200 | 700 | 5 | 4.5931:1 | PASS |
| 200 | 800 | 6 | 6.2512:1 | PASS |
| 200 | 900 | 7 | 8.4628:1 | PASS |
| 200 | 950 | 8 | 11.4385:1 | PASS |
| 300 | 800 | 5 | 4.5996:1 | PASS |
| 300 | 900 | 6 | 6.2269:1 | PASS |
| 300 | 950 | 7 | 8.4165:1 | PASS |
| 400 | 900 | 5 | 4.5998:1 | PASS |
| 400 | 950 | 6 | 6.2172:1 | PASS |
| 500 | 950 | 5 | 4.5850:1 | PASS |

Step gap counts positions in the 11-level list, not subtraction of numeric token labels.
The 4.5:1 guarantee applies within this palette. It does not automatically cover original source colors, state tokens, or arbitrary mixtures with the other palette.

**한국어 설명**

5레벨 차이는 목록에서 다섯 칸 떨어진 관계입니다. 예: 50↔500, 100↔600, 500↔950. 5단계 이상 떨어진 21개 조합을 최종 HEX로 검사합니다. 원본 색상·상태 색상·Primary와 Secondary를 섞은 조합은 별도로 검사해야 합니다.

## Primary state tokens

Solid text: `#FFFFFF`. Solid L shift: **-0.295635**. Subtle text: `#000000`.

| State | Initial HEX | Final HEX | White text | Black text | Best text | Used text |
| --- | --- | --- | --- | --- | --- | --- |
| default | #FFCC00 | #917300 | 4.5101:1 PASS | 4.6562:1 PASS | #000000 | #FFFFFF |
| hover | #E0B300 | #765D00 | 6.2949:1 PASS | 3.3361:1 FAIL | #FFFFFF | #FFFFFF |
| pressed | #C29B00 | #5C4800 | 8.8161:1 PASS | 2.3820:1 FAIL | #FFFFFF | #FFFFFF |
| subtle | #F9F2DE | #F9F2DE | 1.1180:1 FAIL | 18.7836:1 PASS | #000000 | #000000 |

| State | Final OKLCH (from saved HEX) | L shift | HEX changed | Final gamut reduction |
| --- | --- | --- | --- | --- |
| default | oklch(56.8462% 0.116184 90.498) | -0.295635 | Yes | Yes |
| hover | oklch(48.9630% 0.100070 90.409) | -0.295635 | Yes | Yes |
| pressed | oklch(41.1017% 0.084005 90.499) | -0.295635 | Yes | Yes |
| subtle | oklch(96.1290% 0.027374 90.904) | +0.000000 | No | No |

State generation preserves v1.0 behavior: Default starts at the source, Hover/Pressed use the configured L deltas. If needed, shift the solid ramp together to pass the used-text target.

**한국어 설명**

기존 상태 컬러 생성 방식을 유지합니다. 원본에서 Hover·Pressed 명도를 낮추고, 사용하는 텍스트 대비가 부족하면 상태 색상의 명도를 함께 보정합니다. 상태 컬러와 11단계 팔레트는 별도로 출력합니다.

## Secondary state tokens

Solid text: `#FFFFFF`. Solid L shift: **-0.139009**. Subtle text: `#000000`.

| State | Initial HEX | Final HEX | White text | Black text | Best text | Used text |
| --- | --- | --- | --- | --- | --- | --- |
| default | #93AB38 | #6B7F00 | 4.5056:1 PASS | 4.6609:1 PASS | #000000 | #FFFFFF |
| hover | #7B9215 | #566700 | 6.2954:1 PASS | 3.3358:1 FAIL | #FFFFFF | #FFFFFF |
| pressed | #657900 | #414F00 | 8.9623:1 PASS | 2.3432:1 FAIL | #FFFFFF | #FFFFFF |
| subtle | #F0F4E5 | #F0F4E5 | 1.1184:1 FAIL | 18.7768:1 PASS | #000000 | #000000 |

| State | Final OKLCH (from saved HEX) | L shift | HEX changed | Final gamut reduction |
| --- | --- | --- | --- | --- |
| default | oklch(56.0319% 0.133131 120.074) | -0.139009 | Yes | Yes |
| hover | oklch(48.2308% 0.114865 120.300) | -0.139009 | Yes | Yes |
| pressed | oklch(40.0990% 0.095841 120.640) | -0.139009 | Yes | Yes |
| subtle | oklch(96.0047% 0.020241 118.935) | +0.000000 | No | No |

State generation preserves v1.0 behavior: Default starts at the source, Hover/Pressed use the configured L deltas. If needed, shift the solid ramp together to pass the used-text target.

**한국어 설명**

기존 상태 컬러 생성 방식을 유지합니다. 원본에서 Hover·Pressed 명도를 낮추고, 사용하는 텍스트 대비가 부족하면 상태 색상의 명도를 함께 보정합니다. 상태 컬러와 11단계 팔레트는 별도로 출력합니다.

## Notes

- Default changed from the supplied Primary to meet the selected text contrast across the solid ramp.
- Chroma was reduced for some final colors to fit sRGB while keeping the target hue and lightness.
- Secondary: Default changed from the supplied Primary to meet the selected text contrast across the solid ramp.
- Secondary: Chroma was reduced for some final colors to fit sRGB while keeping the target hue and lightness.
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
