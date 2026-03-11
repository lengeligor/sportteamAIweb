'use client';

import { useState } from 'react';

export default function AdminChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Nové heslá sa nezhodujú');
      return;
    }

    if (newPassword.length < 6) {
      setError('Nové heslo musí mať aspoň 6 znakov');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (res.ok) {
        setSuccess('Heslo bolo úspešne zmenené!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await res.json();
        setError(data.error || 'Chyba pri zmene hesla');
      }
    } catch {
      setError('Chyba pripojenia');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="admin-header">
        <h1>🔑 Zmeniť heslo</h1>
      </div>

      <div className="card" style={{ maxWidth: '500px', padding: '2rem' }}>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} id="change-password-form">
          <div className="form-group">
            <label className="form-label" htmlFor="old-password">Staré heslo</label>
            <input
              type="password"
              id="old-password"
              className="form-input"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="new-password">Nové heslo</label>
            <input
              type="password"
              id="new-password"
              className="form-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirm-password">Potvrdiť nové heslo</label>
            <input
              type="password"
              id="confirm-password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} id="change-password-btn">
            {loading ? 'Mením...' : 'Zmeniť heslo'}
          </button>
        </form>
      </div>
    </>
  );
}
