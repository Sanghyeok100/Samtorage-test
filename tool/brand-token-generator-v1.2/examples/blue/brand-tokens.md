# Brand tokens v1.2

## Generation summary

- Source Primary: `#123E88` (oklch(38.1889% 0.132901 260.380))
- Source Secondary: `#56498B` (auto, hue offset 30°)
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

Source: `#123E88`. Nearest level by white contrast: **70** (not an exact source-color match).
Eleven brand grades plus two endpoints. All 41 eligible pairs meet their applicable rule.

| Minimum grade difference | Required contrast | Checked pairs | Lowest actual contrast | Result |
| --- | --- | --- | --- | --- |
| 40 | 3:1 | 41 | 3.2643:1 | PASS |
| 50 | 4.5:1 | 32 | 4.5632:1 | PASS |
| 70 | 7:1 | 17 | 8.9940:1 | PASS |
| 90 | 15:1 | 6 | 16.6825:1 | PASS |

| Level | Final HEX | Target on white | Actual on white | Black text | Best text | Best-text target |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | #FFFFFF | 1.0000:1 | 1.0000:1 FAIL | 21.0000:1 PASS | #000000 | 21.0000:1 PASS |
| 5 | #EBF3FF | 1.1170:1 | 1.1172:1 FAIL | 18.7967:1 PASS | #000000 | 18.7967:1 PASS |
| 10 | #D8E6FF | 1.2575:1 | 1.2588:1 FAIL | 16.6825:1 PASS | #000000 | 16.6825:1 PASS |
| 20 | #A9C9FF | 1.6800:1 | 1.6819:1 FAIL | 12.4857:1 PASS | #000000 | 12.4857:1 PASS |
| 30 | #79AAFE | 2.3333:1 | 2.3349:1 FAIL | 8.9940:1 PASS | #000000 | 8.9940:1 PASS |
| 40 | #5C8CDD | 3.3600:1 | 3.3598:1 FAIL | 6.2504:1 PASS | #000000 | 6.2504:1 PASS |
| 50 | #4675C4 | 4.5852:1 | 4.5632:1 PASS | 4.6020:1 PASS | #000000 | 4.6020:1 PASS |
| 60 | #305DA9 | 6.4615:1 | 6.4332:1 PASS | 3.2643:1 FAIL | #FFFFFF | 6.4332:1 PASS |
| 70 | #17428D | 9.5455:1 | 9.5440:1 PASS | 2.2003:1 FAIL | #FFFFFF | 9.5440:1 PASS |
| 80 | #002B74 | 13.1250:1 | 13.1436:1 PASS | 1.5977:1 FAIL | #FFFFFF | 13.1436:1 PASS |
| 90 | #001644 | 17.5000:1 | 17.5258:1 PASS | 1.1982:1 FAIL | #FFFFFF | 17.5258:1 PASS |
| 95 | #000824 | 19.8113:1 | 19.8074:1 PASS | 1.0602:1 FAIL | #FFFFFF | 19.8074:1 PASS |
| 100 | #000000 | 21.0000:1 | 21.0000:1 PASS | 1.0000:1 FAIL | #FFFFFF | 21.0000:1 PASS |

Targets use white as the reference; PASS/FAIL in the text columns uses the configured text threshold.
The stored HEX is the closest searched color to the continuous contrast target, so target and actual may differ slightly.

**한국어 설명**

브랜드 색상 11단계(5–95)와 흰색·검정 기준점(0·100)입니다. 매직넘버는 등급 숫자의 차이이며 칸 수나 실제 명도 퍼센트가 아닙니다. Best text는 흰색·검정 중 대비가 높은 색이고, 텍스트 통과 표시는 별도 설정 기준으로 판정합니다.

### Grade luminance targets

| Grade | Allowed relative luminance | Target luminance | Actual HEX luminance |
| --- | --- | --- | --- |
| 0 | 1.000–1.000 | 1.000000 | 1.000000 |
| 5 | 0.850–0.930 | 0.890000 | 0.889834 |
| 10 | 0.750–0.820 | 0.785000 | 0.784126 |
| 20 | 0.500–0.650 | 0.575000 | 0.574283 |
| 30 | 0.350–0.450 | 0.400000 | 0.399702 |
| 40 | 0.225–0.300 | 0.262500 | 0.262519 |
| 50 | 0.175–0.183 | 0.179000 | 0.180102 |
| 60 | 0.100–0.125 | 0.112500 | 0.113217 |
| 70 | 0.050–0.070 | 0.060000 | 0.060017 |
| 80 | 0.020–0.040 | 0.030000 | 0.029887 |
| 90 | 0.005–0.015 | 0.010000 | 0.009912 |
| 95 | 0.002–0.004 | 0.003000 | 0.003010 |
| 100 | 0.000–0.000 | 0.000000 | 0.000000 |

