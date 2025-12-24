import { Card, Button, Modal, Surface, TextField, Label, Input, FieldError, Select, ListBox, Avatar, Description, AlertDialog } from "@heroui/react";
import { Icon } from '@iconify/react';
import type { Manager } from '../../../types';

interface ManagersSectionProps {
    managers: Manager[];
    newManager: {
        name: string;
        email: string;
        role: Manager['role'];
    };
    setNewManager: (manager: ManagersSectionProps['newManager']) => void;
    handlers: {
        handleAddManager: () => void;
        handleDeleteManager: (id: string) => void;
        handleRoleChange: (id: string, role: string) => void;
    };
    getInitials: (name: string) => string;
}

export function ManagersSection({ managers, newManager, setNewManager, handlers, getInitials }: ManagersSectionProps) {
    const { handleAddManager, handleDeleteManager, handleRoleChange } = handlers;

    return (
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
                    <Modal.Backdrop variant="blur" className="backdrop-blur-sm">
                        <Modal.Container placement="auto">
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
                    </Modal.Backdrop>
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
                                        <AlertDialog>
                                            <Button
                                                isIconOnly
                                                variant="danger"
                                                size="sm"
                                                aria-label="Delete manager"
                                            >
                                                <Icon icon="gravity-ui:trash-bin" className="w-4 h-4" />
                                            </Button>
                                            <AlertDialog.Backdrop variant="blur">
                                                <AlertDialog.Container>
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
                                            </AlertDialog.Backdrop>
                                        </AlertDialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card.Content>
        </Card>
    );
}
