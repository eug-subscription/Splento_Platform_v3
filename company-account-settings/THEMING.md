# HeroUI v3 Theming Guide

## Overview

This project uses HeroUI v3's theming system with complete light and dark mode support. The implementation follows the official HeroUI v3 documentation exactly.

**Reference:** <https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/handbook/theming.mdx>

---

## Quick Start

### Current Theme

The application defaults to **light theme**. The theme is set in `index.html`:

```html
<html lang="en" class="light" data-theme="light">
```

### Switch Themes Programmatically

```javascript
// Switch to dark theme
document.documentElement.className = 'dark';
document.documentElement.setAttribute('data-theme', 'dark');

// Switch to light theme
document.documentElement.className = 'light';
document.documentElement.setAttribute('data-theme', 'light');
```

---

## Available Themes

### Light Theme (Default)

- Clean, bright interface
- High contrast for readability
- Subtle shadows
- Default for all users

### Dark Theme

- Dark, comfortable interface
- Reduced eye strain
- Brighter accent colors for visibility
- Perfect for low-light environments

---

## Theme Variables

### Base Colors

```css
--background      /* Page background */
--foreground      /* Primary text color */
--surface         /* Component backgrounds (cards, etc.) */
--overlay         /* Floating components (modals, dropdowns) */
--border          /* Border color */
--separator       /* Divider lines */
```

### Semantic Colors

```css
--accent          /* Primary brand color (blue) */
--success         /* Success states (green) */
--warning         /* Warning states (yellow) */
--danger          /* Error/danger states (red) */
--default         /* Neutral/default (gray) */
```

### Each semantic color has a `-foreground` variant for text

```css
--accent-foreground        /* Text on accent background */
--success-foreground       /* Text on success background */
--warning-foreground       /* Text on warning background */
--danger-foreground        /* Text on danger background */
```

### Form Field Tokens

```css
--field-background         /* Input backgrounds */
--field-foreground         /* Input text color */
--field-placeholder        /* Placeholder text */
--field-border             /* Input borders */
--field-radius             /* Input border radius */
```

---

## Using Theme Colors in Components

### With Tailwind Classes

```tsx
// Background and text
<div className="bg-background text-foreground">

// Surface (cards, panels)
<div className="bg-surface text-surface-foreground">

// Accent (primary actions)
<Button className="bg-accent text-accent-foreground">

// Semantic colors
<div className="bg-success text-success-foreground">
<div className="bg-warning text-warning-foreground">
<div className="bg-danger text-danger-foreground">
```

### With CSS Variables

```css
.custom-component {
  background: var(--surface);
  color: var(--surface-foreground);
  border: 1px solid var(--border);
}
```

---

## BEM Component Classes

### Button

```tsx
<button className="button button--large">Large Button</button>
<button className="button button--small">Small Button</button>
```

### Card

```tsx
<div className="card">
  <div className="card__header">Header</div>
  <div className="card__body">Content</div>
  <div className="card__footer">Footer</div>
</div>
```

### Modal

```tsx
<div className="modal__overlay">
  <div className="modal__dialog modal__dialog--large">
    {/* Modal content */}
  </div>
</div>
```

### Select

```tsx
<select className="select-trigger">
  {/* Options */}
</select>
```

### Form Field

```tsx
<input className="field" />
```

### Badge

```tsx
<span className="badge badge--accent">New</span>
<span className="badge badge--success">Active</span>
<span className="badge badge--warning">Pending</span>
<span className="badge badge--danger">Error</span>
```

---

## Customizing Colors

### Override Existing Colors

In `index.css`:

```css
:root, [data-theme="light"] {
  /* Override accent color to purple */
  --accent: oklch(0.550 0.220 290);
  --accent-foreground: oklch(0.99 0 0);
}

.dark, [data-theme="dark"] {
  /* Brighter purple for dark mode */
  --accent: oklch(0.650 0.200 290);
  --accent-foreground: oklch(0.10 0 0);
}
```

### Add Custom Colors

```css
/* Define custom color */
:root {
  --info: oklch(0.6 0.15 210);
  --info-foreground: oklch(0.98 0 0);
}

/* Make it available to Tailwind */
@theme inline {
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}
```

Use it:

```tsx
<div className="bg-info text-info-foreground">Info message</div>
```

---

## oklch Color Format

All colors use the `oklch` color space:

```css
oklch(lightness chroma hue)
```

- **Lightness:** 0-1 (0 = black, 1 = white)
- **Chroma:** 0-0.4 (saturation, 0 = gray)
- **Hue:** 0-360 (color angle)

**Examples:**

```css
--blue: oklch(0.550 0.220 262);    /* Medium blue */
--green: oklch(0.730 0.194 151);   /* Success green */
--red: oklch(0.653 0.233 26);      /* Danger red */
```

**Why oklch?**

