'use client';

import { useState, useEffect, use } from 'react';
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

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`/api/admin/news/${id}`);
        if (res.ok) {
          const post = await res.json();
          setTitle(post.title);
          setSlug(post.slug);
          setContent(post.content);
        }
      } catch (e) {
        console.error('Failed to load post', e);
      } finally {
        setLoadingPost(false);
      }
    }
    loadPost();
  }, [id]);

  function handleTitleChange(val: string) {
    setTitle(val);
    setSlug(generateSlug(val));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, content }),
      });

      if (res.ok) {
        router.push('/admin/novinky');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Chyba pri aktualizácii článku');
      }
    } catch {
      setError('Chyba pripojenia');
    } finally {
      setLoading(false);
    }
  }

  if (loadingPost) {
    return <p style={{ color: 'var(--text-muted)' }}>Načítavam článok...</p>;
  }

  return (
    <>
      <div className="admin-header">
        <h1>✏️ Upraviť článok</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card" style={{ maxWidth: '800px', padding: '2rem' }}>
        <form onSubmit={handleSubmit} id="edit-post-form">
          <div className="form-group">
            <label className="form-label" htmlFor="post-title">Názov článku</label>
            <input
              type="text"
              id="post-title"
              className="form-input"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
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
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="post-content">Obsah</label>
            <textarea
              id="post-content"
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{ minHeight: '300px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading} id="update-post-btn">
              {loading ? 'Ukladám...' : '💾 Uložiť zmeny'}
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
