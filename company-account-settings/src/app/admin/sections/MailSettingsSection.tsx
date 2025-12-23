import { Card, Checkbox, Label, Description } from "@heroui/react";

interface MailSettingsSectionProps {
    mailSettings: {
        disableAllEmails: boolean;
        sendChatNotifications: boolean;
    };
    setMailSettings: (settings: any) => void;
}

export function MailSettingsSection({ mailSettings, setMailSettings }: MailSettingsSectionProps) {
    return (
        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
            <Card.Header className="pb-0 pt-2 px-2">
                <Card.Title className="text-base font-semibold">
                    Mail Configuration
                </Card.Title>
            </Card.Header>

            <Card.Content className="p-2">
                <div className="space-y-3">
                    <Checkbox
                        isSelected={mailSettings.disableAllEmails}
                        onChange={(isSelected: boolean) => setMailSettings({ ...mailSettings, disableAllEmails: isSelected })}
                        className="items-start w-full"
                    >
                        <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                            <Label>Disable all enterprise emails</Label>
                            <Description>Stop all automated system emails.</Description>
                        </Checkbox.Content>
                    </Checkbox>

                    <Checkbox
                        isSelected={mailSettings.sendChatNotifications}
                        onChange={(isSelected: boolean) => setMailSettings({ ...mailSettings, sendChatNotifications: isSelected })}
                        className="items-start w-full"
                    >
                        <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                            <Label>Chat notifications</Label>
                            <Description>Send emails for new chat messages.</Description>
                        </Checkbox.Content>
                    </Checkbox>
                </div>
            </Card.Content>
        </Card>
    );
}
