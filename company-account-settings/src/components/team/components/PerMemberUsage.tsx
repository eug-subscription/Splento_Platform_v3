import { Card, Avatar } from "@heroui/react";
import type { MemberUsage } from "../../../types/team";
import { formatValue } from "../utils/usage";

interface PerMemberUsageProps {
    members: MemberUsage[];
    totals: {
        imageCredits: number;
        videoCredits: number;
        apiCalls: number;
        storage: number;
    };
    onMemberClick?: (memberId: string) => void;
}

export function PerMemberUsage({ members, totals, onMemberClick }: PerMemberUsageProps) {
    // Sort by total usage (images + videos) descending
    const sortedMembers = [...members].sort(
        (a, b) => (b.imageCredits + b.videoCredits) - (a.imageCredits + a.videoCredits)
    );

    return (
        <Card>
            <Card.Header className="pb-0 pt-4 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Per-Member Usage</h4>
                <p className="text-small text-default-500">Individual consumption breakdown</p>
            </Card.Header>
            <Card.Content className="p-0 mt-4">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-default-200 bg-default-100/50">
                                <th className="p-4 text-left text-sm font-medium text-default-500">Member</th>
                                <th className="p-4 text-right text-sm font-medium text-default-500">AI Images</th>
                                <th className="p-4 text-right text-sm font-medium text-default-500">AI Videos</th>
                                <th className="p-4 text-right text-sm font-medium text-default-500">API Calls</th>
                                <th className="p-4 text-right text-sm font-medium text-default-500">Storage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-default-200">
                            {sortedMembers.map((member) => (
                                <tr
                                    key={member.memberId}
                                    className="hover:bg-default-100/50 transition-colors cursor-pointer"
                                    onClick={() => onMemberClick?.(member.memberId)}
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                size="sm"
                                                className="w-8 h-8"
                                            >
                                                <Avatar.Image src={member.avatar} alt={member.name} />
                                                <Avatar.Fallback>{member.name.charAt(0)}</Avatar.Fallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{member.name}</p>
                                                <p className="text-xs text-default-500">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4 text-right">
                                        <span className="text-sm text-foreground">{formatValue(member.imageCredits)}</span>
                                    </td>

                                    <td className="p-4 text-right">
                                        <span className="text-sm text-foreground">{formatValue(member.videoCredits)}</span>
                                    </td>

                                    <td className="p-4 text-right">
                                        <span className="text-sm text-foreground">{formatValue(member.apiCalls)}</span>
                                    </td>

                                    <td className="p-4 text-right">
                                        <span className="text-sm text-foreground">{member.storage.toFixed(1)} GB</span>
                                    </td>
                                </tr>
                            ))}

                            {/* Totals Row */}
                            <tr className="bg-default-100 font-medium">
                                <td className="p-4">
                                    <span className="text-sm text-foreground">Total</span>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="text-sm text-foreground">{formatValue(totals.imageCredits)}</span>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="text-sm text-foreground">{formatValue(totals.videoCredits)}</span>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="text-sm text-foreground">{formatValue(totals.apiCalls)}</span>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="text-sm text-foreground">{totals.storage.toFixed(1)} GB</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card.Content>
        </Card>
    );
}
