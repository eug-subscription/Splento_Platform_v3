# Activity Tab — Peer Review Report

> **Reviewer:** Senior Frontend Developer (AI)  
> **Date:** 2026-01-05  
> **Scope:** Full implementation review of Activity Tab  
> **Status:** ✅ Approved with Minor Issues

---

## Executive Summary

The Activity Tab implementation is **well-structured and mostly compliant** with `dev_instruction_v2.md`, `DESIGN_SYSTEM.md`, and HeroUI v3 Beta 3 MCP guidelines. The codebase demonstrates strong adherence to project architecture patterns, with proper component decomposition, lazy loading, and type safety.

| Area | Status | Score |
|------|--------|-------|
| **Code Quality** | ✅ Pass | 9/10 |
| **HeroUI v3 Compliance** | ✅ Pass | 9/10 |
| **Design System Compliance** | ⚠️ Minor Issues | 8/10 |
| **Performance** | ✅ Pass | 9/10 |
| **Accessibility** | ⚠️ Minor Issues | 7/10 |
| **Type Safety** | ✅ Pass | 10/10 |

**Overall:** 8.6/10 — Ready for production with minor fixes.

---

## Files Reviewed

| File | Lines | Status |
|------|-------|--------|
| `src/types/activity.ts` | 60 | ✅ Clean |
| `src/data/activity-constants.ts` | 113 | ✅ Clean |
| `src/data/mock-activity.ts` | 112 | ✅ Clean |
| `src/utils/activity.ts` | 137 | ✅ Clean |
| `src/hooks/useActivity.ts` | 105 | ⚠️ 1 Issue |
| `src/components/team/tabs/ActivityTab.tsx` | 74 | ✅ Clean |
| `src/components/team/activity/ActivityFilterBar.tsx` | 316 | ⚠️ 2 Issues |
| `src/components/team/activity/ActivityLogRow.tsx` | 104 | ⚠️ 2 Issues |
| `src/components/team/activity/ActivityLogList.tsx` | 78 | ✅ Clean |
| `src/components/team/activity/ActivityEmptyState.tsx` | 53 | ✅ Clean |
| `src/components/team/activity/ActivityTabSkeleton.tsx` | 59 | ✅ Clean |
| `src/components/team/activity/UnifiedDateRangePicker.tsx` | 182 | ⚠️ 1 Issue |
| `src/components/team/activity/CustomDateRangePicker.tsx` | 138 | ⚠️ 1 Issue |
| `src/app/TeamPage.tsx` | 104 | ✅ Clean |

---

## Compliance Checklist

### ✅ dev_instruction_v2.md Compliance

| Rule | Status | Notes |
|------|--------|-------|
| Named exports only | ✅ | All components use `export function` |
| No `export default` | ✅ | None found |
| Import aliases `@/` | ✅ | All internal imports use `@/` |
| No `use client` | ✅ | None found (Vite SPA) |
| No `any` types | ✅ | None found |
| `onPress` not `onClick` | ✅ | All HeroUI buttons use `onPress` |
| Compound components | ✅ | Proper dot notation (`Card.Content`, `Modal.Body`, etc.) |
| Direct HeroUI imports | ✅ | All from `@heroui/react` |
| No wrapper components | ✅ | None created |
| Lazy loading | ✅ | `ActivityTab` lazy loaded in `TeamPage.tsx` |
| Suspense with skeleton | ✅ | `ActivityTabSkeleton` used for loading state |
| Logic in hooks | ✅ | `useActivity` handles all state logic |
| Data in `src/data/` | ✅ | Mock data and constants in proper location |

### ✅ HeroUI v3 MCP Compliance

| Component | Usage | Status |
|-----------|-------|--------|
| `Select` | Category/Member filters | ✅ Correct compound pattern |
| `SearchField` | Search input | ✅ Correct compound pattern |
| `Button` | Export, Load More, Reset | ✅ Using `onPress` |
| `Card` | Filter bar, Activity rows | ✅ Correct compound pattern |
| `Modal` | Mobile filter sheet | ✅ Correct compound pattern |
| `Popover` | Date range picker | ✅ Correct pattern |
| `ListBox` | Selection lists | ✅ Correct compound pattern |
| `Chip` | Category badges | ✅ Using compound pattern |
| `Skeleton` | Loading states | ✅ Correct usage |
| `Spinner` | Load more state | ✅ Correct usage |
| `DateField` | Custom date inputs | ✅ Correct compound pattern |
| `Separator` | Dividers | ✅ Correct usage |

