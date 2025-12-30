import { useState, useEffect, lazy, Suspense } from 'react';
import { SecurityTabSkeleton } from '@/components/team/security/SecurityTabSkeleton';
import { SecurityOverviewCard } from '@/components/team/security/SecurityOverviewCard';
import { SecurityAlertBanner } from '@/components/team/security/SecurityAlertBanner';
import { TwoFactorCard } from '@/components/team/security/TwoFactorCard';
import { MemberSecurityTable } from '@/components/team/security/MemberSecurityTable';
import { SessionManagementCard } from '@/components/team/security/SessionManagementCard';
import { IpAllowlistCard } from '@/components/team/security/IpAllowlistCard';
import { LoginHistoryCard } from '@/components/team/security/LoginHistoryCard';
import { PasswordPoliciesCard } from '@/components/team/security/PasswordPoliciesCard';
import { useSecurity } from '@/hooks/useSecurity';
import { Icon } from "@iconify/react";
import type { Session, IpRule, IpRuleType } from '@/types/security';

const Enforce2FAModal = lazy(() => import('@/components/team/security/modals/Enforce2FAModal').then(m => ({ default: m.Enforce2FAModal })));
const RevokeSessionModal = lazy(() => import('@/components/team/security/modals/RevokeSessionModal').then(m => ({ default: m.RevokeSessionModal })));
const RevokeAllSessionsModal = lazy(() => import('@/components/team/security/modals/RevokeAllSessionsModal').then(m => ({ default: m.RevokeAllSessionsModal })));
const AddIpRuleModal = lazy(() => import('@/components/team/security/modals/AddIpRuleModal').then(m => ({ default: m.AddIpRuleModal })));
const EditIpRuleModal = lazy(() => import('@/components/team/security/modals/EditIpRuleModal').then(m => ({ default: m.EditIpRuleModal })));

