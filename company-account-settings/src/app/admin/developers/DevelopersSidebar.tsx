import { ListBox } from '@heroui/react';
import { Icon } from '@iconify/react';
import { DEVELOPER_SECTIONS } from '@/data/developers-constants';
import type { DeveloperSectionId } from '@/types/developers';

interface DevelopersSidebarProps {
    activeSection: DeveloperSectionId;
    onSectionChange: (section: DeveloperSectionId) => void;
}

export function DevelopersSidebar({ activeSection, onSectionChange }: DevelopersSidebarProps) {
    return (
        <nav className="flex flex-col gap-2">
            <h4 className="px-4 text-xs font-bold text-default-400 uppercase tracking-widest mb-2">
                Developer Tools
            </h4>
            <ListBox
                aria-label="Developer sections"
                selectionMode="single"
                selectedKeys={new Set([activeSection])}
                onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as DeveloperSectionId;
                    if (selected) onSectionChange(selected);
                }}
                className="p-0 gap-1"
            >
                {DEVELOPER_SECTIONS.map((section) => (
                    <ListBox.Item
                        key={section.id}
                        id={section.id}
                        textValue={section.label}
                        className={[
                            "px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer outline-none",
                            "data-[hovered]:bg-default-100",
                            "data-[selected]:bg-accent-soft data-[selected]:text-accent text-default-600",
                            "data-[selected]:border-l-3 data-[selected]:border-accent data-[selected]:rounded-l-none"
                        ].join(" ")}
                    >

                        <div className="flex items-center gap-3 w-full">
                            <Icon
                                icon={section.icon}
                                className={`size-5 ${activeSection === section.id ? 'text-accent' : 'text-default-400'}`}
                            />
                            <span className="font-semibold text-sm">{section.label}</span>
                        </div>
                    </ListBox.Item>
                ))}
            </ListBox>
        </nav>
    );
}
