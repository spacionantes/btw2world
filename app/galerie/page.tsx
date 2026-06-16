'use client'

import Image from 'next/image'
import Nav from '@/components/layout/Nav'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#354f3b'
const ACCENT = '#f6b74d'

// col: colonnes occupées (sur 3 colonnes), row: rangées occupées
const PHOTOS = [
  { src: '/images/15.jpg',                col: 2, row: 1, location: 'Ala-Kul 3500m',   country: 'Kirghizistan' },
  { src: '/images/kyrg-fille-cheval.jpg', col: 1, row: 2, location: 'Steppe',           country: 'Kirghizistan' },
  { src: '/images/11.jpg',                col: 1, row: 1, location: 'Thorong-La 5416m', country: 'Népal' },
  { src: '/images/kyrg-famille.jpg',      col: 1, row: 1, location: 'Yourte nomade',    country: 'Kirghizistan' },
  { src: '/images/14.jpg',                col: 2, row: 1, location: 'Song-Köl',         country: 'Kirghizistan' },
  { src: '/images/kyrg-filles.jpg',       col: 1, row: 2, location: 'Camp nomade',      country: 'Kirghizistan' },
  { src: '/images/12.jpg',                col: 2, row: 1, location: 'Himalaya',         country: 'Népal' },
  { src: '/images/13.jpg',                col: 1, row: 1, location: 'Kel-Suu',          country: 'Kirghizistan' },
  { src: '/images/maxence.jpg',           col: 1, row: 2, location: 'Base camp',        country: 'Kirghizistan' },
  { src: '/images/Amazonie.jpeg',         col: 2, row: 1, location: 'Rio Negro',        country: 'Brésil' },
  { src: '/images/hero-bg.jpg',           col: 1, row: 1, location: 'Song-Köl',         country: 'Kirghizistan' },
]

export default function GaleriePage() {
  return (
    <div style={{ background: BGDARK, minHeight: '100dvh' }}>

      {/* Nav flottante */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <Nav />
      </div>

      {/* Mosaïque tetris — CSS grid avec spans */}
      <div style={{ paddingTop: '70px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '260px',
          gridAutoFlow: 'row dense',
          gap: '3px',
        }}>
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              style={{
                gridColumn: `span ${photo.col}`,
                gridRow: `span ${photo.row}`,
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('img') as HTMLImageElement | null
                if (img) img.style.transform = 'scale(1.05)'
                const ov = e.currentTarget.querySelector('.ov') as HTMLElement | null
                if (ov) ov.style.opacity = '1'
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('img') as HTMLImageElement | null
                if (img) img.style.transform = 'scale(1)'
                const ov = e.currentTarget.querySelector('.ov') as HTMLElement | null
                if (ov) ov.style.opacity = '0'
              }}
            >
              <Image
                src={photo.src}
                alt={photo.location}
                fill
                sizes={photo.col === 2 ? '66vw' : '33vw'}
                loading={i < 3 ? 'eager' : 'lazy'}
                style={{ objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}
              />
              <div className="ov" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(46,69,50,0.82) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.4s', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '18px', left: '22px', pointerEvents: 'none' }}>
                <p style={{ fontFamily: M, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.22em', color: ACCENT, marginBottom: '4px' }}>{photo.country}</p>
                <p style={{ fontFamily: C, fontSize: '16px', fontStyle: 'italic', fontWeight: 400, color: '#fff' }}>{photo.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 64px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontFamily: C, fontStyle: 'italic', fontSize: 'clamp(18px, 2.5vw, 28px)', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', lineHeight: 1.6 }}>
          Ces images ne sont que ce qui peut se mettre en boîte.<br />Le reste, il faut venir le vivre.
        </p>
        <a href="/candidater" style={{ fontFamily: J, fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', background: ACCENT, color: BGDARK, padding: '18px 56px', textDecoration: 'none', display: 'inline-block' }}>
          Rejoindre une expédition
        </a>
      </div>
    </div>
  )
}
