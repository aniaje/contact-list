import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Oval } from '../../icons/Oval';
import styles from './ActionButton.module.css';

type ButtonVariant = 'primary' | 'error';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    isLoading?: boolean;
    loadingText?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: styles.primary,
    error: styles.error,
};

export const ActionButton = ({
    children,
    variant = 'primary',
    className = '',
    isLoading = false,
    loadingText = 'Loading...',
    ...props
}: ActionButtonProps) => {
    const buttonClass = `${styles.button} ${variantStyles[variant]} ${className}`.trim();

    return (
        <button {...props} className={buttonClass} disabled={isLoading} aria-busy={isLoading}>
            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <Oval
                        height={16}
                        width={16}
                        color="#ffffff"
                        secondaryColor="#ffffff"
                        strokeWidth={5}
                        strokeWidthSecondary={5}
                        aria-hidden="true"
                    />
                    <span>{loadingText}</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
};
