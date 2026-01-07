import { createContext } from 'react';
import type { ModalContextType } from '@/types/modals';

/**
 * Context for managing modal state globally.
 * Separated from the provider to avoid React Refresh violations.
 */
export const ModalContext = createContext<ModalContextType | undefined>(undefined);
