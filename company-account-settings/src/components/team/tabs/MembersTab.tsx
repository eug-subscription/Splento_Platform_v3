import { useState, useEffect, type ChangeEvent } from 'react';
import { Button, Card, TextField, Select, Checkbox, Chip, Avatar, InputGroup, ListBox, Accordion } from "@heroui/react";
import { Icon } from "@iconify/react";

import type { Member, PendingInvite, FeatureArea, PermissionLevel } from "@/types/team";
import type { InviteMemberFormData } from '@/types/modals';
import { formatRelativeTime } from '@/utils/date-utils';
import { MembersTabSkeleton } from './MembersTabSkeleton';
import { useModal } from '@/hooks/useModal';

import { MOCK_MEMBERS, MOCK_PENDING_INVITES } from "@/data/mock-team";

export function MembersTab() {
    const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
    const [invites, setInvites] = useState<PendingInvite[]>(MOCK_PENDING_INVITES);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { openModal, closeModal } = useModal();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <MembersTabSkeleton />;
    }

    // Filtering
    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || member.role.toLowerCase().replace(' ', '-') === roleFilter;
        const matchesStatus = statusFilter === 'all' || member.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    // Handlers
    const handleInviteSubmit = async (data: InviteMemberFormData) => {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newInvite: PendingInvite = {
            id: `inv-${Date.now()}`,
            email: data.email,
            role: data.role === 'custom' ? (data.customRoleName || 'Custom') : data.role.charAt(0).toUpperCase() + data.role.slice(1),
            invitedBy: 'You',
            invitedAt: new Date().toISOString().split('T')[0],
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            daysUntilExpiry: 7
        };
        setInvites(prev => [...prev, newInvite]);
        closeModal();
    };

    const handleBulkImport = async () => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        closeModal();
    };

    const handleUpdatePermissions = (permissions: Record<FeatureArea, PermissionLevel>, memberId: string) => {
        setMembers(members.map(m => m.id === memberId ? { ...m, permissions } : m));
    };

    const handleSelectionChange = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(filteredMembers.map(m => m.id));
        } else {
            setSelectedIds([]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1 px-1">
                <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
                <p className="text-default-500">Manage your team, invite new members, and control their roles and status.</p>
            </div>

            {/* 1. Pending Invitations Section */}
            {invites.length > 0 && (
                <Accordion variant="surface" className="w-full" >
                    <Accordion.Item key="pending" aria-label="Pending Invitations">
                        <Accordion.Heading>
                            <Accordion.Trigger>
                                <div className="flex items-center gap-3">
                                    <Icon icon="gravity-ui:envelope" className="w-5 h-5 text-foreground" />
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-foreground">Pending Invitations</span>
                                        <span className="flex items-center justify-center h-5 min-w-5 px-1.5 text-xs font-medium rounded-full bg-warning/10 text-warning">
                                            {invites.length}
                                        </span>
                                    </div>
                                </div>
                                <Accordion.Indicator />
                            </Accordion.Trigger>
                        </Accordion.Heading>
                        <Accordion.Panel>
                            <Accordion.Body className="p-0">
                                <div className="divide-y divide-default-200">
                                    {invites.map((invite) => (
                                        <div
                                            key={invite.id}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-default-100 flex items-center justify-center">
                                                    <Icon icon="gravity-ui:envelope" className="w-5 h-5 text-default-500" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{invite.email}</p>
                                                    <p className="text-xs text-default-500">
                                                        {invite.role} · Invited by {invite.invitedBy} on {new Date(invite.invitedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                                <div className="text-right">
                                                    <p className={`text-sm ${(invite.daysUntilExpiry || 0) <= 2 ? 'text-warning font-medium' : 'text-default-500'}`}>
                                                        {(invite.daysUntilExpiry || 0) <= 0
                                                            ? 'Expired'
                                                            : `Expires in ${invite.daysUntilExpiry} day${invite.daysUntilExpiry !== 1 ? 's' : ''}`
                                                        }
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm">Resend</Button>
                                                    <Button variant="ghost" size="sm" className="text-danger">Cancel</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Accordion.Body>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            )}

            {/* 2. Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <TextField aria-label="Search members">
                        <InputGroup className="w-full">
                            <InputGroup.Prefix>
                                <Icon icon="gravity-ui:magnifier" className="w-4 h-4 text-default-500" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            />
                        </InputGroup>
                    </TextField>
                </div>

                <div className="flex gap-2">
                    <Select
                        selectedKey={roleFilter}
                        onSelectionChange={(key) => setRoleFilter(key as string)}
                        className="w-40"
                        aria-label="Filter by role"
                        placeholder="Role"
                    >
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="all" textValue="All Roles">All Roles</ListBox.Item>
                                <ListBox.Item id="account-manager" textValue="Account Manager">Account Manager</ListBox.Item>
                                <ListBox.Item id="developer" textValue="Developer">Developer</ListBox.Item>
                                <ListBox.Item id="sales" textValue="Sales">Sales</ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    <Select
                        selectedKey={statusFilter}
                        onSelectionChange={(key) => setStatusFilter(key as string)}
                        className="w-36"
                        aria-label="Filter by status"
                        placeholder="Status"
                    >
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="all" textValue="All Status">All Status</ListBox.Item>
                                <ListBox.Item id="active" textValue="Active">Active</ListBox.Item>
                                <ListBox.Item id="inactive" textValue="Inactive">Inactive</ListBox.Item>
                                <ListBox.Item id="suspended" textValue="Suspended">Suspended</ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                <div className="flex gap-2">
                    <Button variant="secondary" onPress={() => openModal('bulk_import', { onSubmit: handleBulkImport })}>
                        <Icon icon="gravity-ui:file-arrow-up" className="w-4 h-4" />
                        <span className="hidden lg:inline">Bulk Import</span>
                    </Button>
                    <Button variant="primary" onPress={() => openModal('invite_member', { onSubmit: handleInviteSubmit })}>
                        <Icon icon="gravity-ui:person-plus" className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Member</span>
                    </Button>
                </div>
            </div>

            {/* 3. Bulk Actions Bar */}
            {selectedIds.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-foreground ml-2">
                            {selectedIds.length} selected
                        </span>

                        <div className="flex items-center gap-2">
                            <Select className="w-40" aria-label="Change role for selected" placeholder="Change Role">
                                <Select.Trigger>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="account-manager" textValue="Account Manager">Account Manager</ListBox.Item>
                                        <ListBox.Item id="developer" textValue="Developer">Developer</ListBox.Item>
                                        <ListBox.Item id="sales" textValue="Sales">Sales</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <Button variant="ghost" size="sm" className="text-danger">
                                <Icon icon="gravity-ui:trash-bin" className="w-4 h-4 mr-1" />
                                Remove
                            </Button>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onPress={() => setSelectedIds([])}>
                        Clear
                    </Button>
                </div>
            )}

            {/* 4. Members Table */}
            <Card>
                <Card.Content className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-default-200">
                                    <th className="p-4 w-10">
                                        <Checkbox
                                            isSelected={filteredMembers.length > 0 && selectedIds.length === filteredMembers.length}
                                            isIndeterminate={selectedIds.length > 0 && selectedIds.length < filteredMembers.length}
                                            onChange={(isSelected) => handleSelectAll(isSelected)}
                                            aria-label="Select all members"
                                        />
                                    </th>
                                    <th className="p-4 text-left text-sm font-medium text-default-500">Member</th>
                                    <th className="p-4 text-left text-sm font-medium text-default-500">Role</th>
                                    <th className="p-4 text-left text-sm font-medium text-default-500">Status</th>
                                    <th className="p-4 text-center text-sm font-medium text-default-500">2FA</th>
                                    <th className="p-4 text-left text-sm font-medium text-default-500">Last Active</th>
                                    <th className="p-4 w-20"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMembers.map((member) => (
                                    <tr
                                        key={member.id}
                                        role="button"
                                        tabIndex={0}
                                        className="border-b border-default-200 last:border-b-0 hover:bg-default-100/50 cursor-pointer transition-colors outline-none focus-visible:bg-default-100/80"
                                        onClick={() => openModal('member_profile', {
                                            member,
                                            onUpdatePermissions: (perms) => handleUpdatePermissions(perms, member.id)
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                openModal('member_profile', {
                                                    member,
                                                    onUpdatePermissions: (perms) => handleUpdatePermissions(perms, member.id)
                                                });
                                            }
                                        }}
                                    >
                                        <td className="p-4" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                                            <Checkbox
                                                isSelected={selectedIds.includes(member.id)}
                                                onChange={() => handleSelectionChange(member.id)}
                                                aria-label={`Select ${member.name}`}
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-8 h-8 text-small rounded-full">
                                                    <Avatar.Image src={member.avatar} alt={member.name} />
                                                    <Avatar.Fallback className="rounded-full shadow-inner">{member.name.charAt(0)}</Avatar.Fallback>
                                                </Avatar>

                                                <div>
                                                    <p className="text-sm font-medium text-foreground flex items-center gap-2">
                                                        {member.name}
                                                        {member.isAdmin && (
                                                            <Chip size="sm" variant="soft" className="h-5 px-1 text-xs bg-default-200">Admin</Chip>
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-default-500">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Chip size="sm" variant="soft" className="bg-default-100 text-default-700 px-3">
                                                {member.role === 'Custom' ? member.customRoleName : member.role}
                                            </Chip>
                                        </td>
                                        <td className="p-4">
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                color={
                                                    member.status === 'active' ? 'success' :
                                                        member.status === 'suspended' ? 'danger' :
                                                            'default'
                                                }
                                                className={
                                                    member.status === 'active' ? 'bg-success/10 text-success px-3' :
                                                        member.status === 'suspended' ? 'bg-danger/10 text-danger px-3' :
                                                            'bg-default-200 text-default-500 px-3' // inactive
                                                }
                                            >
                                                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                                            </Chip>
                                        </td>
                                        <td className="p-4 text-center">
                                            {member.twoFactorEnabled ? (
                                                <Icon icon="gravity-ui:check" className="w-4 h-4 text-success mx-auto" />
                                            ) : (
                                                <Icon icon="gravity-ui:minus" className="w-4 h-4 text-default-300 mx-auto" />
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-default-500">{formatRelativeTime(member.lastActiveAt)}</span>
                                        </td>
                                        <td className="p-4" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                isIconOnly
                                                aria-label="View Profile"
                                                onPress={() => openModal('member_profile', {
                                                    member,
                                                    onUpdatePermissions: (perms) => handleUpdatePermissions(perms, member.id)
                                                })}
                                            >
                                                <Icon icon="gravity-ui:eye" className="w-4 h-4 text-default-500" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}

                                {filteredMembers.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="p-12 text-center text-default-500">
                                            <p>No members found matching your criteria.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
}
