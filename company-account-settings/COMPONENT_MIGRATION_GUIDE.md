# Component Migration Guide: Custom Components → HeroUI v3

> [!IMPORTANT]
> **CRITICAL ISSUE IDENTIFIED:**
> 
> The codebase contains custom-built components that duplicate HeroUI v3 functionality. This causes:
> - ❌ Larger bundle size (duplicate code)
> - ❌ Inconsistent UX (different behavior)
> - ❌ Missing accessibility features
> - ❌ Higher maintenance burden
> - ❌ Technical debt
>
> **This guide provides step-by-step instructions to fix this problem.**

---

## Table of Contents

1. [Problem Overview](#problem-overview)
2. [Phase 1: Audit](#phase-1-audit)
3. [Phase 2: Categorize](#phase-2-categorize)
4. [Phase 3: Migrate](#phase-3-migrate)
5. [Phase 4: Verify](#phase-4-verify)
6. [Phase 5: Document](#phase-5-document)
7. [Component Migration Examples](#component-migration-examples)
8. [HeroUI v3 Components Reference](#heroui-v3-components-reference)

---

## Problem Overview

**What happened:**
Someone created custom UI components (buttons, cards, modals, etc.) instead of using HeroUI v3 components from `@heroui/react`.

**Why this is bad:**
```
Custom Component (500 lines) + HeroUI Component (0 lines used) = Waste
                ↓
Should be: HeroUI Component (0 custom lines) = Efficient
```

**Goal:**
Replace all custom components with HeroUI v3 components where possible.

---

## Phase 1: Audit

### Step 1.1: List All Custom Components

**Instructions for LLM:**

1. Navigate to the components directory
2. List all files in `src/components/ui/` and `src/components/`
3. Create an inventory spreadsheet

**Command to execute:**

```bash
# List all component files
find src/components -name "*.tsx" -o -name "*.jsx"
```

**Expected output format:**

```text
Component Inventory:
├── src/components/ui/button.tsx
├── src/components/ui/card.tsx
├── src/components/ui/input.tsx
├── src/components/ui/modal.tsx
├── src/components/ui/tabs.tsx
└── ...
```

### Step 1.2: Read Each Component File

**For each component file, extract:**

1. **Component name** (e.g., `CustomButton`)
2. **What it does** (e.g., "renders a clickable button")
3. **Props it accepts** (e.g., `variant`, `size`, `onClick`)
4. **Key features** (e.g., "loading state", "icon support")

**Example analysis:**

```tsx
// File: src/components/ui/button.tsx

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function CustomButton({ variant, size, loading, onClick, children }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
```

**Analysis output:**
```
Component: CustomButton
Purpose: Renders a clickable button
Props: variant, size, loading, onClick, children
Features: loading state, variant styling, size variants
HeroUI Equivalent: Button (✅ exists)
```

---

## Phase 2: Categorize

### Step 2.1: Check HeroUI v3 Component List

**Available HeroUI v3 components:**

**Form Components:**
- `Button` ✅
- `TextField` (Input) ✅
- `Checkbox` ✅
- `CheckboxGroup` ✅
- `RadioGroup` ✅
- `Select` ✅
- `Slider` ✅
- `Switch` ✅
- `TextArea` ✅
- `NumberInput` ✅
- `InputOTP` ✅

**Layout Components:**
- `Card` ✅
- `Accordion` ✅
- `Tabs` ✅
- `Modal` ✅
- `Drawer` ✅
- `Popover` ✅
- `Tooltip` ✅
- `Disclosure` ✅
- `Separator` (Divider) ✅

**Data Display:**
- `Avatar` ✅
- `Badge` ✅
- `Chip` ✅
- `Kbd` ✅
- `Skeleton` ✅
- `Table` ✅
- `Image` ✅
- `Code` ✅
- `Snippet` ✅

**Feedback:**
- `Alert` ✅
- `Spinner` ✅
- `Progress` ✅
- `CircularProgress` ✅
- `Toast` ✅

**Navigation:**
- `Link` ✅
- `Breadcrumbs` ✅
- `Pagination` ✅
- `Navbar` ✅
- `Dropdown` ✅
- `Menu` ✅
- `Listbox` ✅

**Date/Time:**
- `Calendar` ✅
- `DatePicker` ✅
- `DateRangePicker` ✅
- `TimeInput` ✅

### Step 2.2: Categorize Each Custom Component

**For each custom component, determine:**

| Custom Component | HeroUI Has It? | Action Required |
|------------------|----------------|-----------------|
| CustomButton | ✅ Yes - `Button` | MIGRATE: Replace with `<Button>` |
| CustomCard | ✅ Yes - `Card` | MIGRATE: Replace with `<Card>` |
| CustomInput | ✅ Yes - `TextField` | MIGRATE: Replace with `<TextField>` |
| CustomModal | ✅ Yes - `Modal` | MIGRATE: Replace with `<Modal>` |
| CustomDatePicker | ✅ Yes - `DatePicker` | MIGRATE: Replace with `<DatePicker>` |
| CustomWizard | ❌ No | KEEP: Document reason |
| CustomChartWidget | ❌ No | KEEP: Document reason |

**Output a table like this:**

```markdown
## Migration Decision Table

| Component | File Path | HeroUI Equivalent | Decision | Priority |
|-----------|-----------|-------------------|----------|----------|
| CustomButton | src/components/ui/button.tsx | Button | MIGRATE | HIGH |
| CustomCard | src/components/ui/card.tsx | Card | MIGRATE | HIGH |
| CustomInput | src/components/ui/input.tsx | TextField | MIGRATE | HIGH |
| CustomModal | src/components/ui/modal.tsx | Modal | MIGRATE | MEDIUM |
| CustomTabs | src/components/ui/tabs.tsx | Tabs | MIGRATE | MEDIUM |
| CustomWizard | src/components/ui/wizard.tsx | None | KEEP | N/A |
```

---

## Phase 3: Migrate

### Step 3.1: Migration Priority

**Migrate in this order:**

1. **HIGH PRIORITY** (used everywhere):
   - Button
   - Input/TextField
   - Card

2. **MEDIUM PRIORITY** (used frequently):
   - Modal
   - Tabs
   - Select
   - Checkbox

3. **LOW PRIORITY** (used occasionally):
   - Tooltip
   - Popover
   - Badge
   - Avatar

### Step 3.2: Migration Process (Per Component)

**For each component to migrate:**

#### Step A: Find All Usages

```bash
# Find where CustomButton is imported and used
grep -r "CustomButton" src/ --include="*.tsx" --include="*.jsx"
```

**Expected output:**
```
src/pages/dashboard.tsx:import { CustomButton } from '@/components/ui/button';
src/pages/dashboard.tsx:      <CustomButton variant="primary">Submit</CustomButton>
src/components/form.tsx:import { CustomButton } from '@/components/ui/button';
```

#### Step B: Create Migration Map

**Map old props to new props:**

| Custom Component Prop | HeroUI Component Prop | Notes |
|----------------------|----------------------|-------|
| `onClick` | `onPress` | HeroUI uses React Aria events |
| `loading` | `isDisabled={loading}` + render Spinner | Combine props |
| `variant="primary"` | `variant="primary"` | Same ✅ |
| `size="sm"` | `size="sm"` | Same ✅ |

#### Step C: Migrate One File at a Time

**Template for migration:**

```tsx
// BEFORE (using custom component)
import { CustomButton } from '@/components/ui/button';

function MyComponent() {
  const [loading, setLoading] = useState(false);
  
  return (
    <CustomButton 
      variant="primary" 
      size="lg"
      loading={loading}
      onClick={handleClick}
    >
      Submit
    </CustomButton>
  );
}
```

```tsx
// AFTER (using HeroUI)
import { Button, Spinner } from '@heroui/react';

function MyComponent() {
  const [loading, setLoading] = useState(false);
  
  return (
    <Button 
      variant="primary" 
      size="lg"
      isDisabled={loading}
      onPress={handleClick}
    >
      {loading ? (
        <>
          <Spinner size="sm" className="mr-2" />
          Loading...
        </>
      ) : (
        'Submit'
      )}
    </Button>
  );
}
```

#### Step D: Update Imports

**Find and replace:**

```bash
# Before
import { CustomButton } from '@/components/ui/button';

# After
import { Button } from '@heroui/react';
```

#### Step E: Test the Migration

**For each migrated file:**

1. ✅ Component renders without errors
2. ✅ All props work correctly
3. ✅ Click/interaction works
4. ✅ Visual styling is correct
5. ✅ Dark mode works
6. ✅ Responsive design works
7. ✅ Accessibility (keyboard navigation) works

#### Step F: Delete Custom Component (After All Usages Migrated)

**Only delete when:**
- ✅ All files using it have been migrated
- ✅ No imports remain
- ✅ Tests pass

```bash
# Search for any remaining imports
grep -r "CustomButton" src/

# If no results, safe to delete
rm src/components/ui/button.tsx
```

---

## Phase 4: Verify

### Step 4.1: Run Verification Checks

**Execute these commands:**

```bash
# 1. Check for TypeScript errors
npm run type-check
# or
tsc --noEmit

# 2. Check for linting errors
npm run lint

# 3. Run build
npm run build

# 4. Search for old imports
grep -r "from '@/components/ui" src/ | grep -v "// migrated"

# 5. Check bundle size (should be smaller)
npm run build
# Check dist/ folder size
```

### Step 4.2: Manual Testing Checklist

**Test each migrated component:**

- [ ] **Renders correctly** in light mode
- [ ] **Renders correctly** in dark mode
- [ ] **Responds to clicks/interactions**
- [ ] **Keyboard navigation works** (Tab, Enter, Space, Esc)
- [ ] **Screen reader compatible** (use browser DevTools)
- [ ] **Responsive on mobile**
- [ ] **No console errors**
- [ ] **Loading states work** (if applicable)
- [ ] **Error states work** (if applicable)
- [ ] **Disabled states work** (if applicable)

### Step 4.3: Performance Verification

**Check bundle size reduction:**

```bash
# Before migration
npm run build
du -sh dist/

# After migration
npm run build
du -sh dist/

# Compare the difference
```

**Expected result:**
- Bundle size should be **smaller** after migration
- Page load time should be **faster**

---

## Phase 5: Document

### Step 5.1: Update Component Documentation

**For each component that was kept (not migrated), add JSDoc:**

```tsx
/**
 * CustomWizard Component
 * 
 * @description Multi-step form wizard with progress tracking
 * 
 * @reason NOT_IN_HEROUI - HeroUI v3 does not provide a wizard/stepper component
 * 
 * @example
 * ```tsx
 * <CustomWizard steps={steps} onComplete={handleComplete} />
 * ```
 */
export function CustomWizard({ steps, onComplete }) {
  // ...
}
```

### Step 5.2: Create Migration Report

**Document what was done:**

```markdown
# Component Migration Report

**Date:** [Today's date]
**Performed by:** [Your name or "Automated migration"]

## Summary

- **Total custom components audited:** 15
- **Migrated to HeroUI:** 12
- **Kept as custom:** 3
- **Bundle size reduction:** 45 KB (12%)
- **TypeScript errors fixed:** 0
- **Tests passing:** ✅ All

## Migrated Components

| Component | From | To | Files Changed | Status |
|-----------|------|-----|---------------|---------|
| CustomButton | src/components/ui/button.tsx | @heroui/react Button | 23 files | ✅ Complete |
| CustomCard | src/components/ui/card.tsx | @heroui/react Card | 18 files | ✅ Complete |
| CustomInput | src/components/ui/input.tsx | @heroui/react TextField | 31 files | ✅ Complete |
| ... | ... | ... | ... | ... |

## Kept Components (Not Migrated)

| Component | Reason | Recommendation |
|-----------|--------|----------------|
| CustomWizard | Not available in HeroUI | Keep - business-specific |
| CustomChartWidget | Not available in HeroUI | Consider recharts library |
| CustomDashboardGrid | Not available in HeroUI | Keep - complex layout |

## Issues Encountered

- None

## Next Steps

- [ ] Monitor performance metrics
- [ ] Update developer documentation
- [ ] Train team on HeroUI v3 components
- [ ] Set up linting rules to prevent future custom components
```

### Step 5.3: Update Developer Instructions

**Add this section to `dev_instruction.md`:**

```markdown
## 🚫 Custom Component Policy

**BEFORE creating a custom UI component:**

1. ✅ Check if HeroUI v3 has it: https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components
2. ✅ Check local documentation: ./heroui-docs.txt
3. ✅ Try extending HeroUI with `asChild` or `tailwind-variants`
4. ✅ Ask in team chat: "Does HeroUI have X component?"

**ONLY create custom components when:**
- ❌ HeroUI does not provide it
- ❌ Cannot be achieved with composition
- ❌ Business-specific logic required

**IF you create a custom component:**
- ✅ Document WHY in JSDoc with `@reason NOT_IN_HEROUI`
- ✅ Get code review approval
- ✅ Add to custom components registry

**Violation consequences:**
- 🔴 Code review rejection
- 🔴 Required refactor before merge
```

---

## Component Migration Examples

### Example 1: Button Migration

**BEFORE (Custom):**

```tsx
// src/components/ui/button.tsx
interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function CustomButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  children,
  icon
}: CustomButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${disabled || loading ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {loading ? <span>Loading...</span> : children}
    </button>
  );
}
```

**AFTER (HeroUI):**

```tsx
// Delete src/components/ui/button.tsx

// In usage files:
import { Button, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';

// Usage
<Button 
  variant="primary"  // Same ✅
  size="md"          // Same ✅
  isDisabled={disabled || loading}  // Changed
  onPress={handleClick}  // Changed from onClick
>
  {icon && <Icon icon="gravity-ui:check" className="mr-2" />}
  {loading ? (
    <>
      <Spinner size="sm" className="mr-2" />
      Loading...
    </>
  ) : (
    children
  )}
</Button>
```

### Example 2: Card Migration

**BEFORE (Custom):**

```tsx
// src/components/ui/card.tsx
interface CustomCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function CustomCard({ 
  title, 
  description, 
  children, 
  footer,
  className 
}: CustomCardProps) {
  return (
    <div className={`card ${className}`}>
      {(title || description) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {description && <p className="card-description">{description}</p>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
```

**AFTER (HeroUI):**

```tsx
// Delete src/components/ui/card.tsx

// In usage files:
import { Card } from '@heroui/react';

// Usage - Compound components pattern
<Card className={className}>
  <Card.Header>
    <Card.Title>{title}</Card.Title>
    <Card.Description>{description}</Card.Description>
  </Card.Header>
  <Card.Body>
    {children}
  </Card.Body>
  {footer && (
    <Card.Footer>
      {footer}
    </Card.Footer>
  )}
</Card>
```

### Example 3: Input/TextField Migration

**BEFORE (Custom):**

```tsx
// src/components/ui/input.tsx
interface CustomInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password';
}

export function CustomInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  type = 'text'
}: CustomInputProps) {
  return (
    <div className="input-wrapper">
      {label && (
        <label className={`input-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`input ${error ? 'error' : ''}`}
      />
      {error && <span className="input-error">{error}</span>}
      {helperText && <span className="input-helper">{helperText}</span>}
    </div>
  );
}
```

**AFTER (HeroUI):**

```tsx
// Delete src/components/ui/input.tsx

// In usage files:
import { TextField } from '@heroui/react';

// Usage - Compound components pattern
<TextField 
  isRequired={required}
  isDisabled={disabled}
  isInvalid={!!error}
>
  <TextField.Label>{label}</TextField.Label>
  <TextField.Input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}  // HeroUI accepts string directly
  />
  {helperText && (
    <TextField.Description>{helperText}</TextField.Description>
  )}
  {error && (
    <TextField.Error>{error}</TextField.Error>
  )}
</TextField>
```

### Example 4: Modal Migration

**BEFORE (Custom):**

```tsx
// src/components/ui/modal.tsx
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function CustomModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}: CustomModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal modal-${size}`} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h2>{title}</h2>
            <button onClick={onClose}>×</button>
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
```

**AFTER (HeroUI):**

```tsx
// Delete src/components/ui/modal.tsx

// In usage files:
import { Modal, Button } from '@heroui/react';

// Usage - Compound components pattern
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  size={size}
>
  <Modal.Content>
    {title && (
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Close />
      </Modal.Header>
    )}
    <Modal.Body>
      {children}
    </Modal.Body>
    {footer && (
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    )}
  </Modal.Content>
</Modal>
```

### Example 5: Tabs Migration

**BEFORE (Custom):**

```tsx
// src/components/ui/tabs.tsx
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function CustomTabs({ tabs, defaultTab, onChange }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className="tabs">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
```

**AFTER (HeroUI):**

```tsx
// Delete src/components/ui/tabs.tsx

// In usage files:
import { Tabs } from '@heroui/react';

// Usage - Compound components pattern
<Tabs 
  defaultSelectedKey={defaultTab || tabs[0]?.id}
  onSelectionChange={(key) => onChange?.(key as string)}
>
  <Tabs.ListWrapper>
    <Tabs.List aria-label="Navigation tabs">
      {tabs.map((tab) => (
        <Tabs.Tab key={tab.id} id={tab.id}>
          {tab.label}
        </Tabs.Tab>
      ))}
    </Tabs.List>
    <Tabs.Indicator />
  </Tabs.ListWrapper>
  
  {tabs.map((tab) => (
    <Tabs.Panel key={tab.id} id={tab.id}>
      {tab.content}
    </Tabs.Panel>
  ))}
</Tabs>
```

### Example 6: Select/Dropdown Migration

**BEFORE (Custom):**

```tsx
// src/components/ui/select.tsx
interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  error
}: CustomSelectProps) {
  return (
    <div className="select-wrapper">
      {label && <label className="select-label">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`select ${error ? 'error' : ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="select-error">{error}</span>}
    </div>
  );
}
```

**AFTER (HeroUI):**

```tsx
// Delete src/components/ui/select.tsx

// In usage files:
import { Select } from '@heroui/react';

// Usage
<Select
  label={label}
  placeholder={placeholder}
  selectedKeys={value ? [value] : []}
  onSelectionChange={(keys) => {
    const selected = Array.from(keys)[0];
    onChange(selected as string);
  }}
  isInvalid={!!error}
  errorMessage={error}
>
  {options.map((option) => (
    <Select.Item key={option.value} value={option.value}>
      {option.label}
    </Select.Item>
  ))}
</Select>
```

---

## HeroUI v3 Components Reference

### Quick Component Lookup

**Need a button?** → `<Button>` from `@heroui/react`

**Need an input field?** → `<TextField>` from `@heroui/react`

**Need a card?** → `<Card>` from `@heroui/react`

**Need a modal/dialog?** → `<Modal>` from `@heroui/react`

**Need tabs?** → `<Tabs>` from `@heroui/react`

**Need a dropdown?** → `<Select>` or `<Dropdown>` from `@heroui/react`

**Need a checkbox?** → `<Checkbox>` from `@heroui/react`

**Need a switch/toggle?** → `<Switch>` from `@heroui/react`

**Need a slider?** → `<Slider>` from `@heroui/react`

**Need loading state?** → `<Spinner>` or `<Progress>` from `@heroui/react`

**Need a tooltip?** → `<Tooltip>` from `@heroui/react`

**Need an alert?** → `<Alert>` from `@heroui/react`

**Need a table?** → `<Table>` from `@heroui/react`

**Need an avatar?** → `<Avatar>` from `@heroui/react`

**Need a badge?** → `<Badge>` or `<Chip>` from `@heroui/react`

**Need skeleton loading?** → `<Skeleton>` from `@heroui/react`

**Need date picker?** → `<DatePicker>` from `@heroui/react`

**Need accordion?** → `<Accordion>` from `@heroui/react`

**Need breadcrumbs?** → `<Breadcrumbs>` from `@heroui/react`

**Need pagination?** → `<Pagination>` from `@heroui/react`

### Full Component List

See the complete list here:
- GitHub: https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components
- Local docs: `./heroui-docs.txt`
- Online docs: https://v3.heroui.com/docs/components

---

## Execution Checklist for LLM

**Phase 1: Audit** (Do this first)
- [ ] List all files in `src/components/`
- [ ] Read each component file
- [ ] Extract component purpose and props
- [ ] Check if HeroUI has equivalent
- [ ] Create migration decision table

**Phase 2: Categorize**
- [ ] Mark components as MIGRATE or KEEP
- [ ] Prioritize: HIGH → MEDIUM → LOW
- [ ] Document reasons for keeping custom components

**Phase 3: Migrate** (Do one component at a time)
- [ ] Find all usages with grep
- [ ] Create prop mapping table
- [ ] Migrate one file at a time
- [ ] Update imports
- [ ] Test each migration
- [ ] Delete custom component when done

**Phase 4: Verify**
- [ ] Run `npm run type-check`
- [ ] Run `npm run lint`
- [ ] Run `npm run build`
- [ ] Search for old imports
- [ ] Compare bundle size
- [ ] Manual testing

**Phase 5: Document**
- [ ] Add JSDoc to kept components
- [ ] Create migration report
- [ ] Update developer instructions
- [ ] Commit changes

---

## Common Issues & Solutions

### Issue 1: TypeScript Errors After Migration

**Problem:**
```
Property 'onClick' does not exist on type 'ButtonProps'
```

**Solution:**
```tsx
// Change onClick to onPress
<Button onPress={handleClick}>Click</Button>
```

### Issue 2: Missing Loading State

**Problem:**
```tsx
// Old: loading prop
<CustomButton loading={true}>Submit</CustomButton>
```

**Solution:**
```tsx
// New: combine isDisabled + render Spinner
<Button isDisabled={loading}>
  {loading ? <><Spinner size="sm" className="mr-2" />Loading...</> : 'Submit'}
</Button>
```

### Issue 3: Different Styling

**Problem:** Component looks different after migration

**Solution:**
```tsx
// Add custom classes if needed
<Button className="custom-spacing px-6 py-3">
  Custom Style
</Button>

// Or use CSS variables
<Button className="[&]:bg-custom-color">
  Custom Color
</Button>
```

### Issue 4: Missing Compound Structure

**Problem:**
```tsx
// Old way (props-based)
<TextField label="Email" error="Invalid" />
```

**Solution:**
```tsx
// New way (compound components)
<TextField>
  <TextField.Label>Email</TextField.Label>
  <TextField.Input />
  <TextField.Error>Invalid</TextField.Error>
</TextField>
```

---

## Success Criteria

**Migration is complete when:**

✅ All custom components using HeroUI equivalents are replaced
✅ No TypeScript errors
✅ No linting errors
✅ Build succeeds
✅ Bundle size is reduced
✅ All tests pass
✅ Manual testing passes
✅ Dark mode works
✅ Accessibility works (keyboard navigation)
✅ Documentation is updated
✅ Migration report is created

---

## Final Notes

**Remember:**
1. Migrate **one component at a time**
2. **Test after each migration**
3. **Don't delete** custom components until all usages are migrated
4. **Document** why you're keeping any custom components
5. **Update** the developer instructions to prevent this in the future

**If you get stuck:**
- Check `./heroui-docs.txt` for component documentation
- Check https://v3.heroui.com/docs/components for examples
- Check https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components for component list

---

**Good luck with the migration! 🚀**
