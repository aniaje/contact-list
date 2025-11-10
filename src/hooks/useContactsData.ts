import { useCallback, useEffect, useRef, useState } from 'react';
import { Contact } from '../types';
import apiData from '../api';
import { scrollToBottom } from '../utils';

interface UseContactsDataOptions {
    retry?: number;
    retryDelay?: number;
}

interface UseContactsDataReturn {
    data: Contact[];
    loading: boolean;
    error: Error | null;
    hasNextBatch: boolean;
    retryCount: number;
    fetchMore: () => void;
    refetch: () => void;
}

export const useContactsData = (options: UseContactsDataOptions = {}): UseContactsDataReturn => {
    const { retry = 3, retryDelay = 2000 } = options;

    const [data, setData] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [hasNextBatch, setHasNextPage] = useState<boolean>(true);
    const [retryCount, setRetryCount] = useState<number>(0);
    const shouldScrollRef = useRef<boolean>(false);

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { contacts, hasNextBatch } = await apiData();
            setData(prev => [...prev, ...contacts]);
            setHasNextPage(hasNextBatch);
            setRetryCount(0);

            if (shouldScrollRef.current) {
                scrollToBottom();
                shouldScrollRef.current = false;
            }
            return true;
        } catch (err) {
            setError(err as Error);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

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

    const fetchMore = useCallback(() => {
        shouldScrollRef.current = true;
        fetchContacts();
    }, [fetchContacts]);

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
        fetchMore,
        refetch,
    };
};
