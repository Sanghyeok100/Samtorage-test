# Brand tokens v1.2

## Generation summary

- Source Primary: `#FFCC00` (oklch(86.5209% 0.176828 90.382))
- Source Secondary: `#93AB38` (auto, hue offset 30°)
- Contrast target: **4.5:1** for state text and palette best-text checks.
- Magic number: **absolute numeric grade difference**, not a count of positions.
- Rules: **40+ → 3:1; 50+ → 4.5:1; 70+ → 7:1; 90+ → 15:1**.
- Verified scopes: Primary, Secondary, and mixed Primary/Secondary grade pairs.
- All PASS/FAIL results use unrounded ratios; displayed numbers are rounded.

Brand grades: 5 / 10 / 20 / 30 / 40 / 50 / 60 / 70 / 80 / 90 / 95. Add grade 0 (white) and 100 (black).
Source colors are preserved separately and are not forced into grade 50. CSS uses the new grade namespace: --brand-primary-grade-50.

**한국어 설명**

브랜드 팔레트는 5–95의 11단계이며, 0(흰색)과 100(검정)을 추가합니다. 칸 수가 아니라 등급 숫자 차이 40·50·70·90으로 대비 기준을 판정합니다. 같은 팔레트와 Primary·Secondary 혼합 조합을 모두 최종 HEX로 검사합니다.

## Primary grade palette

Source: `#FFCC00`. Nearest level by white contrast: **20** (not an exact source-color match).
Eleven brand grades plus two endpoints. All 41 eligible pairs meet their applicable rule.

| Minimum grade difference | Required contrast | Checked pairs | Lowest actual contrast | Result |
| --- | --- | --- | --- | --- |
| 40 | 3:1 | 41 | 3.2390:1 | PASS |
| 50 | 4.5:1 | 32 | 4.5749:1 | PASS |
| 70 | 7:1 | 17 | 9.0064:1 | PASS |
| 90 | 15:1 | 6 | 16.6865:1 | PASS |

| Level | Final HEX | Target on white | Actual on white | Black text | Best text | Best-text target |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | #FFFFFF | 1.0000:1 | 1.0000:1 FAIL | 21.0000:1 PASS | #000000 | 21.0000:1 PASS |
| 5 | #FFF2CC | 1.1170:1 | 1.1156:1 FAIL | 18.8248:1 PASS | #000000 | 18.8248:1 PASS |
| 10 | #FFE397 | 1.2575:1 | 1.2585:1 FAIL | 16.6865:1 PASS | #000000 | 16.6865:1 PASS |
| 20 | #F2C200 | 1.6800:1 | 1.6811:1 FAIL | 12.4922:1 PASS | #000000 | 12.4922:1 PASS |
| 30 | #CEA500 | 2.3333:1 | 2.3317:1 FAIL | 9.0064:1 PASS | #000000 | 9.0064:1 PASS |
| 40 | #AB8800 | 3.3600:1 | 3.3583:1 FAIL | 6.2532:1 PASS | #000000 | 6.2532:1 PASS |
| 50 | #8F7200 | 4.5852:1 | 4.5903:1 PASS | 4.5749:1 PASS | #FFFFFF | 4.5903:1 PASS |
| 60 | #745B00 | 6.4615:1 | 6.4834:1 PASS | 3.2390:1 FAIL | #FFFFFF | 6.4834:1 PASS |
| 70 | #564300 | 9.5455:1 | 9.5518:1 PASS | 2.1985:1 FAIL | #FFFFFF | 9.5518:1 PASS |
| 80 | #3D2F00 | 13.1250:1 | 13.0839:1 PASS | 1.6050:1 FAIL | #FFFFFF | 13.0839:1 PASS |
| 90 | #221800 | 17.5000:1 | 17.5194:1 PASS | 1.1987:1 FAIL | #FFFFFF | 17.5194:1 PASS |
| 95 | #0F0900 | 19.8113:1 | 19.8228:1 PASS | 1.0594:1 FAIL | #FFFFFF | 19.8228:1 PASS |
| 100 | #000000 | 21.0000:1 | 21.0000:1 PASS | 1.0000:1 FAIL | #FFFFFF | 21.0000:1 PASS |

