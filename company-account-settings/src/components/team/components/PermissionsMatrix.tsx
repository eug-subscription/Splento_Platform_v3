import { Card, Alert, RadioGroup, Radio, cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { FeatureArea, PermissionLevel } from '../../../types/team';
import { FEATURES } from '../utils/permissions';

interface PermissionsMatrixProps {
    permissions: Record<FeatureArea, PermissionLevel>;
    onChange: (feature: FeatureArea, level: PermissionLevel) => void;
    isDisabled?: boolean;
    isAdmin?: boolean;
}

export function PermissionsMatrix({
    permissions,
    onChange,
    isDisabled,
    isAdmin
}: PermissionsMatrixProps) {
    return (
        <Card className="shadow-sm border-default-100 overflow-hidden">
            {isAdmin && (
                <Alert status="warning" className="m-4 mb-0 border-warning/20 bg-warning/15">
                    <Alert.Indicator />
                    <Alert.Content>
                        <Alert.Title>Administrator Privileges</Alert.Title>
                        <Alert.Description>
                            This member is a team admin. Admin permissions are automatically set to Full Access and cannot be modified.
                        </Alert.Description>
                    </Alert.Content>
                </Alert>
            )}

            <Card.Content className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-base font-semibold">Feature Access Control</h3>
                    <span className="text-xs text-muted-foreground bg-default-100 px-2 py-0.5 rounded-full font-medium">Fine-grained</span>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                <th className="pb-3 pl-2">Feature Area</th>
                                <th className="pb-3 text-center w-32 px-4 whitespace-nowrap">None</th>
                                <th className="pb-3 text-center w-32 px-4 whitespace-nowrap">Read Only</th>
                                <th className="pb-3 text-center w-32 px-4 whitespace-nowrap">Full Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FEATURES.map((feature) => (
                                <tr key={feature.id} className="group hover:bg-default-50/50 transition-colors">
                                    <td className="py-3 px-2 rounded-l-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-default-100 text-default-600 group-hover:bg-default-200 transition-colors">
                                                <Icon icon={feature.icon} className="text-base" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold">{feature.label}</span>
                                                <span className="text-[11px] text-muted-foreground">{feature.description}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td colSpan={3} className="py-3 px-0 align-middle rounded-r-xl">
                                        <RadioGroup
                                            orientation="horizontal"
                                            value={permissions[feature.id]}
                                            onChange={(val) => onChange(feature.id, val as PermissionLevel)}
                                            isDisabled={isDisabled}
                                            aria-label={`Permissions for ${feature.label}`}
                                            className="w-full"
                                        >
                                            <div className="grid grid-cols-3 w-full">
                                                <div className="flex justify-center flex-1">
                                                    <PermissionPoint value="none" level="none" />
                                                </div>
                                                <div className="flex justify-center flex-1">
                                                    <PermissionPoint value="read" level="read" />
                                                </div>
                                                <div className="flex justify-center flex-1">
                                                    <PermissionPoint value="edit" level="edit" />
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="grid grid-cols-1 gap-6 md:hidden">
                    {FEATURES.map((feature) => (
                        <div key={feature.id} className="flex flex-col gap-3 p-4 rounded-xl border border-default-100 bg-content2/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-default-100 text-default-600">
                                    <Icon icon={feature.icon} className="text-base" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">{feature.label}</span>
                                    <p className="text-[11px] text-muted-foreground">{feature.description}</p>
                                </div>
                            </div>

                            <RadioGroup
                                orientation="horizontal"
                                value={permissions[feature.id]}
                                onChange={(val) => onChange(feature.id, val as PermissionLevel)}
                                isDisabled={isDisabled}
                                aria-label={`Permissions for ${feature.label}`}
                                className="mt-2"
                            >
                                <div className="grid grid-cols-3 gap-2">
                                    <MobilePermissionButton label="None" value="none" level="none" />
                                    <MobilePermissionButton label="Read" value="read" level="read" />
                                    <MobilePermissionButton label="Edit" value="edit" level="edit" />
                                </div>
                            </RadioGroup>
                        </div>
                    ))}
                </div>
            </Card.Content>
        </Card>
    );
}

function PermissionPoint({
    value,
    level
}: {
    value: string;
    level: PermissionLevel;
}) {
    // Standardizing to HeroUI v3 default visuals with Splento semantic colors
    const colors = {
        none: "text-danger flex-1", // Using flex-1 to center better in grid
        read: "text-accent flex-1",
        edit: "text-success flex-1",
    };

    return (
        <Radio
            value={value}
            aria-label={`Set permission to ${level}`}
            className={cn("flex justify-center", colors[level])}
        >
            <Radio.Control>
                <Radio.Indicator />
            </Radio.Control>
        </Radio>
    );
}

function MobilePermissionButton({
    label,
    value,
    level
}: {
    label: string;
    value: string;
    level: PermissionLevel;
}) {
    return (
        <Radio
            value={value}
            className="w-full"
        >
            {({ isSelected, isDisabled, isPressed }) => {
                const colors = {
                    none: isSelected ? "bg-danger text-white border-danger shadow-sm" : "bg-content1 text-default-500 border-default-200 shadow-none",
                    read: isSelected ? "bg-accent text-white border-accent shadow-sm" : "bg-content1 text-default-500 border-default-200 shadow-none",
                    edit: isSelected ? "bg-success text-white border-success shadow-sm" : "bg-content1 text-default-500 border-default-200 shadow-none",
                };

                return (
                    <Radio.Control className={cn(
                        "flex items-center justify-center py-2.5 px-1 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all h-auto min-w-0 w-full cursor-pointer",
                        colors[level],
                        isDisabled && "opacity-40 grayscale",
                        isPressed && !isDisabled && "scale-[0.98]"
                    )}>
                        {label}
                    </Radio.Control>
                );
            }}
        </Radio>
    );
}
