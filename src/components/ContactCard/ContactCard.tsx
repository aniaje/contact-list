import type { Contact } from '../../types';
import styles from './ContactCard.module.css';

type contactCardProps = {
    data: Contact;
    isSelected: boolean;
    onToggle: (id: string) => void;
};

function ContactCard({ data, isSelected, onToggle }: contactCardProps) {
    const getInitials = (name: string) => {
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return parts[0][0]?.toUpperCase() || '';
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onToggle(data.id);
        }
    };

    return (
        <div
            className={`${styles.card} ${isSelected ? styles.selected : ''}`}
            onClick={() => onToggle(data.id)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${data.firstNameLastName}, ${data.jobTitle}. ${
                isSelected ? 'Selected' : 'Not selected'
            }. Press to ${isSelected ? 'deselect' : 'select'}.`}
        >
            <div className={styles.header}>
                <div className={styles.avatar} aria-hidden="true">
                    {getInitials(data.firstNameLastName)}
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>{data.firstNameLastName}</div>
                    <div className={styles.jobTitle}>{data.jobTitle}</div>
                </div>
            </div>

            <div className={styles.email}>
                <a
                    className={styles.emailLink}
                    href={`mailto:${data.emailAddress}`}
                    aria-label={`Send email to ${data.firstNameLastName}`}
                    onClick={e => e.stopPropagation()}
                    onMouseDown={e => e.stopPropagation()}
                    onKeyDown={e => {
                        if (e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            (e.currentTarget as HTMLAnchorElement).click();
                        } else {
                            e.stopPropagation();
                        }
                    }}
                >
                    {data.emailAddress}
                </a>
            </div>
        </div>
    );
}

export default ContactCard;
