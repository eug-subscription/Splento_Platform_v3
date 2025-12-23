import { Chip } from '@heroui/react';

export function SampleChips() {
    const chips = [
        {
            label: 'Default',
            color: 'default' as const,
            variant: 'soft' as const
        },
        {
            label: 'Primary',
            color: 'accent' as const,
            variant: 'soft' as const
        },
        {
            label: '✓ Success',
            color: 'success' as const,
            variant: 'soft' as const
        },
        {
            label: '⚠ Warning',
            color: 'warning' as const,
            variant: 'soft' as const
        },
        {
            label: '✕ Error',
            color: 'danger' as const,
            variant: 'soft' as const
        },
        {
            label: 'Premium',
            color: 'accent' as const,
            variant: 'primary' as const
        },
    ];

    return (
        <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-grey-50 dark:bg-grey-950">
            {chips.map((chip) => (
                <Chip
                    key={chip.label}
                    color={chip.color}
                    variant={chip.variant}
                    className="text-xs font-medium px-3"
                    size="sm"
                >
                    {chip.label}
                </Chip>
            ))}
        </div>
    );
}
