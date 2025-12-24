import { Card, Chip } from '@heroui/react';
import type { ToolData } from '../../types';

interface FeaturedToolsProps {
    tools: ToolData[];
    isLoading?: boolean;
    onToolClick?: (tool: ToolData) => void;
}

/**
 * FeaturedTools Component
 * Grid of tool/product cards with images, descriptions, and category chips
 * 
 * Follows AccountSettings patterns:
 * - Direct Hero UI v3 imports
 * - Compound component syntax
 * - isPressable for interactive cards
 * - onPress events
 */
export function FeaturedTools({ tools, isLoading = false, onToolClick }: FeaturedToolsProps) {
    const handleToolClick = (tool: ToolData) => {
        if (onToolClick) {
            onToolClick(tool);
        } else if (tool.href) {
            window.location.assign(tool.href);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {/* Section Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="h-6 w-32 animate-pulse rounded bg-default-200" />
                    <div className="h-4 w-16 animate-pulse rounded bg-default-200" />
                </div>

                {/* Tool Cards Skeleton */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} variant="default" className="rounded-large animate-pulse">
                            <div className="aspect-[2/1] w-full bg-default-200" />
                            <Card.Content className="p-3">
                                <div className="h-5 w-3/4 rounded bg-default-200" />
                                <div className="mt-2 h-4 w-full rounded bg-default-200" />
                            </Card.Content>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Featured Tools</h2>
                <a href="/tools" className="text-sm font-medium text-accent hover:underline">
                    View All
                </a>
            </div>

            {/* Tool Cards Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {tools.map((tool) => (
                    <Card
                        key={tool.id}
                        /* 
                            NOTE: Using onClick because HeroUI v3 Card does not support onPress directly.
                            Ideally should use a Pressable wrapper, but for now maintaining original behavior with correct prop.
                        */
                        onClick={() => handleToolClick(tool)}
                        variant="default"
                        className="group cursor-pointer rounded-large border-separator hover:shadow-lg transition-all"
                    >
                        {/* Tool Image */}
                        <div className="relative aspect-[2/1] w-full overflow-hidden bg-default-100">
                            <img
                                src={tool.image}
                                alt={tool.name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Category Chip Overlay */}
                            {tool.category && (
                                <div className="absolute right-3 top-3">
                                    <Chip color="danger" className="font-medium">
                                        {tool.category}
                                    </Chip>
                                </div>
                            )}
                        </div>

                        {/* Tool Info */}
                        <Card.Content className="p-3">
                            <h3 className="text-lg font-semibold text-foreground">{tool.name}</h3>
                            <p className="mt-1 text-sm text-foreground/50">{tool.description}</p>
                        </Card.Content>
                    </Card>
                ))}
            </div>
        </div>
    );
}
