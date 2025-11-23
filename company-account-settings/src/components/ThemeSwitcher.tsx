import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export function ThemeSwitcher() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        // Get initial theme from HTML element
        return document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
    });

    useEffect(() => {
        // Apply theme on mount and when it changes
        document.documentElement.className = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onPress={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="ml-2"
        >
            <Icon
                icon={theme === 'light' ? 'solar:moon-bold' : 'solar:sun-bold'}
                className="w-5 h-5"
            />
        </Button>
    );
}
