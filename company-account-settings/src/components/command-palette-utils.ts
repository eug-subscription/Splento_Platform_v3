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

    /** Footer text size using standard Tailwind token (text-xs = 12px) */
    FOOTER_TEXT_SIZE: 'text-xs',
} as const;

/**
 * Section type for determining styling
 */
export type CommandSectionType = 'actions' | 'default';

/**
 * Get CSS classes for section headers based on section name
 * 
 * @param section - Section name (e.g., "Actions", "Navigation")
 * @returns CSS class string for the section header
 * 
 * @example
 * ```tsx
 * <Header className={getSectionHeaderClasses("Actions")}>
 *   Actions
 * </Header>
 * ```
 */
export function getSectionHeaderClasses(section: string): string {
    const baseClasses = "mb-2 px-6 pb-2 pt-4 text-xs font-bold uppercase tracking-wide";
    const isActionSection = section === "Actions";

    // Actions section uses AI purple accent, others use muted gray
    const colorClasses = isActionSection
        ? "mt-4 text-accent-ai"
        : "text-muted";

    return `${baseClasses} ${colorClasses}`;
}

/**
 * Get CSS classes for item icon and label based on section type
 * 
 * @param section - Section name
 * @returns Object with icon and label class strings
 * 
 * @example
 * ```tsx
 * const classes = getItemContentClasses("Actions");
 * <Icon className={classes.icon} />
 * <Label className={classes.label} />
 * ```
 */
export function getItemContentClasses(section: string): {
    icon: string;
    label: string;
} {
    const isActionSection = section === "Actions";

    return {
        icon: isActionSection
            ? "shrink-0 rounded-lg p-0 text-accent-ai"
            : "shrink-0 rounded-lg p-0 text-muted",
        label: isActionSection
            ? "truncate text-base font-medium text-accent-ai"
            : "truncate text-base font-medium",
    };
}
