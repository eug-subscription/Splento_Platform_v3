"use client";

import { Modal, ListBox, Avatar, Label, Header, Button, Separator } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { MENU_SECTIONS, PRIMARY_TABS } from "../../config/navigation";
import type { MobileNavigationProps } from "../../types/navigation";

interface MoreDrawerProps extends Omit<MobileNavigationProps, 'currentPath'> {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function MoreDrawer({
    isOpen,
    onOpenChange,
    user,
    organisation,
    sections = MENU_SECTIONS,
    onNavigate,
    onHelpClick,
    onLogout
}: MoreDrawerProps) {

    // Filter out items that are already in the bottom tab bar
    const drawerSections = useMemo(() => {
        const bottomTabIds = new Set(PRIMARY_TABS.map(t => t.id));

        return sections.map(section => ({
            ...section,
            items: section.items.filter(item => !bottomTabIds.has(item.id))
        })).filter(section => section.items.length > 0);
    }, [sections]);

    // For controlled modal using Modal.Container directly
    return (
        <Modal.Container
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="bottom"
        >
            <Modal.Dialog>
                <Modal.Body className="p-4 gap-6 bg-surface-1 rounded-t-3xl">
                    {/* Drag Handle */}
                    <div className="w-full flex justify-center pt-2 pb-4" onPointerDown={(e) => e.stopPropagation()}>
                        <div className="w-12 h-1.5 rounded-full bg-border" />
                    </div>

                    {/* User Profile */}
                    <Button
                        variant="ghost"
                        className="w-full justify-start p-2 h-auto gap-3 text-left"
                        onPress={() => {
                            onOpenChange(false);
                            onNavigate?.('/profile');
                        }}
                        aria-label="User profile"
                    >
                        <Avatar size="md" className="shrink-0">
                            <Avatar.Image src={user.avatar} alt={user.name} />
                            <Avatar.Fallback>{user.name?.charAt(0) || "U"}</Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col flex-1 min-w-0 items-start">
                            <p className="text-sm font-medium text-foreground truncate w-full">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate w-full">{user.role}</p>
                        </div>
                        <Icon icon="gravity-ui:chevron-right" className="size-5 text-muted-foreground shrink-0" />
                    </Button>

                    <Separator className="bg-separator/50" />

                    {/* Organization Switcher (Visual Only) */}
                    <Button
                        variant="ghost"
                        className="w-full justify-between items-center px-4 py-3 h-auto"
                        isDisabled
                        aria-label="Organization switcher (coming soon)"
                    >
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Icon icon="gravity-ui:briefcase" className="size-4" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium text-foreground">{organisation?.name || "Acme Corp"}</span>
                                <span className="text-xs text-muted-foreground">Enterprise Plan</span>
                            </div>
                        </div>
                        <Icon icon="gravity-ui:chevron-down" className="size-4 text-muted-foreground" />
                    </Button>

                    {/* 3. Sections */}
                    <ListBox
                        aria-label="Navigation Menu"
                        className="p-0 gap-6"
                        onAction={(key) => {
                            // Find item to get path
                            let path: string | undefined;
                            for (const section of drawerSections) {
                                const found = section.items.find(i => i.id === key);
                                if (found) {
                                    path = found.href;
                                    break;
                                }
                            }
                            if (path) {
                                onNavigate?.(path);
                                onOpenChange(false);
                            }
                        }}
                    >
                        {drawerSections.map((section) => (
                            <ListBox.Section key={section.id} className="gap-1">
                                <Header className="text-xs font-medium text-muted/70 px-2 mb-2 uppercase tracking-wider">
                                    {section.title}
                                </Header>
                                {section.items.map((item) => (
                                    <ListBox.Item
                                        key={item.id}
                                        id={item.id}
                                        textValue={item.label}
                                        className="group rounded-lg px-3 py-3 data-[hovered]:bg-surface-2 text-foreground"
                                    >
                                        <Icon icon={item.icon || 'gravity-ui:circle'} className="size-5 text-muted-foreground mr-3" />
                                        <Label className="flex-1 text-base font-medium cursor-pointer">{item.label}</Label>
                                        <Icon icon="gravity-ui:chevron-right" className="size-4 text-muted-foreground ml-3" />
                                    </ListBox.Item>
                                ))}
                            </ListBox.Section>
                        ))}
                    </ListBox>

                    <Separator className="my-2" />

                    {/* 4. Footer Actions */}
                    <div className="p-0 pt-2 space-y-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start px-3 h-12 text-base font-medium text-muted-foreground gap-3"
                            onPress={() => {
                                onOpenChange(false);
                                onHelpClick?.();
                            }}
                        >
                            <Icon icon="gravity-ui:circle-question" className="size-5 shrink-0" />
                            Help & Information
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start px-3 h-12 text-base font-medium text-danger gap-3 hover:text-danger hover:bg-danger/10"
                            onPress={() => {
                                onOpenChange(false);
                                onLogout?.();
                            }}
                        >
                            <Icon icon="gravity-ui:arrow-right-from-square" className="size-5 shrink-0" />
                            Log Out
                        </Button>
                    </div>

                    {/* Safe area spacer */}
                    <div className="h-[env(safe-area-inset-bottom)]" />

                </Modal.Body>
            </Modal.Dialog>
        </Modal.Container>
    );
}
