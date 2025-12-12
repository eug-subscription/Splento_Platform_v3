import { Card, Chip } from '@heroui/react';
import { categories } from '../data/categories';

export function Hub({ onNavigate }: { onNavigate: (id: string) => void }) {
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
                            className="h-full bg-white dark:bg-surface border border-grey-200 dark:border-border shadow-sm pointer-events-none"
                        >
                            <Card.Header className="pb-0 pt-4 px-4 flex-col items-start gap-1">
                                <span className="text-4xl mb-2">{cat.icon}</span>
                                <Card.Title className="text-lg font-semibold text-midnight dark:text-snow">{cat.title}</Card.Title>
                                {cat.active && (
                                    <Card.Description className="text-sm text-grey-500 dark:text-grey-400">
                                        {cat.description}
                                    </Card.Description>
                                )}
                            </Card.Header>
                            {!cat.active && (
                                <Card.Content className="pt-2">
                                    <Chip size="sm" variant="secondary" className="bg-grey-100 text-grey-500 dark:bg-grey-800 dark:text-grey-400">Coming soon</Chip>
                                </Card.Content>
                            )}
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}
