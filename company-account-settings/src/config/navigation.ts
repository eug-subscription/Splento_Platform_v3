import type { NavigationSection, NavItem } from "../types/navigation";

export const MENU_SECTIONS: NavigationSection[] = [
    {
        id: 'general',
        title: 'General',
        items: [
            { id: 'home', label: 'Home', icon: 'gravity-ui:house', href: '/dashboard' },
            { id: 'studio', label: 'Studio', icon: 'gravity-ui:palette', href: '/studio' },
            { id: 'services', label: 'Services', icon: 'gravity-ui:shopping-bag', href: '#services' },
            { id: 'analytics', label: 'Analytics', icon: 'gravity-ui:chart-column', href: '/analytics' },
        ]
    },
    {
        id: 'work',
        title: 'Work',
        items: [
            { id: 'activity', label: 'Activity', icon: 'gravity-ui:pulse', href: '/activity' },
            { id: 'batch', label: 'Batch', icon: 'gravity-ui:layers', href: '/batch' },
            { id: 'media-library', label: 'Media Library', icon: 'gravity-ui:folder-open', href: '/media-library' },
            { id: 'orders', label: 'Orders', icon: 'gravity-ui:shopping-cart', href: '/orders' },
        ]
    },
    {
        id: 'company',
        title: 'Company',
        items: [
            { id: 'team', label: 'Team', icon: 'gravity-ui:persons', href: '/team' },
            { id: 'developers', label: 'Developers', icon: 'gravity-ui:code', href: '/developers' },
            { id: 'settings', label: 'Settings', icon: 'gravity-ui:gear', href: '#settings' },
            { id: 'design-hub', label: 'Design Hub', icon: 'gravity-ui:compass', href: '#design-hub' },
        ]
    }
];

// Tabs for the bottom navigation bar
export const PRIMARY_TABS: NavItem[] = [
    { id: 'home', label: 'Home', icon: 'gravity-ui:house', href: '/dashboard' },
    { id: 'studio', label: 'Studio', icon: 'gravity-ui:palette', href: '/studio' },
    { id: 'services', label: 'Services', icon: 'gravity-ui:shopping-bag', href: '#services' },
    { id: 'orders', label: 'Orders', icon: 'gravity-ui:shopping-cart', href: '/orders', badge: 3 },
];

export const mobileNavItems: NavItem[] = [
    ...PRIMARY_TABS,
    { id: 'more', label: 'More', icon: 'gravity-ui:bars' },
];
