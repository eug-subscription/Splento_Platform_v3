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
 * Section type for determining styling
 */
export type CommandSectionType = 'actions' | 'visionary-ai' | 'default';

/**
 * Get CSS classes for section headers based on section name
 * 
 * @param section - Section name (e.g., "Actions", "Navigation", "Visionary AI")
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
    const baseClasses = "py-2 px-4 text-xs font-semibold uppercase tracking-wide";
    const isAISection = section === "Visionary AI" || section === "Actions";

    // AI sections use purple accent, others use muted gray
    const colorClasses = isAISection
        ? "text-accent-ai"
        : "text-muted";

    return `${baseClasses} ${colorClasses}`;
}

/**
 * Get CSS classes for icon containers based on section type
 * 
 * @param section - Section name
 * @returns CSS class string for icon container
 * 
 * @example
 * ```tsx
 * <div className={getIconContainerClasses("Actions")}>
 *   <Icon icon="gravity-ui:plus" className="size-5" />
 * </div>
 * ```
 */
export function getIconContainerClasses(section: string): string {
    const baseClasses = "size-12 rounded-lg flex items-center justify-center shrink-0";
    const isAISection = section === "Visionary AI";

    // AI sections get purple tinted background
    const bgClasses = isAISection
        ? "bg-accent-ai/10"
        : "bg-surface-2";

    return `${baseClasses} ${bgClasses}`;
}

/**
 * Get CSS classes for AI item border highlight
 * 
 * @returns CSS class string for AI feature border
 * 
 * @example
 * ```tsx
 * <ListBox.Item className={getAIItemBorderClasses()}>
 *   Ask Visionary AI...
 * </ListBox.Item>
 * ```
 */
export function getAIItemBorderClasses(): string {
    return "mx-2 my-1 border-2 border-accent-ai rounded-lg";
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
    const isAISection = section === "Visionary AI" || section === "Actions";

    return {
        icon: isAISection
            ? "size-5 text-accent-ai"
            : "size-5 text-muted",
        label: isAISection
            ? "text-base font-medium text-accent-ai"
            : "text-base font-medium",
    };
}
