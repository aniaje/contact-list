import { useCallback, useMemo, useState } from 'react';
import { ContactCard, ActionButton, Loader } from '../../components';
import { useContactsData } from '../../hooks/useContactsData';
import { Contact } from '../../types';
import styles from './ContactsList.module.css';

function ContactsList() {
    const { data, loading, error, hasNextPage, retryCount, fetchMore, refetch } = useContactsData({
        retry: 3,
        retryDelay: 2000,
    });

    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [selectionOrder, setSelectionOrder] = useState<string[]>([]);

    const errorRetryLimitNotExceeded: boolean = Boolean(error) && retryCount < 3;
    const isRetryMode: boolean = Boolean(error) && retryCount >= 3;
    const dataIsLoading: boolean = loading || errorRetryLimitNotExceeded;
    const isInitialLoading: boolean = dataIsLoading && data.length === 0;
    const shouldShowLoadMoreBtn: boolean = data.length > 0 && hasNextPage;
    const isEmpty: boolean = data.length === 0;

    const sortedData = useMemo(() => {
        const selectedContacts = selectionOrder
            .map(id => data.find(contact => contact.id === id))
            .filter((contact): contact is Contact => contact !== undefined);
        const unselectedContacts = data.filter(contact => !selected.has(contact.id));
        return [...selectedContacts, ...unselectedContacts];
    }, [data, selected, selectionOrder]);

    const handleToggle = useCallback((id: string) => {
        setSelected(prev => {
            const isSelected = prev.has(id);
            const newSet = new Set(prev);

            if (isSelected) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }

            return newSet;
        });

        setSelectionOrder(prev => {
            const isInOrder = prev.includes(id);

            if (isInOrder) {
                return prev.filter(itemId => itemId !== id);
            } else {
                return [...prev, id];
            }
        });
    }, []);

    return (
        <>
            <header className={styles.header}>
                <span aria-live="polite" aria-atomic="true">
                    Selected contacts: {selected.size}
                </span>
            </header>
            <main className={styles.main}>
                {isInitialLoading ? (
                    <Loader />
                ) : isEmpty ? (
                    <div role="alert" aria-live="assertive" className={styles.noData}>
                        No contacts available.
                    </div>
                ) : (
                    <>
                        <div className={styles.list} role="list" aria-label="Contacts list">
                            {sortedData.map(contactCard => (
                                <ContactCard
                                    key={contactCard.id}
                                    data={contactCard}
                                    isSelected={selected.has(contactCard.id)}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </div>
                        {error && isRetryMode && (
                            <div role="alert" aria-live="assertive" className="sr-only">
                                Error loading contacts. Please retry.
                            </div>
                        )}
                    </>
                )}
                {shouldShowLoadMoreBtn && (
                    <div className={styles.buttonContainer}>
                        {isRetryMode ? (
                            <ActionButton
                                variant="error"
                                onClick={refetch}
                                aria-label="Retry loading contacts"
                            >
                                Retry
                            </ActionButton>
                        ) : (
                            <ActionButton
                                variant="primary"
                                onClick={fetchMore}
                                isLoading={dataIsLoading}
                                aria-label="Load more contacts"
                            >
                                Load More
                            </ActionButton>
                        )}
                    </div>
                )}
            </main>
        </>
    );
}

export default ContactsList;
