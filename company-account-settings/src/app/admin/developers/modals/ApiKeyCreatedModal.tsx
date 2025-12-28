import { Modal, Button, TextField, Alert, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import type { ApiKey } from '@/types/developers';

interface ApiKeyCreatedModalProps {
    isOpen: boolean;
    onClose: () => void;
    apiKey: ApiKey;
    secretKey: string;
}

export function ApiKeyCreatedModal({ isOpen, onClose, apiKey, secretKey }: ApiKeyCreatedModalProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(secretKey);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => !open && onClose()}
        >
            <Modal.Backdrop variant="blur" className="p-4">
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-[550px] rounded-3xl">
                        <Modal.Header className="flex flex-col gap-1 pb-2">
                            <Modal.Icon className="bg-success-soft text-success">
                                <Icon icon="gravity-ui:circle-check" className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-2xl font-bold">API Key Created</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="space-y-6 py-6">
                            <Alert status="warning" className="bg-warning-soft border-none text-warning-soft-foreground rounded-2xl p-4">
                                <Alert.Indicator>
                                    <Icon icon="gravity-ui:triangle-exclamation" className="size-5" />
                                </Alert.Indicator>
                                <Alert.Content>
                                    <Alert.Title className="font-bold">Copy your secret key now</Alert.Title>
                                    <Alert.Description>
                                        You won't be able to see it again. If you lose it, you'll need to create a new key for {apiKey.name}.
                                    </Alert.Description>
                                </Alert.Content>
                            </Alert>

                            <div className="space-y-3 px-1">
                                <label className="text-sm font-semibold text-foreground">Secret Key</label>
                                <div className="relative group">
                                    <TextField className="w-full">
                                        <Input
                                            readOnly
                                            value={secretKey}
                                            className="font-mono text-sm bg-default-50 border-default-200 focus:border-accent transition-all rounded-xl pl-4 pr-12 py-3 select-all"
                                        />
                                    </TextField>
                                    <Button
                                        isIconOnly
                                        variant="ghost"
                                        onPress={handleCopy}
                                        className="absolute right-1.5 top-1/2 -translate-y-1/2 size-9 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent-soft transition-colors"
                                    >
                                        <Icon icon={isCopied ? "gravity-ui:check" : "gravity-ui:copy"} className="size-5" />
                                    </Button>
                                </div>
                                {isCopied && (
                                    <p className="text-xs text-success font-medium flex items-center gap-1.5 ml-1 animate-in fade-in slide-in-from-top-1">
                                        <Icon icon="gravity-ui:circle-check" className="size-3.5" /> Key copied to clipboard
                                    </p>
                                )}
                            </div>
                        </Modal.Body>

                        <Modal.Footer className="pt-4 pb-6 px-6">
                            <Button
                                variant="primary"
                                onPress={onClose}
                                className="w-full rounded-full h-12 font-bold shadow-lg shadow-accent/20"
                            >
                                Done
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}

export default ApiKeyCreatedModal;
