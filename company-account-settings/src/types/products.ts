export type ServiceType = 'human' | 'ai' | 'hybrid';
export type FilterOption = 'all' | ServiceType;

export interface Product {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    serviceType: ServiceType;
    thumbnail: string;
    ctaLabel: 'Book Now' | 'Order' | 'Launch Tool' | 'Generate';
    ctaUrl: string;
    isPopular?: boolean;
    sortOrder?: number;
}
