import { useState } from 'react';
import type { Manager } from '../../../types';

export const useAccountSettings = () => {
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
        // TODO: Integrate with backend API to persist changes
        // Required data: companyInfo, managers, billingAddress, socialLinks, tags, and settings
    };

    return {
        managers,
        setManagers,
        newManager,
        setNewManager,
        companyInfo,
        setCompanyInfo,
        autorenameMode,
        setAutorenameMode,
        unpaidInvoicesLimit,
        setUnpaidInvoicesLimit,
        mailSettings,
        setMailSettings,
        fileNamePrefixes,
        setFileNamePrefixes,
        prebookingSettings,
        setPrebookingSettings,
        otherSettings,
        setOtherSettings,
        billingAddress,
        setBillingAddress,
        socialLinks,
        setSocialLinks,
        tags,
        setTags,
        tagInput,
        setTagInput,
        handlers: {
            handleRoleChange,
            handleDeleteManager,
            handleAddManager,
            handleAddTag,
            handleRemoveTag,
            handleSave
        }
    };
};
