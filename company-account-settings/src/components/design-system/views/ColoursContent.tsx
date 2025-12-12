import { Card } from '@heroui/react';
import { colors } from '../data/colors';
import { Section } from '../primitives/Section';
import { ColorSwatch } from '../primitives/ColorSwatch';
import { SwatchButton } from '../primitives/SwatchButton';
import { SampleBentoGrid } from '../samples/SampleBentoGrid';
import { SampleButtons } from '../samples/SampleButtons';
import { SampleChips } from '../samples/SampleChips';
import { SampleCreatorCard } from '../samples/SampleCreatorCard';
import { DataChart } from '../samples/DataChart';

export function ColoursContent({ darkMode }: { darkMode: boolean }) {
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
            <Section title="Brand Core">
                <div className="grid grid-cols-3 gap-6">
                    {colors.core.map((c) => (
                        <div key={c.name} className="flex flex-col gap-2 text-left group">
                            <SwatchButton
                                valueToCopy={c.hex}
                                className="h-24 w-full rounded-xl shadow-sm border border-border transition-transform group-hover:scale-[1.02]"
                                style={{ backgroundColor: c.hex }}
                                ariaLabel={`Copy ${c.name} (${c.hex})`}
                            />
                            <div>
                                <p className="text-sm font-medium text-midnight dark:text-snow">{c.name}</p>
                                <p className="text-xs font-mono text-grey-500">{c.hex}</p>
                                <p className="text-xs text-grey-400">{c.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Cyan Scale */}
            <Section title="Primary Scale — Cyan">
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
                            />
                            <span className="text-xs mt-2 text-grey-500 dark:text-grey-400">{c.step}</span>
                            {c.primary && <span className="text-xs text-cyan-500 font-medium">BASE</span>}
                        </div>
                    ))}
                </div>
            </Section>

            {/* Semantic + Accents Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Semantic */}
                <Section title="Semantic Colours">
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
                <Section title="Accent Palette">
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
            <Section title="Neutral Grey Scale">
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
                            />
                            <span className="text-xs mt-2 text-grey-500 dark:text-grey-400">{c.step}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Gradients */}
            <Section title="Gradients">
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
                            />
                            <Card.Header className="text-center p-4 pt-2">
                                <Card.Title className="text-sm font-medium mb-1 text-grey-800 dark:text-grey-200">{g.name}</Card.Title>
                                <Card.Description className="text-xs text-grey-400">{g.use}</Card.Description>
                            </Card.Header>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Component Preview */}
            <Section title="Component Preview">
                <div className="space-y-6">
                    <p className="text-sm font-medium text-grey-500 dark:text-grey-400">
                        Toggle theme in header to preview components in light or dark mode.
                    </p>
                    <SampleBentoGrid />
                    <div className="max-w-xl">
                        <SampleCreatorCard />
                    </div>
                </div>
            </Section>

            {/* Data Visualisation */}
            <Section title="Data Visualisation">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chart Placeholder */}
                    <DataChart />

                    <div className="p-4 rounded-xl shadow-sm bg-surface">
                        <p className="text-sm font-medium mb-4 text-grey-800 dark:text-grey-200">Colour Sequence</p>
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
            <Section title="Contrast & Accessibility">
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
            <Section title="CSS Variables">
                <pre className="text-xs font-mono p-4 rounded-xl overflow-x-auto bg-grey-100 dark:bg-grey-800 text-grey-700 dark:text-grey-300">
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