Targets use white as the reference; PASS/FAIL in the text columns uses the configured text threshold.
The stored HEX is the closest searched color to the continuous contrast target, so target and actual may differ slightly.

**한국어 설명**

브랜드 색상 11단계(5–95)와 흰색·검정 기준점(0·100)입니다. 매직넘버는 등급 숫자의 차이이며 칸 수나 실제 명도 퍼센트가 아닙니다. Best text는 흰색·검정 중 대비가 높은 색이고, 텍스트 통과 표시는 별도 설정 기준으로 판정합니다.

### Grade luminance targets

| Grade | Allowed relative luminance | Target luminance | Actual HEX luminance |
| --- | --- | --- | --- |
| 0 | 1.000–1.000 | 1.000000 | 1.000000 |
| 5 | 0.850–0.930 | 0.890000 | 0.891239 |
| 10 | 0.750–0.820 | 0.785000 | 0.784325 |
| 20 | 0.500–0.650 | 0.575000 | 0.574608 |
| 30 | 0.350–0.450 | 0.400000 | 0.400321 |
| 40 | 0.225–0.300 | 0.262500 | 0.262662 |
| 50 | 0.175–0.183 | 0.179000 | 0.178743 |
| 60 | 0.100–0.125 | 0.112500 | 0.111952 |
| 70 | 0.050–0.070 | 0.060000 | 0.059927 |
| 80 | 0.020–0.040 | 0.030000 | 0.030251 |
| 90 | 0.005–0.015 | 0.010000 | 0.009933 |
| 95 | 0.002–0.004 | 0.003000 | 0.002969 |
| 100 | 0.000–0.000 | 0.000000 | 0.000000 |

The grade-95 band (0.002–0.004) is a local extension. Other bands use the USWDS grade-luminance table.

**한국어 설명**

등급별 상대 휘도 범위를 기준으로 OKLCH 명도를 조정합니다. 95등급의 0.002–0.004 범위는 이번 도구의 확장값이며, 최종 HEX로 네 가지 매직넘버 규칙을 모두 검사합니다.

### Magic-number pair checks

| First grade | Second grade | Magic number | Required contrast | Actual contrast | Result |
| --- | --- | --- | --- | --- | --- |
| 0 | 40 | 40 | 3:1 | 3.3583:1 | PASS |
| 0 | 50 | 50 | 4.5:1 | 4.5903:1 | PASS |
| 0 | 60 | 60 | 4.5:1 | 6.4834:1 | PASS |
| 0 | 70 | 70 | 7:1 | 9.5518:1 | PASS |
| 0 | 80 | 80 | 7:1 | 13.0839:1 | PASS |
| 0 | 90 | 90 | 15:1 | 17.5194:1 | PASS |
| 0 | 95 | 95 | 15:1 | 19.8228:1 | PASS |
| 0 | 100 | 100 | 15:1 | 21.0000:1 | PASS |
| 5 | 50 | 45 | 3:1 | 4.1148:1 | PASS |
| 5 | 60 | 55 | 4.5:1 | 5.8118:1 | PASS |
| 5 | 70 | 65 | 4.5:1 | 8.5624:1 | PASS |
| 5 | 80 | 75 | 7:1 | 11.7286:1 | PASS |
| 5 | 90 | 85 | 7:1 | 15.7047:1 | PASS |
| 5 | 95 | 90 | 15:1 | 17.7695:1 | PASS |
| 5 | 100 | 95 | 15:1 | 18.8248:1 | PASS |
| 10 | 50 | 40 | 3:1 | 3.6474:1 | PASS |
| 10 | 60 | 50 | 4.5:1 | 5.1517:1 | PASS |
| 10 | 70 | 60 | 4.5:1 | 7.5898:1 | PASS |
| 10 | 80 | 70 | 7:1 | 10.3964:1 | PASS |
| 10 | 90 | 80 | 7:1 | 13.9209:1 | PASS |
| 10 | 95 | 85 | 7:1 | 15.7511:1 | PASS |
| 10 | 100 | 90 | 15:1 | 16.6865:1 | PASS |
| 20 | 60 | 40 | 3:1 | 3.8568:1 | PASS |
| 20 | 70 | 50 | 4.5:1 | 5.6820:1 | PASS |
| 20 | 80 | 60 | 4.5:1 | 7.7832:1 | PASS |
| 20 | 90 | 70 | 7:1 | 10.4217:1 | PASS |
| 20 | 95 | 75 | 7:1 | 11.7919:1 | PASS |
| 20 | 100 | 80 | 7:1 | 12.4922:1 | PASS |
| 30 | 70 | 40 | 3:1 | 4.0965:1 | PASS |
| 30 | 80 | 50 | 4.5:1 | 5.6114:1 | PASS |
| 30 | 90 | 60 | 4.5:1 | 7.5137:1 | PASS |
| 30 | 95 | 65 | 4.5:1 | 8.5015:1 | PASS |
| 30 | 100 | 70 | 7:1 | 9.0064:1 | PASS |
| 40 | 80 | 40 | 3:1 | 3.8960:1 | PASS |
| 40 | 90 | 50 | 4.5:1 | 5.2168:1 | PASS |
| 40 | 95 | 55 | 4.5:1 | 5.9027:1 | PASS |
| 40 | 100 | 60 | 4.5:1 | 6.2532:1 | PASS |
| 50 | 90 | 40 | 3:1 | 3.8166:1 | PASS |
| 50 | 95 | 45 | 3:1 | 4.3184:1 | PASS |
| 50 | 100 | 50 | 4.5:1 | 4.5749:1 | PASS |
| 60 | 100 | 40 | 3:1 | 3.2390:1 | PASS |

