

import { useState } from 'react';
import { Button, Alert } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { HomePageProps } from '../types';
import {
    mockMetrics,
    mockTools,
    mockQuickAccess,
} from '../data/homepage.mock';
import {
    HeroBanner,
    MetricsGrid,
    FeaturedTools,
    QuickAccessCards,
} from '../components/home';

/**
 * HomePage Component
 * Main orchestrator for the enterprise dashboard home page.
 * Includes header with org switcher, hero banner, metrics, tools, and quick access.
 * 
 * Follows AccountSettings patterns:
 * - Direct Hero UI v3 imports
 * - State management with useState
 * - Compound component syntax
 * - onPress events, not onClick
 * - Semantic variants
 */
export default function HomePage({ onToolClick, className }: HomePageProps) {
    // ========== STATE MANAGEMENT ==========

    // Low credits warning
    const [showLowCreditsWarning, setShowLowCreditsWarning] = useState(true);

    // Loading states (Demonstration only - will be replaced with actual state management)
    const loadingStates = {
        metrics: false,
        tools: false,
        quickAccess: false,
    };

    // Error states (for demonstration only)
    const errors = {
        metrics: null as string | null,
        tools: null as string | null,
    };

    // ========== RENDER ==========

    return (
        <div className={`min-h-screen bg-background ${className ?? ''}`}>

            {/* ========== MAIN CONTENT ========== */}
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    {/* Low Credits Warning - using Alert with color prop */}
                    {showLowCreditsWarning && (
                        <Alert color="warning" className="flex items-center gap-3">
                            <Icon icon="gravity-ui:triangle-exclamation" className="size-5 flex-shrink-0" />
                            <Alert.Description className="flex-1">
                                You've used 84% of your monthly credits.{' '}
                                <a href="/billing" className="font-medium underline">
                                    Upgrade your plan
                                </a>
                            </Alert.Description>
                            <Button
                                isIconOnly
                                variant="ghost"
                                size="sm"
                                onPress={() => setShowLowCreditsWarning(false)}
                                aria-label="Dismiss warning"
                            >
                                <Icon icon="gravity-ui:xmark" className="size-4" />
                            </Button>
                        </Alert>
                    )}

                    {/* Hero Banner */}
                    <HeroBanner />

                    {/* Account Health Metrics */}
                    <section>
                        {errors.metrics ? (
                            <Alert color="danger">
                                <Icon icon="gravity-ui:circle-exclamation" className="size-5" />
                                <Alert.Description>{errors.metrics}</Alert.Description>
                            </Alert>
                        ) : (
                            <MetricsGrid metrics={mockMetrics} isLoading={loadingStates.metrics} />
                        )}
                    </section>

                    {/* Featured Tools */}
                    <section>
                        {errors.tools ? (
                            <Alert color="danger">
                                <Icon icon="gravity-ui:circle-exclamation" className="size-5" />
                                <Alert.Description>{errors.tools}</Alert.Description>
                            </Alert>
                        ) : (
                            <FeaturedTools
                                tools={mockTools}
                                isLoading={loadingStates.tools}
                                onToolClick={onToolClick}
                            />
                        )}
                    </section>

                    {/* Quick Access Cards */}
                    <section>
                        <QuickAccessCards
                            sections={mockQuickAccess}
                            isLoading={loadingStates.quickAccess}
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}
