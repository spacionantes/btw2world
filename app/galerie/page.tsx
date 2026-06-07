import type { Metadata } from 'next'
import Image from 'next/image'
import Nav from '@/components/layout/Nav'

export const metadata: Metadata = {
  title: 'Galerie | BTW2WORLD',
  description: "Photos d'expéditions — Kirghizistan, Népal et au-delà",
}

const PHOTOS = [
  { src: '/images/15.jpg',               ratio: '4/3',  location: 'Ala-Kul 3500m',     country: 'Kirghizistan' },
  { src: '/images/11.jpg',               ratio: '4/3',  location: 'Thorong-La 5416m',   country: 'Népal' },
  { src: '/images/kyrg-famille.jpg',     ratio: '3/2',  location: 'Yourte nomade',      country: 'Kirghizistan' },
  { src: '/images/13.jpg',               ratio: '4/3',  location: 'Kel-Suu',            country: 'Kirghizistan' },
  { src: '/images/12.jpg',               ratio: '16/9', location: 'Himalaya',           country: 'Népal' },
  { src: '/images/kyrg-fille-cheval.jpg',ratio: '3/4',  location: 'Steppe',             country: 'Kirghizistan' },
  { src: '/images/14.jpg',               ratio: '16/9', location: 'Song-Köl',           country: 'Kirghizistan' },
  { src: '/images/kyrg-filles.jpg',      ratio: '3/4',  location: 'Camp nomade',        country: 'Kirghizistan' },
  { src: '/images/maxence.jpg',          ratio: '3/4',  location: 'Base camp',          country: 'Kirghizistan' },
]

export default function GaleriePage() {
  return (
    <div style={{ background: '#1e2e22', minHeight: '100dvh' }}>
      <Nav />

      {/* Header */}
      <div style={{ padding: '140px 64px 64px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#f6b74d', marginBottom: '16px' }}>Le terrain en images</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 800, fontSize: 'clamp(56px, 8vw, 120px)', color: '#fff', textTransform: 'uppercase', lineHeight: 0.88 }}>GALERIE</h1>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '18px', color: 'rgba(255,255,255,0.45)', maxWidth: '280px', lineHeight: 1.7 }}>
          Ce que les cartes ne montrent pas
        </p>
      </div>

      {/* Grande photo hero */}
      <div style={{ position: 'relative', height: '80vh', overflow: 'hidden', margin: '0 64px' }}>
        <Image src="/images/hero-bg.jpg" alt="Kirghizistan" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(30,46,34,0.9) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '40px', left: '40px' }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: '32px', color: '#fff', textTransform: 'uppercase' }}>Song-Köl · Kirghizistan</p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>Chevaux sauvages au bord du lac</p>
        </div>
      </div>

      {/* Grille masonry */}
      <div style={{ padding: '32px 64px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }} className="grid-masonry">
          {PHOTOS.map((photo, i) => (
            <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: photo.ratio as string }}>
                <Image src={photo.src} alt={photo.location} fill sizes="33vw" style={{ objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px 16px', background: 'linear-gradient(to top, rgba(30,46,34,0.85), transparent)' }}>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.22em', color: '#f6b74d', marginBottom: '2px' }}>{photo.country}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: '16px', color: '#fff' }}>{photo.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#2d4433', padding: '80px 64px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(18px, 2.5vw, 28px)', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', lineHeight: 1.6 }}>
          Ces images ne sont que ce qui peut se mettre en boîte.<br />Le reste, il faut venir le vivre.
        </p>
        <a href="/candidater" style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', background: '#f6b74d', color: '#1e2e22', padding: '18px 56px', textDecoration: 'none', display: 'inline-block' }}>
          Rejoindre une expédition
        </a>
      </div>
    </div>
  )
}
