import { Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { Session } from "@/types/security";
import { formatRelativeTime } from "@/utils/date-utils";
import { getBrowserIcon } from "@/utils/security";

interface SessionRowProps {
    session: Session;
    onRevoke: (session: Session) => void;
}

export function SessionRow({ session, onRevoke }: SessionRowProps) {
    const {
        isCurrent,
        browser,
        os,
        ipAddress,
        location,
        lastActiveAt,
    } = session;

    return (
        <div className="flex items-center justify-between p-4 rounded-2xl border border-separator bg-surface/50 hover:bg-surface transition-colors">
            <div className="flex items-center gap-4">
                {/* Device Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-default/10 text-default-500 overflow-hidden">
                    <Icon
                        icon={getBrowserIcon(browser)}
                        className="w-6 h-6"
                    />
                </div>

                {/* Session Info */}
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                            {browser} on {os}
                        </span>
                        {isCurrent && (
                            <Chip
                                size="sm"
                                variant="soft"
                                color="success"
                                className="h-5 px-2 text-[10px] font-bold uppercase tracking-wider"
                            >
                                This Device
                            </Chip>
                        )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-default-500">
                        <span className="flex items-center gap-1">
                            <Icon icon="gravity-ui:globe" className="w-3.5 h-3.5" />
                            {ipAddress}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Icon icon="gravity-ui:location-pin" className="w-3.5 h-3.5" />
                            {location.city ? `${location.city}, ` : ''}{location.country}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Last Active */}
                <div className="hidden md:flex flex-col items-end gap-0.5 text-right mr-4">
                    <span className="text-[10px] text-default-400 font-medium uppercase tracking-wider">
                        Last Active
                    </span>
                    <span className="text-sm font-medium text-default-600">
                        {isCurrent ? 'Active now' : formatRelativeTime(lastActiveAt)}
                    </span>
                </div>

                {/* Actions */}
                {!isCurrent && (
                    <Button
                        variant="tertiary"
                        onPress={() => onRevoke(session)}
                        className="rounded-full px-6 font-medium text-danger hover:bg-danger-soft transition-colors min-w-[100px]"
                    >
                        Revoke
                    </Button>
                )}

                {/* Visual indicator for current session instead of button */}
                {isCurrent && (
                    <div className="w-9 h-9 flex items-center justify-center text-success">
                        <Icon icon="gravity-ui:circle-check-fill" className="w-6 h-6" />
                    </div>
                )}
            </div>
        </div>
    );
}
