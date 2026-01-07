import { TextField, Label, Input, Description, InputGroup, ScrollShadow, CheckboxGroup, Checkbox } from '@heroui/react';
import { WEBHOOK_EVENT_CATEGORIES } from '@/data/developers-constants';

interface WebhookFormProps {
    name: string;
    onNameChange: (val: string) => void;
    url: string;
    onUrlChange: (val: string) => void;
    isUrlInvalid: boolean;
    selectedEvents: string[];
    onEventsChange: (val: string[]) => void;
}

export function WebhookForm({
    name,
    onNameChange,
    url,
    onUrlChange,
    isUrlInvalid,
    selectedEvents,
    onEventsChange
}: WebhookFormProps) {
    return (
        <div className="space-y-6 px-1">
            <TextField value={name} onChange={onNameChange} isRequired>
                <Label className="text-sm font-semibold mb-2 block text-foreground">Webhook Name</Label>
                <Input
                    placeholder="e.g., Order Notifications"
                    className="bg-default-50 border-default-200 focus:border-accent transition-all rounded-xl px-4 py-3"
                />
                <Description className="text-xs text-muted-foreground mt-2">
                    A descriptive name for your webhook.
                </Description>
            </TextField>

            <TextField value={url} onChange={onUrlChange} isRequired isInvalid={isUrlInvalid}>
                <Label className="text-sm font-semibold mb-2 block text-foreground">Endpoint URL</Label>
                <InputGroup>
                    <InputGroup.Prefix className="text-muted-foreground mr-1 text-sm font-medium">https://</InputGroup.Prefix>
                    <InputGroup.Input
                        placeholder="api.yourdomain.com/webhooks"
                        className="bg-default-50 border-default-200 focus:border-accent transition-all rounded-xl pl-1 pr-4 py-3"
                    />
                </InputGroup>
                <Description className={isUrlInvalid ? 'text-danger mt-2 text-xs font-bold' : 'text-xs text-muted-foreground mt-2'}>
                    {isUrlInvalid ? 'Please enter a valid endpoint URL' : 'The URL we will send events to. Must use HTTPS.'}
                </Description>
            </TextField>

            <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">Events to subscribe</Label>
                <ScrollShadow className="max-h-[300px] pr-4">
                    <CheckboxGroup
                        value={selectedEvents}
                        onChange={onEventsChange}
                        className="space-y-6"
                    >
                        {Object.entries(WEBHOOK_EVENT_CATEGORIES).map(([key, category]) => (
                            <div key={key} className="space-y-3">
                                <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-divider pb-2">
                                    {category.label}
                                </h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {category.events.map(event => (
                                        <Checkbox key={event} value={event} className="group">
                                            <Checkbox.Control>
                                                <Checkbox.Indicator />
                                            </Checkbox.Control>
                                            <Checkbox.Content>
                                                <Label className="text-sm font-medium cursor-pointer transition-colors group-data-[selected=true]:text-accent">
                                                    {event}
                                                </Label>
                                            </Checkbox.Content>
                                        </Checkbox>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CheckboxGroup>
                </ScrollShadow>
                {selectedEvents.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">Select at least one event</p>
                )}
            </div>
        </div>
    );
}
