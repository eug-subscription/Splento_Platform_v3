import { Avatar, Card, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { QuickAccessSection } from '../../types';

interface QuickAccessCardsProps {
    sections: QuickAccessSection[];
    isLoading?: boolean;
}

/**
 * QuickAccessCards Component  
 * Three side-by-side cards for SDK, Data Sources, and Documentation
 * 
 * Follows AccountSettings patterns:
 * - Direct Hero UI v3 imports
 * - Compound component syntax (Avatar.Fallback)
 * - Chip components for SDK badges
 * - flex -space-x-2 for Avatar group (no Avatar.Group in v3)
 */
export function QuickAccessCards({ sections, isLoading = false }: QuickAccessCardsProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} variant="default" className="rounded-large animate-pulse">
                        <Card.Content className="p-5">
                            <div className="h-10 w-10 rounded-full bg-default-200" />
                            <div className="mt-4 h-5 w-3/4 rounded bg-default-200" />
                            <div className="mt-2 h-4 w-full rounded bg-default-200" />
                            <div className="mt-4 space-y-2">
                                <div className="h-4 w-2/3 rounded bg-default-200" />
                                <div className="h-4 w-1/2 rounded bg-default-200" />
                            </div>
                        </Card.Content>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {sections.map((section) => (
                <Card key={section.id} variant="default" className="rounded-large border-separator">
                    <Card.Content className="p-5">
                        {/* Icon */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                            <Icon icon={section.icon} className="size-6 text-accent" />
                        </div>

                        {/* Title & Description */}
                        <h3 className="mt-4 text-lg font-semibold text-foreground">
                            {section.title}
                        </h3>
                        <p className="mt-1 text-sm text-foreground/50">
                            {section.description}
                        </p>

                        {/* SDK Chip Components */}
                        {section.sdkBadges && section.sdkBadges.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {section.sdkBadges.map((badge) => (
                                    <Chip key={badge} size="sm" color="accent">
                                        {badge}
                                    </Chip>
                                ))}
                            </div>
                        )}

                        {/* User Avatars (manual group with flex -space-x-2) */}
                        {section.avatars && section.avatars.length > 0 && (
                            <div className="mt-4">
                                <div className="flex -space-x-2">
                                    {section.avatars.slice(0, 3).map((avatar, index) => (
                                        <Avatar
                                            key={index}
                                            className="border-2 border-background"
                                        >
                                            <Avatar.Image src={avatar} />
                                            <Avatar.Fallback />
                                        </Avatar>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Links */}
                        {section.links && section.links.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {section.links.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.href}
                                        className="flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                                    >
                                        {link.icon && <Icon icon={link.icon} className="size-4" />}
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </Card.Content>
                </Card>
            ))}
        </div>
    );
}
