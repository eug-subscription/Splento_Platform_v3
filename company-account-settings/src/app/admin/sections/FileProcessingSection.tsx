import { Card, Select, ListBox, Label, Checkbox, Description } from "@heroui/react";

interface FileProcessingSectionProps {
    autorenameMode: string;
    setAutorenameMode: (mode: string) => void;
    fileNamePrefixes: {
        webAppPhotography: boolean;
        professionalPhotography: boolean;
    };
    setFileNamePrefixes: (prefixes: any) => void;
    prebookingSettings: {
        enableSessionDateInCSV: boolean;
    };
    setPrebookingSettings: (settings: any) => void;
}

export function FileProcessingSection({
    autorenameMode,
    setAutorenameMode,
    fileNamePrefixes,
    setFileNamePrefixes,
    prebookingSettings,
    setPrebookingSettings
}: FileProcessingSectionProps) {
    return (
        <div className="space-y-6">
            {/* ========== FILE SETTINGS CARD ========== */}
            <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                <Card.Header className="pb-0 pt-2 px-2">
                    <Card.Title className="text-base font-semibold">
                        File Processing & Naming
                    </Card.Title>
                    <p className="text-sm text-foreground/50 mt-1">Configure how files are handled and named automatically.</p>
                </Card.Header>

                <Card.Content className="p-2 space-y-6">
                    {/* Autorename Mode Dropdown */}
                    <Select
                        selectedKey={autorenameMode}
                        onSelectionChange={(key) => setAutorenameMode(key as string)}
                    >
                        <Label>Autorename Mode</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="external-id" textValue="File names are based on External ID">
                                    File names are based on External ID
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="dish-name" textValue="File names are based on Dish Name">
                                    File names are based on Dish Name
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="external-id-dish-name" textValue="File names are based on External ID (first) / Dish name (second)">
                                    File names are based on External ID (first) / Dish name (second)
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    {/* File Name Prefixes */}
                    <div>
                        <div className="block text-sm font-medium text-foreground/90">
                            File Name Prefix Applies To
                        </div>
                        <p className="text-xs text-foreground/50 mb-3">
                            Select which types of orders should receive an automatic name prefix.
                        </p>
                        <div className="flex flex-row gap-6">
                            <Checkbox
                                isSelected={fileNamePrefixes.webAppPhotography}
                                onChange={(isSelected: boolean) => setFileNamePrefixes({ ...fileNamePrefixes, webAppPhotography: isSelected })}
                                className="items-start w-full"
                            >
                                <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                                    <Checkbox.Indicator />
                                </Checkbox.Control>
                                <Checkbox.Content>
                                    <Label>WebApp photography</Label>
                                </Checkbox.Content>
                            </Checkbox>

                            <Checkbox
                                isSelected={fileNamePrefixes.professionalPhotography}
                                onChange={(isSelected: boolean) => setFileNamePrefixes({ ...fileNamePrefixes, professionalPhotography: isSelected })}
                                className="items-start w-full"
                            >
                                <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                                    <Checkbox.Indicator />
                                </Checkbox.Control>
                                <Checkbox.Content>
                                    <Label>Professional photography</Label>
                                </Checkbox.Content>
                            </Checkbox>
                        </div>
                    </div>
                </Card.Content>
            </Card>

            {/* ========== PREBOOKING FILES CARD ========== */}
            <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                <Card.Header className="pb-0 pt-2 px-2">
                    <Card.Title className="text-base font-semibold">
                        Prebooking Files
                    </Card.Title>
                </Card.Header>

                <Card.Content className="p-2">
                    <Checkbox
                        isSelected={prebookingSettings.enableSessionDateInCSV}
                        onChange={(isSelected: boolean) => setPrebookingSettings({ ...prebookingSettings, enableSessionDateInCSV: isSelected })}
                        className="items-start w-full"
                    >
                        <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                            <Label>Enable session date in CSV</Label>
                            <Description>Includes the session date column in exported CSVs.</Description>
                        </Checkbox.Content>
                    </Checkbox>
                </Card.Content>
            </Card>
        </div>
    );
}
