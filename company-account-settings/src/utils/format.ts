import { formatDistanceToNow } from 'date-fns';

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('en-IE', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

export function formatRelativeTime(date: string | Date | null): string {
    if (!date) return '—';
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}
