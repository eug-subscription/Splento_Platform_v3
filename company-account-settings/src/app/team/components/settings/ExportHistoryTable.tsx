import { Icon } from '@iconify/react';
import { Button, Chip, Surface } from '@heroui/react';
import type { DataExport, ExportStatus } from '@/types/settings';
import { format } from 'date-fns';

interface ExportHistoryTableProps {
    /** List of data exports to display */
    exports: DataExport[];
    /** Callback triggered when a download is requested */
    onDownload: (exportId: string) => void;
    /** Callback triggered when an export record is deleted */
    onDelete: (exportId: string) => void;
}

/**
 * ExportHistoryTable Component
 * 
 * @description Displays a tabular history of data exports requested by the team.
 * Includes status tracking, file size formatting, and action triggers for download/deletion.
 * Implements a premium empty state when no records are present.
 */
export function ExportHistoryTable({ exports, onDownload, onDelete }: ExportHistoryTableProps) {
    const getStatusConfig = (status: ExportStatus) => {
        switch (status) {
            case 'ready':
                return { label: 'Ready', color: 'success' as const, icon: 'gravity-ui:circle-check' };
            case 'processing':
                return { label: 'Processing', color: 'accent' as const, icon: 'gravity-ui:circle-play' };
            case 'expired':
                return { label: 'Expired', color: 'default' as const, icon: 'gravity-ui:clock' };
            case 'failed':
                return { label: 'Failed', color: 'danger' as const, icon: 'gravity-ui:circle-exclamation' };
            default:
                return { label: status, color: 'default' as const, icon: 'gravity-ui:circle' };
        }
    };

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return '--';
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(1)} MB`;
    };

    if (exports.length === 0) {
        return (
            <Surface
                variant="quaternary"
                className="flex flex-col items-center justify-center py-12 text-center rounded-2xl border border-dashed border-default-200 dark:border-default-50/20 bg-default-50/30"
            >
                <div className="size-12 rounded-full bg-default-100 flex items-center justify-center mb-4 text-default-400">
                    <Icon icon="gravity-ui:file-xmark" className="size-6" />
                </div>
                <h4 className="text-sm font-bold text-foreground">No exports yet</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                    Request a data export to see your history here.
                </p>
            </Surface>
        );
    }

    return (
        <div className="relative overflow-x-auto rounded-xl border border-default-100 dark:border-default-50/10">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="sticky top-0 bg-default-50/80 dark:bg-default-100/10 backdrop-blur-md transition-colors z-10">
                        <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-default-100 dark:border-default-50/10">Export ID</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-default-100 dark:border-default-50/10">Date</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-default-100 dark:border-default-50/10">Format</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-default-100 dark:border-default-50/10">Status</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-default-100 dark:border-default-50/10 text-right">Size</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-default-100 dark:border-default-50/10 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-default-100 dark:divide-default-50/10">
                    {exports.map((exp) => {
                        const status = getStatusConfig(exp.status);
                        return (
                            <tr key={exp.id} className="hover:bg-default-50/30 dark:hover:bg-default-100/5 transition-colors group">
                                <td className="px-4 py-4">
                                    <span className="text-xs font-mono font-medium text-foreground">{exp.id}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-foreground">{format(new Date(exp.requestedAt), 'MMM dd, yyyy')}</span>
                                        <span className="text-[10px] text-muted-foreground">{format(new Date(exp.requestedAt), 'HH:mm')}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <Chip size="sm" variant="soft" className="uppercase font-bold text-[9px]">
                                        {exp.format}
                                    </Chip>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        <Icon icon={status.icon} className={`size-3.5 text-${status.color}`} />
                                        <span className={`text-[11px] font-bold text-${status.color}`}>
                                            {status.label}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <span className="text-xs text-muted-foreground">{formatFileSize(exp.fileSize)}</span>
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        {exp.status === 'ready' && (
                                            <Button
                                                isIconOnly
                                                variant="ghost"
                                                size="sm"
                                                onPress={() => onDownload(exp.id)}
                                                aria-label="Download export"
                                                className="text-accent hover:bg-accent/10"
                                            >
                                                <Icon icon="gravity-ui:download" className="size-4" />
                                            </Button>
                                        )}
                                        <Button
                                            isIconOnly
                                            variant="ghost"
                                            size="sm"
                                            onPress={() => onDelete(exp.id)}
                                            aria-label="Delete export record"
                                            className="text-muted-foreground hover:text-danger hover:bg-danger/10"
                                        >
                                            <Icon icon="gravity-ui:trash-bin" className="size-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
