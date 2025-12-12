# Splento Design System

## Quick Reference

| Token | Variable | Value |
|-------|----------|-------|
| **Primary** | `--splento-cyan` | `#2EDBE3` |
| **Canvas** | `--canvas` | `#F8F9FA` |
| **Midnight** | `--midnight` | `#0D1117` |

---

## Brand Identity

### Core Colours

The Splento identity is built on a foundation of electric energy and premium simplicity.

| Colour | Hex | Role |
|-------|-----|------|
| **Splento Cyan** | `#2EDBE3` | Primary Brand |
| **Canvas** | `#F8F9FA` | Light Background |
| **Midnight** | `#0D1117` | Dark Background |

### CSS Variables (Copy-Paste Ready)

```css
:root {
  /* Font */
  --font-sans: 'Libre Franklin', ui-sans-serif, system-ui, sans-serif;

  /* Core Brand */
  --splento-cyan: oklch(0.82 0.15 192);
  --canvas: oklch(0.98 0.002 264);
  --midnight: oklch(0.17 0.02 265);
  --snow: oklch(0.9911 0 0); /* #FCFCFC approx */
  --surface: oklch(1 0 0); /* #FFFFFF */
  
  /* Cyan Scale */
  --cyan-50: oklch(0.97 0.03 192);
  --cyan-100: oklch(0.94 0.06 192);
  --cyan-200: oklch(0.88 0.10 192);
  --cyan-300: oklch(0.84 0.13 192);
  --cyan-400: oklch(0.82 0.14 192);
  --cyan-500: oklch(0.82 0.15 192); /* Base */
  --cyan-600: oklch(0.62 0.13 200);
  --cyan-700: oklch(0.53 0.11 200);
  --cyan-800: oklch(0.45 0.09 200);
  --cyan-900: oklch(0.40 0.07 200);
  --cyan-950: oklch(0.30 0.06 200);

  /* Semantic Tokens */
  --success: oklch(0.7329 0.1935 150.81);
  --warning: oklch(0.7819 0.1585 72.33);
  --danger: oklch(0.6532 0.2328 25.74);
  --info: oklch(0.59 0.15 250);

  /* Accents */
  --coral: oklch(0.68 0.19 20);
  --peach: oklch(0.82 0.11 55);
  --sunset: oklch(0.72 0.16 45);
  --electric-blue: oklch(0.48 0.2 265);
  --mint: oklch(0.85 0.13 165);
  --lavender: oklch(0.71 0.15 295);

  /* Semantic Foregrounds */
  --success-foreground: oklch(1 0 0);
  --warning-foreground: oklch(0 0 0);
  --danger-foreground: oklch(1 0 0);
  --info-foreground: oklch(1 0 0);

  /* Neutrals (Grey Scale) */
  --grey-50: oklch(0.985 0.002 247.839);
  --grey-100: oklch(0.967 0.003 264.542);
  --grey-200: oklch(0.92 0.004 264.542);
  --grey-300: oklch(0.871 0.006 264.542);
  --grey-400: oklch(0.705 0.015 286.067);
  --grey-500: oklch(0.552 0.016 285.938);
  --grey-600: oklch(0.442 0.017 285.786);
  --grey-700: oklch(0.37 0.013 285.805);
  --grey-800: oklch(0.274 0.006 286.033);
  --grey-900: oklch(0.21 0.006 285.885);
  --grey-950: oklch(0.14 0.005 285.823);

  /* Base Defaults */
  --background: var(--canvas);
  --foreground: var(--grey-900);
  --border: var(--grey-200);
}

/* Dark Mode Overrides */
[data-theme="dark"] {
  --background: var(--midnight);
  --foreground: var(--snow);
  --surface: oklch(0.23 0.02 250); /* #161B22 */
  --border: var(--grey-700);

  /* Semantic Overrides */
  --success: oklch(0.79 0.17 162);
  --warning: oklch(0.85 0.145 85);
  --danger: oklch(0.71 0.19 25);
  --info: oklch(0.69 0.15 250);
}
```

> **Note:** CSS variables use `oklch()` colour space for better manipulation and consistent contrast. Hex values are shown for reference and design tools (Figma, Sketch).

### Accent Palette

Used sparingly to provide character and semantic meaning beyond the core set.

| Name | Hex | Variable | Character/Usage |
|------|-----|----------|----------------|
| **Coral** | `#FF6B6B` | `--coral` | Energy, urgency |
| **Peach** | `#FFBE98` | `--peach` | Warm, friendly |
| **Sunset** | `#FF8C42` | `--sunset` | Vibrant, creative |
| **Electric Blue** | `#4F46E5` | `--electric-blue` | Tech, AI features |
| **Mint** | `#6EE7B7` | `--mint` | Fresh, growth |
| **Lavender** | `#A78BFA` | `--lavender` | Premium, unique |