The grade-95 band (0.002–0.004) is a local extension. Other bands use the USWDS grade-luminance table.

**한국어 설명**

등급별 상대 휘도 범위를 기준으로 OKLCH 명도를 조정합니다. 95등급의 0.002–0.004 범위는 이번 도구의 확장값이며, 최종 HEX로 네 가지 매직넘버 규칙을 모두 검사합니다.

### Magic-number pair checks

| First grade | Second grade | Magic number | Required contrast | Actual contrast | Result |
| --- | --- | --- | --- | --- | --- |
| 0 | 40 | 40 | 3:1 | 3.3598:1 | PASS |
| 0 | 50 | 50 | 4.5:1 | 4.5632:1 | PASS |
| 0 | 60 | 60 | 4.5:1 | 6.4332:1 | PASS |
| 0 | 70 | 70 | 7:1 | 9.5440:1 | PASS |
| 0 | 80 | 80 | 7:1 | 13.1436:1 | PASS |
| 0 | 90 | 90 | 15:1 | 17.5258:1 | PASS |
| 0 | 95 | 95 | 15:1 | 19.8074:1 | PASS |
| 0 | 100 | 100 | 15:1 | 21.0000:1 | PASS |
| 5 | 50 | 45 | 3:1 | 4.0844:1 | PASS |
| 5 | 60 | 55 | 4.5:1 | 5.7582:1 | PASS |
| 5 | 70 | 65 | 4.5:1 | 8.5426:1 | PASS |
| 5 | 80 | 75 | 7:1 | 11.7645:1 | PASS |
| 5 | 90 | 85 | 7:1 | 15.6870:1 | PASS |
| 5 | 95 | 90 | 15:1 | 17.7292:1 | PASS |
| 5 | 100 | 95 | 15:1 | 18.7967:1 | PASS |
| 10 | 50 | 40 | 3:1 | 3.6250:1 | PASS |
| 10 | 60 | 50 | 4.5:1 | 5.1105:1 | PASS |
| 10 | 70 | 60 | 4.5:1 | 7.5818:1 | PASS |
| 10 | 80 | 70 | 7:1 | 10.4413:1 | PASS |
| 10 | 90 | 80 | 7:1 | 13.9226:1 | PASS |
| 10 | 95 | 85 | 7:1 | 15.7351:1 | PASS |
| 10 | 100 | 90 | 15:1 | 16.6825:1 | PASS |
| 20 | 60 | 40 | 3:1 | 3.8249:1 | PASS |
| 20 | 70 | 50 | 4.5:1 | 5.6744:1 | PASS |
| 20 | 80 | 60 | 4.5:1 | 7.8146:1 | PASS |
| 20 | 90 | 70 | 7:1 | 10.4200:1 | PASS |
| 20 | 95 | 75 | 7:1 | 11.7766:1 | PASS |
| 20 | 100 | 80 | 7:1 | 12.4857:1 | PASS |
| 30 | 70 | 40 | 3:1 | 4.0876:1 | PASS |
| 30 | 80 | 50 | 4.5:1 | 5.6292:1 | PASS |
| 30 | 90 | 60 | 4.5:1 | 7.5061:1 | PASS |
| 30 | 95 | 65 | 4.5:1 | 8.4833:1 | PASS |
| 30 | 100 | 70 | 7:1 | 8.9940:1 | PASS |
| 40 | 80 | 40 | 3:1 | 3.9120:1 | PASS |
| 40 | 90 | 50 | 4.5:1 | 5.2163:1 | PASS |
| 40 | 95 | 55 | 4.5:1 | 5.8954:1 | PASS |
| 40 | 100 | 60 | 4.5:1 | 6.2504:1 | PASS |
| 50 | 90 | 40 | 3:1 | 3.8407:1 | PASS |
| 50 | 95 | 45 | 3:1 | 4.3407:1 | PASS |
| 50 | 100 | 50 | 4.5:1 | 4.6020:1 | PASS |
| 60 | 100 | 40 | 3:1 | 3.2643:1 | PASS |

