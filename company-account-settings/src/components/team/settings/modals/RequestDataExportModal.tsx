import { useState } from 'react';
import {
    Modal,
    Button,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    Label,
    Description,
    Alert
} from '@heroui/react';
import { Icon } from '@iconify/react';
import type { DataExportRequest, ExportFormat, DataScope } from '@/types/settings';
import { DATA_SCOPES } from '@/data/settings-constants';

interface RequestDataExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (request: DataExportRequest) => Promise<void>;
}

export function RequestDataExportModal({ isOpen, onClose, onSubmit }: RequestDataExportModalProps) {
    const [format, setFormat] = useState<ExportFormat>('json');
    const [scopes, setScopes] = useState<DataScope[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSelectAll = () => {
        if (scopes.length === DATA_SCOPES.length) {
            setScopes([]);
        } else {
            setScopes(DATA_SCOPES.map(s => s.value));
        }
    };

    const handleSubmit = async () => {
        if (scopes.length === 0) return;

        setIsSubmitting(true);
        try {
            await onSubmit({ format, dataScopes: scopes });
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="max-w-2xl rounded-3xl border border-separator">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon>
                                <div className="size-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                                    <Icon icon="gravity-ui:file-arrow-down" className="size-5" />
                                </div>
                            </Modal.Icon>
                            <Modal.Heading>Request Data Export</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="space-y-8 py-4 text-left">
                            <Alert status="accent" className="bg-default-100 dark:bg-default-100/10 border-default-200">
                                <Alert.Indicator>
                                    <Icon icon="gravity-ui:circle-info" />
                                </Alert.Indicator>
                                <Alert.Content>
                                    <Alert.Title>Processing Time</Alert.Title>
                                    <Alert.Description>
                                        Exports take 2-5 minutes to process. We'll add a record to your history once it's ready for download. Exports expire after 7 days.
                                    </Alert.Description>
                                </Alert.Content>
                            </Alert>

                            {/* Format Selection */}
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <Label className="text-[13px] font-bold text-foreground">Export Format</Label>
                                    <Description className="text-xs text-muted-foreground/70">Choose how you want your data to be structured</Description>
                                </div>

                                <RadioGroup
                                    value={format}
                                    onChange={(val) => setFormat(val as ExportFormat)}
                                    className="grid grid-cols-2 gap-3"
                                >
                                    <Radio value="json" className="flex-1 p-3 rounded-xl border border-default-100 hover:border-accent/40 data-[selected=true]:border-accent bg-default-50/50 cursor-pointer transition-all">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        <Radio.Content>
                                            <Label className="text-sm font-bold leading-none cursor-pointer">JSON</Label>
                                            <Description className="text-[10px]">Developer friendly, high fidelity</Description>
                                        </Radio.Content>
                                    </Radio>
                                    <Radio value="csv" className="flex-1 p-3 rounded-xl border border-default-100 hover:border-accent/40 data-[selected=true]:border-accent bg-default-50/50 cursor-pointer transition-all">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        <Radio.Content>
                                            <Label className="text-sm font-bold leading-none cursor-pointer">CSV</Label>
                                            <Description className="text-[10px]">Spreadsheet compatible (Excel, Sheets)</Description>
                                        </Radio.Content>
                                    </Radio>
                                </RadioGroup>
                            </div>

                            {/* Scope Selection */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <Label className="text-[13px] font-bold text-foreground">Data Scopes</Label>
                                        <Description className="text-xs text-muted-foreground/70">Select which modules to include in the export</Description>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onPress={handleSelectAll}
                                        className="h-8 text-[10px] font-bold uppercase tracking-wider text-accent border-accent/20 hover:bg-accent/5"
                                    >
                                        {scopes.length === DATA_SCOPES.length ? 'Deselect All' : 'Select All'}
                                    </Button>
                                </div>

                                <CheckboxGroup
                                    value={scopes}
                                    onChange={(val) => setScopes(val as DataScope[])}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                                >
                                    {DATA_SCOPES.map((scope) => (
                                        <Checkbox
                                            key={scope.value}
                                            value={scope.value}
                                            className="group p-3 rounded-xl border border-default-100 hover:border-accent/40 data-[selected=true]:border-accent bg-default-50/50 cursor-pointer transition-all"
                                        >
                                            <Checkbox.Control>
                                                <Checkbox.Indicator />
                                            </Checkbox.Control>
                                            <Checkbox.Content>
                                                <Label className="text-sm font-bold leading-none cursor-pointer">{scope.label}</Label>
                                                <Description className="text-[10px]">{scope.description}</Description>
                                            </Checkbox.Content>
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </div>
                        </Modal.Body>

                        <Modal.Footer className="pt-4 border-t border-default-100 dark:border-default-50/10">
                            <Button variant="ghost" onPress={onClose} isDisabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={handleSubmit}
                                isPending={isSubmitting}
                                isDisabled={scopes.length === 0}
                                className="px-8"
                            >
                                Request Export
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