Magic number is the absolute numeric grade difference. The table displays the strongest applicable threshold.
Summary counts overlap: a difference of 90 also satisfies the lower 40/50/70 rules.

**한국어 설명**

예: 0↔50은 매직넘버 50으로 최소 4.5:1, 10↔80은 매직넘버 70으로 최소 7:1입니다. 표에는 해당 조합의 가장 높은 대비 기준을 표시합니다. 원본·상태 색상에는 이 등급 규칙을 자동 적용하지 않습니다.

## Secondary grade palette

Source: `#93AB38`. Nearest level by white contrast: **30** (not an exact source-color match).
Eleven brand grades plus two endpoints. All 41 eligible pairs meet their applicable rule.

| Minimum grade difference | Required contrast | Checked pairs | Lowest actual contrast | Result |
| --- | --- | --- | --- | --- |
| 40 | 3:1 | 41 | 3.2477:1 | PASS |
| 50 | 4.5:1 | 32 | 4.5802:1 | PASS |
| 70 | 7:1 | 17 | 9.0009:1 | PASS |
| 90 | 15:1 | 6 | 16.7530:1 | PASS |

| Level | Final HEX | Target on white | Actual on white | Black text | Best text | Best-text target |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | #FFFFFF | 1.0000:1 | 1.0000:1 FAIL | 21.0000:1 PASS | #000000 | 21.0000:1 PASS |
| 5 | #E2FE8D | 1.1170:1 | 1.1173:1 FAIL | 18.7951:1 PASS | #000000 | 18.7951:1 PASS |
| 10 | #D6F180 | 1.2575:1 | 1.2535:1 FAIL | 16.7530:1 PASS | #000000 | 16.7530:1 PASS |
| 20 | #B9D262 | 1.6800:1 | 1.6857:1 FAIL | 12.4579:1 PASS | #000000 | 12.4579:1 PASS |
| 30 | #9BB442 | 2.3333:1 | 2.3331:1 FAIL | 9.0009:1 PASS | #000000 | 9.0009:1 PASS |
| 40 | #7F961B | 3.3600:1 | 3.3435:1 FAIL | 6.2808:1 PASS | #000000 | 6.2808:1 PASS |
| 50 | #697E00 | 4.5852:1 | 4.5802:1 PASS | 4.5850:1 PASS | #000000 | 4.5850:1 PASS |
| 60 | #556500 | 6.4615:1 | 6.4661:1 PASS | 3.2477:1 FAIL | #FFFFFF | 6.4661:1 PASS |
| 70 | #3E4B00 | 9.5455:1 | 9.4969:1 PASS | 2.2113:1 FAIL | #FFFFFF | 9.4969:1 PASS |
| 80 | #2B3400 | 13.1250:1 | 13.1751:1 PASS | 1.5939:1 FAIL | #FFFFFF | 13.1751:1 PASS |
| 90 | #161C00 | 17.5000:1 | 17.4968:1 PASS | 1.2002:1 FAIL | #FFFFFF | 17.4968:1 PASS |
| 95 | #080B00 | 19.8113:1 | 19.8451:1 PASS | 1.0582:1 FAIL | #FFFFFF | 19.8451:1 PASS |
| 100 | #000000 | 21.0000:1 | 21.0000:1 PASS | 1.0000:1 FAIL | #FFFFFF | 21.0000:1 PASS |

