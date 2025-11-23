import { Select, ListBox } from '../ui/select';
import { Label } from '../ui/label';

interface RoleSelectProps {
    value: 'Admin' | 'Edit' | 'Read Only';
    onChange: (role: 'Admin' | 'Edit' | 'Read Only') => void;
    label?: string;
    className?: string;
}

export function RoleSelect({ value, onChange, label = 'Role', className }: RoleSelectProps) {
    return (
        <Select
            className={className}
            selectedKey={value}
            onSelectionChange={(key) => onChange(key as 'Admin' | 'Edit' | 'Read Only')}
        >
            {label && <Label>{label}</Label>}
            <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
                <ListBox>
                    <ListBox.Item id="Admin" textValue="Admin">
                        Admin
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Edit" textValue="Edit">
                        Edit
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Read Only" textValue="Read Only">
                        Read Only
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                </ListBox>
            </Select.Popover>
        </Select>
    );
}
