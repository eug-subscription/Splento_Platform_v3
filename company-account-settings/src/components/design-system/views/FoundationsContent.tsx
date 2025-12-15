import { useState } from 'react';
import { Card, Chip, Skeleton } from '@heroui/react';
import { foundations } from '../data/foundations';
import { Section } from '../primitives/Section';
import { SwatchButton } from '../primitives/SwatchButton';

function SurfaceStack() {
    const labelStyle = {
        backgroundColor: 'var(--color-default-100, rgba(0,0,0,0.05))',
        color: 'var(--muted-foreground)'
    };

    return (
        <div className="relative isolate">
            {/* Background - outermost */}
            <div
                className="rounded-xl p-4 transition-colors duration-300 border border-transparent"
                style={{ backgroundColor: 'var(--background)', height: '320px', color: 'var(--foreground)' }}
            >
                <div className="flex justify-between items-start">
                    <span className="text-xs font-mono px-2 py-1 rounded select-none" style={labelStyle}>
                        --background
                    </span>
                </div>

                {/* Surface */}
                <div
                    className="mt-3 rounded-lg p-3 transition-colors duration-300 relative"
                    style={{
                        backgroundColor: 'var(--surface)',
                        height: '260px',
                        boxShadow: 'var(--surface-shadow)'
                    }}
                >
                    <span className="text-xs font-mono px-2 py-1 rounded select-none inline-block mb-2" style={labelStyle}>
                        --surface
                    </span>

                    {/* Secondary */}
                    <div
                        className="rounded-lg p-3 transition-colors duration-300"
                        style={{ backgroundColor: 'var(--color-surface-secondary)', height: '200px' }}
                    >
                        <span className="text-xs font-mono px-2 py-1 rounded select-none inline-block mb-2" style={labelStyle}>
                            --surface-secondary
                        </span>

                        {/* Tertiary */}
                        <div
                            className="rounded-lg p-3 transition-colors duration-300"
                            style={{ backgroundColor: 'var(--color-surface-tertiary)', height: '140px' }}
                        >
                            <span className="text-xs font-mono px-2 py-1 rounded select-none inline-block mb-2" style={labelStyle}>
                                --surface-tertiary
                            </span>

                            {/* Quaternary */}
                            <div
                                className="rounded-md p-2 flex items-center transition-colors duration-300"
                                style={{ backgroundColor: 'var(--color-surface-quaternary)', height: '60px' }}
                            >
                                <span className="text-xs font-mono px-2 py-1 rounded select-none" style={labelStyle}>
                                    --surface-quaternary
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay - FLOATING with shadow */}
            <div
                className="absolute top-12 right-6 w-32 p-3 rounded-xl transition-colors duration-300 z-10"
                style={{
                    backgroundColor: 'var(--overlay)',
                    boxShadow: 'var(--overlay-shadow)',
                    color: 'var(--overlay-foreground)'
                }}
            >
                <span className="text-xs font-mono px-2 py-0.5 rounded block select-none" style={labelStyle}>
                    --overlay
                </span>
                <p className="text-xs mt-2 font-medium op-90">
                    Modal / Popover
                </p>
            </div>
        </div>
    );
}

