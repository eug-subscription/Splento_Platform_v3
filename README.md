# Splento Platform v3

This repository contains the frontend implementation for the **Splento Platform v3**, specifically focusing on the **Company Account Settings** module. It is built with modern web technologies and follows a component-driven architecture using **HeroUI v3**.

## 🚀 Tech Stack

- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS Variables
- **UI Library**: [HeroUI v3](https://v3.heroui.com/) (Beta)
- **Icons**: [Iconify](https://iconify.design/) with `gravity-ui` collection

## 📂 Project Structure

The project follows a scalable and modular directory structure:

```
company-account-settings/
├── src/
│   ├── app/
│   │   └── admin/
│   │       └── AccountSettings.tsx    # Main page component
│   ├── components/
│   │   ├── admin/                     # Admin-specific components with business logic
│   │   │   ├── AutorenameSelect.tsx   # File naming strategy selector
│   │   │   ├── CountrySelect.tsx      # Searchable country picker
│   │   │   ├── CustomCheckbox.tsx     # Styled checkbox variant
│   │   │   ├── FormTextField.tsx      # Form field with validation
│   │   │   └── RoleSelect.tsx         # Manager role selector
│   │   └── ThemeSwitcher.tsx          # Light/dark mode toggle
│   ├── types/
│   │   └── index.ts                   # TypeScript type definitions
│   ├── index.css                      # Global styles with HeroUI v3 theming
│   ├── App.tsx                        # Root component
│   └── main.tsx                       # Application entry point
├── dev_instruction_v1.5.md            # Development standards (REQUIRED READING)
├── CONTRIBUTING.md                    # Contribution guidelines
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

**Custom Components (with Business Logic):**

These components add real business value, not just re-export HeroUI:

- **`FormTextField`**: Combines `TextField` + `Label` + `Input` + `FieldError` with validation logic
- **`CustomCheckbox`**: Styled checkbox with custom border radius and flexible label/description layout
- **`RoleSelect`**: Domain-specific role selector with type safety (`'Admin' | 'Edit' | 'Read Only'`)
- **`CountrySelect`**: Searchable country picker with regional grouping (North America, Europe, Asia)
- **`AutorenameSelect`**: Business logic for file naming strategies (External ID, Dish Name, Combined)
- **`ThemeSwitcher`**: Theme state management with localStorage persistence

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

- **[dev_instruction_v1.5.md](./company-account-settings/dev_instruction_v1.5.md)** - Complete development standards
- **[CONTRIBUTING.md](./company-account-settings/CONTRIBUTING.md)** - How to contribute
- **[THEMING.md](./company-account-settings/THEMING.md)** - Theming system guide
- **[HeroUI v3 Docs](https://v3.heroui.com/)** - Official HeroUI documentation

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
