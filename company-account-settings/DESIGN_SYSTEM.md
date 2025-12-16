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
| **Snow** | `#FCFCFC` | Dark Foreground |

### Primitive Colours

Foundational colour values that never change between themes.

| Colour | Hex | Variable | Usage |
|--------|-----|----------|-------|
| **White** | `#FFFFFF` | `--white` | Pure white, surfaces |
| **Black** | `#000000` | `--black` | Pure black |
| **Eclipse** | `#1F2328` | `--eclipse` | Dark grey, light mode foreground |

### Surface & Overlay Tokens

Used for layered UI components.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--surface` | `#FFFFFF` | `#1F2328` | Card, panel backgrounds |
| `--surface-foreground` | `--foreground` | `--foreground` | Text on surfaces |
| `--overlay` | `#FFFFFF` | `oklch(0.22..)` | Modal, dropdown backgrounds |
| `--overlay-foreground` | `--foreground` | `--foreground` | Text on overlays |

### Utility Colours

For muted states, defaults, and UI chrome.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--muted` | `#6B7280` | `#9CA3AF` | Muted UI elements |
| `--muted-foreground` | `#4B5563` | `#A3A3A3` | Secondary text |
| `--default` | `#F0F0F1` | `#1F2937` | Neutral button/chip bg |
| `--default-foreground` | `--eclipse` | `--snow` | Text on default |
| `--scrollbar` | `#D1D5DB` | `#374151` | Scrollbar colour |

### AI/Premium Accent

A distinct purple accent for AI-powered and premium features.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--accent-ai` | `#7C3AED` | `#8B5CF6` | AI feature highlights |
| `--accent-ai-foreground` | `--snow` | `--eclipse` | Text on AI accent |

### Form Field Tokens

Dedicated tokens for input fields and form controls.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--field-background` | `#FFFFFF` | `--default` | Input background |
| `--field-foreground` | `--eclipse` | `--foreground` | Input text |
| `--field-placeholder` | `--muted` | `--muted` | Placeholder text |
| `--field-border` | `#E5E5E5` | `#374151` | Input border |
| `--field-radius` | `--radius-md` | `--radius-md` | Input border radius |
| `--field-border-width` | `0px` | `0px` | Input border width |

### Segment Component

For segmented controls and toggle groups.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--segment` | `#FFFFFF` | `#4B5563` | Active segment bg |
| `--segment-foreground` | `--foreground` | `--foreground` | Segment text |

### Soft Colour Variants

Subtle tinted backgrounds for tags, badges, and alerts. Each uses 15% opacity of the base colour.

| Token | Base Colour | Usage |
|-------|-------------|-------|
| `--accent-soft` | `--accent` @ 15% | Accent tags, highlights |
| `--accent-soft-foreground` | `--accent` | Text on accent soft |
| `--success-soft` | `--success` @ 15% | Success badges |
| `--success-soft-foreground` | `--success` | Text on success soft |
| `--warning-soft` | `--warning` @ 15% | Warning alerts |
| `--warning-soft-foreground` | `--warning` | Text on warning soft |
| `--danger-soft` | `--danger` @ 15% | Error states |
| `--danger-soft-foreground` | `--danger` | Text on danger soft |
| `--info-soft` | `--info` @ 15% | Info messages |
| `--info-soft-foreground` | `--info` | Text on info soft |

### Shadow System

Layered shadow tokens for depth hierarchy.

| Token | Usage | Note |
|-------|-------|------|
| `--surface-shadow` | Cards, panels | Subtle elevation |
| `--overlay-shadow` | Modals, dropdowns | Medium elevation |
| `--field-shadow` | Input fields | Subtle inner depth |
| `--shadow-large` | Hero sections | High elevation |
| `--shadow-small` | HeroUI alias | Maps to `--surface-shadow` |
| `--shadow-medium` | HeroUI alias | Maps to `--overlay-shadow` |

> **Note:** Shadows are reduced in dark mode to prevent harsh contrast.

### Spacing & Layout

