import type { Metadata } from 'next';
import { GalleryClient } from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Fotogaléria',
  description: 'Fotogaléria futbalového klubu ŠK Sačurov — fotky zo zápasov, tréningov a klubových akcií.',
};

export default function FotogaleriaPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>📸 Fotogaléria</h1>
          <p style={{ position: 'relative', zIndex: 1 }}>Fotky zo zápasov, tréningov a klubových akcií</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <GalleryClient />
        </div>
      </div>
    </>
  );
}
