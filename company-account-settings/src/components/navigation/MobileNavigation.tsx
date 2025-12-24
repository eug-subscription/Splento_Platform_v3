

import { useState } from "react";
import { MobileHeader } from "./MobileHeader";
import { LiquidGlassNav } from "./LiquidGlassNav";
import { MoreDrawer } from "./MoreDrawer";
import { mobileNavItems } from "../../config/navigation";
import type { MobileNavigationProps } from "../../types/navigation";

export function MobileNavigation({
    currentPath = "/dashboard",
    credits,
    user,
    organisation,
    onNavigate,
    onHelpClick,
    onLogout
}: MobileNavigationProps) {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <MobileHeader
                credits={credits}
            />

            <LiquidGlassNav
                items={mobileNavItems}
                activeId={mobileNavItems.find(item => item.href === currentPath)?.id || 'home'}
                onNavigate={onNavigate}
                onMorePress={() => setDrawerOpen(true)}
            />

            <MoreDrawer
                isOpen={isDrawerOpen}
                onOpenChange={setDrawerOpen}
                user={user}
                organisation={organisation}
                credits={credits}
                onNavigate={onNavigate}
                onHelpClick={onHelpClick}
                onLogout={onLogout}
            />
        </>
    );
}
