'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import WorldMapSection from '@/components/sections/WorldMapSection'
import { VOYAGES } from '@/lib/data'

const J = "'Jost', sans-serif"
const C = "'Shippori Mincho B1', serif"
const M = "'DM Mono', monospace"

const BG     = '#354f3b'
const BGDARK = '#354f3b'
const BGMID  = '#354f3b'
const ACCENT = '#f6b74d'

/* ════════════════════════════════════════════════ */
/*  MARQUEE                                         */
/* ════════════════════════════════════════════════ */
const TICKER_ITEMS = ['Kirghizistan', '·', 'Népal', '·', 'Destination secrète', '·', 'Petit groupe', '·', 'Terrain inexploré', '·', 'Immersion totale', '·', 'Kirghizistan', '·', 'Népal', '·', 'Destination secrète', '·', 'Petit groupe', '·', 'Terrain inexploré', '·', 'Immersion totale', '·']

function Marquee() {
  return (
    <div style={{ background: ACCENT, overflow: 'hidden', padding: '14px 0', display: 'flex' }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee-track { display: flex; gap: 0; animation: marquee 22s linear infinite; white-space: nowrap; will-change: transform; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} style={{
            fontFamily: M, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
            color: '#354f3b', paddingRight: item === '·' ? '28px' : '28px', paddingLeft: item === '·' ? '0' : '0',
            fontWeight: 500,
          }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════ */
/*  HERO                                            */
/* ════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <Image src="/images/hero-btw.png" alt="BTW2WORLD" fill priority sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 45%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,20,14,0.15) 0%, rgba(10,20,14,0.05) 50%, rgba(10,20,14,0.35) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Nav />
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
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <div ref={ref} id="le-projet" style={{ position: 'relative', zIndex: 10 }}>
      <motion.section style={{ y, background: BG }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '90vh' }}>

          {/* Texte */}
          <div style={{ padding: '88px 64px 88px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Numéro décoratif géant */}
            <div aria-hidden style={{
              position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
              fontFamily: C, fontSize: '280px', fontStyle: 'italic', fontWeight: 700,
              color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
            }}>01</div>

            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '28px' }}>
              Le projet
            </motion.p>

            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
              style={{ fontFamily: C, fontSize: 'clamp(52px, 5.5vw, 80px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, marginBottom: '36px', letterSpacing: '-0.02em' }}>
              Maxence,<br />photographe<br />voyageur
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 2, maxWidth: '400px', marginBottom: '16px' }}>
              BTW2WORLD n&apos;est pas une agence. C&apos;est un projet photographique et humain — des expéditions pensées comme des rencontres, dans des endroits que la plupart des gens ne verront jamais.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
              style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 2, maxWidth: '400px', marginBottom: '56px' }}>
              Petit groupe, terrain connu, destination secrète révélée pendant le voyage. Chaque expédition est unique.
            </motion.p>

          </div>

          {/* Photo */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <Image src="/images/maxence.jpg" alt="Maxence" fill sizes="50vw"
              style={{ objectFit: 'cover', objectPosition: 'center center', transition: 'transform 0.8s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,46,30,0.4), transparent 50%)' }} />
          </div>
        </div>
      </motion.section>
    </div>
  )
}

/* ════════════════════════════════════════════════ */
/*  LE CONCEPT — Timeline verticale                 */
/* ════════════════════════════════════════════════ */
const STEPS = [
  { n: '01', t: 'Candidature', b: "Un formulaire, quelques lignes sur vous. Je lis chaque dossier personnellement.", icon: '✦' },
  { n: '02', t: 'Sélection', b: "Je compose un groupe de 2 à 6 personnes. L'équilibre humain compte autant que la destination.", icon: '✦' },
  { n: '03', t: 'Destination secrète', b: "La destination est révélée pendant le voyage aux candidats retenus. Une surprise totale.", icon: '✦' },
  { n: '04', t: "L'expédition", b: "Terrain, logistique, photo. Vous apportez l'ouverture. Le reste se construit ensemble.", icon: '✦' },
]

