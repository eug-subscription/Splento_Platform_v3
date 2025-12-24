import { createRouter, createRoute, createRootRoute, Navigate, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AppLayout } from '@/components/layout/AppLayout';
import HomePage from './app/HomePage';
import AccountSettings from '@/app/admin/AccountSettings';
import { ServicesPage } from './app/admin/ServicesPage';
import { TeamPage } from './app/TeamPage';
import SplentoDesignSystem from '@/components/design-system/SplentoDesignSystem';
import { ThemeProvider } from '@/context/ThemeContext';
import { LayoutProvider } from '@/context/LayoutContext';
import { Spinner } from '@heroui/react';

// --- Components ---

// Wrapper to provide contexts to the entire app within the router
const RootComponent = () => (
    <ThemeProvider>
        <LayoutProvider>
            <div className="flex min-h-screen bg-background text-foreground">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-accent focus:text-accent-foreground"
                >
                    Skip to main content
                </a>
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </LayoutProvider>
    </ThemeProvider>
);

// Layout wrapper for authenticated pages (using AppLayout)
// This mirrors the previous structure where AppLayout wrapped the content
const AuthLayoutComponent = () => (
    <AppShell />
);

import { LeftMenu, MobileNavigation } from './components/navigation';
import { useLocation, useNavigate } from '@tanstack/react-router';

const AppShell = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const handleNavigate = (path: string) => {
        navigate({ to: path });
    };

    return (
        <>
            <LeftMenu currentPath={currentPath} onNavigate={handleNavigate} />
            <MobileNavigation
                currentPath={currentPath}
                user={{ name: "Jane Doe", role: "Product Designer", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" }}
                organisation={{ name: "Visionary Studio", id: "org-1" }}
                credits={1247}
                onNavigate={handleNavigate}
            />
            <div className="flex-1 w-full lg:ml-[280px] pt-14 pb-24 lg:py-0">
                <AppLayout>
                    <Outlet />
                </AppLayout>
            </div>
        </>
    );
};

const LoadingComponent = () => (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[50vh] gap-4">
        <Spinner size="lg" />
        <span className="text-muted-foreground animate-pulse">Loading...</span>
    </div>
);

// --- Routes ---

const rootRoute = createRootRoute({
    component: RootComponent,
});

// Dashboard Layout Route (Authenticated Shell)
const dashboardShellRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'dashboard-shell',
    component: AuthLayoutComponent,
});

const dashboardRoute = createRoute({
    getParentRoute: () => dashboardShellRoute,
    path: 'dashboard',
    component: HomePage,
    pendingComponent: LoadingComponent,
});

const settingsRoute = createRoute({
    getParentRoute: () => dashboardShellRoute,
    path: 'settings',
    component: AccountSettings,
    pendingComponent: LoadingComponent,
});

const servicesRoute = createRoute({
    getParentRoute: () => dashboardShellRoute,
    path: 'services',
    component: ServicesPage,
    pendingComponent: LoadingComponent,
});

const teamRoute = createRoute({
    getParentRoute: () => dashboardShellRoute,
    path: 'team',
    component: TeamPage,
    pendingComponent: LoadingComponent,
});

const designHubRoute = createRoute({
    getParentRoute: () => dashboardShellRoute,
    path: 'design-hub',
    component: SplentoDesignSystem,
    pendingComponent: LoadingComponent,
});

// Default Redirect
const indexRoute = createRoute({
    getParentRoute: () => dashboardShellRoute,
    path: '/',
    component: () => <Navigate to="/dashboard" />,
});

// 404 Catch-all
const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute, // Attach to root to capture top-level 404s or change to shell if we want layout
    path: '*',
    component: () => <Navigate to="/dashboard" />, // Or a dedicated NotFound component in future
});

const routeTree = rootRoute.addChildren([
    dashboardShellRoute.addChildren([
        indexRoute,
        dashboardRoute,
        settingsRoute,
        servicesRoute,
        teamRoute,
        designHubRoute,
    ]),
    notFoundRoute,
]);

export const router = createRouter({ routeTree });

// Register the router for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
