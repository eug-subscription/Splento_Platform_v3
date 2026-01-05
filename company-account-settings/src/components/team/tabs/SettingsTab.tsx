import { useSettings } from '@/hooks/useSettings';
import { MOCK_TEAM_DELETION_IMPACT } from '@/data/mock-settings';
import { TeamProfileSection } from '@/components/team/settings/TeamProfileSection';
import { LocalizationSection } from '@/components/team/settings/LocalizationSection';
import { TeamPoliciesSection } from '@/components/team/settings/TeamPoliciesSection';
import { DataManagementSection } from '@/components/team/settings/DataManagementSection';
import { AdvancedSettingsSection } from '@/components/team/settings/AdvancedSettingsSection';
import { DangerZoneSection } from '@/components/team/settings/DangerZoneSection';
import { useModal } from '@/hooks/useModal';

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

    const { openModal } = useModal();

    return (
        <div className="flex flex-col gap-8 pb-24">
            {/* Tab Header with standardized pattern */}
            <div className="flex flex-col gap-1 px-1">
                <h1 className="text-2xl font-bold text-foreground">Team Settings</h1>
                <p className="text-default-500">Configure your team's workspace, localisation, and governance policies.</p>
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
                        onTransferAdmin={() => openModal('admin_transfer', { onSubmit: transferAdminRights })}
                    />
                </section>

                {/* Danger Zone */}
                <section aria-labelledby="danger-heading">
                    <DangerZoneSection
                        isAdmin={true} // Mocked admin status
                        onDeleteTeam={() => openModal('delete_team', {
                            team: settings,
                            impact: MOCK_TEAM_DELETION_IMPACT,
                            onSubmit: deleteTeam
                        })}
                    />
                </section>
            </div>
        </div>
    );
}
