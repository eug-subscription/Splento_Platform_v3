import { useState, useEffect } from 'react';
import AccountSettings from './app/admin/AccountSettings';
import HomePage from './app/HomePage';
import { LeftMenu } from './components/LeftMenu';

function App() {
  // Simple hash-based routing to preserve AccountSettings
  const [currentPage, setCurrentPage] = useState<'home' | 'settings'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'settings') {
        setCurrentPage('settings');
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

  return (
    <div className="flex min-h-screen">
      <LeftMenu
        currentPath={currentPage === 'settings' ? '#settings' : window.location.pathname}
        onNavigate={(path) => {
          if (path.startsWith('#')) {
            window.location.hash = path;
          } else {
            // For now, other paths don't do anything, or we could just log
            console.log('Navigate to:', path);
          }
        }}
      />
      <main className="flex-1 ml-[280px]">
        {currentPage === 'settings' ? <AccountSettings /> : <HomePage />}
      </main>
    </div>
  );
}

export default App;

