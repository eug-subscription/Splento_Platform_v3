import { useState, useCallback, type ReactNode } from 'react';
import { ModalContext } from './ModalContext';
import type { ModalType, ModalData, OpenModalFn } from '@/types/modals';

interface ModalProviderProps {
    children: ReactNode;
}

interface ModalState {
    activeModal: ModalType | null;
    modalData: unknown;
}

/**
 * Provider component for the Modal system.
 * Implements strict typing for modal state and open/close actions.
 */
export function ModalProvider({ children }: ModalProviderProps) {
    const [state, setState] = useState<ModalState>({
        activeModal: null,
        modalData: null,
    });

    const openModal = useCallback((type: ModalType, data?: unknown) => {
        setState({
            activeModal: type,
            modalData: data,
        });
    }, []) as OpenModalFn;

    const closeModal = useCallback(() => {
        setState({
            activeModal: null,
            modalData: null,
        });
    }, []);

    return (
        <ModalContext.Provider value={{
            activeModal: state.activeModal,
            modalData: state.modalData as ModalData['data'],
            openModal,
            closeModal
        }}>
            {children}
        </ModalContext.Provider>
    );
}
