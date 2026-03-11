import Link from 'next/link';
import { getNextMatch } from '@/lib/futbalnet/scraper';
import { getLatestNews } from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ŠK Sačurov – Oficiálna stránka futbalového klubu',
  description: 'Oficiálna webová stránka futbalového klubu ŠK Sačurov. Výsledky, program zápasov, tabuľky, novinky a všetko o klube.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [nextMatchA, nextMatchU19, nextMatchU15, latestNews] = await Promise.all([
    getNextMatch('a'),
    getNextMatch('u19'),
    getNextMatch('u15'),
    Promise.resolve(getLatestNews(4)),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge">⚽ VII. liga ObFZ Vranov nad Topľou</div>
          <h1>
            <span className="accent">ŠK Sačurov</span>
            <br />Futbalový klub
          </h1>
          <p className="hero-subtitle">
            Hrdý reprezentant obce Sačurov v regionálnych futbalových súťažiach.
            A-tím, dorast U19 a žiaci U15.
          </p>
          <div className="hero-actions">
            <Link href="/a-tim" className="btn btn-primary" id="hero-cta-team">
              ⚽ A-tím
            </Link>
            <Link href="/novinky" className="btn btn-secondary" id="hero-cta-news">
              📰 Novinky
            </Link>
          </div>
        </div>
      </section>

      {/* Next Match Section */}
      <section className="section" id="next-matches">
        <div className="container">
          <div className="section-header">
            <h2>Najbližšie <span className="accent">zápasy</span></h2>
            <p>Program nadchádzajúcich stretnutí</p>
          </div>

          <div className="next-matches-grid">
            {nextMatchA && (
              <div className="next-match animate-fade-in-up" id="next-match-a">
                <div className="next-match-label">🏆 A-tím — Najbližší zápas</div>
                <div className="next-match-teams">
                  <div className={`next-match-team ${nextMatchA.isHome ? 'home' : 'away'}`}>
                    {nextMatchA.homeTeam}
                  </div>
                  <div className="next-match-vs">VS</div>
                  <div className={`next-match-team ${!nextMatchA.isHome ? 'home' : 'away'}`}>
                    {nextMatchA.awayTeam}
                  </div>
                </div>
                <div className="next-match-info">
                  <span>📅 {nextMatchA.date}</span>
                  <span>⏰ {nextMatchA.time}</span>
                  <span>📍 {nextMatchA.venue}</span>
                </div>
              </div>
            )}

            {nextMatchU19 && (
              <div className="next-match animate-fade-in-up delay-1" id="next-match-u19">
                <div className="next-match-label">🏆 U19 Dorast</div>
                <div className="next-match-teams">
                  <div className={`next-match-team ${nextMatchU19.isHome ? 'home' : 'away'}`}>
                    {nextMatchU19.homeTeam}
                  </div>
                  <div className="next-match-vs">VS</div>
                  <div className={`next-match-team ${!nextMatchU19.isHome ? 'home' : 'away'}`}>
                    {nextMatchU19.awayTeam}
                  </div>
                </div>
                <div className="next-match-info">
                  <span>📅 {nextMatchU19.date}</span>
                  <span>⏰ {nextMatchU19.time}</span>
                </div>
              </div>
            )}

            {nextMatchU15 && (
              <div className="next-match animate-fade-in-up delay-2" id="next-match-u15">
                <div className="next-match-label">🏆 U15 Žiaci</div>
                <div className="next-match-teams">
                  <div className={`next-match-team ${nextMatchU15.isHome ? 'home' : 'away'}`}>
                    {nextMatchU15.homeTeam}
                  </div>
                  <div className="next-match-vs">VS</div>
                  <div className={`next-match-team ${!nextMatchU15.isHome ? 'home' : 'away'}`}>
                    {nextMatchU15.awayTeam}
                  </div>
                </div>
                <div className="next-match-info">
                  <span>📅 {nextMatchU15.date}</span>
                  <span>⏰ {nextMatchU15.time}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section" id="latest-news">
        <div className="container">
          <div className="section-header">
            <h2>Najnovšie <span className="accent">novinky</span></h2>
            <p>Aktuálne správy z klubu ŠK Sačurov</p>
          </div>

          <div className="news-grid">
            {latestNews.map((post, i) => (
              <Link
                href={`/novinky/${post.slug}`}
                className={`news-card animate-fade-in-up delay-${i + 1}`}
                key={post.id}
                id={`news-card-${post.id}`}
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
                  <p className="news-card-excerpt">{post.content.substring(0, 150)}...</p>
                  <div className="news-card-link">Čítať viac</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href="/novinky" className="btn btn-secondary" id="all-news-btn">
              Všetky novinky →
            </Link>
          </div>
        </div>
      </section>

      {/* Club Intro */}
      <section className="section" id="club-intro">
        <div className="container">
          <div className="about-content">
            <div className="text-center">
              <h2>O klube <span className="accent">ŠK Sačurov</span></h2>
              <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                Futbalový klub ŠK Sačurov je hrdým reprezentantom obce Sačurov v okrese Vranov nad Topľou. 
                Klub pôsobí vo viacerých vekových kategóriách a aktívne sa zapája do regionálnych súťaží.
              </p>
            </div>

            <div className="about-stats">
              <div className="about-stat card animate-fade-in-up">
                <div className="about-stat-value">3</div>
                <div className="about-stat-label">Tímy</div>
              </div>
              <div className="about-stat card animate-fade-in-up delay-1">
                <div className="about-stat-value">40+</div>
                <div className="about-stat-label">Hráčov</div>
              </div>
              <div className="about-stat card animate-fade-in-up delay-2">
                <div className="about-stat-value">VII.</div>
                <div className="about-stat-label">Liga</div>
              </div>
              <div className="about-stat card animate-fade-in-up delay-3">
                <div className="about-stat-value">❤️</div>
                <div className="about-stat-label">Srdcom za Sačurov</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
