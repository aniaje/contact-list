import { Contact } from '../types';
import styles from './PersonInfo.module.css';

type personInfoProps = {
    data: Contact;
    isSelected: boolean;
    onToggle: (id: string) => void;
};

function PersonInfo({ data, isSelected, onToggle }: personInfoProps) {
    const getInitials = (name: string) => {
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div
            className={`${styles.card} ${isSelected ? styles.selected : ''}`}
            onClick={() => onToggle(data.id)}
        >
            <div className={styles.header}>
                <div className={styles.avatar}>{getInitials(data.firstNameLastName)}</div>
                <div className={styles.info}>
                    <div className={styles.name}>{data.firstNameLastName}</div>
                    <div className={styles.jobTitle}>{data.jobTitle}</div>
                </div>
            </div>
            <div className={styles.email}>{data.emailAddress}</div>
        </div>
    );
}

export default PersonInfo;
