import type { ActivityLogEntry, ActivityFilters, DateRange } from '@/types/activity';

/**
 * Calculates the start and end dates based on a preset string.
 */
export function getDateRangeFromPreset(preset: ActivityFilters['dateRange']): DateRange {
    const now = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    switch (preset) {
        case 'today':
            break;
        case 'yesterday':
            start.setDate(start.getDate() - 1);
            now.setDate(now.getDate() - 1);
            now.setHours(23, 59, 59, 999);
            break;
        case 'last_7_days':
            start.setDate(start.getDate() - 7);
            break;
        case 'last_30_days':
            start.setDate(start.getDate() - 30);
            break;
        case 'last_90_days':
            start.setDate(start.getDate() - 90);
            break;
        case 'custom':
            // Return a default range if custom is selected but not provided
            start.setDate(start.getDate() - 30);
            break;
    }

    return { start, end: now };
}

/**
 * Filters activity logs based on category, member, date range, and search query.
 */
export function filterActivities(
    activities: ActivityLogEntry[],
    filters: ActivityFilters
): ActivityLogEntry[] {
    return activities.filter((entry) => {
        // 1. Category Filter
        if (filters.category !== 'all' && entry.category !== filters.category) {
            return false;
        }

        // 2. Member/Actor Filter
        if (filters.memberId !== 'all') {
            if (filters.memberId === 'system') {
                if (entry.actor !== null) return false;
            } else {
                if (entry.actor?.id !== filters.memberId) return false;
            }
        }

        // 3. Date Range Filter
        const entryDate = new Date(entry.timestamp);
        const range = filters.dateRange === 'custom' && filters.customDateRange
            ? filters.customDateRange
            : getDateRangeFromPreset(filters.dateRange);

        if (entryDate < range.start || entryDate > range.end) {
            return false;
        }

        // 4. Search Filter
        if (filters.search) {
            const query = filters.search.toLowerCase();
            const searchableText = [
                entry.actor?.name ?? 'system',
                entry.actor?.email ?? '',
                entry.action,
                entry.description,
                entry.metadata?.ip ?? '',
                entry.metadata?.location ?? '',
                entry.category
            ]
                .join(' ')
                .toLowerCase();

            if (!searchableText.includes(query)) {
                return false;
            }
        }

        return true;
    });
}

/**
 * Converts activity logs to CSV format and triggers a download.
 */
export function exportToCSV(activities: ActivityLogEntry[]): void {
    const headers = [
        'Timestamp',
        'Actor',
        'Email',
        'Category',
        'Action',
        'Description',
        'IP Address',
        'Location'
    ];

    const rows = activities.map((entry) => [
        new Date(entry.timestamp).toISOString(),
        entry.actor?.name ?? 'System',
        entry.actor?.email ?? 'N/A',
        entry.category,
        entry.action,
        `"${entry.description.replace(/"/g, '""')}"`, // Escape quotes for CSV
        entry.metadata?.ip ?? '',
        entry.metadata?.location ?? ''
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const timestamp = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `splento-activity-log-${timestamp}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
