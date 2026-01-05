import { useState, useEffect } from 'react';
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
import type { IpRuleType } from '@/types/security';

/**
 * SecurityTab component
 * Refactored to use GlobalModalManager for consolidated modal management.
 */
export function SecurityTab() {
    const {
        security,
        memberSecurity,
        sessions,
        loginHistory,
        membersWithout2FA,
        isLoading,
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

    // Simulate loading state
    const [simulatedLoading, setSimulatedLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setSimulatedLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted || isLoading || simulatedLoading) {
        return <SecurityTabSkeleton />;
    }

    // Modal Handlers (Consolidated to use Global Modal Registry)
    const handleToggleEnforcement = (enabled: boolean) => {
        if (enabled) {
            openModal('enforce_2fa', {
                membersWithout2FA: membersWithout2FA.length,
                onConfirm: () => {
                    toggleEnforce2FA(true);
                    closeModal();
                }
            });
        } else {
            toggleEnforce2FA(false);
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
                onFix2FA={() => handleToggleEnforcement(true)}
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
                    onRevokeSession={(session) => openModal('revoke_session', {
                        session,
                        onConfirm: () => {
                            revokeSession(session.id);
                            closeModal();
                        }
                    })}
                    onRevokeAllSessions={() => openModal('revoke_all_sessions', {
                        onConfirm: async () => {
                            revokeAllOtherSessions();
                            closeModal();
                        }
                    })}
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

            {/* 5.6 IP Allowlisting Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <Icon icon="gravity-ui:globe" className="text-xl text-default-400" />
                    <h2 className="text-lg font-semibold text-foreground">Network Security</h2>
                </div>
                <IpAllowlistCard
                    settings={security.ipAllowlist}
                    onToggleEnabled={toggleIpAllowlist}
                    onAddRule={() => openModal('add_ip_rule', {
                        onConfirm: (data: { label: string; value: string; type: IpRuleType }) => {
                            addIpRule({ ...data, isActive: true });
                            closeModal();
                        }
                    })}
                    onEditRule={(rule) => openModal('edit_ip_rule', {
                        rule,
                        onConfirm: (data: { label: string; value: string; type: IpRuleType }) => {
                            updateIpRule(rule.id, data);
                            closeModal();
                        }
                    })}
                    onDeleteRule={(rule) => deleteIpRule(rule.id)}
                    onToggleRule={(rule) => updateIpRule(rule.id, { isActive: !rule.isActive })}
                />
            </div>

            {/* 5.7 Password Policies Section */}
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
        </div>
    );
}