Base tokens for consistent spacing and layout.

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing` | `0.25rem` | Base spacing unit (4px) |
| `--border-width` | `0px` | Default border width |
| `--disabled-opacity` | `0.5` | Disabled state opacity |
| `--ring-offset-width` | `2px` | Focus ring offset |

### Radius Scale

Border radius tokens for consistent rounding. Base is `0.5rem` (8px).

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `0.5rem` | Base radius |
| `--radius-xs` | `0.125rem` | Extra small elements |
| `--radius-sm` | `0.25rem` | Small elements |
| `--radius-md` | `0.375rem` | Small containers |
| `--radius-lg` | `0.5rem` | Small cards |
| `--radius-xl` | `0.75rem` | Inputs, fields |
| `--radius-2xl` | `1rem` | Panels, dialogs |
| `--radius-3xl` | `1.5rem` | Buttons, Cards |
| `--radius-4xl` | `2rem` | Large sections |
| `--radius-full` | `9999px` | Pills, avatars |
| `--radius-small` | HeroUI alias | Maps to `--radius-sm` |
| `--radius-medium` | HeroUI alias | Maps to `--radius-md` |
| `--radius-large` | HeroUI alias | Maps to `--radius-lg` |

### Gradient CSS Variables

Named gradients as CSS custom properties for easy reuse.

| Variable | Colours | Usage |
|----------|---------|-------|
| `--gradient-cyan-flow` | Cyan → Cyan-600 | Hero sections |
| `--gradient-ocean-depth` | Cyan → Electric Blue | AI features |
| `--gradient-aurora` | Cyan → Lavender → Pink | Creative |
| `--gradient-sunrise` | Sunset → Coral | Promotions |
| `--gradient-mint-fresh` | Mint → Cyan | Success |
| `--gradient-electric-night` | Electric Blue → Cyan → Mint | Dark hero |
| `--gradient-ai-from` | Purple start | AI gradient start |
| `--gradient-ai-to` | Blue end | AI gradient end |

### Data Visualisation

CSS variable sequence for charts and graphs (maps to the hex palette in Colour Tokens).

| Variable | Colour | Hex |
|----------|--------|-----|
| `--dataviz-1` | Cyan | `#2EDBE3` |
| `--dataviz-2` | Electric Blue | `#4F46E5` |
| `--dataviz-3` | Success | `#10B981` |
| `--dataviz-4` | Warning | `#F59E0B` |
| `--dataviz-5` | Danger | `#EF4444` |
| `--dataviz-6` | Lavender | `#A78BFA` |
| `--dataviz-7` | Sunset | `#FF8C42` |
| `--dataviz-8` | Mint | `#6EE7B7` |

### Miscellaneous Tokens

Utility tokens for focus states, links, and interaction.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--separator` | `#F5F5F5` | `#262626` | Dividers, hr |
| `--focus` | `--accent` | `--accent` | Focus ring colour |
| `--link` | `--accent` | `--accent` | Link colour |
| `--ring-color` | `--focus` | `--focus` | Focus ring alias |
| `--cursor-interactive` | `pointer` | `pointer` | Clickable elements |
| `--cursor-disabled` | `not-allowed` | `not-allowed` | Disabled elements |
| `--skeleton-animation` | `shimmer` | `shimmer` | Loading skeleton |

### Easing Functions

| Token | Value | Note |
|-------|-------|------|
| `--ease-smooth` | `ease` | General transitions |
| `--ease-out` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | Exit animations |
| `--ease-out-expo` | `cubic-bezier(0.19, 1, 0.22, 1)` | Explosive exit |
| `--ease-fluid-out` | `cubic-bezier(0.32, 0.72, 0, 1)` | Smooth deceleration |
| `--ease-in-quad` | `cubic-bezier(0.55, 0.085, 0.68, 0.53)` | Subtle acceleration |
| `--ease-in-out-cubic` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | Smooth start/end |

### Animations

| Token | CSS | Usage |
|-------|-----|-------|
| `--animate-spin-fast` | `spin 0.75s linear infinite` | Loaders |
| `--animate-skeleton` | `shimmer 2s linear infinite` | Loading states |
| `--animate-caret-blink` | `caret-blink 1.2s ease-out infinite` | Text input cursors |

