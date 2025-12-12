import { useState } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Hub } from './views/Hub';
import { ColoursContent } from './views/ColoursContent';
import { TypographyContent } from './views/TypographyContent';

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
                        <Hub onNavigate={setActiveView} />
                    )}
                    {activeView === 'colours' && (
                        <ColoursContent darkMode={darkMode} />
                    )}
                    {activeView === 'typography' && (
                        <TypographyContent />
                    )}
                </main>

                <Footer darkMode={darkMode} />
            </div>
        </div>
    );
}
