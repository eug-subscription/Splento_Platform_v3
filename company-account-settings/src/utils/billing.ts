import { ALERT_THRESHOLDS, VAT_RATE } from '../data/billing-constants';
import type {
    TeamBilling,
    BillingAlert,
    InvoiceStatus,
} from '../types/billing';
import type { Member } from '../types/team';

// Format price with currency
export function formatPrice(amount: number, currency = 'EUR'): string {
    return new Intl.NumberFormat('en-IE', {
        style: 'currency',
        currency,
    }).format(amount / 100); // Amount is in cents
}

// Format date standard
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-IE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

// Format card brand for display
export function formatCardBrand(brand: string | null): string {
    const brands: Record<string, string> = {
        visa: 'Visa',
        mastercard: 'Mastercard',
        amex: 'American Express',
        sepa_debit: 'SEPA Direct Debit',
    };
    return brand ? brands[brand] ?? brand : 'Card';
}

// Get chip variant for invoice status
export function getInvoiceStatusVariant(status: InvoiceStatus): 'success' | 'warning' | 'danger' | 'default' {
    const variants: Record<InvoiceStatus, 'success' | 'warning' | 'danger' | 'default'> = {
        paid: 'success',
        pending: 'warning',
        failed: 'danger',
        refunded: 'default',
    };
    return variants[status];
}

// Calculate VAT and total
export function calculatePurchaseTotal(subtotal: number): { subtotal: number; vat: number; total: number } {
    const vat = subtotal * VAT_RATE;
    return {
        subtotal,
        vat,
        total: subtotal + vat,
    };
}

// Calculate days until date
export function daysUntil(date: Date): number {
    const now = new Date();
    // Reset time part for accurate day calculation
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const n = new Date(now);
    n.setHours(0, 0, 0, 0);

    const diff = d.getTime() - n.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Format credit expiry message
export function getCreditExpiryMessage(date: Date): string {
    const days = daysUntil(date);
    if (days <= 0) return 'Expired';
    if (days <= 30) return `Expires in ${days} days`;
    return `Expires on ${formatDate(date)}`;
}

// Generate billing alerts based on current state
export function generateBillingAlerts(billing: TeamBilling): BillingAlert[] {
    const alerts: BillingAlert[] = [];
    const { billingType, plan, credits } = billing;

    // 4. Low Credits Warning (Subscription)
    if (billingType === 'subscription' && credits.monthlyAllocation) {
        const percent = (credits.balance / credits.monthlyAllocation) * 100;
        if (percent <= ALERT_THRESHOLDS.subscription.lowCreditsPercent) {
            alerts.push({
                id: 'low-credits-sub',
                type: 'low_credits',
                severity: 'warning',
                title: 'Low Credit Balance',
                message: `You have used ${(100 - percent).toFixed(0)}% of your monthly credits.`,
                actionLabel: 'Buy Credits',
                actionType: 'buy_credits',
                dismissible: true
            });
        }
        if (credits.balance === 0) {
            alerts.push({
                id: 'zero-credits-sub',
                type: 'low_credits',
                severity: 'danger',
                title: 'Out of Credits',
                message: 'You have used all your monthly credits. Features may be limited.',
                actionLabel: 'Buy Credits',
                actionType: 'buy_credits',
                dismissible: false
            });
        }
    }

    // 5. Low Credits Warning (PAYG)
    if (billingType === 'payg') {
        if (credits.balance <= ALERT_THRESHOLDS.payg.lowCreditsAbsolute && credits.balance > 0) {
            alerts.push({
                id: 'low-credits-payg',
                type: 'low_credits',
                severity: 'warning',
                title: 'Low Credit Balance',
                message: `You have ${credits.balance} credits remaining.`,
                actionLabel: 'Buy Credits',
                actionType: 'buy_credits',
                dismissible: true
            });
        }
        if (credits.balance === 0) {
            alerts.push({
                id: 'zero-credits-payg',
                type: 'low_credits',
                severity: 'danger',
                title: 'No Credits Available',
                message: 'You have 0 credits. Purchase credits to continue using the platform.',
                actionLabel: 'Buy Credits',
                actionType: 'buy_credits',
                dismissible: false
            });
        }
    }

    // 6. Credits Expiring Soon
    if (credits.purchasedCredits > 0 && credits.purchasedCreditsExpiresAt) {
        const daysToExpiry = daysUntil(credits.purchasedCreditsExpiresAt);
        if (daysToExpiry <= ALERT_THRESHOLDS.creditsExpiringDays) {
            alerts.push({
                id: 'credits-expiring',
                type: 'credits_expiring',
                severity: 'warning',
                title: 'Credits Expiring Soon',
                message: `Your purchased credits will expire in ${daysToExpiry} days.`,
                dismissible: true
            });
        }
    }

    // 7. Plan Renewing/Expiring Soon (Alert 7 days before)
    if (billingType === 'subscription' && plan?.nextBillingDate) {
        const daysToRenewal = daysUntil(plan.nextBillingDate);
        if (daysToRenewal <= ALERT_THRESHOLDS.planExpiringDays && daysToRenewal >= 0) {
            alerts.push({
                id: 'plan-renewing',
                type: 'plan_expiring',
                severity: 'warning',
                title: 'Upcoming Renewal',
                message: `Your plan renews in ${daysToRenewal} days.`,
                actionLabel: 'Manage Plan',
                actionType: 'change_plan',
                dismissible: true
            });
        }
    }

    // 8. Trial Ending Soon (Alert 3 days before)
    if (plan?.trialEndsAt) {
        const daysToTrialEnd = daysUntil(plan.trialEndsAt);
        if (daysToTrialEnd <= ALERT_THRESHOLDS.trialEndingDays && daysToTrialEnd >= 0) {
            alerts.push({
                id: 'trial-ending',
                type: 'trial_ending',
                severity: 'warning',
                title: 'Trial Ending Soon',
                message: `Your trial period ends in ${daysToTrialEnd} days. Upgrade to keep using premium features.`,
                actionLabel: 'Upgrade Plan',
                actionType: 'change_plan',
                dismissible: false
            });
        }
    }

    // 9. Payment Failed (assumed state)
    if (plan && plan.planStatus === 'past_due') {
        alerts.push({
            id: 'payment-failed',
            type: 'payment_failed',
            severity: 'danger',
            title: 'Payment Failed',
            message: 'Your last payment failed. Please update your payment method to avoid interruption.',
            actionLabel: 'Update Payment',
            actionType: 'update_payment',
            dismissible: false
        });
    }

    return alerts;
}

// Check if user has admin billing permissions
export function canManageBilling(member: Member): boolean {
    if (member.isAdmin) return true;
    return member.permissions && member.permissions.billing === 'edit';
}
