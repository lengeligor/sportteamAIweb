import Link from 'next/link';
import { getNewsBySlug, getAllNews } from '@/lib/db';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return { title: 'Článok nenájdený' };

  return {
    title: post.title,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.published_at,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);

  if (!post) notFound();

  const allNews = getAllNews().filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className="badge badge-yellow" style={{ position: 'relative', zIndex: 1, marginBottom: '1rem', display: 'inline-block' }}>Novinky</span>
          <h1>{post.title}</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="news-detail">
            <div className="news-detail-meta">
              <span>📅 {new Date(post.published_at).toLocaleDateString('sk-SK', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}</span>
            </div>

            <div className="news-detail-content">
              {post.content.split('\n').map((paragraph, i) => {
                if (paragraph.trim() === '') return null;
                return <p key={i}>{paragraph}</p>;
              })}
            </div>

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
              <Link href="/novinky" className="btn btn-secondary">
                ← Späť na novinky
              </Link>
            </div>
          </div>

          {allNews.length > 0 && (
            <div style={{ marginTop: '4rem' }}>
              <h2 className="mb-3">Ďalšie novinky</h2>
              <div className="news-grid">
                {allNews.map((p) => (
                  <Link href={`/novinky/${p.slug}`} className="news-card" key={p.id}>
                    <div className="card">
                      <div className="news-card-date">
                        📅 {new Date(p.published_at).toLocaleDateString('sk-SK', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                      <h3>{p.title}</h3>
                      <p className="news-card-excerpt">{p.content.substring(0, 150)}...</p>
                      <div className="news-card-link">Čítať viac</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