### Hover State Tokens

Calculated hover states using `color-mix()` for interactive elements.

| Token | Calculation | Usage |
|-------|-------------|-------|
| `--color-default-hover` | `--default` @ 80% | Neutral hover |
| `--color-accent-hover` | `--accent` 90% + foreground 10% | Primary hover |
| `--color-success-hover` | `--success` 90% + foreground 10% | Success hover |
| `--color-warning-hover` | `--warning` 90% + foreground 10% | Warning hover |
| `--color-danger-hover` | `--danger` 90% + foreground 10% | Danger hover |
| `--color-info-hover` | `--info` 90% + foreground 10% | Info hover |
| `--color-field-hover` | `--field` 90% + foreground 2% | Input hover |
| `--color-field-border-hover` | `--field-border` 88% + foreground 10% | Input border hover |
| `--color-*-soft-hover` | Soft colour @ 20% opacity | Soft variant hover |
| `--color-content1-hover` | Content1 90% + foreground 10% | Content hover state |
| `--color-field-border-focus` | Field border 74% + foreground 22% | Focus ring for inputs |

### Surface Levels

Layered surface tokens for elevation hierarchy, calculated with `color-mix()`.

| Token | Calculation | Usage |
|-------|-------------|-------|
| `--color-surface-secondary` | Surface 94% + foreground 6% | Elevated cards |
| `--color-surface-tertiary` | Surface 92% + foreground 8% | Higher elevation |
| `--color-surface-quaternary` | Surface 86% + foreground 14% | Highest elevation |
| `--color-background-secondary` | Background 96% + foreground 4% | Subtle sections |
| `--color-background-tertiary` | Background 92% + foreground 8% | Deeper sections |
| `--color-background-quaternary` | Background 86% + foreground 14% | Deepest sections |

### On-Surface Tokens

For interactive elements that sit on surfaces.

| Token | Calculation | Usage |
|-------|-------------|-------|
| `--color-on-surface` | Surface 93% + foreground 7% | Buttons on cards |
| `--color-on-surface-foreground` | `--surface-foreground` | Text on on-surface |
| `--color-on-surface-hover` | Surface 91% + foreground 9% | Hover state |
| `--color-on-surface-focus` | `--on-surface` | Focus state |

### CSS Variables (Copy-Paste Ready)

