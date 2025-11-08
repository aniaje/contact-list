import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from './Layout';
import PersonInfo from './PersonInfo';
import { ActionButton } from './ActionButton';
import apiData from '../api';
import { toggleSelection } from '../utils/selection';
import { Contact } from '../types';
import styles from './ContactList.module.css';

function ContactList() {
    const [data, setData] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [retryCount, setRetryCount] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { contacts, hasNextPage } = await apiData();
            setData(prev => [...prev, ...contacts]);
            setHasNextPage(hasNextPage);
            setRetryCount(0);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    useEffect(() => {
        if (error && retryCount < 3) {
            const timer = setTimeout(() => {
                setRetryCount(prev => prev + 1);
                fetchContacts();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error, retryCount, fetchContacts]);

    const handleToggle = useCallback((id: string) => {
        setSelected(prev => toggleSelection(prev, id));
    }, []);

    const sortedData = useMemo(() => {
        const selectedContacts = data.filter(contact => selected.has(contact.id));
        const unselectedContacts = data.filter(contact => !selected.has(contact.id));
        return [...selectedContacts, ...unselectedContacts];
    }, [data, selected]);

    return (
        <Layout header={`Selected contacts: ${selected.size}`}>
            <div className={styles.list}>
                {sortedData.map(personInfo => (
                    <PersonInfo
                        key={personInfo.id}
                        data={personInfo}
                        isSelected={selected.has(personInfo.id)}
                        onToggle={handleToggle}
                    />
                ))}
            </div>

            {hasNextPage && (
                <>
                    {error && retryCount >= 3 ? (
                        <ActionButton
                            variant="error"
                            onClick={() => {
                                setRetryCount(0);
                                fetchContacts();
                            }}
                        >
                            Retry
                        </ActionButton>
                    ) : (
                        <ActionButton
                            variant="primary"
                            onClick={fetchContacts}
                            isLoading={loading || (!!error && retryCount < 3)}
                        >
                            Load More
                        </ActionButton>
                    )}
                </>
            )}
        </Layout>
    );
}

export default ContactList;
