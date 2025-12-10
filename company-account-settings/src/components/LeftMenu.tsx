"use client";

import { useMemo } from "react";
import { ListBox, Avatar, Label, Header, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { MenuItem, LeftMenuProps } from "../types/left-menu";

// Define consistent styling constants
const MENU_STYLES = {
    // z-40 to sit below modals (z-50), hidden on mobile by default (lg:flex)
    container: "hidden lg:flex fixed left-0 top-0 h-full w-[280px] z-40 flex-col border-r border-separator bg-surface-1/80 backdrop-blur-xl shadow-surface transition-all duration-300",
    header: "flex flex-col gap-6 px-4 py-6 shrink-0",
    logoRow: "flex items-center gap-3 px-3",

    userSection: "flex items-center gap-3 cursor-pointer group",
    userText: "flex flex-col flex-1 min-w-0 items-start text-left",
    userName: "text-sm font-medium text-foreground truncate",
    userRole: "text-xs text-muted truncate",
    search: "w-full",
    body: "flex-1 overflow-y-auto px-4 py-2 custom-scrollbar",
    sectionTitle: "text-xs font-medium text-muted/70 px-2 mb-2 mt-6 uppercase tracking-wider",
    item: "group rounded-lg px-3 py-2 data-[hover=true]:bg-surface-2 data-[selected=true]:bg-surface-2 text-muted-foreground data-[selected=true]:text-foreground transition-colors",
    itemContent: "flex items-center gap-3 w-full",
    itemIcon: "size-5 shrink-0 text-muted-foreground/70 group-data-[selected=true]:text-foreground",
    itemLabel: "flex-1 truncate text-sm font-medium",
    endContent: "flex items-center gap-2",
    badge: "px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-3 text-foreground min-w-[20px] text-center",
    footer: "mt-auto px-4 py-6 border-t border-separator/50 space-y-1",
};

// Default menu configuration
const DEFAULT_MENU_SECTIONS = [
    {
        id: "general",
        title: "General",
        items: [
            { id: "home", label: "Home", icon: "gravity-ui:house", href: "/dashboard" },
            { id: "studio", label: "Studio", icon: "gravity-ui:palette", href: "/studio" },
            { id: "services", label: "Services", icon: "gravity-ui:shopping-bag", href: "#services" },
            { id: "analytics", label: "Analytics", icon: "gravity-ui:chart-column", href: "/analytics" },
        ]
    },
    {
        id: "work",
        title: "Work",
        items: [
            { id: "activity", label: "Activity", icon: "gravity-ui:pulse", href: "/activity" },
            { id: "batch", label: "Batch", icon: "gravity-ui:layers", href: "/batch" },
            { id: "media-library", label: "Media Library", icon: "gravity-ui:folder-open", href: "/media-library" },

            { id: "orders", label: "Orders", icon: "gravity-ui:shopping-cart", href: "/orders" },
        ]
    },
    {
        id: "company",
        title: "Company",
        items: [
            { id: "team", label: "Team", icon: "gravity-ui:persons", href: "/team" },
            { id: "developers", label: "Developers", icon: "gravity-ui:code", href: "/developers" },
            { id: "settings", label: "Settings", icon: "gravity-ui:gear", href: "#settings" },
        ]
    }
];

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
    sections = DEFAULT_MENU_SECTIONS
}: LeftMenuProps) {

    // Compute active item from path
    const activeItemId = useMemo(() => {
        for (const section of sections) {
            const match = section.items.find(item => item.href === currentPath);
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
                        <ListBox.Section key={section.id}>
                            <Header className={MENU_STYLES.sectionTitle}>
                                {section.title}
                            </Header>

                            {section.items.map((item) => (
                                <ListBox.Item
                                    key={item.id}
                                    id={item.id}
                                    textValue={item.label}
                                    className={MENU_STYLES.item}
                                >
                                    <div className={MENU_STYLES.itemContent}>
                                        {/* Icon or Avatar */}
                                        {item.isAvatar ? (
                                            <Avatar
                                                className="size-5 text-[9px] bg-surface-3 text-foreground shrink-0"
                                                size="sm"
                                            >
                                                <Avatar.Fallback>{item.avatarName || item.label.substring(0, 2)}</Avatar.Fallback>
                                            </Avatar>
                                        ) : (
                                            item.icon && <Icon icon={item.icon} className={MENU_STYLES.itemIcon} />
                                        )}

                                        <Label className={MENU_STYLES.itemLabel}>{item.label}</Label>

                                        {/* End Content: Badges or Actions */}
                                        <div className={MENU_STYLES.endContent}>
                                            {item.actionIcon && (
                                                <Button isIconOnly size="sm" variant="ghost" className="size-5 min-w-4 text-muted-foreground hover:text-foreground">
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
                            className="w-full justify-start px-3 text-sm font-medium text-muted-foreground data-[hover=true]:text-foreground data-[hover=true]:bg-surface-2 gap-3"
                            onPress={onHelpClick}
                        >
                            <Icon icon="gravity-ui:circle-question" className="size-5 shrink-0" />
                            Help & Information
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start px-3 text-sm font-medium text-muted-foreground data-[hover=true]:text-foreground data-[hover=true]:bg-surface-2 gap-3"
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

