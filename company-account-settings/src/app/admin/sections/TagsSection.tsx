import React from 'react';
import { Card, Chip, CloseButton, TextField, InputGroup } from "@heroui/react";
import { Icon } from '@iconify/react';

interface TagsSectionProps {
    tags: string[];
    tagInput: string;
    setTagInput: (input: string) => void;
    handlers: {
        handleAddTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
        handleRemoveTag: (tag: string) => void;
    };
}

export function TagsSection({ tags, tagInput, setTagInput, handlers }: TagsSectionProps) {
    const { handleAddTag, handleRemoveTag } = handlers;

    return (
        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
            <Card.Header className="pb-0 pt-2 px-2">
                <Card.Title className="text-base font-semibold">
                    Company Tags
                </Card.Title>
                <p className="text-sm text-foreground/50 mt-1">Categorise this company with custom tags.</p>
            </Card.Header>

            <Card.Content className="p-2">
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, index) => (
                        <Chip
                            key={index}
                            size="sm"
                            variant="secondary"
                            className="pl-2"
                        >
                            {tag}
                            <CloseButton onPress={() => handleRemoveTag(tag)}>
                                <Icon icon="gravity-ui:xmark" />
                            </CloseButton>
                        </Chip>
                    ))}
                </div>
                <TextField name="tagInput">
                    <InputGroup>
                        <InputGroup.Prefix>
                            <Icon className="text-muted size-4" icon="mdi:plus" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            placeholder="Add tag"
                            value={tagInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                        />
                    </InputGroup>
                </TextField>
            </Card.Content>
        </Card >
    );
}
