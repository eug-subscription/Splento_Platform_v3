import { useState, useEffect } from 'react';
import AccountSettings from './app/admin/AccountSettings';
import HomePage from './app/HomePage';
import { ServicesPage } from './app/admin/ServicesPage';
import SplentoDesignSystem from './components/design-system/SplentoDesignSystem';
import { LeftMenu, MobileNavigation } from './components/navigation';

type Page = 'home' | 'settings' | 'services' | 'design-hub';

const HASH_TO_PAGE: Record<string, Page> = {
  settings: 'settings',
  services: 'services',
  'design-hub': 'design-hub',
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(HASH_TO_PAGE[hash] || 'home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('#')) {
      window.location.hash = path;
    } else if (path === '/dashboard') {
      window.location.hash = '';
    }
  };

  const currentPath = currentPage === 'home' ? '/dashboard' : `#${currentPage}`;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-accent focus:text-accent-foreground">
        Skip to main content
      </a>

      <LeftMenu currentPath={currentPath} onNavigate={navigate} />

      <MobileNavigation
        currentPath={currentPath}
        user={{ name: "Jane Doe", role: "Product Designer", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" }}
        organisation={{ name: "Visionary Studio", id: "org-1" }}
        credits={1247}
        onNavigate={navigate}
      />

      <main id="main-content" className="flex-1 w-full lg:ml-[280px] pt-14 pb-24 lg:py-0">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'settings' && <AccountSettings />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'design-hub' && <SplentoDesignSystem />}
      </main>
    </div>
  );
}

export default App;

