import { Card, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { ExportHistoryTable } from './ExportHistoryTable';
import { useModal } from '@/hooks/useModal';
import type { DataExport, DataExportRequest } from '@/types/settings';

interface DataManagementSectionProps {
    exports: DataExport[];
    onRequestExport: (request: DataExportRequest) => Promise<void>;
    onDownload: (exportId: string) => void;
    onDelete: (exportId: string) => void;
}

export function DataManagementSection({ exports, onRequestExport, onDownload, onDelete }: DataManagementSectionProps) {
    const { openModal } = useModal();

    return (
        <Card>
            <Card.Header className="flex flex-row items-center justify-between pb-3">
                <div>
                    <Card.Title className="text-base font-semibold">Data Management</Card.Title>
                    <Card.Description className="text-sm text-default-500">
                        Export your team's historical data for backup or audit purposes
                    </Card.Description>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onPress={() => openModal('request_data_export', { onSubmit: onRequestExport })}
                    className="font-bold gap-2"
                >
                    <Icon icon="gravity-ui:file-arrow-down" className="size-4" />
                    Request Export
                </Button>
            </Card.Header>

            <Card.Content className="space-y-6">
                <ExportHistoryTable
                    exports={exports}
                    onDownload={onDownload}
                    onDelete={onDelete}
                />

                <div className="flex items-center gap-3 p-4 bg-default-50/50 dark:bg-default-100/10 rounded-2xl border border-default-100 dark:border-default-50/10">
                    <div className="size-8 rounded-lg bg-info/10 text-info flex items-center justify-center flex-shrink-0">
                        <Icon icon="gravity-ui:shield-check" className="size-4" />
                    </div>
                    <div className="flex-1">
                        <h5 className="text-[11px] font-bold text-foreground">Data Privacy & Retention</h5>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            Exported files are encrypted and automatically deleted after 7 days. Ensure you download and store them securely.
                        </p>
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
