import { useState, useMemo } from 'react';
import type { MemberSecurityStatus } from "@/types/security";
import { TextField, InputGroup, Select, ListBox, Accordion, Avatar, Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { formatRelativeTime } from "@/utils/date-utils";

interface MemberSecurityTableProps {
    members: MemberSecurityStatus[];
}

export function MemberSecurityTable({ members }: MemberSecurityTableProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter2FA, setFilter2FA] = useState<string>('all');

    const filteredMembers = useMemo(() => {
        return members.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matches2FA = filter2FA === 'all' ||
                (filter2FA === 'enabled' && member.twoFactorStatus === 'enabled') ||
                (filter2FA === 'disabled' && member.twoFactorStatus === 'disabled');
            return matchesSearch && matches2FA;
        });
    }, [members, searchQuery, filter2FA]);

    return (
        <Accordion variant="surface" className="w-full">
            <Accordion.Item key="members" aria-label="Member Security Details">
                <Accordion.Heading>
                    <Accordion.Trigger>
                        <div className="flex items-center gap-3">
                            <Icon icon="gravity-ui:persons" className="w-5 h-5 text-foreground" />
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">Member Security Breakdown</span>
                                <span className="flex items-center justify-center h-5 min-w-5 px-1.5 text-xs font-medium rounded-full bg-default-100 text-default-600">
                                    {members.length}
                                </span>
                            </div>
                        </div>
                        <Accordion.Indicator />
                    </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                    <Accordion.Body className="p-0">
                        <div className="p-4 border-b border-default-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-default/5 overflow-visible">
                            <div className="w-full md:max-w-md">
                                <TextField aria-label="Search members" className="w-full">
                                    <InputGroup>
                                        <InputGroup.Prefix>
                                            <Icon icon="gravity-ui:magnifier" className="w-4 h-4 text-default-400" />
                                        </InputGroup.Prefix>
                                        <InputGroup.Input
                                            placeholder="Search member security..."
                                            value={searchQuery}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                        />
                                    </InputGroup>
                                </TextField>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <Select
                                    selectedKey={filter2FA}
                                    onSelectionChange={(key) => setFilter2FA(key as string)}
                                    className="w-full md:w-40"
                                    aria-label="Filter by 2FA"
                                    placeholder="2FA Status"
                                >
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="all" textValue="All 2FA">All 2FA</ListBox.Item>
                                            <ListBox.Item id="enabled" textValue="Enabled">Enabled</ListBox.Item>
                                            <ListBox.Item id="disabled" textValue="Disabled">Disabled</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                <Button variant="ghost" isIconOnly aria-label="Export security data">
                                    <Icon icon="gravity-ui:arrow-down-to-square" className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-default-100 bg-default/10">
                                        <th className="p-4 text-left text-[10px] font-bold text-default-400 uppercase tracking-widest">Member</th>
                                        <th className="p-4 text-left text-[10px] font-bold text-default-400 uppercase tracking-widest">2FA Status</th>
                                        <th className="p-4 text-left text-[10px] font-bold text-default-400 uppercase tracking-widest">Method</th>
                                        <th className="p-4 text-left text-[10px] font-bold text-default-400 uppercase tracking-widest">Recovery Codes</th>
                                        <th className="p-4 text-left text-[10px] font-bold text-default-400 uppercase tracking-widest">Last Sync</th>
                                        <th className="p-4 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-default-100">
                                    {filteredMembers.map((member) => (
                                        <tr key={member.memberId} className="hover:bg-default/5 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar size="sm" className="w-8 h-8 rounded-full">
                                                        <Avatar.Image src={member.avatar} alt={member.name} />
                                                        <Avatar.Fallback>{member.name.charAt(0)}</Avatar.Fallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-sm font-semibold text-foreground">{member.name}</p>
                                                        <p className="text-xs text-default-400">{member.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Chip
                                                    size="sm"
                                                    variant="soft"
                                                    color={member.twoFactorStatus === 'enabled' ? "success" : "warning"}
                                                    className="h-6 px-2 text-[10px] font-bold uppercase tracking-wider"
                                                >
                                                    {member.twoFactorStatus}
                                                </Chip>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-xs font-medium text-default-600">
                                                    {member.twoFactorMethod?.toUpperCase() || "—"}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-xs ${member.recoveryCodesRemaining < 3 && member.twoFactorStatus === 'enabled' ? 'text-danger font-bold' : 'text-default-500 font-medium'}`}>
                                                    {member.twoFactorStatus === 'enabled' ? `${member.recoveryCodesRemaining} left` : "—"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-xs font-medium text-default-500">
                                                {formatRelativeTime(member.lastSecurityCheck)}
                                            </td>
                                            <td className="p-4">
                                                <Button variant="ghost" isIconOnly size="sm" aria-label={`View security details for ${member.name}`}>
                                                    <Icon icon="gravity-ui:ellipsis-vertical" className="w-4 h-4 text-default-400 group-hover:text-foreground transition-colors" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredMembers.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="p-16 text-center text-default-500 italic text-sm">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Icon icon="gravity-ui:magnifier" className="h-8 w-8 opacity-20" />
                                                    No members matching the selected filters.
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Accordion.Body>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}
