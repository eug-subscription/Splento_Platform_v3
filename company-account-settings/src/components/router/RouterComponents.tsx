
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { AppLayout } from '@/components/layout/AppLayout';
import { LeftMenu, MobileNavigation } from '@/components/navigation';
import { ThemeProvider } from '@/context/ThemeProvider';
import { LayoutProvider } from '@/context/LayoutProvider';
import { Spinner } from '@heroui/react';



// Wrapper to provide contexts to the entire app within the router
export const RootComponent = () => (
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

        </LayoutProvider>
    </ThemeProvider>
);

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

// Layout wrapper for authenticated pages (using AppLayout)
export const AuthLayoutComponent = () => (
    <AppShell />
);

export const LoadingComponent = () => (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[50vh] gap-4">
        <Spinner size="lg" />
        <span className="text-muted-foreground animate-pulse">Loading...</span>
    </div>
);
