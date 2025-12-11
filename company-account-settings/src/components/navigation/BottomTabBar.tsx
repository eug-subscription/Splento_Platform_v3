"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { PRIMARY_TABS } from "../../config/navigation";
import type { MenuItem } from "../../types/navigation";

interface BottomTabBarProps {
    currentPath: string;
    onNavigate?: (path: string) => void;
    onMorePress: () => void;
}

export function BottomTabBar({ currentPath, onNavigate, onMorePress }: BottomTabBarProps) {

    const isTabActive = (tab: MenuItem) => {
        if (!tab.href) return false;
        // Exact match or starts with + separator (e.g. /orders and /orders/123 but NOT /orders-archive)
        return currentPath === tab.href || (tab.href !== '/' && currentPath.startsWith(`${tab.href}/`));
    };

    return (
        <nav
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-separator pb-[env(safe-area-inset-bottom)]"
            aria-label="Mobile Navigation"
        >
            <div className="flex items-center justify-around h-16 px-2">
                {PRIMARY_TABS.map((tab) => {
                    const isActive = isTabActive(tab);

                    return (
                        <Button
                            key={tab.id}
                            variant="ghost"
                            className={`flex-1 flex-col gap-1 h-auto py-2 min-w-0 bg-transparent data-[hovered]:bg-transparent ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                            onPress={() => tab.href && onNavigate?.(tab.href)}
                            aria-label={tab.label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <div
                                className={`
                                    flex items-center justify-center h-8 w-14 rounded-full transition-all duration-300 ease-out 
                                    ${isActive ? 'bg-primary/10 scale-100' : 'bg-transparent scale-90'}
                                `}
                            >
                                <Icon
                                    icon={tab.icon || 'gravity-ui:circle'}
                                    className={`size-6 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                                />
                            </div>
                            <span className="text-xs font-medium truncate w-full text-center">
                                {tab.label}
                            </span>
                        </Button>
                    );
                })}

                {/* More Tab */}
                <Button
                    variant="ghost"
                    className="flex-1 flex-col gap-1 h-auto py-2 min-w-0 bg-transparent data-[hovered]:bg-transparent text-muted-foreground"
                    onPress={onMorePress}
                    aria-label="More Menu"
                >
                    <div className="p-1 rounded-full bg-transparent">
                        <Icon icon="gravity-ui:bars" className="size-6 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium truncate w-full text-center">
                        More
                    </span>
                </Button>
            </div>
        </nav>
    );
}
