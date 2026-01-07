import { useState } from 'react';
import {
    Modal,
    Button,
    TextField,
    Checkbox,
    Alert,
    Label,
    Description,
    Input
} from '@heroui/react';
import { Icon } from '@iconify/react';
import type { TeamSettings, TeamDeletionRequest, TeamDeletionImpact } from '@/types/settings';

interface DeleteTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    team: TeamSettings;
    impact: TeamDeletionImpact;
    onSubmit: (request: TeamDeletionRequest) => Promise<void>;
}

/**
 * DeleteTeamModal Component
 * 
 * @description The final safety gate before team deletion.
 * Implements strict verification: team name matching, password entry, and impact summary.
 */
export function DeleteTeamModal({ isOpen, onClose, team, impact, onSubmit }: DeleteTeamModalProps) {
    const [nameConfirmation, setNameConfirmation] = useState('');
    const [password, setPassword] = useState('');
    const [isAcknowledged, setIsAcknowledged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (nameConfirmation !== team.name || !password || !isAcknowledged) return;

        setIsSubmitting(true);
        try {
            await onSubmit({
                teamNameConfirmation: nameConfirmation,
                currentPassword: password,
                acknowledged: isAcknowledged
            });
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const isValid = nameConfirmation === team.name &&
        password.length >= 8 &&
        isAcknowledged;

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Heading className="text-danger">Delete Workspace</Modal.Heading>
                            <Description className="text-sm text-default-500">
                                This action will permanently delete the <strong>{team.name}</strong> workspace.
                            </Description>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="space-y-6">
                                <Alert status="danger" className="rounded-xl">
                                    <Alert.Indicator>
                                        <Icon icon="gravity-ui:triangle-exclamation" />
                                    </Alert.Indicator>
                                    <Alert.Content>
                                        <Alert.Title className="text-sm font-bold">Destructive Action</Alert.Title>
                                        <Alert.Description className="text-xs leading-relaxed">
                                            You are about to delete this team and all its data. This cannot be undone.
                                            <ul className="list-disc list-inside mt-2 space-y-1 opacity-80">
                                                <li>{impact.memberCount} members will lose access</li>
                                                <li>{impact.assetCount} assets will be permanently deleted</li>
                                                <li>Estimated data to be removed: {impact.estimatedDataSize}</li>
                                                {impact.activeSubscription && <li>Active subscription will be immediately cancelled</li>}
                                            </ul>
                                        </Alert.Description>
                                    </Alert.Content>
                                </Alert>

                                {/* Team Name Confirmation */}
                                <TextField
                                    value={nameConfirmation}
                                    onChange={setNameConfirmation}
                                    className="w-full"
                                >
                                    <Label>Workspace Name Confirmation</Label>
                                    <Input placeholder={team.name} />
                                    <Description>
                                        Please type <strong>{team.name}</strong> to confirm
                                    </Description>
                                </TextField>

                                {/* Password Verification */}
                                <TextField
                                    type="password"
                                    value={password}
                                    onChange={setPassword}
                                    className="w-full"
                                >
                                    <Label>Current Password</Label>
                                    <Input placeholder="Enter your password" />
                                </TextField>

                                {/* Acknowledgement */}
                                <Checkbox
                                    isSelected={isAcknowledged}
                                    onChange={setIsAcknowledged}
                                    className="items-start"
                                >
                                    <span className="text-xs text-muted-foreground leading-relaxed">
                                        I understand that deleting this workspace is permanent and all associated data will be lost forever.
                                    </span>
                                </Checkbox>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <div className="flex gap-3 w-full sm:justify-end">
                                <Button variant="ghost" onPress={onClose} isDisabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="danger"
                                    onPress={handleSubmit}
                                    isPending={isSubmitting}
                                    isDisabled={!isValid}
                                    className="font-bold gap-2"
                                >
                                    Delete Permanently
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