Targets use white as the reference; PASS/FAIL in the text columns uses the configured text threshold.
The stored HEX is the closest searched color to the continuous contrast target, so target and actual may differ slightly.

**한국어 설명**

브랜드 색상 11단계(5–95)와 흰색·검정 기준점(0·100)입니다. 매직넘버는 등급 숫자의 차이이며 칸 수나 실제 명도 퍼센트가 아닙니다. Best text는 흰색·검정 중 대비가 높은 색이고, 텍스트 통과 표시는 별도 설정 기준으로 판정합니다.

### Grade luminance targets

| Grade | Allowed relative luminance | Target luminance | Actual HEX luminance |
| --- | --- | --- | --- |
| 0 | 1.000–1.000 | 1.000000 | 1.000000 |
| 5 | 0.850–0.930 | 0.890000 | 0.889755 |
| 10 | 0.750–0.820 | 0.785000 | 0.787652 |
| 20 | 0.500–0.650 | 0.575000 | 0.572893 |
| 30 | 0.350–0.450 | 0.400000 | 0.400044 |
| 40 | 0.225–0.300 | 0.262500 | 0.264039 |
| 50 | 0.175–0.183 | 0.179000 | 0.179250 |
| 60 | 0.100–0.125 | 0.112500 | 0.112387 |
| 70 | 0.050–0.070 | 0.060000 | 0.060563 |
| 80 | 0.020–0.040 | 0.030000 | 0.029696 |
| 90 | 0.005–0.015 | 0.010000 | 0.010011 |
| 95 | 0.002–0.004 | 0.003000 | 0.002910 |
| 100 | 0.000–0.000 | 0.000000 | 0.000000 |

The grade-95 band (0.002–0.004) is a local extension. Other bands use the USWDS grade-luminance table.

**한국어 설명**

등급별 상대 휘도 범위를 기준으로 OKLCH 명도를 조정합니다. 95등급의 0.002–0.004 범위는 이번 도구의 확장값이며, 최종 HEX로 네 가지 매직넘버 규칙을 모두 검사합니다.

### Magic-number pair checks

