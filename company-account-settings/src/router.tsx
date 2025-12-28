import { lazy } from 'react';
import { createRouter, createRoute, createRootRoute, Navigate } from '@tanstack/react-router';
import { RootComponent, AuthLayoutComponent, LoadingComponent } from '@/components/router/RouterComponents';

// --- Lazy loaded page components (Phase 1: Route Splitting) ---

const HomePage = lazy(() => import('./app/HomePage').then(m => ({ default: m.HomePage })));
const AccountSettings = lazy(() => import('@/app/admin/AccountSettings').then(m => ({ default: m.AccountSettings })));
const ServicesPage = lazy(() => import('./app/admin/ServicesPage').then(m => ({ default: m.ServicesPage })));
const TeamPage = lazy(() => import('./app/TeamPage').then(m => ({ default: m.TeamPage })));
const SplentoDesignSystem = lazy(() => import('@/components/design-system/SplentoDesignSystem').then(m => ({ default: m.SplentoDesignSystem })));

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
