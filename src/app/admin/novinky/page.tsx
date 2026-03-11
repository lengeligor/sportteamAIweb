'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NewsPost {
  id: number;
  title: string;
  slug: string;
  published_at: string;
}

export default function AdminNovinkyPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function loadPosts() {
    try {
      const res = await fetch('/api/admin/news');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      console.error('Failed to load posts', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Naozaj chcete vymazať tento článok?')) return;

    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete post', e);
    }
  }

  return (
    <>
      <div className="admin-header">
        <h1>📰 Správa noviniek</h1>
        <Link href="/admin/novinky/novy" className="btn btn-primary" id="new-post-btn">
          ➕ Nový článok
        </Link>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Načítavam...</p>
      ) : posts.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            Zatiaľ neboli pridané žiadne články.
          </p>
          <Link href="/admin/novinky/novy" className="btn btn-primary mt-2">
            Pridať prvý článok
          </Link>
        </div>
      ) : (
        <div className="data-table-wrapper">
          <table className="data-table" id="news-table">
            <thead>
              <tr>
                <th>Názov</th>
                <th>Slug</th>
                <th>Dátum</th>
                <th>Akcie</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td><strong>{post.title}</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>{post.slug}</td>
                  <td>{new Date(post.published_at).toLocaleDateString('sk-SK')}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link href={`/admin/novinky/${post.id}/edit`} className="btn btn-secondary btn-sm">
                        ✏️ Upraviť
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="btn btn-danger btn-sm" id={`delete-btn-${post.id}`}>
                        🗑️ Vymazať
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
