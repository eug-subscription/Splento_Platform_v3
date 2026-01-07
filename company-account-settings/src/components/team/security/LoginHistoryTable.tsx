import { Chip, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { LoginEvent } from "@/types/security";
import { getBrowserIcon } from "@/utils/security";
import { format } from "date-fns";

interface LoginHistoryTableProps {
    history: LoginEvent[];
}

export function LoginHistoryTable({ history }: LoginHistoryTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-default-100 pb-2">
                        <th className="py-3 px-4 text-[10px] font-bold text-default-400 uppercase tracking-wider">Timestamp</th>
                        <th className="py-3 px-4 text-[10px] font-bold text-default-400 uppercase tracking-wider">Member</th>
                        <th className="py-3 px-4 text-[10px] font-bold text-default-400 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-[10px] font-bold text-default-400 uppercase tracking-wider">Device/Browser</th>
                        <th className="py-3 px-4 text-[10px] font-bold text-default-400 uppercase tracking-wider">IP Address</th>
                        <th className="py-3 px-4 text-[10px] font-bold text-default-400 uppercase tracking-wider text-right">Location</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-default-50">
                    {history.map((event) => (
                        <tr key={event.id} className="hover:bg-default-50/50 transition-colors group">
                            <td className="py-4 px-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-foreground">
                                    {format(new Date(event.timestamp), 'MMM d, yyyy')}
                                </span>
                                <span className="text-xs text-default-400 block">
                                    {format(new Date(event.timestamp), 'HH:mm:ss')}
                                </span>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <Avatar size="sm" className="h-8 w-8">
                                        <Avatar.Fallback className="text-[10px] uppercase font-bold">
                                            {event.memberName.split(' ').map(n => n[0]).join('')}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground leading-tight">
                                            {event.memberName}
                                        </span>
                                        <span className="text-[11px] text-default-500">
                                            {event.memberEmail}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <Chip
                                    size="sm"
                                    variant="soft"
                                    color={
                                        event.status === 'success' ? 'success' :
                                            event.status === 'failed' ? 'danger' : 'warning'
                                    }
                                    className="h-6 px-2 font-medium"
                                >
                                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wide">
                                        <Icon
                                            icon={
                                                event.status === 'success' ? 'gravity-ui:circle-check' :
                                                    event.status === 'failed' ? 'gravity-ui:circle-exclamation' : 'gravity-ui:shield-exclamation'
                                            }
                                            className="w-3 h-3"
                                        />
                                        {event.status}
                                    </span>
                                </Chip>
                                {event.failureReason && (
                                    <span className="text-[10px] text-danger-soft-foreground block mt-1 font-medium">
                                        {event.failureReason.replace('_', ' ')}
                                    </span>
                                )}
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                    <Icon
                                        icon={getBrowserIcon(event.browser)}
                                        className="w-4 h-4 text-default-400"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm text-foreground">
                                            {event.browser}
                                        </span>
                                        <span className="text-[10px] text-default-500 flex items-center gap-1 uppercase">
                                            <Icon
                                                icon={event.device === 'mobile' ? 'gravity-ui:smartphone' : 'gravity-ui:desktop'}
                                                className="w-3 h-3"
                                            />
                                            {event.device}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <code className="text-xs font-mono text-default-600 bg-default-100/50 px-1.5 py-0.5 rounded">
                                    {event.ipAddress}
                                </code>
                            </td>
                            <td className="py-4 px-4 text-right">
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-medium text-foreground">
                                        {event.location.city || 'Unknown City'}
                                    </span>
                                    <div className="flex items-center gap-1 text-[10px] text-default-500 uppercase">
                                        <Icon
                                            icon="gravity-ui:flag"
                                            className="w-3 h-3 text-default-300"
                                        />
                                        {event.location.country}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
