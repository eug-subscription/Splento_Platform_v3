# Contributing to Company Account Settings

Thank you for contributing to the Splento Platform v3 Company Account Settings project! This guide will help you understand our development patterns and best practices.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Component Development](#component-development)
- [Styling Guidelines](#styling-guidelines)
- [TypeScript Guidelines](#typescript-guidelines)
- [Accessibility Requirements](#accessibility-requirements)
- [Testing Requirements](#testing-requirements)
- [Code Review Checklist](#code-review-checklist)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Familiarity with React, TypeScript, and Tailwind CSS
- Understanding of HeroUI v3 (review [official docs](https://v3.heroui.com))

### Setup

```bash
# Clone repository
git clone <repo-url>
cd company-account-settings

# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

---

## 🎯 Development Guidelines

### HeroUI v3 Core Principles

Follow these 10 principles in all development:

1. **Semantic Intent Over Visual Style**
   - Use `variant="primary"` not `className="bg-blue-500"`
   - Choose variants based on action intent, not appearance

2. **Accessibility as Foundation**
   - All components must be keyboard accessible
   - Add `aria-label` to icon-only buttons
   - Test with screen readers

3. **Composition Over Configuration**
   - Build complex UIs from small, composable components
   - Prefer dot notation (e.g., `Modal.Header`)

4. **Progressive Disclosure**
   - Simple by default, powerful when needed
   - Common use cases should be easy

5. **Predictable Behavior**
   - Consistent API across components
   - Use standard React patterns

6. **Type Safety First**
   - No `any` types (use `unknown` if needed)
   - Proper type inference
   - Use type aliases, not empty interfaces

7. **Separation of Styles and Logic**
   - Styles in `@layer components` in CSS
   - Logic in component files
   - No inline Tailwind classes in wrapper components

8. **Developer Experience Excellence**
   - Clear, descriptive prop names
   - Good TypeScript autocomplete
   - Helpful error messages

9. **Complete Customization**
   - Use CSS variables for theming
   - Support light/dark modes
   - Document customization points

10. **Open and Extensible**
    - Components should be composable
    - Allow prop forwarding
    - Use dot notation for sub-components

---

## 🧩 Component Development

### UI Component Wrapper Pattern

All HeroUI components should follow this pattern:

```tsx
// src/components/ui/example.tsx
import { Example as HExample, type ExampleProps as HExampleProps } from "@heroui/react";

// ✅ Use type alias (not interface)
export type ExampleProps = HExampleProps;

export function Example(props: ExampleProps) {
  return <HExample {...props} />;
}

// Add sub-components using dot notation
Example.SubComponent = HExample.SubComponent;
Example.AnotherSub = HExample.AnotherSub;
```

**Why this pattern?**

- ✅ Consistent import paths across the app
- ✅ Easy to add global customizations later
- ✅ Maintains full TypeScript support
- ✅ Allows project-specific props if needed

### Feature Component Pattern

Domain-specific components in `components/admin/`:

```tsx
// src/components/admin/RoleSelect.tsx
import { Select, ListBox } from '../ui/select';

export interface RoleSelectProps {
  role: 'Admin' | 'Edit' | 'Read Only';
  onChange: (role: 'Admin' | 'Edit' | 'Read Only') => void;
}

export function RoleSelect({ role, onChange }: RoleSelectProps) {
  return (
    <Select
      selectedKey={role}
      onSelectionChange={(key) => onChange(key as RoleSelectProps['role'])}
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="Admin">Admin</ListBox.Item>
          <ListBox.Item id="Edit">Edit</ListBox.Item>
          <ListBox.Item id="Read Only">Read Only</ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
```

### Dot Notation Exports

**Standard Pattern:**

```tsx
export function Component(props) {
  return <HComponent {...props} />;
}

// Use dot notation for sub-components
Component.Header = HComponent.Header;
Component.Body = HComponent.Body;
Component.Footer = HComponent.Footer;
```

**Do NOT mix patterns:**

```tsx
// ❌ Bad - Mixed pattern
export const Component = {
  Root: (props) => <HComponent {...props} />,
  Header: HComponent.Header, // Don't mix
};

// ✅ Good - Consistent dot notation
export function Component(props) {
  return <HComponent {...props} />;
}
Component.Header = HComponent.Header;
```

---

## 🎨 Styling Guidelines

### CSS Layer Structure

```css
/* src/index.css */

/* 1. Import dependencies */
@import "tailwindcss";
@import "@heroui/react/styles";

/* 2. Define theme variables */
@layer theme {
  :root, [data-theme="light"] {
    --accent: oklch(...);
    /* ... */
  }
  
  .dark, [data-theme="dark"] {
    --accent: oklch(...);
    /* ... */
  }
}

/* 3. Map to Tailwind */
@theme inline {
  --color-accent: var(--accent);
  /* ... */
}

/* 4. Component customizations */
@layer components {
  .button {
    @apply font-medium;
  }
  
  .select-trigger {
    @apply bg-field shadow-field;
  }
}
```

### Theme Variable Usage

**Use semantic CSS variables:**

```tsx
// ✅ Good - Semantic variables
<div className="bg-surface text-surface-foreground">

// ✅ Good - Theme-aware
<button className="bg-accent text-accent-foreground">

// ❌ Avoid - Hard-coded colors
<div style={{ backgroundColor: '#006FEE' }}>

// ❌ Avoid - Direct Tailwind colors
<div className="bg-blue-500">
```

### oklch Color Format

All theme colors use `oklch`:

```css
/* Format: oklch(lightness chroma hue) */
--accent: oklch(0.550 0.220 262);
/*        ^      ^      ^
          |      |      └─ Hue (0-360)
          |      └─ Chroma (0-0.4)
          └─ Lightness (0-1)
*/
```

**Why oklch?**

- Perceptually uniform
- Better color mixing
- Smooth gradients
- Predictable contrast

---

## 📘 TypeScript Guidelines

### Type Safety Rules

1. **Never use `any`**

```tsx
// ❌ Bad
function handleClick(event: any) { }

// ✅ Good
function handleClick(event: React.MouseEvent<HTMLButtonElement>) { }
```

2. **Use type aliases for props**

```tsx
// ❌ Bad - Empty interface
export interface ButtonProps extends HButtonProps { }

// ✅ Good - Type alias
export type ButtonProps = HButtonProps;

// ✅ Good - Extended type
export type ButtonProps = HButtonProps & {
  customProp?: string;
};
```

3. **Proper type imports**

```tsx
// ✅ Use 'type' keyword for type-only imports
import type { ButtonProps } from './button';
import { Button } from './button';
```

4. **Generic component types**

```tsx
// ✅ Maintain generics from HeroUI
export type SelectProps<T extends object = object> = HSelectProps<T>;

export function Select<T extends object>(props: SelectProps<T>) {
  return <HSelect {...props} />;
}
```

---

## ♿ Accessibility Requirements

### Mandatory Requirements

All components MUST:

1. **Be keyboard accessible**
   - Tab navigation works
   - Enter/Space activates
   - Escape closes modals

2. **Have proper ARIA attributes**

```tsx
// ✅ Icon-only button
<Button variant="ghost" aria-label="Delete manager">
  <Icon icon="trash" />
</Button>

// ✅ Form field
<TextField>
  <Label>Email Address</Label>
  <Input type="email" />
  <FieldError>Invalid email</FieldError>
</TextField>
```

3. **Support screen readers**
   - Meaningful labels
   - Announced state changes
   - Logical heading structure

4. **Meet WCAG AA contrast**
   - Text: 4.5:1 minimum
   - Large text: 3:1 minimum
   - Use theme variables (auto-compliant)

### Testing Checklist

- [ ] Tab through all interactive elements
- [ ] Test Enter/Space on buttons
- [ ] Test Escape on modals
- [ ] Verify focus indicators visible
- [ ] Check with browser accessibility inspector
- [ ] Test color contrast (DevTools)

---

## 🧪 Testing Requirements

### Before Committing

```bash
# 1. Lint check
npm run lint

# 2. Build verification
npm run build

# 3. Manual testing
npm run dev
```

### Manual Testing Checklist

- [ ] Component renders correctly
- [ ] All props work as expected
- [ ] Keyboard navigation functional
- [ ] Works in light and dark themes
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors/warnings

### Component Testing

When adding a new component:

1. **Test all props** - Verify each prop works
2. **Test variants** - If applicable (primary, secondary, etc.)
3. **Test states** - Hover, focus, active, disabled
4. **Test themes** - Light and dark modes
5. **Test responsiveness** - Mobile, tablet, desktop
6. **Test keyboard** - Tab, Enter, Escape, Arrow keys

---

## 📋 Code Review Checklist

### General

- [ ] Code follows HeroUI v3 principles
- [ ] TypeScript types are correct (no `any`)
- [ ] Linter passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)

### Components

- [ ] Uses dot notation for exports
- [ ] Props use type aliases (not interfaces)
- [ ] Semantic variants used (not visual)
- [ ] Wrapper components forward all props

### Styling

- [ ] Styles in `@layer components` (not inline)
- [ ] Uses theme variables (not hard-coded colors)
- [ ] Works in both light and dark themes
- [ ] Responsive design implemented

### Accessibility

- [ ] Icon-only buttons have `aria-label`
- [ ] Form fields have labels
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] WCAG AA contrast met

### Documentation

- [ ] Complex logic has comments
- [ ] Public APIs documented
- [ ] README updated if needed
- [ ] THEMING.md updated if new variables

---

## 🎨 Semantic Variant Guidelines

### Button Variants

Use variants based on **action intent**:

| Variant | When to Use | Examples |
|---------|-------------|----------|
| `primary` | Main action | Save, Submit, Confirm, Create |
| `secondary` | Secondary action | Cancel, Back, Close |
| `tertiary` | Subtle action | Skip, Maybe Later, Learn More |
| `danger` | Destructive action | Delete, Remove, Revoke |
| `ghost` | Minimal emphasis | Icon buttons, less important actions |

```tsx
// ✅ Good - Semantic intent
<Button variant="primary" onPress={handleSave}>Save</Button>
<Button variant="danger" onPress={handleDelete}>Delete</Button>
<Button variant="secondary" onPress={handleCancel}>Cancel</Button>

// ❌ Bad - Visual description
<Button className="bg-blue-500">Save</Button>
<Button className="bg-red-500">Delete</Button>
```

### Color Semantics

| Color | Meaning | Usage |
|-------|---------|-------|
| `accent` | Primary brand | Main actions, links, highlights |
| `success` | Positive outcome | Success messages, completed states |
| `warning` | Caution | Warnings, potential issues |
| `danger` | Negative/destructive | Errors, delete actions |
| `default` | Neutral | Default states, secondary info |

---

## 📝 Git Workflow

### Commit Messages

Follow conventional commits:

```
feat: add theme switcher component
fix: resolve select dropdown focus issue
docs: update theming guide
style: fix button alignment
refactor: simplify modal structure
test: add keyboard navigation tests
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Code follows style guidelines
- [ ] TypeScript types are correct
- [ ] Linter passes
- [ ] Build succeeds
- [ ] Tested light/dark themes
- [ ] Tested keyboard navigation
- [ ] Updated documentation
```

---

## 🆘 Getting Help

**Questions about:**

- **HeroUI v3:** Check [official docs](https://v3.heroui.com)
- **Theming:** See [THEMING.md](./THEMING.md)
- **Architecture:** See [README.md](./README.md)
- **Code Review:** See [HEROUI_V3_CODE_REVIEW.md](../HEROUI_V3_CODE_REVIEW.md)

---

## 📚 Resources

- [HeroUI v3 Documentation](https://v3.heroui.com)
- [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/)
- [Tailwind CSS v4](https://tailwindcss.com)
- [TypeScript Handbook](<https://typescript> lang.org/docs/handbook/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [oklch Color Picker](https://oklch.com/)

---

Thank you for contributing! 🎉
