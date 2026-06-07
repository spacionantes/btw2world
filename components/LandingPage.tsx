'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { VOYAGES, PHOTOS } from '@/lib/data'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"

/* ── Constantes couleurs ────────────────────────── */
const BG     = '#426248'
const BGDARK = '#1e2e22'
const BGMID  = '#2d4433'
const ACCENT = '#f6b74d'

/* ── Label utilitaire ───────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: M, fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: ACCENT, marginBottom: '24px' }}>
      {children}
    </p>
  )
}

/* ════════════════════════════════════════════════ */
/*  HERO                                            */
/* ════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <Image src="/images/hero-bg.jpg" alt="BTW2WORLD" fill priority sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 45%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,36,26,0.3) 0%, rgba(20,36,26,0.05) 35%, rgba(20,36,26,0.72) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 40%, rgba(10,22,16,0.45) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 32px', gap: '16px' }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
            style={{ fontFamily: M, fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: ACCENT }}>
            L&apos;Entre 2 Mondes
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, delay: 0.7, ease: [0.22,1,0.36,1] }}
            style={{ fontFamily: C, fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.01em' }}>
            Partir à l&apos;aveugle<br />en terre inconnue
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
            style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>
            Expéditions nature · Petit groupe · Destination révélée J-7
          </motion.p>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          style={{ padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.08)' }} />
          <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>Défiler pour découvrir</p>
          <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.08)' }} />
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ */
/*  LE PROJET                                       */
/* ════════════════════════════════════════════════ */
function LeProjet() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.4'] })
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])
  const br = useTransform(scrollYProgress, [0, 0.6], ['20px 20px 0 0', '0px'])

  return (
    <div ref={ref} id="le-projet" style={{ marginTop: '-64px', position: 'relative', zIndex: 10 }}>
      <motion.section style={{ y, borderRadius: br, background: BG, boxShadow: '0 -32px 100px rgba(0,0,0,0.5)' }}>
        <div className="grid-2col" style={{ minHeight: '85vh' }}>

          {/* Texte */}
          <div style={{ padding: '88px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Label>Le projet</Label>
            <h2 style={{ fontFamily: C, fontSize: 'clamp(40px, 4.5vw, 64px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 0.95, marginBottom: '32px' }}>
              Maxence,<br />photographe voyageur
            </h2>
            <p style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.95, maxWidth: '420px', marginBottom: '16px' }}>
              BTW2WORLD n&apos;est pas une agence. C&apos;est un projet photographique et humain — des expéditions pensées comme des rencontres, dans des endroits que la plupart des gens ne verront jamais.
            </p>
            <p style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.95, maxWidth: '420px', marginBottom: '48px' }}>
              Petit groupe, terrain connu, destination tenue secrète jusqu&apos;à J-7. Chaque expédition est unique. Il n&apos;y en aura jamais deux pareilles.
            </p>

            {/* Stats discrets */}
            <div style={{ display: 'flex', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {[['2–6', 'Participants'], ['J-7', 'Révélation'], ['0', 'Agences']].map(([v, l], i) => (
                <div key={l} style={{ flex: 1, paddingRight: i < 2 ? '24px' : '0', paddingLeft: i > 0 ? '24px' : '0', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <div style={{ fontFamily: C, fontSize: '40px', fontStyle: 'italic', fontWeight: 300, color: ACCENT, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
            <Image src="/images/maxence.jpg" alt="Maxence" fill sizes="50vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(66,98,72,0.3), transparent 50%)' }} />
            <div style={{ position: 'absolute', bottom: '40px', left: '36px', right: '36px', borderLeft: '2px solid rgba(246,183,77,0.45)', paddingLeft: '18px' }}>
              <p style={{ fontFamily: C, fontSize: '17px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                &ldquo;Je ne guide pas des touristes. Je partage des endroits avec des gens qui méritent de les voir.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

/* ════════════════════════════════════════════════ */
/*  LE CONCEPT                                      */
/* ════════════════════════════════════════════════ */
const STEPS = [
  { n: '01', t: 'Candidature', b: "Un formulaire, quelques lignes sur vous. Je lis chaque dossier personnellement." },
  { n: '02', t: 'Sélection', b: "Je compose un groupe de 2 à 6 personnes. L'équilibre humain compte autant que la destination." },
  { n: '03', t: 'Révélation J-7', b: "Sept jours avant le départ, les participants reçoivent la destination. Pas une heure avant." },
  { n: '04', t: "L'expédition", b: "Terrain, logistique, photo. Vous apportez l'ouverture. Le reste se construit ensemble." },
]

function LeConcept() {
  return (
    <section id="le-concept" style={{ background: BGMID, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '72px', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <Label>Comment ça marche</Label>
            <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 0.95 }}>
              L&apos;Entre 2 Mondes
            </h2>
          </div>
          <p style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', maxWidth: '320px', lineHeight: 1.85 }}>
            Pas de destination connue avant le départ. L&apos;aventure commence quand on décide de faire confiance.
          </p>
        </div>

        <div className="grid-4col" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {STEPS.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ padding: '48px 32px 48px 0', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none', paddingLeft: i > 0 ? '32px' : '0' }}>
              <div style={{ fontFamily: C, fontSize: '64px', fontStyle: 'italic', fontWeight: 300, color: ACCENT, opacity: 0.5, lineHeight: 1, marginBottom: '20px' }}>{s.n}</div>
              <h3 style={{ fontFamily: C, fontSize: '22px', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>{s.t}</h3>
              <p style={{ fontFamily: J, fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.85 }}>{s.b}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ */
/*  EXPÉDITIONS                                     */
/* ════════════════════════════════════════════════ */
function Expeditions() {
  const STATUS_LBL: Record<string, string> = { ouvert: 'Ouvert', complet: 'Complet', bientot: 'À venir', passe: 'Réalisé' }
  return (
    <section id="expeditions" style={{ background: BG, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <Label>Les expéditions</Label>
          <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 0.95 }}>
            Terres explorées
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {VOYAGES.map((v, i) => (
            <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', minHeight: '280px', background: BGDARK, overflow: 'hidden' }} className="grid-2col">
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <Image src={v.coverImage} alt={v.title} fill sizes="340px" loading="lazy"
                    style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,46,34,0.2)' }} />
                </div>
                {/* Texte */}
                <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <span style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>{v.continent}</span>
                    <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.15)' }} />
                    <span style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: v.status === 'ouvert' ? ACCENT : 'rgba(255,255,255,0.35)', background: v.status === 'ouvert' ? 'rgba(246,183,77,0.12)' : 'transparent', padding: v.status === 'ouvert' ? '3px 10px' : '0' }}>
                      {STATUS_LBL[v.status]}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: C, fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 0.95, marginBottom: '16px' }}>
                    {v.title}
                  </h3>
                  <p style={{ fontFamily: J, fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: '400px', marginBottom: '16px' }}>
                    {v.description}
                  </p>
                  <p style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)' }}>
                    {v.duration} jours · {new Date(v.departureDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ */
/*  GALERIE                                         */
/* ════════════════════════════════════════════════ */
const GALLERY = [
  { src: '/images/hero-bg.jpg', ratio: '16/9', loc: 'Song-Köl', country: 'Kirghizistan' },
  { src: '/images/15.jpg',      ratio: '4/3',  loc: 'Ala-Kul 3500m', country: 'Kirghizistan' },
  { src: '/images/11.jpg',      ratio: '4/3',  loc: 'Thorong-La 5416m', country: 'Népal' },
  { src: '/images/kyrg-famille.jpg', ratio: '3/2', loc: 'Yourte nomade', country: 'Kirghizistan' },
  { src: '/images/13.jpg',      ratio: '4/3',  loc: 'Kel-Suu', country: 'Kirghizistan' },
  { src: '/images/12.jpg',      ratio: '16/9', loc: 'Himalaya', country: 'Népal' },
  { src: '/images/kyrg-fille-cheval.jpg', ratio: '3/4', loc: 'Steppe', country: 'Kirghizistan' },
  { src: '/images/14.jpg',      ratio: '16/9', loc: 'Song-Köl', country: 'Kirghizistan' },
  { src: '/images/kyrg-filles.jpg', ratio: '3/4', loc: 'Camp nomade', country: 'Kirghizistan' },
]

function Galerie() {
  const cols = [
    GALLERY.filter((_, i) => i % 3 === 0),
    GALLERY.filter((_, i) => i % 3 === 1),
    GALLERY.filter((_, i) => i % 3 === 2),
  ]
  return (
    <section id="galerie" style={{ background: BGMID, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '56px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <Label>Sur le terrain</Label>
            <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 0.95 }}>
              Ce que les cartes<br />ne montrent pas
            </h2>
          </div>
          <p style={{ fontFamily: C, fontSize: '18px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.4)', maxWidth: '240px', lineHeight: 1.7 }}>
            Kirghizistan · Népal · et au-delà
          </p>
        </div>

        <div className="grid-masonry">
          {cols.map((col, ci) => (
            <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {col.map((p, pi) => (
                <motion.div key={pi} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay: ci * 0.08 + pi * 0.06 }}
                  style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', aspectRatio: p.ratio as string }}>
                    <Image src={p.src} alt={p.loc} fill sizes="33vw" loading="lazy" style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px 14px', background: 'linear-gradient(to top, rgba(30,46,34,0.8), transparent)' }}>
                      <p style={{ fontFamily: M, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.2em', color: ACCENT, marginBottom: '2px' }}>{p.country}</p>
                      <p style={{ fontFamily: J, fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.85)' }}>{p.loc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ */
/*  CONTACT                                         */
/* ════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" style={{ background: BGDARK, padding: '120px 64px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <Label>Prendre contact</Label>
        <h2 style={{ fontFamily: C, fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 0.92, marginBottom: '24px' }}>
          Intéressé·e par<br />le projet ?
        </h2>
        <p style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, marginBottom: '48px', maxWidth: '480px', margin: '0 auto 48px' }}>
          Que ce soit pour participer à une prochaine expédition, pour collaborer, ou simplement pour suivre l&apos;aventure — écrivez-moi.
        </p>

        <a href="mailto:contact@btw2world.com" style={{
          fontFamily: J, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
          background: ACCENT, color: '#1e2e22', padding: '16px 48px',
          textDecoration: 'none', fontWeight: 500, display: 'inline-block', marginBottom: '20px',
        }}>
          contact@btw2world.com
        </a>

        <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginTop: '32px' }}>
          Kirghizistan · Népal · Prochaine destination inconnue
        </p>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ */
/*  PAGE PRINCIPALE                                 */
/* ════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <main style={{ background: BGDARK }}>
      <Hero />
      <LeProjet />
      <LeConcept />
      <Expeditions />
      <Galerie />
      <Contact />
      <Footer />
    </main>
  )
}
