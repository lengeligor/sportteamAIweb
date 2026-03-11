'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  src: string;
  title: string;
  category: string;
}

const gallery: GalleryItem[] = [
  { src: '/gallery/zapas-1.png', title: 'Zápas A-tímu - jesenná časť', category: 'Zápasy' },
  { src: '/gallery/zapas-2.png', title: 'Oslava gólu na domácom ihrisku', category: 'Zápasy' },
  { src: '/gallery/trening.png', title: 'Tréning mládežníckych kategórií', category: 'Tréningy' },
  { src: '/gallery/tim.png', title: 'Tímové foto pred sezónou', category: 'Tím' },
  { src: '/gallery/ihrisko.png', title: 'Naše futbalové ihrisko', category: 'Ihrisko' },
];

const categories = ['Všetko', ...Array.from(new Set(gallery.map(g => g.category)))];

export function GalleryClient() {
  const [filter, setFilter] = useState('Všetko');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = filter === 'Všetko' ? gallery : gallery.filter(g => g.category === filter);

  return (
    <>
      <div className="gallery-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setFilter(cat)}
            id={`filter-${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filtered.map((item, i) => (
          <div
            key={i}
            className={`gallery-item card animate-fade-in-up delay-${(i % 4) + 1}`}
            onClick={() => setLightbox(item)}
            id={`gallery-item-${i}`}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setLightbox(item)}
          >
            <div className="gallery-item-img">
              <Image
                src={item.src}
                alt={item.title}
                width={600}
                height={400}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="gallery-item-info">
              <h3>{item.title}</h3>
              <span className="badge badge-yellow">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)} id="lightbox">
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.title}
              width={1200}
              height={800}
              style={{ width: '100%', height: 'auto', borderRadius: '0.75rem' }}
            />
            <div className="lightbox-caption">
              <h3>{lightbox.title}</h3>
              <span className="badge badge-yellow">{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
