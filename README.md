# Reusable Web Design System

This repository is a reusable web design system for spacious, professional corporate websites. It will later expand with themes, components, patterns, and project-specific brand tokens.

**한국어 설명**

이 저장소는 여유 있는 레이아웃과 전문적인 기업 웹사이트를 위한 재사용 가능한 웹 디자인 시스템입니다. 향후 테마, 컴포넌트, 패턴, 프로젝트별 브랜드 토큰으로 확장합니다.

## Architecture

```text
Base Design System
        +
Theme
        +
Client Brand Tokens
        +
Layout / Page Patterns
        =
Project Design
```

- Base Design System = shared structural rules
- Theme = visual direction and layout behavior
- Client Brand Tokens = project-specific branding
- Components = reusable UI elements
- Patterns = reusable layout and page structures
- Projects = client-specific implementation notes

Base Design System rules and Theme rules remain separate. Project-specific brand values do not modify the Base Design System.

**한국어 설명**

Base Design System은 공통 구조 규칙, Theme은 시각적 방향과 레이아웃 동작, Client Brand Tokens는 프로젝트별 브랜딩을 정의합니다. Components는 재사용 가능한 UI 요소, Patterns는 재사용 가능한 레이아웃 및 페이지 구조, Projects는 고객별 구현 참고 사항을 담습니다. 공통 기반에 테마, 브랜드 토큰, 레이아웃 및 페이지 패턴을 조합하여 프로젝트 디자인을 구성합니다. Base Design System과 Theme 규칙은 분리하며, 프로젝트별 브랜드 값으로 공통 기반을 변경하지 않습니다.

## Repository Structure

```text
design-system/
├─ AGENTS.md
├─ README.md
├─ foundations/
│  └─ base-design-system-v0.2.md
├─ themes/
├─ components/
├─ patterns/
└─ projects/
```

The current foundation is [Base Design System v0.2](foundations/base-design-system-v0.2.md). Permanent working and versioning rules are defined in [AGENTS.md](AGENTS.md).

The `themes/`, `components/`, `patterns/`, and `projects/` folders are reserved for future approved additions and are currently empty.

**한국어 설명**

현재 공통 기반은 `foundations/base-design-system-v0.2.md`이며, 지속적으로 적용할 작업 및 버전 관리 규칙은 `AGENTS.md`에 정의합니다. `themes/`, `components/`, `patterns/`, `projects/` 폴더는 향후 승인된 내용을 추가하기 위한 공간으로 현재는 비워 둡니다.

## Future Workflows

This repository will later be connected to Figma, Claude Design, Claude Code, Codex, and GitHub workflows.

**한국어 설명**

이 저장소는 향후 Figma, Claude Design, Claude Code, Codex, GitHub 워크플로와 연결할 예정입니다.
