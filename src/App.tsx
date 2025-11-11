import ContactsList from './views/ContactsList/ContactsList';
import { ThemeToggle } from './components';
import './App.css';
import { AppThemeProvider } from './contexts/AppThemeContext';

function App() {
    return (
       <AppThemeProvider>
            <header className="appHeader">
                <ThemeToggle />
            </header>
            <ContactsList />
        </AppThemeProvider>
    );
}

export default App;
