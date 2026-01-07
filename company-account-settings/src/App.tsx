import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { ModalProvider } from '@/context/ModalProvider';
import { GlobalModalManager } from './components/modals/GlobalModalManager';

export function App() {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
      <GlobalModalManager />
    </ModalProvider>
  );
}
