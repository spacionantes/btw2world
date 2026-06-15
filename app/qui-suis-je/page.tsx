import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Qui suis-je | BTW2WORLD',
  description: "Maxence — Photographe voyageur et guide d'expéditions nature en petit groupe",
}

const VALEURS = [
  { titre: 'Authenticité', texte: 'Aucun itinéraire figé. Chaque voyage se construit avec le terrain, les gens rencontrés, et ce que la météo décide.' },
  { titre: 'Petit groupe', texte: '2 à 6 personnes maximum. Pas de troupeau. Des gens qui choisissent de se faire confiance.' },
  { titre: 'Terrain connu', texte: "Je n'emmène personne où je ne suis pas allé seul d'abord. Ces routes, je les connais." },
]

const CHIFFRES = [
  { n: '3', label: 'Continents' },
  { n: '12+', label: 'Pays arpentés' },
  { n: '6', label: 'Max par groupe' },
  { n: '0', label: 'Agences impliquées' },
]

export default function QuiSuisJePage() {
  return (
    <div style={{ background: '#426248', minHeight: '100dvh' }}>
      <PageHero
        image="/images/maxence.jpg"
        label="Le projet"
        title={"Maxence,\nphotographe\nvoyageur"}
        subtitle="Guide d'expéditions · Petit groupe · Destination inconnue"
      />

      {/* ── CHIFFRES ────────────────────────────────── */}
      <div style={{ background: '#2d4433', padding: '80px 64px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="grid-4col">
        {CHIFFRES.map((c, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '20px 0', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 800, fontSize: 'clamp(56px, 6vw, 88px)', color: '#f6b74d', lineHeight: 1 }}>{c.n}</div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.45)', marginTop: '8px' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* ── CITATION ────────────────────────────────── */}
      <div style={{ background: '#1e2e22', padding: '96px 64px', display: 'flex', alignItems: 'center', gap: '80px' }} className="grid-2col-nosplit">
        <div style={{ flex: 1, borderLeft: '3px solid #f6b74d', paddingLeft: '40px' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 3vw, 36px)', fontStyle: 'italic', color: '#ffffff', lineHeight: 1.5, marginBottom: '24px' }}>
            &ldquo;Je ne guide pas des touristes. Je partage des endroits avec des gens qui méritent de les voir.&rdquo;
          </p>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#f6b74d' }}>— Maxence</span>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <Image src="/images/kyrg-famille.jpg" alt="Famille kirghize" fill sizes="25vw" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', marginTop: '32px' }}>
            <Image src="/images/kyrg-filles.jpg" alt="Enfants kirghizes" fill sizes="25vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* ── VALEURS ─────────────────────────────────── */}
      <div style={{ background: '#426248', padding: '96px 64px' }}>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#f6b74d', marginBottom: '16px' }}>Ce qui guide chaque expédition</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 'clamp(40px, 5vw, 72px)', color: '#fff', textTransform: 'uppercase', marginBottom: '64px' }}>Mes convictions</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.1)' }} className="grid-3col">
          {VALEURS.map((v, i) => (
            <div key={i} style={{ background: '#426248', padding: '48px 40px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 800, fontSize: '80px', color: 'rgba(246,183,77,0.15)', lineHeight: 1, marginBottom: '-20px' }}>0{i + 1}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: '32px', textTransform: 'uppercase', color: '#fff', marginBottom: '16px' }}>{v.titre}</h3>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{v.texte}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PHOTO STRIP ─────────────────────────────── */}
      <div style={{ background: '#2d4433', padding: '0', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', height: '420px' }}>
          {['/images/14.jpg', '/images/kyrg-fille-cheval.jpg', '/images/13.jpg'].map((src, i) => (
            <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
              <Image src={src} alt="" fill sizes="33vw" style={{ objectFit: 'cover', transition: 'transform 0.8s ease' }} loading="lazy" />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,46,34,0.25)' }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────── */}
      <div style={{ background: '#1e2e22', padding: '80px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 'clamp(36px, 4vw, 64px)', color: '#fff', textTransform: 'uppercase', marginBottom: '12px' }}>Partir avec moi</h2>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.55)' }}>Les prochaines expéditions sont ouvertes à la candidature.</p>
        </div>
        <a href="/candidater" style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', background: '#f6b74d', color: '#1e2e22', padding: '18px 48px', textDecoration: 'none', display: 'inline-block' }}>
          Candidater
        </a>
      </div>
    </div>
  )
}
