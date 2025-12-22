import { useState } from 'react';
import { Modal, Button, TextField, Label, Input, ListBox, Tabs, ComboBox, Description } from "@heroui/react";
import { PermissionsMatrix } from "../PermissionsMatrix";
import type { FeatureArea, PermissionLevel } from "../../../types/team";

interface InviteMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: InviteFormData) => Promise<void>;
}

export interface InviteFormData {
    mode: 'invite' | 'create';
    email: string;
    name?: string;
    role: string;
    customRoleName?: string;
    permissions: Record<FeatureArea, PermissionLevel>;
}

const DEFAULT_PERMISSIONS: Record<FeatureArea, PermissionLevel> = {
    media: 'read',
    studio: 'read',
    orders: 'read',
    batch: 'none',
    analytics: 'none',
    team: 'none',
    billing: 'none',
    settings: 'none',
    api: 'none',
};

export function InviteMemberModal({ isOpen, onClose, onSubmit }: InviteMemberModalProps) {
    const [mode, setMode] = useState<'invite' | 'create'>('invite');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [roleInput, setRoleInput] = useState('Developer');
    const [selectedRole, setSelectedRole] = useState<string | number | null>('developer');
    const [permissions, setPermissions] = useState<Record<FeatureArea, PermissionLevel>>(DEFAULT_PERMISSIONS);

    const ROLE_LABELS: Record<string, string> = {
        'account-manager': 'Account Manager',
        'developer': 'Developer',
        'sales': 'Sales'
    };
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onSubmit({
                mode,
                email,
                name: mode === 'create' ? name : undefined,
                role: selectedRole ? (selectedRole as string) : 'custom',
                customRoleName: selectedRole ? undefined : roleInput,
                permissions,
            });
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="bg-surface-1/80 backdrop-blur-xl border border-separator">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Add Member</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="space-y-6">
                            {/* Mode Toggle via Tabs */}
                            <Tabs
                                selectedKey={mode}
                                onSelectionChange={(key) => setMode(key as 'invite' | 'create')}
                                className="w-full"
                            >
                                <Tabs.List className="w-full">
                                    <Tabs.Tab id="invite">
                                        <span className="w-full text-center">Invite by Email</span>
                                        <Tabs.Indicator />
                                    </Tabs.Tab>
                                    <Tabs.Tab id="create">
                                        <span className="w-full text-center">Create Account</span>
                                        <Tabs.Indicator />
                                    </Tabs.Tab>
                                </Tabs.List>
                            </Tabs>

                            {/* Email */}
                            <TextField isRequired>
                                <Label>Email Address</Label>
                                <Input
                                    type="email"
                                    placeholder="sarah@company.com"
                                    value={email}
                                    onChange={(e: any) => setEmail(e.target.value)}
                                />
                            </TextField>

                            {/* Name (only for create mode) */}
                            {mode === 'create' && (
                                <TextField isRequired>
                                    <Label>Full Name</Label>
                                    <Input
                                        placeholder="Sarah Johnson"
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                    />
                                </TextField>
                            )}

                            {/* Role */}
                            <ComboBox
                                className="w-full"
                                allowsCustomValue
                                inputValue={roleInput}
                                onInputChange={setRoleInput}
                                selectedKey={selectedRole}
                                onSelectionChange={(k) => {
                                    setSelectedRole(k);
                                    if (k && ROLE_LABELS[k as string]) {
                                        setRoleInput(ROLE_LABELS[k as string]);
                                    }
                                }}
                            >
                                <Label>Role</Label>
                                <ComboBox.InputGroup>
                                    <Input placeholder="Select or type a role" />
                                    <ComboBox.Trigger />
                                </ComboBox.InputGroup>
                                <Description>You can type any role name, even if it's not in the list</Description>
                                <ComboBox.Popover>
                                    <ListBox>
                                        <ListBox.Item id="account-manager" textValue="Account Manager">
                                            Account Manager
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="developer" textValue="Developer">
                                            Developer
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="sales" textValue="Sales">
                                            Sales
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </ComboBox.Popover>
                            </ComboBox>

                            {/* Permissions */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-foreground">Initial Permissions</h4>
                                </div>

                                <PermissionsMatrix
                                    permissions={permissions}
                                    onChange={setPermissions}
                                />
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="ghost" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onPress={handleSubmit}
                                isDisabled={!email || (mode === 'create' && !name) || isSubmitting}
                            >
                                {mode === 'invite' ? 'Send Invitation' : 'Create Account'}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
