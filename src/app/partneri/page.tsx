import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partneri',
  description: 'Partneri a sponzori futbalového klubu ŠK Sačurov.',
};

const partners = [
  { name: 'Obec Sačurov', type: 'Hlavný partner', emoji: '🏛️' },
  { name: 'ABC s.r.o.', type: 'Generálny sponzor', emoji: '🏢' },
  { name: 'Potraviny Sačurov', type: 'Sponzor', emoji: '🛒' },
  { name: 'Autoservis XY', type: 'Sponzor', emoji: '🚗' },
  { name: 'Reštaurácia u Jožka', type: 'Partner', emoji: '🍽️' },
  { name: 'Stavebniny DEF', type: 'Partner', emoji: '🧱' },
  { name: 'Pekáreň Sačurov', type: 'Partner', emoji: '🥖' },
  { name: 'Kvetinárstvo Flora', type: 'Partner', emoji: '🌸' },
];

export default function PartneriPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>🤝 Partneri</h1>
          <p style={{ position: 'relative', zIndex: 1 }}>Naši partneri a sponzori</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="text-center mb-4">
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
              Ďakujeme všetkým partnerom a sponzorom za ich podporu. Bez nich by fungovanie 
              klubu ŠK Sačurov nebolo možné.
            </p>
          </div>

          <div className="partners-grid">
            {partners.map((partner, i) => (
              <div
                key={i}
                className={`card partner-card animate-fade-in-up delay-${(i % 4) + 1}`}
                id={`partner-${i}`}
              >
                <div className="partner-logo">{partner.emoji}</div>
                <div className="partner-name">{partner.name}</div>
                <div className="partner-type">{partner.type}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
              <h3>Chcete sa stať partnerom?</h3>
              <p style={{ marginTop: '0.5rem' }}>
                Ak máte záujem o spoluprácu s klubom ŠK Sačurov, neváhajte nás kontaktovať.
              </p>
              <a href="/kontakt" className="btn btn-primary mt-2">
                Kontaktujte nás
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
