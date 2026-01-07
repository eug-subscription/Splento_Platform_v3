import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";

export interface ActivityEmptyStateProps {
    isFiltered: boolean;
    onResetFilters?: () => void;
}

export function ActivityEmptyState({
    isFiltered,
    onResetFilters,
}: ActivityEmptyStateProps) {
    const content = isFiltered
        ? {
            icon: "gravity-ui:magnifying-glass",
            title: "No results found",
            description: "We couldn't find any activity logs matching your current filters. Try adjusting them or clearing the search.",
            actionLabel: "Clear all filters",
            showAction: !!onResetFilters,
        }
        : {
            icon: "gravity-ui:pulse",
            title: "No activity yet",
            description: "Activity logs will appear here as team members perform actions, manage permissions, or update settings.",
            actionLabel: "",
            showAction: false,
        };

    return (
        <Card className="border-dashed border-2 border-default-200 bg-transparent shadow-none p-12 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
                <div className="p-6 rounded-full bg-default-50 text-default-300">
                    <Icon icon={content.icon} className="size-16" />
                </div>
                <div className="max-w-md space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{content.title}</h3>
                    <p className="text-muted-foreground">{content.description}</p>
                </div>
                {content.showAction && (
                    <Button
                        variant="secondary"
                        onPress={onResetFilters}
                        className="rounded-xl px-8 font-medium mt-2"
                    >
                        <Icon icon="gravity-ui:arrow-rotate-left" className="size-4 mr-2" />
                        {content.actionLabel}
                    </Button>
                )}
            </div>
        </Card>
    );
}
