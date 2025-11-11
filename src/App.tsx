import ContactsList from './views/ContactsList/ContactsList';
import { ThemeToggle } from './components';
import './App.css';
import { AppThemeProvider } from './contexts/AppThemeContext';

function App() {
    return (
       <AppThemeProvider>
            <div className="container">
                <header className="appHeader">
                    <ThemeToggle />
                </header>
                <ContactsList />
            </div>
        </AppThemeProvider>
    );
}

export default App;
