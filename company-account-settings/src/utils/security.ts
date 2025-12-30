import type { DeviceType } from "@/types/security";

export interface DeviceInfo {
    deviceType: DeviceType;
    browser: string;
    os: string;
}

/**
 * Parses the User Agent string to detect device type, browser, and OS.
 * Basic implementation for local display purposes.
 */
export function getDeviceInfo(): DeviceInfo {
    const ua = navigator.userAgent;
    let browser = 'Unknown Browser';
    let os = 'Unknown OS';
    let deviceType: DeviceType = 'desktop';

    // Detect Browser
    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('SamsungBrowser')) browser = 'Samsung Browser';
    else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';
    else if (ua.includes('Trident')) browser = 'Internet Explorer';
    else if (ua.includes('Edge')) browser = 'Edge';
    else if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';

    // Detect OS
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('X11')) os = 'UNIX';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    // Detect Device Type
    if (/Mobi|Android/i.test(ua)) {
        deviceType = 'mobile';
    } else if (/Tablet|iPad/i.test(ua)) {
        deviceType = 'tablet';
    }

    return { deviceType, browser, os };
}

/**
 * Returns the appropriate icon name for a browser
 */
export function getBrowserIcon(browser: string): string {
    const b = browser.toLowerCase();
    if (b.includes('chrome')) return 'logos:chrome';
    if (b.includes('firefox')) return 'logos:firefox';
    if (b.includes('safari')) return 'logos:safari';
    if (b.includes('edge')) return 'logos:microsoft-edge';
    if (b.includes('opera')) return 'logos:opera';
    return 'gravity-ui:globe';
}

/**
 * Returns the appropriate icon name for an OS
 */
export function getOsIcon(os: string): string {
    const o = os.toLowerCase();
    if (o.includes('mac') || o.includes('ios')) return 'logos:apple';
    if (o.includes('windows')) return 'logos:microsoft-windows-icon';
    if (o.includes('linux')) return 'logos:linux-tux';
    if (o.includes('android')) return 'logos:android-icon';
    return 'gravity-ui:desktop';
}
/**
 * Exports data to CSV and triggers a download
 */
export function exportToCSV<T extends Record<string, unknown>>(data: T[], filename: string) {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row =>
            headers.map(header => {
                const val = row[header];
                if (val === null || val === undefined) return '';
                if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
                return `"${String(val).replace(/"/g, '""')}"`;
            }).join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
