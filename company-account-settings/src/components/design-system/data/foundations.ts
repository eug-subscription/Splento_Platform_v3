import { colors } from './colors';

export const foundations = {
    spacing: [
        { name: '1', value: '0.25rem', px: '4px', className: 'p-1', usage: 'Tight gaps, icon padding' },
        { name: '2', value: '0.5rem', px: '8px', className: 'p-2', usage: 'Small gaps, inline spacing' },
        { name: '3', value: '0.75rem', px: '12px', className: 'p-3', usage: 'Compact padding' },
        { name: '4', value: '1rem', px: '16px', className: 'p-4', usage: 'Default padding, gaps' },
        { name: '5', value: '1.25rem', px: '20px', className: 'p-5', usage: 'Medium spacing' },
        { name: '6', value: '1.5rem', px: '24px', className: 'p-6', usage: 'Section padding' },
        { name: '8', value: '2rem', px: '32px', className: 'p-8', usage: 'Large gaps' },
        { name: '10', value: '2.5rem', px: '40px', className: 'p-10', usage: 'Section margins' },
        { name: '12', value: '3rem', px: '48px', className: 'p-12', usage: 'Hero spacing' },
        { name: '16', value: '4rem', px: '64px', className: 'p-16', usage: 'Page sections' },
    ],
    radius: [
        { name: 'XS', value: '0.125rem', variable: '--radius-xs', usage: 'Extra small elements' },
        { name: 'SM', value: '0.25rem', variable: '--radius-sm', usage: 'Small elements' },
        { name: 'MD', value: '0.375rem', variable: '--radius-md', usage: 'Small containers' },
        { name: 'LG', value: '0.5rem', variable: '--radius-lg', usage: 'Small cards' },
        { name: 'XL', value: '0.75rem', variable: '--radius-xl', usage: 'Inputs, fields' },
        { name: '2XL', value: '1rem', variable: '--radius-2xl', usage: 'Panels, dialogs' },
        { name: '3XL', value: '1.5rem', variable: '--radius-3xl', usage: 'Buttons, Cards' },
        { name: '4XL', value: '2rem', variable: '--radius-4xl', usage: 'Large sections' },
        { name: 'Full', value: '9999px', variable: '--radius-full', usage: 'Pills, avatars' },
    ],
    shadows: [
        { name: 'Surface', variable: '--surface-shadow', label: 'Subtle', usage: 'Cards, panels' },
        { name: 'Field', variable: '--field-shadow', label: 'Subtle inner', usage: 'Input fields' },
        { name: 'Overlay', variable: '--overlay-shadow', label: 'Medium', usage: 'Modals, dropdowns' },
        { name: 'Large', variable: '--shadow-large', label: 'High', usage: 'Hero sections' },
    ],
    surfaceHierarchy: [
        {
            name: 'Background',
            token: '--background',
            lightHex: 'oklch(0.99 0 0)',
            darkHex: 'oklch(0.140 0.005 285.89)',
            usage: 'Page background',
            heroui: null,
            isCalculated: false
        },
        {
            name: 'Surface',
            token: '--surface',
            lightHex: `var(${colors.primitives.find(c => c.name === 'White')?.variable})`,
            darkHex: 'oklch(0.2103 0.0059 285.89)',
            usage: 'Cards, panels',
            heroui: '<Surface variant="default">',
            isCalculated: false
        },
        {
            name: 'Surface Secondary',
            token: '--color-surface-secondary',
            lightHex: 'color-mix(...)',
            darkHex: 'color-mix(...)',
            usage: 'Elevated cards, nested sections',
            heroui: '<Surface variant="secondary">',
            isCalculated: true,
            formula: 'surface 94% + foreground 6%'
        },
        {
            name: 'Surface Tertiary',
            token: '--color-surface-tertiary',
            lightHex: 'color-mix(...)',
            darkHex: 'color-mix(...)',
            usage: 'Higher elevation',
            heroui: '<Surface variant="tertiary">',
            isCalculated: true,
            formula: 'surface 92% + foreground 8%'
        },
        {
            name: 'Surface Quaternary',
            token: '--color-surface-quaternary',
            lightHex: 'color-mix(...)',
            darkHex: 'color-mix(...)',
            usage: 'Deepest level',
            heroui: '<Surface variant="quaternary">',
            isCalculated: true,
            formula: 'surface 86% + foreground 14%'
        },
        {
            name: 'Overlay',
            token: '--overlay',
            lightHex: `var(${colors.primitives.find(c => c.name === 'White')?.variable})`,
            darkHex: 'oklch(0.22 0.0059 285.89)',
            usage: 'Modals, popovers, dropdowns',
            heroui: 'Modal, Popover, Dropdown',
            isCalculated: false
        },
    ],
    contentHierarchy: [
        { name: 'Content 1', token: '--content1', lightHex: `var(${colors.primitives.find(c => c.name === 'White')?.variable})`, darkHex: 'oklch(0.22 0.006 286)', usage: 'Primary content areas' },
        { name: 'Content 2', token: '--content2', lightHex: 'oklch(0.98 0 0)', darkHex: 'oklch(0.25 0.006 286)', usage: 'Secondary content' },
        { name: 'Content 3', token: '--content3', lightHex: 'oklch(0.96 0 0)', darkHex: 'oklch(0.28 0.006 286)', usage: 'Tertiary content' },
        { name: 'Content 4', token: '--content4', lightHex: 'oklch(0.94 0 0)', darkHex: 'oklch(0.31 0.006 286)', usage: 'Quaternary content' },
    ],
    motion: {
        easing: [
            { name: 'Smooth', variable: '--ease-smooth', value: 'ease', usage: 'Default transition' },
            { name: 'Out', variable: '--ease-out', value: 'cubic-bezier(0.215, 0.61, 0.355, 1)', usage: 'Entering elements' },
            { name: 'Fluid Out', variable: '--ease-fluid-out', value: 'cubic-bezier(0.32, 0.72, 0, 1)', usage: 'Expressive movement' },
        ],
        animations: [
            { name: 'Spin Fast', variable: '--animate-spin-fast', value: 'spin 0.75s linear infinite', usage: 'Loading spinners' },
            { name: 'Skeleton', variable: '--animate-skeleton', value: 'shimmer 2s linear infinite', usage: 'Loading placeholders' },
            { name: 'Skeleton Mode', variable: '--skeleton-animation', value: 'shimmer', usage: 'Skeleton configuration' },
            { name: 'Caret Blink', variable: '--animate-caret-blink', value: 'caret-blink 1.2s ease-out infinite', usage: 'Typing indicators' },
        ]
    }
};
