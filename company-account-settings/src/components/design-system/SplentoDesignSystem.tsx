

import { useState, useEffect } from 'react';
import { Footer } from './layout/Footer';
import { Hub } from './views/Hub';
import { ColoursContent } from './views/ColoursContent';
import { TypographyContent } from './views/TypographyContent';
import { FoundationsContent } from './views/FoundationsContent';
import { useLayout } from '../../context/LayoutContext';

const VIEWS = {
    hub: Hub,
    colours: ColoursContent,
    typography: TypographyContent,
    foundations: FoundationsContent,
} as const;

export type DesignSystemView = keyof typeof VIEWS;

export default function SplentoDesignSystem() {
    const [activeView, setActiveView] = useState<DesignSystemView>('hub');
    const { setHeaderTitle, setHeaderLeft, setShowCredits, setShowCommandPalette, resetToDefault } = useLayout();

    useEffect(() => {
        return () => resetToDefault();
    }, [resetToDefault]);

    useEffect(() => {
        setShowCredits(true);
        setShowCommandPalette(true);

        if (activeView === 'hub') {
            setHeaderTitle(undefined);
            setHeaderLeft({ type: 'org-switcher' });
        } else {
            setHeaderTitle(undefined);
            setHeaderLeft({
                type: 'back-button',
                label: 'Back',
                onBack: () => setActiveView('hub'),
            });
        }
    }, [activeView, setHeaderTitle, setHeaderLeft, setShowCredits, setShowCommandPalette]);



    let content;
    if (activeView === 'hub') {
        content = <Hub onNavigate={(id) => setActiveView(id as DesignSystemView)} />;
    } else {
        // When not hub, activeView narrows to keys that don't require props
        const View = VIEWS[activeView];
        content = <View />;
    }

    return (
        <div className="min-h-screen bg-background">
            <section className="max-w-6xl mx-auto px-6 pb-12 pt-8">
                {content}
            </section>

            <Footer />
        </div>
    );
}