---

## Colour Tokens

### 1. Cyan Scale (Primary)

Our primary brand scale.

| Step | Hex | Variable | Usage |
|------|-----|----------|-------|
| 50 | `#ECFEFF` | `--cyan-50` | Light backgrounds |
| 100 | `#CFFAFE` | `--cyan-100` | Tint |
| 200 | `#A5F3FC` | `--cyan-200` | Tint |
| 300 | `#67E8F9` | `--cyan-300` | Tint |
| 400 | `#22D3EE` | `--cyan-400` | Tint |
| **500** | **`#2EDBE3`** | **`--cyan-500`** | **Base Primary** |
| 600 | `#0891B2` | `--cyan-600` | Shade |
| 700 | `#0E7490` | `--cyan-700` | Shade |
| 800 | `#155E75` | `--cyan-800` | Shade |
| 900 | `#164E63` | `--cyan-900` | Shade |
| 950 | `#083344` | `--cyan-950` | Deepest shade |

### 2. Semantic Colours

Functional colours for user feedback. Always use with their corresponding `-foreground` token.

| Role | Variable | Hex (Light / Dark) | When to Use | Foreground Token (Value) |
|------|----------|--------------------|-------------|--------------------------|
| **Success** | `--success` | `#10B981` / `#34D399` | Form submission, success | `--success-foreground` (#FFFFFF) |
| **Warning** | `--warning` | `#F59E0B` / `#FBBF24` | Validation, alerts | `--warning-foreground` (#000000) |
| **Danger** | `--danger` | `#EF4444` / `#F87171` | Errors, destructive | `--danger-foreground` (#FFFFFF) |
| **Info** | `--info` | `#3B82F6` / `#60A5FA` | Messages, help text | `--info-foreground` (#FFFFFF) |

### 3. Neutral Greys

A neutral scale for text, borders, and surfaces.

> **Note:** We use British English spelling (`grey`) for neutral colour tokens to match our custom Tailwind configuration.

| Step | Hex | Variable |
|------|-----|----------|
| 50 | `#F9FAFB` | `--grey-50` |
| 100 | `#F3F4F6` | `--grey-100` |
| 200 | `#E5E7EB` | `--grey-200` |
| 300 | `#D1D5DB` | `--grey-300` |
| 400 | `#9CA3AF` | `--grey-400` |
| 500 | `#6B7280` | `--grey-500` |
| 600 | `#4B5563` | `--grey-600` |
| 700 | `#374151` | `--grey-700` |
| 800 | `#1F2937` | `--grey-800` |
| 900 | `#111827` | `--grey-900` |
| 950 | `#030712` | `--grey-950` |

### 4. Data Visualisation

A distinct palette of 8 colours designed for charts and graphs.

1. **Cyan** (`#2EDBE3`)
2. **Blue** (`#4F46E5`)
3. **Green** (`#10B981`)
4. **Amber** (`#F59E0B`)
5. **Red** (`#EF4444`)
6. **Purple** (`#A78BFA`)
7. **Orange** (`#FF8C42`)
8. **Mint** (`#6EE7B7`)

> **Note:** Data visualisation colours do not have CSS variables. Use Hex values directly for charting libraries.

---

## Typography

### Font Family

**Libre Franklin** is our primary typeface. It is a versatile sans-serif inspired by classic American gothics.

variable: `--font-sans`

### Type Scale

| Name | Size | Weight | Line Height | Tracking | Usage |
|------|------|--------|-------------|----------|-------|
| **Display XL** | 4.5rem | 700 (Bold) | 1.0 | -0.02em | Hero headlines |
| **Display LG** | 3.75rem | 700 (Bold) | 1.0 | -0.02em | Page titles |
| **Display MD** | 3rem | 700 (Bold) | 1.1 | -0.015em | Section headers |
| **Display SM** | 2.25rem | 600 (Semi) | 1.15 | -0.01em | Card titles |
| **Heading XL** | 1.875rem | 600 (Semi) | 1.2 | -0.01em | Major headings |
| **Heading LG** | 1.5rem | 600 (Semi) | 1.25 | -0.005em | Subheadings |
| **Heading MD** | 1.25rem | 600 (Semi) | 1.3 | 0 | Component titles |
| **Heading SM** | 1.125rem | 500 (Med) | 1.4 | 0 | Small headers |
| **Body LG** | 1.125rem | 400 (Reg) | 1.6 | 0 | Lead paragraphs |
| **Body MD** | 1rem | 400 (Reg) | 1.6 | 0 | Default body text |
| **Body SM** | 0.875rem | 400 (Reg) | 1.5 | 0 | Secondary text |
| **Caption** | 0.75rem | 400 (Reg) | 1.4 | 0.01em | Labels, hints |
| **Overline** | 0.75rem | 500 (Med) | 1.4 | 0.08em | Category labels (uppercase) |

### Guidelines

* **Leading**: Tight (1.0-1.2) for Large Display, Relaxed (1.5-1.6) for Body.
* **Tracking**: Negative (`-0.02em`) for Display, Positive (`0.08em`) for Overline.
* **Weights**: Use `Regular (400)` for body, `Medium (500)` for UI, `Semibold (600)` for headings.

---

## Gradients

Use these named gradients for high-impact areas.

| Name | CSS Value | Usage |
|------|-----------|-------|
| **Cyan Flow** | `linear-gradient(135deg, #2EDBE3 0%, #0891B2 100%)` | Hero sections |
| **Ocean Depth** | `linear-gradient(135deg, #2EDBE3 0%, #4F46E5 100%)` | AI features |
| **Aurora** | `linear-gradient(135deg, #2EDBE3 0%, #A78BFA 50%, #F472B6 100%)` | Creative |
| **Sunrise** | `linear-gradient(135deg, #FF8C42 0%, #FF6B6B 100%)` | Promotions |
| **Mint Fresh** | `linear-gradient(135deg, #6EE7B7 0%, #2EDBE3 100%)` | Success |
| **Electric Night** | `linear-gradient(135deg, #4F46E5 0%, #2EDBE3 50%, #6EE7B7 100%)` | Dark hero |

---

## Accessibility & Contrast

We strictly adhere to WCAG 2.1 AA standards.

| Context | Comparison | Ratio | Status |
|---------|------------|-------|--------|
| **Light Mode** | Canvas (`#F8F9FA`) vs Midnight | **18.1:1** | ✅ Pass (AAA) |
| **Dark Mode** | Midnight (`#0D1117`) vs Snow | **17.4:1** | ✅ Pass (AAA) |
| **Brand** | Splento Cyan (`#2EDBE3`) vs Cyan-950 | **7.2:1** | ✅ Pass (AA) |

---

## Component Usage

We use **HeroUI v3** (@heroui/react). Always import components directly and use the compound component pattern.

### Patterns

**✅ DO:** Use compound components and Semantic props.

```tsx
import { Card, Button } from "@heroui/react";

export function UserProfile() {
  return (
    <Card className="p-4">
      <Card.Header>
        <h3 className="text-lg font-bold">Jane Doe</h3>
      </Card.Header>
      <Card.Content>
        <p className="text-grey-500">Product Designer</p>
      </Card.Content>
      <Card.Footer>
        <Button variant="primary" onPress={() => console.log('edit')}>
          Edit Profile
        </Button>
      </Card.Footer>
    </Card>
  );
}
```

**❌ DON'T:** Create wrapper components or hardcode styles.

```tsx
// Avoid this!
export function MyCard({ title, children }) {
  return (
     // Don't hardcode hex values or map standard props to custom ones
    <div style={{ background: '#FFF', borderRadius: '8px' }}>
      <b>{title}</b>
      {children}
    </div>
  );
}
```

### When NOT to use

* **DON'T** use Gradients on small text or buttons (readability issues).
* **DON'T** mix `grey-` scales with Semantic colors (e.g. don't use `grey-500` for disabled states, use `opacity` or specific disabled tokens).
* **DON'T** use **Splento Cyan** for body text (it's too bright; use Ocean Depth or Midnight).

---

## Dark Mode Implementation

We use HeroUI v3's theming engine with CSS variables and `oklch` color space.

### Key Mappings

| Variable | Light Theme | Dark Theme |
|----------|-------------|------------|
| `--background` | `--canvas` (#F8F9FA) | `--midnight` (#0D1117) |
| `--foreground` | `--grey-900` | `--snow` (Off-white) |
| `--surface` | `#FFFFFF` | `#161B22` |
| `--border` | `--grey-200` | `--grey-700` |

### Switching Themes

The design system supports instant switching. Use the `ThemeSwitcher` component or toggles in the header.

```tsx
// Force dark mode
<html class="dark" data-theme="dark">
```

---

## Tailwind Class Mapping

For AI Assistants and Developers:

| Design Token | Tailwind Class | Usage |
|--------------|----------------|-------|
| `--splento-cyan` | `bg-accent`, `text-accent` | Primary actions |
| `--canvas` | `bg-background` | Page background (light) |
| `--midnight` | `bg-background` | Page background (dark) |
| `--grey-500` | `text-muted` | Secondary text |
| `--success` | `bg-success`, `text-success` | Success states |
| `--danger` | `bg-danger`, `text-danger` | Error states |

---

## Interactive Reference

This documentation is static. For the **Living Design System**, run the application locally and visit:

### **[Design System Hub](/#design-hub)**

*(Route: `/#design-hub` - Uses Hash Routing)*

This hub contains:

* Live colour copying
* Interactive typography tester
* Component previews in Light/Dark mode
* Accessibility contrast checks
