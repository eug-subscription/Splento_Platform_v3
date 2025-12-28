// Billing model type
export type BillingType = 'subscription' | 'payg';

// Plan status
export type PlanStatus = 'active' | 'trialing' | 'past_due' | 'cancelled';

// Invoice types
export type InvoiceType = 'subscription' | 'credit_purchase' | 'plan_change' | 'plan_upgrade';

// Invoice status
export type InvoiceStatus = 'paid' | 'pending' | 'failed' | 'refunded';

// Modal types
export type ModalType = 'buy_credits' | 'update_payment' | 'edit_billing_details' | 'change_plan' | 'switch_billing_model';

// Alert types and severity
export type AlertType = 'low_credits' | 'payment_failed' | 'plan_expiring' | 'trial_ending' | 'credits_expiring';
export type AlertSeverity = 'warning' | 'danger';

// Credit package for purchase
export interface CreditPackage {
    id: string;
    credits: number;
    price: number;
    originalPrice: number;
    discount: string | null;
    label?: string;
    rate: number;
}

// Available plan options for selection
export interface PlanOption {
    id: string;
    name: string;
    price: number;
    credits: number;
}

// Subscription plan details (null for PAYG)
export interface TeamPlan {
    planId: string;
    planName: string;                 // e.g., "Enterprise", "Professional"
    planStatus: PlanStatus;
    monthlyCost: number;
    billingPeriod: 'monthly' | 'annual';
    nextBillingDate: Date;
    trialEndsAt: Date | null;
    startDate: Date;                  // Plan start date
    includedCredits: number;          // Monthly allocation
}

// Credit balance
export interface CreditBalance {
    balance: number;
    // Subscription credits (included in plan)
    monthlyAllocation: number | null; // null for PAYG
    resetsAt: Date | null;            // null for PAYG
    // Purchased credits (both models)
    purchasedCredits: number;         // Extra credits bought
    purchasedCreditsExpiresAt: Date | null; // 12 months from purchase
}

// Payment method on file
export interface PaymentMethod {
    id: string;
    type: 'card' | 'sepa_debit' | 'bank_transfer';
    brand: string | null;             // 'visa', 'mastercard', etc.
    last4: string;
    expiryMonth: number | null;       // null for non-card
    expiryYear: number | null;
    isDefault: boolean;
}

// Billing address
export interface BillingAddress {
    line1: string;
    line2: string | null;
    city: string;
    postalCode: string;
    country: string;                  // ISO 3166-1 alpha-2
}

// Billing details for invoices
export interface BillingDetails {
    invoiceEmail: string;
    companyName: string | null;
    vatNumber: string | null;
    costCentre: string | null;
    poNumber: string | null;
    address: BillingAddress;
}

// Team billing configuration
export interface TeamBilling {
    billingType: BillingType;
    plan: TeamPlan | null;           // null for PAYG
    credits: CreditBalance;
    paymentMethod: PaymentMethod | null;
    billingDetails: BillingDetails;
}

// Invoice record
export interface Invoice {
    id: string;
    invoiceNumber: string;            // e.g., "INV-2024-012"
    type: InvoiceType;
    status: InvoiceStatus;
    date: Date;
    description: string;
    amount: number;
    currency: string;                 // e.g., "EUR"
    pdfUrl: string;
}

// Alert configuration
export interface BillingAlert {
    id: string;                       // Unique ID for dismissal tracking
    type: AlertType;
    severity: AlertSeverity;
    title: string;                    // Short title (e.g. "Low Credits")
    message: string;
    actionLabel?: string;             // Optional button label
    actionType?: ModalType;           // Optional action trigger
    dismissible: boolean;
}
