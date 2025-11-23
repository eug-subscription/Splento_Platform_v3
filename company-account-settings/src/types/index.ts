export interface Manager {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Edit' | 'Read Only';
}

export interface CompanySettings {
    companyName: string;
    companyEmail: string;
    coordinatorEmail: string;
    phone: string;
    vatNumber: string;
    autorenameMode: 'external-id' | 'dish-name' | 'external-id-dish-name';
    unpaidInvoicesLimit: string;
    mailSettings: {
        disableAllEmails: boolean;
        sendChatNotifications: boolean;
    };
    fileNamePrefixes: {
        webAppPhotography: boolean;
        professionalPhotography: boolean;
    };
    prebookingFiles: {
        enableSessionDateInCSV: boolean;
    };
    otherSettings: {
        showPhotographerDetails: boolean;
    };
    billingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    socialLinks: {
        website: string;
        linkedin: string;
        twitter: string;
        facebook: string;
    };
    tags: string[];
}
