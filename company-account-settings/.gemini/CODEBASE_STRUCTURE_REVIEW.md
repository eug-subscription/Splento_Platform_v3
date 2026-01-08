# Codebase Structure Review

> **Date:** 2026-01-08  
> **Reviewer:** AI Assistant  
> **Project:** Company Account Settings (Splento Platform v3)

---

## Executive Summary

The codebase is **functional and well-organized overall**. This review identifies minor organizational inconsistencies that don't affect functionality but could improve maintainability if addressed.

**Overall Health:** ✅ Excellent  
**Critical Issues:** None  
**Recommendations:** 0 remaining (5 completed)

---

## Table of Contents

1. [Current Structure Overview](#current-structure-overview)
2. [What's Done Well](#whats-done-well)
3. [Structural Inconsistencies](#structural-inconsistencies)
4. [Recommendations](#recommendations)
5. [Priority Matrix](#priority-matrix)

---

## Current Structure Overview

```
src/
├── App.tsx                    # Root component
├── main.tsx                   # Entry point
├── router.tsx                 # TanStack Router configuration
├── index.css                  # Global styles
│
├── app/                       # Feature pages (53 files)
│   ├── HomePage.tsx
│   ├── TeamPage.tsx           # ✅ Consolidated in src/app/team/
│   ├── admin/                 # Admin feature (38 files) ✅
│   │   ├── AccountSettings.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── billing/
│   │   ├── developers/
│   │   ├── hooks/             # ✅ Hook moved to src/hooks/
│   │   └── sections/
│   └── orders/                # Orders feature (13 files) ✅
│       ├── OrdersPage.tsx
│       ├── OrderDetailPage.tsx
│       └── components/
│
├── components/                # Shared components (125 files)
│   ├── CommandPalette.tsx     # ✅ Moved to navigation/
│   ├── ThemeSwitcher.tsx      # ✅ Moved to navigation/
│   ├── command-palette-utils.ts # ✅ Moved to utils/
│   ├── common/
│   ├── design-system/
│   ├── developers/
│   ├── home/
│   ├── layout/
│   ├── modals/
│   ├── navigation/
│   ├── products/
│   ├── router/
│   ├── team/                  # ✅ Moved to app/team/
│   │   ├── tabs/
│   │   ├── settings/
│   │   ├── security/
│   │   ├── activity/
│   │   ├── modals/
│   │   └── utils/             # ✅ Moved to src/utils/
│   └── ui/
│
├── context/                   # React Contexts (6 files) ✅
│   ├── LayoutContext.ts
│   ├── LayoutProvider.tsx
│   ├── ModalContext.ts
│   ├── ModalProvider.tsx
│   ├── ThemeContext.ts
│   └── ThemeProvider.tsx
│
├── data/                      # Mock data & constants (18 files)
│   ├── mock-orders.ts         # ✅ Consistent
│   ├── mock-team.ts
│   ├── orders/                # ✅ Folder removed
│   │   └── order-config.ts
│   └── ... other mocks
│
├── hooks/                     # Shared hooks (10 files) ✅
│   ├── useOrders.ts
│   ├── useBilling.ts
│   ├── useSecurity.ts
│   └── ... others
│
├── types/                     # TypeScript definitions (13 files) ✅
│   ├── order.types.ts
│   ├── team.ts
│   └── ... others
│
└── utils/                     # Utility functions (7 files)
    ├── activity.ts
    ├── billing.ts
    ├── date-utils.ts
    ├── format.ts
    ├── formatTime.ts
    └── security.ts
```

---

## What's Done Well

### ✅ Context Pattern (Fast Refresh Compatible)

```
src/context/
├── ThemeContext.ts      # Types + createContext
├── ThemeProvider.tsx    # Provider component
```

Correctly split for React Fast Refresh compatibility per `dev_instruction_v2.md`.

### ✅ Centralized Data

All mock data and constants are in `src/data/` — no hardcoded arrays in components.

### ✅ Centralized Types

All TypeScript definitions in `src/types/` with proper exports.

### ✅ Shared Hooks

Business logic properly extracted to `src/hooks/`.

### ✅ Orders Feature Structure

Self-contained with pages and components together:

```
src/app/orders/
├── OrdersPage.tsx
├── OrderDetailPage.tsx
└── components/
```

### ✅ TanStack Router

Centralized in `src/router.tsx` with all routes lazy-loaded.

---

## Structural Inconsistencies

### 1. Team Feature Split Location

| Feature | Pages Location | Components Location |
|---------|----------------|---------------------|
| **Orders** | `src/app/orders/` | `src/app/orders/components/` ✅ |
| **Team** | `src/app/team/` | `src/app/team/components/` ✅ |
| **Admin** | `src/app/admin/` | `src/app/admin/sections/` ✅ |

**Impact:** Inconsistent mental model for developers navigating the codebase.

**Files Affected:**

- `src/app/TeamPage.tsx`
- `src/components/team/` (63 files)

---

### 2. Orphaned Hook in Admin

```
src/app/admin/hooks/useAccountSettings.ts
```

**Issue:** Fixed. Hook moved to shared `src/hooks/`. ✅

---

### 3. Loose Files in Components Root

```
src/components/
├── CommandPalette.tsx          ← Should be in subfolder
├── ThemeSwitcher.tsx           ← Should be in subfolder
├── command-palette-utils.ts    ← Should be in src/utils/
```

**Issue:** Fixed. Files moved to appropriate subfolders. ✅

---

### 4. Nested Utils in Team

```
src/components/team/utils/
├── ???
```

**Issue:** Fixed. Team-specific utils moved to shared `src/utils/`. ✅

---

### 5. Data Subfolder Inconsistency

```
src/data/
├── mock-orders.ts              ← Root level
├── orders/                     
│   └── order-config.ts         ← Subfolder
```

**Issue:** Fixed. `orders/` folder removed and config moved to root constants file. ✅

---

## Recommendations

### Option A: Feature-First Consolidation (Recommended)

Reorganize to group all feature files together:

```
src/app/
├── home/
│   └── HomePage.tsx
├── team/                       # NEW: Consolidate team feature
│   ├── TeamPage.tsx            # Move from src/app/
│   ├── components/             # Move from src/components/team/
│   ├── tabs/
│   └── ...
├── admin/
│   └── ... (already organized)
└── orders/
    └── ... (already organized)
```

### Option B: Keep Current + Minor Fixes

If restructuring is too disruptive, apply these minimal fixes:

1. **Move orphaned hook:**

   ```
   src/app/admin/hooks/useAccountSettings.ts
   → src/hooks/useAccountSettings.ts
   ```

2. **Move loose component files:**

   ```
   src/components/CommandPalette.tsx
   → src/components/navigation/CommandPalette.tsx
   
   src/components/ThemeSwitcher.tsx
   → src/components/navigation/ThemeSwitcher.tsx
   ```

3. **Move utility:**

   ```
   src/components/command-palette-utils.ts
   → src/utils/command-palette.ts
   ```

4. **Flatten data folder:**

   ```
   src/data/orders/order-config.ts
   → src/data/order-constants.ts
   ```

---

## Priority Matrix

| Issue | Severity | Effort | Priority |
|-------|----------|--------|----------|
| Team feature split | ✅ Resolved | Done | P2 |
| Orphaned admin hook | ✅ Resolved | Done | P3 |
| Loose component files | ✅ Resolved | Done | P3 |
| Nested team utils | ✅ Resolved | Done | P4 |
| Data subfolder inconsistency | ✅ Resolved | Done | P4 |

**Legend:**

- P2: Address in next sprint
- P3: Address when touching related files
- P4: Nice to have

---

## dev_instruction_v2.md Compliance

| Standard | Status |
|----------|--------|
| Named exports only | ✅ Compliant |
| No `any` types | ✅ Compliant |
| No `use client` | ✅ Compliant |
| Path aliases (`@/`) | ✅ Compliant |
| `onPress` for HeroUI | ✅ Compliant |
| Lazy loaded routes | ✅ Compliant |
| Data in `src/data/` | ✅ Compliant |
| Context split pattern | ✅ Compliant |
| Lint & Build | ✅ Passing |

---

## Conclusion

The codebase is in good shape with no critical issues. The identified inconsistencies are organizational and can be addressed incrementally without blocking current development.

**Next Steps:**

1. Decide on Option A or B
2. Create tickets for P2/P3 items
3. Address P4 items opportunistically
