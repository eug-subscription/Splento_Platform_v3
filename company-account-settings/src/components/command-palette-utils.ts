/**
 * Command Palette Utilities
 * 
 * Reusable utilities and configuration for Command Palette components.
 * Extracted to enable consistent styling and behavior across multiple implementations.
 */

/**
 * Command Palette configuration constants
 * Using standard Tailwind tokens for consistency and maintainability
 */
export const COMMAND_PALETTE_CONFIG = {
    /** Header height using standard Tailwind token */
    HEADER_HEIGHT: 'h-14',

    /** Body height using standard Tailwind token (h-96 = 384px) */
    BODY_HEIGHT: 'h-96',

    /** Footer text size using standard Tailwind token (text-sm = 14px) */
    FOOTER_TEXT_SIZE: 'text-sm',
} as const;

/**
 * Section names constants
 */
export const SECTIONS = {
    VISIONARY_AI: "Visionary AI",
} as const;

export const AI_SEARCH_KEYWORDS = ["ask", "ai", "visionary", "generate", "create"] as const;

/**
 * Shared styles for Command Palette components
 * All styles use semantic Tailwind tokens for theme compatibility
 */
export const COMMAND_PALETTE_STYLES = {
    listItem: "group rounded-lg px-4 py-3 outline-none data-[hover=true]:bg-surface-1/50 data-[focus-visible=true]:bg-surface-1",
    sectionHeader: "py-2 px-4 text-xs font-semibold uppercase tracking-wide text-muted",
    iconContainer: "size-12 rounded-lg flex items-center justify-center shrink-0 bg-surface-2",
    icon: "size-5 text-muted",
    label: "text-base font-medium",
} as const;
