import { useState } from 'react';
import { Button, CloseButton } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Chip } from '../../components/ui/chip';
import { Modal } from '../../components/ui/modal';
import { AlertDialog } from '../../components/ui/alert-dialog';
import { Avatar, Description, Surface } from "@heroui/react";
import { Label } from "../../components/ui/label";
import { Icon } from '@iconify/react';
import { CustomCheckbox } from '../../components/admin/CustomCheckbox';
import { RoleSelect } from '../../components/admin/RoleSelect';
import { AutorenameSelect } from '../../components/admin/AutorenameSelect';
import { FormTextField } from '../../components/admin/FormTextField';
import { CountrySelect } from '../../components/admin/CountrySelect';
import { TextField } from '../../components/ui/text-field';
import { InputGroup } from '../../components/ui/input-group';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import type { Manager } from '../../types';

export default function AccountSettings() {
    // ========== STATE MANAGEMENT ==========

    // Managers state
    const [managers, setManagers] = useState<Manager[]>([
        { id: '1', name: 'John Smith', email: 'john.smith@company.com', role: 'Admin' },
        { id: '2', name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Edit' },
        { id: '3', name: 'Mike Davis', email: 'mike.d@company.com', role: 'Read Only' }
    ]);


    // New manager form state
    const [newManager, setNewManager] = useState({
        name: '',
        email: '',
        role: 'Edit' as Manager['role']
    });

    // Company info state
    const [companyInfo, setCompanyInfo] = useState({
        companyName: '',
        companyEmail: '',
        coordinatorEmail: '',
        phone: '',
        vatNumber: ''
    });

    // Settings states
    const [autorenameMode, setAutorenameMode] = useState('external-id');
    const [unpaidInvoicesLimit, setUnpaidInvoicesLimit] = useState('');
    const [mailSettings, setMailSettings] = useState({
        disableAllEmails: false,
        sendChatNotifications: true
    });
    const [fileNamePrefixes, setFileNamePrefixes] = useState({
        webAppPhotography: true,
        professionalPhotography: true
    });
    const [prebookingSettings, setPrebookingSettings] = useState({
        enableSessionDateInCSV: true
    });
    const [otherSettings, setOtherSettings] = useState({
        showPhotographerDetails: false
    });
    const [billingAddress, setBillingAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });
    const [socialLinks, setSocialLinks] = useState({
        website: '',
        linkedin: '',
        instagram: '',
        twitter: '',
        facebook: ''
    });
    const [tags, setTags] = useState<string[]>(['Enterprise', 'VIP', 'Regular']);
    const [tagInput, setTagInput] = useState('');

    // ========== HANDLERS ==========

    const handleRoleChange = (managerId: string, newRole: string) => {
        setManagers(prevManagers =>
            prevManagers.map(manager =>
                manager.id === managerId ? { ...manager, role: newRole as Manager['role'] } : manager
            )
        );
    };

    const handleDeleteManager = (managerId: string) => {
        setManagers(prevManagers =>
            prevManagers.filter(m => m.id !== managerId)
        );
    };

    const handleAddManager = () => {
        if (newManager.name && newManager.email) {
            const id = (managers.length + 1).toString();
            setManagers([...managers, { ...newManager, id }]);
            setNewManager({ name: '', email: '', role: 'Read Only' });
        }
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSave = () => {
        const allData = {
            companyInfo,
            autorenameMode,
            unpaidInvoicesLimit,
            mailSettings,
            fileNamePrefixes,
            prebookingSettings,
            otherSettings,
            managers,
            billingAddress,
            socialLinks,
            tags
        };
        console.log('Saving data:', allData);
    };

    // Helper to get initials for Avatar
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // ========== RENDER ==========

    return (
        <div className="min-h-screen bg-background py-10 font-sans text-foreground">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                {/* ========== PAGE HEADER ========== */}
                <div className="flex flex-row justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-foreground">
                            Company Account
                        </h1>
                        <p className="text-foreground/50 mt-1">Manage company details, preferences, and team members.</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <ThemeSwitcher />
                        <Button variant="secondary">Discard</Button>
                        <Button variant="primary" onPress={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>

                {/* ========== 2-COLUMN GRID LAYOUT ========== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ========== LEFT COLUMN (Span 2) ========== */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* ========== BASIC INFORMATION CARD ========== */}
                        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                            <Card.Header className="pb-0 pt-2 px-2">
                                <Card.Title className="text-base font-semibold">
                                    Identity
                                </Card.Title>
                                <p className="text-sm text-foreground/50 mt-1">Core company information and contact details.</p>
                            </Card.Header>

                            <Card.Content className="p-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormTextField
                                        label="Company Name"
                                        name="companyName"
                                        placeholder="Enter company name"
                                        value={companyInfo.companyName}
                                        onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                                    />

                                    <FormTextField
                                        label="Company E-mail"
                                        name="companyEmail"
                                        type="email"
                                        placeholder="company@example.com"
                                        value={companyInfo.companyEmail}
                                        onChange={(e) => setCompanyInfo({ ...companyInfo, companyEmail: e.target.value })}
                                    />

                                    <FormTextField
                                        label="Coordinator E-mail"
                                        name="coordinatorEmail"
                                        type="email"
                                        placeholder="coordinator@example.com"
                                        value={companyInfo.coordinatorEmail}
                                        onChange={(e) => setCompanyInfo({ ...companyInfo, coordinatorEmail: e.target.value })}
                                    />

                                    <FormTextField
                                        label="Phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        value={companyInfo.phone}
                                        onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                                    />

                                    <FormTextField
                                        label="VAT Number"
                                        name="vatNumber"
                                        placeholder="Enter VAT number"
                                        value={companyInfo.vatNumber}
                                        onChange={(e) => setCompanyInfo({ ...companyInfo, vatNumber: e.target.value })}
                                        className="md:col-span-2 w-full"
                                    />
                                </div>
                            </Card.Content>
                        </Card>

                        {/* ========== BILLING & INVOICES CARD ========== */}
                        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                            <Card.Header className="pb-0 pt-2 px-2">
                                <Card.Title className="text-base font-semibold">
                                    Billing & Invoices
                                </Card.Title>
                            </Card.Header>

                            <Card.Content className="p-2">
                                <div className="space-y-4">
                                    <FormTextField
                                        label="Limit on unpaid invoices"
                                        name="unpaidInvoicesLimit"
                                        type="number"
                                        placeholder="0"
                                        value={unpaidInvoicesLimit}
                                        onChange={(e) => setUnpaidInvoicesLimit(e.target.value)}
                                    />

                                    <FormTextField
                                        label="Street Address"
                                        name="street"
                                        placeholder="123 Main St"
                                        value={billingAddress.street}
                                        onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
                                    />

                                    <FormTextField
                                        label="City"
                                        name="city"
                                        placeholder="San Francisco"
                                        value={billingAddress.city}
                                        onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormTextField
                                            label="State/Province"
                                            name="state"
                                            placeholder="CA"
                                            value={billingAddress.state}
                                            onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                                        />

                                        <FormTextField
                                            label="Postal Code"
                                            name="postalCode"
                                            placeholder="94102"
                                            value={billingAddress.postalCode}
                                            onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
                                        />
                                    </div>


                                    <CountrySelect
                                        value={billingAddress.country}
                                        onChange={(country) => setBillingAddress({ ...billingAddress, country })}
                                    />
                                </div>
                            </Card.Content>
                        </Card>

                        {/* ========== FILE SETTINGS CARD ========== */}
                        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                            <Card.Header className="pb-0 pt-2 px-2">
                                <Card.Title className="text-base font-semibold">
                                    File Processing & Naming
                                </Card.Title>
                                <p className="text-sm text-foreground/50 mt-1">Configure how files are handled and named automatically.</p>
                            </Card.Header>

                            <Card.Content className="p-2 space-y-6">
                                {/* Autorename Mode Dropdown */}
                                <AutorenameSelect
                                    value={autorenameMode}
                                    onChange={setAutorenameMode}
                                />

                                {/* File Name Prefixes */}
                                <div>
                                    <div className="block text-sm font-medium text-foreground/90">
                                        File Name Prefix Applies To
                                    </div>
                                    <p className="text-xs text-foreground/50 mb-3">
                                        Select which types of orders should receive an automatic name prefix.
                                    </p>
                                    <div className="flex flex-row gap-6">
                                        <CustomCheckbox
                                            isSelected={fileNamePrefixes.webAppPhotography}
                                            onChange={(isSelected: boolean) => setFileNamePrefixes({ ...fileNamePrefixes, webAppPhotography: isSelected })}
                                            label="WebApp photography"
                                        />

                                        <CustomCheckbox
                                            isSelected={fileNamePrefixes.professionalPhotography}
                                            onChange={(isSelected: boolean) => setFileNamePrefixes({ ...fileNamePrefixes, professionalPhotography: isSelected })}
                                            label="Professional photography"
                                        />
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>

                        {/* ========== COMPANY MANAGERS CARD ========== */}
                        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                            <Card.Header className="flex flex-row justify-between items-center pb-0 pt-2 px-2">
                                <div className="flex flex-col">
                                    <Card.Title className="text-base font-semibold">
                                        Company Managers
                                    </Card.Title>
                                    <p className="text-sm text-foreground/50 mt-1">Manage access and permissions for your team members.</p>
                                </div>
                                <Modal>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        aria-label="Add new manager"
                                    >
                                        <Icon icon="gravity-ui:plus" className="w-4 h-4 mr-1" />
                                        Add Manager
                                    </Button>
                                    <Modal.Container placement="auto" variant="blur" backdropClassName="backdrop-blur-sm">
                                        <Modal.Dialog className="sm:max-w-md">
                                            {({ close }) => (
                                                <>
                                                    <Modal.CloseTrigger aria-label="Close modal" />
                                                    <Modal.Header>
                                                        <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                                            <Icon className="size-5" icon="gravity-ui:user-plus" />
                                                        </Modal.Icon>
                                                        <Modal.Heading>Add New Manager</Modal.Heading>
                                                        <p className="text-muted mt-1.5 text-sm leading-5">
                                                            Add a new manager to the account with the appropriate permissions.
                                                        </p>
                                                    </Modal.Header>
                                                    <Modal.Body className="p-6">
                                                        <Surface variant="default">
                                                            <form className="flex flex-col gap-4">
                                                                <FormTextField
                                                                    label="Name *"
                                                                    name="name"
                                                                    placeholder="Enter manager name"
                                                                    value={newManager.name}
                                                                    onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
                                                                    isInvalid={newManager.name.length > 0 && newManager.name.length < 2}
                                                                    errorMessage="Name must be at least 2 characters"
                                                                />

                                                                <FormTextField
                                                                    label="Email *"
                                                                    name="email"
                                                                    type="email"
                                                                    placeholder="manager@company.com"
                                                                    value={newManager.email}
                                                                    onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
                                                                    isInvalid={newManager.email.length > 0 && !newManager.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)}
                                                                    errorMessage="Please enter a valid email address"
                                                                />

                                                                <RoleSelect
                                                                    value={newManager.role}
                                                                    onChange={(role) => setNewManager({ ...newManager, role })}
                                                                    label="Role *"
                                                                />
                                                            </form>
                                                        </Surface>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="tertiary" onPress={close}>
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="primary"
                                                            onPress={() => {
                                                                handleAddManager();
                                                                close();
                                                            }}
                                                            isDisabled={
                                                                !newManager.name ||
                                                                newManager.name.length < 2 ||
                                                                !newManager.email ||
                                                                !newManager.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                                                            }
                                                        >
                                                            Add Manager
                                                        </Button>
                                                    </Modal.Footer>
                                                </>
                                            )}
                                        </Modal.Dialog>
                                    </Modal.Container>
                                </Modal>
                            </Card.Header>

                            <Card.Content className="p-0 mt-4">
                                {/* Managers Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-default-100">
                                        <thead className="bg-default-100/50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                                    Role
                                                </th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-background divide-y divide-default-100">
                                            {managers.map((manager) => (
                                                <tr key={manager.id} className="hover:bg-default-100/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar size="sm">
                                                                <Avatar.Fallback>{getInitials(manager.name)}</Avatar.Fallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <Label>{manager.name}</Label>
                                                                <Description>{manager.email}</Description>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <RoleSelect
                                                            value={manager.role}
                                                            onChange={(role) => handleRoleChange(manager.id, role)}
                                                            className="w-32"
                                                            label=""
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                            <AlertDialog>
                                                                <Button
                                                                    isIconOnly
                                                                    variant="danger"
                                                                    size="sm"
                                                                    aria-label="Delete manager"
                                                                >
                                                                    <Icon icon="gravity-ui:trash-bin" className="w-4 h-4" />
                                                                </Button>
                                                                <AlertDialog.Container backdropVariant="blur">
                                                                    <AlertDialog.Dialog>
                                                                        {({ close }) => (
                                                                            <>
                                                                                <AlertDialog.Header>
                                                                                    <AlertDialog.Icon status="danger">
                                                                                        <Icon icon="gravity-ui:trash-bin" className="w-5 h-5" />
                                                                                    </AlertDialog.Icon>
                                                                                    <AlertDialog.Heading>Delete Manager?</AlertDialog.Heading>
                                                                                </AlertDialog.Header>
                                                                                <AlertDialog.Body>
                                                                                    <p>
                                                                                        Are you sure you want to remove <strong>{manager.name}</strong>? This action cannot be undone.
                                                                                    </p>
                                                                                </AlertDialog.Body>
                                                                                <AlertDialog.Footer>
                                                                                    <Button variant="tertiary" onPress={close}>
                                                                                        Cancel
                                                                                    </Button>
                                                                                    <Button variant="danger" onPress={() => { handleDeleteManager(manager.id); close(); }}>
                                                                                        Delete
                                                                                    </Button>
                                                                                </AlertDialog.Footer>
                                                                            </>
                                                                        )}
                                                                    </AlertDialog.Dialog>
                                                                </AlertDialog.Container>
                                                            </AlertDialog>
                                                        </td>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Content>
                        </Card>

                    </div>

                    {/* ========== RIGHT COLUMN (Span 1) ========== */}
                    <div className="space-y-6">

                        {/* ========== MAIL SETTINGS CARD ========== */}
                        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                            <Card.Header className="pb-0 pt-2 px-2">
                                <Card.Title className="text-base font-semibold">
                                    Mail Configuration
                                </Card.Title>
                            </Card.Header>

                            <Card.Content className="p-2">
                                <div className="space-y-3">
                                    <CustomCheckbox
                                        isSelected={mailSettings.disableAllEmails}
                                        onChange={(isSelected: boolean) => setMailSettings({ ...mailSettings, disableAllEmails: isSelected })}
                                        label="Disable all enterprise emails"
                                        description="Stop all automated system emails."
                                    />

                                    <CustomCheckbox
                                        isSelected={mailSettings.sendChatNotifications}
                                        onChange={(isSelected: boolean) => setMailSettings({ ...mailSettings, sendChatNotifications: isSelected })}
                                        label="Chat notifications"
                                        description="Send emails for new chat messages."
                                    />
                                </div>
                            </Card.Content>
                        </Card>

                        {/* ========== PREBOOKING FILES CARD ========== */}
                        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                            <Card.Header className="pb-0 pt-2 px-2">
                                <Card.Title className="text-base font-semibold">
                                    Prebooking Files
                                </Card.Title>
                            </Card.Header>

                            <Card.Content className="p-2">
                                <CustomCheckbox
                                    isSelected={prebookingSettings.enableSessionDateInCSV}
                                    onChange={(isSelected: boolean) => setPrebookingSettings({ ...prebookingSettings, enableSessionDateInCSV: isSelected })}
                                    label="Enable session date in CSV"
                                    description="Includes the session date column in exported CSVs."
                                />
                            </Card.Content>
                        </Card>

                        {/* ========== OTHER SETTINGS CARD ========== */}
                        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                            <Card.Header className="pb-0 pt-2 px-2">
                                <Card.Title className="text-base font-semibold">
                                    Display Settings
                                </Card.Title>
                            </Card.Header>

                            <Card.Content className="p-2">
                                <CustomCheckbox
                                    isSelected={otherSettings.showPhotographerDetails}
                                    onChange={(isSelected: boolean) => setOtherSettings({ ...otherSettings, showPhotographerDetails: isSelected })}
                                    label="Show photographer details"
                                    description="Display assigned photographer info in business profile."
                                />
                            </Card.Content>
                        </Card>


                        {/* ========== COMPANY TAGS CARD ========== */}
                        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                            <Card.Header className="pb-0 pt-2 px-2">
                                <Card.Title className="text-base font-semibold">
                                    Company Tags
                                </Card.Title>
                                <p className="text-sm text-foreground/50 mt-1">Categorise this company with custom tags.</p>
                            </Card.Header>

                            <Card.Content className="p-2">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {tags.map((tag, index) => (
                                        <Chip
                                            key={index}
                                            size="sm"
                                            variant="secondary"
                                            className="pl-2"
                                        >
                                            {tag}
                                            <CloseButton onPress={() => handleRemoveTag(tag)}>
                                                <Icon icon="gravity-ui:xmark" />
                                            </CloseButton>
                                        </Chip>
                                    ))}
                                </div>
                                <TextField name="tagInput">
                                    <InputGroup>
                                        <InputGroup.Prefix>
                                            <Icon className="text-muted size-4" icon="mdi:plus" />
                                        </InputGroup.Prefix>
                                        <InputGroup.Input
                                            placeholder="Add tag"
                                            value={tagInput}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
                                            onKeyDown={handleAddTag}
                                        />
                                    </InputGroup>
                                </TextField>
                            </Card.Content>
                        </Card >

                        {/* ========== SOCIAL LINKS CARD ========== */}
                        <Card variant="default" className="rounded-large hover:shadow-md transition-shadow">
                            <Card.Header className="pb-0 pt-2 px-2">
                                <Card.Title className="text-base font-semibold">
                                    Social Links
                                </Card.Title>
                            </Card.Header>

                            <Card.Content className="p-2">
                                <div className="space-y-4">
                                    <TextField name="website" type="url">
                                        <Label>Website</Label>
                                        <InputGroup>
                                            <InputGroup.Prefix>
                                                <Icon className="text-muted size-4" icon="mdi:web" />
                                            </InputGroup.Prefix>
                                            <InputGroup.Input
                                                placeholder="https://www.example.com"
                                                value={socialLinks.website}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, website: e.target.value })}
                                            />
                                        </InputGroup>
                                    </TextField>

                                    <TextField name="linkedin" type="url">
                                        <Label>LinkedIn</Label>
                                        <InputGroup>
                                            <InputGroup.Prefix>
                                                <Icon className="text-muted size-4" icon="simple-icons:linkedin" />
                                            </InputGroup.Prefix>
                                            <InputGroup.Input
                                                placeholder="LinkedIn Profile"
                                                value={socialLinks.linkedin}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                                            />
                                        </InputGroup>
                                    </TextField>

                                    <TextField name="instagram" type="url">
                                        <Label>Instagram</Label>
                                        <InputGroup>
                                            <InputGroup.Prefix>
                                                <Icon className="text-muted size-4" icon="simple-icons:instagram" />
                                            </InputGroup.Prefix>
                                            <InputGroup.Input
                                                placeholder="Instagram profile"
                                                value={socialLinks.instagram || ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                                            />
                                        </InputGroup>
                                    </TextField>

                                    <TextField name="twitter" type="url">
                                        <Label>X</Label>
                                        <InputGroup>
                                            <InputGroup.Prefix>
                                                <Icon className="text-muted size-4" icon="simple-icons:x" />
                                            </InputGroup.Prefix>
                                            <InputGroup.Input
                                                placeholder="X profile"
                                                value={socialLinks.twitter}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                                            />
                                        </InputGroup>
                                    </TextField>

                                    <TextField name="facebook" type="url">
                                        <Label>Facebook</Label>
                                        <InputGroup>
                                            <InputGroup.Prefix>
                                                <Icon className="text-muted size-4" icon="simple-icons:facebook" />
                                            </InputGroup.Prefix>
                                            <InputGroup.Input
                                                placeholder="Facebook profile"
                                                value={socialLinks.facebook}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                                            />
                                        </InputGroup>
                                    </TextField>
                                </div>
                            </Card.Content>
                        </Card>
                    </div >
                </div >
            </div >

        </div >
    );
}
