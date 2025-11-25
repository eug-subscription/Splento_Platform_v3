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

/**
 * Command Palette Constants
 */
const COMMAND_PALETTE_CONSTANTS = {
    HEADER_HEIGHT: 'h-14',
    BODY_HEIGHT: 'h-[400px]',
    FOOTER_TEXT_SIZE: 'text-[10px]',
} as const;

/**
 * Command Palette Component
 * 
 * A command palette with search, filtering, and keyboard navigation.
 */
export function CommandPalette({
    items,
    placeholder = "Type a command or search...",
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
    useEffect(() => {
        if (!isOpen) {
            setQuery("");
        }
    }, [isOpen]);

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
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger Button */}
            <Button
                variant="secondary"
                className="w-64 justify-between bg-surface-1 text-muted"
                onPress={() => setIsOpen(true)}
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
                <Modal.Dialog className="pointer-events-auto sm:max-w-xl w-full overflow-hidden border border-white/40 bg-white/90 p-0 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-black/90">
                    <>
                        {/* 1. Header: Seamless Input Style */}
                        <Modal.Header className="flex flex-col gap-1 border-b border-separator p-0">
                            <InputGroup className={`${COMMAND_PALETTE_CONSTANTS.HEADER_HEIGHT} border-none bg-transparent px-6 shadow-none data-[focus-within=true]:ring-0 data-[focus-within=true]:border-none ring-0 focus-within:ring-0`}>
                                <InputGroup.Prefix>
                                    <Icon icon="gravity-ui:magnifier" className="text-muted size-5" />
                                </InputGroup.Prefix>
                                <InputGroup.Input
                                    autoFocus
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={placeholder}
                                    className="text-lg"
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
                            <div className={`relative ${COMMAND_PALETTE_CONSTANTS.BODY_HEIGHT} overflow-y-auto shadow-[inset_0_-10px_10px_-10px_rgba(0,0,0,0.1)]`}>
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
                                            className="gap-2"
                                        >
                                            {Object.entries(groupedItems).map(([section, sectionItems]) => (
                                                <ListBox.Section key={section}>
                                                    {/* Custom Header for Section */}
                                                    <Header className={
                                                        section === "Actions"
                                                            ? "mb-2 mt-4 px-6 pb-2 pt-4 text-xs font-bold uppercase tracking-wide text-purple-500"
                                                            : "mb-2 px-6 pb-2 pt-4 text-xs font-bold uppercase tracking-wide text-muted"
                                                    }>
                                                        {section}
                                                    </Header>

                                                    {sectionItems.map((item) => {
                                                        const isActionSection = section === "Actions";

                                                        return (
                                                            <ListBox.Item
                                                                key={item.id}
                                                                id={item.id}
                                                                textValue={item.label}
                                                                className="group rounded-lg px-6 py-3 outline-none data-[hover=true]:bg-surface-1/50 data-[focus-visible=true]:bg-surface-1"
                                                            >
                                                                {/* Using flex layout to mimic endContent behavior */}
                                                                <div className="flex w-full items-center justify-between gap-3">
                                                                    <div className="flex min-w-0 flex-1 items-center gap-3">
                                                                        {/* Icon Container - Unified Style */}
                                                                        {item.icon && (
                                                                            <div
                                                                                className={
                                                                                    isActionSection
                                                                                        ? "shrink-0 rounded-lg p-0 text-purple-600 dark:text-purple-400"
                                                                                        : "shrink-0 rounded-lg p-0 text-muted"
                                                                                }
                                                                            >
                                                                                <Icon icon={item.icon} className="size-5" />
                                                                            </div>
                                                                        )}

                                                                        {/* Label and Description */}
                                                                        <div className="flex min-w-0 flex-1 flex-col">
                                                                            <Label
                                                                                className={
                                                                                    isActionSection
                                                                                        ? "truncate text-base font-medium text-purple-600 dark:text-purple-400"
                                                                                        : "truncate text-base font-medium"
                                                                                }
                                                                            >
                                                                                {item.label}
                                                                            </Label>
                                                                            {item.description && (
                                                                                <Description className="truncate text-xs text-muted">
                                                                                    {item.description}
                                                                                </Description>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    {/* Keyboard Shortcut - Always on Right */}
                                                                    {item.shortcut && (
                                                                        <Kbd className="ml-auto min-w-12 shrink-0 justify-end text-right">
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

                        {/* 3. Footer: Sticky Instructions with Backdrop */}
                        <Modal.Footer className="justify-start border-t border-separator bg-surface-1/50 py-2 px-6 backdrop-blur-sm">
                            <div className={`flex items-center gap-2 ${COMMAND_PALETTE_CONSTANTS.FOOTER_TEXT_SIZE} text-muted font-medium`}>
                                <span className="flex items-center gap-2">
                                    <Icon icon="gravity-ui:arrow-up" className="size-3" />
                                    <Icon icon="gravity-ui:arrow-down" className="size-3" />
                                    {navigationLabel}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Kbd className={`h-5 min-h-5 px-1 ${COMMAND_PALETTE_CONSTANTS.FOOTER_TEXT_SIZE}`}>
                                        <Kbd.Abbr keyValue="enter" />
                                    </Kbd>
                                    {selectLabel}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Kbd className={`h-5 min-h-5 px-1 ${COMMAND_PALETTE_CONSTANTS.FOOTER_TEXT_SIZE}`}>
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