| First grade | Second grade | Magic number | Required contrast | Actual contrast | Result |
| --- | --- | --- | --- | --- | --- |
| 0 | 40 | 40 | 3:1 | 3.3435:1 | PASS |
| 0 | 50 | 50 | 4.5:1 | 4.5802:1 | PASS |
| 0 | 60 | 60 | 4.5:1 | 6.4661:1 | PASS |
| 0 | 70 | 70 | 7:1 | 9.4969:1 | PASS |
| 0 | 80 | 80 | 7:1 | 13.1751:1 | PASS |
| 0 | 90 | 90 | 15:1 | 17.4968:1 | PASS |
| 0 | 95 | 95 | 15:1 | 19.8451:1 | PASS |
| 0 | 100 | 100 | 15:1 | 21.0000:1 | PASS |
| 5 | 50 | 45 | 3:1 | 4.0993:1 | PASS |
| 5 | 60 | 55 | 4.5:1 | 5.7871:1 | PASS |
| 5 | 70 | 65 | 4.5:1 | 8.4997:1 | PASS |
| 5 | 80 | 75 | 7:1 | 11.7918:1 | PASS |
| 5 | 90 | 85 | 7:1 | 15.6598:1 | PASS |
| 5 | 95 | 90 | 15:1 | 17.7615:1 | PASS |
| 5 | 100 | 95 | 15:1 | 18.7951:1 | PASS |
| 10 | 50 | 40 | 3:1 | 3.6539:1 | PASS |
| 10 | 60 | 50 | 4.5:1 | 5.1584:1 | PASS |
| 10 | 70 | 60 | 4.5:1 | 7.5763:1 | PASS |
| 10 | 80 | 70 | 7:1 | 10.5106:1 | PASS |
| 10 | 90 | 80 | 7:1 | 13.9584:1 | PASS |
| 10 | 95 | 85 | 7:1 | 15.8317:1 | PASS |
| 10 | 100 | 90 | 15:1 | 16.7530:1 | PASS |
| 20 | 60 | 40 | 3:1 | 3.8359:1 | PASS |
| 20 | 70 | 50 | 4.5:1 | 5.6338:1 | PASS |
| 20 | 80 | 60 | 4.5:1 | 7.8159:1 | PASS |
| 20 | 90 | 70 | 7:1 | 10.3797:1 | PASS |
| 20 | 95 | 75 | 7:1 | 11.7728:1 | PASS |
| 20 | 100 | 80 | 7:1 | 12.4579:1 | PASS |
| 30 | 70 | 40 | 3:1 | 4.0705:1 | PASS |
| 30 | 80 | 50 | 4.5:1 | 5.6470:1 | PASS |
| 30 | 90 | 60 | 4.5:1 | 7.4994:1 | PASS |
| 30 | 95 | 65 | 4.5:1 | 8.5059:1 | PASS |
| 30 | 100 | 70 | 7:1 | 9.0009:1 | PASS |
| 40 | 80 | 40 | 3:1 | 3.9405:1 | PASS |
| 40 | 90 | 50 | 4.5:1 | 5.2330:1 | PASS |
| 40 | 95 | 55 | 4.5:1 | 5.9354:1 | PASS |
| 40 | 100 | 60 | 4.5:1 | 6.2808:1 | PASS |
| 50 | 90 | 40 | 3:1 | 3.8201:1 | PASS |
| 50 | 95 | 45 | 3:1 | 4.3328:1 | PASS |
| 50 | 100 | 50 | 4.5:1 | 4.5850:1 | PASS |
| 60 | 100 | 40 | 3:1 | 3.2477:1 | PASS |

Magic number is the absolute numeric grade difference. The table displays the strongest applicable threshold.
Summary counts overlap: a difference of 90 also satisfies the lower 40/50/70 rules.

**한국어 설명**

예: 0↔50은 매직넘버 50으로 최소 4.5:1, 10↔80은 매직넘버 70으로 최소 7:1입니다. 표에는 해당 조합의 가장 높은 대비 기준을 표시합니다. 원본·상태 색상에는 이 등급 규칙을 자동 적용하지 않습니다.

## Mixed Primary/Secondary checks

First grade belongs to Primary; second grade belongs to Secondary. Only generated grades are included.

| Minimum grade difference | Required contrast | Checked pairs | Lowest actual contrast | Result |
| --- | --- | --- | --- | --- |
| 40 | 3:1 | 82 | 3.2390:1 | PASS |
| 50 | 4.5:1 | 64 | 4.5749:1 | PASS |
| 70 | 7:1 | 34 | 9.0009:1 | PASS |
| 90 | 15:1 | 12 | 16.6865:1 | PASS |

