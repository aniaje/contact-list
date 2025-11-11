import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppThemeProvider } from './contexts/AppThemeContext';

const THEME_STORAGE_KEY = 'theme';
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme = savedTheme || 'light';
document.documentElement.setAttribute('data-theme', initialTheme);

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode!);
root.render(
    <StrictMode>
        <AppThemeProvider>
            <App />
        </AppThemeProvider>
    </StrictMode>,
);
