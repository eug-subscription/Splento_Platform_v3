/**
 * Command Palette Types
 * 
 * Type definitions for the Command Palette component.
 * Used for building ⌘K / Ctrl+K search interface.
 */

/**
 * Keyboard shortcut configuration
 */
export interface CommandShortcut {
    /** Display key, e.g., "K", "N", "," */
    key: string;
    /** Modifier key for the shortcut */
    modifier?: "command" | "shift" | "ctrl" | "option" | "alt";
}

/**
 * Individual command item in the palette
 */
export interface CommandItem {
    /** Unique identifier for the command */
    id: string;

    /** Display label for the command */
    label: string;

    /** Optional description shown below the label */
    description?: string;

    /** Iconify icon name, e.g., "gravity-ui:house" */
    icon?: string;

    /** Optional keyboard shortcut displayed on the right */
    shortcut?: CommandShortcut;

    /** Section/group name, e.g., "Navigation", "Actions" */
    section: string;

    /** Callback function executed when command is selected */
    action: () => void;

    /** Additional search terms for filtering */
    keywords?: string[];
}

/**
 * Props for the CommandPalette component
 */
export interface CommandPaletteProps {
    /** Array of command items to display */
    items: CommandItem[];

    /** Placeholder text for the search input */
    placeholder?: string;

    /** Message shown when no results match the search */
    emptyMessage?: string;

    /** Label for the navigation instructions in the footer */
    navigationLabel?: string;

    /** Label for the selection instructions in the footer */
    selectLabel?: string;

    /** Label for the close instructions in the footer */
    closeLabel?: string;
    /** Callback when Visionary AI is activated */
    onAIActivate?: () => void;
}
