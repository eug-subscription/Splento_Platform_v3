import { TextField, Label, Input, FieldError } from "@heroui/react";
import React from 'react';

interface FormTextFieldProps {
    label?: string;
    name: string;
    type?: 'text' | 'email' | 'tel' | 'url' | 'number';
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    isInvalid?: boolean;
    errorMessage?: string;
    className?: string;
}

export function FormTextField({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    onKeyDown,
    isInvalid = false,
    errorMessage,
    className = 'w-full'
}: FormTextFieldProps) {
    return (
        <TextField
            className={className}
            name={name}
            type={type}
            isInvalid={isInvalid}
        >
            {label && <Label>{label}</Label>}
            <Input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            {isInvalid && errorMessage && (
                <FieldError>{errorMessage}</FieldError>
            )}
        </TextField>
    );
}