Magic number is the absolute numeric grade difference. The table displays the strongest applicable threshold.
Summary counts overlap: a difference of 90 also satisfies the lower 40/50/70 rules.

**한국어 설명**

예: 0↔50은 매직넘버 50으로 최소 4.5:1, 10↔80은 매직넘버 70으로 최소 7:1입니다. 표에는 해당 조합의 가장 높은 대비 기준을 표시합니다. 원본·상태 색상에는 이 등급 규칙을 자동 적용하지 않습니다.

## Secondary grade palette

Source: `#56498B`. Nearest level by white contrast: **60** (not an exact source-color match).
Eleven brand grades plus two endpoints. All 41 eligible pairs meet their applicable rule.

| Minimum grade difference | Required contrast | Checked pairs | Lowest actual contrast | Result |
| --- | --- | --- | --- | --- |
| 40 | 3:1 | 41 | 3.2611:1 | PASS |
| 50 | 4.5:1 | 32 | 4.5785:1 | PASS |
| 70 | 7:1 | 17 | 8.9706:1 | PASS |
| 90 | 15:1 | 6 | 16.6871:1 | PASS |

| Level | Final HEX | Target on white | Actual on white | Black text | Best text | Best-text target |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | #FFFFFF | 1.0000:1 | 1.0000:1 FAIL | 21.0000:1 PASS | #000000 | 21.0000:1 PASS |
| 5 | #F2F1FF | 1.1170:1 | 1.1169:1 FAIL | 18.8016:1 PASS | #000000 | 18.8016:1 PASS |
| 10 | #E6E2FF | 1.2575:1 | 1.2585:1 FAIL | 16.6871:1 PASS | #000000 | 16.6871:1 PASS |
| 20 | #C9C0FF | 1.6800:1 | 1.6844:1 FAIL | 12.4674:1 PASS | #000000 | 12.4674:1 PASS |
| 30 | #ACA0EA | 2.3333:1 | 2.3410:1 FAIL | 8.9706:1 PASS | #000000 | 8.9706:1 PASS |
| 40 | #8E83CA | 3.3600:1 | 3.3603:1 FAIL | 6.2495:1 PASS | #000000 | 6.2495:1 PASS |
| 50 | #786CB1 | 4.5852:1 | 4.5867:1 PASS | 4.5785:1 PASS | #FFFFFF | 4.5867:1 PASS |
| 60 | #615598 | 6.4615:1 | 6.4396:1 PASS | 3.2611:1 FAIL | #FFFFFF | 6.4396:1 PASS |
| 70 | #493B7C | 9.5455:1 | 9.5458:1 PASS | 2.1999:1 FAIL | #FFFFFF | 9.5458:1 PASS |
| 80 | #352564 | 13.1250:1 | 13.1248:1 PASS | 1.6000:1 FAIL | #FFFFFF | 13.1248:1 PASS |
| 90 | #1F0B48 | 17.5000:1 | 17.5043:1 PASS | 1.1997:1 FAIL | #FFFFFF | 17.5043:1 PASS |
| 95 | #0F002E | 19.8113:1 | 19.8158:1 PASS | 1.0598:1 FAIL | #FFFFFF | 19.8158:1 PASS |
| 100 | #000000 | 21.0000:1 | 21.0000:1 PASS | 1.0000:1 FAIL | #FFFFFF | 21.0000:1 PASS |

Targets use white as the reference; PASS/FAIL in the text columns uses the configured text threshold.
The stored HEX is the closest searched color to the continuous contrast target, so target and actual may differ slightly.

**한국어 설명**

브랜드 색상 11단계(5–95)와 흰색·검정 기준점(0·100)입니다. 매직넘버는 등급 숫자의 차이이며 칸 수나 실제 명도 퍼센트가 아닙니다. Best text는 흰색·검정 중 대비가 높은 색이고, 텍스트 통과 표시는 별도 설정 기준으로 판정합니다.

### Grade luminance targets

