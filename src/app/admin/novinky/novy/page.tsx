'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleTitleChange(val: string) {
    setTitle(val);
    setSlug(generateSlug(val));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, content }),
      });

      if (res.ok) {
        router.push('/admin/novinky');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Chyba pri vytváraní článku');
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
        <h1>➕ Nový článok</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card" style={{ maxWidth: '800px', padding: '2rem' }}>
        <form onSubmit={handleSubmit} id="new-post-form">
          <div className="form-group">
            <label className="form-label" htmlFor="post-title">Názov článku</label>
            <input
              type="text"
              id="post-title"
              className="form-input"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Nadpis novinky..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="post-slug">URL slug</label>
            <input
              type="text"
              id="post-slug"
              className="form-input"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-slug"
              required
            />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              URL: /novinky/{slug || '...'}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="post-content">Obsah</label>
            <textarea
              id="post-content"
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Napíšte obsah článku..."
              required
              style={{ minHeight: '300px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading} id="save-post-btn">
              {loading ? 'Ukladám...' : '💾 Publikovať článok'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
              Zrušiť
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
