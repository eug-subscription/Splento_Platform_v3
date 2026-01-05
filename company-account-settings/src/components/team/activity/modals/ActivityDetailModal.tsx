import { Modal, Button, Chip, Separator, Surface } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { ActivityLogEntry } from "@/types/activity";
import { ACTIVITY_CATEGORIES, getCategoryStyle } from "@/data/activity-constants";
import { formatRelativeTime } from "@/utils/date-utils";

export interface ActivityDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    entry: ActivityLogEntry | null;
}

export function ActivityDetailModal({ isOpen, onClose, entry }: ActivityDetailModalProps) {
    if (!entry) return null;

    const categoryConfig = ACTIVITY_CATEGORIES[entry.category];
    const categoryStyle = getCategoryStyle(entry.category);
    const actorName = entry.actor?.name ?? "System";
    const actorAvatar = entry.actor?.avatar;

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop variant="blur">
                <Modal.Container placement="center">
                    <Modal.Dialog className="w-full max-w-2xl rounded-(radius-3xl) border border-default-100 bg-background shadow-2xl overflow-hidden">
                        <Modal.CloseTrigger />

                        <Modal.Header className="p-6 flex flex-row items-center gap-4">
                            <Modal.Icon
                                className="size-12 shrink-0 shadow-sm"
                                style={categoryStyle}
                            >
                                <Icon icon={categoryConfig.icon} className="size-6" />
                            </Modal.Icon>
                            <div className="flex flex-col gap-1">
                                <Modal.Heading className="text-2xl font-bold tracking-tight">
                                    Activity Details
                                </Modal.Heading>
                                <div className="flex items-center gap-2">
                                    <Chip
                                        size="sm"
                                        variant="soft"
                                        style={categoryStyle}
                                        className="h-5 px-2 text-[10px] font-bold uppercase tracking-widest border-none"
                                    >
                                        {categoryConfig.label}
                                    </Chip>
                                    <span className="text-xs text-default-400 font-mono">
                                        ID: {entry.id}
                                    </span>
                                </div>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="p-6 space-y-8">
                            {/* 1. Main Action Description */}
                            <section className="space-y-3">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-default-400 uppercase tracking-[0.08em] px-1">Action Description</span>
                                    <p className="text-lg font-medium text-foreground leading-relaxed px-1">
                                        {entry.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 px-1 text-sm text-default-500">
                                    <Icon icon="gravity-ui:clock" className="size-4" />
                                    <span>{new Date(entry.timestamp).toLocaleString(undefined, {
                                        dateStyle: 'full',
                                        timeStyle: 'medium'
                                    })}</span>
                                    <span className="text-default-300">•</span>
                                    <span>{formatRelativeTime(entry.timestamp)}</span>
                                </div>
                            </section>

                            <Separator className="bg-default-100" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* 2. Actor Profile */}
                                <section className="space-y-3">
                                    <span className="text-xs font-semibold text-default-400 uppercase tracking-[0.08em] px-1">Performed By</span>
                                    <Surface className="p-4 rounded-2xl bg-background border-default-100 flex items-center gap-3">
                                        {actorAvatar ? (
                                            <img src={actorAvatar} className="size-10 rounded-full border-2 border-background" alt={actorName} />
                                        ) : (
                                            <div className="size-10 rounded-full bg-default-200 flex items-center justify-center border-2 border-background">
                                                <Icon icon="gravity-ui:gear" className="size-5 text-default-500" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm truncate">{actorName}</p>
                                            <p className="text-xs text-default-500 truncate">{entry.actor?.email ?? "Automated Process"}</p>
                                        </div>
                                    </Surface>
                                </section>

                                {/* 3. Origin Details */}
                                <section className="space-y-3">
                                    <span className="text-xs font-semibold text-default-400 uppercase tracking-[0.08em] px-1">Origin Info</span>
                                    <div className="space-y-2 px-1">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Icon icon="gravity-ui:tag" className="size-4 text-default-400" />
                                            <span className="text-default-500">IP:</span>
                                            <span className="font-mono font-medium">{entry.metadata?.ip ?? "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Icon icon="gravity-ui:location" className="size-4 text-default-400" />
                                            <span className="text-default-500">Location:</span>
                                            <span className="font-medium">{entry.metadata?.location ?? "Unknown"}</span>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* 4. Metadata specifics */}
                            {(entry.metadata?.resourceName || entry.metadata?.resourceId || entry.metadata?.oldValue !== undefined) && (
                                <section className="space-y-4">
                                    <Separator className="bg-default-100" />
                                    <span className="text-xs font-semibold text-default-400 uppercase tracking-[0.08em] px-1">Resource & Changes</span>

                                    <Surface className="rounded-2xl border-default-100 overflow-hidden divide-y divide-default-100 bg-background">
                                        {entry.metadata?.resourceName && (
                                            <div className="p-4 flex justify-between items-center gap-4">
                                                <span className="text-xs text-default-500 font-medium">Resource</span>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold">{entry.metadata.resourceName}</p>
                                                    <p className="text-[10px] text-default-400 font-mono">{entry.metadata.resourceId}</p>
                                                </div>
                                            </div>
                                        )}

                                        {entry.metadata?.oldValue !== undefined && entry.metadata?.newValue !== undefined && (
                                            <div className="p-4 space-y-3">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <span className="text-[9px] font-bold text-danger uppercase tracking-wider">Before</span>
                                                        <pre className="p-2 rounded-lg bg-danger/5 border border-danger/10 text-[11px] font-mono text-danger-600 whitespace-pre-wrap">
                                                            {entry.metadata.oldValue || "(Empty)"}
                                                        </pre>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-[9px] font-bold text-success uppercase tracking-wider">After</span>
                                                        <pre className="p-2 rounded-lg bg-success/5 border border-success/10 text-[11px] font-mono text-success-600 whitespace-pre-wrap">
                                                            {entry.metadata.newValue || "(Empty)"}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Surface>
                                </section>
                            )}

                            {/* 5. User Agent */}
                            {entry.metadata?.userAgent && (
                                <section className="space-y-2">
                                    <span className="text-xs font-semibold text-default-400 uppercase tracking-[0.08em] px-1">Client Identifier</span>
                                    <div className="p-3 rounded-xl bg-default-50 text-[11px] text-default-500 font-mono leading-relaxed border border-default-200/50">
                                        {entry.metadata.userAgent}
                                    </div>
                                </section>
                            )}
                        </Modal.Body>

                        <Modal.Footer className="p-6 pt-0 flex justify-end">
                            <Button
                                variant="secondary"
                                onPress={onClose}
                                className="rounded-xl px-8 font-bold h-11"
                            >
                                Close Entry
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