```css
:root {
  /* Font */
  --font-sans: 'Libre Franklin', ui-sans-serif, system-ui, sans-serif;

  /* Spacing & Layout */
  --spacing: 0.25rem;
  --border-width: 0px;
  --disabled-opacity: 0.5;
  --ring-offset-width: 2px;

  /* Shadows */
  --surface-shadow:
    0 2px 4px 0 rgb(0 0 0 / 0.02),
    0 1px 2px 0 rgb(0 0 0 / 0.03),
    0 0 1px 0 rgb(0 0 0 / 0.03);
  --overlay-shadow:
    0 4px 16px 0 rgb(24 24 27 / 0.08),
    0 8px 24px 0 rgb(24 24 27 / 0.09);
  --field-shadow:
    0 2px 4px 0 rgb(0 0 0 / 0.04),
    0 1px 2px 0 rgb(0 0 0 / 0.06),
    0 0 1px 0 rgb(0 0 0 / 0.06);
  --shadow-large:
    0 10px 40px 0 rgb(24 24 27 / 0.12),
    0 20px 50px 0 rgb(24 24 27 / 0.10);
  --shadow-small: var(--surface-shadow);
  --shadow-medium: var(--overlay-shadow);

  /* Radius Scale */
  --radius: 0.5rem;
  --radius-sm: calc(var(--radius) * 0.5);
  --radius-md: calc(var(--radius) * 0.75);
  --radius-lg: calc(var(--radius) * 1);
  --radius-xl: calc(var(--radius) * 1.5);
  --radius-2xl: calc(var(--radius) * 2);
  --radius-3xl: calc(var(--radius) * 3);
  --radius-4xl: calc(var(--radius) * 4);
  --radius-small: var(--radius-sm);
  --radius-medium: var(--radius-md);
  --radius-large: var(--radius-lg);
  --field-radius: var(--radius-md);

  /* Gradient Variables */
  --gradient-cyan-flow: linear-gradient(135deg, var(--splento-cyan) 0%, var(--cyan-600) 100%);
  --gradient-ocean-depth: linear-gradient(135deg, var(--splento-cyan) 0%, var(--electric-blue) 100%);
  --gradient-aurora: linear-gradient(135deg, var(--splento-cyan) 0%, var(--lavender) 50%, var(--pink-400) 100%);
  --gradient-sunrise: linear-gradient(135deg, var(--sunset) 0%, var(--coral) 100%);
  --gradient-mint-fresh: linear-gradient(135deg, var(--mint) 0%, var(--splento-cyan) 100%);
  --gradient-electric-night: linear-gradient(135deg, var(--electric-blue) 0%, var(--splento-cyan) 50%, var(--mint) 100%);
  --gradient-ai-from: oklch(0.55 0.27 290);
  --gradient-ai-to: oklch(0.55 0.22 262);

  /* Core Brand */
  --splento-cyan: oklch(0.82 0.15 192);
  --canvas: oklch(0.98 0.002 264);
  --midnight: oklch(0.17 0.02 265);
  --snow: oklch(0.9911 0 0); /* #FCFCFC approx */
  --surface: oklch(1 0 0); /* #FFFFFF */

  /* Primitives */
  --white: oklch(100% 0 0); /* #FFFFFF */
  --black: oklch(0% 0 0); /* #000000 */
  --eclipse: oklch(0.2103 0.0059 285.89); /* #1F2328 */

  /* Content Hierarchy (HeroUI v3)
     Used for layered component backgrounds (cards, modals, popovers).
     content1 = base, content4 = deepest layer. */
  --content1: var(--white);
  --content2: oklch(0.98 0 0);
  --content3: oklch(0.96 0 0);
  --content4: oklch(0.94 0 0);

  /* Surface & Overlay */
  --surface: var(--white);
  --surface-foreground: var(--foreground);
  --overlay: var(--white);
  --overlay-foreground: var(--foreground);

  /* Utility Colours */
  --muted: oklch(0.5517 0.0138 285.94);
  --muted-foreground: oklch(0.45 0.01 286);
  --default: oklch(94% 0.001 286.375);
  --default-foreground: var(--eclipse);
  --scrollbar: oklch(87.1% 0.006 286.286);

  /* AI/Premium Accent */
  --accent-ai: oklch(0.65 0.25 290);
  --accent-ai-foreground: var(--snow);

  /* Form Field Tokens */
  --field-background: var(--white);
  --field-foreground: var(--eclipse);
  --field-placeholder: var(--muted);
  --field-border: oklch(0.90 0.001 286.375);
  --field-radius: var(--radius-md);
  --field-border-width: var(--border-width);

  /* Segment Component */
  --segment: var(--white);
  --segment-foreground: var(--foreground);

  /* Soft Colour Variants */
  --accent-soft: color-mix(in oklab, var(--accent) 15%, transparent);
  --accent-soft-foreground: var(--accent);
  --success-soft: color-mix(in oklab, var(--success) 15%, transparent);
  --success-soft-foreground: var(--success);
  --warning-soft: color-mix(in oklab, var(--warning) 15%, transparent);
  --warning-soft-foreground: var(--warning);
  --danger-soft: color-mix(in oklab, var(--danger) 15%, transparent);
  --danger-soft-foreground: var(--danger);
  --info-soft: color-mix(in oklab, var(--info) 15%, transparent);
  --info-soft-foreground: var(--info);

  /* Data Visualisation Sequence */
  --dataviz-1: var(--splento-cyan);
  --dataviz-2: var(--electric-blue);
  --dataviz-3: var(--success);
  --dataviz-4: var(--warning);
  --dataviz-5: var(--danger);
  --dataviz-6: var(--lavender);
  --dataviz-7: var(--sunset);
  --dataviz-8: var(--mint);

  /* Miscellaneous */
  --separator: oklch(96% 0.002 286.32);
  --focus: var(--accent);
  --link: var(--accent);
  --ring-color: var(--focus);
  --cursor-interactive: pointer;
  --cursor-disabled: not-allowed;
  --skeleton-animation: shimmer;

  /* Easing Functions */
  --ease-smooth: ease;
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-fluid-out: cubic-bezier(0.32, 0.72, 0, 1);
  
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
  --coral: oklch(0.68 0.20 25);
  --peach: oklch(0.82 0.12 55);
  --sunset: oklch(0.72 0.18 45);
  --electric-blue: oklch(0.50 0.25 265);
  --mint: oklch(0.85 0.14 160);
  --lavender: oklch(0.72 0.18 295);
  --pink-400: oklch(0.72 0.19 350);

  /* Semantic Foregrounds */
  --success-foreground: var(--eclipse);
  --warning-foreground: var(--eclipse);
  --danger-foreground: var(--snow);
  --info-foreground: var(--snow);

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
  --background: oklch(0.99 0 0);
  --foreground: var(--eclipse);
  --border: oklch(0.90 0.001 286.375);
}

/* Dark Mode Overrides */
.dark,
[data-theme="dark"] {
  --background: oklch(0.140 0.005 285.89);
  --foreground: var(--snow);
  --surface: oklch(0.2103 0.0059 285.89); /* #1F2328 */
  --border: oklch(30% 0.006 286.033);

  /* Shadows (reduced for dark mode) */
  --surface-shadow: 0 0 0 0 transparent inset;
  --overlay-shadow: 0 8px 24px 0 rgb(0 0 0 / 0.4);
  --field-shadow: 0 0 0 0 transparent inset;
  --shadow-large: 0 12px 40px 0 rgb(0 0 0 / 0.5);

  /* Content Hierarchy (HeroUI v3)
     Used for layered component backgrounds (cards, modals, popovers).
     content1 = base, content4 = deepest layer. */
  --content1: oklch(0.22 0.006 286);
  --content2: oklch(0.25 0.006 286);
  --content3: oklch(0.28 0.006 286);
  --content4: oklch(0.31 0.006 286);

  /* Surface & Overlay */
  --surface-foreground: var(--foreground);
  --overlay: oklch(0.22 0.0059 285.89);
  --overlay-foreground: var(--foreground);

  /* Utility Colours */
  --muted: oklch(70.5% 0.015 286.067);
  --muted-foreground: oklch(0.65 0.01 286);
  --default: oklch(27.4% 0.006 286.033);
  --default-foreground: var(--snow);
  --scrollbar: oklch(30% 0.006 286.286);

  /* AI/Premium Accent */
  --accent-ai: oklch(0.70 0.25 290);
  --accent-ai-foreground: var(--eclipse);
  --gradient-ai-from: oklch(0.65 0.27 290);
  --gradient-ai-to: oklch(0.65 0.22 262);

  /* Form Field Tokens */
  --field-background: var(--default);
  --field-foreground: var(--foreground);
  --field-placeholder: var(--muted);
  --field-border: oklch(30% 0.006 286.033);

  /* Segment Component */
  --segment: oklch(0.3964 0.01 285.93);
  --segment-foreground: var(--foreground);

  /* Semantic Overrides */
  --success: oklch(0.79 0.17 162);
  --warning: oklch(0.85 0.145 85);
  --danger: oklch(0.71 0.19 25);
  --info: oklch(0.69 0.15 250);

  /* Miscellaneous */
  --separator: oklch(22% 0.006 286.033);

  /* Calculated Surface Levels (Must be re-declared to use dark mode base) */
  --color-surface-secondary: color-mix(in oklab, var(--surface) 94%, var(--surface-foreground) 6%);
  --color-surface-tertiary: color-mix(in oklab, var(--surface) 92%, var(--surface-foreground) 8%);
  --color-surface-quaternary: color-mix(in oklab, var(--surface) 86%, var(--default-foreground) 14%);

  --color-background-secondary: color-mix(in oklab, var(--background) 96%, var(--foreground) 4%);
  --color-background-tertiary: color-mix(in oklab, var(--background) 92%, var(--foreground) 8%);
  --color-background-quaternary: color-mix(in oklab, var(--background) 86%, var(--foreground) 14%);

  /* Calculated Hover States (Must be re-declared) */
  --color-default-hover: color-mix(in oklab, var(--default) 80%, transparent);
  --color-accent-hover: color-mix(in oklab, var(--accent) 90%, var(--accent-foreground) 10%);
  --color-success-hover: color-mix(in oklab, var(--success) 90%, var(--success-foreground) 10%);
  --color-warning-hover: color-mix(in oklab, var(--warning) 90%, var(--warning-foreground) 10%);
  --color-danger-hover: color-mix(in oklab, var(--danger) 90%, var(--danger-foreground) 10%);
  --color-info-hover: color-mix(in oklab, var(--info) 90%, var(--info-foreground) 10%);

  /* Soft Color Variants (Re-declare to use dark mode semantic colors) */
  --accent-soft: color-mix(in oklab, var(--accent) 15%, transparent);
  --danger-soft: color-mix(in oklab, var(--danger) 15%, transparent);
  --info-soft: color-mix(in oklab, var(--info) 15%, transparent);
  --success-soft: color-mix(in oklab, var(--success) 15%, transparent);
  --warning-soft: color-mix(in oklab, var(--warning) 15%, transparent);
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
| **Pink 400** | `#F472B6` | `--pink-400` | Aurora gradient |

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
| **Success** | `--success` | `#10B981` / `#34D399` | Form submission, success | `--success-foreground` (`--eclipse`) |
| **Warning** | `--warning` | `#F59E0B` / `#FBBF24` | Validation, alerts | `--warning-foreground` (`--eclipse`) |
| **Danger** | `--danger` | `#EF4444` / `#F87171` | Errors, destructive | `--danger-foreground` (`--snow`) |
| **Info** | `--info` | `#3B82F6` / `#60A5FA` | Messages, help text | `--info-foreground` (`--snow`) |

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

