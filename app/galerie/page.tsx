'use client'

import Image from 'next/image'
import Nav from '@/components/layout/Nav'


const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#0d1a10'
const ACCENT = '#f6b74d'

const PHOTOS = [
  { src: '/images/15.jpg',                ratio: '4/3',  location: 'Ala-Kul 3500m',     country: 'Kirghizistan' },
  { src: '/images/11.jpg',                ratio: '4/3',  location: 'Thorong-La 5416m',   country: 'Népal' },
  { src: '/images/kyrg-famille.jpg',      ratio: '3/2',  location: 'Yourte nomade',      country: 'Kirghizistan' },
  { src: '/images/13.jpg',                ratio: '4/3',  location: 'Kel-Suu',            country: 'Kirghizistan' },
  { src: '/images/12.jpg',                ratio: '16/9', location: 'Himalaya',           country: 'Népal' },
  { src: '/images/kyrg-fille-cheval.jpg', ratio: '3/4',  location: 'Steppe',             country: 'Kirghizistan' },
  { src: '/images/14.jpg',                ratio: '16/9', location: 'Song-Köl',           country: 'Kirghizistan' },
  { src: '/images/kyrg-filles.jpg',       ratio: '3/4',  location: 'Camp nomade',        country: 'Kirghizistan' },
  { src: '/images/maxence.jpg',           ratio: '3/4',  location: 'Base camp',          country: 'Kirghizistan' },
  { src: '/images/hero-bg.jpg',           ratio: '16/9', location: 'Song-Köl',           country: 'Kirghizistan' },
]

export default function GaleriePage() {
  return (
    <div style={{ background: BGDARK, minHeight: '100dvh' }}>

      {/* Nav flottante */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <Nav />
      </div>

      {/* Mosaïque plein écran dès le haut */}
      <div style={{ paddingTop: '70px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
          {PHOTOS.map((photo, i) => (
            <div key={i} style={{ position: 'relative', overflow: 'hidden', aspectRatio: photo.ratio as string }}>
              <Image src={photo.src} alt={photo.location} fill sizes="33vw"
                style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                loading={i < 3 ? 'eager' : 'lazy'}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,14,0.7) 0%, transparent 50%)', opacity: 0, transition: 'opacity 0.4s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
              />
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
