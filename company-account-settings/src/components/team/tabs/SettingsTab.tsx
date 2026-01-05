import { useState, lazy, Suspense } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { MOCK_TEAM_DELETION_IMPACT } from '@/data/mock-settings';
import { TeamProfileSection } from '../settings/TeamProfileSection';
import { LocalizationSection } from '../settings/LocalizationSection';
import { TeamPoliciesSection } from '../settings/TeamPoliciesSection';
import { DataManagementSection } from '../settings/DataManagementSection';
import { AdvancedSettingsSection } from '../settings/AdvancedSettingsSection';
import { DangerZoneSection } from '../settings/DangerZoneSection';

// Lazy load modals
const AdminTransferModal = lazy(() => import('../settings/modals/AdminTransferModal').then(m => ({ default: m.AdminTransferModal })));
const DeleteTeamModal = lazy(() => import('../settings/modals/DeleteTeamModal').then(m => ({ default: m.DeleteTeamModal })));

/**
 * SettingsTab Orchestrator
 * 
 * @description Orchestrates the team settings sections with a refined layout.
 */
export function SettingsTab() {
    const {
        settings,
        exportHistory,
        updateSettings,
        requestDataExport,
        downloadExport,
        deleteExport,
        transferAdminRights,
        deleteTeam
    } = useSettings();

    const [isAdminTransferOpen, setIsAdminTransferOpen] = useState(false);
    const [isDeleteTeamOpen, setIsDeleteTeamOpen] = useState(false);

    return (
        <div className="flex flex-col gap-8 pb-24">
            {/* Tab Header with refined typography */}
            <div className="space-y-1 py-2 border-b border-default-100 dark:border-default-50/10">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Team Settings</h1>
                <p className="text-sm text-muted-foreground max-w-2xl">
                    Configure your team's workspace, localisation, and governance policies.
                    Changes are applied instantly to all organization members.
                </p>
            </div>

            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Top Row: Profile & Localization */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <section aria-labelledby="profile-heading" className="h-full">
                        <TeamProfileSection
                            team={settings}
                            onUpdateTeam={updateSettings}
                        />
                    </section>

                    <section aria-labelledby="localisation-heading" className="h-full">
                        <LocalizationSection
                            team={settings}
                            onUpdateTeam={updateSettings}
                        />
                    </section>
                </div>

                <section aria-labelledby="policies-heading">
                    <TeamPoliciesSection
                        team={settings}
                        onUpdateTeam={updateSettings}
                    />
                </section>

                <section aria-labelledby="data-heading">
                    <DataManagementSection
                        exports={exportHistory}
                        onRequestExport={requestDataExport}
                        onDownload={downloadExport}
                        onDelete={deleteExport}
                    />
                </section>

                {/* Advanced Administration */}
                <section aria-labelledby="advanced-heading">
                    <AdvancedSettingsSection
                        isAdmin={true} // Mocked admin status
                        onTransferAdmin={() => setIsAdminTransferOpen(true)}
                    />
                </section>

                {/* Danger Zone */}
                <section aria-labelledby="danger-heading">
                    <DangerZoneSection
                        isAdmin={true} // Mocked admin status
                        onDeleteTeam={() => setIsDeleteTeamOpen(true)}
                    />
                </section>
            </div>

            {/* Lazy-loaded modals for sensitive actions */}
            <Suspense fallback={null}>
                {isAdminTransferOpen && (
                    <AdminTransferModal
                        isOpen={isAdminTransferOpen}
                        onClose={() => setIsAdminTransferOpen(false)}
                        onSubmit={transferAdminRights}
                    />
                )}
                {isDeleteTeamOpen && (
                    <DeleteTeamModal
                        isOpen={isDeleteTeamOpen}
                        onClose={() => setIsDeleteTeamOpen(false)}
                        team={settings}
                        impact={MOCK_TEAM_DELETION_IMPACT}
                        onSubmit={deleteTeam}
                    />
                )}
            </Suspense>
        </div>
    );
}
