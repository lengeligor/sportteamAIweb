import Link from 'next/link';
import { verifySession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The middleware already handles auth, but double-check here  
  const session = await verifySession();
  
  // If no session and not on login page, redirect is handled by middleware
  // This layout wraps authenticated admin pages

  return (
    <div className="admin-layout">
      {session && (
        <aside className="admin-sidebar" id="admin-sidebar">
          <div style={{ marginBottom: '2rem' }}>
            <div className="header-logo-icon" style={{ width: '48px', height: '48px', fontSize: '1rem', marginBottom: '0.5rem' }}>ŠK</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Admin Panel</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{session.username}</div>
          </div>

          <Link href="/admin/novinky" className="admin-sidebar-link" id="admin-nav-news">
            📰 Novinky
          </Link>
          <Link href="/admin/heslo" className="admin-sidebar-link" id="admin-nav-password">
            🔑 Zmeniť heslo
          </Link>
          <Link href="/" className="admin-sidebar-link" id="admin-nav-home">
            🏠 Hlavná stránka
          </Link>
          <form action="/api/admin/logout" method="POST" style={{ marginTop: '1rem' }}>
            <button type="submit" className="admin-sidebar-link" style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', background: 'none', font: 'inherit', color: 'var(--text-secondary)' }} id="admin-logout-btn">
              🚪 Odhlásiť sa
            </button>
          </form>
        </aside>
      )}
      <div className={session ? "admin-main" : ""} style={!session ? { width: '100%' } : undefined}>
        {children}
      </div>
    </div>
  );
}
