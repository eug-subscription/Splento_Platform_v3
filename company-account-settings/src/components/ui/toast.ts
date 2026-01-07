/**
 * Simple Toast utility for Splento Platform
 * 
 * @description Provides a consistent way to show success and error notifications.
 * In a real-world production app, this would be backed by a library like Sonner 
 * or a custom React Context-based toast provider with animations.
 */

// For now, we'll use a simple singleton pattern that logs to console
// and can be extended with a real UI implementation later.
/**
 * Success notification
 */
export function toastSuccess(message: string) {
    console.info(`%c SUCCESS: ${message} `, 'background: #10B981; color: #fff; border-radius: 4px; padding: 2px 4px;');
}

/**
 * Error notification
 */
export function toastError(message: string) {
    console.error(`%c ERROR: ${message} `, 'background: #EF4444; color: #fff; border-radius: 4px; padding: 2px 4px;');
}

/**
 * Information notification
 */
export function toastInfo(message: string) {
    console.info(`%c INFO: ${message} `, 'background: #3B82F6; color: #fff; border-radius: 4px; padding: 2px 4px;');
}

/**
 * Warning notification
 */
export function toastWarning(message: string) {
    console.warn(`%c WARNING: ${message} `, 'background: #F59E0B; color: #000; border-radius: 4px; padding: 2px 4px;');
}
