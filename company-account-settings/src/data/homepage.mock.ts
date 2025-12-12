/**
 * Mock data for HomePage component
 * Following AccountSettings patterns - export const arrays
 */
import type { Organization, MetricData, ToolData, QuickAccessSection } from '../types';

/**
 * Image placeholder URLs - Easy to swap for real assets  
 */
const IMAGES = {
    HERO_BANNER: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop',
    // Product Enhancer: Clean product shot (Watch)
    PRODUCT_ENHANCER: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=450&fit=crop',
    // Background Remover: Distinct object (Headphones)
    BACKGROUND_REMOVER: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=450&fit=crop',
    // Model Generator: Professional portrait
    MODEL_GENERATOR: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=450&fit=crop',
    // Video Upscaler: High detail landscape
    VIDEO_UPSCALER: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop',
    USER_AVATAR_1: 'https://i.pravatar.cc/150?img=1',
    USER_AVATAR_2: 'https://i.pravatar.cc/150?img=2',
    USER_AVATAR_3: 'https://i.pravatar.cc/150?img=3',
} as const;

/**
 * Sample organizations for org switcher
 */
export const mockOrganizations: Organization[] = [
    { id: '1', name: 'Acme Inc.', slug: 'acme-inc' },
    { id: '2', name: 'Visionary Studio', slug: 'visionary-studio' },
    { id: '3', name: 'PixelBin Enterprise', slug: 'pixelbin-enterprise' },
    { id: '4', name: 'Creative Labs', slug: 'creative-labs' },
];

/**
 * Account health metrics
 */
export const mockMetrics: MetricData[] = [
    {
        label: 'Total Orders',
        value: '1,247',
        change: 12.3,
        trend: 'up',
    },
    {
        label: 'Credits Used',
        value: '840',
        change: 5.2,
        trend: 'up',
    },
    {
        label: 'Success Rate',
        value: '99.8%',
        change: 0.6,
        trend: 'up',
    },
    {
        label: 'API Calls',
        value: '45.2k',
        change: 8.7,
        trend: 'down',
    },
];

/**
 * Featured tools/products
 */
export const mockTools: ToolData[] = [
    {
        id: 'product-enhancer',
        name: 'Product Enhancer',
        description: 'Studio-quality lighting for e-com',
        image: IMAGES.PRODUCT_ENHANCER,
        category: 'Photography',
        href: '/tools/product-enhancer',
    },
    {
        id: 'background-remover',
        name: 'Background Remover',
        description: 'Clean cutouts in seconds',
        image: IMAGES.BACKGROUND_REMOVER,
        category: 'Editor',
        href: '/tools/background-remover',
    },
    {
        id: 'model-generator',
        name: 'Model Generator',
        description: 'AI model radius or demand',
        image: IMAGES.MODEL_GENERATOR,
        href: '/tools/model-generator',
    },
    {
        id: 'video-upscaler',
        name: 'Video Upscaler',
        description: '4K upscaling for social media',
        image: IMAGES.VIDEO_UPSCALER,
        category: 'Video',
        href: '/tools/video-upscaler',
    },
];

/**
 * Quick access sections
 */
export const mockQuickAccess: QuickAccessSection[] = [
    {
        id: 'sdk-integration',
        title: 'SDK Integration',
        description: 'Drop-in libraries for rapid development',
        icon: 'gravity-ui:code',
        sdkBadges: ['JS', 'Python', 'Go'],
        links: [
            { id: 'js-sdk', label: 'JavaScript SDK', href: '/docs/sdk/js', icon: 'gravity-ui:logo-javascript' },
            { id: 'py-sdk', label: 'Python SDK', href: '/docs/sdk/python', icon: 'gravity-ui:logo-python' },
            { id: 'go-sdk', label: 'Go SDK', href: '/docs/sdk/go', icon: 'gravity-ui:file-code' },
        ],
    },
    {
        id: 'data-sources',
        title: 'Connect Data Sources',
        description: 'Seamlessly integrate via cloud storage',
        icon: 'gravity-ui:plugs-connection',
        avatars: [IMAGES.USER_AVATAR_1, IMAGES.USER_AVATAR_2, IMAGES.USER_AVATAR_3],
    },
    {
        id: 'documentation',
        title: 'Documentation',
        description: 'Guides, references and API specs',
        icon: 'gravity-ui:book-open',
        links: [
            { id: 'rest-docs', label: 'REST Docs', href: '/docs/rest' },
            { id: 'api-ref', label: 'API Reference', href: '/docs/api' },
        ],
    },
];

export { IMAGES };
