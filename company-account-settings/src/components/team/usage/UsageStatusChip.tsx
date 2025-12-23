import { Chip, type ChipProps } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { UsageStatus } from "../../../types/usage";

interface UsageStatusChipProps {
    status: UsageStatus;
    percentUsed: number;
}

export function UsageStatusChip({ status, percentUsed }: UsageStatusChipProps) {
    const getStatusConfig = (): { color: ChipProps['color']; icon?: string } => {
        switch (status) {
            case 'critical':
                return { color: 'danger', icon: 'gravity-ui:triangle-exclamation-fill' };
            case 'warning':
                return { color: 'warning', icon: 'gravity-ui:circle-exclamation-fill' };
            default:
                return { color: 'success' }; // Default to success for normal usage
        }
    };

    const config = getStatusConfig();

    return (
        <Chip
            color={config.color}
            variant="soft"
            size="sm"
            className="capitalize font-medium gap-1 px-3"
        >
            <div className="flex items-center gap-1">
                {config.icon && <Icon icon={config.icon} className="w-4 h-4" />}
                <span>{Math.round(percentUsed)}% used</span>
            </div>
        </Chip>
    );
}


