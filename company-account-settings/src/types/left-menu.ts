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

export interface LeftMenuProps {
    className?: string;
    logo?: React.ReactNode;
    user?: {
        name: string;
        email?: string;
        role?: string;
        avatar?: string;
    };
    currentPath?: string; // To determine active state
    onNavigate?: (path: string) => void;
    onUserClick?: () => void;
    onHelpClick?: () => void;
    onLogout?: () => void;
    header?: React.ReactNode; // Custom header content
    footer?: React.ReactNode; // Custom footer content
    sections?: Array<{ id: string; title: string; items: MenuItem[] }>;
}
