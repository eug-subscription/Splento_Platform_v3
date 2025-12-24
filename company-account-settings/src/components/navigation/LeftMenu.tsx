

import { useMemo } from "react";
import { ListBox, Avatar, Label, Header, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { MenuItem, LeftMenuProps } from "../../types/navigation";
import { MENU_SECTIONS } from "../../config/navigation";

// Define consistent styling constants
const MENU_STYLES = {
    // z-40 to sit below modals (z-50), hidden on mobile by default (lg:flex)
    container: "hidden lg:flex fixed left-0 top-0 h-full w-[280px] z-40 flex-col border-r border-separator bg-surface-1/80 backdrop-blur-xl shadow-surface transition-all duration-300",
    header: "flex flex-col gap-6 px-4 py-6 shrink-0",
    logoRow: "flex items-center gap-3 px-3",

    userSection: "flex items-center gap-3 cursor-pointer group",
    itemContent: "flex items-center gap-3 w-full",
    itemIcon: "text-muted-foreground group-data-[hovered]:text-foreground group-data-[selected]:text-primary transition-colors",
    itemLabel: "flex-1 text-sm font-medium text-foreground group-data-[selected]:text-primary transition-colors",
    // endContent not strictly needed in list, just in layout
    endContent: "flex items-center gap-2",
    badge: "px-1.5 py-0.5 rounded text-xs font-medium text-foreground bg-surface-3",
    sectionHeader: "px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
    userProfile: "flex items-center gap-3 p-3 rounded-xl hover:bg-surface-2 transition-colors cursor-pointer w-full group",
    userText: "flex flex-col flex-1 min-w-0 items-start text-left",
    userName: "text-sm font-medium text-foreground truncate group-hover:text-foreground transition-colors",
    userRole: "text-xs text-muted-foreground truncate",
    search: "w-full",
    body: "flex-1 overflow-y-auto px-4 py-2 custom-scrollbar",
    sectionTitle: "text-xs font-medium text-muted/70 px-2 mb-2 mt-6 uppercase tracking-wider",
    item: "group rounded-lg px-3 py-2 data-[hovered]:bg-surface-2 data-[selected]:bg-surface-2 text-muted-foreground data-[selected]:text-foreground transition-colors",
    actionButton: "opacity-0 group-hover:opacity-100 transition-opacity",
    footer: "mt-auto px-4 py-6 border-t border-separator/50 space-y-1",
};



export function LeftMenu({
    className,
    logo,
    user = {
        name: "Jane Doe",
        email: "jane@acme.com",
        role: "Product Designer",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    currentPath = "/dashboard",
    onNavigate,
    onUserClick,
    onHelpClick,
    onLogout,
    header,
    footer,
    sections = MENU_SECTIONS
}: LeftMenuProps) {

    // Compute active item from path
    const activeItemId = useMemo(() => {
        for (const section of sections) {
            const match = section.items.find(item => {
                // Exact match for the href
                if (item.href === currentPath) {
                    return true;
                }
                // Partial match for nested routes (e.g., /settings/profile matches /settings)
                if (item.href && currentPath.startsWith(item.href) && item.href !== "/") {
                    return true;
                }
                return false;
            });
            if (match) return match.id;
        }
        return undefined;
    }, [sections, currentPath]);

    return (
        <nav
            className={`${MENU_STYLES.container} ${className || ''}`}
            aria-label="Main navigation"
        >
            {/* 1. Header Area */}
            <div className={MENU_STYLES.header}>
                {header || (
                    <>
                        {/* Logo */}
                        {logo || (
                            <div className={MENU_STYLES.logoRow}>
                                <img
                                    src="/splento-logo-light.svg"
                                    alt="Splento"
                                    className="h-5 w-auto dark:hidden block"
                                />
                                <img
                                    src="/splento-logo-dark.svg"
                                    alt="Splento"
                                    className="h-5 w-auto hidden dark:block"
                                />
                            </div>
                        )}

                        {/* User Profile */}
                        <Button
                            variant="ghost"
                            className="w-full justify-start px-3 h-auto py-2 gap-3 text-left"
                            onPress={onUserClick}
                            aria-label="User profile"
                        >
                            <Avatar size="md" className="shrink-0">
                                <Avatar.Image src={user.avatar} alt={user.name} />
                                <Avatar.Fallback>{user.name?.charAt(0) || "U"}</Avatar.Fallback>
                            </Avatar>
                            <div className={MENU_STYLES.userText}>
                                <p className={MENU_STYLES.userName}>{user.name}</p>
                                <p className={MENU_STYLES.userRole}>{user.role}</p>
                            </div>
                        </Button>
                    </>
                )}
            </div>

            {/* 2. Scrollable Menu Body */}
            <div className={MENU_STYLES.body}>
                <ListBox
                    aria-label="Main Navigation"
                    selectionMode="single"
                    selectedKeys={activeItemId ? new Set([activeItemId]) : new Set()}
                    onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as string;
                        if (!key) return;

                        // Find item logic
                        let item: MenuItem | undefined;
                        for (const section of sections) {
                            const found = section.items.find(i => i.id === key);
                            if (found) {
                                item = found;
                                break;
                            }
                        }

                        if (item?.href) {
                            onNavigate?.(item.href);
                        }
                    }}
                    className="p-0 gap-1"
                >
                    {sections.map((section) => (
                        <ListBox.Section key={section.id} aria-label={section.title}>
                            <Header className={MENU_STYLES.sectionTitle}>
                                {section.title}
                            </Header>

                            {section.items.map((item) => (
                                <ListBox.Item
                                    key={item.id}
                                    id={item.id}
                                    textValue={item.label}
                                    className={MENU_STYLES.item}
                                    aria-label={item.label}
                                >
                                    <div className={MENU_STYLES.itemContent}>
                                        {/* Icon or Avatar */}
                                        {item.isAvatar ? (
                                            <Avatar
                                                className="size-5 shrink-0 bg-transparent"
                                                size="sm"
                                            >
                                                <Avatar.Fallback className="size-5 text-xs bg-surface-3 text-foreground font-medium">
                                                    {item.avatarName || item.label.substring(0, 2)}
                                                </Avatar.Fallback>
                                            </Avatar>
                                        ) : (
                                            item.icon && <Icon icon={item.icon} className={MENU_STYLES.itemIcon} />
                                        )}

                                        <Label className={MENU_STYLES.itemLabel}>{item.label}</Label>

                                        {/* End Content: Badges or Actions */}
                                        <div className={MENU_STYLES.endContent}>
                                            {item.actionIcon && (
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="ghost"
                                                    className={MENU_STYLES.actionButton}
                                                    onPress={item.action}
                                                    aria-label={`${item.label} action`}
                                                >
                                                    <Icon icon={item.actionIcon} />
                                                </Button>
                                            )}
                                            {item.badge && (
                                                <span className={MENU_STYLES.badge}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </ListBox.Item>
                            ))}
                        </ListBox.Section>
                    ))}
                </ListBox>
            </div>

            {/* 3. Footer: Help & Logout */}
            <div className={MENU_STYLES.footer}>
                {footer || (
                    <>
                        <Button
                            variant="ghost"
                            className="w-full justify-start px-3 text-sm font-medium text-muted-foreground data-[hovered]:text-foreground data-[hovered]:bg-surface-2 gap-3"
                            onPress={onHelpClick}
                        >
                            <Icon icon="gravity-ui:circle-question" className="size-5 shrink-0" />
                            Help & Information
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start px-3 text-sm font-medium text-muted-foreground data-[hovered]:text-foreground data-[hovered]:bg-surface-2 gap-3"
                            onPress={onLogout}
                        >
                            <Icon icon="gravity-ui:arrow-right-from-square" className="size-5 shrink-0" />
                            Log Out
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}
