import { useState, Fragment, type FormEvent } from 'react';
import { Card, Button, Form, TextField, Label, Input, Separator, ComboBox, ListBox, Header } from '@heroui/react';
import type { BillingDetails } from '@/types/billing';
import { COUNTRY_REGIONS } from '@/data/countries';

interface BillingDetailsCardProps {
    details: BillingDetails | null;
}

export function BillingDetailsCard({ details }: BillingDetailsCardProps) {
    const [formData, setFormData] = useState<BillingDetails | null>(details);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (field: keyof BillingDetails, value: string) => {
        if (!formData) return;
        setFormData({ ...formData, [field]: value });
    };

    const handleAddressChange = (field: keyof BillingDetails['address'], value: string) => {
        if (!formData) return;
        setFormData({
            ...formData,
            address: { ...formData.address, [field]: value }
        });
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        // In a real app, this would refresh the data via a provider or success toast
    };

    if (!formData) return null;

    const labelClasses = "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block";

    return (
        <Card className="h-full">
            <Card.Header className="flex flex-col items-start pb-2">
                <h3 className="text-base font-semibold text-foreground">Billing Details</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Used for invoices and tax purposes. Please ensure this information is accurate.
                </p>
            </Card.Header>
            <Separator className="bg-separator/50" />
            <Card.Content className="pt-6">
                <Form onSubmit={handleSave} className="flex flex-col gap-8">
                    {/* Primary Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <TextField
                            value={formData.invoiceEmail}
                            onChange={(v) => handleChange('invoiceEmail', v)}
                            isRequired
                            className="w-full"
                        >
                            <Label className={labelClasses}>
                                Invoice Email
                            </Label>
                            <Input type="email" placeholder="billing@company.com" />
                        </TextField>

                        <TextField
                            value={formData.companyName || ''}
                            onChange={(v) => handleChange('companyName', v)}
                            className="w-full"
                        >
                            <Label className={labelClasses}>
                                Company Name
                            </Label>
                            <Input placeholder="Company Inc." />
                        </TextField>

                        <TextField
                            value={formData.vatNumber || ''}
                            onChange={(v) => handleChange('vatNumber', v)}
                            className="w-full"
                        >
                            <Label className={labelClasses}>
                                VAT Number
                            </Label>
                            <Input placeholder="GB123456789" />
                        </TextField>

                        <TextField
                            value={formData.costCentre || ''}
                            onChange={(v) => handleChange('costCentre', v)}
                            className="w-full"
                        >
                            <Label className={labelClasses}>
                                Cost Centre
                            </Label>
                            <Input placeholder="Marketing" />
                        </TextField>

                        <TextField
                            value={formData.poNumber || ''}
                            onChange={(v) => handleChange('poNumber', v)}
                            className="w-full"
                        >
                            <Label className={labelClasses}>
                                PO Number
                            </Label>
                            <Input placeholder="PO-123456" />
                        </TextField>
                    </div>

                    <Separator className="bg-separator/50" />

                    {/* Address Section */}
                    <div>
                        <Label className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 block">
                            Billing Address
                        </Label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField
                                value={formData.address.line1}
                                onChange={(v) => handleAddressChange('line1', v)}
                                isRequired
                                className="w-full md:col-span-2"
                            >
                                <Label className={labelClasses}>
                                    Address Line 1
                                </Label>
                                <Input placeholder="123 Business St" />
                            </TextField>

                            <TextField
                                value={formData.address.line2 || ''}
                                onChange={(v) => handleAddressChange('line2', v)}
                                className="w-full md:col-span-2"
                            >
                                <Label className={labelClasses}>
                                    Address Line 2 (Optional)
                                </Label>
                                <Input placeholder="Suite 456" />
                            </TextField>

                            <TextField
                                value={formData.address.city}
                                onChange={(v) => handleAddressChange('city', v)}
                                isRequired
                                className="w-full"
                            >
                                <Label className={labelClasses}>
                                    City
                                </Label>
                                <Input placeholder="London" />
                            </TextField>

                            <TextField
                                value={formData.address.postalCode}
                                onChange={(val) => handleAddressChange('postalCode', val)}
                                isRequired
                                className="w-full"
                            >
                                <Label className={labelClasses}>
                                    Postal Code
                                </Label>
                                <Input placeholder="EC1A 1BB" />
                            </TextField>

                            <ComboBox
                                className="w-full md:col-span-2"
                                selectedKey={formData.address.country}
                                onSelectionChange={(key) => handleAddressChange('country', key as string)}
                            >
                                <Label className={labelClasses}>Country</Label>
                                <ComboBox.InputGroup>
                                    <Input placeholder="Search countries..." />
                                    <ComboBox.Trigger />
                                </ComboBox.InputGroup>
                                <ComboBox.Popover>
                                    <ListBox>
                                        {COUNTRY_REGIONS.map((region, index) => (
                                            <Fragment key={region.name}>
                                                <Header className="px-2 py-1 text-xs font-bold text-muted-foreground uppercase bg-default-50/50">{region.name}</Header>
                                                {region.countries.map((country) => (
                                                    <ListBox.Item key={country.id} textValue={country.name} id={country.id}>
                                                        {country.name}
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                ))}
                                                {index < COUNTRY_REGIONS.length - 1 && <Separator />}
                                            </Fragment>
                                        ))}
                                    </ListBox>
                                </ComboBox.Popover>
                            </ComboBox>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-separator/50">
                        <Button
                            type="submit"
                            variant="primary"
                            isPending={isSaving}
                            className="font-semibold px-10"
                        >
                            Save Details
                        </Button>
                    </div>
                </Form>
            </Card.Content>
        </Card>
    );
}
