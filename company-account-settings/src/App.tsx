import { useState, useEffect } from 'react';
import AccountSettings from './app/admin/AccountSettings';
import HomePage from './app/HomePage';
import { ServicesPage } from './app/admin/ServicesPage';
import SplentoDesignSystem from './components/design-system/SplentoDesignSystem';
import { LeftMenu, MobileNavigation } from './components/navigation';

function App() {
  // Simple hash-based routing to preserve AccountSettings
  const [currentPage, setCurrentPage] = useState<'home' | 'settings' | 'services' | 'design-hub'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'settings') {
        setCurrentPage('settings');
      } else if (hash === 'services') {
        setCurrentPage('services');
      } else if (hash === 'design-hub') {
        setCurrentPage('design-hub');
      } else {
        setCurrentPage('home');
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('#')) {
      window.location.hash = path;
    } else if (path.startsWith('/')) {
      // Mock router navigation
      console.log('Navigate to:', path);
      // For demo purposes, we can map some paths to hashes or just log
      if (path === '/dashboard') window.location.hash = '';
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Navigation */}
      <LeftMenu
        currentPath={currentPage === 'home' ? '/dashboard' : `#${currentPage}`}
        onNavigate={navigate}
      />

      {/* Mobile Navigation */}
      <MobileNavigation
        currentPath={currentPage === 'home' ? '/dashboard' : `#${currentPage}`}
        user={{
          name: "Jane Doe",
          role: "Product Designer",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
        }}
        organisation={{
          name: "Visionary Studio",
          id: "org-1"
        }}
        credits={1247}
        onNavigate={navigate}
      />

      {/* Main Content */}
      <main className="flex-1 w-full lg:ml-[280px] pt-14 pb-24 lg:py-0">
        {currentPage === 'settings' && <AccountSettings />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'design-hub' && <SplentoDesignSystem />}
        {currentPage === 'home' && <HomePage />}
      </main>
    </div>
  );
}

export default App;

