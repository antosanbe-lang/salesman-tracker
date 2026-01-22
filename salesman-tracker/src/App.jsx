import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import VisitForm from './components/VisitForm';

function App() {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [view, setView] = useState('dashboard'); // 'dashboard', 'new-visit'
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('visits');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('visits', JSON.stringify(history));
    }, [history]);

    const handleLogin = (email) => {
        setUser(email);
        localStorage.setItem('user', email);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const handleSubmitVisit = (visit) => {
        setHistory([visit, ...history]);
        setView('dashboard');
    };

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="app-container">
            {view === 'dashboard' ? (
                <Dashboard
                    user={user}
                    onLogout={handleLogout}
                    onNewVisit={() => setView('new-visit')}
                    history={history}
                />
            ) : (
                <VisitForm
                    onBack={() => setView('dashboard')}
                    onSubmit={handleSubmitVisit}
                />
            )}
        </div>
    );
}

export default App;
