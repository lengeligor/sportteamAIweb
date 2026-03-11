import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <Image src="/logo.png" alt="ŠK Sačurov" width={36} height={42} className="header-logo-img" />
              <span className="header-logo-text">ŠK Sačurov</span>
            </div>
            <p className="footer-description">
              Futbalový klub ŠK Sačurov — hrdý reprezentant obce Sačurov v regionálnych futbalových súťažiach.
            </p>
          </div>

          <div>
            <h4>Tímy</h4>
            <ul className="footer-links">
              <li><Link href="/a-tim">A-tím (Dospelí)</Link></li>
              <li><Link href="/mladez/u19">U19 Dorast</Link></li>
              <li><Link href="/mladez/u15">U15 Žiaci</Link></li>
            </ul>
          </div>

          <div>
            <h4>Klub</h4>
            <ul className="footer-links">
              <li><Link href="/novinky">Novinky</Link></li>
              <li><Link href="/o-klube">O klube</Link></li>
              <li><Link href="/partneri">Partneri</Link></li>
              <li><Link href="/fotogaleria">Fotogaléria</Link></li>
              <li><Link href="/kontakt">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h4>Kontakt</h4>
            <ul className="footer-links">
              <li>ŠK Sačurov</li>
              <li>Sačurov, 094 13</li>
              <li>okres Vranov nad Topľou</li>
              <li><a href="mailto:sk.sacurov@gmail.com">sk.sacurov@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ŠK Sačurov. Všetky práva vyhradené. | Dáta: <a href="https://sportnet.sme.sk" target="_blank" rel="noopener noreferrer">Sportnet.sme.sk</a></p>
        </div>
      </div>
    </footer>
  );
}
