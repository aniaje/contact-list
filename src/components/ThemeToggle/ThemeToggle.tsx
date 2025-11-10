import { useState } from 'react';
import { getInitialTheme, saveTheme, toggleTheme, Theme } from '../../utils/theme';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    const handleToggle = () => {
        const newTheme = toggleTheme(theme);
        setTheme(newTheme);
        saveTheme(newTheme);

        const select = document.getElementById('theme') as HTMLSelectElement;
        if (select) {
            select.value = newTheme;
        }
    };

    return (
        <>
            {/* Hidden select for CSS :has() */}
            <select id="theme" name="theme" className={styles.hiddenSelect} defaultValue={theme}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>

            {/* Visual toggle button */}
            <button
                onClick={handleToggle}
                className={styles.toggle}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                <span className={styles.icon}>{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
        </>
    );
}

export default ThemeToggle;
