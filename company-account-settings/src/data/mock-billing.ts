import type { TeamBilling, Invoice } from '../types/billing';

// Subscription team example
export const MOCK_SUBSCRIPTION_BILLING: TeamBilling = {
    billingType: 'subscription',
    plan: {
        planId: 'plan_enterprise',
        planName: 'Enterprise',
        planStatus: 'active',
        monthlyCost: 2499,
        billingPeriod: 'monthly',
        nextBillingDate: new Date('2025-01-15'),
        startDate: new Date('2024-11-18'), // Started 2 months ago
        trialEndsAt: null,
        includedCredits: 5000,
    },
    credits: {
        balance: 1247,
        monthlyAllocation: 5000,
        resetsAt: new Date('2025-01-15'),
        purchasedCredits: 0,
        purchasedCreditsExpiresAt: null,
    },
    paymentMethod: {
        id: 'pm_123',
        type: 'card',
        brand: 'visa',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2026,
        isDefault: true,
    },
    billingDetails: {
        invoiceEmail: 'billing@wolt.com',
        companyName: 'Wolt Finland Oy',
        vatNumber: 'FI12345678',
        costCentre: 'CC-MARKETING-001',
        poNumber: 'PO-2024-1234',
        address: {
            line1: 'Arkadiankatu 6',
            line2: null,
            city: 'Helsinki',
            postalCode: '00100',
            country: 'FI',
        },
    },
};

// PAYG team example
export const MOCK_PAYG_BILLING: TeamBilling = {
    billingType: 'payg',
    plan: null,
    credits: {
        balance: 342,
        monthlyAllocation: null,
        resetsAt: null,
        purchasedCredits: 342,
        purchasedCreditsExpiresAt: new Date('2025-06-15'),
    },
    paymentMethod: {
        id: 'pm_456',
        type: 'card',
        brand: 'mastercard',
        last4: '8888',
        expiryMonth: 9,
        expiryYear: 2025,
        isDefault: true,
    },
    billingDetails: {
        invoiceEmail: 'accounts@smallco.com',
        companyName: 'SmallCo Ltd',
        vatNumber: null,
        costCentre: null,
        poNumber: null,
        address: {
            line1: '123 High Street',
            line2: 'Suite 4',
            city: 'London',
            postalCode: 'EC1A 1BB',
            country: 'GB',
        },
    },
};

// Subscription with extra purchased credits
export const MOCK_SUBSCRIPTION_WITH_EXTRAS: TeamBilling = {
    ...MOCK_SUBSCRIPTION_BILLING,
    credits: {
        balance: 7500, // 5000 allocated + 2500 purchased
        monthlyAllocation: 5000,
        resetsAt: new Date('2025-01-15'),
        purchasedCredits: 2500,
        purchasedCreditsExpiresAt: new Date('2025-08-20'),
    },
};

// Mock Invoices
export const MOCK_INVOICES: Invoice[] = [
    {
        id: 'inv_123',
        invoiceNumber: 'INV-2023-001',
        type: 'subscription',
        status: 'paid',
        date: new Date('2023-11-01'),
        description: 'Professional Plan - Monthly (Nov 2023)',
        amount: 2900,
        currency: 'EUR',
        pdfUrl: '#'
    },
    {
        id: 'inv_124',
        invoiceNumber: 'INV-2023-002',
        type: 'credit_purchase',
        status: 'paid',
        date: new Date('2023-11-15'),
        description: 'Credit Package - 500 Credits',
        amount: 5000,
        currency: 'EUR',
        pdfUrl: '#'
    },
    {
        id: 'inv_125',
        invoiceNumber: 'INV-2023-003',
        type: 'subscription',
        status: 'pending',
        date: new Date('2023-12-01'),
        description: 'Professional Plan - Monthly (Dec 2023)',
        amount: 2900,
        currency: 'EUR',
        pdfUrl: '#'
    },
    {
        id: 'inv_126',
        invoiceNumber: 'INV-2023-004',
        type: 'plan_upgrade',
        status: 'paid', // "open" was invalid. Assuming paid/pending.
        date: new Date('2023-12-05'),
        description: 'Plan Upgrade: Starter to Professional',
        amount: 1540,
        currency: 'EUR',
        pdfUrl: '#'
    }
];
