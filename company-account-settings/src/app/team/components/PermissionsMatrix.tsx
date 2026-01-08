import { RadioGroup, Radio } from "@heroui/react";
import type { PermissionLevel, FeatureArea } from "@/types/team";

interface PermissionsMatrixProps {
    permissions: Record<FeatureArea, PermissionLevel>;
    onChange?: (permissions: Record<FeatureArea, PermissionLevel>) => void;
    isReadOnly?: boolean;
}

const FEATURES: { id: FeatureArea; label: string }[] = [
    { id: 'media', label: 'Media Library' },
    { id: 'studio', label: 'AI Studio' },
    { id: 'orders', label: 'Orders' },
    { id: 'batch', label: 'Batch Processing' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'team', label: 'Team Members' },
    { id: 'billing', label: 'Billing' },
    { id: 'settings', label: 'Team Settings' },
    { id: 'api', label: 'API & Developers' },
];

export function PermissionsMatrix({ permissions, onChange, isReadOnly = false }: PermissionsMatrixProps) {
    const handleChange = (feature: FeatureArea, level: string) => {
        if (onChange) {
            onChange({
                ...permissions,
                [feature]: level as PermissionLevel
            });
        }
    };

    return (
        <div className="border border-default-200 rounded-lg overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center bg-default-200 border-b border-default-200 py-2 px-4 text-sm font-medium text-default-600">
                <div className="flex-1">Feature</div>
                <div className="w-20 text-right pr-6">None</div>
                <div className="w-20 text-right pr-6">Read</div>
                <div className="w-20 text-right pr-6">Edit</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-default-200 bg-background text-sm">
                {FEATURES.map((feature, index) => (
                    <RadioGroup
                        key={feature.id}
                        orientation="horizontal"
                        value={permissions[feature.id]}
                        onChange={(val: string) => handleChange(feature.id, val)}
                        isDisabled={isReadOnly}
                        className={`p-0 m-0 w-full ${index % 2 === 1 ? 'bg-default-50' : ''}`}
                    >
                        <div className="flex items-center w-full py-2.5 px-4">
                            <div className="flex-1 font-medium text-foreground">
                                {feature.label}
                            </div>
                            <div className="w-20 flex justify-end pr-6">
                                <Radio value="none" aria-label={`No ${feature.label} permissions`}>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                </Radio>
                            </div>
                            <div className="w-20 flex justify-end pr-6">
                                <Radio value="read" aria-label={`Read ${feature.label} permissions`}>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                </Radio>
                            </div>
                            <div className="w-20 flex justify-end pr-6">
                                <Radio value="edit" aria-label={`Edit ${feature.label} permissions`}>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                </Radio>
                            </div>
                        </div>
                    </RadioGroup>
                ))}
            </div>
        </div>
    );
}
