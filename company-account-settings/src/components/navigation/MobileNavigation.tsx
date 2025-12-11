"use client";

import { useState } from "react";
import { MobileHeader } from "./MobileHeader";
import { BottomTabBar } from "./BottomTabBar";
import { MoreDrawer } from "./MoreDrawer";
import type { MobileNavigationProps } from "../../types/navigation";

export function MobileNavigation({
    currentPath = "/dashboard",
    credits,
    user,
    organisation,
    sections,
    onNavigate,
    onHelpClick,
    onLogout
}: MobileNavigationProps) {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <MobileHeader credits={credits} />

            <BottomTabBar
                currentPath={currentPath}
                onNavigate={onNavigate}
                onMorePress={() => setDrawerOpen(true)}
            />

            <MoreDrawer
                isOpen={isDrawerOpen}
                onOpenChange={setDrawerOpen}
                user={user}
                organisation={organisation}
                sections={sections}
                onNavigate={onNavigate}
                onHelpClick={onHelpClick}
                onLogout={onLogout}
            />
        </>
    );
}
