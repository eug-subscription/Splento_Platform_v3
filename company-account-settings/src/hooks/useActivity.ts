import { useState, useMemo, useCallback, useEffect } from 'react';
import type { ActivityLogEntry, ActivityFilters, ActivityCategory, DateRangePreset } from '@/types/activity';
import { MOCK_ACTIVITIES } from '@/data/mock-activity';
import { DEFAULT_FILTERS } from '@/data/activity-constants';
import { filterActivities, exportToCSV as exportUtils } from '@/utils/activity';

const ITEMS_PER_PAGE = 50;

export interface UseActivityReturn {
    activities: ActivityLogEntry[];
    allFilteredActivities: ActivityLogEntry[];
    filters: ActivityFilters;
    setFilters: (filters: Partial<ActivityFilters>) => void;
    isLoading: boolean;
    hasMore: boolean;
    loadMore: () => void;
    exportToCSV: () => void;
}

export function useActivity(): UseActivityReturn {
    // 1. Initial State from URL
    const getInitialFilters = (): ActivityFilters => {
        if (typeof window === 'undefined') return DEFAULT_FILTERS;
        const params = new URLSearchParams(window.location.search);
        return {
            category: (params.get('category') as ActivityCategory) || DEFAULT_FILTERS.category,
            memberId: params.get('memberId') || DEFAULT_FILTERS.memberId,
            dateRange: (params.get('dateRange') as DateRangePreset) || DEFAULT_FILTERS.dateRange,
            search: params.get('search') || DEFAULT_FILTERS.search,
        };
    };

    const [filters, setFiltersState] = useState<ActivityFilters>(getInitialFilters);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoading, setIsLoading] = useState(false);

    // 2. Filter Logic
    const allFilteredActivities = useMemo(() => {
        return filterActivities(MOCK_ACTIVITIES, filters);
    }, [filters]);

    const activities = useMemo(() => {
        return allFilteredActivities.slice(0, visibleCount);
    }, [allFilteredActivities, visibleCount]);

    const hasMore = visibleCount < allFilteredActivities.length;

    // 3. Actions
    const setFilters = useCallback((newFilters: Partial<ActivityFilters>) => {
        setFiltersState(prev => ({ ...prev, ...newFilters }));
        setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on filter change
    }, []);

    const loadMore = useCallback(() => {
        setIsLoading(true);
        // Simulate small network delay for UX
        setTimeout(() => {
            setVisibleCount(prev => prev + ITEMS_PER_PAGE);
            setIsLoading(false);
        }, 400);
    }, []);

    const exportData = useCallback(() => {
        exportUtils(allFilteredActivities);
    }, [allFilteredActivities]);

    // 4. URL Sync
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Sync filter states to URL
        if (filters.category !== 'all') params.set('category', filters.category);
        else params.delete('category');

        if (filters.memberId !== 'all') params.set('memberId', filters.memberId);
        else params.delete('memberId');

        if (filters.dateRange !== DEFAULT_FILTERS.dateRange) params.set('dateRange', filters.dateRange);
        else params.delete('dateRange');

        if (filters.search) params.set('search', filters.search);
        else params.delete('search');

        const queryString = params.toString();
        const newPath = window.location.pathname;
        const newURL = queryString ? `${newPath}?${queryString}` : newPath;

        const currentPathWithSearch = window.location.pathname + window.location.search;

        if (currentPathWithSearch !== newURL && params.get('tab') === 'activity') {
            window.history.replaceState({ ...window.history.state }, '', newURL);
        }
    }, [filters]);

    return {
        activities,
        allFilteredActivities,
        filters,
        setFilters,
        isLoading,
        hasMore,
        loadMore,
        exportToCSV: exportData,
    };
}