### ⚠️ Design System (index.css) Compliance

| Token Usage | Status | Notes |
|-------------|--------|-------|
| Color tokens | ✅ | Uses `--info`, `--success`, `--danger`, etc. |
| Radius tokens | ⚠️ | Uses `rounded-field` (needs verification) |
| Shadow tokens | ✅ | Uses `shadow-none`, `shadow-sm` |
| Semantic variants | ✅ | Uses `variant="primary"`, `variant="secondary"` |
| No hardcoded colors | ✅ | All colors via CSS variables |
| No hardcoded sizes | ✅ | Uses `text-sm`, `text-xs`, etc. |

---

## Issues Found

### 🔴 CRITICAL (0)

None.

---

### 🟠 MINOR (6)

#### MINOR-1: Unused `CustomDateRangePicker.tsx` Component

**File:** `src/components/team/activity/CustomDateRangePicker.tsx`

**Problem:** This file appears to be unused/orphaned. The `UnifiedDateRangePicker.tsx` handles both preset and custom date selection in one component.

**Recommendation:** Remove the file to reduce bundle size and maintenance overhead.

**Action:**

```bash
rm src/components/team/activity/CustomDateRangePicker.tsx
```

---

#### MINOR-2: Missing `aria-label` on Mobile Filter Button

**File:** `src/components/team/activity/ActivityFilterBar.tsx` (Line 260-271)

**Problem:** The mobile filter icon-only button lacks an `aria-label`, which is required per `dev_instruction_v2.md` accessibility guidelines.

**Current:**

```tsx
<Button
    variant="secondary"
    className="rounded-field h-10 min-w-[3rem] px-0 relative border-default-200"
    isIconOnly
>
```

**Fix:**

```tsx
<Button
    variant="secondary"
    className="rounded-field h-10 min-w-[3rem] px-0 relative border-default-200"
    isIconOnly
    aria-label="Open filters"
>
```

---

#### MINOR-3: Inline `style` Attribute for Category Colors

**Files:**

- `src/components/team/activity/ActivityFilterBar.tsx` (Lines 72, 92)
- `src/components/team/activity/ActivityLogRow.tsx` (Lines 26, 58)

**Problem:** Using `style={{ color: category.colorToken }}` with dynamically resolved CSS variable strings bypasses theme-aware Tailwind classes. While functional, it's less maintainable than using design token utilities.

**Observation:** This is acceptable for dynamic category colors that don't have pre-defined Tailwind classes. However, consider creating a utility like `getCategoryClassName()` that maps categories to Tailwind classes for better theme integration in the future.

**Status:** No immediate action required. Document for Phase 2 refactor.

---

#### MINOR-4: `rounded-field` Class Usage Inconsistency

**Files:** Multiple activity components

**Problem:** The `rounded-field` class is used but it's defined as a CSS variable (`--field-radius: var(--radius-xl)`) in `index.css`, not as a Tailwind utility. This works because of HeroUI's integration, but should be verified.

**Observation:** The class resolves correctly via the `@theme inline` block. No action needed, but document the dependency.

---

#### MINOR-5: Potential Memory Leak in `useActivity` URL Effect

**File:** `src/hooks/useActivity.ts` (Lines 68-92)

**Problem:** The `useEffect` for URL synchronization runs on every filter change but doesn't check if the URL actually changed before calling `replaceState`. This can cause unnecessary history entries in edge cases.

**Current:**

```tsx
useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // ... sync logic
    window.history.replaceState({ ...window.history.state }, '', newURL);
}, [filters]);
```

**Recommended Fix:**

```tsx
useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // ... sync logic
    const currentURL = window.location.href;
    if (currentURL !== newURL) {
        window.history.replaceState({ ...window.history.state }, '', newURL);
    }
}, [filters]);
```

