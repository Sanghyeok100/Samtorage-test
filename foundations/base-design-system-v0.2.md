# Base Design System v0.2

This document defines the foundational layout, spacing, typography, radius, neutral color, and semantic color mapping rules for reusable corporate website design.

The system should prioritize:

- Spacious layouts
- Strong information hierarchy
- Professional corporate visual language
- Responsive behavior
- High readability
- Minimal unnecessary decoration
- Reusable and scalable rules

**한국어 설명**

이 문서는 재사용 가능한 기업 웹사이트의 레이아웃, 간격, 타이포그래피, 모서리 반경, 중립 색상과 의미 기반 색상 매핑의 공통 기반을 정의합니다. 여유 있는 레이아웃, 명확한 정보 위계, 전문적인 기업 시각 언어, 반응형 동작, 높은 가독성, 불필요한 장식의 최소화, 재사용성과 확장성을 우선합니다.

---

## Layout

### Desktop

- Base Canvas: `1900px`
- The 1900px value assumes the vertical browser scrollbar area is excluded.
- This is a design reference width, not a fixed website viewport.
- Content Max Width: `1540px`
- Grid: `12 Columns`
- Gutter: `32px`
- Content Alignment: `Center`

The actual website must remain fluid and responsive.

The 1540px content container should remain horizontally centered.

At a 1900px reference width, approximately 180px of horizontal whitespace remains on each side.

The overall layout should feel spacious and appropriate for professional corporate websites.

### Desktop Grid

- Columns: `12`
- Gutter: `32px`
- Container Width: `1540px`
- Approximate Column Width: `99px`

Calculation:

```text
1540 - (32 × 11) = 1188
1188 ÷ 12 = 99
```

Recommended grid combinations:

- 12
- 8 + 4
- 7 + 5
- 6 + 6
- 4 + 4 + 4
- 3 + 3 + 3 + 3

The grid should function as an alignment framework rather than a rigid constraint.

### Tablet

- Grid: `8 Columns`
- Horizontal Content Padding: `32px`
- Reorganize layouts based on content priority.
- Do not simply scale down desktop layouts.

### Mobile

- Grid: `4 Columns`
- Horizontal Content Padding: `20px`
- Minimum Interactive Touch Target: `44–48px`
- Primary content should generally use a single-column layout.
- Reorganize content based on hierarchy and usability.

**한국어 설명**

데스크톱 기준 캔버스는 세로 스크롤바 영역을 제외한 1900px이며 고정 뷰포트가 아닌 디자인 참고 너비입니다. 최대 1540px 콘텐츠를 중앙에 정렬하면 기준 너비에서 좌우에 약 180px의 여백이 남습니다. 12열, 32px 거터에서 열 너비는 약 99px이며, 그리드는 정렬 기준으로 사용합니다. 실제 웹사이트는 유동적인 반응형 구조를 유지합니다. 태블릿은 8열과 좌우 32px 패딩, 모바일은 4열과 좌우 20px 패딩을 사용합니다. 단순 축소 대신 정보 우선순위와 사용성을 기준으로 재구성하며, 모바일 주요 콘텐츠는 일반적으로 단일 열로 배치하고 최소 인터랙티브 터치 영역은 44–48px로 설정합니다.

---

## Spacing System

Use the following predefined spacing scale:

```text
4
8
12
16
24
32
40
48
64
80
96
120
160
```

All values are in pixels.

Do not create arbitrary spacing values unless there is a strong functional reason.

### Spacing Usage

#### Micro

`4 / 8 / 12`

Use for:

- Icon and text gaps
- Labels
- Small UI relationships
- Inline information

#### Component

`16 / 24 / 32`

Use for:

- Component internal spacing
- Card padding
- Form elements
- List items

#### Content Group

`40 / 48 / 64`

Use for:

- Title and content separation
- Card groups
- Content group relationships

#### Large Content

`80 / 96 / 120`

Use for:

- Large content blocks
- Major internal structures
- Visual compositions

#### Section

`160`

Use as the default spacing between independent major desktop sections.

Related sections may use smaller spacing values when appropriate.

Detailed spacing rules should be defined later at the component level.

**한국어 설명**

