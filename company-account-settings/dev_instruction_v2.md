# Developer Instructions v2.0

> [!IMPORTANT]
> **READ THIS BEFORE STARTING ANY WORK**
>
> This document is the **primary source of truth** for all development work. Adherence to these guidelines is **mandatory** to ensure consistency, maintainability, and alignment with HeroUI v3 principles.

## TL;DR (Too Long; Didn't Read)

1. **Check HeroUI first** - Don't reinvent what exists (Rule #0)
2. **Named Exports ONLY** - `export function Component`, never `export default`.
3. **TanStack Router** - Use `src/router.tsx` for all navigation. No hash routing.
4. **Use `onPress`** - Not `onClick` (for HeroUI components).
5. **Strict Typing** - No `any`. All props must be defined.
6. **Direct Imports** - From `@heroui/react`. **NO WRAPPER COMPONENTS.**
7. **Path Aliases** - Always use `@/` for internal imports.
8. **No `use client`** - This is a Vite SPA.
9. **Lazy Load Devtools** - Keep production bundles small.

**When stuck:** Check `./docs/heroui-docs.txt` → Official docs → Ask team

---

## Table of Contents

1. [Vision & Mission](#vision--mission)
2. [🛑 Rule #0: Check HeroUI First](#-rule-0-check-heroui-first)
3. [Architectural Standards](#architectural-standards)
4. [Coding Standards](#coding-standards)
5. [Core Principles](#core-principles)
6. [File Structure & Naming](#file-structure--naming)
7. [Component Patterns](#component-patterns)
8. [Performance & Reliability](#performance--reliability)
9. [Styling & Theming](#styling--theming)
10. [Developer Workflow](#developer-workflow)
11. [Pre-Commit Checklist](#pre-commit-checklist)

---

## Vision & Mission

We build **premium, accessible, and maintainable** interfaces. We do not build "good enough" – we build "excellent".

**Our Standards:**

- ✅ **Type-Safe**: Complete TypeScript coverage.
- ✅ **Accessible**: Keyboard navigation and screen reader support (React Aria).
- ✅ **Performant**: Tree-shaking and lazy loading by default.
- ✅ **Consistent**: Uniform code style via Named Exports and Aliases.

---

## 🛑 Rule #0: Check HeroUI First

**Before creating ANY component, styling, or pattern:**

1. **Check** the [Components List](https://v3.heroui.com/docs/components-list)
2. **Search** the [Full Documentation](./docs/heroui-docs.txt)
3. **Review** existing project components

❌ **Never reinvent what exists**
❌ **Never create wrapper components**
✅ **Always import directly from @heroui/react**

---

## Architectural Standards

### 1. Component Decomposition

Break monolithic components into domain-specific sub-components.
- **Anti-Pattern**: One 500-line `AccountSettings.tsx`.
- **Standard**: `AccountSettings.tsx` should only orchestrate.
  - `sections/BillingSection.tsx`
  - `sections/CompanyInfoSection.tsx`
  - `sections/ManagersSection.tsx`

### 2. Logic Extraction

Separate business logic from UI rendering using custom hooks.
- **Standard**: Create `hooks/useFeatureName.ts` for state and effects.
- **Example**: `useAccountSettings.ts` handles API calls, leaving `AccountSettings.tsx` purely for layout.

### 3. Routing (TanStack Router)

* **Mandatory**: Use **TanStack Router** for all navigation.
- **Configuration**: Centralized in `src/router.tsx`.
- **Navigation**: Use `router.navigate()` or `<Link>`.
- **Forbidden**: `window.location.hash` or manual history manipulation.

### 4. Data Management

* **Single Source of Truth**: All mock data must reside in `src/data/`.
- **Forbidden**: Hardcoded data arrays inside component files.

---

## Coding Standards

### 1. Named Exports Only

* **Rule**: Use `export function ComponentName() {}`.
- **Forbidden**: `export default function ...` or `export default ComponentName`.
- **Reasoning**: Better tree-shaking, predictable imports, easier refactoring.

### 2. Import Aliases

* **Rule**: Use `@/` for all internal source imports.
- **Forbidden**: Deep relative paths like `../../../../components`.
- **Example**: `import { Button } from '@/components/ui';` (if using custom UI, but prefer direct HeroUI).

### 3. No `use client`

* **Context**: This is a Vite Single Page Application (SPA).
- **Rule**: **Do not** use the `"use client"` directive. It is specific to Next.js App Router/RSC.

### 4. Strict Typing

* **Rule**: Zero tolerance for `any`.
- **Standard**: Define interfaces for **all** component props.

    ```tsx
    interface UserCardProps {
      user: User; // Defined in '@/types'
      isActive?: boolean;
    }
    ```

---

## Core Principles

### 1. ♿ Accessibility First (onPress vs onClick)

* **Rule**: Use `onPress` for all interaction handlers in HeroUI components.
- **Reasoning**: `onPress` (via React Aria) handles touch, keyboard (Enter/Space), and screen readers correctly. `onClick` does not always capture these uniformly.
- **Exception**: Native HTML elements (use sparingly, prefer HeroUI primitives).

### 2. 🎯 Semantic Variants

* Use `primary`, `secondary`, `danger`, not visual names (`blue`, `red`).
- Reference `DESIGN_SYSTEM.md` for the strict token set.

### 3. 🧩 Composition

* Use dot notation: `<Card.Header>`, `<Modal.Body>`.
- Avoid "configuration props" like `headerText="..."`.

---

## File Structure & Naming

```text
src/
├── app/             # Application pages/features
│   ├── admin/       # Admin feature modules
│   └── home/        # Home feature modules
├── components/
│   ├── common/      # Generic reusable components (ErrorBoundary, etc.)
│   ├── navigation/  # Nav bars, sidebars
│   └── [feature]/   # Feature-specific components
├── data/            # Single source of truth for mocks/constants
├── hooks/           # Shared custom hooks
├── types/           # Global TypeScript definitions
├── router.tsx       # TanStack Router configuration
└── main.tsx         # Entry point
```

**Naming:**
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase (`usePermissions.ts`)
- **Data**: kebab-case or camelCase (`mock-team.ts`)

---

## Component Patterns

### ✅ Direct Imports (No Wrappers)

```tsx
// ✅ Correct
import { Button } from '@heroui/react';

// ❌ Incorrect
import { Button } from '@/components/ui/button';
```

### ✅ Conditional Devtools

Lazy load heavy development tools to keep production bundles light.

```tsx
const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() => import('@tanstack/router-devtools').then(...));
```

### ✅ Error Boundaries

Wrap all major features or routes in an `ErrorBoundary` to prevent entire app crashes.

---

## Performance & Reliability

### 1. Lazy Loading

* **Rule**: Lazy load route components and devtools.
- **Tool**: `React.lazy` and `Suspense`.

### 2. Dependency Management

* **Rule**: Check bundle size impact before adding new libraries.
- **Standard**: Use tree-shakeable imports.

---

## Styling & Theming

### 1. Styling Safety

* **Warning**: Be careful when mixing Tailwind utility classes (e.g., `min-w-0`, `px-0`) with pre-defined component classes (e.g., `.liquid-glass-item`).
- **Standard**: Verify overrides do not break layout or accessibility.

### 2. Design Tokens

* Reference **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)**.
- Use CSS variables: `var(--splento-cyan)` over hardcoded hex.
- Use semantic colors: `bg-accent` over `bg-cyan-500`.

---

## Developer Workflow

### 1. Node Version

* **Mandatory**: Use the Node.js version specified in `.nvmrc` (pinned via `package.json` engines).

### 2. Pre-commit Hooks (Husky)

* **Workflow**: Commits will fail if `npm run lint` or `npm run typecheck` fails.
- **Action**: Fix errors; do not bypass with `--no-verify`.

---

## Pre-Commit Checklist

- [ ] **Functional**:
  - [ ] `npm run build` passes.
  - [ ] `npm run lint` passes.
  - [ ] `npm test` passes.
- [ ] **Code Quality**:
  - [ ] Named exports used everywhere.
  - [ ] No `any` types.
  - [ ] No `use client`.
  - [ ] Imports use `@/` alias.
- [ ] **Accessibility**:
  - [ ] `onPress` used for interactions.
  - [ ] Keyboard navigation verified.
- [ ] **Architecture**:
  - [ ] Logic extracted to hooks.
  - [ ] Data moved to `src/data`.
  - [ ] Devtools lazy loaded.
