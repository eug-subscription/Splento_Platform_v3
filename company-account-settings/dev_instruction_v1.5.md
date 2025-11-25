# Developer Instructions

> [!IMPORTANT]
> **READ THIS BEFORE STARTING ANY WORK**
>
> This document is the **primary source of truth** for all development work. Adherence to these guidelines is **mandatory** to ensure consistency, maintainability, and alignment with HeroUI v3 principles.

## TL;DR (Too Long; Didn't Read)

1. **Check HeroUI first** - Don't reinvent what exists (Rule #0)
2. **Use compound components** - Always dot notation: `<Accordion.Item>`
3. **Semantic variants** - `primary`, not `solid`
4. **Use `onPress`** - Not `onClick`
5. **Test dark mode** - Every component must work in both themes
6. **No hardcoded colors** - Use `bg-accent`, not `bg-blue-500`
7. **🚫 NO WRAPPER COMPONENTS** - Import directly from `@heroui/react` ⚠️

**When stuck:** Check `./heroui-docs.txt` → Official docs → Ask team

---

## Table of Contents

1. [Vision & Mission](#vision--mission)
2. [🛑 Rule #0: Check HeroUI First](#-rule-0-check-heroui-first)
3. [🚫 Anti-Pattern: Wrapper Components](#-anti-pattern-wrapper-components)
4. [Core Principles](#core-principles)
5. [Reference Documents](#reference-documents)
6. [File Structure & Naming](#file-structure--naming)
7. [Icons](#icons)
8. [State Management](#state-management)
9. [Component Patterns](#component-patterns)
10. [Error Handling](#error-handling)
11. [Styling & Theming](#styling--theming)
12. [DO's and DON'Ts](#dos-and-donts)
13. [🚨 Common Mistakes](#-common-mistakes)
14. [Pre-Commit Checklist](#pre-commit-checklist)
15. [Quick Reference](#quick-reference)

---

## Vision & Mission

We build **premium, accessible, and maintainable** interfaces. We do not build "good enough" – we build "excellent".

**Our Standards:**

- ✅ Every component is keyboard accessible
- ✅ Light and dark themes work perfectly
- ✅ TypeScript types are complete and accurate
- ✅ Code is readable by both humans and AI
- ✅ Performance is optimized by default

---

## 🛑 Rule #0: Check HeroUI First

**Before creating ANY component, styling, or pattern:**

1. **Check** the [Components List](https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/components-list.mdx) or [Official Docs](https://v3.heroui.com/docs/components-list)
2. **Search** the [Full Documentation](./heroui-docs.txt)
3. **Review** existing project components

**Decision Tree:**

```text
Does HeroUI have it?
├─ YES → Import directly from @heroui/react (NO wrappers!)
├─ ALMOST → Extend it (use asChild or composition)
└─ NO → Only then build custom (with approval)
```

❌ **Never reinvent what exists**  
❌ **Never create wrapper components**  
✅ **Always import directly from @heroui/react**  
✅ **Always compose before creating**

---

## 🚫 Anti-Pattern: Wrapper Components

> [!WARNING]
> **CRITICAL: DO NOT CREATE WRAPPER COMPONENTS**
>
> Creating wrapper components that re-export HeroUI components is **strictly forbidden**. This anti-pattern causes bundle bloat, type issues, and maintenance nightmares.

### ❌ What NOT to Do (Wrapper Anti-Pattern)

**DON'T create files like this:**

```tsx
// ❌ WRONG: src/components/ui/button.tsx
import { Button as HeroButton } from '@heroui/react';

export function Button(props) {
  return <HeroButton {...props} />;
}

// ❌ WRONG: Re-exporting types
export type { ButtonProps } from '@heroui/react';
```

**Why this is bad:**

1. 🔴 **Duplicate imports**: Bundle includes both your wrapper AND HeroUI component
2. 🔴 **Type drift**: Your re-exported types can become out of sync
3. 🔴 **Confusion**: Two import paths for same component
4. 🔴 **No added value**: Wrapper does nothing useful
5. 🔴 **Maintenance burden**: You maintain code that HeroUI already maintains

### ✅ What TO Do (Direct Import)

**Always import directly from HeroUI:**

```tsx
// ✅ CORRECT: Import directly from @heroui/react
import { Button } from '@heroui/react';
import type { ButtonProps } from '@heroui/react';

function MyComponent() {
  return <Button variant="primary">Submit</Button>;
}
```

### 🎯 When Wrapper-Like Pattern is OK

**Only create custom components when adding real business logic:**

```tsx
// ✅ OK: Adding business logic, not just re-exporting
import { Button } from '@heroui/react';
import { usePermissions } from '@/hooks/usePermissions';

export function PermissionButton({ permission, ...props }) {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission(permission)) {
    return null;
  }
  
  return <Button {...props} />;
}
```

**Key difference:** This component **adds logic**, not just re-exports.

### 📋 Wrapper Detection Checklist

**If your component file:**

- [ ] Imports from `@heroui/react`
- [ ] Just returns that component with `{...props}`
- [ ] Has no business logic
- [ ] Has no custom validation
- [ ] Has no conditional rendering
- [ ] Just re-exports types

**→ Then it's a WRAPPER and must be DELETED** ❌

### 🔍 How to Find Wrappers in Your Code

```bash
# Search for potential wrapper files
find src/components/ui -name "*.tsx" -exec grep -l "from '@heroui/react'" {} \;

# Check if file just re-exports
grep -A 5 "export function" src/components/ui/button.tsx
```

### 🚨 Code Review Rules

**Reviewers MUST reject PRs that:**

1. Create new wrapper components in `src/components/ui/`
2. Re-export HeroUI components without adding logic
3. Import from `@/components/ui/button` instead of `@heroui/react`

**Penalty for violations:**

- 🔴 Immediate PR rejection
- 🔴 Required refactor before merge
- 🔴 Team discussion about Rule #0

---

## Core Principles

HeroUI v3 follows **10 core principles** that must guide all development:

### 1. 🎯 Semantic Intent Over Visual Style

| ❌ DON'T Use Visual Names | ✅ DO Use Semantic Names |
|---------------------------|--------------------------|
| `<Button variant="solid">` | `<Button variant="primary">` |
| `<Button variant="bordered">` | `<Button variant="secondary">` |
| `className="bg-red-500"` | `variant="danger"` |

**Variant Hierarchy:**

- `primary` → Main action (1 per context)
- `secondary` → Alternative actions
- `tertiary` → Dismissive actions
- `danger` → Destructive actions
- `ghost` → Minimal emphasis

### 2. ♿ Accessibility as Foundation

**Non-negotiable requirements:**

- ✅ Keyboard navigation works everywhere
- ✅ Screen readers announce all changes
- ✅ Focus indicators are always visible
- ✅ ARIA attributes are correct
- ✅ Color contrast meets WCAG AA

Built on [React Aria](https://react-spectrum.adobe.com/react-aria/) – accessibility is automatic when used correctly.

### 3. 🧩 Composition Over Configuration

| ❌ DON'T Pass Config Objects | ✅ DO Compose Components |
|------------------------------|--------------------------|
| `<Card config={{title: "...", content: "..."}} />` | `<Card><Card.Header><Card.Title>...</Card.Title></Card.Header></Card>` |
| `<Form fields={[...]} />` | `<Form><TextField><TextField.Label>...</TextField.Label></TextField></Form>` |

### 4. 📈 Progressive Disclosure

Start simple, add complexity only when needed:

```tsx
// Level 1: Minimal
<Button>Click me</Button>

// Level 2: Enhanced  
<Button variant="primary" size="lg">Submit</Button>

// Level 3: Advanced
<Button variant="primary" isDisabled={isLoading}>
  {isLoading ? <Spinner size="sm" /> : 'Submit'}
</Button>
```

### 5. 🎨 Predictable Behavior

All components follow the same patterns:

- Sizes: `sm`, `md`, `lg`
- Variants: semantic names
- Props: consistent across components
- States: `isDisabled`, `isLoading`, `isInvalid`

### 6. 🔒 Type Safety First

```tsx
// ✅ Always use proper types
import type { ButtonProps } from '@heroui/react';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  intent: 'save' | 'cancel' | 'delete';
}
```

### 7-10. Other Principles

- **Separation of Styles and Logic**: React handles logic, CSS handles appearance
- **Developer Experience**: Clear APIs, descriptive errors
- **Complete Customization**: Every slot is customizable
- **Open and Extensible**: Wrap and extend as needed

**📖 Full details:** [Design Principles](https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/design-principles.mdx)

---

## Reference Documents

**You MUST consult these when in doubt:**

1. **[Design Principles](https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/design-principles.mdx)**
   - Why HeroUI v3 works this way
   - Core design philosophy

2. **[Components List](https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/components-list.mdx)** ([Official Docs](https://v3.heroui.com/docs/components-list))
   - Available components catalog
   - Check here first (Rule #0)

3. **[Full Documentation](./heroui-docs.txt)**
   - Complete API reference (Local File)
   - Styling guide
   - All examples
   - [Online Mirror](https://v3.heroui.com/llms-full.txt)

4. **[Component Source Code](https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components)**
   - React component implementations
   - TypeScript types and interfaces
   - Component anatomy and structure

5. **[Component Styles](https://github.com/heroui-inc/heroui/tree/v3/packages/styles/components)**
   - CSS and theme definitions
   - Variant implementations
   - Default styling

---

## File Structure & Naming

### Directory Layout

```text
src/
├── app/             # Feature-specific logic
├── components/
│   ├── features/    # Feature components with business logic
│   └── admin/       # Admin-specific components
├── index.css        # Global styles & Tailwind imports
├── main.tsx         # Entry point
└── types/           # TypeScript types
```

> [!NOTE]
> **NO `src/components/ui/` folder for HeroUI wrappers!**
>
> All HeroUI components should be imported directly from `@heroui/react`.
> Only create custom components when adding real business logic or features.

### Naming Conventions

| Type | Convention | Example |
|------|-----------|------------|
| **Components** | PascalCase | `UserProfile.tsx` |
| **Files** | kebab-case or PascalCase* | `user-profile.tsx` or `UserProfile.tsx` |
| **Variables** | camelCase | `isLoading`, `userData` |
| **Constants** | UPPER_SNAKE_CASE | `API_URL`, `MAX_ITEMS` |
| **CSS Classes** | BEM | `.button--primary`, `.card__header` |

> [!NOTE]
> **Project Convention: PascalCase Component Files**
>
> This project uses PascalCase for component files (e.g., `UserProfile.tsx`).
> This is a valid convention widely used in React/Next.js projects.
>
> ✅ DO: Use PascalCase for component files
> ✅ DO: Use kebab-case for utility/helper files
> ❌ DON'T: Mix conventions (pick one and stick to it)

### Import Order

```tsx
// 1. React
import { useState } from 'react';

// 2. External libraries
import { motion } from 'framer-motion';

// 3. HeroUI components (ALWAYS direct from @heroui/react)
import { Button, Card } from '@heroui/react';

// 4. Local components (features, not wrappers)
import { FeatureCard } from '@/components/features/feature-card';

// 5. Types
import type { User } from '@/types';
```

---

## Icons

**Icon Library:** We use [Iconify](https://iconify.design/) with the `gravity-ui` collection.

**Installation:**

```bash
npm i @iconify/react
```

**Usage:**

```tsx
import { Icon } from '@iconify/react';

<Button variant="primary">
  <Icon icon="gravity-ui:check" className="mr-2" />
  Submit
</Button>
```

**Rules:**

- ✅ Use `gravity-ui` for consistency
- ✅ Set explicit size: `className="size-4"`
- ❌ Don't mix icon libraries (no mixing lucide + heroicons)

## State Management

**Local State:** Use React hooks (`useState`, `useReducer`)
**Shared State:** React Context

**Example:**

```tsx
// Local state
const [isOpen, setIsOpen] = useState(false);

// Form state
const [formData, setFormData] = useState({ email: '', password: '' });
```

## Component Patterns

### ✅ Compound Components (Primary Pattern)

**This is the HeroUI way:**

```tsx
// ✅ CORRECT: Compound components with dot notation
// See: https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components/accordion
<Accordion>
  <Accordion.Item id="1">
    <Accordion.Heading>
      <Accordion.Trigger>
        Question Text
        <Accordion.Indicator />
      </Accordion.Trigger>
    </Accordion.Heading>
    <Accordion.Panel>
      <Accordion.Body>Answer content</Accordion.Body>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion>

// ✅ CORRECT: TextField composition
// See: https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components/text-field
<TextField>
  <TextField.Label>Email</TextField.Label>
  <TextField.Input type="email" placeholder="you@example.com" />
  <TextField.Description>We'll never share your email.</TextField.Description>
</TextField>

// ✅ CORRECT: Tabs structure
// See: https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components/tabs
<Tabs defaultSelectedKey="profile">
  <Tabs.ListWrapper>
    <Tabs.List aria-label="Settings">
      <Tabs.Tab id="profile">Profile</Tabs.Tab>
      <Tabs.Tab id="security">Security</Tabs.Tab>
    </Tabs.List>
    <Tabs.Indicator />
  </Tabs.ListWrapper>
  <Tabs.Panel id="profile">Content</Tabs.Panel>
</Tabs>
```

### ❌ Anti-Patterns to Avoid

```tsx
// ❌ WRONG: Config objects
<TextField label="Email" description="..." />

// ❌ WRONG: v2 patterns
<Accordion items={[...]} />

// ❌ WRONG: Importing from wrapper
import { Button } from '@/components/ui/button';

// ✅ CORRECT: Import directly from HeroUI
import { Button } from '@heroui/react';
```

### 🎭 Render Props Pattern

Use when you need dynamic styling based on state:

```tsx
<Button>
  {({ isPressed, isHovered }) => (
    <>
      <Icon className={isPressed ? 'rotate-90' : ''} />
      {isHovered ? 'Release' : 'Press'}
    </>
  )}
</Button>
```

### 🔄 asChild Prop Pattern

Change the rendered element while keeping styles:

```tsx
import { Button } from '@heroui/react';
import Link from 'next/link';

// Renders as Next.js Link, looks like Button
// See: https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components/button
<Button asChild>
  <Link href="/about">About</Link>
</Button>
```

### 🎨 Extending Components

**Method 1: Using tailwind-variants**

```tsx
import { Button, buttonVariants } from '@heroui/react';
import { tv } from 'tailwind-variants';

// Extend Button variants: https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components/button
const customButton = tv({
  extend: buttonVariants,
  variants: {
    variant: {
      gradient: 'bg-gradient-to-r from-blue-500 to-purple-600',
    }
  }
});

<Button className={customButton({ variant: 'gradient' })}>Click</Button>
```

**Method 2: Composition with Business Logic**

```tsx
// ✅ CORRECT: Adding business logic
import { Button } from '@heroui/react';
import { usePermissions } from '@/hooks/usePermissions';

function DeleteButton({ resourceId, ...props }) {
  const { canDelete } = usePermissions();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteResource(resourceId);
    setIsDeleting(false);
  };

  if (!canDelete) return null;

  return (
    <Button 
      variant="danger" 
      isDisabled={isDeleting}
      onPress={handleDelete}
      {...props}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
```

---

## Error Handling

**Pattern:**

```tsx
import { Alert } from '@heroui/react';

function MyComponent() {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Description>
          Error: {error}
        </Alert.Description>
      </Alert>
    );
  }

  return <>{/* Normal content */}</>;
}
```

## Styling & Theming

### 🎨 Three Styling Methods

#### 1. Tailwind Classes (Primary)

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">
  Custom Button
</Button>
```

#### 2. BEM Classes (Component-level)

```css
@layer components {
  .button--gradient {
    @apply bg-gradient-to-r from-purple-500 to-pink-500;
  }
  
  .accordion__trigger {
    @apply text-lg font-bold;
  }
}
```

#### 3. CSS Variables (Theming)

```css
:root {
  --accent: oklch(0.7 0.25 260);
  --radius: 0.375rem;
}

.button {
  background: var(--accent);
  color: var(--accent-foreground);
}
```

### 🌓 Theme Setup

```html
<!-- Light theme -->
<html class="light" data-theme="light">
  <body class="bg-background text-foreground">
    <!-- App -->
  </body>
</html>

<!-- Dark theme -->
<html class="dark" data-theme="dark">
  <body class="bg-background text-foreground">
    <!-- App -->
  </body>
</html>
```

### 🎨 Color System

**Always use semantic color pairs:**

```tsx
// ✅ CORRECT: Paired colors for contrast
<div className="bg-accent text-accent-foreground">
  Accent content
</div>

// ❌ WRONG: Hardcoded colors
<div className="bg-blue-500 text-white">
  Content
</div>
```

**Available Colors:**

- `background` / `foreground`
- `accent` / `accent-foreground`
- `success` / `success-foreground`
- `warning` / `warning-foreground`
- `danger` / `danger-foreground`
- `surface-1`, `surface-2`, `surface-3`
- `muted`, `border`, `focus`

### ✨ Interactive States

Use data attributes for state-based styling:

```css
/* Both pseudo-classes and data attributes work */
.button:hover,
.button[data-hover="true"] {
  background: var(--accent-hover);
}

.button:active,
.button[data-pressed="true"] {
  transform: scale(0.97);
}

.button:focus-visible,
.button[data-focus-visible="true"] {
  outline: 2px solid var(--focus);
}
```

### 🎭 BEM Methodology

**Available CSS Classes by Component:**

| Component | Base | Modifiers | Elements |
|-----------|------|-----------|----------|
| **Button** | `.button` | `--primary`, `--secondary`, `--danger`, `--sm`, `--lg` | N/A |
| **Accordion** | `.accordion` | `--outline` | `__item`, `__trigger`, `__panel`, `__body` |
| **Avatar** | `.avatar` | `--sm`, `--md`, `--lg` | `__image`, `__fallback` |
| **Tabs** | `.tabs` | N/A | `__list`, `__tab`, `__panel`, `__indicator` |

---

## DO's and DON'Ts

### 🔷 Component Usage

| ❌ DON'T | ✅ DO |
|----------|-------|
| Create wrapper components in `src/components/ui/` | Import directly from `@heroui/react` |
| `import { Button } from '@/components/ui/button'` | `import { Button } from '@heroui/react'` |
| Use v2 patterns: `<Accordion items={[...]} />` | Use compound components: `<Accordion><Accordion.Item>...</Accordion.Item></Accordion>` |
| Use `onClick` events | Use `onPress` events (React Aria) |
| Use visual variants: `variant="solid"` | Use semantic variants: `variant="primary"` |
| Forget compound structure | Always compose with dot notation |

### 🎨 Styling

| ❌ DON'T | ✅ DO |
|----------|-------|
| Hardcode colors: `bg-red-500` | Use variables: `bg-danger` |
| Use `!important` unnecessarily | Use proper CSS specificity |
| Ignore BEM methodology | Follow `.block__element--modifier` |
| Skip dark mode testing | Test both light and dark themes |

### ♿ Accessibility

| ❌ DON'T | ✅ DO |
|----------|-------|
| Remove focus indicators | Keep focus visible always |
| Use `div` for clickable elements | Use `<Button>` for interactions |
| Forget `aria-label` on icon buttons | `<Button isIconOnly aria-label="Close">` |
| Skip keyboard testing | Navigate with Tab/Enter/Space |

### ⚡ Performance

| ❌ DON'T | ✅ DO |
|----------|-------|
| Import entire library: `import * as HeroUI` | Tree-shake: `import { Button } from '@heroui/react'` |
| Create wrapper components | Import directly from `@heroui/react` |
| Use Framer Motion for simple animations | Use CSS animations (built-in) |
| Create 500+ line components | Keep components small and focused |

### 📝 Code Quality

| ❌ DON'T | ✅ DO |
|----------|-------|
| Use `any` types | Define proper TypeScript types |
| Mix icon styles (filled vs outlined) | Use one consistent icon set |
| Hardcode text sizes: `text-[13px]` | Use tokens: `text-sm`, `text-base` |
| Leave `console.log` statements | Remove debug code before commit |

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---------|-----|
| **Creating wrapper components** | Import directly from `@heroui/react` |
| **Importing from `@/components/ui/button`** | Use `import { Button } from '@heroui/react'` |
| Forgetting `'use client'` in Next.js | Add at top of interactive components |
| Using `onClick` instead of `onPress` | Always use `onPress` for HeroUI |
| Missing compound component structure | Check component docs for anatomy |
| Hardcoded colors in dark mode | Use semantic tokens (`bg-surface-1`) |
| Icon-only button without label | Add `aria-label="..."` |

## Pre-Commit Checklist

**You MUST verify all items before committing:**

### ✅ Code Quality

- [ ] **NO wrapper components created** (imports directly from `@heroui/react`)
- [ ] **NO imports from `@/components/ui/`** (for HeroUI components)
- [ ] Imports organized correctly (React → External → HeroUI → Local → Types)
- [ ] No TypeScript `any` types used
- [ ] Compound components used with dot notation
- [ ] Events use `onPress` instead of `onClick`
- [ ] Semantic variants used (`primary`, not `solid`)

### ✅ Styling

- [ ] Tailwind utilities used for styling
- [ ] BEM methodology followed for custom CSS
- [ ] CSS variables used instead of hardcoded colors
- [ ] **Tested in both light AND dark themes**
- [ ] No unnecessary `!important` declarations
- [ ] Responsive on mobile, tablet, desktop

### ✅ Accessibility

- [ ] Icon-only buttons have `aria-label`
- [ ] Form fields have proper labels
- [ ] **Can navigate with keyboard only (Tab/Enter/Space)**
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators are visible
- [ ] Screen reader tested (if possible)

### ✅ Performance

- [ ] Tree-shakeable imports used
- [ ] No unnecessary re-renders (check React DevTools)
- [ ] Images optimized
- [ ] No console errors or warnings

### ✅ Documentation

- [ ] Complex components have JSDoc comments
- [ ] Custom props documented
- [ ] Usage examples provided

### ✅ Testing

- [ ] Component renders without errors
- [ ] Interactive elements work correctly
- [ ] Edge cases handled (loading, empty, error states)
- [ ] Form validation works

---

## Quick Reference

### 📦 Installation

```bash
npm i @heroui/styles@alpha @heroui/react@alpha
```

### 📄 Import Styles (index.css)

```css
@import "tailwindcss";
@import "@heroui/styles"; /* Must come after tailwindcss */
```

### 🧩 Component Template

```tsx
'use client';

import { useState } from 'react';
import { Button, TextField } from '@heroui/react'; // Direct import!
import type { PressEvent } from '@react-types/shared';

interface MyComponentProps {
  onSubmit: (data: FormData) => void;
}

export function MyComponent({ onSubmit }: MyComponentProps) {
  const [value, setValue] = useState('');

  const handlePress = (e: PressEvent) => {
    // Handle action
  };

  return (
    <div className="space-y-4">
      <TextField>
        <TextField.Label>Label</TextField.Label>
        <TextField.Input
          value={value}
          onChange={setValue}
          placeholder="Enter value"
        />
      </TextField>

      <Button variant="primary" onPress={handlePress}>
        Submit
      </Button>
    </div>
  );
}
```

### 🎯 Common Patterns

**Button with Icon:**

```tsx
// See: https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components/button
<Button variant="primary">
  <Icon icon="gravity-ui:check" className="mr-2" />
  Submit
</Button>
```

**Loading Button:**

```tsx
<Button isDisabled={isLoading}>
  {isLoading ? <Spinner size="sm" className="mr-2" /> : 'Submit'}
</Button>
```

**Icon-only Button:**

```tsx
<Button isIconOnly aria-label="Close">
  <Icon icon="gravity-ui:xmark" />
</Button>
```

**Form with Validation:**

```tsx
// See: https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components/text-field
<TextField isInvalid={!!error}>
  <TextField.Label>Email</TextField.Label>
  <TextField.Input type="email" />
  {error && <TextField.Error>{error}</TextField.Error>}
</TextField>
```

---

## 🆘 Getting Help

1. **Check Reference Documents** (linked above)
2. **Search** [Official Documentation](https://v3.heroui.com/)
3. **Review** [Storybook Examples](https://storybook.heroui.com)
4. **Ask** in project Discord/Slack
5. **Report** bugs on GitHub

---

## 📚 Additional Resources

- **Documentation:** <https://v3.heroui.com/>
- **Storybook:** <https://storybook.heroui.com>
- **GitHub:** <https://github.com/heroui-inc/heroui>
- **Component Source (React):** <https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components>
- **Component Styles (CSS):** <https://github.com/heroui-inc/heroui/tree/v3/packages/styles/components>
- **Tailwind v4:** <https://tailwindcss.com/docs>
- **React Aria:** <https://react-spectrum.adobe.com/react-aria/>

---

> **Remember:** HeroUI v3 is fundamentally different from v2. Always use compound components, semantic variants, and composition patterns. **NEVER create wrapper components** - import directly from `@heroui/react`. When in doubt, check Rule #0 and consult the reference documents.
