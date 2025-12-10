"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Modal,
    InputGroup,
    ListBox,
    Kbd,
    Button,
    Label,
    Description,
    Header,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import type { CommandItem, CommandPaletteProps } from "../types/command-palette";
import {
    COMMAND_PALETTE_CONFIG,
    getSectionHeaderClasses,
    getItemContentClasses,
    getIconContainerClasses,
    getAIItemBorderClasses
} from "./command-palette-utils";


/**
 * Command Palette Component
 * 
 * A command palette with search, filtering, and keyboard navigation.
 * Uses standard Tailwind tokens and semantic color system for maintainability.
 */
export function CommandPalette({
    items,
    placeholder = "Ask Visionary AI or search commands...",
    emptyMessage = "No commands found",
    navigationLabel = "Navigate",
    selectLabel = "Select",
    closeLabel = "Close",
}: CommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    // ⌘K / Ctrl+K global keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Reset query when modal closes
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setQuery("");
        }
    };

    // Filter items based on search query
    const filteredItems = useMemo(() => {
        if (!query.trim()) {
            return items;
        }

        const q = query.toLowerCase();
        return items.filter((item) => {
            const matchesLabel = item.label.toLowerCase().includes(q);
            const matchesDescription = item.description?.toLowerCase().includes(q);
            const matchesKeywords = item.keywords?.some((keyword) =>
                keyword.toLowerCase().includes(q)
            );

            return matchesLabel || matchesDescription || matchesKeywords;
        });
    }, [items, query]);

    // Group filtered items by section
    const groupedItems = useMemo(() => {
        return filteredItems.reduce((acc, item) => {
            if (!acc[item.section]) {
                acc[item.section] = [];
            }
            acc[item.section].push(item);
            return acc;
        }, {} as Record<string, CommandItem[]>);
    }, [filteredItems]);

    // Handle item selection
    const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
        if (keys === "all") return;

        const key = Array.from(keys)[0];
        if (!key) return;

        const selectedItem = items.find((item) => item.id === key);
        if (selectedItem) {
            selectedItem.action();
            setIsOpen(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
            {/* Trigger Button */}
            <Button
                variant="secondary"
                className="w-64 justify-between bg-surface-1 text-muted"
                onPress={() => handleOpenChange(true)}
            >
                <span className="flex items-center gap-2">
                    <Icon icon="gravity-ui:magnifier" className="size-4" />
                    Search...
                </span>
                <Kbd>
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>K</Kbd.Content>
                </Kbd>
            </Button>

            <Modal.Container placement="center" variant="blur" className="w-full pointer-events-none" isDismissable={true}>
                <Modal.Dialog className="pointer-events-auto sm:max-w-xl w-full overflow-hidden bg-surface-1/80 backdrop-blur-xl rounded-2xl shadow-overlay border border-separator p-0">
                    <>
                        {/* 1. Header: Seamless Input Style */}
                        <Modal.Header className="flex flex-col gap-1 border-b border-separator p-0">
                            <InputGroup className={`${COMMAND_PALETTE_CONFIG.HEADER_HEIGHT} border-none bg-transparent px-6 shadow-none data-[focus-within=true]:ring-0 data-[focus-within=true]:border-none ring-0 focus-within:ring-0`}>
                                <InputGroup.Prefix>
                                    <Icon icon="gravity-ui:magnifier" className="text-muted size-5" />
                                </InputGroup.Prefix>
                                <InputGroup.Input
                                    autoFocus
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={placeholder}
                                    className="text-lg bg-transparent"
                                    aria-label="Search commands"
                                />
                                <InputGroup.Suffix>
                                    <Kbd className="shadow-sm border border-border bg-surface-1">
                                        <Kbd.Content>ESC</Kbd.Content>
                                    </Kbd>
                                </InputGroup.Suffix>
                            </InputGroup>
                        </Modal.Header>

                        {/* 2. Body: Scrollable List with Shadow Effect */}
                        <Modal.Body className="p-0">
                            <div className={`relative ${COMMAND_PALETTE_CONFIG.BODY_HEIGHT} overflow-y-auto shadow-[inset_0_-10px_10px_-10px_rgba(0,0,0,0.1)]`}>
                                <div className="p-2">
                                    {Object.keys(groupedItems).length === 0 ? (
                                        // Empty State
                                        <div className="flex flex-col items-center justify-center p-8 text-center text-muted h-full">
                                            <Icon
                                                icon="gravity-ui:magnifier"
                                                className="mb-3 size-12 opacity-50"
                                            />
                                            <p className="text-sm font-medium">{emptyMessage}</p>
                                            <p className="mt-1 text-xs">Try a different search term</p>
                                        </div>
                                    ) : (
                                        // Command List
                                        <ListBox
                                            aria-label="Command Menu"
                                            selectionMode="single"
                                            onSelectionChange={handleSelectionChange}
                                            className="gap-0"
                                        >
                                            {/* Visionary AI Section */}
                                            <ListBox.Section>
                                                <Header className={getSectionHeaderClasses("Visionary AI")}>
                                                    VISIONARY AI
                                                </Header>

                                                <ListBox.Item
                                                    id="visionary-ai"
                                                    textValue="Ask Visionary AI"
                                                    className={getAIItemBorderClasses()}
                                                    onAction={() => {
                                                        // AI feature action - placeholder
                                                        console.log("Visionary AI activated");
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3 px-4 py-3">
                                                        <div className={getIconContainerClasses("Visionary AI")}>
                                                            <Icon icon="gravity-ui:magic-wand" className="size-6 text-accent-ai" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <Label className="text-base font-medium text-accent-ai">
                                                                Ask Visionary AI...
                                                            </Label>
                                                            <Description className="text-sm text-muted">
                                                                Generate content, analyze data, or chat
                                                            </Description>
                                                        </div>
                                                        <Kbd className="shrink-0">
                                                            <Kbd.Abbr keyValue="enter" />
                                                        </Kbd>
                                                    </div>
                                                </ListBox.Item>
                                            </ListBox.Section>

                                            {/* Regular Sections */}
                                            {Object.entries(groupedItems).map(([section, sectionItems]) => (
                                                <ListBox.Section key={section}>
                                                    <Header className={getSectionHeaderClasses(section)}>
                                                        {section}
                                                    </Header>

                                                    {sectionItems.map((item) => {
                                                        const iconContainerClasses = getIconContainerClasses(section);
                                                        const contentClasses = getItemContentClasses(section);

                                                        return (
                                                            <ListBox.Item
                                                                key={item.id}
                                                                id={item.id}
                                                                textValue={item.label}
                                                                className="group rounded-lg px-4 py-3 outline-none data-[hover=true]:bg-surface-1/50 data-[focus-visible=true]:bg-surface-1"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    {/* Icon Container */}
                                                                    {item.icon && (
                                                                        <div className={iconContainerClasses}>
                                                                            <Icon icon={item.icon} className={contentClasses.icon} />
                                                                        </div>
                                                                    )}

                                                                    {/* Content */}
                                                                    <div className="flex-1 min-w-0">
                                                                        <Label className={contentClasses.label}>
                                                                            {item.label}
                                                                        </Label>
                                                                        {item.description && (
                                                                            <Description className="text-sm text-muted">
                                                                                {item.description}
                                                                            </Description>
                                                                        )}
                                                                    </div>

                                                                    {/* Keyboard Shortcut */}
                                                                    {item.shortcut && (
                                                                        <Kbd className="ml-auto shrink-0">
                                                                            {item.shortcut.modifier && (
                                                                                <Kbd.Abbr keyValue={item.shortcut.modifier} />
                                                                            )}
                                                                            <Kbd.Content>{item.shortcut.key}</Kbd.Content>
                                                                        </Kbd>
                                                                    )}
                                                                </div>
                                                            </ListBox.Item>
                                                        );
                                                    })}
                                                </ListBox.Section>
                                            ))}
                                        </ListBox>
                                    )}
                                </div>
                            </div>
                        </Modal.Body>

                        {/* 3. Footer: Centered Navigation Hints */}
                        <Modal.Footer className="justify-center border-t border-separator py-2 px-6">
                            <div className={`flex items-center gap-4 ${COMMAND_PALETTE_CONFIG.FOOTER_TEXT_SIZE} text-muted font-medium`}>
                                <span className="flex items-center gap-2">
                                    <Icon icon="gravity-ui:arrow-up" className="size-3" />
                                    <Icon icon="gravity-ui:arrow-down" className="size-3" />
                                    {navigationLabel}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Kbd className={`h-5 min-h-5 px-1 ${COMMAND_PALETTE_CONFIG.FOOTER_TEXT_SIZE}`}>
                                        <Kbd.Abbr keyValue="enter" />
                                    </Kbd>
                                    {selectLabel}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Kbd className={`h-5 min-h-5 px-1 ${COMMAND_PALETTE_CONFIG.FOOTER_TEXT_SIZE}`}>
                                        <Kbd.Content>Esc</Kbd.Content>
                                    </Kbd>
                                    {closeLabel}
                                </span>
                            </div>
                        </Modal.Footer>
                    </>
                </Modal.Dialog>
            </Modal.Container>
        </Modal>
    );
}
