import { useState, lazy, Suspense } from 'react';
import type { Member, FeatureArea, PermissionLevel } from '@/types/team';
import { MemberSelector } from '../components/MemberSelector';
import { PresetTemplates } from '../components/PresetTemplates';
import { UnsavedChangesBar } from '../components/UnsavedChangesBar';
import { PermissionsEmptyState } from '../components/PermissionsEmptyState';
import { Skeleton } from '@heroui/react';

const PermissionsMatrix = lazy(() => import('../components/PermissionsMatrix').then(m => ({ default: m.PermissionsMatrix })));
import type { PresetType } from '../utils/permissions';
import { getPresetPermissions, detectPreset } from '../utils/permissions';

interface PermissionsTabProps {
    members: Member[];
    onSavePermissions?: (memberId: string, permissions: Record<FeatureArea, PermissionLevel>) => Promise<void>;
}

export function PermissionsTab({ members, onSavePermissions }: PermissionsTabProps) {
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [permissions, setPermissions] = useState<Record<FeatureArea, PermissionLevel> | null>(null);
    const [originalPermissions, setOriginalPermissions] = useState<Record<FeatureArea, PermissionLevel> | null>(null);
    const [activePreset, setActivePreset] = useState<PresetType>('custom');
    const [isSaving, setIsSaving] = useState(false);

    const selectedMember = members.find(m => m.id === selectedMemberId);

    // Check if there are unsaved changes
    const hasUnsavedChanges = permissions && originalPermissions
        ? JSON.stringify(permissions) !== JSON.stringify(originalPermissions)
        : false;

    // Load member permissions when selection changes
    const handleMemberChange = (memberId: string) => {
        const member = members.find(m => m.id === memberId);
        if (member) {
            setSelectedMemberId(memberId);
            setPermissions({ ...member.permissions });
            setOriginalPermissions({ ...member.permissions });
            setActivePreset(detectPreset(member.permissions));
        }
    };

    // Handle preset change
    const handlePresetChange = (preset: PresetType) => {
        if (preset !== 'custom') {
            const newPermissions = getPresetPermissions(preset);
            setPermissions(newPermissions);
            setActivePreset(preset);
        }
    };

    // Handle individual permission change
    const handlePermissionChange = (feature: FeatureArea, level: PermissionLevel) => {
        if (permissions) {
            const newPermissions = { ...permissions, [feature]: level };
            setPermissions(newPermissions);
            setActivePreset(detectPreset(newPermissions));
        }
    };

    // Discard changes
    const handleDiscard = () => {
        if (originalPermissions) {
            setPermissions({ ...originalPermissions });
            setActivePreset(detectPreset(originalPermissions));
        }
    };

    // Save changes
    const handleSave = async () => {
        if (selectedMemberId && permissions && onSavePermissions) {
            setIsSaving(true);
            try {
                await onSavePermissions(selectedMemberId, permissions);
                setOriginalPermissions({ ...permissions });
            } finally {
                setIsSaving(false);
            }
        } else if (selectedMemberId && permissions) {
            // Mock save if no callback provided
            setIsSaving(true);
            setTimeout(() => {
                setOriginalPermissions({ ...permissions });
                setIsSaving(false);
            }, 800);
        }
    };

    return (
        <div className="space-y-6 pb-24 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1 px-1">
                <h1 className="text-2xl font-bold text-foreground">Permissions Management</h1>
                <p className="text-default-500">Assign and manage granular permissions for individual team members using templates or custom rules.</p>
            </div>

            {/* Member Selector */}

            <MemberSelector
                members={members}
                selectedMemberId={selectedMemberId}
                onMemberChange={handleMemberChange}
                hasUnsavedChanges={hasUnsavedChanges}
            />

            {selectedMemberId && permissions ? (
                <>
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        {/* Preset Templates */}
                        <PresetTemplates
                            activePreset={activePreset}
                            onPresetChange={handlePresetChange}
                            isDisabled={selectedMember?.isAdmin}
                        />

                        {/* Permissions Matrix */}
                        <Suspense fallback={<PermissionsMatrixSkeleton />}>
                            <PermissionsMatrix
                                permissions={permissions}
                                onChange={handlePermissionChange}
                                isDisabled={selectedMember?.isAdmin}
                                isAdmin={selectedMember?.isAdmin}
                            />
                        </Suspense>
                    </div>
                </>
            ) : (
                <PermissionsEmptyState />
            )}

            {/* Unsaved Changes Bar */}
            <UnsavedChangesBar
                isVisible={hasUnsavedChanges}
                onDiscard={handleDiscard}
                onSave={handleSave}
                isSaving={isSaving}
            />
        </div>
    );
}

function PermissionsMatrixSkeleton() {
    return (
        <div className="space-y-4 py-8">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
        </div>
    );
}
