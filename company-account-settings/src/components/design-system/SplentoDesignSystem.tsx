'use client';

import { useState } from 'react';
import { Card, Button, Chip, TextField, Label, Input, Description, Surface } from '@heroui/react';

// --- TYPES ---

interface ColorSwatchProps {
    hex: string;
    name?: string;
    subtitle?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showHex?: boolean;
}

interface SwatchButtonProps {
    onPress?: () => void;
    valueToCopy: string;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    ariaLabel?: string;
}

interface SampleComponentProps {
    dark: boolean;
}

interface TypeScaleItem {
    name: string;
    size: string;
    lineHeight: string;
    tracking: string;
    weight: number;
    use: string;
}

// --- DATA DEFINITIONS ---

const colors = {
    core: [
        { name: 'Splento Cyan', hex: '#2EDBE3', variable: '--splento-cyan', role: 'Primary brand' },
        { name: 'Canvas', hex: '#F8F9FA', variable: '--canvas', role: 'Light background' },
        { name: 'Midnight', hex: '#0D1117', variable: '--midnight', role: 'Dark background' },
    ],
    cyanScale: [
        { step: '50', hex: '#ECFEFF' },
        { step: '100', hex: '#CFFAFE' },
        { step: '200', hex: '#A5F3FC' },
        { step: '300', hex: '#67E8F9' },
        { step: '400', hex: '#22D3EE' },
        { step: '500', hex: '#2EDBE3', primary: true },
        { step: '600', hex: '#0891B2' },
        { step: '700', hex: '#0E7490' },
        { step: '800', hex: '#155E75' },
        { step: '900', hex: '#164E63' },
        { step: '950', hex: '#083344' },
    ],
    semantic: [
        { name: 'Success', hex: '#10B981', darkHex: '#34D399', icon: '✓' },
        { name: 'Warning', hex: '#F59E0B', darkHex: '#FBBF24', icon: '⚠' },
        { name: 'Danger', hex: '#EF4444', darkHex: '#F87171', icon: '✕' },
        { name: 'Info', hex: '#3B82F6', darkHex: '#60A5FA', icon: 'ℹ' },
    ],
    accents: [
        { name: 'Coral', hex: '#FF6B6B', character: 'Energy, urgency' },
        { name: 'Peach', hex: '#FFBE98', character: 'Warm, friendly' },
        { name: 'Sunset', hex: '#FF8C42', character: 'Vibrant, creative' },
        { name: 'Electric Blue', hex: '#4F46E5', character: 'Tech, AI' },
        { name: 'Mint', hex: '#6EE7B7', character: 'Fresh, growth' },
        { name: 'Lavender', hex: '#A78BFA', character: 'Premium, unique' },
    ],
    greys: [
        { step: '50', hex: '#F9FAFB' },
        { step: '100', hex: '#F3F4F6' },
        { step: '200', hex: '#E5E7EB' },
        { step: '300', hex: '#D1D5DB' },
        { step: '400', hex: '#9CA3AF' },
        { step: '500', hex: '#6B7280' },
        { step: '600', hex: '#4B5563' },
        { step: '700', hex: '#374151' },
        { step: '800', hex: '#1F2937' },
        { step: '900', hex: '#111827' },
        { step: '950', hex: '#030712' },
    ],
    gradients: [
        { name: 'Cyan Flow', css: 'linear-gradient(135deg, #2EDBE3 0%, #0891B2 100%)', use: 'Hero sections' },
        { name: 'Ocean Depth', css: 'linear-gradient(135deg, #2EDBE3 0%, #4F46E5 100%)', use: 'AI features' },
        { name: 'Aurora', css: 'linear-gradient(135deg, #2EDBE3 0%, #A78BFA 50%, #F472B6 100%)', use: 'Creative' },
        { name: 'Sunrise', css: 'linear-gradient(135deg, #FF8C42 0%, #FF6B6B 100%)', use: 'Promotions' },
        { name: 'Mint Fresh', css: 'linear-gradient(135deg, #6EE7B7 0%, #2EDBE3 100%)', use: 'Success' },
        { name: 'Electric Night', css: 'linear-gradient(135deg, #4F46E5 0%, #2EDBE3 50%, #6EE7B7 100%)', use: 'Dark hero' },
    ],
    dataViz: [
        { hex: '#2EDBE3', name: 'Cyan', bgClass: 'bg-splento-cyan' },
        { hex: '#4F46E5', name: 'Blue', bgClass: 'bg-electric-blue' },
        { hex: '#10B981', name: 'Green', bgClass: 'bg-success' },
        { hex: '#F59E0B', name: 'Amber', bgClass: 'bg-warning' },
        { hex: '#EF4444', name: 'Red', bgClass: 'bg-danger' },
        { hex: '#A78BFA', name: 'Purple', bgClass: 'bg-lavender' },
        { hex: '#FF8C42', name: 'Orange', bgClass: 'bg-sunset' },
        { hex: '#6EE7B7', name: 'Mint', bgClass: 'bg-mint' },
    ],
};

