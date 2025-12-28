import { Modal, Button, TextField, RadioGroup, Radio, Label, Description, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useDevelopers } from '@/hooks/useDevelopers';
import type { ApiKey, ApiKeyPermission } from '@/types/developers';

interface CreateApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: { apiKey: ApiKey; secretKey: string }) => void;
}

export function CreateApiKeyModal({ isOpen, onClose, onSuccess }: CreateApiKeyModalProps) {
    const { createApiKey, isLoading } = useDevelopers();
    const [name, setName] = useState('');
    const [permission, setPermission] = useState<ApiKeyPermission>('full');

    const handleCreate = async () => {
        if (!name.trim()) return;

        const response = await createApiKey({
            name,
            permission,
            expiresAt: null,
            rateLimit: null
        });

        onSuccess(response);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop variant="blur" className="p-4">
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-[500px] rounded-3xl">
                        <Modal.CloseTrigger className="right-4 top-4" />
                        <Modal.Header className="flex flex-col gap-1 pb-2">
                            <Modal.Icon className="bg-accent-soft text-accent">
                                <Icon icon="gravity-ui:key" className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-2xl font-bold">Create API Key</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="space-y-8 py-6">
                            <div className="px-1">
                                <TextField className="w-full" value={name} onChange={setName}>
                                    <Label className="text-sm font-semibold mb-2 block text-foreground">Name</Label>
                                    <Input
                                        placeholder="e.g., Production Server"
                                        autoFocus
                                        className="bg-default-50 border-default-200 focus:border-accent transition-all rounded-xl px-4 py-3"
                                    />
                                    <Description className="text-sm text-muted-foreground mt-2">
                                        Give your key a descriptive name to help identify it later.
                                    </Description>
                                </TextField>
                            </div>

                            <RadioGroup
                                value={permission}
                                onChange={(val) => setPermission(val as ApiKeyPermission)}
                                className="space-y-4"
                            >
                                <Label className="text-sm font-semibold mb-3 block text-foreground">Permissions</Label>
                                <div className="space-y-3">
                                    <Radio value="full" className="w-full">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        <Radio.Content>
                                            <Label className="font-semibold">Full Access</Label>
                                            <Description className="text-xs text-muted-foreground">Read and write all resources</Description>
                                        </Radio.Content>
                                    </Radio>
                                    <Radio value="read-only" className="w-full">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        <Radio.Content>
                                            <Label className="font-semibold">Read Only</Label>
                                            <Description className="text-xs text-muted-foreground">View resources only (GET requests)</Description>
                                        </Radio.Content>
                                    </Radio>
                                    <Radio value="write-only" className="w-full">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        <Radio.Content>
                                            <Label className="font-semibold">Write Only</Label>
                                            <Description className="text-xs text-muted-foreground">Create/Update only (POST/PUT requests)</Description>
                                        </Radio.Content>
                                    </Radio>
                                </div>
                            </RadioGroup>
                        </Modal.Body>

                        <Modal.Footer className="border-t border-divider pt-4 pb-6 px-6 flex justify-end gap-3">
                            <Button variant="tertiary" onPress={onClose} isDisabled={isLoading}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={handleCreate}
                                isPending={isLoading}
                                isDisabled={!name.trim()}
                                className="rounded-full px-8 font-medium"
                            >
                                Create API Key
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}

export default CreateApiKeyModal;
