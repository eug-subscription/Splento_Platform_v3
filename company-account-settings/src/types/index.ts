export interface Manager {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Edit' | 'Read Only';
}

export interface CompanyInfo {
    companyName: string;
    companyEmail: string;
    coordinatorEmail: string;
    phone: string;
    vatNumber: string;
}

export interface OtherSettings {
    showPhotographerDetails: boolean;
}

export type AutorenameMode = 'external-id' | 'dish-name' | 'external-id-dish-name';

export interface FileNamePrefixes {
    webAppPhotography: boolean;
    professionalPhotography: boolean;
}

export interface PrebookingSettings {
    enableSessionDateInCSV: boolean;
}

export interface MailSettings {
    disableAllEmails: boolean;
    sendChatNotifications: boolean;
}

export interface SocialLinks {
    website: string;
    linkedin: string;
    instagram: string;
    twitter: string;
    facebook: string;
}

export interface CompanySettings extends CompanyInfo {
    autorenameMode: AutorenameMode;
    unpaidInvoicesLimit: string;
    mailSettings: MailSettings;
    fileNamePrefixes: FileNamePrefixes;
    prebookingFiles: PrebookingSettings;
    otherSettings: OtherSettings;
    billingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    socialLinks: SocialLinks;
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

