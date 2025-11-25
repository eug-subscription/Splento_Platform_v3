import { useState } from 'react';
import { Avatar, Button, ComboBox, Input, ListBox, Label, Separator, Select, Alert } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { HomePageProps, Organization } from '../types';
import {
    mockOrganizations,
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
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { CommandPalette } from '../components/CommandPalette';
import { enterpriseCommands } from '../data/enterprise-commands';

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
export default function HomePage({ onOrgChange, onToolClick, className }: HomePageProps) {
    // ========== STATE MANAGEMENT ==========

    // Organization state
    const [selectedOrg, setSelectedOrg] = useState<Organization>(mockOrganizations[0]);
    const [isOrgSwitching, setIsOrgSwitching] = useState(false);

    // Low credits warning
    const [showLowCreditsWarning, setShowLowCreditsWarning] = useState(true);

    // Loading states
    const [loadingStates, setLoadingStates] = useState({
        metrics: false,
        tools: false,
        quickAccess: false,
    });

    // Error states (for demonstration only)
    const errors = {
        metrics: null as string | null,
        tools: null as string | null,
    };

    // ========== HANDLERS ==========

    // Handle org switch
    const handleOrgSwitch = async (orgId: string) => {
        const newOrg = mockOrganizations.find((o) => o.id === orgId);
        if (!newOrg || newOrg.id === selectedOrg.id) return;

        setIsOrgSwitching(true);
        setLoadingStates({ metrics: true, tools: true, quickAccess: true });

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setSelectedOrg(newOrg);

            // Notify parent component
            if (onOrgChange) {
                onOrgChange(newOrg);
            }

            // Update URL
            const url = new URL(window.location.href);
            url.searchParams.set('org', newOrg.slug);
            window.history.pushState({}, '', url);
        } catch (error) {
            console.error('Failed to switch organization:', error);
        } finally {
            setIsOrgSwitching(false);
            setLoadingStates({ metrics: false, tools: false, quickAccess: false });
        }
    };

    // ========== RENDER ==========

    return (
        <div className={`min-h-screen bg-background ${className || ''}`}>
            {/* ========== HEADER ========== */}
            <header className="sticky top-0 z-50 border-b border-separator bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Left: Logo + Org Switcher */}
                        <div className="flex items-center gap-4">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
                                    <span className="text-lg font-bold text-white">V</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">Visionary Studio</span>
                            </div>

                            {/* Org Switcher */}
                            <ComboBox
                                selectedKey={selectedOrg.id}
                                onSelectionChange={(key) => handleOrgSwitch(key as string)}
                                isDisabled={isOrgSwitching}
                                className="w-48"
                            >
                                <Label className="sr-only">Select organization</Label>
                                <ComboBox.InputGroup>
                                    <Input placeholder="Select org..." />
                                    <ComboBox.Trigger />
                                </ComboBox.InputGroup>
                                <ComboBox.Popover>
                                    <ListBox>
                                        {mockOrganizations.map((org) => (
                                            <ListBox.Item key={org.id} id={org.id} textValue={org.name}>
                                                {org.name}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </ComboBox.Popover>
                            </ComboBox>
                        </div>

                        {/* Center: Command Palette */}
                        <div className="hidden flex-1 max-w-md md:block">
                            <CommandPalette items={enterpriseCommands} />
                        </div>

                        {/* Right: Credits + Theme + User Menu */}
                        <div className="flex items-center gap-4">
                            {/* Credits Display */}
                            <div className="hidden items-center gap-2 rounded-lg bg-accent/10 px-3 py-2 sm:flex">
                                <Icon icon="gravity-ui:coins" className="size-5 text-accent" />
                                <span className="text-sm font-semibold text-foreground">1,247 Credits</span>
                            </div>

                            {/* Theme Switcher */}
                            <ThemeSwitcher />

                            {/* User Profile Select (following AccountSettings pattern) */}
                            <Select selectedKey="profile" aria-label="User menu">
                                <Select.Trigger className="w-auto h-auto p-0 bg-transparent border-0">
                                    <Avatar size="sm" className="h-8 w-8">
                                        <Avatar.Image src="https://i.pravatar.cc/150?img=5" />
                                        <Avatar.Fallback>U</Avatar.Fallback>
                                    </Avatar>
                                    <Select.Indicator className="hidden" />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="profile" textValue="Profile">
                                            <Icon icon="gravity-ui:user" className="size-4" />
                                            Profile
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="settings" textValue="Settings">
                                            <Icon icon="gravity-ui:gear" className="size-4" />
                                            Settings
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="billing" textValue="Billing">
                                            <Icon icon="gravity-ui:credit-card" className="size-4" />
                                            Billing
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <Separator />
                                        <ListBox.Item id="logout" textValue="Log out">
                                            <Icon icon="gravity-ui:arrow-right-from-square" className="size-4" />
                                            Log out
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </div>
                </div>
            </header>

            {/* ========== MAIN CONTENT ========== */}
            <main className="container mx-auto px-4 py-8">
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
            </main>
        </div>
    );
}
