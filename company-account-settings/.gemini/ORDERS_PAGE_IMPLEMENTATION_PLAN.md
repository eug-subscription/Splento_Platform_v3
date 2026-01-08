# Orders Page Implementation Plan

**Version:** 1.2  
**Date:** 2026-01-07  
**Status:** ✅ Reviewed & Approved  
**Author:** Product & Engineering  
**Review Completed:** 2026-01-07

---

## Overview

This document outlines the phased implementation plan for the Splento Orders Page, based on the Design Specification v1.0 and aligned with `dev_instruction_v2.md`, `DESIGN_SYSTEM.md`, and HeroUI v3 Beta 3.

### Key Decisions

| Question | Answer |
|----------|--------|
| **API Contract** | ✅ Backend supports this data structure |
| **Real-time Updates** | Via webhook (backend handles). Frontend uses polling or manual refresh for now |
| **Pro Assignment** | Managed in Operational CRM. Orders page is **client-facing only** |
| **Gallery Integration** | Separate microservice. Users can accept/reject single, multiple, or all photos |
| **Page Structure** | Use **tabbed interface** (consistent with Team page) |

---

## Review Summary (2026-01-07)

All 8 phases have been reviewed for compliance with `dev_instruction_v2.md`, `DESIGN_SYSTEM.md`, and HeroUI v3. The following code changes were made to the phase documents:

### Code Fixes Applied

| Phase | File | Issue | Fix Applied |
|-------|------|-------|-------------|
| **Phase 1** | `router.tsx` | Default exports used | Changed to named exports with lazy loading pattern: `.then(m => ({ default: m.ComponentName }))` |
| **Phase 1** | `router.tsx` | React Router `:id` syntax | Changed to TanStack Router `$id` parameter syntax |
| **Phase 2** | `OrdersTable.tsx` | Sortable headers used `onClick` | Replaced with HeroUI `Button` using `onPress` |
| **Phase 3** | `useOrder.ts` | Missing `useCallback` import | Added `useCallback` to import statement |
| **Phase 4** | `LocationSection.tsx` | Native `<a>` for phone link | Replaced with HeroUI `Link` component |
| **Phase 4** | `SessionSection.tsx` | Duration formatting trailing space | Fixed `"1h "` to `"1h"` |
| **Phase 4** | `ReferenceCard.tsx` | Native `<img>` fallback | Replaced with HeroUI `Avatar` component |
| **Phase 5** | `GalleryTab.tsx` | `addToast` from `@heroui/react` | Changed to project utilities: `toastSuccess`, `toastError` |
| **Phase 5** | `AssetGrid.tsx` | No empty state | Added empty state component |
| **Phase 5** | `AssetCard.tsx` | No thumbnail error handling | Added `onError` handler with placeholder |
| **Phase 6** | `PaymentStatusCard.tsx` | Dynamic Tailwind class `text-${color}` | Added explicit `textClass` property to `STATUS_CONFIG` |
| **Phase 7** | `CancelOrderModal.tsx` | Native `<input type="checkbox">` | Replaced with HeroUI `Checkbox` component |
| **Phase 7** | `ServiceStep.tsx` | Native `<button onClick>` | Replaced with HeroUI `Card isPressable onPress` |
| **Phase 7** | `LocationStep.tsx` | Native `<button onClick>` | Replaced with HeroUI `Card isPressable onPress` |
| **Phase 7** | `ReviewStep.tsx` | Native `<button onClick>` | Replaced with HeroUI `Button onPress` |
| **Phase 7** | `CreateOrderWizard.tsx` | `addToast` pattern | Changed to `toastSuccess()`, `toastError()` |
| **Phase 7** | `OrderDetailPage.tsx` | `addToast` pattern | Changed to `toastWarning()` |

### Key Patterns Established

| Pattern | Correct Usage |
|---------|---------------|
| **Named exports** | `export function ComponentName() {}` — never `export default` |
| **Lazy loading** | `lazy(() => import('./X').then(m => ({ default: m.X })))` |
| **Interactive elements** | Always use `onPress`, never `onClick` |
| **Selectable cards** | Use `<Card isPressable onPress={...}>` |
| **Toast notifications** | Use `toastSuccess()`, `toastError()`, `toastWarning()` from `@/components/ui/toast` |
| **Dynamic Tailwind classes** | Use explicit class strings, never `text-${var}` or `bg-${var}` |
| **TanStack Router params** | Use `$paramName` syntax, not `:paramName` |
| **Phone links** | Use HeroUI `<Link href="tel:...">` not native `<a>` |

### Phase Status

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Foundation | ✅ Approved | Named exports, router syntax fixed |
| Phase 2: Orders List | ✅ Approved | `onPress` handlers fixed |
| Phase 3: Detail Structure | ✅ Approved | `useCallback` import fixed |
| Phase 4: Overview & Creative | ✅ Approved | Link, Avatar, duration fixes |
| Phase 5: Gallery Tab | ✅ Approved | Toast API, error handling, empty state |
| Phase 6: Billing & Activity | ✅ Approved | Dynamic Tailwind class fix |
| Phase 7: Actions & Modals | ✅ Approved | Native buttons→HeroUI, toast API |
| Phase 8: Polish & Integration | ✅ Approved | No issues found |

### Related Documents

- [V1.1 Backlog](./orders/V1_1_BACKLOG.md) — Features deferred to future sprints

---

## Architecture Overview

### Page Structure (Tabbed — Like Team Page)

```
/orders
├── Orders List (default view)
│   ├── Filters & Search
│   ├── Orders Table
│   └── Pagination
└── /orders/:id (Order Detail)
    ├── Order Header (ID, Status, Actions)
    └── Tabs:
        ├── Overview Tab (Timeline, Session, Location)
        ├── Creative Tab (Brief, References)
        ├── Gallery Tab (Assets, Accept/Reject, Revisions)
        ├── Billing Tab (Line Items, Payment, Invoice)
        └── Activity Tab (Audit Log, Comments)
```

### File Structure

```
src/
├── app/
│   └── orders/
│       ├── OrdersPage.tsx              # List page
│       ├── OrderDetailPage.tsx         # Detail page with tabs
│       ├── components/
│       │   ├── OrdersTable.tsx
│       │   ├── OrderTableRow.tsx
│       │   ├── OrderFilters.tsx
│       │   ├── OrderHeader.tsx
│       │   └── OrderTabs.tsx           # Tab navigation
│       ├── tabs/
│       │   ├── OverviewTab.tsx
│       │   ├── CreativeTab.tsx
│       │   ├── GalleryTab.tsx
│       │   ├── BillingTab.tsx
│       │   └── ActivityTab.tsx
│       └── modals/
│           ├── CancelOrderModal.tsx
│           ├── CreateOrderModal.tsx
│           └── RevisionRequestModal.tsx
├── data/
│   └── orders/
│       ├── mock-orders.ts
│       └── order-config.ts
├── hooks/
│   ├── useOrders.ts
│   └── useOrder.ts
└── types/
    └── order.types.ts
```

---

## Pre-Implementation Checklist

Before starting development:

- [ ] **HeroUI v3 Component Verification** — Run MCP checks for:
  - `get_component_info({ component: "Table" })`
  - `get_component_info({ component: "Badge" })` or `Chip`
  - `get_component_info({ component: "Tabs" })`
  - `get_component_info({ component: "TagGroup" })`
- [ ] **Mock Data** — Create `src/data/mock-orders.ts` with 20+ test scenarios
- [ ] **Gallery API Contract** — Confirm endpoints with media team
- [ ] **Permissions Model** — Define client permissions (view, cancel, request revision)

---

## Technical Standards (Mandatory)

### dev_instruction_v2.md Compliance