| Grade | Allowed relative luminance | Target luminance | Actual HEX luminance |
| --- | --- | --- | --- |
| 0 | 1.000–1.000 | 1.000000 | 1.000000 |
| 5 | 0.850–0.930 | 0.890000 | 0.890078 |
| 10 | 0.750–0.820 | 0.785000 | 0.784357 |
| 20 | 0.500–0.650 | 0.575000 | 0.573368 |
| 30 | 0.350–0.450 | 0.400000 | 0.398528 |
| 40 | 0.225–0.300 | 0.262500 | 0.262477 |
| 50 | 0.175–0.183 | 0.179000 | 0.178925 |
| 60 | 0.100–0.125 | 0.112500 | 0.113054 |
| 70 | 0.050–0.070 | 0.060000 | 0.059996 |
| 80 | 0.020–0.040 | 0.030000 | 0.030001 |
| 90 | 0.005–0.015 | 0.010000 | 0.009985 |
| 95 | 0.002–0.004 | 0.003000 | 0.002988 |
| 100 | 0.000–0.000 | 0.000000 | 0.000000 |

The grade-95 band (0.002–0.004) is a local extension. Other bands use the USWDS grade-luminance table.

**한국어 설명**

등급별 상대 휘도 범위를 기준으로 OKLCH 명도를 조정합니다. 95등급의 0.002–0.004 범위는 이번 도구의 확장값이며, 최종 HEX로 네 가지 매직넘버 규칙을 모두 검사합니다.

### Magic-number pair checks

| First grade | Second grade | Magic number | Required contrast | Actual contrast | Result |
| --- | --- | --- | --- | --- | --- |
| 0 | 40 | 40 | 3:1 | 3.3603:1 | PASS |
| 0 | 50 | 50 | 4.5:1 | 4.5867:1 | PASS |
| 0 | 60 | 60 | 4.5:1 | 6.4396:1 | PASS |
| 0 | 70 | 70 | 7:1 | 9.5458:1 | PASS |
| 0 | 80 | 80 | 7:1 | 13.1248:1 | PASS |
| 0 | 90 | 90 | 15:1 | 17.5043:1 | PASS |
| 0 | 95 | 95 | 15:1 | 19.8158:1 | PASS |
| 0 | 100 | 100 | 15:1 | 21.0000:1 | PASS |
| 5 | 50 | 45 | 3:1 | 4.1065:1 | PASS |
| 5 | 60 | 55 | 4.5:1 | 5.7654:1 | PASS |
| 5 | 70 | 65 | 4.5:1 | 8.5465:1 | PASS |
| 5 | 80 | 75 | 7:1 | 11.7508:1 | PASS |
| 5 | 90 | 85 | 7:1 | 15.6718:1 | PASS |
| 5 | 95 | 90 | 15:1 | 17.7413:1 | PASS |
| 5 | 100 | 95 | 15:1 | 18.8016:1 | PASS |
| 10 | 50 | 40 | 3:1 | 3.6447:1 | PASS |
| 10 | 60 | 50 | 4.5:1 | 5.1171:1 | PASS |
| 10 | 70 | 60 | 4.5:1 | 7.5853:1 | PASS |
| 10 | 80 | 70 | 7:1 | 10.4293:1 | PASS |
| 10 | 90 | 80 | 7:1 | 13.9094:1 | PASS |
| 10 | 95 | 85 | 7:1 | 15.7461:1 | PASS |
| 10 | 100 | 90 | 15:1 | 16.6871:1 | PASS |
| 20 | 60 | 40 | 3:1 | 3.8231:1 | PASS |
| 20 | 70 | 50 | 4.5:1 | 5.6672:1 | PASS |
| 20 | 80 | 60 | 4.5:1 | 7.7920:1 | PASS |
| 20 | 90 | 70 | 7:1 | 10.3920:1 | PASS |
| 20 | 95 | 75 | 7:1 | 11.7643:1 | PASS |
| 20 | 100 | 80 | 7:1 | 12.4674:1 | PASS |
| 30 | 70 | 40 | 3:1 | 4.0777:1 | PASS |
| 30 | 80 | 50 | 4.5:1 | 5.6065:1 | PASS |
| 30 | 90 | 60 | 4.5:1 | 7.4773:1 | PASS |
| 30 | 95 | 65 | 4.5:1 | 8.4647:1 | PASS |
| 30 | 100 | 70 | 7:1 | 8.9706:1 | PASS |
| 40 | 80 | 40 | 3:1 | 3.9059:1 | PASS |
| 40 | 90 | 50 | 4.5:1 | 5.2092:1 | PASS |
| 40 | 95 | 55 | 4.5:1 | 5.8971:1 | PASS |
| 40 | 100 | 60 | 4.5:1 | 6.2495:1 | PASS |
| 50 | 90 | 40 | 3:1 | 3.8164:1 | PASS |
| 50 | 95 | 45 | 3:1 | 4.3203:1 | PASS |
| 50 | 100 | 50 | 4.5:1 | 4.5785:1 | PASS |
| 60 | 100 | 40 | 3:1 | 3.2611:1 | PASS |

