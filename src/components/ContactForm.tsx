'use client';

import { useState, useCallback } from 'react';

function generateMathChallenge(): { question: string; answer: number } {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

export function ContactForm() {
  const [challenge, setChallenge] = useState(() => generateMathChallenge());
  const [captchaInput, setCaptchaInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const refreshCaptcha = useCallback(() => {
    setChallenge(generateMathChallenge());
    setCaptchaInput('');
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setStatus('idle');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Vyplňte všetky polia.');
      return;
    }

    if (parseInt(captchaInput) !== challenge.answer) {
      setError('Nesprávna odpoveď na bezpečnostnú otázku. Skúste znova.');
      refreshCaptcha();
      return;
    }

    // Success
    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
    refreshCaptcha();
  }

  return (
    <form className="card" style={{ padding: '1.5rem' }} id="contact-form" onSubmit={handleSubmit}>
      {status === 'success' && (
        <div className="alert alert-success" style={{ marginBottom: '1rem' }}>
          ✅ Ďakujeme za správu! Ozveme sa vám čo najskôr.
        </div>
      )}
      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">Meno</label>
        <input
          type="text"
          id="contact-name"
          className="form-input"
          placeholder="Vaše meno"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-email">E-mail</label>
        <input
          type="email"
          id="contact-email"
          className="form-input"
          placeholder="vas@email.sk"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">Správa</label>
        <textarea
          id="contact-message"
          className="form-textarea"
          placeholder="Vaša správa..."
          rows={5}
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        ></textarea>
      </div>

      {/* CAPTCHA */}
      <div className="form-group">
        <label className="form-label" htmlFor="captcha-input">
          🔒 Bezpečnostná otázka: <strong>{challenge.question}</strong>
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            id="captcha-input"
            className="form-input"
            placeholder="Vaša odpoveď"
            value={captchaInput}
            onChange={e => setCaptchaInput(e.target.value)}
            required
            style={{ maxWidth: '150px' }}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={refreshCaptcha}
            className="btn btn-secondary btn-sm"
            title="Nová otázka"
            style={{ padding: '0.5rem 0.75rem' }}
          >
            🔄
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        id="contact-submit"
      >
        Odoslať správu
      </button>
    </form>
  );
}