| Rule | Implementation |
|------|----------------|
| **Named exports only** | `export function OrdersPage() {}` — never `export default` |
| **Direct HeroUI imports** | `import { Card, Button, Tabs } from "@heroui/react"` |
| **Path aliases** | All imports use `@/` (e.g., `@/data/mock-orders`) |
| **`onPress` not `onClick`** | All interactive elements use `onPress` |
| **Strict TypeScript** | Zero `any` types. Define interfaces for all props |
| **No `use client`** | This is a Vite SPA — never use this directive |
| **Iconify gravity-ui** | `<Icon icon="gravity-ui:camera" />` |
| **Data in src/data/** | All mock data centralized |
| **Lazy loading** | All route components and modals lazy loaded |
| **Context splitting** | Separate `Context.ts` + `Provider.tsx` files |

### HeroUI v3 Beta 3 Patterns

| Pattern | Example |
|---------|---------|
| **Compound components** | `<Card><Card.Header>...</Card.Header></Card>` |
| **Tabs with dot notation** | `<Tabs><Tabs.List><Tabs.Tab>...</Tabs.Tab></Tabs.List><Tabs.Panel>...</Tabs.Panel></Tabs>` |
| **Button variants** | `variant="primary"`, `variant="secondary"`, `variant="ghost"` |
| **Avatar with fallback** | `<Avatar><Avatar.Image /><Avatar.Fallback /></Avatar>` |
| **Modal composition** | `<Modal><Modal.Content><Modal.Header /><Modal.Body /><Modal.Footer /></Modal.Content></Modal>` |
| **Form fields** | `<TextField><TextField.Label /><TextField.Input /><TextField.ErrorMessage /></TextField>` |

### DESIGN_SYSTEM.md Tokens

| Category | Tokens to Use |
|----------|---------------|
| **Backgrounds** | `bg-surface`, `bg-surface-secondary`, `bg-content1` |
| **Text** | `text-foreground`, `text-muted`, `text-muted-foreground` |
| **Borders** | `border-separator`, `border-default` |
| **Status** | `success`, `warning`, `danger`, `accent` |
| **Grey scale** | `grey-100` (light track), `grey-800` (dark track) |
| **Shadows** | `shadow-small`, `shadow-medium` |

---

## Reference Patterns (Team Page Reuse & SaaS Best Practices)

This section documents proven patterns from the Team Management page and industry SaaS best practices that **must be applied** to the Orders page for consistency.

### Team Page Components to Reuse

The following patterns have been battle-tested in the Team page and should be replicated:

| Pattern | Team Page File | Orders Page Equivalent | Notes |
|---------|----------------|------------------------|-------|
| **Tab Navigation** | `src/components/team/TeamTabs.tsx` | `OrderTabs.tsx` | Same config pattern with icons and labels |
| **Tab Content Lazy Loading** | `src/app/TeamPage.tsx` | `OrderDetailPage.tsx` | Suspense boundaries per tab |
| **Table Row with Actions** | `src/components/team/tabs/MembersTab.tsx` | `OrderTableRow.tsx` | Avatar + info + status + dropdown |
| **Filter Bar** | `src/components/team/activity/ActivityFilterBar.tsx` | `OrderFilters.tsx` | Search + dropdowns + active tags |
| **Timeline Component** | `src/components/team/tabs/ActivityTab.tsx` | `OrderTimeline.tsx` | Vertical timeline with icons |
| **Stats/Metric Cards** | `src/components/team/tabs/OverviewTab.tsx` | `OrdersPage.tsx` header | Bento-style cards with icons |
| **Modal Pattern** | `src/components/team/modals/InviteMemberModal.tsx` | `CreateOrderModal.tsx` | HeroUI Modal compound pattern |
| **useModal Hook** | `src/hooks/useModal.ts` | Reuse directly | `{ isOpen, open, close }` |
| **Status Badge** | Multiple files | `OrderStatusBadge.tsx` | Chip with color and icon |
| **Empty States** | `src/components/common/EmptyState.tsx` | Reuse for gallery, orders | Icon + message + CTA |
| **Progress Components** | `src/components/ui/Progress/` | Reuse for gallery upload | LinearProgress, CircularProgress |

### File References for Developers

Before implementing each Orders component, **study these Team page files first**:

```markdown
## Phase 1 (Foundation) — Study:
- src/types/team.types.ts          → Pattern for order.types.ts
- src/data/mock-team.ts            → Pattern for mock-orders.ts
- src/router.tsx                   → How TeamPage is lazy loaded

## Phase 2 (Orders List) — Study:
- src/components/team/tabs/MembersTab.tsx    → Table structure
- src/components/team/activity/ActivityFilterBar.tsx → Filter pattern
- src/app/TeamPage.tsx              → URL state handling

## Phase 3 (Tabs) — Study:
- src/components/team/TeamTabs.tsx  → Tab config and rendering
- src/app/TeamPage.tsx              → Suspense + lazy loading tabs

## Phase 4-6 (Tab Content) — Study:
- src/components/team/tabs/OverviewTab.tsx   → Bento grid layout
- src/components/team/tabs/ActivityTab.tsx   → Timeline + audit log
- src/components/team/tabs/BillingTab.tsx    → Line items + summary

## Phase 7 (Modals) — Study:
- src/components/team/modals/InviteMemberModal.tsx → Multi-step pattern
- src/components/team/modals/DeleteTeamModal.tsx   → Confirmation pattern
- src/hooks/useModal.ts             → Hook pattern
```

### SaaS Best Practices to Apply

These are industry-standard patterns for enterprise SaaS applications:

| Practice | Description | Implementation |
|----------|-------------|----------------|
| **Progressive Disclosure** | Don't overwhelm users; reveal complexity as needed | Tabbed interface hides sections; advanced filters in "More Filters" drawer |
| **Optimistic UI** | Update UI immediately, sync in background | Order cancel shows "Cancelling..." state immediately |
| **URL State Persistence** | Filters and tabs sync to URL for shareability | `?status=in_progress&tab=gallery` — user can share exact view |
| **Empty States with CTA** | Never show blank screens; guide users to action | "Create your first order" with primary button |
| **Skeleton Loading** | Show structure while loading | Skeleton rows for table, skeleton cards for tabs |
| **Debounced Search** | Don't spam API on every keystroke | 300ms debounce on search input |
| **Bulk Actions** | Let power users act on multiple items | Selection checkboxes + action bar when > 0 selected |
| **Contextual Actions** | Actions live near the data | Dropdown per row, not just in header |
| **Consistent Status Visualization** | Same colors = same meaning across app | `success` = green, `warning` = amber, `danger` = red |
| **Confirmation for Destructive Actions** | Prevent accidents | Cancel order requires modal confirmation |
| **Keyboard Shortcuts** | Power user efficiency | ↑/↓ navigate, Enter opens, Escape closes modals |
| **Responsive Tables** | Tables work on mobile | Horizontal scroll, or card view on small screens |
| **Relative Timestamps** | "2 hours ago" is friendlier than "2026-01-06 14:32:05" | Use `formatRelativeTime()` utility |
| **Audit Trail Visibility** | Users want to see history | Activity tab shows all status changes |

### Reusable Utilities from Codebase

These utilities already exist and should be imported, not recreated:

| Utility | Location | Usage |
|---------|----------|-------|
| `formatRelativeTime()` | `src/utils/date-utils.ts` | "2 hours ago", "Yesterday" |
| `formatDate()` | `src/utils/date-utils.ts` | "Jan 6, 2026" |
| `formatCurrency()` | `src/utils/format.ts` | "€1,234.56" |
| `getInitials()` | `src/utils/` | "JD" from "John Doe" |
| `cn()` | `src/utils/cn.ts` | Tailwind class merging |
| `useModal()` | `src/hooks/useModal.ts` | Modal state management |

### Visual Consistency Checklist

Before submitting any Orders page component, verify:

- [ ] **Same spacing** as Team page (padding, gaps match)
- [ ] **Same card styling** (`bg-content1` or `bg-surface`)
- [ ] **Same header layout** (title left, actions right)
- [ ] **Same tab style** (icons + labels, underline indicator)
- [ ] **Same table density** (row height, cell padding)
- [ ] **Same badge/chip usage** (status uses Chip, types use icons)
- [ ] **Same dropdown menu pattern** (icon-only trigger, right-aligned)
- [ ] **Same empty state pattern** (centered icon, message, CTA)
- [ ] **Same dark mode behavior** (all tokens tested)

---

## Component Hierarchy Diagram

This section provides a visual map of component parent-child relationships. Use this to understand data flow and component composition.

### Orders List Page (`/orders`)

```
OrdersPage
├── PageHeader
│   ├── Title ("Orders")
│   ├── Subtitle
│   └── ActionButtons
│       ├── Button [Export]
│       └── Button [New Order] → opens CreateOrderModal
│
├── StatsBar (optional)
│   ├── StatCard [Total Orders]
│   ├── StatCard [In Progress]
│   ├── StatCard [Awaiting Delivery]
│   └── StatCard [This Month Revenue]
│
├── OrderFilters
│   ├── SearchField (debounced)
│   ├── Select [Status]
│   ├── Select [Type]
│   ├── Select [Date Range]
│   ├── Button [More Filters] → opens FilterDrawer
│   ├── Button [Reset]
│   └── ActiveFilterTags
│       └── Tag [x] (removable)
│
├── BulkActionsBar (visible when rows selected)
│   ├── SelectionCount
│   ├── Button [Update Status]
│   ├── Button [Export]
│   └── Button [Cancel Orders] (danger)
│
├── OrdersTable
│   ├── TableHeader
│   │   ├── Checkbox (select all)
│   │   └── SortableColumn [Order, Client, Type, Status, Date, Location, Total, Payment]
│   │
│   ├── TableBody
│   │   └── OrderTableRow (× N)
│   │       ├── Checkbox
│   │       ├── OrderIdCell
│   │       │   ├── DisplayId
│   │       │   ├── Chip [API] (if source = api)
│   │       │   └── Chip [Urgent] (if priority = urgent)
│   │       ├── ClientCell
│   │       │   ├── Avatar
│   │       │   └── Name + Organisation
│   │       ├── TypeCell
│   │       │   └── Icon + Label
│   │       ├── StatusCell
│   │       │   └── OrderStatusBadge
│   │       ├── DateCell
│   │       ├── LocationCell
│   │       ├── TotalCell
│   │       ├── PaymentCell
│   │       │   └── Chip [Paid/Pending/etc]
│   │       └── ActionsCell
│   │           └── Dropdown
│   │               ├── MenuItem [View Details]
│   │               ├── MenuItem [Open Gallery]
│   │               ├── MenuItem [Download Invoice]
│   │               ├── Separator
│   │               └── MenuItem [Cancel Order] (danger)
│   │
│   └── EmptyState (when no orders)
│       ├── Icon
│       ├── Message
│       └── Button [Create Your First Order]
│
├── Pagination
│   ├── PageSizeSelect [10, 20, 50]
│   ├── Button [Previous]
│   ├── PageIndicator ("Page 1 of 63")
│   └── Button [Next]
│
└── Modals (lazy loaded, rendered conditionally)
    ├── CreateOrderModal
    │   ├── Modal.Header (with progress indicator)
    │   ├── Modal.Body
    │   │   └── WizardStep (1 of 5)
    │   │       ├── ServiceTypeStep
    │   │       ├── SessionDetailsStep
    │   │       ├── LocationStep
    │   │       ├── BriefStep
    │   │       └── ReviewStep
    │   └── Modal.Footer
    │       ├── Button [Back]
    │       └── Button [Next / Create Order]
    │
    └── CancelOrderModal (if bulk cancel)
```

### Order Detail Page (`/orders/:id`)

```
OrderDetailPage
├── Suspense (loading boundary)
│   └── Skeleton (while loading)
│
├── ErrorBoundary
│   └── ErrorState (if fetch fails)
│       ├── Icon
│       ├── Message
│       └── Button [Retry]
│
├── NotFoundState (if order doesn't exist)
│   ├── Icon
│   ├── Message
│   └── Button [Back to Orders]
│
├── OrderHeader
│   ├── BackButton → navigates to /orders
│   ├── OrderInfo
│   │   ├── DisplayId
│   │   ├── OrderStatusBadge
│   │   ├── Chip [AI] (if AI type)
│   │   └── CreatedMeta ("Created 2 hours ago by John")
│   └── ActionButtons
│       ├── Button [Contact Support]
│       ├── Button [Open Gallery] (if gallery exists)
│       └── Dropdown [More]
│           ├── MenuItem [Duplicate Order]
│           ├── MenuItem [Export Details]
│           ├── MenuItem [Download Invoice]
│           ├── Separator
│           └── MenuItem [Cancel Order] (danger)
│
├── OrderTabs
│   ├── Tabs.List
│   │   ├── Tabs.Tab [Overview] (icon + label)
│   │   ├── Tabs.Tab [Creative]
│   │   ├── Tabs.Tab [Gallery]
│   │   ├── Tabs.Tab [Billing]
│   │   └── Tabs.Tab [Activity]
│   │
│   └── Tabs.Panels
│       │
│       ├── OverviewTab
│       │   ├── OrderTimeline
│       │   │   └── TimelineEvent (× N)
│       │   │       ├── StatusIcon
│       │   │       ├── EventTitle
│       │   │       ├── Timestamp
│       │   │       ├── ActorAvatar
│       │   │       └── Note (optional)
│       │   │
│       │   ├── SessionSection
│       │   │   ├── ServiceType
│       │   │   ├── DateTime
│       │   │   ├── Duration
│       │   │   ├── Deliverables
│       │   │   ├── Equipment (Chip list)
│       │   │   ├── Style (Chip list)
│       │   │   ├── SpecialRequirements
│       │   │   └── RescheduleAlert (if rescheduled)
│       │   │
│       │   └── LocationSection
│       │       ├── RemoteIndicator (if remote)
│       │       ├── Address
│       │       ├── ContactPerson
│       │       └── AccessNotes
│       │
│       ├── CreativeTab
│       │   └── CreativeBriefSection
│       │       ├── BriefDescription
│       │       ├── ReferencesGrid
│       │       │   └── ReferenceCard (× N)
│       │       └── ApprovalBadge
│       │
│       ├── GalleryTab
│       │   ├── GalleryStatusBanner
│       │   ├── DeliveryInfo
│       │   │   ├── Formats
│       │   │   ├── Resolution
│       │   │   └── DownloadCount
│       │   │
│       │   ├── AssetGrid
│       │   │   └── AssetCard (× N)
│       │   │       ├── Thumbnail
│       │   │       ├── Checkbox (selection)
│       │   │       ├── AIBadge (if AI-generated)
│       │   │       ├── VideoIcon (if video)
│       │   │       └── StatusIndicator (accepted/rejected)
│       │   │
│       │   ├── GallerySelectionBar (fixed, visible when selected)
│       │   │   ├── SelectionCount
│       │   │   ├── Button [Accept Selected]
│       │   │   ├── Button [Request Revision]
│       │   │   └── Button [Accept All]
│       │   │
│       │   ├── RevisionsSection
│       │   │   └── RevisionCard (× N)
│       │   │
│       │   └── EmptyState (if no gallery)
│       │
│       ├── BillingTab
│       │   ├── LineItemsTable
│       │   │   └── LineItemRow (× N)
│       │   │       ├── Description + TypeBadge
│       │   │       ├── Quantity
│       │   │       ├── UnitPrice
│       │   │       └── Total
│       │   │
│       │   ├── DiscountsSection
│       │   │   └── DiscountRow (× N)
│       │   │
│       │   └── BillingSummary
│       │       ├── Subtotal
│       │       ├── VAT
│       │       ├── Total
│       │       ├── PaymentStatus
│       │       ├── PaymentMethod
│       │       ├── PaidDate
│       │       ├── RefundsSection (if any)
│       │       └── Button [Download Invoice]
│       │
│       └── ActivityTab
│           ├── AuditLog
│           │   └── AuditEntry (× N)
│           │       ├── ActorAvatar
│           │       ├── Description
│           │       ├── Timestamp
│           │       └── MetadataAccordion (if API event)
│           │
│           ├── Separator
│           │
│           └── CommentsSection
│               ├── CommentsList
│               │   └── Comment (× N)
│               │       ├── Avatar
│               │       ├── Author + Timestamp
│               │       ├── InternalBadge (if internal)
│               │       └── Content
│               │
│               └── AddCommentForm
│                   ├── TextArea
│                   ├── Checkbox [Internal only]
│                   └── Button [Post Comment]
│
└── Modals (lazy loaded)
    ├── CancelOrderModal
    │   ├── Modal.Header
    │   ├── Modal.Body
    │   │   ├── WarningMessage
    │   │   └── ReasonSelect
    │   └── Modal.Footer
    │       ├── Button [Keep Order]
    │       └── Button [Cancel Order] (danger)
    │
    ├── RevisionRequestModal
    │   ├── Modal.Header
    │   ├── Modal.Body
    │   │   ├── SelectedAssetsList
    │   │   └── TextArea [Revision Description]
    │   └── Modal.Footer
    │       ├── Button [Cancel]
    │       └── Button [Submit Request]
    │
    └── AssetLightbox (optional)
        ├── CloseButton
        ├── AssetViewer (image/video)
        ├── NavigationArrows
        ├── AssetMetadata
        └── ActionButtons
            ├── Button [Download]
            ├── Button [Accept]
            └── Button [Reject]
```

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         App (router.tsx)                         │
│                              │                                   │
│         ┌────────────────────┴────────────────────┐              │
│         │                                         │              │
│         ▼                                         ▼              │
│   OrdersPage                              OrderDetailPage        │
│         │                                         │              │
│         │ useOrders()                             │ useOrder(id) │
│         │    │                                    │    │         │
│         ▼    ▼                                    ▼    ▼         │
│   ┌──────────────┐                         ┌──────────────┐      │
│   │  Mock Data   │ ◄──────────────────────►│  Mock Data   │      │
│   │  (Phase 1)   │                         │  (Phase 1)   │      │
│   └──────────────┘                         └──────────────┘      │
│         │                                         │              │
│         │ Future: API                             │ Future: API  │
│         ▼                                         ▼              │
│   ┌──────────────┐                         ┌──────────────┐      │
│   │  Backend API │                         │ Gallery API  │      │
│   │  /api/orders │                         │ (microservice)│     │
│   └──────────────┘                         └──────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

### Component Dependencies

| Component | Depends On | Used By |
|-----------|------------|---------|
| `OrderStatusBadge` | `order-config.ts` | `OrderTableRow`, `OrderHeader` |
| `OrderTableRow` | `OrderStatusBadge`, `Avatar`, `Dropdown` | `OrdersTable` |
| `OrderFilters` | `SearchField`, `Select`, `TagGroup` | `OrdersPage` |
| `OrderTabs` | `Tabs` (HeroUI), `order-config.ts` | `OrderDetailPage` |
| `OrderTimeline` | `Avatar`, `Card` | `OverviewTab` |
| `AssetCard` | `Checkbox`, `Chip` | `AssetGrid` |
| `AssetGrid` | `AssetCard` | `GalleryTab` |
| `GallerySelectionBar` | `Button` | `GalleryTab` |
| `LineItemsTable` | — | `BillingTab` |
| `BillingSummary` | `formatCurrency()` | `BillingTab` |
| `AuditLog` | `Avatar`, `Accordion` | `ActivityTab` |
| `CreateOrderModal` | Multiple step components | `OrdersPage` |

---

## User Flows

This section documents the key user journeys through the Orders page. Each flow identifies the happy path, decision points, and error states.

### Flow 1: Browse and Find an Order

**Goal:** Client wants to find a specific order quickly.

```
START: Client lands on /orders
  │
  ├─► Page loads with skeleton
  │     └─► Data fetches (useOrders)
  │           ├─► Success: Table renders with orders
  │           └─► Error: Error state with "Retry" button
  │
  ├─► Client uses Search
  │     └─► Types order ID or client name
  │           └─► Debounce (300ms)
  │                 └─► Table filters in real-time
  │                       └─► URL updates: ?search=ORD-2025
  │
  ├─► Client uses Filters
  │     ├─► Selects Status: "In Progress"
  │     ├─► Selects Type: "Photo"
  │     └─► URL updates: ?status=in_progress&type=photo
  │           └─► Table filters
  │                 ├─► Results found: Shows filtered orders
  │                 └─► No results: Empty state with "Clear Filters"
  │
  ├─► Client clicks on order row
  │     └─► Navigates to /orders/:id
  │
  └─► END: Order detail page loads
```

**Keyboard Shortcuts:**

- `⌘ + F` → Focus search field
- `↑ / ↓` → Navigate table rows
- `Enter` → Open selected order
- `Esc` → Clear search

---

### Flow 2: Review Gallery and Accept/Reject Photos

**Goal:** Client reviews delivered photos and accepts or requests revisions.

```
START: Client on Order Detail page, Gallery tab
  │
  ├─► Gallery status check
  │     ├─► Status: "pending" → Shows "Gallery not ready" message
  │     ├─► Status: "processing" → Shows "Processing..." with spinner
  │     └─► Status: "ready" → Shows asset grid
  │
  ├─► Client browses assets
  │     ├─► Clicks thumbnail → Opens lightbox (optional)
  │     └─► Scrolls through grid
  │
  ├─► DECISION: Accept or Reject?
  │     │
  │     ├─► [Accept All]
  │     │     └─► Click "Accept All" button
  │     │           └─► Confirmation toast
  │     │                 └─► All assets marked "accepted"
  │     │                       └─► Gallery status → "delivered"
  │     │
  │     ├─► [Accept Selected]
  │     │     ├─► Client selects individual photos (checkbox)
  │     │     │     └─► Selection bar appears at bottom
  │     │     │           └─► Shows count: "5 selected"
  │     │     └─► Click "Accept Selected"
  │     │           └─► Selected assets marked "accepted"
  │     │
  │     └─► [Request Revision]
  │           ├─► Client selects photos to revise
  │           │     └─► Selection bar appears
  │           └─► Click "Request Revision"
  │                 └─► RevisionRequestModal opens
  │                       ├─► Shows selected assets list
  │                       ├─► Client enters revision description
  │                       └─► Click "Submit Request"
  │                             ├─► Success: Toast + Modal closes
  │                             │     └─► Revision appears in history
  │                             └─► Error: Error message in modal
  │
  └─► END: Assets accepted or revision requested
```

**Edge Cases:**

- Mixed selection (some accepted, some rejected) → Both actions available
- All already accepted → "Accept" buttons disabled
- Pending revision → Show warning banner

---

### Flow 3: Create New Order

**Goal:** Client creates a new photography/video order.

```
START: Client on /orders page
  │
  ├─► Click "New Order" button
  │     └─► CreateOrderModal opens
  │
  ├─► Step 1: Service Type
  │     ├─► Select: Photo / Video / Hybrid / AI
  │     └─► Click "Next"
  │           └─► Validation: Type required
  │
  ├─► Step 2: Session Details
  │     ├─► Select date (DatePicker)
  │     ├─► Select time (TimePicker)
  │     ├─► Select duration (1h, 2h, 4h, etc.)
  │     ├─► Enter deliverables count (optional)
  │     └─► Click "Next"
  │           └─► Validation: Date and time required
  │
  ├─► Step 3: Location
  │     ├─► Toggle: Remote or On-site
  │     │     ├─► Remote: No address needed
  │     │     └─► On-site: Address fields appear
  │     │           ├─► Venue name (optional)
  │     │           ├─► Street address
  │     │           ├─► City, Country
  │     │           └─► Contact person (optional)
  │     └─► Click "Next"
  │           └─► Validation: Address required if on-site
  │
  ├─► Step 4: Creative Brief
  │     ├─► Enter brief description (TextArea)
  │     ├─► Add reference URLs (optional)
  │     ├─► Upload reference files (optional, placeholder for v1)
  │     └─► Click "Next"
  │
  ├─► Step 5: Review
  │     ├─► Shows summary of all entered data
  │     ├─► Edit buttons per section → Goes back to that step
  │     └─► Click "Create Order"
  │           ├─► Loading state
  │           ├─► Success:
  │           │     └─► Toast: "Order created successfully"
  │           │           └─► Modal closes
  │           │                 └─► Navigates to /orders/:newId
  │           └─► Error:
  │                 └─► Error message in modal
  │                       └─► User can retry
  │
  └─► END: Order created with status "pending_confirmation"
```

**Back Navigation:**

- Each step has "Back" button
- Form state persists when going back
- Closing modal shows confirmation if form has data

---

### Flow 4: Cancel an Order

**Goal:** Client cancels an order (before completion).

```
START: Client on Order Detail page
  │
  ├─► Check: Can order be cancelled?
  │     ├─► Status: draft, pending_confirmation, confirmed, scheduled → ✅ Can cancel
  │     ├─► Status: in_progress, editing, review → ⚠️ Warning: May incur fees
  │     └─► Status: delivered, completed, cancelled, refunded → ❌ Cannot cancel
  │
  ├─► Client clicks "More" dropdown
  │     └─► Selects "Cancel Order"
  │           └─► CancelOrderModal opens
  │
  ├─► Modal shows:
  │     ├─► Warning message with order ID
  │     ├─► Reason dropdown (required)
  │     │     ├─► "Change of plans"
  │     │     ├─► "Found alternative"
  │     │     ├─► "Budget constraints"
  │     │     ├─► "Event cancelled"
  │     │     └─► "Other"
  │     └─► Optional: Additional notes
  │
  ├─► Client clicks "Cancel Order" (danger button)
  │     ├─► Loading state
  │     ├─► Success:
  │     │     └─► Toast: "Order cancelled"
  │     │           └─► Navigates to /orders
  │     │                 └─► Order now shows "Cancelled" status
  │     └─► Error:
  │           └─► Error message in modal
  │
  └─► END: Order status → "cancelled"
```

**Safeguards:**

- Confirmation required (modal)
- Reason required (prevents accidental cancels)
- Cannot cancel delivered/completed orders

---

### Flow 5: View Order Details and Timeline

**Goal:** Client checks order status and history.

```
START: Client navigates to /orders/:id
  │
  ├─► Page loads
  │     ├─► Skeleton while loading
  │     └─► Order data fetches
  │           ├─► Success: Renders order
  │           ├─► Not found: 404 state with "Back to Orders"
  │           └─► Error: Error state with "Retry"
  │
  ├─► Header shows:
  │     ├─► Order ID (ORD-2025-0001)
  │     ├─► Status badge (e.g., "In Progress")
  │     ├─► Created timestamp
  │     └─► Action buttons
  │
  ├─► Overview Tab (default)
  │     ├─► Timeline section
  │     │     └─► Shows status progression:
  │     │           ✓ Order Created (Jan 5, 10:00 AM)
  │     │           ✓ Confirmed (Jan 5, 10:30 AM)
  │     │           ✓ Pro Assigned (Jan 5, 2:00 PM)
  │     │           → Scheduled (Jan 10, 9:00 AM) ← Current
  │     │           ○ In Progress (Pending)
  │     │           ○ Editing (Pending)
  │     │           ○ Delivered (Pending)
  │     │
  │     ├─► Session Details
  │     │     └─► Date, time, duration, deliverables
  │     │
  │     └─► Location
  │           └─► Address or "Remote"
  │
  ├─► Client switches tabs via URL
  │     ├─► Clicks "Creative" → /orders/:id?tab=creative
  │     ├─► Clicks "Gallery" → /orders/:id?tab=gallery
  │     ├─► Clicks "Billing" → /orders/:id?tab=billing
  │     └─► Clicks "Activity" → /orders/:id?tab=activity
  │
  └─► END: Client has full visibility of order status
```

**Real-time Updates (Future):**

- Webhook triggers backend update
- Frontend polls or receives push
- Status automatically updates with animation

---

### Flow Summary Table

| Flow | Primary Action | Success State | Error State | Phase |
|------|---------------|---------------|-------------|-------|
| **Browse & Find** | Search/Filter | Order list filtered | Empty state or error | Phase 2 |
| **Accept/Reject Gallery** | Select + Accept/Reject | Assets marked, revision created | Toast error | Phase 5 |
| **Create Order** | Multi-step wizard | Order created, redirected | Modal error | Phase 7 |
| **Cancel Order** | Modal confirmation | Status = cancelled | Modal error | Phase 7 |
| **View Details** | Navigate tabs | Data displayed | 404 or error state | Phase 3-6 |

---

## Edge Cases

This section documents edge case scenarios that must be handled in each phase. Use this as a testing checklist.

### Phase 1 Edge Cases (Foundation)

| Scenario | Expected Behavior | Component |
|----------|-------------------|-----------|
| Order with missing optional fields | Display "—" or hide section, no errors | Type definitions |
| Order with null `gallery` | Gallery tab shows empty state | Type definitions |
| Order with null `assignedTo` | "Not assigned" shown (valid for client view) | Mock data |
| Order with 0 line items | Billing tab shows "No charges" | Mock data |
| Order with very long `displayId` | Truncate with ellipsis | Type definitions |
| Order with `source: 'api'` but no `apiOrderId` | Don't show API badge | Config logic |
| Invalid status value | Fallback to "Unknown" status | `getStatusConfig()` |
| Invalid type value | Fallback to "Other" type | `getTypeConfig()` |

---

### Phase 2 Edge Cases (Orders List)

| Scenario | Expected Behavior | Component |
|----------|-------------------|-----------|
| 0 orders returned | Empty state: "Create your first order" | `OrdersTable` |
| 1000+ orders | Pagination works, no performance issues | `useOrders` |
| Search returns 0 results | Empty state: "No orders found" + Clear filters | `OrdersTable` |
| Search with special characters | Escape properly, no XSS | `OrderFilters` |
| Filter combination returns 0 | Empty state with active filter tags | `OrderFilters` |
| Filter + pagination | Filters persist across pages | `useOrders` |
| Sort by column with null values | Nulls sort last | `useOrders` |
| Offline / network error | Error state with retry button | `OrdersPage` |
| User refreshes with URL params | Filters restored from URL | Router |
| Clicking row during loading | Ignore click or show loading | `OrderTableRow` |
| Order with very long client name | Truncate with ellipsis in cell | `OrderTableRow` |
| Order with no session date | Show "Not scheduled" | `OrderTableRow` |
| Order with unknown payment status | Show "—" or default chip | `OrderTableRow` |
| Bulk select 100+ orders | Performance OK, actions still work | Selection state |

---

### Phase 3 Edge Cases (Detail Structure & Tabs)

| Scenario | Expected Behavior | Component |
|----------|-------------------|-----------|
| Invalid order ID in URL | 404 state: "Order not found" | `OrderDetailPage` |
| UUID format but doesn't exist | 404 state | `useOrder` |
| Non-UUID format in URL | 404 state or redirect | Router |
| Order loads slowly (>3s) | Skeleton shows, no timeout | `OrderDetailPage` |
| Tab param in URL is invalid | Default to Overview tab | `OrderTabs` |
| User navigates away mid-load | Cancel fetch, no errors | `useOrder` |
| Back button pressed quickly | No race conditions | Navigation |
| Deep link to specific tab | Tab opens correctly | Router |
| Order status changes while viewing | UI should update (future: polling) | State |
| Very long order ID display | Truncate in header | `OrderHeader` |

---

### Phase 4 Edge Cases (Overview & Creative)

| Scenario | Expected Behavior | Component |
|----------|-------------------|-----------|
| Timeline with 0 events | Show "Order created" as minimum | `OrderTimeline` |
| Timeline with 20+ events | Scrollable or paginated | `OrderTimeline` |
| Event with no actor | Show system icon | `TimelineEvent` |
| Event with very long note | Truncate with "Show more" | `TimelineEvent` |
| Session with no date (draft) | Show "Date not set" | `SessionSection` |
| Session with past date | No special styling (already happened) | `SessionSection` |
| Location type: remote | Hide address section, show "Remote" | `LocationSection` |
| Location with no contact person | Hide contact section | `LocationSection` |
| Location with very long address | Wrap, don't truncate | `LocationSection` |
| Creative brief is empty | Show placeholder: "No brief provided" | `CreativeBriefSection` |
| Brief has 10+ references | Grid layout, all visible | `CreativeBriefSection` |
| Reference URL is broken | Show link anyway, let user click | `ReferenceCard` |
| Brief contains markdown/HTML | Sanitize, render as plain text | `CreativeBriefSection` |
| Brief approval: pending | Show "Awaiting approval" badge | `CreativeBriefSection` |

---

### Phase 5 Edge Cases (Gallery)

| Scenario | Expected Behavior | Component |
|----------|-------------------|-----------|
| Gallery status: pending | Show "Gallery not ready" message | `GalleryTab` |
| Gallery status: processing | Show spinner + "Processing..." | `GalleryTab` |
| Gallery with 0 assets | Empty state: "No assets yet" | `AssetGrid` |
| Gallery with 500+ assets | Lazy load, virtual scroll or pagination | `AssetGrid` |
| Asset thumbnail fails to load | Show placeholder image | `AssetCard` |
| Asset is video but no thumbnail | Show video icon placeholder | `AssetCard` |
| Select 0 assets, click Accept | Disable Accept button | `GallerySelectionBar` |
| Select all → deselect one | Count updates, "Select All" unchecked | Selection logic |
| All assets already accepted | Disable Accept buttons, show message | `GalleryTab` |
| Some accepted, some pending | Show mixed state correctly | `AssetCard` |
| Request revision with empty text | Validation error in modal | `RevisionRequestModal` |
| Request revision with 100+ assets | List scrollable in modal | `RevisionRequestModal` |
| Revision pending, user tries to accept rejected | Allow (revision is separate) | Logic |
| Network error during accept | Toast error, revert optimistic UI | `useGallery` |
| Gallery microservice down | Error state with retry | `GalleryTab` |

---

### Phase 6 Edge Cases (Billing & Activity)

| Scenario | Expected Behavior | Component |
|----------|-------------------|-----------|
| 0 line items | Show "No charges" | `LineItemsTable` |
| 50+ line items | Scrollable table | `LineItemsTable` |
| Discount > subtotal | Total shows €0.00, not negative | `BillingSummary` |
| Multiple discounts | All listed, applied correctly | `BillingSummary` |
| Currency not EUR | Format correctly (USD, GBP) | `formatCurrency()` |
| Payment status: refunded | Show refund details section | `BillingSummary` |
| Invoice URL is null | Disable download button | `BillingSummary` |
| Audit log has 100+ entries | Paginated or "Load more" | `AuditLog` |
| Audit log entry has huge metadata | Accordion collapsed, expandable | `AuditEntry` |
| 0 comments | Show "No comments yet" | `CommentsSection` |
| Comment with 1000+ characters | Wrap, don't truncate | `Comment` |
| Internal comment | Only visible with proper badge | `Comment` |
| Add comment fails | Toast error, text preserved | `AddCommentForm` |
| User submits empty comment | Validation prevents submit | `AddCommentForm` |

---

### Phase 7 Edge Cases (Actions & Modals)

| Scenario | Expected Behavior | Component |
|----------|-------------------|-----------|
| Cancel order that's already cancelled | Button disabled or hidden | `CancelOrderModal` |
| Cancel order in progress | Warning about fees | `CancelOrderModal` |
| Cancel without selecting reason | Validation error | `CancelOrderModal` |
| Cancel API fails | Toast error, modal stays open | `CancelOrderModal` |
| Create order: close wizard mid-way | Confirmation dialog if data entered | `CreateOrderModal` |
| Create order: back on step 1 | Back button disabled or closes modal | Wizard navigation |
| Create order: skip optional fields | Works, fields default to null | Validation |
| Create order: date in the past | Validation error | `SessionDetailsStep` |
| Create order: same day session | Warning: "Rush fee may apply" | `SessionDetailsStep` |
| Create order: remote + address | Address ignored, only remote stored | `LocationStep` |
| Create order: submission fails | Error in modal, can retry | `CreateOrderModal` |
| Create duplicate order | Prefill from original order | Future feature |
| Revision request fails mid-submit | Toast error, modal stays open | `RevisionRequestModal` |

---

### Phase 8 Edge Cases (Polish & Integration)

| Scenario | Expected Behavior | Component |
|----------|-------------------|-----------|
| User has no orders at all | Full-page empty state with CTA | `OrdersPage` |
| User only has cancelled orders | Normal table, filters work | `OrdersPage` |
| Extremely slow connection | Loading states persist, no timeouts | All components |
| User double-clicks submit | Prevent double submission | All modals |
| User spams keyboard navigation | Debounced, no performance issues | Table navigation |
| Screen reader: table navigation | Announce row content correctly | Accessibility |
| Screen reader: status changes | Live region announces | Accessibility |
| Print order detail | Optimize for print (future) | `OrderDetailPage` |
| Share URL with invalid tab | Default to Overview | Router |
| Mobile: very small screen | Horizontal scroll or card view | Responsive |
| Dark mode: all edge cases | No white text on white background | All components |

---

### Edge Case Summary

| Category | Count | Covered In |
|----------|-------|------------|
| Data edge cases (null, empty, invalid) | ~25 | Phase 1, 4-6 |
| Network/error handling | ~15 | Phase 2, 5-7 |
| UI/UX edge cases | ~20 | Phase 2-8 |
| Validation edge cases | ~15 | Phase 5, 7 |
| Accessibility edge cases | ~10 | Phase 8 |
| **Total** | **~85** | All phases |

---

## Mobile Breakpoint Specifications

This section defines responsive behavior for all Orders page components across device sizes.

### Breakpoint Definitions

| Breakpoint | Width | Target Device | CSS Variable |
|------------|-------|---------------|--------------|
| **xs** | < 480px | Small phones | `--screen-xs` |
| **sm** | 480px – 767px | Large phones | `--screen-sm` |
| **md** | 768px – 1023px | Tablets | `--screen-md` |
| **lg** | 1024px – 1279px | Small laptops | `--screen-lg` |
| **xl** | ≥ 1280px | Desktops | `--screen-xl` |

### Orders List Page Responsive Behavior

| Component | xl/lg (Desktop) | md (Tablet) | sm/xs (Mobile) |
|-----------|-----------------|-------------|----------------|
| **PageHeader** | Title + Actions side-by-side | Same | Title above, actions below |
| **StatsBar** | 4 cards horizontal | 2×2 grid | 2×2 grid or stacked |
| **OrderFilters** | All filters inline | Search + dropdown | Search only + "Filters" button → Drawer |
| **ActiveFilterTags** | Inline with filters | Below filters | Below filters |
| **OrdersTable** | Full table, 8 columns | 5 columns (hide Location, Payment) | Card view OR horizontal scroll |
| **Checkbox column** | Visible | Visible | Hidden (no bulk select) |
| **Actions dropdown** | Inline | Inline | Bottom sheet on row tap |
| **Pagination** | Full controls | Compact | Prev/Next only |

### Order Detail Page Responsive Behavior

| Component | xl/lg (Desktop) | md (Tablet) | sm/xs (Mobile) |
|-----------|-----------------|-------------|----------------|
| **OrderHeader** | Back + Info + Actions inline | Same | Stacked: Back, then Info, then Actions |
| **OrderTabs** | Horizontal tabs with icons | Horizontal, icons only | Horizontal scroll, icons only |
| **Tab Panels** | Full width below tabs | Same | Same |

### Overview Tab Responsive Behavior

| Component | xl/lg (Desktop) | md (Tablet) | sm/xs (Mobile) |
|-----------|-----------------|-------------|----------------|
| **Layout** | 2-column (Timeline + Details) | 2-column | Single column (stacked) |
| **Timeline** | Left column, vertical | Left column | Full width, above details |
| **Session + Location** | Right column cards | Right column | Full width, below timeline |

### Gallery Tab Responsive Behavior

| Component | xl/lg (Desktop) | md (Tablet) | sm/xs (Mobile) |
|-----------|-----------------|-------------|----------------|
| **AssetGrid** | 6 columns | 4 columns | 2 columns |
| **AssetCard** | Checkbox always visible | Checkbox on hover | Checkbox always visible |
| **GallerySelectionBar** | Fixed bottom, full width | Same | Full width, taller touch targets |
| **Lightbox** | Centered modal | Edge-to-edge | Full screen |

### Billing Tab Responsive Behavior

| Component | xl/lg (Desktop) | md (Tablet) | sm/xs (Mobile) |
|-----------|-----------------|-------------|----------------|
| **Layout** | 2-column (Table + Summary) | 2-column | Single column (stacked) |
| **LineItemsTable** | Full table | Scrollable | Card view per item |
| **BillingSummary** | Sidebar card | Sidebar card | Full width below table |

### Modals Responsive Behavior

| Modal | xl/lg (Desktop) | md (Tablet) | sm/xs (Mobile) |
|-------|-----------------|-------------|----------------|
| **CreateOrderModal** | Centered, max-width 600px | Centered, 90% width | Full screen (drawer) |
| **CancelOrderModal** | Centered, max-width 400px | Centered | Bottom sheet |
| **RevisionRequestModal** | Centered, max-width 500px | Centered | Full screen |
| **AssetLightbox** | Centered, max 90vw/90vh | Same | Full screen |

### Touch Considerations (sm/xs)

- Minimum tap target: **44px × 44px**
- Buttons: Full width on mobile
- Dropdowns: Replace with bottom sheets
- Swipe gestures: Swipe left on table row for actions (optional)
- Pull-to-refresh: On orders list (optional)

---

## Simplified v1 Scope

Based on the complexity analysis, the following features have been **simplified for v1** to reduce scope and accelerate delivery. Full features can be added in v1.1 or v2.

### Gallery Tab — Simplified v1

| v1 (Simplified) | v1.1 (Full) |
|-----------------|-------------|
| **Accept All** button only | Individual asset selection |
| **Reject All with note** (opens modal) | Select specific assets to reject |
| No shift+click range selection | Range selection with shift+click |
| Single status: accepted or revision_requested | Per-asset status tracking |
| Grid view only | Grid + List view toggle |
| No lightbox | Full lightbox with navigation |
| Thumbnail click → opens in new tab | Inline lightbox viewer |
| No download button | Download single or bulk |

**v1 Gallery Workflow:**

```
1. Gallery ready → Client views grid
2. Client clicks "Accept All" → All accepted, done
3. OR Client clicks "Request Revision"
   → Modal opens with textarea
   → Client describes issues
   → Submit creates revision request (all assets)
4. After revision delivered → Repeat
```

**Components to SKIP in v1:**

- `GallerySelectionBar` — replaced by simpler action buttons
- `AssetLightbox` — thumbnails link out
- Individual selection checkboxes — all-or-nothing

---

### Create Order Wizard — Simplified v1

| v1 (Simplified) | v1.1 (Full) |
|-----------------|-------------|
| **3 steps** (combined) | 5 steps (original) |
| No file upload for references | File upload to S3/GCS |
| URL references only | URL + file references |
| Basic validation | Rich validation with inline errors |
| No draft saving | Save draft between steps |
| Required fields only | Optional equipment, style fields |

**v1 Wizard Steps:**

```
Step 1: Service & Session
├── Service type (required)
├── Date (required)
├── Time (required)
└── Duration (required)

Step 2: Location & Brief
├── Remote toggle
├── Address (if on-site)
├── Brief description (required)
└── Reference URLs (optional)

Step 3: Review & Submit
├── Summary of all data
├── Edit buttons per section
└── Create Order button
```

**Components to SKIP in v1:**

- `BriefStep` — merged into Step 2
- File upload components
- Draft auto-save
- `LocationStep` separate component — merged into Step 2

---

### Activity Tab — Simplified v1

| v1 (Simplified) | v1.1 (Full) |
|-----------------|-------------|
| **Audit log only** | Audit log + Comments |
| No add comment form | Add comment with internal toggle |
| No metadata expansion | Expandable metadata accordion |
| Timeline chronological only | Filter by event type |
| 20 most recent events | Pagination / Load more |

**v1 Activity Tab:**

- Shows chronological list of status changes
- Actor avatar + name + action + timestamp
- No interactivity (read-only)

**Components to SKIP in v1:**

- `CommentsSection`
- `AddCommentForm`
- `MetadataAccordion`
- Filter by event type

---

### Component Count Reduction

| Area | Original v1 | Simplified v1 | Saved |
|------|-------------|---------------|-------|
| Gallery Tab | 7 components | 3 components | 4 |
| Create Order | 7 components | 4 components | 3 |
| Activity Tab | 4 components | 1 component | 3 |
| **Total Saved** | — | — | **10 components** |

### Estimated LOC Reduction

| Phase | Original | Simplified | Saved |
|-------|----------|------------|-------|
| Phase 5 (Gallery) | ~1200 | ~500 | ~700 |
| Phase 7 (Wizard) | ~1000 | ~600 | ~400 |
| Phase 6 (Activity) | ~400 | ~150 | ~250 |
| **Total** | ~2600 | ~1250 | **~1350 LOC** |

---

## Test Requirements

This section defines testing expectations for each phase. Tests should be written alongside feature development.

### Testing Strategy

| Layer | Tool | Coverage Target |
|-------|------|-----------------|
| **Unit Tests** | Vitest | Hooks, utilities, config functions |
| **Component Tests** | Vitest + React Testing Library | All reusable components |
| **Integration Tests** | Vitest + RTL | Page-level flows |
| **E2E Tests** | Playwright (optional) | Critical user paths |
| **Visual Regression** | Storybook + Chromatic (optional) | Design consistency |

### Phase 1 Test Requirements

| Test | Type | What to Test |
|------|------|--------------|
| `order.types.ts` | TypeScript compiler | Types compile without errors |
| `getStatusConfig()` | Unit | Returns correct config for all statuses |
| `getTypeConfig()` | Unit | Returns correct config for all types |
| `mock-orders.ts` | Unit | Mock data validates against types |
| `OrdersPage` | Component | Renders without errors |
| `OrderDetailPage` | Component | Renders without errors |

**Minimum for Phase 1:** 5 unit tests, 2 component tests

---

### Phase 2 Test Requirements

| Test | Type | What to Test |
|------|------|--------------|
| `useOrders` hook | Unit | Returns orders, handles loading/error |
| `useOrders` filters | Unit | Filters apply correctly |
| `useOrders` sorting | Unit | Sorts by all columns |
| `useOrders` pagination | Unit | Page changes work |
| `OrderFilters` | Component | Renders all filter controls |
| `OrderFilters` | Component | Fires filter change events |
| `OrdersTable` | Component | Renders rows correctly |
| `OrderTableRow` | Component | Displays all cell data |
| `OrderTableRow` | Component | `onPress` navigates |
| `OrderStatusBadge` | Component | Shows correct color/icon |
| **Empty state** | Component | Shows when no orders |
| **URL sync** | Integration | Filters persist in URL |

**Minimum for Phase 2:** 8 unit tests, 6 component tests

---

### Phase 3 Test Requirements

| Test | Type | What to Test |
|------|------|--------------|
| `useOrder` hook | Unit | Fetches order by ID |
| `useOrder` hook | Unit | Handles not found |
| `useOrder` hook | Unit | Handles error |
| `OrderHeader` | Component | Displays order info |
| `OrderHeader` | Component | Back button navigates |
| `OrderTabs` | Component | Renders all tabs |
| `OrderTabs` | Component | Tab switching works |
| **Tab URL sync** | Integration | Tab state persists in URL |
| **404 state** | Component | Shows not found message |

**Minimum for Phase 3:** 4 unit tests, 5 component tests

---

### Phase 4 Test Requirements

| Test | Type | What to Test |
|------|------|--------------|
| `OverviewTab` | Component | Renders timeline + sections |
| `OrderTimeline` | Component | Renders events in order |
| `TimelineEvent` | Component | Shows status icon, timestamp |
| `SessionSection` | Component | Displays session details |
| `LocationSection` | Component | Handles remote vs on-site |
| `CreativeTab` | Component | Renders brief |
| `CreativeBriefSection` | Component | Shows references |

**Minimum for Phase 4:** 7 component tests

---

### Phase 5 Test Requirements (Simplified v1)

| Test | Type | What to Test |
|------|------|--------------|
| `useGallery` hook | Unit | Fetches assets |
| `useGallery` hook | Unit | Handles empty gallery |
| `GalleryTab` | Component | Renders grid |
| `GalleryTab` | Component | Accept All button works |
| `GalleryTab` | Component | Request Revision opens modal |
| `AssetGrid` | Component | Renders asset cards |
| `AssetCard` | Component | Shows thumbnail |
| **Empty state** | Component | Shows when no assets |

**Minimum for Phase 5:** 3 unit tests, 5 component tests

---

### Phase 6 Test Requirements (Simplified v1)

| Test | Type | What to Test |
|------|------|--------------|
| `BillingTab` | Component | Renders line items + summary |
| `LineItemsTable` | Component | Shows all line items |
| `BillingSummary` | Component | Calculates totals correctly |
| `BillingSummary` | Component | Formats currency correctly |
| `ActivityTab` | Component | Renders audit log |
| `AuditLog` | Component | Shows events in order |
| `formatCurrency()` | Unit | Formats EUR, USD, GBP |

**Minimum for Phase 6:** 2 unit tests, 5 component tests

---

### Phase 7 Test Requirements (Simplified v1)

| Test | Type | What to Test |
|------|------|--------------|
| `CancelOrderModal` | Component | Opens and closes |
| `CancelOrderModal` | Component | Requires reason |
| `CancelOrderModal` | Component | Cancel action works |
| `CreateOrderModal` | Component | Opens wizard |
| `CreateOrderModal` | Component | Step navigation works |
| `CreateOrderModal` | Component | Validation works |
| `CreateOrderModal` | Component | Submit creates order |
| **Form validation** | Unit | Validates required fields |

**Minimum for Phase 7:** 2 unit tests, 6 component tests

---

### Phase 8 Test Requirements

| Test | Type | What to Test |
|------|------|--------------|
| **All empty states** | Component | Each component's empty state |
| **All error states** | Component | Each component's error state |
| **Keyboard navigation** | Integration | Arrow keys in table |
| **Tab key flow** | Integration | Focus moves correctly |
| **Screen reader** | Manual | VoiceOver announces correctly |
| **Dark mode** | Visual | All components render correctly |
| **Responsive** | Visual | Mobile/tablet layouts |

**Minimum for Phase 8:** 5 integration tests, manual accessibility audit

---

### Test Summary

| Phase | Unit Tests | Component Tests | Integration Tests | Total |
|-------|------------|-----------------|-------------------|-------|
| 1 | 5 | 2 | — | 7 |
| 2 | 8 | 6 | 1 | 15 |
| 3 | 4 | 5 | 1 | 10 |
| 4 | — | 7 | — | 7 |
| 5 | 3 | 5 | — | 8 |
| 6 | 2 | 5 | — | 7 |
| 7 | 2 | 6 | — | 8 |
| 8 | — | — | 5 | 5 |
| **Total** | **24** | **36** | **7** | **67** |

### Test File Structure

```
src/
├── app/orders/
│   ├── __tests__/
│   │   ├── OrdersPage.test.tsx
│   │   ├── OrderDetailPage.test.tsx
│   │   └── components/
│   │       ├── OrdersTable.test.tsx
│   │       ├── OrderFilters.test.tsx
│   │       └── ...
├── hooks/
│   └── __tests__/
│       ├── useOrders.test.ts
│       ├── useOrder.test.ts
│       └── useGallery.test.ts
├── data/orders/
│   └── __tests__/
│       └── order-config.test.ts
└── utils/
    └── __tests__/
        └── format.test.ts
```

---

## Phase 1: Foundation (Week 1)

### Goal

Establish types, mock data, routing, and page shells.

### Deliverables

| Component | File | Priority |
|-----------|------|----------|
| Types & Interfaces | `src/types/order.types.ts` | P0 |
| Status/Type Config | `src/data/orders/order-config.ts` | P0 |
| Mock Orders Data | `src/data/mock-orders.ts` | P0 |
| Router Integration | `src/router.tsx` | P0 |
| Orders Page Shell | `src/app/orders/OrdersPage.tsx` | P0 |
| Order Detail Shell | `src/app/orders/OrderDetailPage.tsx` | P0 |
| **Loading States** | Skeleton components for table and tabs | P0 |

### Sidebar Navigation (Already Configured ✅)

**Good news:** The Orders page is **already configured** in both the desktop sidebar and mobile navigation. No additional configuration is needed.

#### Desktop Sidebar

**File:** `src/config/navigation.ts`

```typescript
// MENU_SECTIONS → "Work" section already includes Orders:
{
  id: 'orders',
  label: 'Orders',
  icon: 'gravity-ui:shopping-cart',
  href: '/orders'
}
```

**Component:** `src/components/navigation/` — Uses `MENU_SECTIONS` from config.

#### Mobile Bottom Navigation

**File:** `src/config/navigation.ts`

```typescript
// PRIMARY_TABS already includes Orders (shown in bottom nav):
{
  id: 'orders',
  label: 'Orders',
  icon: 'gravity-ui:shopping-cart',
  href: '/orders',
  badge: 3  // Shows notification badge (connect to actual count later)
}
```

**Component:** `src/components/navigation/LiquidGlassNav.tsx` — Uses `mobileNavItems` from config.

#### Developer Notes

- **No sidebar changes required for Phase 1** — Orders is already in both desktop and mobile menus
- **Badge integration (future)**: The mobile nav already supports a badge prop. In Phase 8 or later, connect `badge` to actual unread/pending order count via API
- **Icon**: Using `gravity-ui:shopping-cart` — consistent with existing navigation icons
- **Position**: Orders appears in the "Work" section on desktop, and as a primary tab on mobile

### Technical Tasks

```markdown
1. [ ] Create order type definitions
   - Order, OrderStatus, OrderType interfaces
   - SessionDetails, LocationDetails, CreativeBrief
   - GalleryDetails with accept/reject workflow
   - BillingDetails, OrderMetadata

2. [ ] Create status and type config maps
   - ORDER_STATUS_CONFIG with colors, icons, labels
   - ORDER_TYPE_CONFIG with icons and labels
   - Export utility functions: getStatusConfig(), getTypeConfig()

3. [ ] Set up routing (lazy loaded)
   - `/orders` → OrdersPage
   - `/orders/:id` → OrderDetailPage
   - ⚠️ Sidebar already configured — just add routes

4. [ ] Create mock data (20+ orders)
   - Varied statuses (draft through completed)
   - Include cancelled and refunded
   - Mix of photo, video, AI types
   - Orders with/without gallery
   - Orders with pending revisions

5. [ ] Build page shells with loading states
   - OrdersPage: Header + Skeleton table
   - OrderDetailPage: Header + Skeleton tabs
   - Use HeroUI Skeleton or custom shimmer
```

### Acceptance Criteria

- [ ] Navigate to `/orders` shows page with skeleton loading
- [ ] Navigate to `/orders/123` shows detail page shell
- [ ] Types compile with no errors
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Dark mode renders skeleton correctly

---

## Phase 2: Orders List (Week 2)

### Goal

Fully functional orders table with filtering and URL state sync.

### Deliverables

| Component | File | Priority |
|-----------|------|----------|
| Orders Table | `src/app/orders/components/OrdersTable.tsx` | P0 |
| Table Row | `src/app/orders/components/OrderTableRow.tsx` | P0 |
| Filters Bar | `src/app/orders/components/OrderFilters.tsx` | P0 |
| Status Badge | `src/app/orders/components/OrderStatusBadge.tsx` | P1 |
| useOrders Hook | `src/hooks/useOrders.ts` | P0 |
| **URL State Sync** | Filters sync to query params | P0 |
| **Pagination** | Offset-based with page size selector | P0 |

### Technical Tasks

```markdown
1. [ ] Build useOrders hook
   - Filter state management
   - Sort state (column, direction)
   - Pagination state (page, pageSize)
   - URL sync via TanStack Router search params
   - Simulated loading delay (300ms)

2. [ ] Build OrderFilters component
   - SearchField with debounce (300ms)
   - Status Select (multi-select or single)
   - Type Select
   - Date Range picker (use HeroUI DateRangePicker if available)
   - Active filters TagGroup with remove buttons
   - Reset button

3. [ ] Build OrdersTable component
   - Use native <table> with HeroUI styling (no wrapper)
   - Checkbox column for selection
   - Sortable column headers (onPress handler)
   - Responsive: horizontal scroll on mobile

4. [ ] Build OrderTableRow component
   - All cells use semantic tokens
   - Status uses OrderStatusBadge
   - Client uses Avatar compound component
   - Actions Dropdown (View, Download Invoice, Cancel)
   - Row click navigates to detail (onPress on <tr>)

5. [ ] Build pagination controls
   - Page size selector (10, 20, 50)
   - Previous/Next buttons
   - Current page indicator
   - Total count display
```

### Acceptance Criteria

- [ ] Table displays mock orders correctly
- [ ] Filters update URL (`?status=in_progress&type=photo`)
- [ ] Refreshing page restores filter state from URL
- [ ] Sorting works on columns
- [ ] Pagination controls work
- [ ] Clicking row navigates to `/orders/:id`
- [ ] Actions dropdown works (View navigates)
- [ ] Loading state shows skeletons
- [ ] Empty state shows when no results

---

## Phase 3: Order Detail — Structure & Tabs (Week 3)

### Goal

Order detail page with tabbed navigation (consistent with Team page).

### Deliverables

| Component | File | Priority |
|-----------|------|----------|
| Detail Page Layout | `src/app/orders/OrderDetailPage.tsx` | P0 |
| Order Header | `src/app/orders/components/OrderHeader.tsx` | P0 |
| Order Tabs | `src/app/orders/components/OrderTabs.tsx` | P0 |
| useOrder Hook | `src/hooks/useOrder.ts` | P0 |
| **404 State** | Order not found handling | P0 |
| **Optimistic Updates** | Skeleton while loading | P0 |

### Tab Configuration

```typescript
const ORDER_TABS = [
  { id: 'overview', label: 'Overview', icon: 'gravity-ui:layout-header-cells' },
  { id: 'creative', label: 'Creative', icon: 'gravity-ui:palette' },
  { id: 'gallery', label: 'Gallery', icon: 'gravity-ui:picture' },
  { id: 'billing', label: 'Billing', icon: 'gravity-ui:credit-card' },
  { id: 'activity', label: 'Activity', icon: 'gravity-ui:clock' },
] as const;
```

### Technical Tasks

```markdown
1. [ ] Build OrderDetailPage layout
   - Fetch order via useOrder hook
   - Loading state with skeleton
   - Error/404 state
   - OrderHeader at top
   - OrderTabs below

2. [ ] Build OrderHeader component
   - Back button (navigates to /orders)
   - Order ID (displayId)
   - Status badge
   - Type badge (if AI)
   - Created timestamp
   - Action buttons: Contact Support, More dropdown

3. [ ] Build OrderTabs component
   - Use HeroUI Tabs compound component
   - Tab icons with labels
   - URL sync: /orders/:id?tab=gallery
   - Lazy load tab content
   - Suspense boundary per tab

4. [ ] Build useOrder hook
   - Fetch single order by ID
   - Loading, error, data states
   - Refresh function
```

### Acceptance Criteria

- [ ] Detail page loads order data
- [ ] Header shows correct order info
- [ ] Tabs render and switch correctly
- [ ] Tab state synced to URL
- [ ] Back button returns to orders list
- [ ] 404 state shows for invalid ID
- [ ] Loading skeleton matches tab structure

---

## Phase 4: Overview & Creative Tabs (Week 4)

### Goal

Complete Overview tab (timeline, session, location) and Creative tab (brief, references).

### Deliverables

| Component | File | Priority |
|-----------|------|----------|
| Overview Tab | `src/app/orders/tabs/OverviewTab.tsx` | P0 |
| Order Timeline | `src/app/orders/components/OrderTimeline.tsx` | P0 |
| Session Section | `src/app/orders/components/SessionSection.tsx` | P0 |
| Location Section | `src/app/orders/components/LocationSection.tsx` | P1 |
| Creative Tab | `src/app/orders/tabs/CreativeTab.tsx` | P0 |
| Creative Brief Section | `src/app/orders/components/CreativeBriefSection.tsx` | P0 |

### Technical Tasks

```markdown
1. [ ] Build OverviewTab layout
   - Two-column grid on desktop
   - Timeline on left (or full width on mobile)
   - Session + Location on right

2. [ ] Build OrderTimeline component
   - Vertical timeline with track (CSS)
   - Status icons (completed=green, current=accent, pending=grey)
   - Timestamps formatted
   - Actor avatars
   - Event notes in Card.secondary

3. [ ] Build SessionSection
   - Service type with icon
   - Date & time display
   - Duration
   - Deliverables (photos, videos, AI images)
   - Equipment and style as Chip/Badge list
   - Special requirements
   - Reschedule history Alert (if any)

4. [ ] Build LocationSection
   - Remote vs On-site conditional display
   - Address formatting
   - Contact person card
   - Access notes

5. [ ] Build CreativeTab layout
   - Brief description in highlighted card
   - References grid (links and files)
   - Approval status badge

6. [ ] Build CreativeBriefSection
   - Client brief text (whitespace preserved)
   - References as clickable cards
   - Approval badge (Approved / Pending)
```

### Acceptance Criteria

- [ ] Overview tab displays timeline correctly
- [ ] Session details show all fields
- [ ] Location handles remote and on-site
- [ ] Creative tab shows brief and references
- [ ] All components use semantic tokens
- [ ] Dark mode verified

---

## Phase 5: Gallery Tab with Accept/Reject (Week 5)

### Goal

Gallery tab with asset grid and client accept/reject workflow.

### Deliverables

| Component | File | Priority |
|-----------|------|----------|
| Gallery Tab | `src/app/orders/tabs/GalleryTab.tsx` | P0 |
| Asset Grid | `src/app/orders/components/AssetGrid.tsx` | P0 |
| Asset Card | `src/app/orders/components/AssetCard.tsx` | P0 |
| Asset Lightbox | `src/app/orders/components/AssetLightbox.tsx` | P1 |
| Selection Bar | `src/app/orders/components/GallerySelectionBar.tsx` | P0 |
| Revision Request Modal | `src/app/orders/modals/RevisionRequestModal.tsx` | P1 |
| useGallery Hook | `src/hooks/useGallery.ts` | P0 |

### Client Gallery Workflow

```
1. Gallery ready → Status: "ready"
2. Client views assets → Can select individual or all
3. Client actions:
   - Accept Selected → Assets marked "accepted"
   - Reject Selected → Opens revision request modal
   - Accept All → All assets marked "accepted"
4. If any rejected → Creates revision request
5. After revisions → Repeat from step 2
```

### Technical Tasks

```markdown
1. [ ] Build useGallery hook
   - Fetch assets from gallery microservice (mock for now)
   - Selection state (Set<assetId>)
   - Select single, select multiple, select all
   - Accept/reject actions
   - Loading and error states

2. [ ] Build GalleryTab layout
   - Gallery status banner
   - Delivery info (formats, resolution, count)
   - Asset grid
   - Selection bar (fixed at bottom when items selected)
   - Revisions history section

3. [ ] Build AssetGrid component
   - Responsive grid (2 cols mobile, 4 cols tablet, 6 cols desktop)
   - Checkbox overlay on each asset
   - Shift+click for range selection
   - Loading skeletons

4. [ ] Build AssetCard component
   - Thumbnail image
   - Video play icon overlay (if video)
   - AI badge (if AI-generated)
   - Checkbox in corner
   - Accept/Reject status indicator
   - Hover: show magnifier icon

5. [ ] Build GallerySelectionBar
   - Fixed position at bottom
   - Selection count
   - "Accept Selected" button (success)
   - "Request Revision" button (secondary)
   - "Select All" / "Deselect All" toggle
   - "Accept All" button

6. [ ] Build RevisionRequestModal
   - TextArea for revision description
   - List of selected assets to revise
   - Submit creates revision request
   - Success state

7. [ ] Build AssetLightbox (optional P1)
   - Full-screen modal
   - Image/video viewer
   - Navigation arrows
   - Download button
   - Accept/Reject buttons per asset
```

### Acceptance Criteria

- [ ] Gallery displays assets in grid
- [ ] Can select single asset
- [ ] Can select multiple assets
- [ ] Can select all assets
- [ ] Accept Selected marks assets as accepted
- [ ] Request Revision opens modal
- [ ] Modal collects revision description
- [ ] Revisions section shows history
- [ ] Empty state when no gallery
- [ ] Loading skeleton for gallery

---

## Phase 6: Billing & Activity Tabs (Week 6)

### Goal

Complete Billing tab and Activity tab with audit log and comments.

### Deliverables

| Component | File | Priority |
|-----------|------|----------|
| Billing Tab | `src/app/orders/tabs/BillingTab.tsx` | P0 |
| Line Items Table | `src/app/orders/components/LineItemsTable.tsx` | P0 |
| Billing Summary | `src/app/orders/components/BillingSummary.tsx` | P0 |
| Activity Tab | `src/app/orders/tabs/ActivityTab.tsx` | P0 |
| Audit Log | `src/app/orders/components/AuditLog.tsx` | P0 |
| Comments Section | `src/app/orders/components/CommentsSection.tsx` | P1 |

### Technical Tasks

```markdown
1. [ ] Build BillingTab layout
   - Two-column: Line items + Summary card
   - Responsive: Stack on mobile

2. [ ] Build LineItemsTable
   - Description with type badge (AI, Rush, etc.)
   - Quantity, Unit Price, Total columns
   - Discounts row (green text)
   - Credits row (accent text)

3. [ ] Build BillingSummary card
   - Subtotal
   - VAT (with rate)
   - Total (bold)
   - Payment status badge
   - Payment method
   - Paid date
   - Refunds section (if any)
   - Download Invoice button

4. [ ] Currency formatting utility
   - formatCurrency(amount, currency)
   - Support EUR, USD, GBP
   - Locale-aware

5. [ ] Build ActivityTab with sub-tabs
   - Audit Log tab
   - Comments tab
   - Use nested Tabs or Segment component

6. [ ] Build AuditLog component
   - Timeline of system events
   - Actor avatar + name
   - Event description
   - Timestamp
   - Metadata accordion (for API events)

7. [ ] Build CommentsSection
   - List of comments with avatars
   - Add comment form
   - Post button
```

### Acceptance Criteria

- [ ] Billing tab shows line items correctly
- [ ] Totals calculate correctly
- [ ] Discounts and credits display
- [ ] Payment status accurate
- [ ] Invoice download button present
- [ ] Activity tab shows audit log
- [ ] Comments can be viewed
- [ ] Dark mode verified

---

## Phase 7: Actions & Modals (Week 7)

### Goal

Order actions: cancel order, create order modal.

### Deliverables

| Component | File | Priority |
|-----------|------|----------|
| Cancel Order Modal | `src/app/orders/modals/CancelOrderModal.tsx` | P0 |
| Create Order Modal | `src/app/orders/modals/CreateOrderModal.tsx` | P0 |
| Order Service Type Step | `src/app/orders/modals/steps/ServiceTypeStep.tsx` | P0 |
| Session Details Step | `src/app/orders/modals/steps/SessionDetailsStep.tsx` | P0 |
| Location Step | `src/app/orders/modals/steps/LocationStep.tsx` | P0 |
| Brief Step | `src/app/orders/modals/steps/BriefStep.tsx` | P1 |
| Review Step | `src/app/orders/modals/steps/ReviewStep.tsx` | P0 |

### Technical Tasks

```markdown
1. [ ] Build CancelOrderModal
   - Confirmation message with order ID
   - Reason selection (dropdown or radio)
   - Cancel button (danger variant)
   - Loading state during submission
   - Success → navigate to orders list

2. [ ] Build CreateOrderModal (Multi-step wizard)
   - Progress indicator (Step 1 of 5)
   - Back/Next navigation
   - Form validation per step
   - State persists between steps

3. [ ] Step 1: ServiceTypeStep
   - Card selection for type (Photo, Video, Hybrid, AI)
   - Visual icons for each type
   - Selection highlights card

4. [ ] Step 2: SessionDetailsStep
   - Date picker
   - Time picker
   - Duration selector
   - Deliverables count inputs

5. [ ] Step 3: LocationStep
   - Remote toggle
   - Address fields (if on-site)
   - Venue name (optional)
   - Contact person fields

6. [ ] Step 4: BriefStep
   - TextArea for description
   - File upload for references (placeholder)
   - URL input for reference links

7. [ ] Step 5: ReviewStep
   - Summary of all entered data
   - Edit buttons per section
   - Create Order button
   - Creates order in "pending_confirmation" status
```

### Acceptance Criteria

- [ ] Cancel modal requires confirmation
- [ ] Cancelled order navigates away
- [ ] Create Order wizard progresses through steps
- [ ] Back button preserves form data
- [ ] Validation prevents invalid submissions
- [ ] Review step shows all data
- [ ] Create button submits (mock for now)
- [ ] All modals lazy loaded

---

## Phase 8: Polish & Integration (Week 8)

### Goal

Final polish, edge cases, performance, accessibility.

### Deliverables

| Item | Priority |
|------|----------|
| Empty states for all views | P0 |
| Error states with retry | P0 |
| Keyboard navigation | P0 |
| Screen reader testing | P1 |
| Performance audit | P1 |
| Bundle size check | P0 |
| Documentation | P1 |

### Technical Tasks

```markdown
1. [ ] Empty states
   - No orders: CTA to create first order
   - No search results: Clear filters button
   - No gallery: Informational message
   - No comments: Placeholder

2. [ ] Error states
   - Failed to load orders: Retry button
   - Failed to load order: Back + Retry
   - Failed to load gallery: Retry button
   - Network error Alert component

3. [ ] Keyboard navigation
   - Table: ↑/↓ to navigate, Enter to open
   - Tabs: ← → to switch tabs
   - Modal: Escape to close
   - Forms: Tab through fields

4. [ ] Accessibility audit
   - Run Lighthouse accessibility
   - Fix any issues
   - Test with VoiceOver

5. [ ] Performance audit
   - Check orders chunk size (target <50KB)
   - Verify lazy loading works
   - Check render performance with 100+ orders

6. [ ] Bundle size verification
   - Main bundle still <500KB
   - Orders chunk <50KB
   - Modals lazy loaded

7. [ ] Documentation
   - Update README if needed
   - JSDoc on complex hooks
   - Storybook stories (if applicable)
```

### Acceptance Criteria

- [ ] All empty states implemented
- [ ] All error states have retry
- [ ] Keyboard navigation works
- [ ] Lighthouse accessibility >95
- [ ] Bundle size targets met
- [ ] Dark mode fully tested
- [ ] Ready for production

---

## Component Summary

| Phase | Components | Estimated LOC |
|-------|------------|---------------|
| 1 - Foundation | 6 | ~400 |
| 2 - Orders List | 6 | ~900 |
| 3 - Detail Structure | 4 | ~600 |
| 4 - Overview & Creative | 6 | ~800 |
| 5 - Gallery | 7 | ~1200 |
| 6 - Billing & Activity | 6 | ~800 |
| 7 - Actions & Modals | 7 | ~1000 |
| 8 - Polish | — | ~300 |
| **Total** | **42** | **~6000** |

---

## Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Gallery microservice not ready | High | Medium | Mock gallery data, integrate later |
| HeroUI Table component missing | Low | Low | Use native table with styling |
| Scope creep from stakeholders | High | Medium | Strict phase gating, weekly demos |
| Performance with large asset galleries | Medium | Medium | Virtual scrolling, pagination |
| Form wizard complexity | Medium | Medium | Use react-hook-form, step validation |

---

## Dependencies

| Dependency | Owner | Status | Blocker? |
|------------|-------|--------|----------|
| Backend API | Backend Team | ✅ Ready | No |
| Gallery Microservice | Media Team | TBD | Yes (Phase 5) |
| Invoice PDF Generation | Billing Team | TBD | No (placeholder OK) |
| Design Review | Design Team | TBD | Before Phase 7 |

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Phase completion | 8 weeks | Sprint velocity |
| Page load time | <2s | Lighthouse |
| Bundle size (orders chunk) | <50KB | Build output |
| Accessibility score | >95 | Lighthouse |
| Client satisfaction | >4/5 | Feedback |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-06 | Initial plan |
| 1.1 | 2026-01-06 | Added missing elements (loading, URL sync, pagination). Aligned to dev_instruction_v2.md and HeroUI v3. Changed to tabbed interface. Added gallery accept/reject workflow. Clarified client-facing scope. |
| 1.2 | 2026-01-07 | **Phase-by-phase review completed.** Fixed 17 code issues across 8 phases: named exports, `onPress` handlers, toast API, dynamic Tailwind classes, HeroUI component usage. Added Review Summary section. Added link to V1.1 Backlog. |

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Manager | | | |
| Tech Lead | | | |
| Design Lead | | | |
| Engineering | | | |

---

*Document created: 2026-01-06*  
*Last updated: 2026-01-07*
