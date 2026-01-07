import { Button, Alert, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useDevelopers } from '@/hooks/useDevelopers';
import { ApiKeyRow } from '@/components/developers/ApiKeyRow';
import { EmptyState } from '@/components/developers/EmptyState';
import { useModal } from '@/hooks/useModal';
import type { ApiKey } from '@/types/developers';
import type { ApiKeyCreatedModalData } from '@/types/modals';

export function ApiKeysSection() {
    const { apiKeys, isLoading, revokeApiKey } = useDevelopers();
    const { openModal, closeModal } = useModal();

    if (isLoading && apiKeys.length === 0) {
        return (
            <div className="flex justify-center p-12">
                <Spinner size="lg" />
            </div>
        );
    }

    const handleCreateClick = () => {
        openModal('create_api_key', {
            onSuccess: (data: ApiKeyCreatedModalData) => openModal('api_key_created', data)
        });
    };

    const handleRevokeClick = (apiKey: ApiKey) => {
        openModal('revoke_api_key', {
            apiKey,
            onConfirm: async () => {
                await revokeApiKey(apiKey.id);
                closeModal();
            }
        });
    };

    return (
        <div className="space-y-6">
            <Alert status="warning" className="bg-warning-soft border-none text-warning-soft-foreground rounded-2xl p-4">
                <Alert.Indicator>
                    <Icon icon="gravity-ui:triangle-exclamation" className="size-5" />
                </Alert.Indicator>
                <Alert.Content>
                    <Alert.Title className="font-bold">Secret keys are only shown once</Alert.Title>
                    <Alert.Description>
                        Store them securely and never commit them to version control. If you lose a key, you'll need to revoke it and create a new one.
                    </Alert.Description>
                </Alert.Content>
            </Alert>

            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold">API Keys</h3>
                    <p className="text-muted-foreground text-sm">Manage your secret keys to access the Splento API.</p>
                </div>
                <Button
                    variant="primary"
                    onPress={handleCreateClick}
                    className="rounded-full px-6 font-medium shadow-lg shadow-accent/20"
                >
                    <Icon icon="gravity-ui:plus" className="size-4 mr-2" />
                    Create API Key
                </Button>
            </div>

            {apiKeys.length === 0 ? (
                <EmptyState
                    icon="gravity-ui:key"
                    title="No API keys created yet"
                    description="API keys allow external applications to access your Splento account programmatically."
                    actionLabel="Create your first API key"
                    onAction={handleCreateClick}
                />
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {apiKeys.map((apiKey) => (
                        <ApiKeyRow
                            key={apiKey.id}
                            apiKey={apiKey}
                            onRevoke={() => handleRevokeClick(apiKey)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
