import { useCallback, useEffect, useState } from 'react';
import { Contact } from '../types';
import apiData from '../api';

interface UseContactsDataOptions {
    retry?: number;
    retryDelay?: number;
    onSuccess?: () => void;
}

interface UseContactsDataFetch {
    data: Contact[];
    loading: boolean;
    error: Error | null;
    hasNextBatch: boolean;
    retryCount: number;
    fetchMore: () => void;
    refetch: () => void;
}

export const useContactsData = (options: UseContactsDataOptions = {}): UseContactsDataFetch => {
    const { retry = 3, retryDelay = 2000, onSuccess } = options;

    const [data, setData] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [hasNextBatch, setHasNextBatch] = useState<boolean>(true);
    const [retryCount, setRetryCount] = useState<number>(0);

    const updatePageData = (data: Contact[], hasNewBatch: boolean): void => {
        setData(prev => [...prev, ...data]);
        setHasNextBatch(hasNewBatch);
        setRetryCount(0);
    };

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { contacts, hasNextBatch } = await apiData();
            updatePageData(contacts, hasNextBatch);
            onSuccess?.();
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }, [onSuccess]);

    const errorRetryLimitNotExceeded: boolean = Boolean(error) && retryCount < retry;

    const retryDataLoad = useCallback((): (() => void) => {
        const timer = setTimeout(() => {
            setRetryCount(prev => prev + 1);
            fetchContacts();
        }, retryDelay);

        return () => clearTimeout(timer);
    }, [fetchContacts, retryDelay]);

    useEffect(() => {
        fetchContacts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (errorRetryLimitNotExceeded) {
            retryDataLoad();
        }
    }, [errorRetryLimitNotExceeded, retryDataLoad]);

    const refetch = useCallback(() => {
        setRetryCount(0);
        fetchContacts();
    }, [fetchContacts]);

    return {
        data,
        loading,
        error,
        hasNextBatch,
        retryCount,
        fetchMore: fetchContacts,
        refetch,
    };
};