export function FoundationsContent() {
    const [copiedValue, setCopiedValue] = useState<string | null>(null);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedValue(text);
        setTimeout(() => setCopiedValue(null), 2000);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="rounded-2xl p-8 mb-8 text-white relative overflow-hidden gradient-ocean-depth">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
                </div>
                <div className="relative">
                    <p className="text-sm font-medium tracking-wider uppercase mb-2 text-white/70">Design System</p>
                    <h2 className="text-4xl font-bold mb-3">Foundations</h2>
                    <p className="text-white/80 max-w-xl text-lg">
                        The building blocks of our interface: spacing, radius, shadows, and motion properties that ensure consistency and harmony.
                        Click any token to copy its variable.
                    </p>
                </div>
            </div>

            {/* Spacing Scale */}
            <Section title="Spacing Scale">
                <div className="flex flex-col gap-12">
                    {/* Scale List */}
                    <div className="space-y-6">
                        {foundations.spacing.map((space) => (
                            <div key={space.name} className="flex items-center gap-6 group">
                                <div className="w-16 font-mono text-sm text-[var(--splento-cyan)] text-right shrink-0">
                                    {space.className}
                                </div>
                                {/* Visual Bar: Width equals the spacing value */}
                                <div className="w-32 flex items-center justify-start shrink-0">
                                    <div
                                        className="h-4 bg-accent rounded-sm"
                                        style={{ width: space.value }}
                                    />
                                </div>
                                <div className="flex items-baseline gap-3 min-w-[120px] shrink-0">
                                    <span className="font-mono text-foreground font-medium">{space.value}</span>
                                    <span className="font-mono text-muted-foreground text-xs">{space.px}</span>
                                </div>
                                <div className="text-sm text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">{space.usage}</div>
                            </div>
                        ))}
                    </div>

                    {/* Formula */}
                    <Card className="bg-grey-50 dark:bg-grey-800 w-fit border-none shadow-none rounded-xl">
                        <Card.Content className="p-4">
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-foreground font-sans">Formula:</span>
                                    <span className="font-mono">spacing = multiplier × 0.25rem (4px)</span>
                                </div>
                                <div className="flex items-center gap-2 font-sans">
                                    <span>Use Tailwind classes:</span>
                                    <div className="flex items-center">
                                        <Chip size="sm" variant="soft" className="bg-grey-200 dark:bg-grey-700 h-6 min-h-6 rounded-md px-2 font-mono text-xs font-medium text-foreground">p-4</Chip>
                                        <span className="font-mono mx-1.5">= 1rem,</span>
                                        <Chip size="sm" variant="soft" className="bg-grey-200 dark:bg-grey-700 h-6 min-h-6 rounded-md px-2 font-mono text-xs font-medium text-foreground">gap-6</Chip>
                                        <span className="font-mono ml-1.5">= 1.5rem</span>
                                    </div>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
            </Section>

            {/* Radius */}
            <Section title="Border Radius">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {foundations.radius.map((r) => (
                        <Card key={r.name} className="flex flex-col items-center p-3 bg-grey-50 dark:bg-grey-800 border-none h-full ml-1 mr-1 rounded-lg">
                            <div
                                className="w-24 h-24 bg-[var(--splento-cyan)] mb-3 shrink-0"
                                style={{ borderRadius: `var(${r.variable})` }}
                            />
                            <div className="flex flex-col items-center text-center w-full">
                                <div className="text-lg font-bold text-foreground mb-1">{r.name.toLowerCase()}</div>
                                <div className="font-mono text-medium text-muted-foreground mb-4 opacity-70">{r.value}</div>
                                <div className="text-sm text-muted-foreground leading-snug px-2">{r.usage}</div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Shadows */}
            <Section title="Shadows & Elevation">
                <div className="rounded-2xl bg-grey-50 dark:bg-grey-950 p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {foundations.shadows.map((shadow) => (
                            <div key={shadow.name} className="flex flex-col gap-4 text-center group">
                                <div
                                    className="aspect-[3/2] bg-surface rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
                                    style={{ boxShadow: `var(${shadow.variable})` }}
                                >
                                    <Chip
                                        size="sm"
                                        variant="soft"
                                        className="bg-grey-200 dark:bg-grey-700 h-6 min-h-6 rounded-md px-2 font-mono text-xs font-medium text-foreground"
                                    >
                                        {shadow.label}
                                    </Chip>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-foreground mb-1">{shadow.name}</div>
                                    <div className="text-xs text-muted-foreground">{shadow.usage}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center text-xs text-muted-foreground font-medium opacity-70">
                        Note: Shadows are reduced in dark mode to prevent harsh contrast.
                    </div>
                </div>
            </Section>

            {/* Surface Layers */}
            <Section title="Surface Layers">
                <div className="flex flex-col gap-8">
                    <p className="text-sm text-muted-foreground">
                        Layered surfaces for visual hierarchy. Surface levels are calculated via color-mix() for consistent theming. Click any token to copy.
                    </p>

                    {/* Side-by-Side Visual Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm font-medium mb-3 text-muted-foreground">Light Mode</p>
                            {/* Force specific theme scope for visual demo */}
                            <div data-theme="light" className="light scheme-light text-foreground bg-[var(--background)] p-4 rounded-2xl border border-border">
                                <SurfaceStack />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium mb-3 text-muted-foreground">Dark Mode</p>
                            {/* Force specific theme scope for visual demo */}
                            <div data-theme="dark" className="dark scheme-dark text-foreground bg-[var(--background)] p-4 rounded-2xl border border-border">
                                <SurfaceStack />
                            </div>
                        </div>
                    </div>

                    {/* Surface Hierarchy Table */}
                    <div>
                        <div className="mb-4">
                            <h3 className="text-base font-semibold mb-1 text-foreground">Surface Hierarchy</h3>
                            <p className="text-xs text-muted-foreground">
                                Used by HeroUI <code className="px-1 py-0.5 rounded bg-default-100">&lt;Surface&gt;</code> component
                            </p>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-border">
                            <div className="overflow-x-auto rounded-lg border border-border">
                                <table className="w-full text-sm">
                                    <thead className="bg-grey-50 dark:bg-grey-800">
                                        <tr>
                                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Layer</th>
                                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Token</th>
                                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Light (Ref)</th>
                                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Dark (Ref)</th>
                                            <th className="text-left px-4 py-3 font-medium text-muted-foreground">HeroUI</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {foundations.surfaceHierarchy.map((level) => (
                                            <tr
                                                key={level.name}
                                                onClick={() => copyToClipboard(level.token)}
                                                className="cursor-pointer transition-colors hover:bg-grey-50 dark:hover:bg-grey-800 relative"
                                            >
                                                <td className="px-4 py-3 text-foreground">
                                                    {level.name}
                                                    {level.isCalculated && (
                                                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-warning/10 text-warning font-medium">
                                                            calc
                                                        </span>
                                                    )}
                                                    {copiedValue === level.token && (
                                                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-[1px] rounded-[inherit] transition-opacity duration-200 animate-in fade-in">
                                                            <div className="bg-foreground/50 text-snow px-3 py-1.5 rounded-md text-sm font-medium shadow-sm">Copied!</div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 font-mono text-xs text-[var(--splento-cyan)]">
                                                    {level.token}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="font-mono text-xs text-muted-foreground">
                                                        {level.lightHex}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="font-mono text-xs text-muted-foreground">
                                                        {level.darkHex}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {level.heroui ? (
                                                        <Chip
                                                            size="sm"
                                                            variant="soft"
                                                            className="bg-grey-200 dark:bg-grey-700 h-6 min-h-6 rounded-md px-2 font-mono text-xs font-medium text-foreground"
                                                        >
                                                            {level.heroui}
                                                        </Chip>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Calculated Tokens Info Box */}
                    <div className="p-4 rounded-lg bg-warning/5 border-l-4 border-warning">
                        <p className="text-sm font-medium mb-2 text-foreground">
                            ⚡ Calculated Tokens
                        </p>
                        <p className="text-xs font-mono text-muted-foreground mb-2">
                            Surface Secondary/Tertiary/Quaternary use <code>color-mix()</code>:
                        </p>
                        <div className="text-xs font-mono p-3 rounded bg-background border border-border overflow-x-auto text-muted-foreground">
                            <div>--color-surface-secondary: color-mix(in oklab, var(--surface) 94%, var(--foreground) 6%);</div>
                            <div>--color-surface-tertiary: color-mix(in oklab, var(--surface) 92%, var(--foreground) 8%);</div>
                            <div>--color-surface-quaternary: color-mix(in oklab, var(--surface) 86%, var(--foreground) 14%);</div>
                        </div>
                    </div>

                    {/* Content Hierarchy */}
                    <div>
                        <div className="mb-4">
                            <h3 className="text-base font-semibold mb-1 text-foreground">Content Hierarchy</h3>
                            <p className="text-xs text-muted-foreground">
                                For custom components when NOT using HeroUI <code className="px-1 py-0.5 rounded bg-default-100">&lt;Surface&gt;</code>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {foundations.contentHierarchy.map((level) => (
                                <button
                                    key={level.name}
                                    onClick={() => copyToClipboard(level.token)}
                                    className="relative p-4 rounded-lg border border-border text-left transition-all hover:scale-[1.02] group"
                                    style={{ backgroundColor: `var(${level.token})` }}
                                >
                                    <span className="text-xs font-mono block mb-1 text-[var(--splento-cyan)] font-medium">
                                        {level.token}
                                    </span>
                                    <span className="text-xs block text-muted-foreground group-hover:text-foreground transition-colors">
                                        {level.usage}
                                    </span>
                                    {copiedValue === level.token && (
                                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-[1px] rounded-[inherit] transition-opacity duration-200 animate-in fade-in">
                                            <div className="bg-foreground/50 text-snow px-3 py-1.5 rounded-md text-sm font-medium shadow-sm">Copied!</div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Usage Guidance */}
                    <div className="p-5 rounded-xl bg-grey-50 dark:bg-grey-800">
                        <h4 className="text-sm font-semibold mb-3 text-foreground">
                            When to use which?
                        </h4>
                        <ul className="space-y-3">
                            <li className="text-xs flex items-start gap-2 text-muted-foreground">
                                <span className="text-success mt-0.5">●</span>
                                <span>
                                    <strong className="text-foreground">Surface hierarchy:</strong> Use with HeroUI <code className="px-1 py-0.5 rounded bg-default-200 text-foreground">&lt;Surface variant="..."&gt;</code> component for cards, panels, and layered UI. Secondary/tertiary/quaternary provide nested elevation.
                                </span>
                            </li>
                            <li className="text-xs flex items-start gap-2 text-muted-foreground">
                                <span className="text-[var(--electric-blue)] mt-0.5">●</span>
                                <span>
                                    <strong className="text-foreground">Content hierarchy:</strong> Splento-specific tokens for custom layouts. Use when building components without HeroUI's <code className="px-1 py-0.5 rounded bg-default-200 text-foreground">&lt;Surface&gt;</code> — provides similar elevation levels.
                                </span>
                            </li>
                            <li className="text-xs flex items-start gap-2 text-muted-foreground">
                                <span className="text-[var(--accent-ai)] mt-0.5">●</span>
                                <span>
                                    <strong className="text-foreground">Overlay:</strong> Reserved for floating elements (Modal, Popover, Dropdown). These components use <code className="px-1 py-0.5 rounded bg-default-200 text-foreground">--overlay</code> automatically — always pair custom overlays with <code className="px-1 py-0.5 rounded bg-default-200 text-foreground">--overlay-shadow</code>.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Motion */}
            <Section title="Motion & Animation">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground px-1">Easing Functions</h4>
                        <div className="p-6 rounded-2xl bg-grey-50 dark:bg-grey-950 grid grid-cols-1 gap-4">
                            {foundations.motion.easing.map((ease) => (
                                <Card key={ease.name} className="group cursor-default p-4 flex flex-col gap-3 w-full text-foreground bg-surface">
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm font-medium">{ease.name}</span>
                                            <span className="text-xs text-muted-foreground opacity-70">{ease.usage}</span>
                                        </div>
                                        <SwatchButton valueToCopy={ease.variable} className="text-[10px] text-muted-foreground font-mono bg-default-100 px-1.5 py-0.5 rounded hover:text-foreground">
                                            {ease.variable}
                                        </SwatchButton>
                                    </div>
                                    <div className="h-8 w-full bg-default-100 rounded-lg overflow-hidden relative">
                                        <div
                                            className="h-full w-24 bg-accent rounded-md absolute top-0 left-0 group-hover:left-[calc(100%-6rem)] transition-all duration-1000"
                                            style={{ transitionTimingFunction: `var(${ease.variable})` }}
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-foreground px-1">Animations</h4>
                        <div className="p-6 rounded-2xl bg-grey-50 dark:bg-grey-950 grid grid-cols-2 gap-4">
                            <Card className="p-4 flex flex-col items-center justify-center gap-3 text-foreground bg-surface">
                                <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <span className="text-xs font-medium">Spin Fast</span>
                                    <div className="flex flex-col gap-0.5">
                                        <SwatchButton valueToCopy="--animate-spin-fast" className="text-[10px] text-muted-foreground font-mono bg-default-100 px-1.5 py-0.5 rounded hover:text-foreground mx-auto w-fit">
                                            --animate-spin-fast
                                        </SwatchButton>
                                        <span className="text-[9px] text-muted-foreground opacity-70">0.75s linear infinite</span>
                                        <span className="text-[9px] text-muted-foreground opacity-50">Loading spinners</span>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-4 flex flex-col items-center justify-center gap-3 text-foreground bg-surface">
                                <Skeleton className="w-24 h-4 rounded-lg" />
                                <Skeleton className="w-16 h-4 rounded-lg" />
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <span className="text-xs font-medium">Skeleton</span>
                                    <div className="flex flex-col gap-0.5">
                                        <SwatchButton valueToCopy="--skeleton-animation" className="text-[10px] text-muted-foreground font-mono bg-default-100 px-1.5 py-0.5 rounded hover:text-foreground mx-auto w-fit">
                                            --skeleton-animation
                                        </SwatchButton>
                                        <span className="text-[9px] text-muted-foreground opacity-70">shimmer | pulse | none</span>
                                        <span className="text-[9px] text-muted-foreground opacity-50">Configuration</span>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-4 flex flex-col items-center justify-center gap-3 col-span-2 text-foreground bg-surface">
                                <div className="flex items-center text-sm">
                                    Typing<span className="w-[2px] h-4 bg-accent ml-0.5 animate-[caret-blink_1.2s_ease-out_infinite]" />
                                </div>
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <span className="text-xs font-medium">Caret Blink</span>
                                    <div className="flex flex-col gap-0.5">
                                        <SwatchButton valueToCopy="--animate-caret-blink" className="text-[10px] text-muted-foreground font-mono bg-default-100 px-1.5 py-0.5 rounded hover:text-foreground mx-auto w-fit">
                                            --animate-caret-blink
                                        </SwatchButton>
                                        <span className="text-[9px] text-muted-foreground opacity-70">1.2s ease-out infinite</span>
                                        <span className="text-[9px] text-muted-foreground opacity-50">Typing indicators</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Section>

            {/* CSS Variables */}
            <Section title="CSS Variables">
                <pre className="text-xs font-mono p-4 rounded-xl overflow-x-auto bg-grey-100 text-grey-700 dark:bg-grey-800 dark:text-grey-300">
                    {`:root {
  /* Spacing Base */
  --spacing: 0.25rem; /* 4px - multiply for scale */

  /* Radius Scale */
  --radius: 0.5rem;
  --radius-sm: calc(var(--radius) * 0.5);   /* 4px */
  --radius-md: calc(var(--radius) * 0.75);  /* 6px */
  --radius-lg: calc(var(--radius) * 1);     /* 8px */
  --radius-xl: calc(var(--radius) * 1.5);   /* 12px */
  --radius-2xl: calc(var(--radius) * 2);    /* 16px */
  --radius-3xl: calc(var(--radius) * 3);    /* 24px */
  --radius-4xl: calc(var(--radius) * 4);    /* 32px */

  /* HeroUI Radius Aliases */
  --radius-small: var(--radius-sm);
  --radius-medium: var(--radius-md);
  --radius-large: var(--radius-lg);
  --field-radius: var(--radius-xl);

  /* Shadows */
  --surface-shadow:
    0 2px 4px 0 rgb(0 0 0 / 0.02),
    0 1px 2px 0 rgb(0 0 0 / 0.03),
    0 0 1px 0 rgb(0 0 0 / 0.03);
  --field-shadow:
    0 2px 4px 0 rgb(0 0 0 / 0.04),
    0 1px 2px 0 rgb(0 0 0 / 0.06),
    0 0 1px 0 rgb(0 0 0 / 0.06);
  --overlay-shadow:
    0 4px 16px 0 rgb(24 24 27 / 0.08),
    0 8px 24px 0 rgb(24 24 27 / 0.09);
  --shadow-large:
    0 10px 40px 0 rgb(24 24 27 / 0.12),
    0 20px 50px 0 rgb(24 24 27 / 0.10);

  /* HeroUI Shadow Aliases */
  --shadow-small: var(--surface-shadow);
  --shadow-medium: var(--overlay-shadow);

  /* Background */
  --background: oklch(0.99 0 0);

  /* Surface Hierarchy (HeroUI <Surface> component) */
  --surface: var(--white);
  --surface-foreground: var(--foreground);
  --color-surface-secondary: color-mix(in oklab, var(--color-surface) 94%, var(--color-surface-foreground) 6%);
  --color-surface-tertiary: color-mix(in oklab, var(--color-surface) 92%, var(--color-surface-foreground) 8%);
  
  /* Motion & Animation */
  --ease-smooth: ease;
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-fluid-out: cubic-bezier(0.32, 0.72, 0, 1);
  
  --animate-spin-fast: spin 0.75s linear infinite;
  --animate-skeleton: shimmer 2s linear infinite;
  --animate-caret-blink: caret-blink 1.2s ease-out infinite;
}`}
                </pre>
            </Section>
        </div>
    );
}
