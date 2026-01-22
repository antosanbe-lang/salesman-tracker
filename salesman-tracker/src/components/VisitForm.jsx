import React, { useState, useRef } from 'react';
import { Camera, MapPin, CheckCircle } from 'phosphor-react';

export default function VisitForm({ onBack, onSubmit }) {
    const [customer, setCustomer] = useState('');
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getLocation = () => {
        setLoading(true);
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setLoading(false);
            },
            (err) => {
                setError('Unable to retrieve location: ' + err.message);
                setLoading(false);
            }
        );
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!customer || !photo || !location) {
            setError('Please complete all fields (Name, Photo, Location)');
            return;
        }

        onSubmit({
            id: Date.now(),
            customer,
            photo,
            location,
            timestamp: new Date().toISOString()
        });
    };

    return (
        <div className="animate-fade-in">
            <h2 className="title" style={{ fontSize: '1.5rem' }}>New Visit</h2>
            <p className="subtitle">Record your presence</p>

            <form onSubmit={handleSubmit} className="glass-panel">
                {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}

                <input
                    className="input-field"
                    placeholder="Customer / Shop Name"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                />

                <div style={{ marginBottom: '1rem' }}>
                    <label className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)' }}>
                        <Camera size={20} />
                        {photo ? 'Retake Photo' : 'Take Photo'}
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            hidden
                            onChange={handlePhotoChange}
                        />
                    </label>
                </div>

                {photo && (
                    <div style={{ marginBottom: '1rem', borderRadius: '12px', overflow: 'hidden' }}>
                        <img src={photo} alt="Preview" style={{ width: '100%', display: 'block' }} />
                    </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                    <button
                        type="button"
                        className="btn-primary"
                        style={{ background: location ? 'var(--success)' : 'rgba(255,255,255,0.1)' }}
                        onClick={getLocation}
                        disabled={loading || location}
                    >
                        {loading ? 'Getting GPS...' : location ? 'Location Locked' : 'Get GPS Location'}
                        {location && <MapPin size={20} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />}
                    </button>
                    {location && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px', textAlign: 'center' }}>
                            Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={onBack} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--text-muted)' }}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        Submit Visit
                    </button>
                </div>
            </form>
        </div>
    );
}
