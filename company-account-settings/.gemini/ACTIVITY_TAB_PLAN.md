# Activity Log Tab — Implementation Plan

> **Last Updated:** 2026-01-05  
> **Status:** ✅ Approved  
> **Estimated Effort:** 2-3 days

---

## 1. Overview

The **Activity Log Tab** provides a comprehensive, filterable audit trail of all team-level events. It enables administrators to monitor team actions, investigate incidents, maintain compliance, and export records for external reporting.

### 1.1 Goals

| Goal | Description |
|------|-------------|
| **Transparency** | Complete visibility into who did what and when |
| **Compliance** | Exportable logs for auditing (SOC 2, GDPR) |
| **Incident Response** | Quick filtering to investigate security events |
| **User Accountability** | Clear attribution of actions to team members |

### 1.2 Inspiration (Reference Screenshot)

The design follows modern SaaS audit log patterns (Stripe Dashboard, Linear, Vercel Activity):

- Clean filter bar at top with dropdowns for type, member, and date range
- Search input for quick text lookup
- Export CSV button
- Timeline-style activity list with category chips and metadata

---

## 2. Activity Categories (Types)

Based on the existing `ActivityEntry` type and SaaS best practices:

| Category ID | Label | Icon | Color Token | Description |
|-------------|-------|------|-------------|-------------|
| `members` | Members | `gravity-ui:persons` | `--info` | Invites, removals, role changes |
| `permissions` | Permissions | `gravity-ui:shield-check` | `--lavender` | Permission grants/revocations |
| `billing` | Billing | `gravity-ui:credit-card` | `--success` | Invoices, payments, plan changes |
| `api` | API | `gravity-ui:code` | `--electric-blue` | API key created/revoked, webhook events |
| `security` | Security | `gravity-ui:shield-keyhole` | `--danger` | 2FA changes, session revocations, IP rules |
| `settings` | Settings | `gravity-ui:gear` | `--muted` | Team settings, branding changes |
| `assets` | Assets | `gravity-ui:file-picture` | `--accent` | Image/video generation, batch exports |
| `login` | Login | `gravity-ui:person` | `--cyan-600` | Login attempts, session starts |
| `integrations` | Integrations | `gravity-ui:plug-connection` | `--sunset` | OAuth connections, third-party app links |
| `exports` | Exports | `gravity-ui:file-arrow-down` | `--mint` | Data exports, report downloads |

---

## 3. Data Model

### 3.1 Extended Activity Type

**File:** `src/types/activity.ts` (new file)

```typescript
export type ActivityCategory =
  | 'members'
  | 'permissions'
  | 'billing'
  | 'api'
  | 'security'
  | 'settings'
  | 'assets'
  | 'login'
  | 'integrations'
  | 'exports';

export interface ActivityActor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ActivityMetadata {
  ip?: string;
  location?: string;
  userAgent?: string;
  resourceId?: string;
  resourceName?: string;
  oldValue?: string;
  newValue?: string;
}

export interface ActivityLogEntry {
  id: string;
  actor: ActivityActor | null; // null = System
  action: string;
  description: string;
  category: ActivityCategory;
  timestamp: Date;
  metadata?: ActivityMetadata;
}

export interface ActivityFilters {
  category: ActivityCategory | null;
  memberId: string | null;
  dateRange: DateRangePreset | null;
  search: string;
}

export type DateRangePreset =
  | 'today'
  | 'yesterday'
  | 'last_7_days'
  | 'last_30_days'
  | 'last_90_days'
  | 'custom';

export interface DateRange {
  start: Date;
  end: Date;
}
```

### 3.2 Mock Data

**File:** `src/data/mock-activity.ts`

Will contain 50+ diverse mock entries covering all categories with realistic timestamps, IPs, and locations.

---

## 4. Component Architecture

```
src/
├── components/team/
│   └── activity/
│       ├── ActivityFilterBar.tsx       # Filter controls
│       ├── ActivityLogList.tsx         # Virtualized list container
│       ├── ActivityLogRow.tsx          # Single activity row
│       ├── ActivityLogRowSkeleton.tsx  # Loading state row
│       ├── ActivityTabSkeleton.tsx     # Full tab skeleton
│       ├── ActivityEmptyState.tsx      # No results state
│       └── modals/
│           └── ActivityDetailModal.tsx # Expanded detail view (optional)
├── hooks/
│   └── useActivity.ts                  # State management hook
├── types/
│   └── activity.ts                     # Type definitions
├── data/
│   └── mock-activity.ts                # Mock data
│   └── activity-constants.ts           # Constants (categories, presets)
└── utils/
    └── activity.ts                     # Filtering logic, CSV export
```

---

## 5. Component Specifications

### 5.1 ActivityTab.tsx

**Location:** `src/components/team/tabs/ActivityTab.tsx`

**Responsibilities:**

- Orchestrate filter bar, list, and modals
- Lazy load modals
- Handle loading/empty states via Suspense

**Pattern:** Follows `SecurityTab.tsx` structure

