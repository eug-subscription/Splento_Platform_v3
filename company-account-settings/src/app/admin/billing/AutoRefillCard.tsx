import { useState } from 'react';
import type { Key } from 'react';
import {
    Card,
    Chip,
    Switch,
    NumberField,
    TextField,
    InputGroup,
    Label,
    Separator,
    Select,
    ListBox,
    Header,
    cn
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { CREDIT_PACKAGES, CHIP_BADGE_STYLE } from "@/data/billing-constants";
import type { CreditPackage } from "@/types/billing";

/**
 * AutoRefillCard Component
 * A "Set and Forget" policy card for credit management.
 * Features:
 * - Master Toggle: Activates / Deactivates the entire policy.
 * - Sentence Logic: "If balance hits X credits, Add Y package" (Mad Libs UI)
 * - Custom Option: Allows defining a specific credit amount via dropdown selection.
 * - Circuit Breaker: Monthly cap to prevent runaway billing.
 */
export function AutoRefillCard() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [hasMonthlyCap, setHasMonthlyCap] = useState(true);

    // Default to the second package (index 1) which is usually the "standard" one
    // Storing ID as string to match Select value type
    const [selectedPackageId, setSelectedPackageId] = useState<string>(CREDIT_PACKAGES[1].id);
    const [thresholdCredits, setThresholdCredits] = useState(50);
    const [customCredits, setCustomCredits] = useState(2000);

    const handleSelectionChange = (key: Key | null) => {
        if (key) setSelectedPackageId(String(key));
    };

    const isCustomSelected = selectedPackageId === 'custom';

    return (
        <Card className="w-full">

            {/* 1. Header: Primary Activation Switch */}
            <Card.Header className="flex flex-row justify-between items-start pb-2">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Icon
                            icon="gravity-ui:arrows-rotate-right"
                            className="text-muted-foreground"
                        />
                        <h3 className="text-base font-semibold text-foreground">Auto-Refill</h3>
                        <Chip
                            variant="soft"
                            color={isEnabled ? "success" : "default"}
                            size="sm"
                        >
                            <span className="flex items-center gap-1">
                                {isEnabled && <Icon icon="gravity-ui:circle-check-fill" width={14} />}
                                {isEnabled ? 'Active' : 'Off'}
                            </span>
                        </Chip>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Automatically buy credits when you run low.
                    </p>
                </div>
                <Switch
                    isSelected={isEnabled}
                    onChange={setIsEnabled}
                    aria-label="Toggle Auto-Refill"
                >
                    <Switch.Control>
                        <Switch.Thumb />
                    </Switch.Control>
                </Switch>
            </Card.Header>

            {/* 2. Content: Configuration Logic */}
            <Card.Content
                className={`
          space-y-6 transition-opacity duration-300 pt-2
          ${isEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}
        `}
            >
                <Separator />

                {/* The "Sentence" Layout: If Balance < X, Add Y */}
                <div className="flex flex-col gap-4">

                    {/* Sentence Row */}
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        {/* Threshold Input */}
                        <TextField
                            value={thresholdCredits === 0 ? '' : thresholdCredits.toLocaleString()}
                            onChange={(val) => {
                                const rawValue = val.replace(/[^0-9]/g, '');
                                const numValue = rawValue === '' ? 0 : parseInt(rawValue);
                                setThresholdCredits(numValue);
                            }}
                            className="w-full sm:w-[35%]"
                            isDisabled={!isEnabled}
                        >
                            <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">
                                If balance hits
                            </Label>
                            <InputGroup>
                                <InputGroup.Input className="flex-1 sm:w-[120px] sm:flex-none" />
                                <InputGroup.Suffix className="flex-none text-right sm:text-left sm:flex-1">Credits</InputGroup.Suffix>
                            </InputGroup>
                        </TextField>

                        {/* Package Selection */}
                        <Select
                            className="w-full sm:w-[65%]"
                            selectedKey={selectedPackageId}
                            onSelectionChange={handleSelectionChange}
                            isDisabled={!isEnabled}
                            placeholder="Select amount to add"
                            aria-label="Select amount to buy"
                        >
                            <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">
                                Automatically buy
                            </Label>
                            <Select.Trigger className="bg-background-secondary border-transparent">
                                <Select.Value className="text-foreground w-full">
                                    {({ selectedItems }) => {
                                        interface SelectedNode {
                                            key: string | number;
                                            textValue?: string;
                                        }
                                        const item = selectedItems[0] as unknown as SelectedNode;
                                        if (!item) return null;

                                        const itemKey = String(item.key);
                                        if (itemKey === 'custom') return <span className="italic">Custom Amount...</span>;

                                        const pkg = CREDIT_PACKAGES.find(p => p.id === itemKey);
                                        if (!pkg) return item.textValue;

                                        return (
                                            <div className="flex items-center justify-between w-full gap-2 pr-1">
                                                <span className="font-normal">{pkg.credits.toLocaleString()} Credits</span>
                                                <div className="flex items-center gap-2">
                                                    {pkg.label && (
                                                        <Chip variant="soft" color="success" size="sm" className={CHIP_BADGE_STYLE}>
                                                            {pkg.label}
                                                        </Chip>
                                                    )}
                                                    {pkg.discount && (
                                                        <Chip variant="soft" color="success" size="sm" className={cn(CHIP_BADGE_STYLE, "bg-success-soft text-success")}>
                                                            -{pkg.discount}
                                                        </Chip>
                                                    )}
                                                    <span className="font-semibold">${pkg.price}</span>
                                                </div>
                                            </div>
                                        );
                                    }}
                                </Select.Value>
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Section>
                                        <Header>Standard Packages</Header>
                                        {CREDIT_PACKAGES.map((pkg: CreditPackage) => (
                                            <ListBox.Item
                                                id={pkg.id}
                                                key={pkg.id}
                                                textValue={`${pkg.credits.toLocaleString()} Credits - $${pkg.price}`}
                                            >
                                                <div className="flex justify-between items-center w-full gap-4">
                                                    <span className="font-normal whitespace-nowrap">{pkg.credits.toLocaleString()} Credits</span>
                                                    <div className="flex items-center gap-2">
                                                        {pkg.label && (
                                                            <Chip variant="soft" color="success" size="sm" className={CHIP_BADGE_STYLE}>{pkg.label}</Chip>
                                                        )}
                                                        {pkg.discount && (
                                                            <Chip variant="soft" color="success" size="sm" className={cn(CHIP_BADGE_STYLE, "bg-success-soft text-success")}>
                                                                -{pkg.discount}
                                                            </Chip>
                                                        )}
                                                        {pkg.originalPrice > pkg.price && (
                                                            <span className="text-xs text-muted-foreground line-through">${pkg.originalPrice}</span>
                                                        )}
                                                        <span className="text-foreground font-bold">${pkg.price}</span>
                                                    </div>
                                                </div>
                                            </ListBox.Item>
                                        ))}
                                    </ListBox.Section>
                                    <ListBox.Section>
                                        <Header>Custom</Header>
                                        <ListBox.Item id="custom" textValue="Custom Amount...">
                                            <span className="font-medium italic">Custom Amount...</span>
                                        </ListBox.Item>
                                    </ListBox.Section>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Conditional Custom Amount Input */}
                    {isCustomSelected && (
                        <div className="animate-in slide-in-from-top-2 fade-in duration-300">
                            <TextField
                                value={customCredits === 0 ? '' : customCredits.toLocaleString()}
                                onChange={(val) => {
                                    const rawValue = val.replace(/[^0-9]/g, '');
                                    const numValue = rawValue === '' ? 0 : parseInt(rawValue);
                                    setCustomCredits(numValue);
                                }}
                                className="w-full"
                            >
                                <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">
                                    Custom Amount to Buy
                                </Label>
                                <InputGroup>
                                    <InputGroup.Input />
                                    <InputGroup.Suffix>Credits</InputGroup.Suffix>
                                </InputGroup>
                                <p className="text-xs text-muted-foreground mt-1.5 ml-1">
                                    Min 50. Rate: ~16 credits/$1. Estimated cost: <span className="font-medium text-foreground">${(customCredits / 16).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </p>
                            </TextField>
                        </div>
                    )}
                </div>

                {/* 3. Guardrail: Monthly Spend Limit */}
                <div className="bg-background-secondary rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-3">
                        <Label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 opacity-80">
                            <Icon icon="gravity-ui:shield-check" className="text-muted-foreground" />
                            Monthly Spend Limit
                        </Label>
                        <Switch
                            size="sm"
                            isSelected={hasMonthlyCap}
                            onChange={setHasMonthlyCap}
                            isDisabled={!isEnabled}
                            aria-label="Toggle Monthly Spend Limit"
                        >
                            <Switch.Control>
                                <Switch.Thumb />
                            </Switch.Control>
                        </Switch>
                    </div>

                    {hasMonthlyCap && (
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                            <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                                Don't exceed:
                            </span>
                            <NumberField
                                defaultValue={500}
                                formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
                                className="flex-1"
                                isDisabled={!isEnabled}
                            >
                                <NumberField.Group className="h-9 bg-surface border-border shadow-sm">
                                    <NumberField.Input className="text-sm font-medium" />
                                </NumberField.Group>
                            </NumberField>
                        </div>
                    )}
                </div>
            </Card.Content>


        </Card>
    );
}
