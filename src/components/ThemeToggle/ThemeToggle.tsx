import { useThemeContext } from '../../contexts/AppThemeContext';
import styles from './ThemeToggle.module.css';

function ThemeToggle() {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <button
            onClick={toggleTheme}
            className={styles.toggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <span className={styles.icon}>{theme === 'light' ? '🌙' : '☀️'}</span>
        </button>
    );
}

export default ThemeToggle;