| First grade | Second grade | Magic number | Required contrast | Actual contrast | Result |
| --- | --- | --- | --- | --- | --- |
| 0 | 40 | 40 | 3:1 | 3.3435:1 | PASS |
| 0 | 50 | 50 | 4.5:1 | 4.5802:1 | PASS |
| 0 | 60 | 60 | 4.5:1 | 6.4661:1 | PASS |
| 0 | 70 | 70 | 7:1 | 9.4969:1 | PASS |
| 0 | 80 | 80 | 7:1 | 13.1751:1 | PASS |
| 0 | 90 | 90 | 15:1 | 17.4968:1 | PASS |
| 0 | 95 | 95 | 15:1 | 19.8451:1 | PASS |
| 0 | 100 | 100 | 15:1 | 21.0000:1 | PASS |
| 5 | 50 | 45 | 3:1 | 4.1057:1 | PASS |
| 5 | 60 | 55 | 4.5:1 | 5.7963:1 | PASS |
| 5 | 70 | 65 | 4.5:1 | 8.5132:1 | PASS |
| 5 | 80 | 75 | 7:1 | 11.8104:1 | PASS |
| 5 | 90 | 85 | 7:1 | 15.6845:1 | PASS |
| 5 | 95 | 90 | 15:1 | 17.7895:1 | PASS |
| 5 | 100 | 95 | 15:1 | 18.8248:1 | PASS |
| 10 | 50 | 40 | 3:1 | 3.6394:1 | PASS |
| 10 | 60 | 50 | 4.5:1 | 5.1379:1 | PASS |
| 10 | 70 | 60 | 4.5:1 | 7.5462:1 | PASS |
| 10 | 80 | 70 | 7:1 | 10.4689:1 | PASS |
| 10 | 90 | 80 | 7:1 | 13.9029:1 | PASS |
| 10 | 95 | 85 | 7:1 | 15.7689:1 | PASS |
| 10 | 100 | 90 | 15:1 | 16.6865:1 | PASS |
| 20 | 60 | 40 | 3:1 | 3.8464:1 | PASS |
| 20 | 70 | 50 | 4.5:1 | 5.6493:1 | PASS |
| 20 | 80 | 60 | 4.5:1 | 7.8374:1 | PASS |
| 20 | 90 | 70 | 7:1 | 10.4083:1 | PASS |
| 20 | 95 | 75 | 7:1 | 11.8052:1 | PASS |
| 20 | 100 | 80 | 7:1 | 12.4922:1 | PASS |
| 30 | 70 | 40 | 3:1 | 4.0730:1 | PASS |
| 30 | 80 | 50 | 4.5:1 | 5.6505:1 | PASS |
| 30 | 90 | 60 | 4.5:1 | 7.5040:1 | PASS |
| 30 | 95 | 65 | 4.5:1 | 8.5111:1 | PASS |
| 30 | 100 | 70 | 7:1 | 9.0064:1 | PASS |
| 40 | 0 | 40 | 3:1 | 3.3583:1 | PASS |
| 40 | 80 | 40 | 3:1 | 3.9232:1 | PASS |
| 40 | 90 | 50 | 4.5:1 | 5.2101:1 | PASS |
| 40 | 95 | 55 | 4.5:1 | 5.9094:1 | PASS |
| 40 | 100 | 60 | 4.5:1 | 6.2532:1 | PASS |
| 50 | 0 | 50 | 4.5:1 | 4.5903:1 | PASS |
| 50 | 5 | 45 | 3:1 | 4.1083:1 | PASS |
| 50 | 10 | 40 | 3:1 | 3.6620:1 | PASS |
| 50 | 90 | 40 | 3:1 | 3.8117:1 | PASS |
| 50 | 95 | 45 | 3:1 | 4.3233:1 | PASS |
| 50 | 100 | 50 | 4.5:1 | 4.5749:1 | PASS |
| 60 | 0 | 60 | 4.5:1 | 6.4834:1 | PASS |
| 60 | 5 | 55 | 4.5:1 | 5.8027:1 | PASS |
| 60 | 10 | 50 | 4.5:1 | 5.1722:1 | PASS |
| 60 | 20 | 40 | 3:1 | 3.8462:1 | PASS |
| 60 | 100 | 40 | 3:1 | 3.2390:1 | PASS |
| 70 | 0 | 70 | 7:1 | 9.5518:1 | PASS |
| 70 | 5 | 65 | 4.5:1 | 8.5489:1 | PASS |
| 70 | 10 | 60 | 4.5:1 | 7.6200:1 | PASS |
| 70 | 20 | 50 | 4.5:1 | 5.6664:1 | PASS |
| 70 | 30 | 40 | 3:1 | 4.0940:1 | PASS |
| 80 | 0 | 80 | 7:1 | 13.0839:1 | PASS |
| 80 | 5 | 75 | 7:1 | 11.7101:1 | PASS |
| 80 | 10 | 70 | 7:1 | 10.4379:1 | PASS |
| 80 | 20 | 60 | 4.5:1 | 7.7618:1 | PASS |
| 80 | 30 | 50 | 4.5:1 | 5.6079:1 | PASS |
| 80 | 40 | 40 | 3:1 | 3.9132:1 | PASS |
| 90 | 0 | 90 | 15:1 | 17.5194:1 | PASS |
| 90 | 5 | 85 | 7:1 | 15.6800:1 | PASS |
| 90 | 10 | 80 | 7:1 | 13.9764:1 | PASS |
| 90 | 20 | 70 | 7:1 | 10.3931:1 | PASS |
| 90 | 30 | 60 | 4.5:1 | 7.5091:1 | PASS |
| 90 | 40 | 50 | 4.5:1 | 5.2398:1 | PASS |
| 90 | 50 | 40 | 3:1 | 3.8251:1 | PASS |
| 95 | 0 | 95 | 15:1 | 19.8228:1 | PASS |
| 95 | 5 | 90 | 15:1 | 17.7415:1 | PASS |
| 95 | 10 | 85 | 7:1 | 15.8139:1 | PASS |
| 95 | 20 | 75 | 7:1 | 11.7595:1 | PASS |
| 95 | 30 | 65 | 4.5:1 | 8.4963:1 | PASS |
| 95 | 40 | 55 | 4.5:1 | 5.9287:1 | PASS |
| 95 | 50 | 45 | 3:1 | 4.3280:1 | PASS |
| 100 | 0 | 100 | 15:1 | 21.0000:1 | PASS |
| 100 | 5 | 95 | 15:1 | 18.7951:1 | PASS |
| 100 | 10 | 90 | 15:1 | 16.7530:1 | PASS |
| 100 | 20 | 80 | 7:1 | 12.4579:1 | PASS |
| 100 | 30 | 70 | 7:1 | 9.0009:1 | PASS |
| 100 | 40 | 60 | 4.5:1 | 6.2808:1 | PASS |
| 100 | 50 | 50 | 4.5:1 | 4.5850:1 | PASS |
| 100 | 60 | 40 | 3:1 | 3.2477:1 | PASS |

