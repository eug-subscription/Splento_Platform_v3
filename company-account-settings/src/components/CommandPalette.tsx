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
    SECTIONS,
    AI_SEARCH_KEYWORDS,
    COMMAND_PALETTE_STYLES,
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
    onAIActivate,
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

    // Determines if the Visionary AI section should be shown
    const showAISection = useMemo(() => {
        if (!query) return true;
        const q = query.toLowerCase();
        // Improve search matching for AI section
        return SECTIONS.VISIONARY_AI.toLowerCase().includes(q) ||
            AI_SEARCH_KEYWORDS.some(keyword => keyword.includes(q));
    }, [query]);

    // Handle item selection
    const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
        if (keys === "all") return;

        const key = Array.from(keys)[0];
        if (!key) return;

        // Handle special Visionary AI case
        if (key === "visionary-ai") {
            onAIActivate?.();
            setIsOpen(false);
            return;
        }

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

            <Modal.Backdrop variant="blur">
                <Modal.Container placement="center" className="w-full">
                    <Modal.Dialog className="sm:max-w-xl w-full overflow-hidden bg-surface-1/80 backdrop-blur-xl rounded-2xl shadow-small border border-separator p-0">

                        {/* 1. Header: Seamless Input Style */}
                        <Modal.Header className="flex flex-col gap-1 border-b border-separator p-0">
                            <InputGroup className={`${COMMAND_PALETTE_CONFIG.HEADER_HEIGHT} border-none bg-transparent px-6 shadow-none data-[focus-within=true]:ring-0 data-[focus-within=true]:border-none ring-0 focus-within:ring-0`}>
                                <InputGroup.Prefix>
                                    <Icon icon="gravity-ui:magnifier" className="text-muted size-5" />
                                </InputGroup.Prefix>
                                <InputGroup.Input
                                    autoFocus
                                    type="search"
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
                            <div className={`relative ${COMMAND_PALETTE_CONFIG.BODY_HEIGHT} overflow-y-auto`}>
                                <div className="p-2">
                                    {(Object.keys(groupedItems).length === 0 && !showAISection) ? (
                                        // Empty State
                                        <div className="flex flex-col items-center justify-center p-8 text-center text-muted h-full min-h-[200px]">
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
                                            {showAISection && (
                                                <ListBox.Section>
                                                    <Header className={COMMAND_PALETTE_STYLES.sectionHeader}>
                                                        {SECTIONS.VISIONARY_AI.toUpperCase()}
                                                    </Header>

                                                    <ListBox.Item
                                                        id="visionary-ai"
                                                        textValue="Ask Visionary AI"
                                                        className={COMMAND_PALETTE_STYLES.listItem}
                                                    >
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className={COMMAND_PALETTE_STYLES.iconContainer}>
                                                                <Icon icon="gravity-ui:magic-wand" className={COMMAND_PALETTE_STYLES.icon} />
                                                            </div>
                                                            <div className="flex flex-col flex-1 min-w-0">
                                                                <Label className={COMMAND_PALETTE_STYLES.label}>
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
                                            )}

                                            {/* Regular Sections */}
                                            {Object.entries(groupedItems).map(([section, sectionItems]) => (
                                                <ListBox.Section key={section}>
                                                    <Header className={COMMAND_PALETTE_STYLES.sectionHeader}>
                                                        {section}
                                                    </Header>

                                                    {sectionItems.map((item) => {
                                                        return (
                                                            <ListBox.Item
                                                                key={item.id}
                                                                id={item.id}
                                                                textValue={item.label}
                                                                className={COMMAND_PALETTE_STYLES.listItem}
                                                            >
                                                                <div className="flex items-center gap-3 w-full">
                                                                    {/* Icon Container */}
                                                                    {item.icon && (
                                                                        <div className={COMMAND_PALETTE_STYLES.iconContainer}>
                                                                            <Icon icon={item.icon} className={COMMAND_PALETTE_STYLES.icon} />
                                                                        </div>
                                                                    )}

                                                                    <div className="flex flex-col flex-1 min-w-0">
                                                                        {/* Label */}
                                                                        <Label className={COMMAND_PALETTE_STYLES.label}>
                                                                            {item.label}
                                                                        </Label>

                                                                        {/* Description */}
                                                                        {item.description && (
                                                                            <Description className="text-sm text-muted line-clamp-1">
                                                                                {item.description}
                                                                            </Description>
                                                                        )}
                                                                    </div>

                                                                    {/* Keyboard Shortcut */}
                                                                    {item.shortcut && (
                                                                        <div className="ml-auto pl-2 shrink-0">
                                                                            <Kbd>
                                                                                {item.shortcut.modifier && (
                                                                                    <Kbd.Abbr keyValue={item.shortcut.modifier} />
                                                                                )}
                                                                                <Kbd.Content>{item.shortcut.key}</Kbd.Content>
                                                                            </Kbd>
                                                                        </div>
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

                        {/* 3. Footer: Hints */}
                        <Modal.Footer className="justify-center border-t border-separator py-3 px-6">
                            <div className={`flex items-center gap-6 ${COMMAND_PALETTE_CONFIG.FOOTER_TEXT_SIZE} text-muted`}>
                                <span className="flex items-center gap-2">
                                    <Icon icon="gravity-ui:arrow-up" className="size-4" />
                                    <Icon icon="gravity-ui:arrow-down" className="size-4" />
                                    {navigationLabel}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Kbd><Kbd.Abbr keyValue="enter" /></Kbd>
                                    {selectLabel}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Kbd>Esc</Kbd>
                                    {closeLabel}
                                </span>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
