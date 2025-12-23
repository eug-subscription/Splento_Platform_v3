export interface TypeScaleItem {
    name: string;
    size: string;
    lineHeight: string;
    tracking: string;
    weight: number;
    use: string;
}

export const typeScale: TypeScaleItem[] = [
    { name: 'Display XL', size: '4.5rem', lineHeight: '1', tracking: '-0.02em', weight: 700, use: 'Hero headlines' },
    { name: 'Display LG', size: '3.75rem', lineHeight: '1', tracking: '-0.02em', weight: 700, use: 'Page titles' },
    { name: 'Display MD', size: '3rem', lineHeight: '1.1', tracking: '-0.015em', weight: 700, use: 'Section headers' },
    { name: 'Display SM', size: '2.25rem', lineHeight: '1.15', tracking: '-0.01em', weight: 600, use: 'Card titles' },
    { name: 'Heading XL', size: '1.875rem', lineHeight: '1.2', tracking: '-0.01em', weight: 600, use: 'Major headings' },
    { name: 'Heading LG', size: '1.5rem', lineHeight: '1.25', tracking: '-0.005em', weight: 600, use: 'Subheadings' },
    { name: 'Heading MD', size: '1.25rem', lineHeight: '1.3', tracking: '0', weight: 600, use: 'Component titles' },
    { name: 'Heading SM', size: '1.125rem', lineHeight: '1.4', tracking: '0', weight: 500, use: 'Small headers' },
    { name: 'Body LG', size: '1.125rem', lineHeight: '1.6', tracking: '0', weight: 400, use: 'Lead paragraphs' },
    { name: 'Body MD', size: '1rem', lineHeight: '1.6', tracking: '0', weight: 400, use: 'Default body text' },
    { name: 'Body SM', size: '0.875rem', lineHeight: '1.5', tracking: '0', weight: 400, use: 'Secondary text' },
    { name: 'Caption', size: '0.75rem', lineHeight: '1.4', tracking: '0.01em', weight: 400, use: 'Labels, hints' },
    { name: 'Overline', size: '0.75rem', lineHeight: '1.4', tracking: '0.08em', weight: 500, use: 'Category labels' },
];

export const fontWeights = [
    { weight: 300, name: 'Light', use: 'Decorative, large display' },
    { weight: 400, name: 'Regular', use: 'Body text, paragraphs' },
    { weight: 500, name: 'Medium', use: 'Emphasis, UI labels' },
    { weight: 600, name: 'Semibold', use: 'Headings, buttons' },
    { weight: 700, name: 'Bold', use: 'Display, strong emphasis' },
    { weight: 800, name: 'Extrabold', use: 'Hero text, marketing' },
];

export const typographyRules = {
    do: [
        'Use sentence case for headlines',
        'Keep body text between 45-75 characters per line',
        'Use tight leading (1.0-1.2) for large display text',
        'Use relaxed leading (1.5-1.6) for body text',
        'Pair semibold headings with regular body',
        'Use negative tracking for large headlines',
        'Left-align body text for readability',
    ],
    dont: [
        'Use ALL CAPS for long headlines',
        'Right-align body text',
        'Use light weight for small body text',
        'Mix too many weights in one component',
        'Use positive tracking for headlines',
        'Set body text smaller than 14px (0.875rem)',
        'Exceed 80 characters per line',
    ],
};
