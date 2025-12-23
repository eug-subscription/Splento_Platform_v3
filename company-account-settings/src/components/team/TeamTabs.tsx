import { Tabs, Chip, Select, ListBox } from "@heroui/react";
import { Icon } from "@iconify/react";

interface TeamTabsProps {
    activeTab: string;
    onTabChange: (key: string) => void;
    memberCount: number;
    hasSecurityIssues?: boolean;
}

const TABS = [
    { id: 'overview', label: 'Overview', icon: 'gravity-ui:layout-header-cells-large' },
    { id: 'members', label: 'Members', icon: 'gravity-ui:persons' },
    { id: 'permissions', label: 'Permissions', icon: 'gravity-ui:shield-check' },
    { id: 'usage', label: 'Usage', icon: 'gravity-ui:chart-area-stacked' },
    { id: 'billing', label: 'Billing', icon: 'gravity-ui:credit-card' },
    { id: 'developers', label: 'Developers', icon: 'gravity-ui:code' },
    { id: 'security', label: 'Security', icon: 'gravity-ui:shield-keyhole' },
    { id: 'activity', label: 'Activity Log', icon: 'gravity-ui:pulse' },
    { id: 'settings', label: 'Settings', icon: 'gravity-ui:gear' },
];

export function TeamTabs({ activeTab, onTabChange, memberCount, hasSecurityIssues }: TeamTabsProps) {
    const activeTabObj = TABS.find(t => t.id === activeTab) || TABS[0];

    return (
        <div className="w-full pt-4">
            {/* Desktop Navigation: Horizontal Tabs */}
            <div className="hidden md:block">
                <Tabs
                    aria-label="Team management sections"
                    selectedKey={activeTab}
                    onSelectionChange={(key) => onTabChange(key as string)}
                    className="w-full"
                >
                    <Tabs.ListContainer className="w-full">
                        <Tabs.List className="flex w-full gap-1 bg-default-100 p-1 rounded-full overflow-hidden">
                            {TABS.map((tab) => (
                                <Tabs.Tab
                                    key={tab.id}
                                    id={tab.id}
                                    className="flex-1 h-9 px-4 rounded-full transition-colors duration-300 relative data-[selected=true]:text-foreground text-default-500 group"
                                >
                                    <Tabs.Indicator className="absolute inset-0 w-full h-full bg-background rounded-full shadow-sm" />
                                    <div className="flex items-center justify-center h-full w-full gap-2 relative z-10">
                                        <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>

                                        {tab.id === 'security' && hasSecurityIssues && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-warning flex-shrink-0" />
                                        )}

                                        {tab.id === 'members' && (
                                            <Chip size="sm" variant="secondary" className="h-5 min-w-5 px-1 text-xs bg-default-200 group-data-[selected=true]:bg-default-100 rounded-full flex items-center justify-center text-default-600">
                                                {memberCount}
                                            </Chip>
                                        )}
                                    </div>
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Tabs.ListContainer>
                </Tabs>
            </div>

            {/* Mobile Navigation: Sticky Selector - Default HeroUI Styles */}
            <div className="block md:hidden sticky top-2 z-40 mb-4 bg-background/80 backdrop-blur-md rounded-medium pt-1">
                <Select
                    value={activeTab}
                    onChange={(val) => onTabChange(val as string)}
                    className="w-full"
                    aria-label="Select section"
                >
                    <Select.Trigger>
                        <Select.Value>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center text-default-500">
                                    <Icon icon={activeTabObj.icon || 'gravity-ui:circle'} className="text-lg" />
                                </div>
                                <span className="font-medium text-foreground text-base leading-none pt-0.5">{activeTabObj.label}</span>
                                {activeTab === 'members' && (
                                    <Chip size="sm" variant="secondary" className="bg-default-200 text-default-700 h-5 px-2 text-[10px] rounded-full">
                                        {memberCount}
                                    </Chip>
                                )}
                            </div>
                        </Select.Value>
                        <Select.Indicator />
                    </Select.Trigger>
                    
                    <Select.Popover>
                        <ListBox items={TABS}>
                            {(tab) => (
                                <ListBox.Item
                                    id={tab.id}
                                    textValue={tab.label}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-3">
                                            <Icon icon={tab.icon || 'gravity-ui:circle'} className={`text-lg ${activeTab === tab.id ? 'text-foreground' : 'text-default-400'}`} />
                                            <span className={`text-base ${activeTab === tab.id ? 'font-medium' : 'font-normal'}`}>{tab.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {tab.id === 'members' && (
                                                <Chip size="sm" variant="secondary" className="bg-default-100 text-default-600 h-5 min-w-5 px-1 rounded-full">
                                                    {memberCount}
                                                </Chip>
                                            )}
                                            {tab.id === 'security' && hasSecurityIssues && (
                                                <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                                            )}
                                        </div>
                                    </div>
                                </ListBox.Item>
                            )}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>
        </div>
    );
}
