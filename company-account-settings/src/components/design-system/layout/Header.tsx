import { Button } from '@heroui/react';

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    activeView: string;
    onBack: () => void;
}

export function Header({ darkMode, setDarkMode, activeView, onBack }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md border-b mb-8 bg-white/90 dark:bg-midnight/90 border-grey-200 dark:border-border">
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
                        className="text-xl font-bold font-sans text-midnight dark:text-snow"
                    >
                        Splento Design System
                    </h1>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onPress={() => setDarkMode(!darkMode)}
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    className="bg-grey-100 dark:bg-grey-800 text-grey-800 dark:text-snow"
                >
                    {darkMode ? '☀️ Light' : '🌙 Dark'}
                </Button>
            </div>
        </header>
    );
}
