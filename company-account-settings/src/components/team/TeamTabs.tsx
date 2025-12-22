import { Tabs, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface TeamTabsProps {
    activeTab: string;
    onTabChange: (key: string) => void;
    memberCount: number;
    hasSecurityIssues?: boolean;
}

const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'members', label: 'Members' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'usage', label: 'Usage' },
    { id: 'billing', label: 'Billing', icon: 'gravity-ui:credit-card' },
    { id: 'developers', label: 'Developers' },
    { id: 'security', label: 'Security' },
    { id: 'activity', label: 'Activity Log' },
    { id: 'settings', label: 'Settings' },
];

export function TeamTabs({ activeTab, onTabChange, memberCount, hasSecurityIssues }: TeamTabsProps) {
    return (
        <div className="w-full pt-4">
            <Tabs
                aria-label="Team management sections"
                selectedKey={activeTab}
                onSelectionChange={(key) => onTabChange(key as string)}
                className="w-full"
            >
                <Tabs.ListContainer className="w-full">
                    <Tabs.List className="flex w-full gap-1 bg-default-100 p-1 rounded-full">
                        {TABS.map((tab) => (
                            <Tabs.Tab
                                key={tab.id}
                                id={tab.id}
                                className="flex-1 h-9 px-4 rounded-full transition-colors duration-300 relative data-[selected=true]:text-foreground text-default-500 group"
                            >
                                <Tabs.Indicator className="absolute inset-0 w-full h-full bg-background rounded-full shadow-sm" />
                                <div className="flex items-center justify-center h-full w-full gap-2 relative z-10">
                                    {tab.icon && (
                                        <Icon icon={tab.icon} className="text-base" />
                                    )}
                                    <span className="text-sm font-medium">{tab.label}</span>

                                    {tab.id === 'members' && (
                                        <Chip size="sm" variant="secondary" className="h-5 min-w-5 px-1 text-[10px] bg-default-200 group-data-[selected=true]:bg-default-100 rounded-full flex items-center justify-center text-default-600">
                                            {memberCount}
                                        </Chip>
                                    )}

                                    {tab.id === 'security' && hasSecurityIssues && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                                    )}
                                </div>
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs.ListContainer>
            </Tabs>
        </div>
    );
}
