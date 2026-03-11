import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O klube',
  description: 'Informácie o futbalovom klube ŠK Sačurov — história, pôsobenie a kontaktné údaje.',
};

export default function OKlubePage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>O klube</h1>
          <p style={{ position: 'relative', zIndex: 1 }}>Futbalový klub ŠK Sačurov</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="about-content">
            <div className="about-stats">
              <div className="about-stat card animate-fade-in-up">
                <div className="about-stat-value">⚽</div>
                <div className="about-stat-label">Futbalový klub</div>
              </div>
              <div className="about-stat card animate-fade-in-up delay-1">
                <div className="about-stat-value">3</div>
                <div className="about-stat-label">Aktívne tímy</div>
              </div>
              <div className="about-stat card animate-fade-in-up delay-2">
                <div className="about-stat-value">VII.</div>
                <div className="about-stat-label">Liga ObFZ</div>
              </div>
              <div className="about-stat card animate-fade-in-up delay-3">
                <div className="about-stat-value">VT</div>
                <div className="about-stat-label">Okres Vranov n/T</div>
              </div>
            </div>

            <h2>📖 História klubu</h2>
            <p>
              ŠK Sačurov je futbalový klub z obce Sačurov v okrese Vranov nad Topľou, Prešovský kraj. 
              Klub má dlhoročnú tradíciu v regionálnom futbale a je neoddeliteľnou súčasťou 
              športového a spoločenského života obce.
            </p>
            <p>
              V súčasnosti klub pôsobí vo VII. lige ObFZ Vranov nad Topľou s A-tímom dospelých 
              a aktívne vychováva mládež v kategóriách U19 (dorast) a U15 (žiaci).
            </p>

            <h2>🏟️ Ihrisko</h2>
            <p>
              Domáce zápasy sa hrajú na obecnom futbalovom ihrisku v Sačurove. 
              Ihrisko s trávnatým povrchom poskytuje priestor pre tréningy a zápasy 
              všetkých vekových kategórií.
            </p>

            <div className="map-container mt-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2600!2d21.6969!3d48.8249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ee3e4b5c6d7e8%3A0x9a8b7c6d5e4f3a2b!2sDargovsk%C3%A1%20351%2C%20094%2013%20Sa%C4%8Durov!5e0!3m2!1ssk!2ssk!4v1710000000000"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa - ŠK Sačurov"
              />
            </div>

            <h2 className="mt-4">🎯 Naša vízia</h2>
            <p>
              Cieľom klubu je nielen dosahovať čo najlepšie výsledky v regionálnych súťažiach, 
              ale predovšetkým vychovávať mladých futbalistov a vytvárať komunitu, 
              ktorá spája obyvateľov obce Sačurov a okolia prostredníctvom športu.
            </p>
            <p>
              Veríme, že futbal nie je len o výsledkoch, ale aj o priateľstve, discipline, 
              tímovej práci a zdravom životnom štýle.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
