import type { ReactNode } from "react";

export interface MenuItem {
    id: string;
    label: string;
    icon?: string;
    href?: string; // URL or path
    action?: () => void; // Click handler
    badge?: string | number; // Notification count or "New" label
    actionIcon?: string; // Secondary icon (e.g., "+")
    isAvatar?: boolean; // If true, render as avatar instead of icon
    avatarName?: string; // Initials for avatar
    isDisabled?: boolean;
    children?: MenuItem[];
}

export interface NavigationSection {
    id: string;
    title: string;
    items: MenuItem[];
}

export interface SharedNavigationProps {
    currentPath?: string;
    onNavigate?: (path: string) => void;
    onUserClick?: () => void;
    onHelpClick?: () => void;
    onLogout?: () => void;
}

export interface LeftMenuProps extends SharedNavigationProps {
    className?: string;
    logo?: ReactNode;
    user?: {
        name: string;
        email?: string;
        role?: string;
        avatar?: string;
    };
    header?: ReactNode;
    footer?: ReactNode;
    sections?: NavigationSection[];
}

export interface MobileNavigationProps extends SharedNavigationProps {
    credits?: number;
    user: {
        name: string;
        role?: string;
        avatar?: string;
    };
    organisation?: {
        name: string;
        id: string;
    };
    sections?: NavigationSection[];
}
