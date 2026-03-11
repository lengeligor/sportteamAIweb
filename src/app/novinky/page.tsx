import Link from 'next/link';
import { getAllNews } from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novinky',
  description: 'Aktuálne novinky, správy a oznamy z futbalového klubu ŠK Sačurov.',
};

export const dynamic = 'force-dynamic';

export default function NovinkyPage() {
  const news = getAllNews();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>📰 Novinky</h1>
          <p style={{ position: 'relative', zIndex: 1 }}>Aktuálne správy z klubu ŠK Sačurov</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="news-grid">
            {news.map((post, i) => (
              <Link
                href={`/novinky/${post.slug}`}
                className={`news-card animate-fade-in-up delay-${(i % 4) + 1}`}
                key={post.id}
                id={`news-item-${post.id}`}
              >
                <div className="card">
                  <div className="news-card-date">
                    📅 {new Date(post.published_at).toLocaleDateString('sk-SK', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <h3>{post.title}</h3>
                  <p className="news-card-excerpt">{post.content.substring(0, 200)}...</p>
                  <div className="news-card-link">Čítať viac</div>
                </div>
              </Link>
            ))}
          </div>

          {news.length === 0 && (
            <div className="text-center" style={{ padding: '4rem 0' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                Zatiaľ neboli pridané žiadne novinky.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
