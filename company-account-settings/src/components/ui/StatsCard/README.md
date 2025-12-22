# Stats Card Component Design

**Purpose**: A reusable card component for displaying statistics, trends, and progress, designed to be used across the application (e.g., Overview Tab, Team Page).

## Component Specification

### File Path

`src/components/ui/StatsCard.tsx`

### Interface

```typescript
import { ReactNode } from 'react';

export interface StatsCardProps {
  /**
   * The label/title of the statistic (e.g., "Team Members", "Credits Remaining")
   */
  label: string;
  
  /**
   * The main value to display (e.g., "12", "3.3K", "$500")
   */
  value: string | number;
  
  /**
   * Iconifier icon string (e.g., "gravity-ui:persons")
   */
  icon: string;
  
  /**
   * Optional secondary text next to value or below label (e.g., "/ 5.0K")
   */
  subtext?: string;
  
  /**
   * Optional trend indicator
   */
  trend?: {
    value: string | number;
    direction: 'up' | 'down' | 'neutral';
    label?: string; // e.g., "vs last period"
  };
  
  /**
   * Optional progress bar
   */
  progress?: {
    value: number; // Current value
    max: number;   // Max value
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  };
  
  /**
   * Warning state (displays a warning chip/indicator)
   */
  warning?: boolean;
}
```

## Visual Structure

The component uses a split vertical flex layout to ensure consistent spacing:

1. **Top Section (Justify Top)**:
    * **Header**: Label (Left) + Icon/Warning Chip (Right)
    * **Value Block**: Big Value + Subtext
    * **Progress Block**: Custom Progress Bar + Percentage Text (placed here to stay close to value)
2. **Bottom Section (Justify Bottom)**:
    * **Trend Block**: Trend Icon + Value + Label

## Design Decisions & Rationale

* **Custom Progress Bar**: HeroUI v3 Beta does not yet include a `Progress` component. A custom implementation using Tailwind utility classes (`bg-danger`, `bg-warning`) is used to maintain semantic consistency until the official component is available.
* **Layout Logic**: The Progress Bar was moved to the "Top Section" to ensure it remains visually connected to the data it represents (e.g., Storage used), even when the card expands vertically. Trend information remains anchored to the bottom.

## Usage Examples

### Basic usage

```tsx
<StatsCard
  label="Team Members"
  value={12}
  icon="gravity-ui:persons"
/>
```

### With Trend and Subtext

```tsx
<StatsCard
  label="API Calls"
  value="58.4K"
  subtext="/ 100K"
  icon="gravity-ui:plug-connection"
  trend={{
    value: "5%",
    direction: "down",
    label: "vs last period"
  }}
/>
```

### With Progress and Warning

```tsx
<StatsCard
  label="Storage"
  value="4.5 GB"
  subtext="/ 5 GB"
  icon="gravity-ui:database"
  warning={true}
  progress={{
    value: 4.5,
    max: 5,
    color: "danger"
  }}
/>
```