모든 간격은 px 단위이며 승인된 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 160 스케일을 사용합니다. Micro는 아이콘·텍스트 간격과 작은 UI 관계, Component는 내부 간격과 카드·폼·목록, Content Group은 제목·콘텐츠 및 그룹 간 관계, Large Content는 큰 콘텐츠와 내부 구조에 적용합니다. 독립적인 주요 데스크톱 섹션 사이의 기본 간격은 160px이며, 관련 섹션에는 필요에 따라 더 작은 스케일을 사용할 수 있습니다. 강한 기능적 이유 없이 임의의 간격을 만들지 않으며, 세부 간격 규칙은 추후 컴포넌트 수준에서 정의합니다.

---

## Typography

Typography is divided into two groups:

- Header
- Body

This keeps typography management simple and consistent.

### Font Family

Primary:
`Pretendard`

Fallback:
`Arial, sans-serif`

The primary font may later be overridden by Theme or Client Brand Tokens.

### Header Group

Applies to:

- Display
- H1
- H2
- H3
- H4

Shared rules:

- Line Height: `130%`
- Letter Spacing: `-1%`

Sizes:

- Display: `64px / 700`
- H1: `52px / 700`
- H2: `40px / 700`
- H3: `32px / 600`
- H4: `24px / 600`

Header typography should maintain strong hierarchy and relatively compact vertical rhythm.

Display should be used selectively for Hero or high-impact visual areas.

### Body Group

Applies to:

- Body Large
- Body
- Body Small
- Caption

Shared rules:

- Line Height: `160%`
- Letter Spacing: `0%`

Sizes:

- Body Large: `18px / 400`
- Body: `16px / 400`
- Body Small: `14px / 400`
- Caption: `13px / 400`

Body typography should prioritize Korean readability and comfortable reading.

### Font Weight

Available weights:

- Regular: `400`
- Medium: `500`
- SemiBold: `600`
- Bold: `700`

Avoid creating unnecessary typography variants.

**한국어 설명**

타이포그래피는 Header와 Body 두 그룹으로 관리합니다. 기본 폰트는 Pretendard, 대체 폰트는 Arial, sans-serif이며 Theme 또는 Client Brand Tokens에서 추후 기본 폰트를 재정의할 수 있습니다. Header는 행간 130%, 자간 -1%를 공유하고 Display부터 H4까지 승인된 크기와 굵기로 명확한 위계를 만듭니다. Display는 Hero 등 시각적 강조 영역에서 선택적으로 사용합니다. Body는 행간 160%, 자간 0%를 공유하며 한국어 가독성과 편안한 읽기를 우선합니다. 사용 가능한 굵기는 400, 500, 600, 700이며 불필요한 타이포그래피 변형을 만들지 않습니다.

---

## Radius System

Radius Scale:

- Radius / 4: `4px`
- Radius / 8: `8px`
- Radius / 12: `12px`
- Radius / 16: `16px`
- Radius / Full: `9999px`

Default usage:

- Button: `8px`
- Input: `8px`
- Card: `8–12px`
- Badge / Pill: `Full`

Use restrained border radius appropriate for professional corporate websites.

Avoid excessive rounded UI.

Use 16px selectively for large visual containers.

**한국어 설명**

모서리 반경은 4px, 8px, 12px, 16px, Full(9999px) 스케일을 사용합니다. 기본 버튼과 입력 필드는 8px, 카드는 8–12px, 배지와 Pill은 Full을 사용합니다. 기업 웹사이트에 적합한 절제된 반경을 적용하고 과도한 둥근 UI를 피합니다. 16px는 큰 시각적 컨테이너에 선택적으로 사용합니다.

---

## Neutral Color Palette

Use the following palette.

All contrast ratios are measured against white (`#FFFFFF`).

| Token | HEX | Contrast on White |
|---|---|---:|
| Neutral / 0 | `#FFFFFF` | `1.00:1` |
| Neutral / 50 | `#F8F9FA` | `1.05:1` |
| Neutral / 100 | `#F1F3F5` | `1.11:1` |
| Neutral / 200 | `#E9ECEF` | `1.19:1` |
| Neutral / 300 | `#DEE2E6` | `1.30:1` |
| Neutral / 400 | `#CED4DA` | `1.49:1` |
| Neutral / 500 | `#ADB5BD` | `2.07:1` |
| Neutral / 600 | `#868E96` | `3.32:1` |
| Neutral / 700 | `#495057` | `8.18:1` |
| Neutral / 800 | `#343A40` | `11.51:1` |
| Neutral / 900 | `#212529` | `15.43:1` |
| Neutral / 950 | `#121417` | `18.45:1` |

**한국어 설명**

