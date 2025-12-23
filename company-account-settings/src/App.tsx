import { useState, useEffect } from 'react';
import AccountSettings from './app/admin/AccountSettings';
import HomePage from './app/HomePage';
import { ServicesPage } from './app/admin/ServicesPage';
import { TeamPage } from './app/TeamPage';

import SplentoDesignSystem from './components/design-system/SplentoDesignSystem';
import { LeftMenu, MobileNavigation } from './components/navigation';
import { ThemeProvider } from './context/ThemeContext';
import { LayoutProvider } from './context/LayoutContext';
import { AppLayout } from './components/layout/AppLayout';

const ROUTES = {
  home: { path: '/dashboard', hash: '', component: HomePage },
  settings: { path: '#settings', hash: 'settings', component: AccountSettings },
  services: { path: '#services', hash: 'services', component: ServicesPage },
  team: { path: '#team', hash: 'team', component: TeamPage },
  'design-hub': { path: '#design-hub', hash: 'design-hub', component: SplentoDesignSystem },

} as const;

type Page = keyof typeof ROUTES;

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const page = (Object.keys(ROUTES) as Page[]).find((key) => ROUTES[key].hash === hash) || 'home';
      setCurrentPage(page);
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

  const currentPath = ROUTES[currentPage].path;
  const CurrentComponent = ROUTES[currentPage].component;

  return (
    <ThemeProvider>
      <LayoutProvider>
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

          <div className="flex-1 w-full lg:ml-[280px] pt-14 pb-24 lg:py-0">
            <AppLayout>
              <CurrentComponent />
            </AppLayout>
          </div>
        </div>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;

