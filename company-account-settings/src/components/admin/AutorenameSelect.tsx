import { Select, ListBox } from '../ui/select';
import { Label } from '../ui/label';

interface AutorenameSelectProps {
    value: string;
    onChange: (mode: string) => void;
    label?: string;
    className?: string;
}

export function AutorenameSelect({ value, onChange, label = 'Autorename Mode', className }: AutorenameSelectProps) {
    return (
        <Select
            className={className}
            selectedKey={value}
            onSelectionChange={(key) => {
                onChange(key as string);
                // Blur the trigger to remove focus state after selection
                setTimeout(() => {
                    (document.activeElement as HTMLElement)?.blur();
                }, 100);
            }}
        >
            {label && <Label>{label}</Label>}
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
    );
}
