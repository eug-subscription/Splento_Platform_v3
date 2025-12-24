import React from 'react';
import { Card, TextField, Label, Input, ComboBox, ListBox, Header, Separator } from "@heroui/react";
import { COUNTRY_REGIONS } from '../../../data/countries';

interface BillingSectionProps {
    unpaidInvoicesLimit: string;
    setUnpaidInvoicesLimit: (limit: string) => void;
    billingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    setBillingAddress: (address: any) => void;
}

export function BillingSection({ unpaidInvoicesLimit, setUnpaidInvoicesLimit, billingAddress, setBillingAddress }: BillingSectionProps) {
    return (
        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
            <Card.Header className="pb-0 pt-2 px-2">
                <Card.Title className="text-base font-semibold">
                    Billing & Invoices
                </Card.Title>
            </Card.Header>

            <Card.Content className="p-2">
                <div className="space-y-4">
                    <TextField name="unpaidInvoicesLimit" className="w-full">
                        <Label>Limit on unpaid invoices</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            value={unpaidInvoicesLimit}
                            onChange={(e) => setUnpaidInvoicesLimit(e.target.value)}
                        />
                    </TextField>

                    <TextField name="street" className="w-full">
                        <Label>Street Address</Label>
                        <Input
                            placeholder="123 Main St"
                            value={billingAddress.street}
                            onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
                        />
                    </TextField>

                    <TextField name="city" className="w-full">
                        <Label>City</Label>
                        <Input
                            placeholder="San Francisco"
                            value={billingAddress.city}
                            onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                        />
                    </TextField>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField name="state" className="w-full">
                            <Label>State/Province</Label>
                            <Input
                                placeholder="CA"
                                value={billingAddress.state}
                                onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                            />
                        </TextField>

                        <TextField name="postalCode" className="w-full">
                            <Label>Postal Code</Label>
                            <Input
                                placeholder="94102"
                                value={billingAddress.postalCode}
                                onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
                            />
                        </TextField>
                    </div>


                    <ComboBox
                        className="w-full"
                        selectedKey={billingAddress.country}
                        onSelectionChange={(key) => setBillingAddress({ ...billingAddress, country: key as string })}
                    >
                        <Label>Country</Label>
                        <ComboBox.InputGroup>
                            <Input placeholder="Search countries..." />
                            <ComboBox.Trigger />
                        </ComboBox.InputGroup>
                        <ComboBox.Popover>
                            <ListBox>
                                {COUNTRY_REGIONS.map((region, index) => (
                                    <React.Fragment key={region.name}>
                                        <Header>{region.name}</Header>
                                        {region.countries.map((country) => (
                                            <ListBox.Item key={country.id} textValue={country.name} id={country.id}>
                                                {country.name}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                        {index < COUNTRY_REGIONS.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                            </ListBox>
                        </ComboBox.Popover>
                    </ComboBox>
                </div>
            </Card.Content>
        </Card>
    );
}
