import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktné údaje futbalového klubu ŠK Sačurov — adresa, email, telefón.',
};

export default function KontaktPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>📬 Kontakt</h1>
          <p style={{ position: 'relative', zIndex: 1 }}>Kontaktné údaje klubu</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="contact-grid">
            <div className="animate-fade-in-up">
              <h2 className="mb-3">Kontaktné údaje</h2>

              <div className="contact-info-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Adresa</h4>
                  <p>ŠK Sačurov<br />094 13 Sačurov<br />okres Vranov nad Topľou</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>E-mail</h4>
                  <p><a href="mailto:sk.sacurov@gmail.com">sk.sacurov@gmail.com</a></p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">📱</div>
                <div>
                  <h4>Telefón</h4>
                  <p>+421 9XX XXX XXX</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">🏟️</div>
                <div>
                  <h4>Ihrisko</h4>
                  <p>Obecné futbalové ihrisko<br />Sačurov</p>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up delay-2">
              <h2 className="mb-3">Napíšte nám</h2>
              <ContactForm />
            </div>
          </div>

          <div className="map-container mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2600.5!2d21.65!3d48.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473eea1234567890%3A0x1234567890abcdef!2sSa%C4%8Durov!5e0!3m2!1ssk!2ssk!4v1234567890"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa - ŠK Sačurov"
            />
          </div>
        </div>
      </div>
    </>
  );
}