Magic number is the absolute numeric grade difference. The table displays the strongest applicable threshold.
Summary counts overlap: a difference of 90 also satisfies the lower 40/50/70 rules.

**한국어 설명**

예: 0↔50은 매직넘버 50으로 최소 4.5:1, 10↔80은 매직넘버 70으로 최소 7:1입니다. 표에는 해당 조합의 가장 높은 대비 기준을 표시합니다. 원본·상태 색상에는 이 등급 규칙을 자동 적용하지 않습니다.

## Mixed Primary/Secondary checks

First grade belongs to Primary; second grade belongs to Secondary. Only generated grades are included.

| Minimum grade difference | Required contrast | Checked pairs | Lowest actual contrast | Result |
| --- | --- | --- | --- | --- |
| 40 | 3:1 | 82 | 3.2611:1 | PASS |
| 50 | 4.5:1 | 64 | 4.5632:1 | PASS |
| 70 | 7:1 | 34 | 8.9706:1 | PASS |
| 90 | 15:1 | 12 | 16.6825:1 | PASS |

| First grade | Second grade | Magic number | Required contrast | Actual contrast | Result |
| --- | --- | --- | --- | --- | --- |
| 0 | 40 | 40 | 3:1 | 3.3603:1 | PASS |
| 0 | 50 | 50 | 4.5:1 | 4.5867:1 | PASS |
| 0 | 60 | 60 | 4.5:1 | 6.4396:1 | PASS |
| 0 | 70 | 70 | 7:1 | 9.5458:1 | PASS |
| 0 | 80 | 80 | 7:1 | 13.1248:1 | PASS |
| 0 | 90 | 90 | 15:1 | 17.5043:1 | PASS |
| 0 | 95 | 95 | 15:1 | 19.8158:1 | PASS |
| 0 | 100 | 100 | 15:1 | 21.0000:1 | PASS |
| 5 | 50 | 45 | 3:1 | 4.1054:1 | PASS |
| 5 | 60 | 55 | 4.5:1 | 5.7639:1 | PASS |
| 5 | 70 | 65 | 4.5:1 | 8.5442:1 | PASS |
| 5 | 80 | 75 | 7:1 | 11.7477:1 | PASS |
| 5 | 90 | 85 | 7:1 | 15.6677:1 | PASS |
| 5 | 95 | 90 | 15:1 | 17.7367:1 | PASS |
| 5 | 100 | 95 | 15:1 | 18.7967:1 | PASS |
| 10 | 50 | 40 | 3:1 | 3.6437:1 | PASS |
| 10 | 60 | 50 | 4.5:1 | 5.1156:1 | PASS |
| 10 | 70 | 60 | 4.5:1 | 7.5832:1 | PASS |
| 10 | 80 | 70 | 7:1 | 10.4264:1 | PASS |
| 10 | 90 | 80 | 7:1 | 13.9055:1 | PASS |
| 10 | 95 | 85 | 7:1 | 15.7417:1 | PASS |
| 10 | 100 | 90 | 15:1 | 16.6825:1 | PASS |
| 20 | 60 | 40 | 3:1 | 3.8287:1 | PASS |
| 20 | 70 | 50 | 4.5:1 | 5.6755:1 | PASS |
| 20 | 80 | 60 | 4.5:1 | 7.8034:1 | PASS |
| 20 | 90 | 70 | 7:1 | 10.4073:1 | PASS |
| 20 | 95 | 75 | 7:1 | 11.7816:1 | PASS |
| 20 | 100 | 80 | 7:1 | 12.4857:1 | PASS |
| 30 | 70 | 40 | 3:1 | 4.0883:1 | PASS |
| 30 | 80 | 50 | 4.5:1 | 5.6212:1 | PASS |
| 30 | 90 | 60 | 4.5:1 | 7.4969:1 | PASS |
| 30 | 95 | 65 | 4.5:1 | 8.4868:1 | PASS |
| 30 | 100 | 70 | 7:1 | 8.9940:1 | PASS |
| 40 | 0 | 40 | 3:1 | 3.3598:1 | PASS |
| 40 | 80 | 40 | 3:1 | 3.9064:1 | PASS |
| 40 | 90 | 50 | 4.5:1 | 5.2099:1 | PASS |
| 40 | 95 | 55 | 4.5:1 | 5.8979:1 | PASS |
| 40 | 100 | 60 | 4.5:1 | 6.2504:1 | PASS |
| 50 | 0 | 50 | 4.5:1 | 4.5632:1 | PASS |
| 50 | 5 | 45 | 3:1 | 4.0855:1 | PASS |
| 50 | 10 | 40 | 3:1 | 3.6260:1 | PASS |
| 50 | 90 | 40 | 3:1 | 3.8360:1 | PASS |
| 50 | 95 | 45 | 3:1 | 4.3425:1 | PASS |
| 50 | 100 | 50 | 4.5:1 | 4.6020:1 | PASS |
| 60 | 0 | 60 | 4.5:1 | 6.4332:1 | PASS |
| 60 | 5 | 55 | 4.5:1 | 5.7597:1 | PASS |
| 60 | 10 | 50 | 4.5:1 | 5.1120:1 | PASS |
| 60 | 20 | 40 | 3:1 | 3.8193:1 | PASS |
| 60 | 100 | 40 | 3:1 | 3.2643:1 | PASS |
| 70 | 0 | 70 | 7:1 | 9.5440:1 | PASS |
| 70 | 5 | 65 | 4.5:1 | 8.5449:1 | PASS |
| 70 | 10 | 60 | 4.5:1 | 7.5839:1 | PASS |
| 70 | 20 | 50 | 4.5:1 | 5.6661:1 | PASS |
| 70 | 30 | 40 | 3:1 | 4.0769:1 | PASS |
| 80 | 0 | 80 | 7:1 | 13.1436:1 | PASS |
| 80 | 5 | 75 | 7:1 | 11.7676:1 | PASS |
| 80 | 10 | 70 | 7:1 | 10.4442:1 | PASS |
| 80 | 20 | 60 | 4.5:1 | 7.8031:1 | PASS |
| 80 | 30 | 50 | 4.5:1 | 5.6145:1 | PASS |
| 80 | 40 | 40 | 3:1 | 3.9115:1 | PASS |
| 90 | 0 | 90 | 15:1 | 17.5258:1 | PASS |
| 90 | 5 | 85 | 7:1 | 15.6911:1 | PASS |
| 90 | 10 | 80 | 7:1 | 13.9264:1 | PASS |
| 90 | 20 | 70 | 7:1 | 10.4048:1 | PASS |
| 90 | 30 | 60 | 4.5:1 | 7.4865:1 | PASS |
| 90 | 40 | 50 | 4.5:1 | 5.2156:1 | PASS |
| 90 | 50 | 40 | 3:1 | 3.8210:1 | PASS |
| 95 | 0 | 95 | 15:1 | 19.8074:1 | PASS |
| 95 | 5 | 90 | 15:1 | 17.7338:1 | PASS |
| 95 | 10 | 85 | 7:1 | 15.7395:1 | PASS |
| 95 | 20 | 75 | 7:1 | 11.7593:1 | PASS |
| 95 | 30 | 65 | 4.5:1 | 8.4611:1 | PASS |
| 95 | 40 | 55 | 4.5:1 | 5.8946:1 | PASS |
| 95 | 50 | 45 | 3:1 | 4.3185:1 | PASS |
| 100 | 0 | 100 | 15:1 | 21.0000:1 | PASS |
| 100 | 5 | 95 | 15:1 | 18.8016:1 | PASS |
| 100 | 10 | 90 | 15:1 | 16.6871:1 | PASS |
| 100 | 20 | 80 | 7:1 | 12.4674:1 | PASS |
| 100 | 30 | 70 | 7:1 | 8.9706:1 | PASS |
| 100 | 40 | 60 | 4.5:1 | 6.2495:1 | PASS |
| 100 | 50 | 50 | 4.5:1 | 4.5785:1 | PASS |
| 100 | 60 | 40 | 3:1 | 3.2611:1 | PASS |

**한국어 설명**

첫 번째 등급은 Primary, 두 번째 등급은 Secondary입니다. 두 팔레트를 섞어 사용할 때도 동일한 네 가지 매직넘버 규칙을 검사합니다. 원본·상태 색상과 기존 Neutral 토큰은 이 등급 체계에 포함되지 않습니다.

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
