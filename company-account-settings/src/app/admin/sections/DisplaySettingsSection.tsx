import { Card, Checkbox, Label, Description } from "@heroui/react";

interface DisplaySettingsSectionProps {
    otherSettings: {
        showPhotographerDetails: boolean;
    };
    setOtherSettings: (settings: any) => void;
}

export function DisplaySettingsSection({ otherSettings, setOtherSettings }: DisplaySettingsSectionProps) {
    return (
        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
            <Card.Header className="pb-0 pt-2 px-2">
                <Card.Title className="text-base font-semibold">
                    Display Settings
                </Card.Title>
            </Card.Header>

            <Card.Content className="p-2">
                <Checkbox
                    isSelected={otherSettings.showPhotographerDetails}
                    onChange={(isSelected: boolean) => setOtherSettings({ ...otherSettings, showPhotographerDetails: isSelected })}
                    className="items-start w-full"
                >
                    <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                        <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Content>
                        <Label>Show photographer details</Label>
                        <Description>Display assigned photographer info in business profile.</Description>
                    </Checkbox.Content>
                </Checkbox>
            </Card.Content>
        </Card>
    );
}
