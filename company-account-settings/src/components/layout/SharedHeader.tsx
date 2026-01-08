

import { lazy, Suspense } from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLayout } from '@/hooks/useLayout';
import { ThemeSwitcher } from '@/components/navigation/ThemeSwitcher';

const CommandPalette = lazy(() => import('@/components/navigation/CommandPalette').then(m => ({ default: m.CommandPalette })));
import { OrgSwitcher } from './OrgSwitcher';
import { enterpriseCommands } from '@/data/enterprise-commands';

export function SharedHeader() {
    const {
        headerLeft,
        showCommandPalette,
        headerTitle,
        showCredits
    } = useLayout();

    return (
        <header className="sticky top-0 z-50 border-b border-separator bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Left: Org Switcher, Back Button, or Custom */}
                    <div className="flex items-center gap-4">
                        {headerLeft.type === 'org-switcher' && (
                            <OrgSwitcher />
                        )}

                        {headerLeft.type === 'back-button' && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onPress={headerLeft.onBack}
                                className="mr-2 gap-1"
                            >
                                <Icon
                                    icon="gravity-ui:chevron-left"
                                    className="size-4"
                                    aria-hidden="true"
                                />
                                {headerLeft.label || 'Back'}
                            </Button>
                        )}

                        {headerLeft.type === 'custom' && (
                            headerLeft.content
                        )}
                    </div>

                    {/* Center: Title or Command Palette */}
                    <div className="hidden flex-1 max-w-md md:block text-center">
                        {headerTitle ? (
                            <h1 className="text-lg font-semibold">{headerTitle}</h1>
                        ) : showCommandPalette ? (
                            <Suspense fallback={<div className="h-10 bg-default-100 animate-pulse rounded-lg w-full" />}>
                                {showCommandPalette && (
                                    <CommandPalette items={enterpriseCommands} />
                                )}
                            </Suspense>
                        ) : null}
                    </div>

                    {/* Right: Credits + Theme + User Menu */}
                    <div className="flex items-center gap-4">
                        {/* Credits Display */}
                        {showCredits && (
                            <div className="hidden items-center gap-2 rounded-lg bg-accent/10 px-3 py-2 sm:flex">
                                <Icon
                                    icon="gravity-ui:coins"
                                    className="size-5 text-accent"
                                    aria-hidden="true"
                                />
                                <span className="text-sm font-semibold text-foreground">1,247 Credits</span>
                            </div>
                        )}

                        {/* Theme Switcher */}
                        <ThemeSwitcher />

                        {/* User Menu placeholder if needed, usually managed here or globally */}
                    </div>
                </div>
            </div>
        </header>
    );
}