> **Note:** Data visualisation colours are available as CSS variables (`--dataviz-1` to `--dataviz-8`). Use these variables in CSS or pass hex values directly to charting libraries.

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

### State-Based Styling

HeroUI components expose their state through data attributes. You can target these states in CSS:

```css
/* Hover state */
.button[data-hover="true"], 
.button:hover {
  background: var(--accent-hover);
}

/* API-managed states */
.button[data-pressed="true"] {
  transform: scale(0.97);
}

.button[data-focus-visible="true"] {
  outline: 2px solid var(--focus);
}
```

### When NOT to use

* **DON'T** use Gradients on small text or buttons (readability issues).
* **DON'T** mix `grey-` scales with Semantic colors (e.g. don't use `grey-500` for disabled states, use `opacity` or specific disabled tokens).
* **DON'T** use **Splento Cyan** for body text (it's too bright; use Ocean Depth or Midnight).

### AI Gradient Components

Special CSS classes for AI-powered and premium features.

```css
/* Apply to buttons */
.button--ai-gradient {
  background-image: linear-gradient(135deg, var(--gradient-ai-from), var(--gradient-ai-to));
  background-size: 200% 200%;
  transition: background-position 300ms ease;
  color: var(--white);
  border: none;
}

.button--ai-gradient:hover {
  background-position: 100% 100%;
}

/* Apply to badges */
.badge--ai-gradient {
  background-image: linear-gradient(135deg, var(--gradient-ai-from), var(--gradient-ai-to));
  box-shadow: 0 10px 15px -3px rgb(147 51 234 / 0.2);
  color: var(--white);
}
```

