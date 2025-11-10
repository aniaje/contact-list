export const THEME_STORAGE_KEY = 'theme';

export type Theme = 'light' | 'dark';

export function getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    return savedTheme || 'light';
}

export function saveTheme(theme: Theme): void {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function toggleTheme(currentTheme: Theme): Theme {
    return currentTheme === 'light' ? 'dark' : 'light';
}
