import { Card, Button, Select, ListBox } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { Session, SessionTimeoutOption } from "@/types/security";
import { SessionRow } from "@/components/team/security/SessionRow";

interface SessionManagementCardProps {
    sessions: Session[];
    timeout: SessionTimeoutOption;
    onUpdateTimeout: (timeout: SessionTimeoutOption) => void;
    onRevokeSession: (session: Session) => void;
    onRevokeAllSessions: () => void;
}

export function SessionManagementCard({
    sessions,
    timeout,
    onUpdateTimeout,
    onRevokeSession,
    onRevokeAllSessions
}: SessionManagementCardProps) {
    const activeSessionsCount = sessions.length;
    const otherSessionsCount = sessions.filter(s => !s.isCurrent).length;

    return (
        <Card className="overflow-visible rounded-3xl" variant="default">
            <Card.Content className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">Session Management</h3>
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-default-100 text-default-600 border border-default-200">
                                {activeSessionsCount} Active {activeSessionsCount === 1 ? 'Session' : 'Sessions'}
                            </span>
                        </div>
                        <p className="text-sm text-default-500 max-w-2xl leading-relaxed">
                            Control which devices are currently logged into your account.
                            Revoking a session will immediately sign out the user from that device.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="danger"
                            onPress={onRevokeAllSessions}
                            isDisabled={otherSessionsCount === 0}
                            className="rounded-full px-6 font-medium h-10"
                        >
                            <Icon icon="gravity-ui:circle-reset" width={20} height={20} />
                            Revoke All Other
                        </Button>
                    </div>
                </div>

                <div className="space-y-3">
                    {sessions.map((session) => (
                        <SessionRow
                            key={session.id}
                            session={session}
                            onRevoke={onRevokeSession}
                        />
                    ))}
                </div>

                <div className="mt-10 pt-8 border-t border-separator">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground mb-1">Inactivity Timeout</h4>
                            <p className="text-xs text-default-500 max-w-xl">
                                Automatically sign out users after a certain period of inactivity.
                                This is a team-wide setting that applies to all members.
                            </p>
                        </div>

                        <div className="w-full md:w-auto">
                            <Select
                                selectedKey={timeout}
                                onSelectionChange={(key) => onUpdateTimeout(key as SessionTimeoutOption)}
                                className="min-w-[200px]"
                                aria-label="Select session timeout"
                            >
                                <Select.Trigger>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="1d" textValue="24 Hours (1 Day)">24 Hours (1 Day)</ListBox.Item>
                                        <ListBox.Item id="7d" textValue="7 Days">7 Days</ListBox.Item>
                                        <ListBox.Item id="30d" textValue="30 Days">30 Days</ListBox.Item>
                                        <ListBox.Item id="never" textValue="Never expire">Never expire</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