중립 색상은 위 표에 승인된 Neutral / 0부터 Neutral / 950까지의 HEX 값과 대비율을 그대로 사용합니다. 모든 대비율은 흰색(#FFFFFF)을 기준으로 표시합니다.

---

## Brand Colors

Do not define fixed Base Brand colors.

Use placeholders:

- Brand / Primary: `Placeholder`
- Brand / Secondary: `Placeholder`
- Brand / Accent: `Placeholder`

Brand colors must be defined later at Theme or Client Brand level.

The Base Design System must not depend on a specific client color.

**한국어 설명**

Base Design System에는 고정 브랜드 색상을 정의하지 않습니다. Brand / Primary, Secondary, Accent는 Placeholder로 유지하며, 실제 브랜드 색상은 추후 Theme 또는 Client Brand 수준에서 정의합니다. 공통 기반은 특정 고객의 색상에 의존하지 않습니다.

---

## Text Semantic Mapping

### Text / Primary

- Neutral / 900
- `#212529`
- Contrast: `15.43:1`

Use for:

- Main body text
- Important titles
- Primary information

### Text / Secondary

- Neutral / 700
- `#495057`
- Contrast: `8.18:1`

Use for:

- Supporting body content
- Descriptions
- Secondary information

### Text / Tertiary

- Neutral / 700
- `#495057`
- Contrast: `8.18:1`

Use for:

- Metadata
- Dates
- Categories
- Captions
- Supporting information

Do not automatically use a lighter gray for tertiary text.

Prefer size, weight, and spacing to create hierarchy.

### Text / Muted

- Neutral / 600
- `#868E96`
- Contrast: `3.32:1`

Use only for:

- Non-critical supplementary information
- Decorative text
- Large low-emphasis text
- Non-essential UI information

Do not use for:

- Small normal body text
- Important captions
- Critical navigation

### Text / Disabled

- Neutral / 500
- `#ADB5BD`
- Contrast: `2.07:1`

Use only for clearly disabled or unavailable states.

### Text / Inverse

- Neutral / 0
- `#FFFFFF`

Use on dark backgrounds.

**한국어 설명**

Primary 텍스트는 Neutral / 900, Secondary와 Tertiary는 Neutral / 700을 사용합니다. Tertiary에 자동으로 더 밝은 회색을 적용하지 않고 크기, 굵기, 간격으로 위계를 만듭니다. Neutral / 600의 Muted는 중요하지 않은 보조 정보, 장식 텍스트, 큰 저강조 텍스트와 비필수 UI 정보에만 사용하며 작은 일반 본문, 중요한 캡션, 핵심 내비게이션에는 사용하지 않습니다. Neutral / 500의 Disabled는 명확히 비활성화되거나 사용할 수 없는 상태에만 사용합니다. Inverse는 어두운 배경에 Neutral / 0을 사용합니다.

---

## Surface Semantic Mapping

- Surface / Default → Neutral / 0
- Surface / Subtle → Neutral / 50
- Surface / Muted → Neutral / 100
- Surface / Emphasis → Neutral / 800
- Surface / Strong → Neutral / 900
- Surface / Inverse → Neutral / 950

Prefer surface contrast, whitespace, and borders before adding shadows.

**한국어 설명**

표면 색상은 Default, Subtle, Muted, Emphasis, Strong, Inverse의 의미에 따라 위의 Neutral 토큰에 매핑합니다. 그림자를 추가하기 전에 표면 대비, 여백, 테두리를 우선 활용합니다.

---

## Border Semantic Mapping

All default structural borders should generally use `1px`.

- Border / Subtle → Neutral / 100
- Border / Default → Neutral / 200
- Border / Strong → Neutral / 300
- Border / Emphasis → Neutral / 500

Use color contrast rather than increasing border thickness for normal hierarchy.

Focus states may later use a separate `2px` focus rule.

**한국어 설명**

기본 구조 테두리는 일반적으로 1px를 사용하며, Subtle, Default, Strong, Emphasis를 위의 Neutral 토큰에 매핑합니다. 일반적인 위계는 두께 증가보다 색상 대비로 표현합니다. 별도의 2px 포커스 규칙은 추후 사용할 수 있는 사항이며 현재 확정하지 않습니다.

---

## Icon Semantic Mapping

- Icon / Primary → Neutral / 900
- Icon / Secondary → Neutral / 700
- Icon / Tertiary → Neutral / 600
- Icon / Disabled → Neutral / 500
- Icon / Inverse → Neutral / 0

Important action icons should generally use Neutral / 700 or darker.

**한국어 설명**

아이콘은 Primary, Secondary, Tertiary, Disabled, Inverse의 의미에 따라 위의 Neutral 토큰에 매핑합니다. 중요한 동작 아이콘은 일반적으로 Neutral / 700 또는 더 어두운 색상을 사용합니다.

---

## Divider Semantic Mapping

- Divider / Subtle → Neutral / 100
- Divider / Default → Neutral / 200
- Divider / Strong → Neutral / 300

**한국어 설명**

구분선은 Subtle을 Neutral / 100, Default를 Neutral / 200, Strong을 Neutral / 300에 매핑합니다.

---

## Contrast Rules

For white backgrounds:

High-readability text should generally use:

- Neutral / 900
- Neutral / 800
- Neutral / 700

Normal and small readable text should target at least approximately `4.5:1` contrast.

Neutral / 600 has approximately `3.32:1` contrast and should not be used for important small text.

Neutral / 500 and lighter values should mainly be used for:

- Disabled states
- Borders
- Surfaces
- Non-essential decorative UI

Do not create visual hierarchy by making important text unnecessarily low contrast.

Prefer:

- Font size
- Weight
- Spacing
- Position
- Information hierarchy

before reducing text contrast.

**한국어 설명**

흰색 배경에서 높은 가독성이 필요한 텍스트는 일반적으로 Neutral / 900, 800, 700을 사용합니다. 일반 및 작은 텍스트는 최소 약 4.5:1의 대비를 목표로 합니다. 약 3.32:1인 Neutral / 600은 중요한 작은 텍스트에 사용하지 않습니다. Neutral / 500과 더 밝은 색상은 주로 비활성 상태, 테두리, 표면, 비필수 장식 UI에 사용합니다. 중요한 텍스트의 대비를 불필요하게 낮추지 않고 크기, 굵기, 간격, 위치, 정보 위계를 우선 활용합니다.

---

## Base Design Principles

Follow these principles:

- Spacious corporate layouts
- Strong information hierarchy
- Consistent alignment
- High readability
- Responsive behavior
- Reusable design rules
- Restrained visual decoration
- Minimal unnecessary shadows
- Minimal unnecessary rounded UI
- Neutral Base System
- Brand independence

Avoid:

- Overly dense layouts
- Arbitrary spacing
- Excessive card compositions
- Excessive gradients
- Excessive shadows
- Excessive rounded corners
- Generic SaaS visual patterns
- Decorative UI without purpose
- Low-contrast readable text

**한국어 설명**

여유 있는 기업 레이아웃, 명확한 정보 위계, 일관된 정렬, 높은 가독성, 반응형 동작, 재사용 가능한 규칙을 따릅니다. 시각적 장식, 불필요한 그림자와 둥근 UI를 절제하고 중립적인 공통 기반과 브랜드 독립성을 유지합니다. 지나치게 조밀한 배치, 임의의 간격, 과도한 카드 구성·그라디언트·그림자·둥근 모서리, 일반적인 SaaS 시각 패턴, 목적 없는 장식 UI, 낮은 대비의 읽기용 텍스트는 피합니다.

---

## Version Status

Current version:

`Base Design System v0.2`

Included:

- Layout
- Grid
- Responsive foundation
- Spacing
- Typography
- Radius
- Neutral palette
- Brand placeholders
- Text semantic mapping
- Surface semantic mapping
- Border semantic mapping
- Icon semantic mapping
- Divider semantic mapping
- Contrast rules

Not yet finalized:

- Semantic Success colors
- Semantic Warning colors
- Semantic Error colors
- Semantic Info colors
- Shadow system
- Focus system

Do not invent or finalize these values yet.

They will be defined in the next approved update.

**한국어 설명**

현재 버전은 Base Design System v0.2이며 레이아웃, 그리드, 반응형 기반, 간격, 타이포그래피, 반경, 중립 팔레트, 브랜드 Placeholder, 텍스트·표면·테두리·아이콘·구분선의 의미 기반 매핑과 대비 규칙을 포함합니다. Success, Warning, Error, Info 의미 색상과 그림자 및 포커스 시스템은 아직 확정하지 않았습니다. 이 값들을 임의로 만들거나 확정하지 않으며, 다음 승인된 업데이트에서 정의합니다.
