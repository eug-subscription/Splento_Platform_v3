import { Button, Alert, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useDevelopers } from '@/hooks/useDevelopers';
import { ApiKeyRow } from '@/components/developers/ApiKeyRow';
import { EmptyState } from '@/components/developers/EmptyState';
import { useState, lazy, Suspense } from 'react';
import type { ApiKey } from '@/types/developers';

const CreateApiKeyModal = lazy(() => import('./modals/CreateApiKeyModal'));
const RevokeApiKeyModal = lazy(() => import('./modals/RevokeApiKeyModal'));
const ApiKeyCreatedModal = lazy(() => import('./modals/ApiKeyCreatedModal'));

export function ApiKeysSection() {
    const { apiKeys, isLoading, revokeApiKey } = useDevelopers();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [revokingKeyId, setRevokingKeyId] = useState<string | null>(null);
    const [newKeyData, setNewKeyData] = useState<{ apiKey: ApiKey, secretKey: string } | null>(null);

    const handleKeyCreated = (data: { apiKey: ApiKey; secretKey: string }) => {
        setNewKeyData(data);
        setIsCreateModalOpen(false);
    };

    if (isLoading && apiKeys.length === 0) {
        return (
            <div className="flex justify-center p-12">
                <Spinner size="lg" />
            </div>
        );
    }

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
                    onPress={() => setIsCreateModalOpen(true)}
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
                    onAction={() => setIsCreateModalOpen(true)}
                />
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {apiKeys.map((apiKey) => (
                        <ApiKeyRow
                            key={apiKey.id}
                            apiKey={apiKey}
                            onRevoke={() => setRevokingKeyId(apiKey.id)}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            <Suspense fallback={null}>
                {isCreateModalOpen && (
                    <CreateApiKeyModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        onSuccess={handleKeyCreated}
                    />
                )}

                {revokingKeyId && (
                    <RevokeApiKeyModal
                        isOpen={!!revokingKeyId}
                        onClose={() => setRevokingKeyId(null)}
                        onConfirm={async () => {
                            await revokeApiKey(revokingKeyId);
                            setRevokingKeyId(null);
                        }}
                    />
                )}

                {newKeyData && (
                    <ApiKeyCreatedModal
                        isOpen={!!newKeyData}
                        onClose={() => setNewKeyData(null)}
                        apiKey={newKeyData.apiKey}
                        secretKey={newKeyData.secretKey}
                    />
                )}
            </Suspense>
        </div>
    );
}
