import ContactsList from './views/ContactsList/ContactsList';
import { ThemeToggle } from './components';
import './App.css';

function App() {
    return (
        <div className="container">
            <header className="appHeader">
                <ThemeToggle />
            </header>
            <ContactsList />
        </div>
    );
}

export default App;
