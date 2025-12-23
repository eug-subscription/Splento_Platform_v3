import { Card, TextField, Label, Input } from "@heroui/react";

interface CompanyInfoSectionProps {
    companyInfo: {
        companyName: string;
        companyEmail: string;
        coordinatorEmail: string;
        phone: string;
        vatNumber: string;
    };
    setCompanyInfo: (info: any) => void;
}

export function CompanyInfoSection({ companyInfo, setCompanyInfo }: CompanyInfoSectionProps) {
    return (
        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
            <Card.Header className="pb-0 pt-2 px-2">
                <Card.Title className="text-base font-semibold">
                    Identity
                </Card.Title>
                <p className="text-sm text-foreground/50 mt-1">Core company information and contact details.</p>
            </Card.Header>

            <Card.Content className="p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField name="companyName" className="w-full">
                        <Label>Company Name</Label>
                        <Input
                            placeholder="Enter company name"
                            value={companyInfo.companyName}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                        />
                    </TextField>

                    <TextField name="companyEmail" className="w-full">
                        <Label>Company E-mail</Label>
                        <Input
                            type="email"
                            placeholder="company@example.com"
                            value={companyInfo.companyEmail}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, companyEmail: e.target.value })}
                        />
                    </TextField>

                    <TextField name="coordinatorEmail" className="w-full">
                        <Label>Coordinator E-mail</Label>
                        <Input
                            type="email"
                            placeholder="coordinator@example.com"
                            value={companyInfo.coordinatorEmail}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, coordinatorEmail: e.target.value })}
                        />
                    </TextField>

                    <TextField name="phone" className="w-full">
                        <Label>Phone</Label>
                        <Input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={companyInfo.phone}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                        />
                    </TextField>

                    <TextField name="vatNumber" className="md:col-span-2 w-full">
                        <Label>VAT Number</Label>
                        <Input
                            placeholder="Enter VAT number"
                            value={companyInfo.vatNumber}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, vatNumber: e.target.value })}
                        />
                    </TextField>
                </div>
            </Card.Content>
        </Card>
    );
}
