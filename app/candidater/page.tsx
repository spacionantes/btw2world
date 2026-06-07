import type { Metadata } from 'next'
import Image from 'next/image'
import Nav from '@/components/layout/Nav'
import CandidatureForm from '@/components/voyage/CandidatureForm'

export const metadata: Metadata = {
  title: 'Candidater | BTW2WORLD',
  description: "Rejoindre une expédition BTW2WORLD — candidature en ligne",
}

const POINTS = [
  { titre: 'Sélection personnelle', texte: 'Je lis chaque dossier. Pas d\'algorithme, pas de filtre automatique.' },
  { titre: 'Places limitées', texte: '2 à 6 personnes par expédition pour garder l\'authenticité du groupe.' },
  { titre: 'Réponse sous 48h', texte: 'Retour personnalisé, qu\'il soit positif ou non.' },
]

export default function CandidaterPage() {
  return (
    <div style={{ background: '#1e2e22', minHeight: '100dvh' }}>
      <Nav />

      {/* ── HERO minimal, typographique ──────────────── */}
      <div style={{ padding: '140px 64px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end' }} className="grid-2col">
        <div>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#f6b74d', marginBottom: '24px' }}>04 — Rejoindre une expédition</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 800, fontSize: 'clamp(56px, 7vw, 108px)', color: '#fff', textTransform: 'uppercase', lineHeight: 0.88, marginBottom: '32px' }}>
            CANDIDATER
          </h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: '420px' }}>
            Les places sont rares. Les profils, sélectionnés avec soin. Chaque dossier reçu est lu personnellement.
          </p>
        </div>

        {/* Points clés */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {POINTS.map((p, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '24px 0', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 800, fontSize: '36px', color: '#f6b74d', lineHeight: 1, flexShrink: 0, marginTop: '-4px' }}>0{i + 1}</div>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: '20px', color: '#fff', marginBottom: '6px' }}>{p.titre}</p>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{p.texte}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />
        </div>
      </div>

      {/* ── FORMULAIRE + PHOTO ───────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', minHeight: '80vh' }} className="grid-2col-nosplit">

        {/* Formulaire */}
        <div style={{ padding: '64px', background: '#426248', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: '28px', textTransform: 'uppercase', color: '#fff', marginBottom: '40px' }}>
            Votre dossier de candidature
          </p>
          <CandidatureForm />
        </div>

        {/* Photo + ambiance */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image src="/images/12.jpg" alt="Expédition BTW2WORLD" fill sizes="40vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,46,34,0.3), rgba(30,46,34,0.7))' }} />

          {/* Citation en overlay */}
          <div style={{ position: 'absolute', bottom: '48px', left: '40px', right: '40px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: '16px' }}>
              &ldquo;Si quelque chose en vous répond à l&apos;appel, ne laissez pas passer.&rdquo;
            </p>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#f6b74d' }}>— Maxence</span>
          </div>
        </div>
      </div>
    </div>
  )
}
