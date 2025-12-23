import { useState } from 'react';
import { Card, Select, Avatar, Button, AlertDialog, ListBox } from '@heroui/react';
import type { Member } from '../../../types/team';

interface MemberSelectorProps {
    members: Member[];
    selectedMemberId: string | null;
    onMemberChange: (memberId: string) => void;
    hasUnsavedChanges: boolean;
}

export function MemberSelector({
    members,
    selectedMemberId,
    onMemberChange,
    hasUnsavedChanges
}: MemberSelectorProps) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingMemberId, setPendingMemberId] = useState<string | null>(null);

    const selectedMember = members.find(m => m.id === selectedMemberId);

    const handleSelectionChange = (key: string | number | null) => {
        if (!key) return;
        const memberId = String(key);
        if (hasUnsavedChanges && memberId !== selectedMemberId) {
            setPendingMemberId(memberId);
            setShowConfirmDialog(true);
        } else {
            onMemberChange(memberId);
        }
    };

    return (
        <>
            <Card className="mb-6 shadow-sm border-default-100">
                <Card.Content className="p-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
                        Select Member
                    </label>
                    <Select
                        selectedKey={selectedMemberId}
                        onSelectionChange={handleSelectionChange}
                        className="max-w-md"
                        placeholder="Choose a team member..."
                    >
                        <Select.Trigger>
                            <Select.Value>
                                {selectedMember && (
                                    <div className="flex items-center gap-3">
                                        <Avatar size="sm" className="flex-shrink-0">
                                            <Avatar.Image src={selectedMember.avatar} alt={selectedMember.name} />
                                            <Avatar.Fallback />
                                        </Avatar>
                                        <div className="flex flex-col text-left">
                                            <span className="text-sm font-medium">{selectedMember.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {selectedMember.email} · {selectedMember.role}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </Select.Value>
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox items={members}>
                                {(member) => (
                                    <ListBox.Item
                                        id={member.id}
                                        textValue={member.name}
                                    >
                                        <div className="flex items-center gap-3 py-1">
                                            <Avatar size="sm" className="flex-shrink-0">
                                                <Avatar.Image src={member.avatar} alt={member.name} />
                                                <Avatar.Fallback />
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{member.name}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {member.email} · {member.role}
                                                </span>
                                            </div>
                                        </div>
                                    </ListBox.Item>
                                )}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </Card.Content>
            </Card>

            <AlertDialog
                isOpen={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
            >
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            {({ close }) => (
                                <>
                                    <AlertDialog.Header>
                                        <AlertDialog.Icon status="danger" />
                                        <AlertDialog.Heading>Unsaved Changes</AlertDialog.Heading>
                                    </AlertDialog.Header>
                                    <AlertDialog.Body>
                                        <p className="text-sm text-default-500">
                                            You have unsaved permission changes for <strong>{selectedMember?.name}</strong>.
                                            Switching members now will discard these changes.
                                        </p>
                                    </AlertDialog.Body>
                                    <AlertDialog.Footer>
                                        <Button
                                            variant="ghost"
                                            onPress={close}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onPress={() => {
                                                close();
                                                if (pendingMemberId) {
                                                    onMemberChange(pendingMemberId);
                                                }
                                            }}
                                        >
                                            Discard Changes
                                        </Button>
                                    </AlertDialog.Footer>
                                </>
                            )}
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </>
    );
}
