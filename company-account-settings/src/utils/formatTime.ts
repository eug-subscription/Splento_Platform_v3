/**
 * Formats a date relatively based on the design system requirements.
 * 
 * Rules:
 * < 1 minute: Just now
 * < 1 hour: X minutes ago
 * < 24 hours: X hours ago
 * 24 - 48 hours: Yesterday
 * 3 - 7 days: X days ago
 * > 7 days: MMM DD
 * > 1 year: MMM DD, YYYY
 */
export function getRelativeTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    // Future dates
    if (diff < 0) return 'Just now';

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    if (days === 1 || (hours >= 24 && hours < 48)) return 'Yesterday';
    if (days < 7) return `${days} days ago`;

    const isCurrentYear = date.getFullYear() === now.getFullYear();

    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        ...(isCurrentYear ? {} : { year: 'numeric' })
    }).format(date);
}
