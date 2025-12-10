import { TextField, InputGroup } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ProductSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
    return (
        <div className="flex w-full justify-center">
            <TextField className="w-full max-w-2xl" aria-label="Search services">
                <InputGroup>
                    <InputGroup.Prefix className="pl-3">
                        <Icon icon="gravity-ui:magnifier" className="size-5 text-muted" />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                        placeholder="Search for photography, editing, or AI tools..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="h-12 text-lg"
                    />
                </InputGroup>
            </TextField>
        </div>
    );
}
