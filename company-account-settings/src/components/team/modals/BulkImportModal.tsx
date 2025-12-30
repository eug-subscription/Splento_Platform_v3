import { useState } from 'react';
import { Modal, Button, Alert } from "@heroui/react";
import { Icon } from "@iconify/react";

interface BulkImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (file: File) => Promise<void>;
}

export function BulkImportModal({ isOpen, onClose, onSubmit }: BulkImportModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!file) return;
        setIsSubmitting(true);
        try {
            await onSubmit(file);
            onClose();
            setFile(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="max-w-md rounded-3xl border border-separator">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Bulk Import Members</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="space-y-4">
                            <Alert status="accent">
                                <Alert.Content>
                                    <Alert.Description>
                                        Upload a CSV file with member details. Required columns: email, name, role and permissions
                                    </Alert.Description>
                                </Alert.Content>
                            </Alert>

                            {/* Drag & Drop Zone */}
                            <div
                                className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
                ${isDragging ? 'border-primary bg-primary/5' : 'border-default-200'}
                ${file ? 'border-success bg-success/5' : ''}
                `}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    const droppedFile = e.dataTransfer.files[0];
                                    if (droppedFile?.type === 'text/csv' || droppedFile?.name.endsWith('.csv')) {
                                        setFile(droppedFile);
                                    }
                                }}
                                onClick={() => document.getElementById('csv-upload')?.click()}
                            >
                                {file ? (
                                    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                                        <Icon icon="gravity-ui:file-check" className="size-8 text-success mx-auto" />
                                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onPress={() => setFile(null)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Icon icon="gravity-ui:cloud-arrow-up-in" className="size-8 text-default-400 mx-auto" />
                                        <p className="text-sm text-default-500">
                                            Drop your CSV file here or click to browse
                                        </p>
                                        <input
                                            type="file"
                                            accept=".csv"
                                            className="hidden"
                                            id="csv-upload"
                                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        />
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                document.getElementById('csv-upload')?.click();
                                            }}
                                        >
                                            Choose File
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <Button variant="ghost" size="sm" className="text-primary w-full justify-start">
                                <Icon icon="gravity-ui:arrow-down-to-line" className="size-4 mr-2" />
                                Download Template CSV
                            </Button>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="ghost" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={handleSubmit}
                                isDisabled={!file || isSubmitting}
                            >
                                Import Members
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
