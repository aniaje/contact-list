import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Theme = 'light' | 'dark';

interface AppThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const initialTheme = savedTheme || 'light';
    document.documentElement.setAttribute('data-theme', initialTheme);
    return initialTheme;
}

interface AppThemeProviderProps {
    children: ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
            return newTheme;
        });
    };

    return (
        <AppThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </AppThemeContext.Provider>
    );
}

export const useThemeContext = () => useContext(AppThemeContext) as AppThemeContextType;
