import { Contact } from '../types';
import styles from './PersonInfo.module.css';

type personInfoProps = {
    data: Contact;
    isSelected: boolean;
    onToggle: (id: string) => void;
};

function PersonInfo({ data, isSelected, onToggle }: personInfoProps) {
    return (
        <div
            className={`${styles.card} ${isSelected ? styles.selected : ''}`}
            onClick={() => onToggle(data.id)}
        >
            <div className={styles.name}>{data.firstNameLastName}</div>
            <div className={styles.jobTitle}>{data.jobTitle}</div>
            <div className={styles.email}>{data.emailAddress}</div>
        </div>
    );
}

export default PersonInfo;
