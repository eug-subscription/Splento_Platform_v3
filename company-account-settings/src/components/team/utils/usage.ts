import { startOfMonth, subMonths, endOfMonth, subDays, startOfYear } from 'date-fns';

export function getProgressColor(percentage: number): string {
    if (percentage >= 80) return 'bg-danger';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-accent';
}

export function formatValue(value: number, unit?: string): string {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return unit ? `${value.toLocaleString()} ${unit}` : value.toLocaleString();
}

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('en-IE', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

export function getPeriodDateRange(periodId: string): { start: Date; end: Date } {
    const today = new Date();

    switch (periodId) {
        case 'this-month':
            return { start: startOfMonth(today), end: today };
        case 'last-month':
            const lastMonth = subMonths(today, 1);
            return { start: startOfMonth(lastMonth), end: endOfMonth(lastMonth) };
        case 'last-90-days':
            return { start: subDays(today, 90), end: today };
        case 'this-year':
            return { start: startOfYear(today), end: today };
        default:
            return { start: startOfMonth(today), end: today };
    }
}
