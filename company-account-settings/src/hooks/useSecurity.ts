import { useState, useCallback, useMemo } from 'react';
import { useModal } from '@/hooks/useModal';
import type { ModalType, ModalData, OpenModalFn } from '@/types/modals';
import type {
    SecurityState,
    MemberSecurityStatus,
    Session,
    LoginEvent,
    IpRule,
    PasswordPolicy,
    SessionTimeoutOption,
} from '@/types/security';
import {
    MOCK_SECURITY_STATE,
    MOCK_MEMBER_SECURITY,
    MOCK_SESSIONS,
    MOCK_LOGIN_HISTORY,
} from '@/data/mock-security';

interface UseSecurityReturn {
    // State
    security: SecurityState;
    memberSecurity: MemberSecurityStatus[];
    sessions: Session[];
    loginHistory: LoginEvent[];
    isLoading: boolean;
    error: Error | null;

    // Modal state
    activeModal: ModalType | null;
    modalData: ModalData['data'] | null;
    openModal: OpenModalFn;
    closeModal: () => void;

    // 2FA Actions
    toggleEnforce2FA: (enforced: boolean) => void;
    updateGracePeriod: (hours: number) => void;
    toggleExcludeAdmins: (exclude: boolean) => void;
    send2FAReminder: (memberIds: string[]) => void;

    // Session Actions
    updateSessionTimeout: (timeout: SessionTimeoutOption) => void;
    revokeSession: (sessionId: string) => void;
    revokeAllOtherSessions: () => void;

    // IP Allowlist Actions
    toggleIpAllowlist: (enabled: boolean) => void;
    addIpRule: (rule: Omit<IpRule, 'id' | 'createdAt' | 'createdBy'>) => void;
    updateIpRule: (ruleId: string, updates: Partial<IpRule>) => void;
    deleteIpRule: (ruleId: string) => void;

    // Password Policy Actions
    updatePasswordPolicy: (policy: Partial<PasswordPolicy>) => void;

    // Computed
    hasSecurityIssues: boolean;
    membersWithout2FA: MemberSecurityStatus[];
    currentUserSessions: Session[];
}

export function useSecurity(): UseSecurityReturn {
    const [security, setSecurity] = useState<SecurityState>(MOCK_SECURITY_STATE);
    const [memberSecurity] = useState<MemberSecurityStatus[]>(MOCK_MEMBER_SECURITY);
    const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
    const [loginHistory] = useState<LoginEvent[]>(MOCK_LOGIN_HISTORY);
    const [isLoading] = useState(false);
    const [error] = useState<Error | null>(null);

    const { activeModal, modalData, openModal, closeModal } = useModal();

    // 2FA Actions

    const toggleEnforce2FA = useCallback((enforced: boolean) => {
        setSecurity(prev => ({
            ...prev,
            twoFactor: { ...prev.twoFactor, enforced },
            overview: { ...prev.overview, is2FAEnforced: enforced }
        }));
    }, []);

    const updateGracePeriod = useCallback((gracePeriodHours: number) => {
        setSecurity(prev => ({
            ...prev,
            twoFactor: { ...prev.twoFactor, gracePeriodHours }
        }));
    }, []);

    const toggleExcludeAdmins = useCallback((excludeAdmins: boolean) => {
        setSecurity(prev => ({
            ...prev,
            twoFactor: { ...prev.twoFactor, excludeAdmins }
        }));
    }, []);

    const send2FAReminder = useCallback((memberIds: string[]) => {
        if (!memberIds) return;
        // Mock implementation
    }, []);

    // Session Actions
    const updateSessionTimeout = useCallback((timeout: SessionTimeoutOption) => {
        setSecurity(prev => ({
            ...prev,
            sessions: { ...prev.sessions, timeout }
        }));
    }, []);

    const revokeSession = useCallback((sessionId: string) => {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        setSecurity(prev => ({
            ...prev,
            overview: {
                ...prev.overview,
                totalActiveSessions: Math.max(0, prev.overview.totalActiveSessions - 1)
            }
        }));
    }, []);

    const revokeAllOtherSessions = useCallback(() => {
        setSessions(prev => prev.filter(s => s.isCurrent));
        setSecurity(prev => ({
            ...prev,
            overview: {
                ...prev.overview,
                totalActiveSessions: 1
            }
        }));
    }, []);

    // IP Allowlist Actions
    const toggleIpAllowlist = useCallback((enabled: boolean) => {
        setSecurity(prev => ({
            ...prev,
            ipAllowlist: { ...prev.ipAllowlist, enabled },
            overview: { ...prev.overview, isIpAllowlistEnabled: enabled }
        }));
    }, []);

    const addIpRule = useCallback((rule: Omit<IpRule, 'id' | 'createdAt' | 'createdBy'>) => {
        const newRule: IpRule = {
            ...rule,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            createdBy: 'jane@splento.com', // Mock current user
        };
        setSecurity(prev => ({
            ...prev,
            ipAllowlist: {
                ...prev.ipAllowlist,
                rules: [...prev.ipAllowlist.rules, newRule]
            },
            overview: {
                ...prev.overview,
                ipRulesActive: prev.overview.ipRulesActive + 1
            }
        }));
    }, []);

    const updateIpRule = useCallback((ruleId: string, updates: Partial<IpRule>) => {
        setSecurity(prev => ({
            ...prev,
            ipAllowlist: {
                ...prev.ipAllowlist,
                rules: prev.ipAllowlist.rules.map(r => r.id === ruleId ? { ...r, ...updates, lastModifiedAt: new Date().toISOString() } : r)
            }
        }));
    }, []);

    const deleteIpRule = useCallback((ruleId: string) => {
        setSecurity(prev => ({
            ...prev,
            ipAllowlist: {
                ...prev.ipAllowlist,
                rules: prev.ipAllowlist.rules.filter(r => r.id !== ruleId)
            },
            overview: {
                ...prev.overview,
                ipRulesActive: Math.max(0, prev.overview.ipRulesActive - 1)
            }
        }));
    }, []);

    // Password Policy Actions
    const updatePasswordPolicy = useCallback((updates: Partial<PasswordPolicy>) => {
        setSecurity(prev => ({
            ...prev,
            passwordPolicy: { ...prev.passwordPolicy, ...updates }
        }));
    }, []);

    // Computed
    const membersWithout2FA = useMemo(() =>
        memberSecurity.filter(m => m.twoFactorStatus === 'disabled'),
        [memberSecurity]
    );

    const hasSecurityIssues = useMemo(() =>
        membersWithout2FA.length > 0 || security.overview.recentFailedLogins > 0,
        [membersWithout2FA, security.overview.recentFailedLogins]
    );

    const currentUserSessions = useMemo(() =>
        sessions.filter(s => s.memberId === '1'), // Mock current member ID
        [sessions]
    );

    return {
        security,
        memberSecurity,
        sessions,
        loginHistory,
        isLoading,
        error,
        activeModal,
        modalData,
        openModal,
        closeModal,
        toggleEnforce2FA,
        updateGracePeriod,
        toggleExcludeAdmins,
        send2FAReminder,
        updateSessionTimeout,
        revokeSession,
        revokeAllOtherSessions,
        toggleIpAllowlist,
        addIpRule,
        updateIpRule,
        deleteIpRule,
        updatePasswordPolicy,
        hasSecurityIssues,
        membersWithout2FA,
        currentUserSessions,
    };
}
