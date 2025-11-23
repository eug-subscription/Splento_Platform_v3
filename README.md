# Splento Platform v3

This repository contains the frontend implementation for the **Splento Platform v3**, specifically focusing on the **Company Account Settings** module. It is built with modern web technologies and follows a component-driven architecture using **HeroUI v3**.

## 🚀 Tech Stack

- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Library**: [HeroUI v3](https://heroui.com/) (formerly NextUI)
- **Icons**: [Iconify](https://iconify.design/)

## 📂 Project Structure

The project follows a scalable and modular directory structure:

```
src/
├── app/
│   └── admin/              # Page-level components (e.g., AccountSettings)
├── components/
│   ├── ui/                 # Atomic, reusable UI wrappers for HeroUI components
│   └── admin/              # Domain-specific components for the Admin section
├── types/                  # TypeScript type definitions
└── main.tsx                # Application entry point
```

## ✨ Key Features

### Company Account Settings Page

A comprehensive settings management interface for company administrators, featuring:

- **Company Information**: Manage company details, contact info, and VAT number.
- **Billing & Invoices**: Configure billing address with a responsive two-column layout.
- **Company Managers**:
  - **Rich List View**: Displays managers with `Avatar`, `Label` (name), and `Description` (email).
  - **Role Management**: Assign roles (Admin, Edit, Read Only) via a clean dropdown.
  - **Safe Deletion**: Icon-only delete button with a **confirmation dialog** (using `AlertDialog` with blur backdrop) to prevent accidental removals.
- **File Processing**: Configure file naming conventions and prefixes.
- **Notification Settings**: Toggle email and chat notifications.
- **Tags**: Manage enterprise tags with a dynamic chip input system.

### Component Architecture

We leverage **HeroUI v3** with a custom wrapper layer in `src/components/ui` to ensure consistency and ease of maintenance.

- **`AlertDialog`**: A custom wrapper around HeroUI's Modal to create standard confirmation dialogs with `Header`, `Body`, `Footer`, and `Icon` sub-components.
- **`Select` & `ListBox`**: Customized for dense and clean data entry.
- **`Modal`**: Standardized modal dialogs for forms (e.g., "Add Manager").
- **`Avatar`**: Used for user profiles with fallback support.

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

## 🎨 Design Principles

- **Clean & Minimal**: Focus on content and usability.
- **Consistent Spacing**: strict adherence to Tailwind's spacing scale.
- **Feedback**: Interactive states (hover, focus) and confirmation dialogs for destructive actions.
- **Responsive**: Layouts adapt to different screen sizes (e.g., grid layouts for forms).
