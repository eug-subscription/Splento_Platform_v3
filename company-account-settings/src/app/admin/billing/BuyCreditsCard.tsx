import { useState, useMemo } from 'react';
import {
    Card,
    Button,
    RadioGroup,
    Radio,
    Chip,
    TextField,
    InputGroup,
    Separator,
    cn
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { CREDIT_PACKAGES, CHIP_BADGE_STYLE } from "@/data/billing-constants";

interface BuyCreditsCardProps {
    className?: string;
}

export function BuyCreditsCard({ className }: BuyCreditsCardProps) {
    const [selectedPackageId, setSelectedPackageId] = useState<string>(CREDIT_PACKAGES[1].id);
    const [customCredits, setCustomCredits] = useState<number>(1000);
    const [isBuying, setIsBuying] = useState(false);

    const handleSelectionChange = (id: string) => {
        setSelectedPackageId(id);
    };

    const selectedPackage = useMemo(() =>
        CREDIT_PACKAGES.find(p => p.id === selectedPackageId),
        [selectedPackageId]);

    const purchaseCredits = selectedPackageId === 'custom' ? customCredits : (selectedPackage?.credits || 0);
    const purchaseAmount = selectedPackageId === 'custom' ? customCredits / 16 : (selectedPackage?.price || 0);

    const handleBuy = async () => {
        setIsBuying(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsBuying(false);
    };

    return (
        <Card className={cn("h-full", className)}>
            <Card.Header className="flex flex-col items-start gap-1 pb-2">
                <div className="flex items-center gap-2">
                    <Icon icon="gravity-ui:shopping-bag" className="text-muted-foreground" />
                    <h3 className="text-base font-semibold text-foreground">Buy Usage Credits</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                    Get access to more generations. Credits never expire and can be used anytime.
                </p>
            </Card.Header>

            <Separator className="bg-separator/50" />

            <Card.Content className="pt-6">
                <RadioGroup
                    value={selectedPackageId}
                    onChange={(val) => handleSelectionChange(val as string)}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    aria-label="Select credit package"
                >
                    {CREDIT_PACKAGES.map((pkg) => (
                        <Radio
                            key={pkg.id}
                            value={pkg.id}
                            className={cn(
                                "group/radio relative flex m-0 bg-content2 hover:bg-content3 items-start justify-between",
                                "cursor-pointer rounded-xl gap-4 p-4 border-2 border-transparent transition-all",
                                "data-[selected=true]:border-accent data-[selected=true]:bg-accent-soft",
                                "w-full min-h-[160px]"
                            )}
                        >
                            <Radio.Content className="flex-1 flex flex-col justify-between h-full gap-4 min-w-0">
                                {/* Top: Quantity Info */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 flex-wrap min-h-8">
                                        <span className="font-bold text-2xl tracking-tight leading-tight">{pkg.credits.toLocaleString()}</span>
                                        {pkg.label && (
                                            <Chip variant="soft" color="success" size="sm" className={cn(CHIP_BADGE_STYLE, "translate-y-[-1px]")}>
                                                {pkg.label}
                                            </Chip>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">Credits</span>
                                </div>

                                {/* Bottom: Price Info */}
                                <div className="flex flex-col gap-1 mt-auto">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-bold text-xl leading-none">${pkg.price}</span>
                                        {pkg.originalPrice > pkg.price && (
                                            <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">${pkg.originalPrice}</span>
                                        )}
                                        {pkg.discount && (
                                            <Chip variant="soft" color="success" size="sm" className={cn(CHIP_BADGE_STYLE, "bg-success-soft text-success")}>
                                                -{pkg.discount}
                                            </Chip>
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-medium tracking-tight">
                                        $1 = {pkg.rate} credits
                                    </div>
                                </div>
                            </Radio.Content>
                            <Radio.Control className="mt-1">
                                <Radio.Indicator className="text-midnight" />
                            </Radio.Control>
                        </Radio>
                    ))}

                    <Radio
                        value="custom"
                        className={cn(
                            "group/radio relative flex m-0 bg-content2 hover:bg-content3 items-start justify-between",
                            "cursor-pointer rounded-xl gap-4 p-4 border-2 border-transparent transition-all",
                            "data-[selected=true]:border-accent data-[selected=true]:bg-accent-soft",
                            "w-full min-h-[160px]"
                        )}
                    >
                        <Radio.Content className="flex-1 flex flex-col justify-between h-full gap-4 min-w-0">
                            {/* Top: Title */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center min-h-8">
                                    <span className="font-bold text-lg tracking-tight leading-tight">Custom Amount</span>
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">Credits</span>
                            </div>

                            {/* Bottom: Input area */}
                            <div className="flex flex-col gap-2 mt-auto">
                                <div
                                    className="animate-in fade-in slide-in-from-top-1 w-full"
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onMouseUp={(e) => e.stopPropagation()}
                                >
                                    <TextField
                                        value={customCredits === 0 ? '' : customCredits.toLocaleString()}
                                        onChange={(val) => {
                                            const rawValue = val.replace(/[^0-9]/g, '');
                                            const numValue = rawValue === '' ? 0 : parseInt(rawValue);
                                            setCustomCredits(numValue);
                                            if (selectedPackageId !== 'custom') {
                                                handleSelectionChange('custom');
                                            }
                                        }}
                                        aria-label="Custom credit amount"
                                        className="w-full"
                                    >
                                        <InputGroup className="bg-background border-border h-9 shadow-sm w-fit max-w-full">
                                            <InputGroup.Input className="font-semibold text-sm w-24" />
                                            <InputGroup.Suffix className="text-xs font-semibold text-muted-foreground pr-2 whitespace-nowrap">Credits</InputGroup.Suffix>
                                        </InputGroup>
                                    </TextField>
                                </div>
                                <p className="text-xs text-muted-foreground font-medium pl-0.5">
                                    Min 50. Rate: 16/$1
                                </p>
                            </div>
                        </Radio.Content>
                        <Radio.Control className="mt-1">
                            <Radio.Indicator className="text-midnight" />
                        </Radio.Control>
                    </Radio>
                </RadioGroup>
            </Card.Content>

            <Card.Footer className="bg-transparent border-t border-border py-4">
                <Button
                    variant="primary"
                    className="w-full font-bold"
                    onPress={handleBuy}
                    isPending={isBuying}
                >
                    Buy {purchaseCredits.toLocaleString()} Credits for ${purchaseAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </Button>
            </Card.Footer>
        </Card >
    );
}
