import { Icon } from '@iconify/react';
import type { PresetType } from '@/utils/team-permissions';
import { PRESETS } from '@/utils/team-permissions';
import { cn, Button } from '@heroui/react';

interface PresetTemplatesProps {
    activePreset: PresetType;
    onPresetChange: (preset: PresetType) => void;
    isDisabled?: boolean;
}

export function PresetTemplates({
    activePreset,
    onPresetChange,
    isDisabled
}: PresetTemplatesProps) {
    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-semibold">Permission Presets</h3>
                    <p className="text-sm text-muted-foreground">Quickly apply predefined permission sets</p>
                </div>
                {activePreset === 'custom' && (
                    <div className="px-2 py-1 rounded-full bg-accent/15 border border-accent/20 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2">
                        <Icon icon="gravity-ui:gear" className="text-accent text-xs" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Custom Config</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRESETS.map((preset) => {
                    const isActive = activePreset === preset.id;

                    return (
                        <Button
                            key={preset.id}
                            isDisabled={isDisabled}
                            onPress={() => onPresetChange(preset.id)}
                            variant="ghost"
                            className={cn(
                                "flex flex-col items-start p-4 h-auto rounded-xl border-2 text-left transition-all relative overflow-hidden group min-w-0",
                                isActive
                                    ? "border-accent bg-accent/15 ring-1 ring-accent opacity-100"
                                    : "border-default-100 hover:border-default-300 bg-content1 text-foreground"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-lg mb-3 transition-colors",
                                isActive ? "bg-accent text-white" : "bg-default-100 text-default-500 group-hover:bg-default-200"
                            )}>
                                <Icon icon={preset.icon} className="text-xl" />
                            </div>

                            <span className="font-bold text-sm mb-1">{preset.label}</span>
                            <p className="text-xs text-muted-foreground leading-relaxed whitespace-normal">
                                {preset.description}
                            </p>

                            {isActive && (
                                <div className="absolute top-2 right-2">
                                    <Icon icon="gravity-ui:circle-check-fill" className="text-accent text-lg" />
                                </div>
                            )}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
