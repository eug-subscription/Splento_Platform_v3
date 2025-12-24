

import { useState } from 'react';
import { ComboBox, Input, ListBox, Label } from '@heroui/react';
import { mockOrganizations } from '../../data/homepage.mock';
import type { Organization } from '../../types';

export function OrgSwitcher() {
    const [selectedOrg, setSelectedOrg] = useState<Organization>(mockOrganizations[0]);
    const [isOrgSwitching, setIsOrgSwitching] = useState(false);

    const handleOrgSwitch = async (orgId: string) => {
        const newOrg = mockOrganizations.find((o) => o.id === orgId);
        if (!newOrg || newOrg.id === selectedOrg.id) return;

        setIsOrgSwitching(true);
        // setLoadingStates... (omitted, as this component doesn't control page loading state directly)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSelectedOrg(newOrg);

            // Optional: Update URL matching HomePage logic if needed
            const url = new URL(window.location.href);
            url.searchParams.set('org', newOrg.slug);
            window.history.pushState({}, '', url);
        } catch (error) {
            console.error('Failed to switch organization:', error);
        } finally {
            setIsOrgSwitching(false);
        }
    };

    return (
        <ComboBox
            selectedKey={selectedOrg.id}
            onSelectionChange={(key) => handleOrgSwitch(key as string)}
            isDisabled={isOrgSwitching}
            className="w-48"
        >
            <Label className="sr-only">Select organization</Label>
            <ComboBox.InputGroup>
                <Input placeholder="Select org..." />
                <ComboBox.Trigger />
            </ComboBox.InputGroup>
            <ComboBox.Popover>
                <ListBox>
                    {mockOrganizations.map((org) => (
                        <ListBox.Item key={org.id} id={org.id} textValue={org.name}>
                            {org.name}
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    ))}
                </ListBox>
            </ComboBox.Popover>
        </ComboBox>
    );
}
