import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import WorldMapSection from '@/components/sections/WorldMapSection'
import { VOYAGES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Le projet | BTW2WORLD',
  description: "Maxence — Photographe voyageur et guide d'expéditions nature en petit groupe",
}

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BG     = '#354f3b'
const BGDARK = '#354f3b'
const BGMID  = '#354f3b'
const ACCENT = '#f6b74d'

const STATUS_LBL: Record<string, string> = { ouvert: 'Ouvert', complet: 'Complet', bientot: 'À venir', passe: 'Réalisé' }

export default function QuiSuisJePage() {
  return (
    <div style={{ background: BGDARK, minHeight: '100dvh' }}>

      {/* 1 — Hero */}
      <PageHero
        image="/images/maxence.jpg"
        label="Le projet"
        title={"Maxence,\nphotographe\nvoyageur"}
        subtitle="Guide d'expéditions · Petit groupe · Destination inconnue"
      />

      {/* 2 — Présentation */}
      <section style={{ background: BG }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '90vh' }}>

          {/* Texte */}
          <div style={{ padding: '88px 64px 88px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden style={{
              position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
              fontFamily: C, fontSize: '280px', fontStyle: 'italic', fontWeight: 700,
              color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
            }}>01</div>

            <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '28px' }}>
              Le projet
            </p>

            <h2 style={{ fontFamily: C, fontSize: 'clamp(52px, 5.5vw, 80px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, marginBottom: '36px', letterSpacing: '-0.02em' }}>
              Maxence,<br />photographe<br />voyageur
            </h2>

            <p style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 2, maxWidth: '400px', marginBottom: '16px' }}>
              BTW2WORLD n&apos;est pas une agence. C&apos;est un projet photographique et humain — des expéditions pensées comme des rencontres, dans des endroits que la plupart des gens ne verront jamais.
            </p>
            <p style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 2, maxWidth: '400px', marginBottom: '56px' }}>
              Petit groupe, terrain connu, destination tenue secrète jusqu&apos;à J-7. Chaque expédition est unique.
            </p>

            <div style={{ display: 'flex', gap: '0', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '40px' }}>
              {[['31', 'Pays visités'], ['6', 'Continents'], ['2', 'Projets BTW2WORLD']].map(([v, l], i) => (
                <div key={l} style={{ flex: 1, paddingRight: i < 2 ? '32px' : 0, paddingLeft: i > 0 ? '32px' : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <div style={{ fontFamily: C, fontSize: '44px', fontStyle: 'italic', fontWeight: 400, color: ACCENT, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontFamily: M, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.25)', marginTop: '10px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <Image src="/images/maxence.jpg" alt="Maxence" fill sizes="50vw"
              style={{ objectFit: 'cover', objectPosition: 'center center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,46,30,0.4), transparent 50%)' }} />
          </div>
        </div>
      </section>

      {/* 3 — Carte + stats */}
      <WorldMapSection />

      {/* 4 — Expéditions */}
      <section style={{ background: BG, padding: '104px 0 80px' }}>
        <div style={{ padding: '0 72px', marginBottom: '64px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '16px' }}>
              Les expéditions
            </p>
            <h2 style={{ fontFamily: C, fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
              Terres explorées
            </h2>
          </div>
          <p style={{ fontFamily: J, fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', maxWidth: '260px', lineHeight: 1.9 }}>
            Chaque destination, une rencontre. Chaque groupe, une alchimie unique.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {VOYAGES.map((v) => (
            <Link key={v.id} href={`/destinations/${v.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', minHeight: '280px', background: BGMID }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <Image src={v.coverImage} alt={v.title} fill sizes="380px" loading="lazy"
                    style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,26,16,0.2)' }} />
                  <div style={{ position: 'absolute', top: '20px', left: '20px', fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', background: v.status === 'ouvert' ? ACCENT : 'rgba(255,255,255,0.15)', color: v.status === 'ouvert' ? BGDARK : 'rgba(255,255,255,0.7)', padding: '6px 12px' }}>
                    {STATUS_LBL[v.status]}
                  </div>
                </div>
                <div style={{ padding: '44px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
                  <div>
                    <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>{v.continent}</p>
                    <h3 style={{ fontFamily: C, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.92, marginBottom: '20px', letterSpacing: '-0.01em' }}>
                      {v.title}
                    </h3>
                    <p style={{ fontFamily: J, fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, maxWidth: '380px' }}>
                      {v.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontFamily: M, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)' }}>
                      {v.duration} jours · {new Date(v.departureDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                    </p>
                    <span style={{ fontFamily: M, fontSize: '10px', letterSpacing: '0.15em', color: ACCENT }}>
                      EXPLORER →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
