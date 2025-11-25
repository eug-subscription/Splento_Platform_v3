# Splento Platform v3

This repository contains the frontend implementation for the **Splento Platform v3**, specifically focusing on the **Company Account Settings** module. It is built with modern web technologies and follows a component-driven architecture using **HeroUI v3**.

## 🚀 Tech Stack

- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS Variables
- **UI Library**: [HeroUI v3](https://v3.heroui.com/docs/introduction) (Beta)
- **Icons**: [Iconify](https://iconify.design/) with `gravity-ui` collection

## 📂 Project Structure

The project follows a scalable and modular directory structure:

company-account-settings/
├── src/
│   ├── app/
│   │   └── admin/
│   │       └── AccountSettings.tsx    # Main page component
│   ├── assets/                        # Static assets (images, icons)
│   ├── components/
│   │   └── ThemeSwitcher.tsx          # Light/dark mode toggle
│   ├── data/                          # Static data and mocks
│   │   ├── countries.ts               # Country list for ComboBox
│   │   └── homepage.mock.ts           # Development mock data
│   ├── types/
│   │   └── index.ts                   # TypeScript type definitions
│   ├── App.css                        # Root app component styles
│   ├── App.tsx                        # Root component
│   ├── index.css                      # Global styles with HeroUI v3 theming
│   └── main.tsx                       # Application entry point
├── dev_instruction_v1.5.md            # Development standards (REQUIRED READING)
├── THEMING.md                         # Theming documentation
└── README.md                          # This file

```

## 📋 Development Standards

This project strictly follows **HeroUI v3 development guidelines** documented in:

- **[`dev_instruction_v1.5.md`](./company-account-settings/dev_instruction_v1.5.md)** - Complete development standards (**READ THIS FIRST**)

### Key Conventions

- **🚫 No Wrapper Components**: Import directly from `@heroui/react` (Rule #0)
- **📁 File Naming**: PascalCase for components (e.g., `UserProfile.tsx`)
- **🧩 Compound Components**: Always use dot notation (`<Card.Header>`, `<Modal.Dialog>`)
- **🎨 Styling**: CSS variables + Tailwind utilities (no hardcoded colors like `bg-blue-500`)
- **♿ Accessibility**: ARIA labels, keyboard navigation, WCAG AA compliance
- **🌓 Dark Mode**: Full light/dark theme support with OKLCH color space
- **🎯 Semantic Variants**: Use `variant="primary"` not `variant="solid"`
- **👆 Event Handlers**: Use `onPress` instead of `onClick` (React Aria)

## ✨ Key Features

### Company Account Settings Page

A comprehensive settings management interface for company administrators, featuring:

- **Company Information**: Manage company details, contact info, and VAT number
- **Billing & Invoices**: Configure billing address with responsive two-column layout
- **Company Managers**:
  - Rich list view with avatars and role management
  - Inline role editing via dropdown select
  - Safe deletion with AlertDialog confirmation (blur backdrop)
  - Add new managers via Modal dialog with form validation
- **File Processing**: Configure file naming conventions and prefixes with checkbox toggles
- **Mail Settings**: Control email notifications and chat alerts
- **Prebooking Files**: Toggle session date in CSV exports
- **Display Settings**: Show/hide photographer details
- **Company Tags**: Dynamic chip-based tag management with add/remove
- **Social Links**: Input fields with icon prefixes for web presence
- **Theme Switching**: Toggle between light and dark modes with localStorage persistence

### HeroUI v3 Architecture

This project follows **HeroUI v3 best practices** with **zero wrapper components**:

✅ **Direct Imports**: All HeroUI components imported directly from `@heroui/react`  
✅ **Compound Components**: Using dot notation for complex components  
✅ **Semantic Variants**: Meaningful names over visual descriptions  
✅ **React Aria**: Built-in accessibility and keyboard navigation  

**Example Component Usage:**

```tsx
import { Card, Button, Modal, AlertDialog } from '@heroui/react';

// Compound component pattern - Card
<Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
  <Card.Header className="pb-0 pt-2 px-2">
    <Card.Title className="text-base font-semibold">
      Identity
    </Card.Title>
  </Card.Header>
  <Card.Content className="p-2">
    {/* Content */}
  </Card.Content>
</Card>

// Semantic variants - Button
<Button variant="primary" onPress={handleSave}>Save</Button>
<Button variant="secondary">Discard</Button>
<Button variant="danger" onPress={handleDelete}>Delete</Button>
```

**Custom Components (Business Logic Only):**

Per HeroUI v3 Rule #0, we import directly from `@heroui/react`. The only custom component is:

- **`ThemeSwitcher`**: Theme state management with localStorage persistence

All other UI needs are met by direct HeroUI imports:

- Forms use `TextField`, `ComboBox`, `Select` compound components
- Lists use `Table` with direct row rendering
- Modals use `Modal.Dialog` compound structure
- Confirmations use `AlertDialog` directly

## 🛠️ Getting Started

1. **Install dependencies**:

    ```bash
    npm install
    ```

2. **Run the development server**:

    ```bash
    npm run dev
    ```

3. **Build for production**:

    ```bash
    npm run build
    ```

4. **Preview production build**:

    ```bash
    npm run preview
    ```

## 🎨 Design Principles

- **Theme-Aware Design**: Seamless light/dark mode switching with OKLCH color space for consistent contrast
- **Semantic Color System**: `accent`, `success`, `warning`, `danger` tokens adapt to theme
- **Component Composition**: Build complex UIs by composing simple components (not configuration objects)
- **Clean & Minimal**: Focus on content and usability with consistent spacing
- **Feedback UI**: Interactive states (hover, focus) and confirmation dialogs for destructive actions
- **Responsive Layouts**: Grid and flexbox layouts adapt to mobile, tablet, and desktop screens
- **Progressive Disclosure**: Start simple, add complexity only when needed

## 📚 Documentation

- **[dev_instruction_v1.5.md](./company-account-settings/dev_instruction_v1.5.md)** - Complete development standards (**REQUIRED READING**)
- **[THEMING.md](./company-account-settings/THEMING.md)** - Theming system guide
- **[HeroUI v3 Docs](https://v3.heroui.com/docs/introduction)** - Official HeroUI documentation
- **[HeroUI Components List](https://v3.heroui.com/llms.txt)** - Full list of components and descriptions

## 🔍 Code Quality

- **TypeScript**: Strict mode enabled, zero `any` types
- **ESLint**: Configured for React best practices
- **No Wrapper Anti-Pattern**: Direct imports from `@heroui/react` only
- **BEM CSS**: Custom styles follow Block-Element-Modifier methodology
- **Accessibility**: WCAG AA compliant, keyboard navigable

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

Proprietary - Splento Platform v3
