import type { Product } from '../types/products';

export const PRODUCTS: Product[] = [
    {
        id: 'prof-photography',
        title: 'Professional Photography',
        subtitle: 'On-demand pro photographers',
        description: 'High-quality photography for events, real estate, food, and e-commerce. Book a vetted professional in seconds.',
        serviceType: 'human',
        thumbnail: '/images/products/prof-photography.jpg',
        ctaLabel: 'Book Now',
        ctaUrl: '#book-photography',
        isPopular: true,
        sortOrder: 1
    },
    {
        id: 'prof-videography',
        title: 'Professional Videography',
        subtitle: 'Cinematic video production',
        description: 'Expert videographers for corporate events, interviews, commercials, and promotional content.',
        serviceType: 'human',
        thumbnail: 'https://placehold.co/600x400?text=Pro+Videography',
        ctaLabel: 'Book Now',
        ctaUrl: '#book-videography',
        sortOrder: 2
    },
    {
        id: 'human-photo-editing',
        title: 'Professional Photo Editing',
        subtitle: 'Hand-retouched by experts',
        description: 'Detailed retouching, color correction, and composition adjustment by senior editors.',
        serviceType: 'human',
        thumbnail: 'https://placehold.co/600x400?text=Photo+Editing',
        ctaLabel: 'Order',
        ctaUrl: '#order-editing',
        sortOrder: 3
    },
    {
        id: 'human-video-editing',
        title: 'Professional Video Editing',
        subtitle: 'Narrative and commercial cuts',
        description: 'Full-service post-production including sound design, color grading, and motion graphics.',
        serviceType: 'human',
        thumbnail: 'https://placehold.co/600x400?text=Video+Editing',
        ctaLabel: 'Order',
        ctaUrl: '#order-video-editing',
        sortOrder: 4
    },
    {
        id: 'human-moderation',
        title: 'Content Moderation',
        subtitle: 'Manual quality assurance',
        description: 'Human review of user-generated content to ensure brand safety and compliance.',
        serviceType: 'human',
        thumbnail: 'https://placehold.co/600x400?text=Moderation',
        ctaLabel: 'Order',
        ctaUrl: '#order-moderation',
        sortOrder: 5
    },

    // AI Tools
    {
        id: 'ai-background',
        title: 'AI Background Replacement',
        subtitle: 'Instant background swap',
        description: 'Automatically remove and replace backgrounds in seconds using advanced AI.',
        serviceType: 'ai',
        thumbnail: 'https://placehold.co/600x400?text=AI+Background',
        ctaLabel: 'Launch Tool',
        ctaUrl: '#tool-bg-remover',
        isPopular: true,
        sortOrder: 6
    },
    {
        id: 'ai-upscaler',
        title: 'Image Upscaler',
        subtitle: '4K/8K resolution enhancement',
        description: 'Upscale low-resolution images without losing quality using super-resolution neural networks.',
        serviceType: 'ai',
        thumbnail: 'https://placehold.co/600x400?text=AI+Upscaler',
        ctaLabel: 'Launch Tool',
        ctaUrl: '#tool-upscaler',
        sortOrder: 7
    },
    {
        id: 'ai-video-gen',
        title: 'AI Video Generator',
        subtitle: 'Text-to-video creation',
        description: 'Generate marketing videos from simple text prompts with realistic avatars and voiceovers.',
        serviceType: 'ai',
        thumbnail: 'https://placehold.co/600x400?text=AI+Video+Gen',
        ctaLabel: 'Generate',
        ctaUrl: '#tool-video-gen',
        sortOrder: 8
    },
    {
        id: 'ai-virtual-tour',
        title: 'Virtual Tour Creator',
        subtitle: '360° panorama stitching',
        description: 'Create immersive virtual tours from 360° photos automatically.',
        serviceType: 'ai',
        thumbnail: 'https://placehold.co/600x400?text=Virtual+Tour',
        ctaLabel: 'Generate',
        ctaUrl: '#tool-virtual-tour',
        sortOrder: 9
    },
    {
        id: 'ai-food-enhance',
        title: 'Food Photo Enhancer',
        subtitle: 'Appetite-appeal optimization',
        description: 'Specific AI model trained to enhance food photography for menus and delivery apps.',
        serviceType: 'ai',
        thumbnail: 'https://placehold.co/600x400?text=Food+Enhancer',
        ctaLabel: 'Launch Tool',
        ctaUrl: '#tool-food-enhance',
        sortOrder: 10
    },
    {
        id: 'ai-ecommerce',
        title: 'E-commerce Product Shot',
        subtitle: 'Virtual staging studio',
        description: 'Place products in realistic lifestyle settings without a physical photoshoot.',
        serviceType: 'ai',
        thumbnail: 'https://placehold.co/600x400?text=E-commerce+AI',
        ctaLabel: 'Generate',
        ctaUrl: '#tool-product-shot',
        sortOrder: 11
    },
    {
        id: 'ai-ugc',
        title: 'UGC Creator',
        subtitle: 'Synthetic user reviews',
        description: 'Generate authentic-looking user generated content videos for social proof.',
        serviceType: 'ai',
        thumbnail: 'https://placehold.co/600x400?text=UGC+Creator',
        ctaLabel: 'Generate',
        ctaUrl: '#tool-ugc',
        sortOrder: 12
    },

    // Hybrid Services
    {
        id: 'hybrid-food',
        title: 'Food Photography AI + Human',
        subtitle: 'Best of both worlds',
        description: 'AI-enhanced speed combined with final human quality assurance for perfect food photos.',
        serviceType: 'hybrid',
        thumbnail: 'https://placehold.co/600x400?text=Hybrid+Food',
        ctaLabel: 'Order',
        ctaUrl: '#order-hybrid-food',
        isPopular: true,
        sortOrder: 13
    },
    {
        id: 'hybrid-ecommerce',
        title: 'E-commerce Scale + QA',
        subtitle: 'High volume perfection',
        description: 'Automated bulk editing with manual spot-checks for enterprise catalogs.',
        serviceType: 'hybrid',
        thumbnail: 'https://placehold.co/600x400?text=Hybrid+E-commerce',
        ctaLabel: 'Order',
        ctaUrl: '#order-hybrid-ecom',
        sortOrder: 14
    }
];