---

#### MINOR-6: Duplicate Indicator Line in ActivityLogList

**File:** `src/components/team/activity/ActivityLogList.tsx` (Line 36)

**Problem:** The timeline indicator line (`before:absolute before:left-5...`) creates a visual pseudo-element that may not align perfectly with the category icon on different screen sizes. Currently uses hardcoded `left-5` for both mobile and desktop.

**Observation:** Visual review suggested. The line positioning may need responsive adjustment:

```tsx
// Current
before:left-5 before:top-4 before:bottom-4

// Suggested
before:left-4 md:before:left-5 before:top-4 before:bottom-4
```

---

### 🟡 NITS (3)

#### NIT-1: Redundant `fullWidth` on Nested Button

**File:** `src/components/team/activity/ActivityFilterBar.tsx` (Lines 283-292)

The export button in the mobile modal already has `fullWidth` from its parent flex container.

---

#### NIT-2: Verbose Empty Check

**File:** `src/components/team/activity/ActivityLogList.tsx` (Line 24)

**Current:**

```tsx
if (activities.length === 0 && !isLoading) {
```

**Alternative (more idiomatic):**

```tsx
if (!activities.length && !isLoading) {
```

---

#### NIT-3: Console Warning Potential

**File:** `src/components/team/activity/UnifiedDateRangePicker.tsx`

The `useMemo` for `defaultDate` and `defaultStart` creates new Date objects that could cause hydration mismatches in SSR environments. Since this is a Vite SPA, it's fine, but worth noting.

---

## Build & Lint Verification

```bash
✅ npm run lint — PASSED (no errors)
✅ npm run build — PASSED

Bundle Analysis:
  ActivityTab-DLdC0vkC.js: 31.09 kB (gzip: 9.18 kB)
  Main bundle: 351.07 kB (under 500 KB limit ✅)
```

---

## Accessibility Audit

| Check | Status |
|-------|--------|
| All buttons with icons have labels | ⚠️ Mobile filter button missing `aria-label` |
| Focus indicators visible | ✅ |
| Keyboard navigation works | ✅ |
| Color contrast sufficient | ✅ |
| Screen reader announcements | ⚠️ Activity list changes not announced |

**Recommendation:** Add `aria-live="polite"` to the activity list container for screen reader announcements when filters change.

---

## Performance Observations

| Metric | Status |
|--------|--------|
| Lazy loading | ✅ ActivityTab chunk isolated |
| Bundle size | ✅ 31.09 KB (acceptable) |
| Debounced search | ❓ Not implemented (may cause rapid re-renders) |
| Pagination | ✅ 50 items per page |

**Recommendation:** Consider adding a 300ms debounce to the search input to reduce re-render frequency.

---

## Actionable Summary for Developer

### Must Fix Before Merge (2 items)

| ID | File | Action | Priority |
|----|------|--------|----------|
| **MINOR-2** | `ActivityFilterBar.tsx:260` | Add `aria-label="Open filters"` to icon-only button | 🔴 High |
| **MINOR-5** | `useActivity.ts:68-92` | Add URL comparison before `replaceState` | 🟠 Medium |

### Recommended (3 items)

| ID | File | Action | Priority |
|----|------|--------|----------|
| **MINOR-1** | `CustomDateRangePicker.tsx` | Delete orphaned file | 🟡 Low |
| **MINOR-6** | `ActivityLogList.tsx:36` | Update timeline `before:left-4 md:before:left-5` | 🟡 Low |
| **A11Y** | `ActivityLogList.tsx` | Add `aria-live="polite"` to list container | 🟡 Low |

### Optional Enhancements (Phase 2)

| Enhancement | Description |
|-------------|-------------|
| Search debounce | Add 300ms debounce to search input |
| Category class utility | Create `getCategoryClassName()` for theme-aware category colors |
| Activity detail modal | Expand row to show full metadata |

---

## Approval

The Activity Tab implementation is **approved for merge** after addressing the 2 "Must Fix" items above.

---

*Report generated following `dev_instruction_v2.md` code review standards.*
