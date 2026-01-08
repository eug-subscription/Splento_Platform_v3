import { Modal, Button, Avatar, Chip, Tabs, TextField, Label, Input, InputGroup, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { PermissionsMatrix } from "@/app/team/components/PermissionsMatrix";
import type { Member, FeatureArea, PermissionLevel } from "@/types/team";

interface MemberProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    member: Member | null;
    onUpdatePermissions?: (permissions: Record<FeatureArea, PermissionLevel>) => void;
}

export function MemberProfileModal({ isOpen, onClose, member, onUpdatePermissions }: MemberProfileModalProps) {
    const [isCopied, setIsCopied] = useState(false);
    const [localPermissions, setLocalPermissions] = useState<Record<FeatureArea, PermissionLevel> | null>(null);

    // Initialize local permissions when member changes
    useEffect(() => {
        if (member) {
            const handle = requestAnimationFrame(() => {
                setLocalPermissions({ ...member.permissions });
            });
            return () => cancelAnimationFrame(handle);
        }
    }, [member]);

    if (!member || !localPermissions) return null;

    const handlePermissionsChange = (newPermissions: Record<FeatureArea, PermissionLevel>) => {
        setLocalPermissions(newPermissions);
        onUpdatePermissions?.(newPermissions);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(member.id);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="w-[56rem] max-w-[95vw] h-[700px] flex flex-col rounded-3xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="sr-only">Member Profile: {member.name}</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-0 flex flex-col flex-1 min-h-0">
                            {/* Header Section */}
                            <div className="p-6 border-b border-default-200">
                                <div className="flex items-start gap-4">
                                    <Avatar className="w-20 h-20 text-large">
                                        <Avatar.Image src={member.avatar} alt={member.name} />
                                        <Avatar.Fallback>{member.name.charAt(0)}</Avatar.Fallback>
                                    </Avatar>
                                    <div className="flex-1 pt-1">
                                        <h2 className="text-2xl font-bold">{member.name}</h2>
                                        <p className="text-default-500 mb-3">{member.email}</p>
                                        <div className="flex gap-2">
                                            <Chip size="sm" variant="soft" className="bg-default-100 text-default-700 px-3">
                                                {member.role === 'Custom' ? member.customRoleName : member.role}
                                            </Chip>
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                className={
                                                    member.status === 'active' ? 'bg-success/10 text-success px-3' :
                                                        member.status === 'suspended' ? 'bg-danger/10 text-danger px-3' :
                                                            'bg-default-200 text-default-500 px-3'
                                                }
                                            >
                                                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                                            </Chip>
                                            {member.twoFactorEnabled && (
                                                <Chip size="sm" variant="soft" className="bg-success/10 text-success px-3">
                                                    2FA Enabled
                                                </Chip>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs & Content */}
                            <div className="flex-1 flex flex-col min-h-0">
                                <Tabs aria-label="Member details">
                                    <Tabs.ListContainer className="w-full px-6 pt-2">
                                        <Tabs.List>
                                            <Tabs.Tab id="details">
                                                Details
                                                <Tabs.Indicator />
                                            </Tabs.Tab>
                                            <Tabs.Tab id="activity">
                                                Activity
                                                <Tabs.Indicator />
                                            </Tabs.Tab>
                                            <Tabs.Tab id="usage">
                                                Usage
                                                <Tabs.Indicator />
                                            </Tabs.Tab>
                                            <Tabs.Tab id="permissions">
                                                Permissions
                                                <Tabs.Indicator />
                                            </Tabs.Tab>
                                        </Tabs.List>
                                    </Tabs.ListContainer>

                                    <Tabs.Panel id="details" className="p-0 flex-1 overflow-y-auto">
                                        <div className="p-6 grid grid-cols-2 gap-6">
                                            <TextField isReadOnly>
                                                <Label>Joined Team</Label>
                                                <Input value={member.joinedAt} />
                                            </TextField>
                                            <TextField isReadOnly>
                                                <Label>Last Active</Label>
                                                <Input value={member.lastActiveAt} />
                                            </TextField>
                                            <TextField isReadOnly>
                                                <Label>Active Sessions</Label>
                                                <Input value={`${member.activeSessions} devices`} />
                                            </TextField>
                                            <TextField isReadOnly>
                                                <Label>Assets Created</Label>
                                                <Input value={member.assetsCreated.toString()} />
                                            </TextField>
                                        </div>
                                        <div className="px-6 pb-6">
                                            <TextField isReadOnly>
                                                <Label>Reference ID</Label>
                                                <InputGroup>
                                                    <InputGroup.Input value={member.id} />
                                                    <InputGroup.Suffix>
                                                        <Tooltip>
                                                            <Tooltip.Trigger>
                                                                <Button
                                                                    size="sm"
                                                                    isIconOnly
                                                                    variant="ghost"
                                                                    onPress={handleCopy}
                                                                >
                                                                    <Icon
                                                                        icon={isCopied ? "gravity-ui:check" : "gravity-ui:copy"}
                                                                        className={isCopied ? "text-success" : "text-default-500"}
                                                                    />
                                                                </Button>
                                                            </Tooltip.Trigger>
                                                            <Tooltip.Content>
                                                                {isCopied ? "Copied!" : "Copy Reference ID"}
                                                            </Tooltip.Content>
                                                        </Tooltip>
                                                    </InputGroup.Suffix>
                                                </InputGroup>
                                            </TextField>
                                        </div>
                                    </Tabs.Panel>

                                    <Tabs.Panel id="activity" className="p-6">
                                        <div className="flex flex-col items-center justify-center h-40 text-default-400">
                                            <Icon icon="gravity-ui:clock-arrow-rotate-left" className="text-4xl mb-2 opacity-50" />
                                            <p>No recent activity</p>
                                        </div>
                                    </Tabs.Panel>

                                    <Tabs.Panel id="usage" className="p-6">
                                        <div className="flex flex-col items-center justify-center h-40 text-default-400">
                                            <Icon icon="gravity-ui:chart-mixed" className="text-4xl mb-2 opacity-50" />
                                            <p>Usage data not available</p>
                                        </div>
                                    </Tabs.Panel>

                                    <Tabs.Panel id="permissions" className="p-6 overflow-y-auto">
                                        <div className="mb-4 flex items-center justify-between">
                                            <p className="text-sm text-default-500">
                                                Access levels for platform features. Changes apply immediately.
                                            </p>
                                            <Button size="sm" variant="ghost">Reset to Role Default</Button>
                                        </div>
                                        <PermissionsMatrix
                                            permissions={localPermissions}
                                            onChange={handlePermissionsChange}
                                        />
                                    </Tabs.Panel>
                                </Tabs>
                            </div>

                            {/* Footer Actions */}
                        </Modal.Body>
                        <Modal.Footer className="p-4 border-t border-default-200 flex justify-end gap-2">
                            <Button variant="secondary">
                                Reset Password
                            </Button>
                            <Button variant="danger">
                                Remove Member
                            </Button>
                            <Button variant="primary" onPress={onClose}>
                                Done
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
