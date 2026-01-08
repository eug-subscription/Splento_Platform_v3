import { Card, Select, ListBox, Label, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { TeamSettings, LanguageCode } from '@/types/settings';
import { LANGUAGES, COMMON_TIMEZONES } from '@/data/settings-constants';

interface LocalizationSectionProps {
    team: TeamSettings;
    onUpdateTeam: (updates: Partial<TeamSettings>) => Promise<void>;
}

export function LocalizationSection({ team, onUpdateTeam }: LocalizationSectionProps) {
    const currentLanguage = LANGUAGES.find(l => l.code === team.language) || LANGUAGES[0];
    const currentTimezone = COMMON_TIMEZONES.find(t => t.value === team.timezone) || COMMON_TIMEZONES[0];

    return (
        <Card className="h-full">
            <Card.Header className="pb-3">
                <Card.Title className="text-base font-semibold">Localisation</Card.Title>
                <Card.Description className="text-sm text-default-500">
                    Configure how dates, times, and language appear for your team
                </Card.Description>
            </Card.Header>

            <Card.Content>
                <div className="flex flex-col gap-6">
                    {/* Timezone Selection */}
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                            Team Timezone
                        </Label>
                        <Select
                            aria-label="Select Team Timezone"
                            value={team.timezone}
                            onChange={(key) => onUpdateTeam({ timezone: key as string })}
                            className="w-full"
                        >
                            <Select.Trigger className="h-12 bg-default-50/50 dark:bg-default-100/10 border-default-200 rounded-xl hover:bg-default-100/50 transition-colors">
                                <Select.Value>
                                    <div className="flex items-center justify-between w-full pr-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center size-8 rounded-lg bg-accent/10 text-accent">
                                                <Icon icon="gravity-ui:clock" className="size-4" />
                                            </div>
                                            <div className="flex flex-col items-start leading-none">
                                                <span className="text-sm font-semibold">{currentTimezone.label}</span>
                                                <span className="text-[10px] text-muted-foreground">{currentTimezone.region}</span>
                                            </div>
                                        </div>
                                        <Chip size="sm" variant="soft" color="accent" className="font-mono font-bold">
                                            {currentTimezone.offset}
                                        </Chip>
                                    </div>
                                </Select.Value>
                                <Select.Indicator />
                            </Select.Trigger>

                            <Select.Popover>
                                <ListBox items={COMMON_TIMEZONES}>
                                    {(timezone) => (
                                        <ListBox.Item id={timezone.value} textValue={timezone.label}>
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{timezone.label}</span>
                                                    <span className="text-[10px] text-muted-foreground">{timezone.region}</span>
                                                </div>
                                                <Chip size="sm" variant="soft" color="accent" className="font-mono font-bold">
                                                    {timezone.offset}
                                                </Chip>
                                            </div>
                                        </ListBox.Item>
                                    )}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                        <p className="text-[10px] text-muted-foreground/60 px-1">
                            This affects all scheduled reports and activity log timestamps.
                        </p>
                    </div>

                    {/* Language Selection */}
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                            Interface Language
                        </Label>
                        <Select
                            aria-label="Select Team Language"
                            value={team.language}
                            onChange={(key) => onUpdateTeam({ language: key as LanguageCode })}
                            className="w-full"
                        >
                            <Select.Trigger className="h-12 bg-default-50/50 dark:bg-default-100/10 border-default-200 rounded-xl hover:bg-default-100/50 transition-colors">
                                <Select.Value>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-8 rounded-lg bg-secondary/10 text-secondary text-base">
                                            {currentLanguage.flag || <Icon icon="gravity-ui:globe" className="size-4" />}
                                        </div>
                                        <div className="flex flex-col items-start leading-none">
                                            <span className="text-sm font-semibold">{currentLanguage.name}</span>
                                            <span className="text-[10px] text-muted-foreground">{currentLanguage.nativeName}</span>
                                        </div>
                                    </div>
                                </Select.Value>
                                <Select.Indicator />
                            </Select.Trigger>

                            <Select.Popover>
                                <ListBox items={LANGUAGES}>
                                    {(lang) => (
                                        <ListBox.Item id={lang.code} textValue={lang.name}>
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">{lang.flag}</span>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{lang.name}</span>
                                                    <span className="text-[10px] text-muted-foreground">{lang.nativeName}</span>
                                                </div>
                                            </div>
                                        </ListBox.Item>
                                    )}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                        <p className="text-[10px] text-muted-foreground/60 px-1">
                            Default language for emails and system notifications.
                        </p>
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
