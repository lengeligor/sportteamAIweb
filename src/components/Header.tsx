'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <>
      <header className="header" id="main-header">
        <div className="header-inner">
          <Link href="/" className="header-logo" id="logo-link">
            <div className="header-logo-icon">ŠK</div>
            <span className="header-logo-text">ŠK Sačurov</span>
          </Link>

          <nav className="header-nav" id="desktop-nav">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
              Domov
            </Link>
            <Link href="/a-tim" className={`nav-link ${isActive('/a-tim') ? 'active' : ''}`}>
              A-tím
            </Link>
            <div className="nav-dropdown">
              <span className={`nav-link nav-dropdown-trigger ${isActive('/mladez') ? 'active' : ''}`}>
                Mládež
              </span>
              <div className="nav-dropdown-menu">
                <Link href="/mladez/u19">U19 Dorast</Link>
                <Link href="/mladez/u15">U15 Žiaci</Link>
              </div>
            </div>
            <Link href="/novinky" className={`nav-link ${isActive('/novinky') ? 'active' : ''}`}>
              Novinky
            </Link>
            <Link href="/o-klube" className={`nav-link ${isActive('/o-klube') ? 'active' : ''}`}>
              O klube
            </Link>
            <Link href="/partneri" className={`nav-link ${isActive('/partneri') ? 'active' : ''}`}>
              Partneri
            </Link>
            <Link href="/kontakt" className={`nav-link ${isActive('/kontakt') ? 'active' : ''}`}>
              Kontakt
            </Link>
          </nav>

          <button
            className="mobile-toggle"
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Otvoriť menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div
        className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`} id="mobile-nav">
        <Link href="/" onClick={() => setMobileOpen(false)}>Domov</Link>
        <Link href="/a-tim" onClick={() => setMobileOpen(false)}>A-tím</Link>

        <div className="mobile-nav-section">Mládež</div>
        <Link href="/mladez/u19" onClick={() => setMobileOpen(false)}>U19 Dorast</Link>
        <Link href="/mladez/u15" onClick={() => setMobileOpen(false)}>U15 Žiaci</Link>

        <div className="mobile-nav-section">Klub</div>
        <Link href="/novinky" onClick={() => setMobileOpen(false)}>Novinky</Link>
        <Link href="/o-klube" onClick={() => setMobileOpen(false)}>O klube</Link>
        <Link href="/partneri" onClick={() => setMobileOpen(false)}>Partneri</Link>
        <Link href="/kontakt" onClick={() => setMobileOpen(false)}>Kontakt</Link>
      </nav>
    </>
  );
}
