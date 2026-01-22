import React, { useState } from 'react';
import { Envelope } from 'phosphor-react';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            onLogin(email);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
                <h1 className="title">Welcome</h1>
                <p className="subtitle">Sign in to track your visits</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Envelope
                            size={20}
                            color="#94A3B8"
                            style={{ position: 'absolute', right: '14px', top: '14px' }}
                        />
                    </div>

                    <button type="submit" className="btn-primary">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}