const typeScale = [
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

const fontWeights = [
    { weight: 300, name: 'Light', use: 'Decorative, large display' },
    { weight: 400, name: 'Regular', use: 'Body text, paragraphs' },
    { weight: 500, name: 'Medium', use: 'Emphasis, UI labels' },
    { weight: 600, name: 'Semibold', use: 'Headings, buttons' },
    { weight: 700, name: 'Bold', use: 'Display, strong emphasis' },
    { weight: 800, name: 'Extrabold', use: 'Hero text, marketing' },
];

const typographyRules = {
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

const categories = [
    {
        id: 'colours',
        title: 'Colours',
        icon: '🎨',
        description: '7 palettes',
        active: true,
        preview: 'linear-gradient(135deg, #2EDBE3, #4F46E5)'
    },
    {
        id: 'typography',
        title: 'Typography',
        icon: 'Aa',
        description: '13 styles',
        active: true,
        preview: null
    },
    {
        id: 'iconography',
        title: 'Iconography',
        icon: '⬡',
        description: 'Coming soon',
        active: false
    },
    {
        id: 'spacing',
        title: 'Spacing',
        icon: '⊞',
        description: 'Coming soon',
        active: false
    },
    {
        id: 'components',
        title: 'Components',
        icon: '◫',
        description: 'Coming soon',
        active: false
    },
    {
        id: 'motion',
        title: 'Motion',
        icon: '↝',
        description: 'Coming soon',
        active: false
    },
];

// --- HELPER COMPONENTS ---

function Section({ title, children, dark }: { title: string; children: React.ReactNode; dark: boolean }) {
    return (
        <Surface
            variant="default"
            className={`p-6 rounded-2xl shadow-sm border ${dark ? 'border-border' : 'border-grey-200'}`}
        >
            <h2 className="text-lg font-semibold mb-6 px-1">{title}</h2>
            <div>
                {children}
            </div>
        </Surface>
    );
}

function ColorSwatch({ hex, name, subtitle, size = 'md', showHex = true }: ColorSwatchProps) {
    const [copied, setCopied] = useState(false);

    const copyHex = () => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const sizes: Record<string, string> = {
        sm: 'w-12 h-12',
        md: 'w-20 h-20',
        lg: 'w-28 h-28',
        xl: 'w-full h-24',
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <Button
                variant="ghost"
                isIconOnly
                onPress={copyHex}
                className={`${sizes[size]} rounded-xl shadow-md overflow-hidden border border-border`}
                style={{ backgroundColor: hex }}
                aria-label={`Copy color ${name || hex}`}
            >
                {copied && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 text-snow text-xs font-medium">
                        Copied!
                    </div>
                )}
            </Button>
            {name && <span className="text-sm font-medium text-midnight dark:text-grey-200">{name}</span>}
            {showHex && <span className="text-xs font-mono text-grey-500">{hex}</span>}
            {subtitle && <span className="text-xs text-grey-400 text-center">{subtitle}</span>}
        </div>
    );
}

function SwatchButton({
    onPress,
    valueToCopy,
    children,
    className,
    style,
    ariaLabel
}: SwatchButtonProps) {
    const [copied, setCopied] = useState(false);

    const handlePress = () => {
        if (onPress) onPress();
        navigator.clipboard.writeText(valueToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Button
            variant="ghost"
            isIconOnly
            onPress={handlePress}
            className={`${className} relative overflow-hidden`}
            style={style}
            aria-label={ariaLabel || `Copy ${valueToCopy}`}
        >
            {children}
            {copied && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-[1px] rounded-[inherit] transition-opacity duration-200">
                    <div className="bg-foreground/50 text-snow px-2 py-1 rounded text-xs">Copied</div>
                </div>
            )}
        </Button>
    );
}

function SampleCard({ dark }: SampleComponentProps) {
    return (
        <div
            className="rounded-xl p-4 shadow-lg max-w-sm w-full border border-border bg-surface"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-ocean-depth" />
                <div>
                    <p className={`font-medium ${dark ? 'text-snow' : 'text-midnight'}`}>AI Generation</p>
                    <p className={`text-sm ${dark ? 'text-grey-400' : 'text-grey-500'}`}>Processing 24 images</p>
                </div>
            </div>
            <div
                className={`h-2 rounded-full overflow-hidden mb-3 ${dark ? 'bg-grey-700' : 'bg-grey-200'}`}
                role="progressbar"
                aria-valuenow={65}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="AI generation progress"
            >
                <div className="h-full rounded-full" style={{ width: '65%', backgroundColor: 'var(--splento-cyan)' }} />
            </div>
            <div className="flex gap-2">
                <Button
                    variant="primary"
                    size="md"
                    className="flex-1 rounded-lg text-sm font-medium"
                >
                    View Progress
                </Button>
                <Button
                    variant="secondary"
                    size="md"
                    className="rounded-lg text-sm font-medium"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

function SampleButtons({ dark }: SampleComponentProps) {
    const bg = dark ? 'bg-grey-950' : 'bg-grey-50';

    return (
        <div className={`flex flex-wrap gap-3 p-4 rounded-xl items-center ${bg}`}>
            <Button
                variant="primary"
                size="md"
                className="rounded-lg text-sm font-medium transition-colors"
            >
                Primary
            </Button>
            <Button
                variant="secondary"
                size="md"
                className="rounded-lg text-sm font-medium transition-colors"
            >
                Secondary
            </Button>
            <Button
                variant="danger"
                size="md"
                className="rounded-lg text-sm font-medium transition-colors"
            >
                Danger
            </Button>
            <Button
                variant="ghost"
                size="md"
                className={`rounded-lg text-sm font-medium transition-colors border border-grey-200 dark:border-grey-700 shadow-none ${dark ? 'text-snow' : 'text-midnight'}`}
            >
                Outline
            </Button>
            <Button
                variant="ghost"
                size="md"
                className="rounded-lg text-sm font-medium transition-colors text-splento-cyan"
            >
                Ghost
            </Button>
        </div>
    );
}

function SampleChips({ dark }: SampleComponentProps) {
    const bg = dark ? 'bg-grey-950' : 'bg-grey-50';

    const chips = [
        {
            label: 'Default',
            color: 'default' as const,
            variant: 'soft' as const
        },
        {
            label: 'Primary',
            color: 'accent' as const,
            variant: 'soft' as const
        },
        {
            label: '✓ Success',
            color: 'success' as const,
            variant: 'soft' as const
        },
        {
            label: '⚠ Warning',
            color: 'warning' as const,
            variant: 'soft' as const
        },
        {
            label: '✕ Error',
            color: 'danger' as const,
            variant: 'soft' as const
        },
        {
            label: 'Premium',
            color: 'accent' as const,
            variant: 'primary' as const
        },
    ];

    return (
        <div className={`flex flex-wrap gap-2 p-4 rounded-xl ${bg}`}>
            {chips.map((chip) => (
                <Chip
                    key={chip.label}
                    color={chip.color}
                    variant={chip.variant}
                    className="text-xs font-medium px-3"
                    size="sm"
                >
                    {chip.label}
                </Chip>
            ))}
        </div>
    );
}

function DataChart({ dark }: SampleComponentProps) {
    const data = [
        { value: 65, color: 'bg-splento-cyan', name: 'Cyan' },
        { value: 45, color: 'bg-electric-blue', name: 'Blue' },
        { value: 80, color: 'bg-success', name: 'Green' },
        { value: 55, color: 'bg-warning', name: 'Amber' },
        { value: 70, color: 'bg-danger', name: 'Red' },
        { value: 40, color: 'bg-lavender', name: 'Purple' },
        { value: 85, color: 'bg-sunset', name: 'Orange' },
        { value: 50, color: 'bg-mint', name: 'Mint' },
    ];
    const maxVal = Math.max(...data.map(d => d.value));
    const bg = dark ? 'var(--surface)' : 'var(--white)';
    const text = dark ? 'var(--snow)' : 'var(--midnight)';

    return (
        <div className="p-4 rounded-xl shadow-sm h-full" style={{ backgroundColor: bg }}>
            <p className="text-sm font-medium mb-4" style={{ color: text }}>Data Visualisation Palette</p>
            <div className="flex items-end gap-2" style={{ height: '128px' }}>
                {data.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                            className={`w-full rounded-t-md transition-all hover:opacity-80 ${item.color}`}
                            style={{
                                height: `${(item.value / maxVal) * 100}%`,
                                minHeight: '8px'
                            }}
                        />
                        <span className="text-xs text-grey-400 whitespace-nowrap">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TypeScaleRow({ item, dark }: { item: TypeScaleItem; dark: boolean }) {
    const textColor = dark ? 'var(--snow)' : 'var(--midnight)';
    const mutedColor = dark ? 'var(--muted)' : 'var(--grey-500)';

    return (
        <div className="border-b last:border-b-0 py-4" style={{ borderColor: dark ? 'var(--border)' : 'var(--grey-200)' }}>
            <div className="flex items-baseline gap-6 font-sans">
                <div className="w-32 shrink-0">
                    <p className="text-xs font-medium" style={{ color: mutedColor }}>{item.name}</p>
                    <p className="text-xs font-mono mt-1" style={{ color: mutedColor }}>
                        {item.size} / {item.lineHeight}
                    </p>
                </div>
                <div className="flex-1 overflow-hidden">
                    <p
                        style={{
                            fontSize: item.size,
                            lineHeight: item.lineHeight,
                            fontWeight: item.weight,
                            letterSpacing: item.tracking,
                            color: textColor,
                        }}
                    >
                        The quick brown fox
                    </p>
                </div>
                <div className="w-40 shrink-0 text-right">
                    <p className="text-xs" style={{ color: mutedColor }}>{item.use}</p>
                </div>
            </div>
        </div>
    );
}

function ParagraphExample({ dark }: { dark: boolean }) {
    const textColor = dark ? 'var(--snow)' : 'var(--midnight)';
    const mutedColor = dark ? 'var(--muted)' : 'var(--grey-500)';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Optimal */}
            <div>
                <p className="text-xs font-medium text-success mb-2">✓ Optimal line length (60 chars)</p>
                <p
                    className="text-base"
                    style={{
                        color: textColor,
                        lineHeight: 1.6,
                        maxWidth: '32ch',
                    }}
                >
                    Good typography makes reading effortless. The ideal line length helps
                    the eye track smoothly from one line to the next.
                </p>
            </div>

            {/* Too wide */}
            <div>
                <p className="text-xs font-medium text-danger mb-2">✕ Too wide (90+ chars)</p>
                <p
                    className="text-base"
                    style={{
                        color: mutedColor,
                        lineHeight: 1.6,
                    }}
                >
                    When lines are too long, the eye struggles to track back to the beginning of the next line, causing fatigue and reducing comprehension. This is why newspapers use narrow columns and why books have generous margins.
                </p>
            </div>
        </div>
    );
}

function LeadingComparison({ dark }: { dark: boolean }) {
    const textColor = dark ? 'var(--snow)' : 'var(--midnight)';
    const mutedColor = dark ? 'var(--muted)' : 'var(--grey-500)';

    const examples = [
        { leading: '1.0', label: 'Tight', use: 'Display text', sample: 'Giant headlines demand tight leading' },
        { leading: '1.25', label: 'Snug', use: 'Headings', sample: 'Section headings benefit from snug leading' },
        { leading: '1.6', label: 'Relaxed', use: 'Body text', sample: 'Body text needs room to breathe for comfortable reading across multiple lines of content' },
    ];

    return (
        <div className="space-y-6">
            {examples.map((ex) => (
                <div key={ex.leading} className="flex gap-6">
                    <div className="w-24 shrink-0">
                        <p className="text-2xl font-bold" style={{ color: textColor }}>{ex.leading}</p>
                        <p className="text-xs" style={{ color: mutedColor }}>{ex.label}</p>
                        <p className="text-xs text-splento-cyan">{ex.use}</p>
                    </div>
                    <div
                        className="flex-1 p-4 rounded-lg"
                        style={{ backgroundColor: dark ? 'var(--surface)' : 'var(--snow)' }}
                    >
                        <p
                            className={ex.leading === '1.0' ? 'text-2xl font-bold' : ex.leading === '1.25' ? 'text-xl font-semibold' : 'text-base'}
                            style={{
                                lineHeight: ex.leading,
                                color: textColor,
                            }}
                        >
                            {ex.sample}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function DarkLightComparison() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Light */}
            <div
                className="p-6 rounded-xl font-sans"
                style={{
                    backgroundColor: 'var(--white)',
                }}
            >
                <p className="text-xs uppercase tracking-widest text-cyan-600 font-medium mb-2">Light mode</p>
                <h3 className="text-2xl font-bold text-midnight mb-2" style={{ lineHeight: 1.2 }}>
                    Crisp and clear
                </h3>
                <p className="text-grey-500" style={{ lineHeight: 1.6 }}>
                    Regular weight (400) provides optimal readability on light backgrounds.
                    Use semibold (600) for headings to create clear hierarchy.
                </p>
            </div>

            {/* Dark */}
            <div
                className="p-6 rounded-xl font-sans"
                style={{
                    backgroundColor: 'var(--midnight)',
                }}
            >
                <p className="text-xs uppercase tracking-widest text-splento-cyan font-medium mb-2">Dark mode</p>
                <h3 className="text-2xl font-semibold text-snow mb-2" style={{ lineHeight: 1.2 }}>
                    Softer contrast
                </h3>
                <p className="text-muted" style={{ lineHeight: 1.6 }}>
                    Consider using slightly lighter weights on dark backgrounds.
                    The same font can appear heavier due to light text halation.
                </p>
            </div>
        </div>
    );
}

function ComponentTypography({ dark }: SampleComponentProps) {
    const textColor = dark ? 'text-snow' : 'text-midnight';
    const mutedColor = dark ? 'text-grey-400' : 'text-grey-500';
    const cardClass = dark ? 'bg-surface border-grey-700' : 'bg-surface border-grey-200';
    const inputClass = dark ? 'bg-midnight' : 'bg-grey-50';

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {/* Card */}
            <div
                className={`p-4 rounded-xl border ${cardClass}`}
            >
                <p className="text-xs font-medium uppercase tracking-wider mb-1 text-splento-cyan">
                    Card
                </p>
                <h4 className={`text-lg font-semibold mb-1 ${textColor}`}>
                    Card title here
                </h4>
                <p className={`text-sm mb-3 ${mutedColor}`}>
                    Supporting description text that explains the card content.
                </p>
                <p className={`text-xs ${mutedColor}`}>
                    Meta · Info · Details
                </p>
            </div>

            {/* Form */}
            <div
                className={`p-4 rounded-xl border ${cardClass}`}
            >
                <p className="text-xs font-medium uppercase tracking-wider mb-3 text-splento-cyan">
                    Form
                </p>
                <TextField name="email" type="email">
                    <Label className={`text-sm font-medium ${textColor}`}>Email address</Label>
                    <Input
                        placeholder="you@example.com"
                        className={`mb-2 ${inputClass} border-grey-200 dark:border-grey-700`}
                    />
                    <Description className={`text-xs ${mutedColor}`}>We'll never share your email.</Description>
                </TextField>
            </div>

            {/* Button */}
            <div
                className={`p-4 rounded-xl border ${cardClass}`}
            >
                <p className="text-xs font-medium uppercase tracking-wider mb-3 text-splento-cyan">
                    Buttons
                </p>
                <div className="space-y-2">
                    <Button
                        variant="primary"
                        size="md"
                        className="w-full font-semibold"
                    >
                        Primary action
                    </Button>
                    <Button
                        variant="secondary"
                        size="md"
                        className="w-full font-medium"
                    >
                        Secondary action
                    </Button>
                    <Button
                        variant="ghost"
                        size="md"
                        className="w-full font-medium text-splento-cyan hover:bg-splento-cyan/10"
                    >
                        Tertiary action
                    </Button>
                </div>
            </div>
        </div>
    );
}

// --- SUB-VIEWS ---

function ColoursContent({ darkMode }: { darkMode: boolean }) {
    // handleCopy is now handled by SwatchButton internal logic mostly, 
    // but kept if needed for custom actions or prop passing.
    // Actually SwatchButton handles copy. We can remove handleCopy in props if not needed.


    return (
        <div className="space-y-8">
            {/* Header */}
            <div
                className="rounded-2xl p-8 mb-8 text-white relative overflow-hidden gradient-ocean-depth"
            >
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
                </div>
                <div className="relative">
                    <p className="text-sm font-medium tracking-wider uppercase mb-2 text-white/70">Design System</p>
                    <h2 className="text-4xl font-bold mb-3">Colour Palette</h2>
                    <p className="text-white/80 max-w-xl text-lg">
                        A comprehensive colour palette built around <span className="bg-white/20 text-white px-2 py-0.5 rounded text-base font-mono align-middle mx-1">#2EDBE3</span> — electric, fresh, and tech-forward.
                        Click any swatch to copy its value.
                    </p>
                </div>
            </div>
            {/* Brand Core */}
            <Section title="Brand Core" dark={darkMode}>
                <div className="grid grid-cols-3 gap-6">
                    {colors.core.map((c) => (
                        <div key={c.name} className="flex flex-col gap-2 text-left group">
                            <SwatchButton
                                valueToCopy={c.hex}
                                className="h-24 w-full rounded-xl shadow-sm border border-border transition-transform group-hover:scale-[1.02]"
                                style={{ backgroundColor: c.hex }}
                                ariaLabel={`Copy ${c.name} (${c.hex})`}
                            >
                                {null}
                            </SwatchButton>
                            <div>
                                <p className={`text-sm font-medium ${darkMode ? 'text-snow' : 'text-midnight'}`}>{c.name}</p>
                                <p className="text-xs font-mono text-grey-500">{c.hex}</p>
                                <p className="text-xs text-grey-400">{c.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Cyan Scale */}
            <Section title="Primary Scale — Cyan" dark={darkMode}>
                <div className="flex gap-0.5">
                    {colors.cyanScale.map((c, i) => (
                        <div key={c.step} className="flex-1 flex flex-col items-center group relative">
                            <SwatchButton
                                valueToCopy={c.hex}
                                className={`w-full h-16 transition-transform hover:scale-105 hover:z-30 cursor-pointer relative
                      ${i === 0 ? 'rounded-l-xl rounded-r-none' : ''}
                      ${i === colors.cyanScale.length - 1 ? 'rounded-r-xl rounded-l-none' : ''}
                      ${i > 0 && i < colors.cyanScale.length - 1 ? 'rounded-none' : ''}
                      ${c.primary ? 'ring-2 ring-offset-2 ring-cyan-500 z-10' : 'z-0'}`}
                                style={{ backgroundColor: c.hex }}
                                ariaLabel={`Copy Cyan ${c.step} (${c.hex})`}
                            >
                                {null}
                            </SwatchButton>
                            <span className={`text-xs mt-2 ${darkMode ? 'text-grey-400' : 'text-grey-500'}`}>{c.step}</span>
                            {c.primary && <span className="text-xs text-cyan-500 font-medium">BASE</span>}
                        </div>
                    ))}
                </div>
            </Section>

            {/* Semantic + Accents Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Semantic */}
                <Section title="Semantic Colours" dark={darkMode}>
                    <div className="grid grid-cols-4 gap-4">
                        {colors.semantic.map((c) => (
                            <div key={c.name} className="text-center group w-full">
                                <SwatchButton
                                    valueToCopy={darkMode ? c.darkHex : c.hex}
                                    className="w-full h-16 rounded-xl flex items-center justify-center text-snow text-2xl shadow-md transition-transform group-hover:scale-105"
                                    style={{ backgroundColor: darkMode ? c.darkHex : c.hex }}
                                    ariaLabel={`Copy ${c.name} (${darkMode ? c.darkHex : c.hex})`}
                                >
                                    {c.icon}
                                </SwatchButton>
                                <p className={`text-sm font-medium mt-2 ${darkMode ? 'text-snow' : 'text-grey-800'}`}>{c.name}</p>
                                <p className="text-xs font-mono text-grey-500">{darkMode ? c.darkHex : c.hex}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Accents */}
                <Section title="Accent Palette" dark={darkMode}>
                    <div className="grid grid-cols-3 gap-4">
                        {colors.accents.map((c) => (
                            <ColorSwatch
                                key={c.name}
                                hex={c.hex}
                                name={c.name}
                                subtitle={c.character}
                                size="xl"
                            />
                        ))}
                    </div>
                </Section>
            </div>

            {/* Grey Scale */}
            <Section title="Neutral Grey Scale" dark={darkMode}>
                <div className="flex gap-0.5">
                    {colors.greys.map((c, i) => (
                        <div key={c.step} className="flex-1 flex flex-col items-center group relative">
                            <SwatchButton
                                valueToCopy={c.hex}
                                className={`w-full h-12 transition-transform hover:scale-105 hover:z-30 cursor-pointer relative
                      ${i === 0 ? 'rounded-l-xl rounded-r-none' : ''}
                      ${i === colors.greys.length - 1 ? 'rounded-r-xl rounded-l-none' : ''}
                      ${i > 0 && i < colors.greys.length - 1 ? 'rounded-none' : ''}`}
                                style={{ backgroundColor: c.hex }}
                                ariaLabel={`Copy ${c.hex}`}
                            >
                                {null}
                            </SwatchButton>
                            <span className={`text-xs mt-2 ${darkMode ? 'text-grey-400' : 'text-grey-500'}`}>{c.step}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Gradients */}
            <Section title="Gradients" dark={darkMode}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {colors.gradients.map((g) => (
                        <Card
                            key={g.name}
                            className={`
                                overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg border-0 p-0
                                bg-surface
                            `}
                        >
                            <SwatchButton
                                valueToCopy={g.css}
                                className="h-32 w-full cursor-pointer shadow-sm block"
                                style={{
                                    background: g.css,
                                    borderRadius: '0.75rem 0.75rem 0 0'  // 12px top, 0 bottom
                                }}
                                ariaLabel={`Copy ${g.name} gradient CSS`}
                            >
                                {null}
                            </SwatchButton>
                            <div className="text-center p-4 pt-2">
                                <h4 className={`text-sm font-medium mb-1 ${darkMode ? 'text-grey-200' : 'text-grey-800'}`}>{g.name}</h4>
                                <p className="text-xs text-grey-400">{g.use}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Component Preview */}
            <Section title="Component Preview" dark={darkMode}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Light Mode Examples */}
                    <div className="space-y-6" data-theme="light">
                        <p className={`text-sm font-medium ${darkMode ? 'text-grey-400' : 'text-grey-500'}`}>Light Mode</p>
                        <SampleCard dark={false} />
                        <SampleButtons dark={false} />
                        <SampleChips dark={false} />
                    </div>

                    {/* Dark Mode Examples */}
                    <div className="space-y-6 dark" data-theme="dark">
                        <p className={`text-sm font-medium ${darkMode ? 'text-grey-400' : 'text-grey-500'}`}>Dark Mode</p>
                        <SampleCard dark={true} />
                        <SampleButtons dark={true} />
                        <SampleChips dark={true} />
                    </div>
                </div>
            </Section>

            {/* Data Visualisation */}
            <Section title="Data Visualisation" dark={darkMode}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chart Placeholder */}
                    <DataChart dark={darkMode} />

                    <div className={`p-4 rounded-xl shadow-sm bg-surface`}>
                        <p className={`text-sm font-medium mb-4 ${darkMode ? 'text-grey-200' : 'text-grey-800'}`}>Colour Sequence</p>
                        <div className="space-y-2">
                            {colors.dataViz.map((c, i) => (
                                <div key={c.name} className="flex items-center gap-3">
                                    <span className="text-xs text-grey-400 w-4">{i + 1}</span>
                                    <div className="w-6 h-6 rounded-md" style={{ backgroundColor: c.hex }} />
                                    <span className="text-sm text-grey-600 dark:text-grey-300">{c.name}</span>
                                    <span className="text-xs font-mono text-grey-400 ml-auto">{c.hex}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Contrast Examples */}
            <Section title="Contrast & Accessibility" dark={darkMode}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl overflow-hidden">
                        <div className="bg-white p-4 text-midnight">
                            <p className="font-medium">Light Background</p>
                            <p className="text-sm text-grey-500">Ratio: 18.1:1 ✓</p>
                        </div>
                    </div>
                    <div className="rounded-xl overflow-hidden">
                        <div className="bg-midnight p-4 text-snow">
                            <p className="font-medium">Dark Background</p>
                            <p className="text-sm text-grey-400">Ratio: 17.4:1 ✓</p>
                        </div>
                    </div>
                    <div className="rounded-xl overflow-hidden">
                        <div className="bg-splento-cyan p-4 text-cyan-950">
                            <p className="font-medium">Cyan Background</p>
                            <p className="text-sm text-cyan-900">Ratio: 7.2:1 ✓</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* CSS Variables */}
            <Section title="CSS Variables" dark={darkMode}>
                <pre className={`text-xs font-mono p-4 rounded-xl overflow-x-auto ${darkMode ? 'bg-grey-800 text-grey-300' : 'bg-grey-100 text-grey-700'
                    }`}>
                    {`:root {
  /* Core */
  --splento-cyan: #2EDBE3;
  --canvas: #F8F9FA;
  --midnight: #0D1117;

  /* Primary Scale */
  --cyan-50: #ECFEFF;
  /* ... 100-400 ... */
  --cyan-500: #2EDBE3;  /* Base */
  /* ... 600-900 ... */
  --cyan-950: #083344;
  
  /* Grey Scale */
  --grey-50: #F9FAFB;
  /* ... 100-900 ... */
  --grey-950: #030712;
  
  /* Semantic */
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
  --info: #3B82F6;

  /* Accents */
  --coral: #FF6B6B;
  --electric-blue: #4F46E5;
  --mint: #6EE7B7;
  --lavender: #A78BFA;
}`}
                </pre>
            </Section>
        </div>
    );
}

function TypographyContent({ darkMode }: { darkMode: boolean }) {
    const mutedColor = 'var(--muted)';
    const textColor = darkMode ? 'var(--snow)' : 'var(--midnight)';

    return (
        <div className="space-y-8">
            {/* Hero */}
            <div
                className="rounded-2xl p-8 text-white relative overflow-hidden gradient-ocean-depth"
            >
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
                </div>
                <div className="relative font-sans">
                    <p className="text-sm font-medium tracking-wider uppercase mb-2 text-white/70">Typography System</p>
                    <h2 className="text-4xl font-bold mb-3" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                        Libre Franklin
                    </h2>
                    <p className="text-white/80 max-w-xl text-lg" style={{ lineHeight: 1.6 }}>
                        A versatile sans-serif typeface with excellent readability across all sizes.
                        Inspired by Morris Fuller Benton's classic Franklin Gothic, reimagined for digital.
                    </p>
                </div>
            </div>

            {/* Font Family Info */}
            <Section title="Font Family" dark={darkMode}>
                <div
                    className="p-6 rounded-xl mb-6 font-sans"
                    style={{
                        backgroundColor: darkMode ? 'var(--surface)' : 'var(--grey-50)',
                    }}
                >
                    <p
                        className="text-6xl font-bold mb-4 font-sans"
                        style={{
                            color: darkMode ? 'var(--snow)' : 'var(--midnight)',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Aa Bb Cc Dd Ee Ff Gg
                    </p>
                    <p
                        className="text-2xl mb-4"
                        style={{ color: darkMode ? 'var(--muted)' : 'var(--grey-500)' }}
                    >
                        0123456789 !@#$%^&*()
                    </p>
                    <pre
                        className="text-xs font-mono p-3 rounded-lg"
                        style={{
                            backgroundColor: darkMode ? 'var(--midnight)' : 'var(--white)',
                            color: darkMode ? 'var(--muted)' : 'var(--grey-500)'
                        }}
                    >
                        {`--font-sans: 'Libre Franklin', ui-sans-serif, system-ui, -apple-system, sans-serif;`}
                    </pre>
                </div>
            </Section>

            {/* Font Weights */}
            <Section title="Font Weights" dark={darkMode}>
                <div className="grid grid-cols-3 gap-6">
                    {fontWeights.map((item) => (
                        <div key={item.weight} className="text-center">
                            <p
                                className="text-5xl mb-3 font-sans"
                                style={{
                                    fontWeight: item.weight,
                                    color: textColor,
                                }}
                            >
                                Aa
                            </p>
                            <p className="text-sm font-medium" style={{ color: textColor }}>{item.name}</p>
                            <p className="text-xs font-mono" style={{ color: mutedColor }}>{item.weight}</p>
                            <p className="text-xs mt-1" style={{ color: mutedColor }}>{item.use}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Type Scale */}
            <Section title="Type Scale" dark={darkMode}>
                <div className="space-y-0">
                    {typeScale.map((item) => (
                        <TypeScaleRow key={item.name} item={item} dark={darkMode} />
                    ))}
                </div>
            </Section>

            {/* Leading / Line Height */}
            <Section title="Leading (Line Height)" dark={darkMode}>
                <LeadingComparison dark={darkMode} />
            </Section>

            {/* Hierarchy Example */}
            <Section title="Typographic Hierarchy" dark={darkMode}>
                <div
                    className="p-6 rounded-xl"
                    style={{
                        backgroundColor: darkMode ? 'var(--surface)' : 'var(--white)',
                        border: `1px solid ${darkMode ? 'var(--border)' : 'var(--grey-200)'}`,
                    }}
                >
                    <p
                        className="text-xs uppercase tracking-widest mb-2 font-medium text-splento-cyan"
                        style={{ letterSpacing: '0.08em' }}
                    >
                        AI Generation
                    </p>
                    <h1
                        className="text-3xl font-bold mb-3"
                        style={{ color: textColor, lineHeight: 1.1, letterSpacing: '-0.015em' }}
                    >
                        Transform your images with intelligent automation
                    </h1>
                    <p
                        className="text-base mb-4"
                        style={{ color: mutedColor, lineHeight: 1.6 }}
                    >
                        Our AI-powered platform processes thousands of images in minutes,
                        applying consistent enhancements while preserving the unique character
                        of each photograph. Perfect for studios handling high-volume projects.
                    </p>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="primary"
                            size="md"
                            className="font-semibold"
                        >
                            Get started
                        </Button>
                        <Button
                            variant="ghost"
                            size="md"
                            className="text-splento-cyan"
                        >
                            Learn more →
                        </Button>
                    </div>
                </div>
            </Section>

            {/* Light vs Dark */}
            <Section title="Light & Dark Mode" dark={darkMode}>
                <DarkLightComparison />
                <p
                    className="text-sm mt-4"
                    style={{ color: darkMode ? 'var(--muted)' : 'var(--grey-500)' }}
                >
                    <strong>Note:</strong> Light text on dark backgrounds can appear heavier due to optical effects.
                    Consider reducing font weight by one step (600 → 500) for large text in dark mode.
                </p>
            </Section>

            {/* Line Length */}
            <Section title="Line Length (Measure)" dark={darkMode}>
                <ParagraphExample dark={darkMode} />
                <div
                    className="mt-6 p-4 rounded-lg"
                    style={{ backgroundColor: darkMode ? 'var(--surface)' : 'var(--grey-50)' }}
                >
                    <p className="text-sm" style={{ color: darkMode ? 'var(--muted)' : 'var(--grey-500)' }}>
                        <strong>Recommended:</strong> 45-75 characters per line for body text.
                        Use <code className="px-1 py-0.5 rounded bg-foreground/10">max-width: 65ch</code> for optimal readability.
                    </p>
                </div>
            </Section>

            {/* Component Typography */}
            <Section title="Component Typography" dark={darkMode}>
                <ComponentTypography dark={darkMode} />
            </Section>

            {/* Typography Guidelines */}
            <Section title="Typography Guidelines" dark={darkMode}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-success">
                            <span className="text-xl">✓</span>
                            <h3 className="font-semibold">DO</h3>
                        </div>
                        <ul className="space-y-3">
                            {typographyRules.do.map(rule => (
                                <li key={rule} className={`flex gap-3 text-sm ${darkMode ? 'text-grey-300' : 'text-grey-600'}`}>
                                    <span className="text-success mt-0.5">•</span>
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-danger">
                            <span className="text-xl">✕</span>
                            <h3 className="font-semibold">DON'T</h3>
                        </div>
                        <ul className="space-y-3">
                            {typographyRules.dont.map(rule => (
                                <li key={rule} className={`flex gap-3 text-sm ${darkMode ? 'text-grey-300' : 'text-grey-600'}`}>
                                    <span className="text-danger mt-0.5">•</span>
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* CSS Variables */}
            <Section title="CSS Variables" dark={darkMode}>
                <pre className={`text-xs font-mono p-4 rounded-xl overflow-x-auto ${darkMode ? 'bg-grey-800 text-grey-300' : 'bg-grey-100 text-grey-700'
                    }`}>
                    {`:root {
  /* Font Family */
  --font-sans: 'Libre Franklin', ui-sans-serif, system-ui, -apple-system, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
  --text-7xl: 4.5rem;      /* 72px */
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.15;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;
  --leading-loose: 1.75;
  
  /* Letter Spacing */
  --tracking-tighter: -0.02em;
  --tracking-tight: -0.01em;
  --tracking-normal: 0;
  --tracking-wide: 0.01em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.08em;
  
  /* Font Weights */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}`}
                </pre>
            </Section>
        </div>
    );
}

function Hub({ onNavigate, darkMode }: { onNavigate: (id: string) => void; darkMode: boolean }) {
    return (
        <>
            <div
                className="rounded-2xl p-8 mb-10 text-white relative overflow-hidden gradient-ocean-depth"
            >
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-2">Design System</h1>
                    <p className="text-lg opacity-90">Building the future of Splento, pixel by pixel.</p>
                </div>
                <div className="absolute -right-10 -bottom-20 opacity-20 text-[10rem]">🎨</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        role="button"
                        tabIndex={cat.active ? 0 : -1}
                        onClick={() => cat.active && onNavigate(cat.id)}
                        onKeyDown={(e) => {
                            if (cat.active && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                onNavigate(cat.id);
                            }
                        }}
                        className={`
                            block text-left w-full h-full
                            ${!cat.active ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'}
                            transition-all duration-200 outline-none
                        `}
                        aria-label={`Navigate to ${cat.title}${!cat.active ? ' (coming soon)' : ''}`}
                    >
                        <Card
                            className={`
                                h-full
                                ${darkMode ? 'bg-surface border-border' : 'bg-white border-grey-200'}
                                shadow-sm pointer-events-none
                            `}
                        >
                            <Card.Header className="pb-0 pt-4 px-4 flex-col items-start">
                                <span className="text-4xl mb-2">{cat.icon}</span>
                                <Card.Title className={`text-lg font-semibold ${darkMode ? 'text-snow' : 'text-midnight'}`}>{cat.title}</Card.Title>
                            </Card.Header>
                            <Card.Content className="pt-2">
                                {cat.active ? (
                                    <p className={`text-sm ${darkMode ? 'text-grey-400' : 'text-grey-500'}`}>{cat.description}</p>
                                ) : (
                                    <Chip size="sm" variant="secondary" className="bg-grey-100 text-grey-500 dark:bg-grey-800 dark:text-grey-400">Coming soon</Chip>
                                )}
                            </Card.Content>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    activeView: string;
    onBack: () => void;
}

function Header({ darkMode, setDarkMode, activeView, onBack }: HeaderProps) {
    return (
        <header className={`sticky top-0 z-50 backdrop-blur-md border-b mb-8 ${darkMode ? 'bg-midnight/90 border-border' : 'bg-white/90 border-grey-200'
            }`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {activeView !== 'hub' && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onPress={onBack}
                            className="mr-2"
                        >
                            ← Back
                        </Button>
                    )}

                    <div className="w-8 h-8 rounded-lg gradient-ocean-depth" />
                    <h1
                        className={`text-xl font-bold font-sans ${darkMode ? 'text-snow' : 'text-midnight'}`}
                    >
                        Splento Design System
                    </h1>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onPress={() => setDarkMode(!darkMode)}
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    className={darkMode ? 'bg-grey-800 text-snow' : 'bg-grey-100 text-grey-800'}
                >
                    {darkMode ? '☀️ Light' : '🌙 Dark'}
                </Button>
            </div>
        </header>
    );
}

function Footer({ darkMode }: { darkMode: boolean }) {
    return (
        <footer className={`border-t mt-12 py-8 ${darkMode ? 'border-grey-800' : 'border-grey-200'}`}>
            <div className="max-w-6xl mx-auto px-6 text-center">
                <p className={`text-sm ${darkMode ? 'text-grey-500' : 'text-grey-400'}`}>
                    Splento Design System v1.0 — Built with HeroUI v3
                </p>
            </div>
        </footer>
    );
}

// --- MAIN WRAPPER ---

export default function SplentoDesignSystem() {
    const [activeView, setActiveView] = useState('hub');
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className={`min-h-screen transition-colors ${darkMode ? 'bg-midnight' : 'bg-grey-50'}`}>

                <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    activeView={activeView}
                    onBack={() => setActiveView('hub')}
                />

                <main className="max-w-6xl mx-auto px-6 pb-12">
                    {activeView === 'hub' && (
                        <Hub onNavigate={setActiveView} darkMode={darkMode} />
                    )}
                    {activeView === 'colours' && (
                        <ColoursContent darkMode={darkMode} />
                    )}
                    {activeView === 'typography' && (
                        <TypographyContent darkMode={darkMode} />
                    )}
                </main>

                <Footer darkMode={darkMode} />
            </div>
        </div>
    );
}
