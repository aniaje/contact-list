import styles from './Avatar.module.css';

interface AvatarProps {
    name: string;
}

function Avatar({ name }: AvatarProps) {
    const getInitials = (name: string) => {
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return parts[0][0]?.toUpperCase() || '';
    };

    return (
        <div className={styles.avatar} aria-hidden="true">
            {getInitials(name)}
        </div>
    );
}

export default Avatar;
