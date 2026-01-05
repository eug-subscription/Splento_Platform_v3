import { Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { ActivityLogEntry } from "@/types/activity";
import { ACTIVITY_CATEGORIES, getCategoryStyle } from "@/data/activity-constants";
import { formatRelativeTime } from "@/utils/date-utils";

export interface ActivityLogRowProps {
    entry: ActivityLogEntry;
    onPress?: (entry: ActivityLogEntry) => void;
}

export function ActivityLogRow({ entry, onPress }: ActivityLogRowProps) {
    const categoryConfig = ACTIVITY_CATEGORIES[entry.category];
    const categoryStyle = getCategoryStyle(entry.category);
    const actorName = entry.actor?.name ?? "System";
    const actorAvatar = entry.actor?.avatar;

    return (
        <Button
            id={`activity-row-${entry.id}`}
            onPress={() => onPress?.(entry)}
            fullWidth
            variant="secondary"
            className="group flex flex-row items-start gap-3 p-3 md:p-4 rounded-(radius-2xl) md:rounded-(radius-3xl) border border-default-100 bg-background/50 hover:bg-default-50/50 cursor-pointer active:scale-[0.99] transition-all duration-300 shadow-none h-auto whitespace-normal text-left justify-start"
        >
            {/* 1. Category Icon (Soft Variant) - Smaller on mobile */}
            <div
                className="size-8 md:size-10 rounded-full flex items-center justify-center shrink-0"
                style={categoryStyle}
            >
                <Icon icon={categoryConfig.icon} className="size-4 md:size-5" />
            </div>

            <div className="flex-1 space-y-1.5 w-full min-w-0">
                {/* 2. Top Line: Actor & Category & Time */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                    <div className="flex items-center gap-2 flex-wrap text-left">
                        <div className="flex items-center gap-1.5">
                            {actorAvatar ? (
                                <img
                                    src={actorAvatar}
                                    alt={actorName}
                                    className="size-4 md:size-5 rounded-full object-cover"
                                />
                            ) : (
                                <div className="size-4 md:size-5 rounded-full bg-default-200 flex items-center justify-center">
                                    <Icon
                                        icon="gravity-ui:gear"
                                        className="size-2.5 md:size-3 text-default-500"
                                    />
                                </div>
                            )}
                            <span className="font-semibold text-foreground text-sm md:text-base truncate max-w-[8rem] md:max-w-none">
                                {actorName}
                            </span>
                        </div>

                        <Chip
                            size="sm"
                            variant="soft"
                            className="h-4 md:h-5 px-1.5 md:px-2 text-[10px] font-bold uppercase tracking-wider rounded-full"
                            style={categoryStyle}
                        >
                            {categoryConfig.label}
                        </Chip>

                        <span className="text-xs text-default-500 sm:hidden">
                            • {formatRelativeTime(entry.timestamp)}
                        </span>
                    </div>
                    <span className="text-xs md:text-sm text-default-500 shrink-0 hidden sm:inline">
                        {formatRelativeTime(entry.timestamp)}
                    </span>
                </div>

                {/* 3. Middle Line: Action Description */}
                <p className="text-foreground leading-snug md:leading-relaxed font-medium text-sm md:text-base text-left group-hover:text-foreground transition-colors">
                    {entry.description}
                </p>

                {/* 4. Bottom Line: Metadata (IP & Location) */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-default-500 text-left">
                    {entry.metadata?.ip && (
                        <div className="flex items-center gap-1">
                            <Icon icon="gravity-ui:tag" className="size-2.5 md:size-3" />
                            <span>{entry.metadata.ip}</span>
                        </div>
                    )}
                    {entry.metadata?.location && (
                        <div className="flex items-center gap-1">
                            <Icon icon="gravity-ui:location" className="size-2.5 md:size-3" />
                            <span>{entry.metadata.location}</span>
                        </div>
                    )}
                    {entry.metadata?.userAgent && (
                        <div className="flex items-center gap-1 lg:flex hidden">
                            <Icon icon="gravity-ui:laptop" className="size-2.5 md:size-3" />
                            <span className="truncate max-w-48">
                                {entry.metadata.userAgent}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Button>
    );
}
