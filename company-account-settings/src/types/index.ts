export interface Manager {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Edit' | 'Read Only';
}

export interface CompanySettings {
    companyName: string;
    companyEmail: string;
    coordinatorEmail: string;
    phone: string;
    vatNumber: string;
    autorenameMode: 'external-id' | 'dish-name' | 'external-id-dish-name';
    unpaidInvoicesLimit: string;
    mailSettings: {
        disableAllEmails: boolean;
        sendChatNotifications: boolean;
    };
    fileNamePrefixes: {
        webAppPhotography: boolean;
        professionalPhotography: boolean;
    };
    prebookingFiles: {
        enableSessionDateInCSV: boolean;
    };
    otherSettings: {
        showPhotographerDetails: boolean;
    };
    billingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    socialLinks: {
        website: string;
        linkedin: string;
        twitter: string;
        facebook: string;
    };
}

// ========== HomePage Types ==========

/**
 * Organization data for org switcher
 */
export interface Organization {
    id: string;
    name: string;
    slug: string;
}

/**
 * Metric card data with trend indicator
 */
export interface MetricData {
    label: string;
    value: string | number;
    change: number; // Percentage change
    trend: 'up' | 'down';
}

/**
 * Tool/Product card data
 */
export interface ToolData {
    id: string;
    name: string;
    description: string;
    image: string;
    category?: string; // Optional category chip (e.g., "Photography", "Editing")
    href?: string; // Optional link to tool
}

/**
 * Quick access link item
 */
export interface QuickAccessLink {
    id: string;
    label: string;
    href: string;
    icon?: string; // Iconify icon name
}

/**
 * Quick access section
 */
export interface QuickAccessSection {
    id: string;
    title: string;
    description: string;
    icon: string; // Iconify icon name
    links?: QuickAccessLink[];
    sdkBadges?: string[]; // For SDK section (JS, Python, Go)
    avatars?: string[]; // For data sources section (user avatars)
}

/**
 * HomePage component props
 */
export interface HomePageProps {
    onToolClick?: (tool: ToolData) => void;
    className?: string;
}

