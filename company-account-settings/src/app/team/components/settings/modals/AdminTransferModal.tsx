import { useState } from 'react';
import {
    Modal,
    Button,
    TextField,
    Select,
    ListBox,
    Label,
    Checkbox,
    Alert,
    Avatar,
    Input,
    Description
} from '@heroui/react';
import { Icon } from '@iconify/react';
import type { AdminTransferRequest } from '@/types/settings';
import { MOCK_MEMBERS } from '@/data/mock-team';

interface AdminTransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (request: AdminTransferRequest) => Promise<void>;
}

/**
 * AdminTransferModal Component
 * 
 * @description A secure modal for transferring workspace ownership.
 * Implements multiple safety checks: member selection, password verification, and explicit acknowledgement.
 */
export function AdminTransferModal({ isOpen, onClose, onSubmit }: AdminTransferModalProps) {
    const [targetUserId, setTargetUserId] = useState<string>('');
    const [password, setPassword] = useState('');
    const [confirmationText, setConfirmationText] = useState('');
    const [isAcknowledged, setIsAcknowledged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const activeMembers = MOCK_MEMBERS.filter(m => m.status === 'active' && !m.isAdmin);

    const handleSubmit = async () => {
        if (!targetUserId || !password || confirmationText !== 'TRANSFER ADMIN' || !isAcknowledged) return;

        setIsSubmitting(true);
        try {
            await onSubmit({
                targetUserId,
                currentPassword: password,
                confirmationText
            });
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const isValid = targetUserId &&
        password.length >= 8 &&
        confirmationText === 'TRANSFER ADMIN' &&
        isAcknowledged;

    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Heading>Transfer Admin Rights</Modal.Heading>
                            <Description className="text-sm text-default-500">
                                Move workspace ownership to another team member
                            </Description>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="space-y-6">
                                <Alert status="danger" className="rounded-xl">
                                    <Alert.Indicator>
                                        <Icon icon="gravity-ui:triangle-exclamation" />
                                    </Alert.Indicator>
                                    <Alert.Content>
                                        <Alert.Title className="text-sm font-bold">Irreversible Action</Alert.Title>
                                        <Alert.Description className="text-xs leading-relaxed">
                                            Once transferred, you will lose all administrative control over this workspace.
                                            Only the new admin will be able to manage billing, members, and team settings.
                                        </Alert.Description>
                                    </Alert.Content>
                                </Alert>

                                {/* Member Selection */}
                                <div className="space-y-2">
                                    <Select
                                        className="w-full"
                                    >
                                        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                                            New Administrator
                                        </Label>
                                        <Select.Trigger>
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox
                                                items={activeMembers}
                                                onSelectionChange={(keys) => {
                                                    const key = Array.from(keys)[0];
                                                    if (key) setTargetUserId(key.toString());
                                                }}
                                            >
                                                {(member) => (
                                                    <ListBox.Item id={member.id} textValue={member.name}>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar size="sm">
                                                                <Avatar.Image src={member.avatar} />
                                                                <Avatar.Fallback>{member.name.charAt(0)}</Avatar.Fallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-medium">{member.name}</span>
                                                                <span className="text-xs text-muted-foreground">{member.email}</span>
                                                            </div>
                                                        </div>
                                                    </ListBox.Item>
                                                )}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                {/* Confirmation Text */}
                                <TextField
                                    value={confirmationText}
                                    onChange={setConfirmationText}
                                    className="w-full"
                                >
                                    <Label>Confirmation Text</Label>
                                    <Input placeholder="TRANSFER ADMIN" />
                                    <Description>Please type 'TRANSFER ADMIN' to confirm your intent</Description>
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
                                        I understand that I am permanently transferring workspace ownership and this action cannot be undone.
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
                                    Confirm Transfer
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