**Usage:**

```tsx
<Button className="button--ai-gradient">
  <Sparkles className="w-4 h-4 mr-2" />
  AI Suggestion
</Button>

<Badge className="badge--ai-gradient">Premium</Badge>
```

---

## Dark Mode Implementation

We use HeroUI v3's theming engine with CSS variables and `oklch` color space.

### Key Mappings

| Variable | Light Theme | Dark Theme |
|----------|-------------|------------|
| `--background` | `oklch(0.99 0 0)` | `oklch(0.140 0.005 285.89)` |
| `--foreground` | `--eclipse` (#1F2328) | `--snow` (#FCFCFC) |
| `--surface` | `--white` (#FFFFFF) | `oklch(0.2103 0.0059 285.89)` |
| `--border` | `oklch(0.90 0.001 286.375)` | `oklch(30% 0.006 286.033)` |
| `--accent` | `--splento-cyan` | `oklch(0.85 0.14 192)` — brighter for dark backgrounds |

### Switching Themes

The design system supports instant switching. Use the `ThemeSwitcher` component or toggles in the header.

```tsx
// Force dark mode
<html class="dark" data-theme="dark">
```

---

## Theme Architecture

### Calculated Token Inheritance

**Rule:** All calculated tokens using `color-mix()` must be declared in **both** theme blocks.

**Why:** CSS custom properties resolve at definition time. Nested theme wrappers won't trigger recalculation unless explicitly re-declared.

**Affected tokens:**

* `--color-surface-secondary`, `--color-surface-tertiary`, `--color-surface-quaternary`
* `--color-background-secondary`, `--color-background-tertiary`, `--color-background-quaternary`  
* All `--*-soft` variants
* All `--color-*-hover` states

**Example:**

```css
:root, [data-theme="light"] {
  --surface: var(--white);
  --color-surface-secondary: color-mix(in oklab, var(--surface) 94%, var(--surface-foreground) 6%);
}

.dark, [data-theme="dark"] {
  --surface:  oklch(0.2103 0.0059 285.89);
  --color-surface-secondary: color-mix(in oklab, var(--surface) 94%, var(--surface-foreground) 6%);
}
```

### Surface Component Patterns

| Context | Pattern | Example | Notes |
|---------|---------|---------|-------|
| **General usage** | Semantic variant | `<Surface variant="secondary">` | Uses HeroUI's internal token mapping |
| **Strict token control** | className override | `<Surface className="bg-surface-secondary">` | Forces Splento's calculated token |

### Deep Theme Nesting

To isolate a theme context within the DOM:

```tsx
<div data-theme="light" className="light scheme-light">
  {/* Content uses light theme regardless of global setting */}
</div>

<div data-theme="dark" className="dark scheme-dark">
  {/* Content uses dark theme regardless of global setting */}
</div>
```

| Attribute | Triggers |
|-----------|----------|
| `data-theme` | CSS variable scope (`:root` / `.dark` blocks) |
| `className` | Tailwind `dark:` variants |
| `scheme-*` | `color-scheme` property |

---

## Tailwind Class Mapping

All CSS variables defined with `--color-*` in the `@theme inline` block (see `index.css`) automatically become Tailwind utility classes:

| CSS Variable Pattern | Generated Tailwind Classes |
|---------------------|---------------------------|
| `--color-{name}` | `bg-{name}`, `text-{name}`, `border-{name}` |
| `--color-{name}-foreground` | `text-{name}-foreground` |

> **Tip:** If `--color-surface` exists, you can use `bg-surface`, `text-surface`, `border-surface` in your JSX.

### Common Examples

| Design Token | Tailwind Classes | Usage |
|--------------|-----------------|-------|
| `--splento-cyan` | `bg-accent`, `text-accent` | Primary actions |
| `--canvas` | `bg-background` | Page background (light) |
| `--surface` | `bg-surface`, `text-surface-foreground` | Cards, panels |
| `--muted` | `text-muted`, `text-muted-foreground` | Secondary text |
| `--success` | `bg-success`, `text-success` | Success states |
| `--danger` | `bg-danger`, `text-danger` | Error states |
| `--accent-soft` | `bg-accent-soft`, `text-accent-soft-foreground` | Soft tags |
| `--grey-500` | `bg-grey-500`, `text-grey-500` | Neutral scale |
| `--dataviz-1` | `bg-dataviz-1`, `text-dataviz-1` | Charts |

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
