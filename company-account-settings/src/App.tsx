import { useState, useEffect } from 'react';
import AccountSettings from './app/admin/AccountSettings';
import HomePage from './app/HomePage';

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
    <div>
      {currentPage === 'settings' ? <AccountSettings /> : <HomePage />}
    </div>
  );
}

export default App;