```tsx
export function ActivityTab() {
  const { activities, filters, setFilters, isLoading } = useActivity();
  
  // ... state management
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col gap-1 px-1">
        <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
        <p className="text-default-500">Track all team activity and changes.</p>
      </div>
      
      {/* Filter Bar */}
      <ActivityFilterBar 
        filters={filters}
        onFiltersChange={setFilters}
        members={members}
        onExport={handleExport}
      />
      
      {/* Activity List */}
      <ActivityLogList 
        activities={filteredActivities}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}
```

### 5.2 ActivityFilterBar.tsx

**Location:** `src/components/team/activity/ActivityFilterBar.tsx`

**Layout:** Horizontal bar matching screenshot

| Control | Type | Placeholder |
|---------|------|-------------|
| Activity Type | `Select` | "All Activity" |
| Member | `Select` | "All Members" |
| Date Range | `Select` + Custom DatePicker | "Last 30 days" |
| Search | `SearchField` | "Search activity..." |
| Export CSV | `Button` | — |

**Styling:**

- Container: `bg-default-50/50 p-6 rounded-3xl border border-default-100`
- Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`
- Follows `ApiLogsSection.tsx` filter bar pattern

### 5.3 ActivityLogRow.tsx

**Location:** `src/components/team/activity/ActivityLogRow.tsx`

**Layout per row:**

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Icon]  Actor Name   [Category Chip]                                 │
│          Action description text                                      │
│          2024-12-17 14:32    IP: 185.123.45.67    Helsinki, FI       │
└──────────────────────────────────────────────────────────────────────┘
```

**Design tokens:**

- Icon bg: Category-specific soft variant (`bg-*-soft`)
- Chip: Semantic color matching category
- Metadata: `text-muted-foreground text-sm`

**Accessibility:**

- Entire row keyboard focusable
- Expandable detail on press (optional Phase 2)

### 5.4 ActivityEmptyState.tsx

**States:**

1. **No results (filtered):** "No activity matches your filters" + Reset button
2. **No activity (ever):** "No activity recorded yet" + illustration

Reuse `EmptyState` pattern from `src/components/developers/EmptyState.tsx`.

---

## 6. Hook: useActivity

**File:** `src/hooks/useActivity.ts`

```typescript
interface UseActivityReturn {
  activities: ActivityLogEntry[];
  filteredActivities: ActivityLogEntry[];
  filters: ActivityFilters;
  setFilters: (filters: Partial<ActivityFilters>) => void;
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  exportToCSV: () => void;
}

export function useActivity(): UseActivityReturn {
  // State management
  // Filtering logic
  // Pagination (cursor-based for scalability)
  // Export functionality
}
```

---

## 7. Filter Logic

**File:** `src/utils/activity.ts`

```typescript
export function filterActivities(
  activities: ActivityLogEntry[],
  filters: ActivityFilters
): ActivityLogEntry[] {
  return activities.filter(entry => {
    // Category filter
    if (filters.category && entry.category !== filters.category) return false;
    
    // Member filter
    if (filters.memberId && entry.actor?.id !== filters.memberId) return false;
    
    // Date range filter
    if (filters.dateRange) {
      const range = getDateRange(filters.dateRange);
      if (entry.timestamp < range.start || entry.timestamp > range.end) return false;
    }
    
    // Search filter (actor name, action, description)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const searchable = [
        entry.actor?.name,
        entry.actor?.email,
        entry.action,
        entry.description
      ].join(' ').toLowerCase();
      if (!searchable.includes(searchLower)) return false;
    }
    
    return true;
  });
}

export function getDateRange(preset: DateRangePreset): DateRange {
  const now = new Date();
  // ... preset calculations
}
```

---

## 8. CSV Export

**Function:** `exportActivityToCSV(activities: ActivityLogEntry[])`

**Columns:**

| Column | Source |
|--------|--------|
| Timestamp | `entry.timestamp.toISOString()` |
| Actor | `entry.actor?.name ?? 'System'` |
| Email | `entry.actor?.email ?? ''` |
| Category | `entry.category` |
| Action | `entry.action` |
| Description | `entry.description` |
| IP Address | `entry.metadata?.ip ?? ''` |
| Location | `entry.metadata?.location ?? ''` |

**Filename:** `activity-log-{YYYY-MM-DD}.csv`

---

## 9. Integration Points

### 9.1 TeamPage.tsx

Add lazy import and case for `'activity'`:

```tsx
const ActivityTab = lazy(() => 
  import('../components/team/tabs/ActivityTab')
    .then(m => ({ default: m.ActivityTab }))
);

// In render:
: activeTab === 'activity' ? (
    <ActivityTab />
)
```

### 9.2 TeamTabs.tsx

Already has `activity` tab defined in `TABS` array:

```tsx
{ id: 'activity', label: 'Activity Log', icon: 'gravity-ui:pulse' },
```

No changes needed.

---

## 10. Design System Compliance

