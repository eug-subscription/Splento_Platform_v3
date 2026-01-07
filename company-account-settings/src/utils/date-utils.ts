/**
 * Formats a date string into a relative human-readable format.
 * Follows the rules defined in dev_instruction_v2.md Section 11.
 *
 * | Time Window | Display Text |
 * | :--- | :--- |
 * | < 1 minute | Just now |
 * | < 1 hour | X minutes ago |
 * | < 24 hours | X hours ago |
 * | 24 - 48 hours | Yesterday |
 * | 3 - 7 days | X days ago |
 * | > 7 days | MMM DD |
 * | > 1 year | MMM DD, YYYY |
 */
export function formatRelativeTime(dateString?: string): string {
    if (!dateString) return 'Never';

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
        return 'Yesterday';
    }

    if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }

    const isCurrentYear = date.getFullYear() === now.getFullYear();
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        ...(isCurrentYear ? {} : { year: 'numeric' }),
    };

    return date.toLocaleDateString('en-US', options);
}
