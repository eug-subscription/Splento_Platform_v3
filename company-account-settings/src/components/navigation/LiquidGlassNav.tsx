'use client';

import { Icon } from '@iconify/react';
import { Chip } from '@heroui/react';
import type { LiquidGlassNavProps } from '../../types/navigation';

export function LiquidGlassNav({ items, activeId, onNavigate, onMorePress }: LiquidGlassNavProps) {
    return (
        <nav
            aria-label="Mobile Navigation"
            className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden pointer-events-none flex justify-center"
        >
            <div className="liquid-glass-container pointer-events-auto relative">
                <ul className="flex relative p-1.5 list-none m-0 gap-1">
                    {items.map((item) => (
                        <li key={item.id} className="relative z-10 top-0 bottom-0">
                            {/* 
                            NOTE: Using native button instead of HeroUI Button to maintain precise control 
                            over the liquid glass layout and animations. 
                            onClick is used here as this is a native element.
                        */}
                            <button
                                data-id={item.id}
                                onClick={() => {
                                    if (item.id === 'more') {
                                        onMorePress?.();
                                    } else if (item.href) {
                                        onNavigate?.(item.href);
                                    }
                                }}
                                className={`liquid-glass-item flex-col gap-1 ${activeId === item.id ? 'liquid-glass-item--active' : ''}`}
                                aria-current={activeId === item.id ? 'page' : undefined}
                                aria-label={item.label}
                            >
                                {/* Active Pill (Internal) - Ensures perfect alignment with content */}
                                {activeId === item.id && (
                                    <span
                                        className="liquid-glass-pill"
                                        aria-hidden="true"
                                    />
                                )}

                                <div className="relative z-10">
                                    <Icon icon={item.icon} className="w-6 h-6" />
                                    {item.badge && (
                                        <div className="absolute -top-2 -right-2">
                                            <Chip
                                                size="sm"
                                                color="danger"
                                                aria-label={`${item.badge} notifications`}
                                                className="h-4 min-w-4 px-1 text-xs flex items-center justify-center pointer-events-none"
                                            >
                                                {item.badge}
                                            </Chip>
                                        </div>
                                    )}
                                </div>
                                <span className="relative z-10 text-xs font-medium leading-none mt-1">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
