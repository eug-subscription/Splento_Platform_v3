import { useTheme } from '../../../hooks/useTheme';

export function Footer() {
    const { theme } = useTheme();
    const darkMode = theme === 'dark';

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
