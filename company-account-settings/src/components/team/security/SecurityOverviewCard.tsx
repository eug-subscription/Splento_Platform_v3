import { StatsCard } from "@/components/ui/StatsCard/StatsCard";
import type { SecurityOverview } from "@/types/security";

interface SecurityOverviewCardProps {
    overview: SecurityOverview;
}

export function SecurityOverviewCard({ overview }: SecurityOverviewCardProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
                icon="gravity-ui:shield-keyhole"
                label="2FA Coverage"
                value={`${overview.membersWith2FA}/${overview.membersTotal}`}
                subtext="members protected"
                progress={{
                    value: overview.membersWith2FA,
                    max: overview.membersTotal,
                    color: overview.membersWith2FA === overview.membersTotal ? "success" : "warning"
                }}
            />
            <StatsCard
                icon="gravity-ui:monitor"
                label="Active Sessions"
                value={overview.totalActiveSessions}
                subtext="across all devices"
            />
            <StatsCard
                icon="gravity-ui:history"
                label="Failed Logins"
                value={overview.recentFailedLogins}
                subtext="in the last 24h"
                trend={overview.recentFailedLogins > 0 ? {
                    value: overview.recentFailedLogins,
                    direction: 'up',
                    label: 'attempts',
                    color: 'danger'
                } : undefined}
                warning={overview.recentFailedLogins > 0}
            />
            <StatsCard
                icon="gravity-ui:network"
                label="IP Rules"
                value={overview.ipRulesActive}
                subtext="active restrictions"
            />
        </div>
    );
}
