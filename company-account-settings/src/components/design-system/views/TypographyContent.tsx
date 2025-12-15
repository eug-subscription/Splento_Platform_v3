import { Button } from '@heroui/react';
import { fontWeights, typeScale, typographyRules } from '../data/typography';
import { Section } from '../primitives/Section';
import { TypeScaleRow } from '../typography/TypeScaleRow';
import { LeadingComparison } from '../typography/LeadingComparison';
import { ParagraphExample } from '../typography/ParagraphExample';
import { DarkLightComparison } from '../typography/DarkLightComparison';
import { ComponentTypography } from '../typography/ComponentTypography';

export function TypographyContent() {
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
            <Section title="Font Family">
                <div
                    className="p-6 rounded-xl mb-6 font-sans bg-grey-50 dark:bg-grey-800"
                >
                    <p
                        className="text-6xl font-bold mb-4 font-sans text-midnight dark:text-snow"
                        style={{
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Aa Bb Cc Dd Ee Ff Gg
                    </p>
                    <p
                        className="text-2xl mb-4 text-grey-500 dark:text-muted"
                    >
                        0123456789 !@#$%^&*()
                    </p>
                    <pre
                        className="text-xs font-mono p-3 rounded-lg bg-white dark:bg-midnight text-grey-500 dark:text-muted"
                    >
                        {`--font-sans: 'Libre Franklin', ui-sans-serif, system-ui, -apple-system, sans-serif;`}
                    </pre>
                </div>
            </Section>

            {/* Font Weights */}
            <Section title="Font Weights">
                <div className="grid grid-cols-3 gap-6">
                    {fontWeights.map((item) => (
                        <div key={item.weight} className="text-center">
                            <p
                                className="text-5xl mb-3 font-sans text-midnight dark:text-snow"
                                style={{
                                    fontWeight: item.weight,
                                }}
                            >
                                Aa
                            </p>
                            <p className="text-sm font-medium text-midnight dark:text-snow">{item.name}</p>
                            <p className="text-xs font-mono text-muted">{item.weight}</p>
                            <p className="text-xs mt-1 text-muted">{item.use}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Type Scale */}
            <Section title="Type Scale">
                <div className="space-y-0">
                    {typeScale.map((item) => (
                        <TypeScaleRow key={item.name} item={item} />
                    ))}
                </div>
            </Section>

            {/* Leading / Line Height */}
            <Section title="Leading (Line Height)">
                <LeadingComparison />
            </Section>

            {/* Hierarchy Example */}
            <Section title="Typographic Hierarchy">
                <div
                    className="p-6 rounded-xl bg-white dark:bg-grey-800 border border-grey-200 dark:border-border"
                >
                    <p
                        className="text-xs uppercase tracking-widest mb-2 font-medium text-splento-cyan"
                        style={{ letterSpacing: '0.08em' }}
                    >
                        AI Generation
                    </p>
                    <h1
                        className="text-3xl font-bold mb-3 text-midnight dark:text-snow"
                        style={{ lineHeight: 1.1, letterSpacing: '-0.015em' }}
                    >
                        Transform your images with intelligent automation
                    </h1>
                    <p
                        className="text-base mb-4 text-grey-500 dark:text-muted"
                        style={{ lineHeight: 1.6 }}
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
            <Section title="Light & Dark Mode">
                <DarkLightComparison />
                <p
                    className="text-sm mt-4 text-grey-500 dark:text-muted"
                >
                    <strong>Note:</strong> Light text on dark backgrounds can appear heavier due to optical effects.
                    Consider reducing font weight by one step (600 → 500) for large text in dark mode.
                </p>
            </Section>

            {/* Line Length */}
            <Section title="Line Length (Measure)">
                <ParagraphExample />
                <div
                    className="mt-6 p-4 rounded-lg bg-grey-50 dark:bg-grey-800"
                >
                    <p className="text-sm text-grey-500 dark:text-muted">
                        <strong>Recommended:</strong> 45-75 characters per line for body text.
                        Use <code className="px-1 py-0.5 rounded bg-foreground/10">max-width: 65ch</code> for optimal readability.
                    </p>
                </div>
            </Section>

            {/* Component Typography */}
            <Section title="Component Typography">
                <ComponentTypography />
            </Section>

            {/* Typography Guidelines */}
            <Section title="Typography Guidelines">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-success">
                            <span className="text-xl">✓</span>
                            <h3 className="font-semibold">DO</h3>
                        </div>
                        <ul className="space-y-3">
                            {typographyRules.do.map(rule => (
                                <li key={rule} className="flex gap-3 text-sm text-grey-600 dark:text-grey-300">
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
                                <li key={rule} className="flex gap-3 text-sm text-grey-600 dark:text-grey-300">
                                    <span className="text-danger mt-0.5">•</span>
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* CSS Variables */}
            <Section title="CSS Variables">
                <pre className="text-xs font-mono p-4 rounded-xl overflow-x-auto bg-grey-100 text-grey-700 dark:bg-grey-800 dark:text-grey-300">
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
