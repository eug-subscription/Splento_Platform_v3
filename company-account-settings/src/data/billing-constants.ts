import type { CreditPackage, PlanOption } from '../types/billing';

export const VAT_RATE = 0.24; // 24% VAT (Finland)

export const CREDIT_PACKAGES: CreditPackage[] = [
    { id: 'pack_1', credits: 1700, price: 80, originalPrice: 145, discount: '45%', label: 'Best Value', rate: 21 },
    { id: 'pack_2', credits: 840, price: 40, originalPrice: 57, discount: '30%', rate: 21 },
    { id: 'pack_3', credits: 380, price: 20, originalPrice: 29, discount: '30%', rate: 19 },
    { id: 'pack_4', credits: 170, price: 10, originalPrice: 14, discount: '30%', rate: 17 },
    { id: 'pack_5', credits: 80, price: 5, originalPrice: 7, discount: '30%', rate: 16 },
];

export const AVAILABLE_PLANS: PlanOption[] = [
    { id: 'plan_starter', name: 'Starter', price: 0, credits: 500 },
    { id: 'plan_professional', name: 'Professional', price: 2900, credits: 1500 }, // in cents
    { id: 'plan_enterprise', name: 'Enterprise', price: 9900, credits: 5000 },
];

export const ALERT_THRESHOLDS = {
    subscription: {
        lowCreditsPercent: 20,          // Alert when < 20% of monthly allocation
    },
    payg: {
        lowCreditsAbsolute: 50,         // Alert when < 50 credits
    },
    creditsExpiringDays: 30,          // Alert 30 days before expiry
    planExpiringDays: 7,              // Alert 7 days before renewal
    trialEndingDays: 3,               // Alert 3 days before trial ends
};

export const CREDIT_EXPIRY_MONTHS = 12; // Purchased credits expire after 12 months

// Consistent styling for small, tight premium badges/chips
export const CHIP_BADGE_STYLE = "h-5 text-xs font-bold px-1.5 uppercase tracking-wider whitespace-nowrap";
