'use client'

import Image from 'next/image'
import Nav from '@/components/layout/Nav'


const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#0d1a10'
const ACCENT = '#f6b74d'

const PHOTOS = [
  { src: '/images/15.jpg',                location: 'Ala-Kul 3500m',     country: 'Kirghizistan' },
  { src: '/images/11.jpg',                location: 'Thorong-La 5416m',   country: 'Népal' },
  { src: '/images/kyrg-famille.jpg',      location: 'Yourte nomade',      country: 'Kirghizistan' },
  { src: '/images/13.jpg',                location: 'Kel-Suu',            country: 'Kirghizistan' },
  { src: '/images/12.jpg',                location: 'Himalaya',           country: 'Népal' },
  { src: '/images/kyrg-fille-cheval.jpg', location: 'Steppe',             country: 'Kirghizistan' },
  { src: '/images/14.jpg',                location: 'Song-Köl',           country: 'Kirghizistan' },
  { src: '/images/kyrg-filles.jpg',       location: 'Camp nomade',        country: 'Kirghizistan' },
  { src: '/images/maxence.jpg',           location: 'Base camp',          country: 'Kirghizistan' },
  { src: '/images/hero-bg.jpg',           location: 'Song-Köl',           country: 'Kirghizistan' },
  { src: '/images/Amazonie.jpeg',         location: 'Rio Negro',          country: 'Brésil' },
]

export default function GaleriePage() {
  return (
    <div style={{ background: BGDARK, minHeight: '100dvh' }}>

      {/* Nav flottante */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <Nav />
      </div>

      {/* Mosaïque masonry — format naturel des images */}
      <div style={{ paddingTop: '70px' }}>
        <div style={{ columnCount: 3, columnGap: '3px' }}>
          {PHOTOS.map((photo, i) => (
            <div key={i} style={{ breakInside: 'avoid', position: 'relative', overflow: 'hidden', marginBottom: '3px', display: 'block' }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('img') as HTMLImageElement | null
                if (img) img.style.transform = 'scale(1.04)'
                const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement | null
                if (overlay) overlay.style.opacity = '1'
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('img') as HTMLImageElement | null
                if (img) img.style.transform = 'scale(1)'
                const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement | null
                if (overlay) overlay.style.opacity = '0'
              }}
            >
              <Image src={photo.src} alt={photo.location}
                width={800} height={600}
                sizes="33vw"
                loading={i < 3 ? 'eager' : 'lazy'}
                style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
              />
              <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,14,0.75) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.4s', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '20px', pointerEvents: 'none' }}>
                <p style={{ fontFamily: M, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.22em', color: ACCENT, marginBottom: '3px' }}>{photo.country}</p>
                <p style={{ fontFamily: C, fontSize: '15px', fontStyle: 'italic', fontWeight: 400, color: '#fff' }}>{photo.location}</p>
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
