import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppThemeProvider } from './contexts/AppThemeContext';

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode!);
root.render(
    <StrictMode>
        <AppThemeProvider>
            <App />
        </AppThemeProvider>
    </StrictMode>,
);
