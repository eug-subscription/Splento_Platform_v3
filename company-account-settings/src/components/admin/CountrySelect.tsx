import { ComboBox } from '../ui/combobox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ListBox } from '../ui/select';
import { Header, Separator } from '@heroui/react';

interface CountrySelectProps {
    value: string;
    onChange: (country: string) => void;
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
    return (
        <ComboBox
            className="w-full"
            selectedKey={value}
            onSelectionChange={(key) => onChange(key as string)}
        >
            <Label>Country</Label>
            <ComboBox.InputGroup>
                <Input placeholder="Search countries..." />
                <ComboBox.Trigger />
            </ComboBox.InputGroup>
            <ComboBox.Popover>
                <ListBox>
                    <Header>North America</Header>
                    <ListBox.Item id="usa" textValue="United States">
                        United States
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="canada" textValue="Canada">
                        Canada
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="mexico" textValue="Mexico">
                        Mexico
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <Separator />
                    <Header>Europe</Header>
                    <ListBox.Item id="uk" textValue="United Kingdom">
                        United Kingdom
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="france" textValue="France">
                        France
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="germany" textValue="Germany">
                        Germany
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="spain" textValue="Spain">
                        Spain
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="italy" textValue="Italy">
                        Italy
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <Separator />
                    <Header>Asia</Header>
                    <ListBox.Item id="japan" textValue="Japan">
                        Japan
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="china" textValue="China">
                        China
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="india" textValue="India">
                        India
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="south-korea" textValue="South Korea">
                        South Korea
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                </ListBox>
            </ComboBox.Popover>
        </ComboBox>
    );
}
