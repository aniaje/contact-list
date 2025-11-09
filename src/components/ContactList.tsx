import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Layout from './Layout';
import PersonInfo from './PersonInfo';
import { ActionButton } from './ActionButton';
import { Oval } from './Oval';
import apiData from '../api';
import { toggleSelection } from '../utils/selection';
import { scrollToBottom } from '../utils/scroll';
import { Contact } from '../types';
import styles from './ContactList.module.css';

function ContactList() {
    const [data, setData] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [retryCount, setRetryCount] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const shouldScrollRef = useRef(false);

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { contacts, hasNextPage } = await apiData();
            setData(prev => [...prev, ...contacts]);
            setHasNextPage(hasNextPage);
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

    useEffect(() => {
        fetchContacts();
        // Only run on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handleLoadMore = useCallback(() => {
        shouldScrollRef.current = true;
        fetchContacts();
    }, [fetchContacts]);

    const sortedData = useMemo(() => {
        const selectedContacts = data.filter(contact => selected.has(contact.id));
        const unselectedContacts = data.filter(contact => !selected.has(contact.id));
        return [...selectedContacts, ...unselectedContacts];
    }, [data, selected]);

    return (
        <Layout header={`Selected contacts: ${selected.size}`}>
            {loading && data.length === 0 ? (
                <div className={styles.loadingContainer}>
                    <Oval
                        height={80}
                        width={80}
                        color="#007bff"
                        secondaryColor="#ccc"
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                    />
                </div>
            ) : (
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
            )}
            {data.length > 0 && hasNextPage && (
                <div className={styles.buttonContainer}>
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
                            onClick={handleLoadMore}
                            isLoading={loading || (!!error && retryCount < 3)}
                        >
                            Load More
                        </ActionButton>
                    )}
                </div>
            )}
        </Layout>
    );
}

export default ContactList;