| Requirement | Implementation |
|-------------|----------------|
| **Named exports only** | ✅ All components use `export function` |
| **No wrapper components** | ✅ Direct HeroUI imports |
| **Import aliases** | ✅ `@/` for all internal imports |
| **No `use client`** | ✅ Vite SPA |
| **No `any` types** | ✅ Strict typing with interfaces |
| **onPress not onClick** | ✅ All HeroUI components |
| **Lazy loaded modals** | ✅ Conditional `Suspense` |
| **Dark mode tested** | ✅ All tokens are theme-aware |
| **Semantic variants** | ✅ Using `primary`, `secondary`, etc. |
| **Compound components** | ✅ `Select.Trigger`, `Card.Header`, etc. |

---

## 11. Performance Considerations

| Area | Strategy |
|------|----------|
| **Bundle size** | Lazy load `ActivityTab` via `React.lazy` |
| **Large datasets** | Client-side pagination (50 items/page) |
| **Skeleton loading** | `ActivityTabSkeleton` with Suspense |
| **Filter debouncing** | 300ms debounce on search input |

---

## 12. Accessibility Checklist

- [ ] Filter bar controls have visible labels
- [ ] Category chips have sufficient color contrast
- [ ] Search field has `aria-label`
- [ ] Activity rows are keyboard navigable
- [ ] Export button has descriptive text
- [ ] Date picker is keyboard accessible
- [ ] Focus indicators visible on all interactive elements

---

## 13. Implementation Phases

### Phase 1: Core Implementation (MVP)

1. Create `src/types/activity.ts` with all type definitions
2. Create `src/data/activity-constants.ts` with category configs
3. Create `src/data/mock-activity.ts` with 50+ mock entries
4. Create `src/utils/activity.ts` with filter and export logic
5. Create `src/hooks/useActivity.ts` hook
6. Create `ActivityTabSkeleton.tsx`
7. Create `ActivityFilterBar.tsx`
8. Create `ActivityLogRow.tsx`
9. Create `ActivityEmptyState.tsx`
10. Create `ActivityLogList.tsx`
11. Create `ActivityTab.tsx` (orchestrator)
12. Integrate into `TeamPage.tsx`

### Phase 2: Enhancements (Future)

- Activity detail modal with full metadata
- Real-time activity updates (WebSocket)
- Custom date range picker
- Saved filter presets
- Activity grouping by day
- Inline quick actions (e.g., "Undo invite")

---

## 14. File Checklist

| File | Status |
|------|--------|
| `src/types/activity.ts` | ⬜ New |
| `src/data/activity-constants.ts` | ⬜ New |
| `src/data/mock-activity.ts` | ⬜ New |
| `src/utils/activity.ts` | ⬜ New |
| `src/hooks/useActivity.ts` | ⬜ New |
| `src/components/team/activity/ActivityTabSkeleton.tsx` | ⬜ New |
| `src/components/team/activity/ActivityFilterBar.tsx` | ⬜ New |
| `src/components/team/activity/ActivityLogRow.tsx` | ⬜ New |
| `src/components/team/activity/ActivityEmptyState.tsx` | ⬜ New |
| `src/components/team/activity/ActivityLogList.tsx` | ⬜ New |
| `src/components/team/tabs/ActivityTab.tsx` | ⬜ New |
| `src/app/TeamPage.tsx` | ⬜ Modify (add lazy import + case) |

---

## 15. Acceptance Criteria

- [ ] Tab renders with header and filter bar
- [ ] All 4 filters work correctly (type, member, date, search)
- [ ] Filters combine with AND logic
- [ ] Activity list displays 50 items per page
- [ ] Pagination controls appear when > 50 items
- [ ] Each row shows: icon, actor, action, category chip, timestamp, metadata
- [ ] Empty state displays when no results
- [ ] Export CSV downloads file with correct columns
- [ ] Tab lazy loads correctly
- [ ] Dark mode renders correctly
- [ ] Mobile responsive (stacked filters)
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Bundle size < 500 KB maintained

---

## 16. Decisions Log

| Question | Decision | Rationale |
|----------|----------|----------|
| Infinite scroll vs pagination? | **Pagination** | Better for audit log scrollback, explicit control |
| Detail modal in MVP? | **Phase 2** | Keep MVP focused on core filtering |
| Filter persistence? | **URL Search Params** | Shareable links, browser history support |
| Activity retention? | **Mock 90 days** | Real API TBD |

### Filter Persistence Implementation

**Approach:** URL Search Params (Query String)

Example URL:

```
/team?tab=activity&category=security&member=user-123&range=last_30_days&search=2FA
```

**Implementation:**

```typescript
// Read from URL on mount
const searchParams = new URLSearchParams(window.location.search);
const initialCategory = searchParams.get('category') as ActivityCategory | null;

// Update URL on filter change (without page reload)
const updateURLParams = (filters: ActivityFilters) => {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.memberId) params.set('member', filters.memberId);
  if (filters.dateRange) params.set('range', filters.dateRange);
  if (filters.search) params.set('search', filters.search);
  
  const newURL = `${window.location.pathname}?tab=activity${params.toString() ? '&' + params.toString() : ''}`;
  window.history.replaceState({}, '', newURL);
};
```

---

## Approval

- [x] Design approved
- [x] Technical approach approved

---

*Document created following `dev_instruction_v2.md` and `DESIGN_SYSTEM.md` guidelines.*
