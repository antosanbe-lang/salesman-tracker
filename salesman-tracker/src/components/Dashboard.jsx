import React from 'react';
import { Plus, Clock, SignOut } from 'phosphor-react';

export default function Dashboard({ user, onLogout, onNewVisit, history }) {
    return (
        <div className="animate-fade-in">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="title">Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Hello, {user.split('@')[0]}</p>
                </div>
                <button
                    onClick={onLogout}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                    <SignOut size={24} />
                </button>
            </header>

            <div
                className="glass-panel"
                style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={onNewVisit}
            >
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '5px' }}>Check In</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Record a new customer visit</p>
                </div>
                <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '50%' }}>
                    <Plus size={24} color="white" />
                </div>
            </div>

            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} /> Recent History
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {history.length === 0 ? (
                    <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>No visits recorded yet.</p>
                    </div>
                ) : (
                    history.map(visit => (
                        <div key={visit.id} className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '16px' }}>
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '12px',
                                    backgroundImage: `url(${visit.photo})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    flexShrink: 0
                                }}
                            />
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {visit.customer}
                                </h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    {new Date(visit.timestamp).toLocaleString(undefined, {
                                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </p>
                                <a
                                    href={`https://www.google.com/maps?q=${visit.location.lat},${visit.location.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none', marginTop: '4px', display: 'inline-block' }}
                                >
                                    View Location
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