export function SecurityTab() {
    const {
        security,
        memberSecurity,
        sessions,
        loginHistory,
        membersWithout2FA,
        isLoading,
        activeModal,
        modalData,
        openModal,
        closeModal,
        toggleEnforce2FA,
        updateGracePeriod,
        updateSessionTimeout,
        revokeSession,
        revokeAllOtherSessions,
        toggleIpAllowlist,
        addIpRule,
        updateIpRule,
        deleteIpRule,
        updatePasswordPolicy
    } = useSecurity();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            setMounted(true);
        });
        return () => cancelAnimationFrame(handle);
    }, []);

    // Simulate loading state for Phase demonstration
    const [simulatedLoading, setSimulatedLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setSimulatedLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted || isLoading || simulatedLoading) {
        return <SecurityTabSkeleton />;
    }

    const handleToggleEnforcement = (enabled: boolean) => {
        if (enabled) {
            openModal('enforce_2fa');
        } else {
            toggleEnforce2FA(false);
        }
    };

    const handleConfirmEnforcement = () => {
        toggleEnforce2FA(true);
        closeModal();
    };

    const handleRevokeSessionConfirm = () => {
        const session = modalData as Session;
        if (session) {
            revokeSession(session.id);
            closeModal();
        }
    };

    const handleRevokeAllSessionsConfirm = () => {
        revokeAllOtherSessions();
        closeModal();
    };

    const handleAddIpRuleConfirm = (data: { label: string; value: string; type: IpRuleType }) => {
        addIpRule({ ...data, isActive: true });
        closeModal();
    };

    const handleEditIpRuleConfirm = (data: { label: string; value: string; type: IpRuleType }) => {
        const rule = modalData as IpRule;
        if (rule) {
            updateIpRule(rule.id, data);
            closeModal();
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header Info */}
            <div className="flex flex-col gap-1 px-1">
                <h1 className="text-2xl font-bold text-foreground">Security Settings</h1>
                <p className="text-default-500">Manage your team's security posture, active sessions, and access rules.</p>
            </div>

            {/* 5.1 Security Alert Banner */}
            <SecurityAlertBanner
                membersWithout2FA={membersWithout2FA.length}
                onFix2FA={() => openModal('enforce_2fa')}
            />

            {/* 5.2 Security Overview Stats */}
            <SecurityOverviewCard overview={security.overview} />

            {/* 5.3 Two-Factor Authentication Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <Icon icon="gravity-ui:shield-check" className="text-xl text-default-400" />
                    <h2 className="text-lg font-semibold text-foreground">Access Protection</h2>
                </div>
                <TwoFactorCard
                    state={security.twoFactor}
                    onToggleEnforcement={handleToggleEnforcement}
                    onUpdateGracePeriod={updateGracePeriod}
                />
                <MemberSecurityTable members={memberSecurity} />
            </div>

            {/* 5.4 Session Management Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <Icon icon="gravity-ui:clock-arrow-rotate-left" className="text-xl text-default-400" />
                    <h2 className="text-lg font-semibold text-foreground">Sessions & Activity</h2>
                </div>
                <SessionManagementCard
                    sessions={sessions}
                    timeout={security.sessions.timeout}
                    onUpdateTimeout={updateSessionTimeout}
                    onRevokeSession={(session) => openModal('revoke_session', session)}
                    onRevokeAllSessions={() => openModal('revoke_all_sessions')}
                />
            </div>

            {/* 5.5 Login History Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <Icon icon="gravity-ui:list-ul" className="text-xl text-default-400" />
                    <h2 className="text-lg font-semibold text-foreground">Login Activity</h2>
                </div>
                <LoginHistoryCard history={loginHistory} />
            </div>

            {/* 5.5 IP Allowlisting Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <Icon icon="gravity-ui:globe" className="text-xl text-default-400" />
                    <h2 className="text-lg font-semibold text-foreground">Network Security</h2>
                </div>
                <IpAllowlistCard
                    settings={security.ipAllowlist}
                    onToggleEnabled={toggleIpAllowlist}
                    onAddRule={() => openModal('add_ip_rule')}
                    onEditRule={(rule) => openModal('edit_ip_rule', rule)}
                    onDeleteRule={(rule) => deleteIpRule(rule.id)}
                    onToggleRule={(rule) => updateIpRule(rule.id, { isActive: !rule.isActive })}
                />
            </div>

            {/* 5.6 Password Policies Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <Icon icon="gravity-ui:key" className="text-xl text-default-400" />
                    <h2 className="text-lg font-semibold text-foreground">Account Security</h2>
                </div>
                <PasswordPoliciesCard
                    policy={security.passwordPolicy}
                    onUpdatePolicy={updatePasswordPolicy}
                />
            </div>

            {/* Modals */}
            <Suspense fallback={null}>
                {activeModal === 'enforce_2fa' && (
                    <Enforce2FAModal
                        isOpen={true}
                        onClose={closeModal}
                        onConfirm={handleConfirmEnforcement}
                        membersWithout2FA={membersWithout2FA.length}
                    />
                )}
                {activeModal === 'revoke_session' && (
                    <RevokeSessionModal
                        isOpen={true}
                        onClose={closeModal}
                        onConfirm={handleRevokeSessionConfirm}
                        session={modalData as Session}
                    />
                )}
                {activeModal === 'revoke_all_sessions' && (
                    <RevokeAllSessionsModal
                        isOpen={true}
                        onClose={closeModal}
                        onConfirm={handleRevokeAllSessionsConfirm}
                    />
                )}
                {activeModal === 'add_ip_rule' && (
                    <AddIpRuleModal
                        isOpen={true}
                        onClose={closeModal}
                        onConfirm={handleAddIpRuleConfirm}
                    />
                )}
                {activeModal === 'edit_ip_rule' && (
                    <EditIpRuleModal
                        isOpen={true}
                        onClose={closeModal}
                        onConfirm={handleEditIpRuleConfirm}
                        rule={modalData as IpRule}
                    />
                )}
            </Suspense>
        </div>
    );
}
