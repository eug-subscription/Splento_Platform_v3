import { TextField, InputGroup } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ProductSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
    return (
        <div className="flex w-full justify-center">
            <TextField
                className="w-full max-w-xl"
                aria-label="Search services"
                value={value}
                onChange={onChange}
            >
                <InputGroup className="!rounded-full [&_.input-group\_\_prefix]:!rounded-l-full">
                    <InputGroup.Prefix>
                        <Icon icon="gravity-ui:magnifier" className="size-4 text-muted" />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                        type="search"
                        placeholder="Search for photography, editing, or AI tools..."
                        className="w-full text-base"
                    />
                </InputGroup>
            </TextField>
        </div>
    );
}