function LeConcept() {
  return (
    <section id="le-concept" style={{ background: BGDARK, padding: '0', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '85vh' }}>

        {/* Gauche — Titre oversized */}
        <div style={{ padding: '96px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <div aria-hidden style={{
            position: 'absolute', left: '-30px', bottom: '-40px',
            fontFamily: C, fontSize: '320px', fontStyle: 'italic', fontWeight: 700,
            color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>02</div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '32px' }}>
            Comment ça marche
          </motion.p>

          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: C, fontSize: 'clamp(60px, 6vw, 92px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.88, letterSpacing: '-0.02em', marginBottom: '40px' }}>
            L&apos;Entre<br />2 Mondes
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, maxWidth: '320px' }}>
            Pas de destination connue avant le départ. L&apos;aventure commence quand on décide de faire confiance.
          </motion.p>
        </div>

        {/* Droite — Steps en timeline */}
        <div style={{ padding: '96px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0' }}>
          {STEPS.map((s, i) => (
            <motion.div key={s.n}
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{ display: 'flex', gap: '28px', paddingBottom: i < STEPS.length - 1 ? '40px' : 0, marginBottom: i < STEPS.length - 1 ? '0' : 0, position: 'relative' }}>

              {/* Ligne verticale + point */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '28px', height: '28px', border: `1px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px' }}>
                  <span style={{ fontFamily: M, fontSize: '7px', color: ACCENT, letterSpacing: '0.1em' }}>{s.n}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: '1px', flex: 1, background: 'rgba(255,255,255,0.07)', marginTop: '8px', minHeight: '32px' }} />
                )}
              </div>

              <div style={{ paddingBottom: i < STEPS.length - 1 ? '32px' : 0 }}>
                <h3 style={{ fontFamily: C, fontSize: '24px', fontWeight: 400, fontStyle: 'italic', color: '#fff', marginBottom: '10px', lineHeight: 1 }}>{s.t}</h3>
                <p style={{ fontFamily: J, fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.9 }}>{s.b}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ */
/*  EXPÉDITIONS — Cards hover dramatiques           */
/* ════════════════════════════════════════════════ */
function ExpeditionCard({ v, i }: { v: typeof VOYAGES[0], i: number }) {
  const [hovered, setHovered] = useState(false)
  const STATUS_LBL: Record<string, string> = { ouvert: 'Ouvert', complet: 'Complet', bientot: 'À venir', passe: 'Réalisé' }

  return (
    <Link href={`/destinations/${v.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', background: BGMID }}>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', minHeight: '300px' }}>
        {/* Image avec zoom hover */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image src={v.coverImage} alt={v.title} fill sizes="380px" loading="lazy"
            style={{ objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `rgba(13,26,16,${hovered ? 0.1 : 0.25})`, transition: 'background 0.5s' }} />
          {/* Badge statut */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', background: v.status === 'ouvert' ? ACCENT : 'rgba(255,255,255,0.15)', color: v.status === 'ouvert' ? BGDARK : 'rgba(255,255,255,0.7)', padding: '6px 12px' }}>
            {STATUS_LBL[v.status]}
          </div>
        </div>

        {/* Texte */}
        <div style={{ padding: '44px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: `1px solid rgba(255,255,255,${hovered ? 0.1 : 0.04})`, transition: 'border-color 0.4s' }}>
          <div>
            <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>{v.continent}</p>
            <h3 style={{ fontFamily: C, fontSize: 'clamp(30px, 3vw, 46px)', fontWeight: 400, fontStyle: 'italic', color: hovered ? '#fff' : 'rgba(255,255,255,0.9)', lineHeight: 0.92, marginBottom: '20px', transition: 'color 0.3s', letterSpacing: '-0.01em' }}>
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
            <motion.span animate={{ x: hovered ? 6 : 0 }} transition={{ duration: 0.3 }}
              style={{ fontFamily: M, fontSize: '10px', letterSpacing: '0.15em', color: ACCENT }}>
              EXPLORER →
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  )
}

function Expeditions() {
  return (
    <section id="expeditions" style={{ background: BG, padding: '104px 0 0' }}>
      <div style={{ padding: '0 72px', marginBottom: '64px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <div style={{ position: 'relative' }}>
          <div aria-hidden style={{
            position: 'absolute', left: '-24px', top: '-60px',
            fontFamily: C, fontSize: '220px', fontStyle: 'italic', fontWeight: 700,
            color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>03</div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '16px' }}>
            Les expéditions
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ fontFamily: C, fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
            Terres explorées
          </motion.h2>
        </div>
        <p style={{ fontFamily: J, fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', maxWidth: '260px', lineHeight: 1.9 }}>
          Chaque destination, une rencontre. Chaque groupe, une alchimie unique.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {VOYAGES.map((v, i) => <ExpeditionCard key={v.id} v={v} i={i} />)}
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ */
/*  GALERIE — Masonry avec hover reveal             */
/* ════════════════════════════════════════════════ */
const GALLERY = [
  { src: '/images/hero-bg.jpg',        ratio: '16/9', loc: 'Song-Köl',       country: 'Kirghizistan' },
  { src: '/images/15.jpg',             ratio: '4/3',  loc: 'Ala-Kul 3500m', country: 'Kirghizistan' },
  { src: '/images/11.jpg',             ratio: '4/3',  loc: 'Thorong-La 5416m', country: 'Népal' },
  { src: '/images/kyrg-famille.jpg',   ratio: '3/2',  loc: 'Yourte nomade', country: 'Kirghizistan' },
  { src: '/images/13.jpg',             ratio: '4/3',  loc: 'Kel-Suu',       country: 'Kirghizistan' },
  { src: '/images/12.jpg',             ratio: '16/9', loc: 'Himalaya',       country: 'Népal' },
  { src: '/images/kyrg-fille-cheval.jpg', ratio: '3/4', loc: 'Steppe',      country: 'Kirghizistan' },
  { src: '/images/14.jpg',             ratio: '16/9', loc: 'Song-Köl',       country: 'Kirghizistan' },
  { src: '/images/kyrg-filles.jpg',    ratio: '3/4',  loc: 'Camp nomade',   country: 'Kirghizistan' },
]

function GalleryItem({ p, ci, pi }: { p: typeof GALLERY[0], ci: number, pi: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: ci * 0.08 + pi * 0.06 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'crosshair' }}>
      <div style={{ position: 'relative', aspectRatio: p.ratio as string }}>
        <Image src={p.src} alt={p.loc} fill sizes="33vw" loading="lazy"
          style={{ objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />

        {/* Overlay hover */}
        <div style={{ position: 'absolute', inset: 0, background: `rgba(13,26,16,${hovered ? 0.45 : 0})`, transition: 'background 0.4s' }} />

        {/* Info reveal */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }} transition={{ duration: 0.3 }}
          style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
          <p style={{ fontFamily: M, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.3em', color: ACCENT, marginBottom: '8px' }}>{p.country}</p>
          <p style={{ fontFamily: C, fontSize: '20px', fontStyle: 'italic', fontWeight: 400, color: '#fff' }}>{p.loc}</p>
        </motion.div>

        {/* Info bottom (toujours visible, plus subtil) */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 16px 14px', background: 'linear-gradient(to top, rgba(13,26,16,0.75), transparent)', opacity: hovered ? 0 : 1, transition: 'opacity 0.3s' }}>
          <p style={{ fontFamily: M, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.2em', color: ACCENT, marginBottom: '2px' }}>{p.country}</p>
          <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.8)' }}>{p.loc}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Galerie() {
  const cols = [
    GALLERY.filter((_, i) => i % 3 === 0),
    GALLERY.filter((_, i) => i % 3 === 1),
    GALLERY.filter((_, i) => i % 3 === 2),
  ]
  return (
    <section id="galerie" style={{ background: BGMID, padding: '104px 64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ position: 'relative' }}>
            <div aria-hidden style={{
              position: 'absolute', left: '-20px', top: '-50px',
              fontFamily: C, fontSize: '200px', fontStyle: 'italic', fontWeight: 700,
              color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
            }}>04</div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '16px' }}>
              Sur le terrain
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
              style={{ fontFamily: C, fontSize: 'clamp(40px, 4.5vw, 64px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
              Ce que les cartes<br />ne montrent pas
            </motion.h2>
          </div>
          <p style={{ fontFamily: C, fontSize: '18px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.35)', maxWidth: '200px', lineHeight: 1.7, textAlign: 'right' }}>
            Kirghizistan<br />Népal<br />et au-delà
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px' }}>
          {cols.map((col, ci) => (
            <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {col.map((p, pi) => <GalleryItem key={pi} p={p} ci={ci} pi={pi} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ */
/*  CONTACT — Section percutante                    */
/* ════════════════════════════════════════════════ */
function Contact() {
  const [hovered, setHovered] = useState(false)
  return (
    <section id="contact" style={{ background: BGDARK, position: 'relative', overflow: 'hidden', padding: '0' }}>
      {/* Grande ligne décorative */}
      <div style={{ position: 'absolute', top: 0, left: '72px', right: '72px', height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '70vh' }}>

        {/* Gauche — Titre dramatique */}
        <div style={{ padding: '96px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{
            position: 'absolute', left: '-24px', bottom: '-60px',
            fontFamily: C, fontSize: '280px', fontStyle: 'italic', fontWeight: 700,
            color: 'rgba(255,255,255,0.02)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>05</div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '32px' }}>
            Prendre contact
          </motion.p>

          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: C, fontSize: 'clamp(56px, 6vw, 88px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.88, letterSpacing: '-0.02em' }}>
            Intéressé·e<br />par le<br />projet ?
          </motion.h2>
        </div>

        {/* Droite — CTA */}
        <div style={{ padding: '96px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '32px' }}>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 2, maxWidth: '400px' }}>
            Que ce soit pour participer à une prochaine expédition, pour collaborer, ou simplement pour suivre l&apos;aventure — écrivez-moi.
          </motion.p>

          <motion.a
            href="mailto:contact@btw2world.com"
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
            style={{
              fontFamily: J, fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 500,
              display: 'inline-block', padding: '18px 48px', textDecoration: 'none',
              background: hovered ? '#fff' : ACCENT,
              color: BGDARK,
              transition: 'background 0.3s, transform 0.3s',
              transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
              alignSelf: 'flex-start',
            }}>
            contact@btw2world.com
          </motion.a>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            style={{ display: 'flex', gap: '32px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {['Instagram', 'YouTube', 'Mail'].map(s => (
              <span key={s} style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', cursor: 'pointer' }}>{s}</span>
            ))}
          </motion.div>

          <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)', marginTop: '16px' }}>
            Kirghizistan · Népal · Prochaine destination inconnue
          </p>
        </div>

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
      <WorldMapSection />
      <Expeditions />
      <Footer />
    </main>
  )
}