- Perceptually uniform (consistent brightness)
- Better color mixing
- Smoother transitions
- Better accessibility

---

## Creating a Custom Theme

Create `themes/custom.css`:

```css
@layer theme {
  [data-theme="custom"] {
    color-scheme: light;
    
    /* Define all theme variables */
    --background: oklch(0.99 0 0);
    --foreground: oklch(0.21 0.006 286);
    --accent: oklch(0.550 0.220 340);  /* Custom pink accent */
    --accent-foreground: oklch(0.99 0 0);
    
    /* ... all other variables ... */
  }
  
  [data-theme="custom-dark"] {
    color-scheme: dark;
    /* Dark variant... */
  }
}
```

Import in `index.css`:

```css
@import "./themes/custom.css" layer(theme);
```

Apply theme:

```html
<html data-theme="custom">
```

---

## Automatic Hover States

Hover states are automatically calculated using `color-mix()`:

```css
@theme inline {
  /* Automatically lighter on hover */
  --color-accent-hover: color-mix(
    in oklab,
    var(--color-accent) 90%,
    var(--color-accent-foreground) 10%
  );
}
```

No need to manually define hover colors!

---

## Transitions

Theme switches include smooth transitions:

```css
body {
  transition: background-color 200ms ease, color 200ms ease;
}
```

All theme-aware components fade smoothly when switching themes.

---

## Theme Persistence (Future)

To save user's theme preference:

```tsx
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.className = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};
```

---

## System Preference Detection (Future)

Respect user's OS theme preference:

```tsx
useEffect(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  document.documentElement.className = initialTheme;
  document.documentElement.setAttribute('data-theme', initialTheme);
  setTheme(initialTheme);
}, []);
```

---

## All Available CSS Variables

### Colors

- `--white`, `--black`, `--snow`, `--eclipse`
- `--background`, `--foreground`
- `--surface`, `--surface-foreground`
- `--overlay`, `--overlay-foreground`
- `--default`, `--default-foreground`
- `--accent`, `--accent-foreground`
- `--success`, `--success-foreground`
- `--warning`, `--warning-foreground`
- `--danger`, `--danger-foreground`
- `--muted`, `--border`, `--separator`
- `--focus`, `--link`

### Form Fields

- `--field-background`, `--field-foreground`
- `--field-placeholder`, `--field-border`
- `--field-radius`, `--field-border-width`

### Layout

- `--spacing`: Base spacing unit (0.25rem)
- `--border-width`: Default border (1px)
- `--disabled-opacity`: 0.5
- `--ring-offset-width`: 2px

### Radius

- `--radius`: Base radius (0.75rem)
- `--radius-sm`: Small (0.5rem)
- `--radius-md`: Medium (0.75rem)
- `--radius-lg`: Large (1rem)
- `--radius-xl`: Extra large (1.25rem)

### Shadows

- `--surface-shadow`: Card shadows
- `--overlay-shadow`: Modal/dropdown shadows
- `--field-shadow`: Input shadows

### Animation

- `--skeleton-animation`: shimmer | pulse | none

---

## Tips & Best Practices

### 1. Always Use Semantic Colors

❌ **Don't:**

```tsx
<Button className="bg-blue-500 text-white">
```

✅ **Do:**

```tsx
<Button className="bg-accent text-accent-foreground">
```

### 2. Use Foreground Pairs

❌ **Don't:**

```tsx
<div className="bg-accent text-white">
```

✅ **Do:**

```tsx
<div className="bg-accent text-accent-foreground">
```

### 3. Test Both Themes

Always verify components in both light and dark modes.

### 4. Use BEM Classes for Consistency

✅ **Do:**

```tsx
<button className="button button--large">
```

### 5. Leverage Calculated Variables

The system auto-generates hover states - don't define them manually.

---

## Troubleshooting

### Theme Not Switching

**Check:**

1. `<html>` has correct `class` and `data-theme`
2. Both attributes are being updated
3. CSS is properly loaded

### Colors Look Wrong

**Check:**

1. Using `bg-{color}` and `text-{color}-foreground` pairs
2. Theme variables are defined in both light and dark

### Visual Glitches When Switching

**Add transitions:**

```css
.your-component {
  transition: background-color 200ms ease, color 200ms ease;
}
```

---

## Resources

- **Official HeroUI v3 Theming Docs:** <https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/handbook/theming.mdx>
- **Tailwind CSS v4 Theme:** <https://tailwindcss.com/docs/theme>
- **oklch Color Picker:** <https://oklch.com/>
- **BEM Methodology:** <https://getbem.com/>

---

## Summary

- ✅ Complete light/dark theme system
- ✅ 70+ theme variables
- ✅ oklch color space for smooth transitions
- ✅ Automatic hover state generation
- ✅ BEM component customizations
- ✅ Instant theme switching
- ✅ Follows HeroUI v3 best practices exactly
