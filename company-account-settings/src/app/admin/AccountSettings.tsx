import { useState } from 'react';
import { Button, CloseButton } from "@heroui/react";
import { Card } from "@heroui/react";



import React from 'react';
import { Avatar, Description, Surface, Label, TextField, Modal, Chip, InputGroup, AlertDialog, Input, FieldError, Checkbox, Select, ListBox, ComboBox, Header, Separator } from "@heroui/react";

import { Icon } from '@iconify/react';
import { COUNTRY_REGIONS } from '../../data/countries';


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
        // TODO: Implement actual save logic
        // This will send: companyInfo, autorenameMode, unpaidInvoicesLimit,
        // mailSettings, fileNamePrefixes, prebookingSettings, otherSettings,
        // managers, billingAddress, socialLinks, tags
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

                        {/* ========== BILLING & INVOICES CARD ========== */}
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
                                <Select
                                    selectedKey={autorenameMode}
                                    onSelectionChange={(key) => setAutorenameMode(key as string)}
                                >
                                    <Label>Autorename Mode</Label>
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="external-id" textValue="File names are based on External ID">
                                                File names are based on External ID
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="dish-name" textValue="File names are based on Dish Name">
                                                File names are based on Dish Name
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="external-id-dish-name" textValue="File names are based on External ID (first) / Dish name (second)">
                                                File names are based on External ID (first) / Dish name (second)
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                {/* File Name Prefixes */}
                                <div>
                                    <div className="block text-sm font-medium text-foreground/90">
                                        File Name Prefix Applies To
                                    </div>
                                    <p className="text-xs text-foreground/50 mb-3">
                                        Select which types of orders should receive an automatic name prefix.
                                    </p>
                                    <div className="flex flex-row gap-6">
                                        <Checkbox
                                            isSelected={fileNamePrefixes.webAppPhotography}
                                            onChange={(isSelected: boolean) => setFileNamePrefixes({ ...fileNamePrefixes, webAppPhotography: isSelected })}
                                            className="items-start w-full"
                                        >
                                            <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                                                <Checkbox.Indicator />
                                            </Checkbox.Control>
                                            <Checkbox.Content>
                                                <Label>WebApp photography</Label>
                                            </Checkbox.Content>
                                        </Checkbox>

                                        <Checkbox
                                            isSelected={fileNamePrefixes.professionalPhotography}
                                            onChange={(isSelected: boolean) => setFileNamePrefixes({ ...fileNamePrefixes, professionalPhotography: isSelected })}
                                            className="items-start w-full"
                                        >
                                            <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                                                <Checkbox.Indicator />
                                            </Checkbox.Control>
                                            <Checkbox.Content>
                                                <Label>Professional photography</Label>
                                            </Checkbox.Content>
                                        </Checkbox>
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
                                                                <TextField name="name" isInvalid={newManager.name.length > 0 && newManager.name.length < 2} className="w-full">
                                                                    <Label>Name *</Label>
                                                                    <Input
                                                                        placeholder="Enter manager name"
                                                                        value={newManager.name}
                                                                        onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
                                                                    />
                                                                    {newManager.name.length > 0 && newManager.name.length < 2 && (
                                                                        <FieldError>Name must be at least 2 characters</FieldError>
                                                                    )}
                                                                </TextField>

                                                                <TextField name="email" isInvalid={newManager.email.length > 0 && !newManager.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)} className="w-full">
                                                                    <Label>Email *</Label>
                                                                    <Input
                                                                        type="email"
                                                                        placeholder="manager@company.com"
                                                                        value={newManager.email}
                                                                        onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
                                                                    />
                                                                    {newManager.email.length > 0 && !newManager.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
                                                                        <FieldError>Please enter a valid email address</FieldError>
                                                                    )}
                                                                </TextField>

                                                                <Select
                                                                    selectedKey={newManager.role}
                                                                    onSelectionChange={(key) => setNewManager({ ...newManager, role: key as Manager['role'] })}
                                                                >
                                                                    <Label>Role *</Label>
                                                                    <Select.Trigger>
                                                                        <Select.Value />
                                                                        <Select.Indicator />
                                                                    </Select.Trigger>
                                                                    <Select.Popover>
                                                                        <ListBox>
                                                                            <ListBox.Item id="Admin" textValue="Admin">
                                                                                Admin
                                                                                <ListBox.ItemIndicator />
                                                                            </ListBox.Item>
                                                                            <ListBox.Item id="Edit" textValue="Edit">
                                                                                Edit
                                                                                <ListBox.ItemIndicator />
                                                                            </ListBox.Item>
                                                                            <ListBox.Item id="Read Only" textValue="Read Only">
                                                                                Read Only
                                                                                <ListBox.ItemIndicator />
                                                                            </ListBox.Item>
                                                                        </ListBox>
                                                                    </Select.Popover>
                                                                </Select>
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
                                                        <Select
                                                            selectedKey={manager.role}
                                                            onSelectionChange={(key) => handleRoleChange(manager.id, key as string)}
                                                            className="w-32"
                                                            aria-label="Role"
                                                        >
                                                            <Select.Trigger>
                                                                <Select.Value />
                                                                <Select.Indicator />
                                                            </Select.Trigger>
                                                            <Select.Popover>
                                                                <ListBox>
                                                                    <ListBox.Item id="Admin" textValue="Admin">
                                                                        Admin
                                                                        <ListBox.ItemIndicator />
                                                                    </ListBox.Item>
                                                                    <ListBox.Item id="Edit" textValue="Edit">
                                                                        Edit
                                                                        <ListBox.ItemIndicator />
                                                                    </ListBox.Item>
                                                                    <ListBox.Item id="Read Only" textValue="Read Only">
                                                                        Read Only
                                                                        <ListBox.ItemIndicator />
                                                                    </ListBox.Item>
                                                                </ListBox>
                                                            </Select.Popover>
                                                        </Select>
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
                                                                                    <div className="flex items-center justify-center rounded-full p-2 w-fit bg-danger/10 text-danger">
                                                                                        <Icon icon="gravity-ui:trash-bin" className="w-5 h-5" />
                                                                                    </div>
                                                                                    <h3 className="text-lg font-semibold">Delete Manager?</h3>
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
                                    <Checkbox
                                        isSelected={mailSettings.disableAllEmails}
                                        onChange={(isSelected: boolean) => setMailSettings({ ...mailSettings, disableAllEmails: isSelected })}
                                        className="items-start w-full"
                                    >
                                        <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                                            <Checkbox.Indicator />
                                        </Checkbox.Control>
                                        <Checkbox.Content>
                                            <Label>Disable all enterprise emails</Label>
                                            <Description>Stop all automated system emails.</Description>
                                        </Checkbox.Content>
                                    </Checkbox>

                                    <Checkbox
                                        isSelected={mailSettings.sendChatNotifications}
                                        onChange={(isSelected: boolean) => setMailSettings({ ...mailSettings, sendChatNotifications: isSelected })}
                                        className="items-start w-full"
                                    >
                                        <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                                            <Checkbox.Indicator />
                                        </Checkbox.Control>
                                        <Checkbox.Content>
                                            <Label>Chat notifications</Label>
                                            <Description>Send emails for new chat messages.</Description>
                                        </Checkbox.Content>
                                    </Checkbox>
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
                                <Checkbox
                                    isSelected={prebookingSettings.enableSessionDateInCSV}
                                    onChange={(isSelected: boolean) => setPrebookingSettings({ ...prebookingSettings, enableSessionDateInCSV: isSelected })}
                                    className="items-start w-full"
                                >
                                    <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                                        <Checkbox.Indicator />
                                    </Checkbox.Control>
                                    <Checkbox.Content>
                                        <Label>Enable session date in CSV</Label>
                                        <Description>Includes the session date column in exported CSVs.</Description>
                                    </Checkbox.Content>
                                </Checkbox>
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
                                <Checkbox
                                    isSelected={otherSettings.showPhotographerDetails}
                                    onChange={(isSelected: boolean) => setOtherSettings({ ...otherSettings, showPhotographerDetails: isSelected })}
                                    className="items-start w-full"
                                >
                                    <Checkbox.Control className="rounded-[4px] before:rounded-[4px] data-[selected=true]:rounded-[4px]">
                                        <Checkbox.Indicator />
                                    </Checkbox.Control>
                                    <Checkbox.Content>
                                        <Label>Show photographer details</Label>
                                        <Description>Display assigned photographer info in business profile.</Description>
                                    </Checkbox.Content>
                                </Checkbox>
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
