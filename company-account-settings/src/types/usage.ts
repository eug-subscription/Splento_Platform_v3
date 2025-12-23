export type UsageStatus = 'normal' | 'warning' | 'critical';

export interface UsageFeature {
    id: string;
    label: string;
    count: number;
    countUnit: string;        // e.g., 'generated', 'scanned'
    value: number;            // e.g., 200 (credits), 2.5 (GB)
    valueUnit: string;        // e.g., 'cr', 'GB'
    percentage: number;       // 0-100
    trend?: number;           // positive/negative percentage
    color: string;            // Tailwind class or design token var
}

export interface UsageSectionData {
    id: string;
    title: string;
    used: number;
    total: number;
    unit: string;
    percentUsed: number;
    status: UsageStatus;
    features: UsageFeature[];

    actionButton?: {
        label: string;
        onPress: () => void;
        variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'ghost';
    };
}

export interface ProServiceRow {
    id: string;
    label: string;
    count: number;
    spend: number;
    deliverables: number;
    deliverableUnit: 'photos' | 'videos';
    color: 'success' | 'info';
}

export interface UpcomingSession {
    count: number;
    cost: number; // Potential spend
    nextDate: string;
}

export interface ProServicesData {
    period: string; // 'this-month' etc.
    totalSpend: number;
    sessionCount: number;
    currency: string;
    services: ProServiceRow[];
    upcoming: UpcomingSession | null;
}

export interface BillingCategory {
    id: string;
    label: string;
    amount: number;
    percentage: number;
    color: string;
}

export interface BillingSummaryData {
    period: string;
    totalSpend: number;
    currency: string;
    trend: {
        value: number;
        direction: 'up' | 'down' | 'neutral';
    };
    avgMonthly: number;
    categories: BillingCategory[];
}