**한국어 설명**

첫 번째 등급은 Primary, 두 번째 등급은 Secondary입니다. 두 팔레트를 섞어 사용할 때도 동일한 네 가지 매직넘버 규칙을 검사합니다. 원본·상태 색상과 기존 Neutral 토큰은 이 등급 체계에 포함되지 않습니다.

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
- Checks cover these generated opaque grade pairs. Recheck opacity, gradients, images, source/state colors, and other foregrounds.
- No Base Design System, neutral, semantic-status, or focus values are generated or modified.

**한국어 설명**

자동 Secondary는 색상 각도 기반 제안입니다. 프로젝트 분위기에 맞는지 확인하고 직접 HEX를 지정할 수 있습니다. 이 결과는 브랜드용 토큰이며 Base Design System과 승인된 중립·상태·포커스 규칙을 변경하지 않습니다.

## References

- [KRDS color and magic numbers](https://www.krds.go.kr/html/site/style/style_02.html)
- [USWDS grade luminance bands](https://designsystem.digital.gov/design-tokens/color/overview/#magic-number)
- [WCAG 2.2 text contrast](https://www.w3.org/TR/WCAG22/#contrast-minimum)
- [WCAG relative luminance](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance)
- [Oklab conversion by Björn Ottosson](https://bottosson.github.io/posts/oklab/)

**한국어 설명**

대비율은 WCAG 상대 휘도 공식을 사용하며, 색상 변환은 Oklab 변환 행렬을 사용합니다.
