import { useState, useCallback } from 'react';
import type {
    TeamSettings,
    DataExport,
    DataExportRequest,
    AdminTransferRequest,
    TeamDeletionRequest
} from '@/types/settings';
import { MOCK_TEAM_SETTINGS, MOCK_EXPORT_HISTORY } from '@/data/mock-settings';

/**
 * Custom hook for Team Settings management
 * 
 * @description Manages local state for team configuration and handles simulated API interactions
 */
export function useSettings() {
    const [settings, setSettings] = useState<TeamSettings>(MOCK_TEAM_SETTINGS);
    const [exportHistory, setExportHistory] = useState<DataExport[]>(MOCK_EXPORT_HISTORY);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Update team settings
     */
    const updateSettings = useCallback(async (updates: Partial<TeamSettings>) => {
        // Optimistic update
        setSettings(prev => ({
            ...prev,
            ...updates,
            updatedAt: new Date().toISOString(),
        }));

        setIsLoading(true);
        // Simulate API delay (e.g. network latency)
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
    }, []);

    /**
     * Request data export
     */
    const requestDataExport = useCallback(async (request: DataExportRequest) => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newExport: DataExport = {
            id: `EXP-${new Date().getTime()}`,
            teamId: settings.id,
            format: request.format,
            requestedAt: new Date().toISOString(),
            requestedBy: 'user-001', // Mocked user
            status: 'processing',
            dataScopes: request.dataScopes,
        };

        setExportHistory(prev => [newExport, ...prev]);
        setIsLoading(false);
    }, [settings.id]);

    /**
     * Download data export (Mock)
     */
    const downloadExport = useCallback((exportId: string) => {
        if (!exportId) return;
        // Mock download logic
    }, []);

    /**
     * Delete data export from history
     */
    const deleteExport = useCallback(async (exportId: string) => {
        setExportHistory(prev => prev.filter(exp => exp.id !== exportId));
    }, []);

    /**
     * Transfer admin rights (Mock)
     */
    const transferAdminRights = useCallback(async (request: AdminTransferRequest) => {
        if (!request) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
    }, []);

    /**
     * Delete team (Mock)
     */
    const deleteTeam = useCallback(async (request: TeamDeletionRequest) => {
        if (!request) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsLoading(false);
    }, []);

    return {
        settings,
        exportHistory,
        isLoading,
        updateSettings,
        requestDataExport,
        downloadExport,
        deleteExport,
        transferAdminRights,
        deleteTeam,
    };
}
