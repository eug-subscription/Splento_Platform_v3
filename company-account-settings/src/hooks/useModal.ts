import { useContext } from 'react';
import { ModalContext } from '@/context/ModalContext';

/**
 * Custom hook to access the Modal system.
 * Must be used within a ModalProvider.
 */
export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
