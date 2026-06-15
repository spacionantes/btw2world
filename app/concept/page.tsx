'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/layout/Nav'
import { motion, AnimatePresence } from 'framer-motion'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BG     = '#426248'
const BGDARK = '#2e4532'
const BGMID  = '#507358'
const ACCENT = '#f6b74d'

const MODES = {
  aveugle: {
    label: 'Mode à l\'aveugle',
    sublabel: 'Avec moi',
    badge: 'Formule 01',
    places: 'Places limitées à 2 invités par expédition',
    placesColor: ACCENT,
    etapes: [
      { num: '01', titre: 'Candidature', corps: 'Un formulaire, quelques lignes sur vous. Je lis chaque dossier personnellement — motivations, expérience voyage, contraintes. Pas d\'algorithme.' },
      { num: '02', titre: 'Sélection', corps: 'Je compose le groupe avec soin. Les places sont limitées à 2 invités pour garantir une expérience intime et une vraie cohésion sur le terrain.' },
      { num: '03', titre: 'Organisation', corps: 'Je prends en charge l\'intégralité de la logistique : itinéraire, hébergements, transport, sécurité. Vous n\'avez qu\'à vous préparer.' },
      { num: '04', titre: 'Départ à l\'aveugle', corps: 'La destination est révélée à J-7. Puis on part. Terrain, photo, film — je gère tout. Vous apportez l\'ouverture d\'esprit.' },
    ],
    avantages: [
      { titre: 'Nouvelle destination', texte: 'Chaque expédition ouvre sur un territoire que vous n\'auriez peut-être jamais choisi seul.' },
      { titre: 'Effet surprise total', texte: 'Pas d\'attentes construites, pas de film en tête. Juste la réalité du terrain, brute et entière.' },
      { titre: 'Équipe expérimentée', texte: 'Voyager avec quelqu\'un qui connaît les routes, les cultures et les imprévus. Aucune agence.' },
      { titre: 'Film du voyage', texte: 'Chaque expédition donne lieu à un film complet — tourné et monté par Maxence.' },
    ],
  },
  libre: {
    label: 'Mode libre',
    sublabel: 'Seuls ou avec moi',
    badge: 'Formule 02',
    places: 'Places limitées à 3 ou 4 invités',
    placesColor: 'rgba(255,255,255,0.4)',
    etapes: [
      { num: '01', titre: 'Votre idée', corps: 'Vous savez déjà où vous voulez aller. Seuls ou accompagnés de moi — vous choisissez le cadre, je m\'adapte à votre vision.' },
      { num: '02', titre: 'Premier contact', corps: 'Envoyez un message de contact. On échange rapidement pour comprendre votre projet, vos envies, votre budget.' },
      { num: '03', titre: 'Appel de cadrage', corps: 'Un premier appel pour définir le projet en détail : destination, dates, rythme, attentes spécifiques.' },
      { num: '04', titre: 'Organisation complète', corps: 'Je prends en main toute la logistique. Itinéraire sur mesure, hébergements, transport, sécurité. Votre voyage, clé en main.' },
      { num: '05', titre: 'Expédition', corps: 'On part. Vous connaissez la destination, vous avez préparé, vous arrivez avec vos intentions. Je suis là pour que tout se passe au mieux.' },
    ],
    avantages: [
      { titre: 'Plus de liberté sur les dates', texte: 'Vous choisissez quand partir. Pas de contrainte de groupe, pas de calendrier imposé.' },
      { titre: 'Destination déjà connue', texte: 'Vous arrivez avec vos intentions, vos recherches, votre vision du voyage. Aucune surprise.' },
      { titre: 'Moins d\'imprévus', texte: 'Tout est cadré, anticipé, discuté en amont. Vous partez en sachant exactement ce qui vous attend.' },
    ],
  },
}

export default function ConceptPage() {
  const [mode, setMode] = useState<'aveugle' | 'libre'>('aveugle')
  const current = MODES[mode]
  const isAveugle = mode === 'aveugle'

  return (
    <div style={{ background: BG, minHeight: '100dvh' }}>

      {/* Hero */}
      <div style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}>
        <Image src="/images/concept hero.png" alt="Le concept BTW2WORLD" fill sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.08)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Nav />
        </div>
      </div>

      {/* ── SELECTOR ──────────────────────────────────── */}
      <div style={{ background: BGDARK, padding: '80px 72px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '24px' }}>
            Deux façons de voyager
          </p>
          <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 4.5vw, 64px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '48px' }}>
            Choisissez votre formule
          </h2>

          {/* Boutons toggle */}
          <div style={{ display: 'inline-flex', gap: '12px' }}>
            {(['aveugle', 'libre'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                style={{
                  padding: '16px 40px',
                  fontFamily: J, fontWeight: 600, fontSize: '11px',
                  textTransform: 'uppercase', letterSpacing: '0.2em',
                  color: mode === m ? BGDARK : '#fff',
                  background: mode === m ? ACCENT : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${mode === m ? ACCENT : 'rgba(255,255,255,0.2)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}>
                {m === 'aveugle' ? 'À l\'aveugle' : 'Mode libre'}
              </button>
            ))}
          </div>

          <p style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginTop: '32px', marginBottom: '0' }}>
            {isAveugle
              ? 'Je compose et organise tout le voyage. La destination n\'est révélée qu\'à J-7.'
              : 'Vous savez où vous voulez aller. Je m\'occupe de tout le reste.'}
          </p>
        </div>
      </div>

      {/* ── CONTENU MODE (animé) ───────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div key={mode}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ background: BGDARK, padding: '64px 72px 96px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

              {/* Label formule */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', paddingTop: '16px', borderTop: `1px solid ${isAveugle ? 'rgba(246,183,77,0.2)' : 'rgba(255,255,255,0.1)'}` }}>
                <span style={{
                  background: isAveugle ? ACCENT : 'rgba(255,255,255,0.08)',
                  color: isAveugle ? BGDARK : 'rgba(255,255,255,0.6)',
                  fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', padding: '6px 14px',
                  border: isAveugle ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}>
                  {current.badge}
                </span>
                <span style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                  {current.sublabel}
                </span>
              </div>

              <h2 style={{ fontFamily: C, fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '64px' }}>
                {current.label}
              </h2>

              {/* Étapes */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${current.etapes.length},1fr)`, gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
                {current.etapes.map(e => (
                  <div key={e.num} style={{ background: BGDARK, padding: '40px 28px' }}>
                    <div style={{ fontFamily: C, fontSize: '64px', fontStyle: 'italic', fontWeight: 400, color: isAveugle ? 'rgba(246,183,77,0.14)' : 'rgba(255,255,255,0.07)', lineHeight: 1, marginBottom: '-12px' }}>{e.num}</div>
                    <h3 style={{ fontFamily: C, fontSize: '20px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '14px', marginTop: '16px' }}>{e.titre}</h3>
                    <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.85 }}>{e.corps}</p>
                  </div>
                ))}
              </div>

              {/* Places limitées */}
              <div style={{ marginTop: '1px', background: BGMID, padding: '24px 36px', display: 'flex', alignItems: 'center', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isAveugle ? ACCENT : 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: current.placesColor }}>
                  {current.places}
                </p>
              </div>

              {/* Avantages */}
              <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: `repeat(${Math.min(current.avantages.length, 2)},1fr)`, gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
                {current.avantages.map((a, i) => (
                  <div key={i} style={{ background: BGDARK, padding: '36px 40px', display: 'flex', gap: '22px', alignItems: 'flex-start' }}>
                    <div style={{ fontFamily: C, fontSize: '40px', fontStyle: 'italic', fontWeight: 400, color: isAveugle ? 'rgba(246,183,77,0.18)' : 'rgba(255,255,255,0.08)', lineHeight: 1, flexShrink: 0, marginTop: '-4px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: C, fontSize: '20px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '10px' }}>{a.titre}</h3>
                      <p style={{ fontFamily: J, fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>{a.texte}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── POURQUOI L'AVEUGLE ────────────────────────── */}
      <div style={{ background: BGDARK, padding: '96px 64px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: J, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: ACCENT, marginBottom: '32px' }}>
            Pourquoi à l&apos;aveugle ?
          </p>
          <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', marginBottom: '40px', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
            Parce que savoir à l&apos;avance tue<br />la moitié du voyage
          </h2>
          <p style={{ fontFamily: J, fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: '32px' }}>
            Quand vous connaissez la destination, vous cherchez des photos, lisez des avis, construisez des attentes. Vous arrivez avec un film déjà en tête.
          </p>
          <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}>
            &ldquo;Partir à l&apos;aveugle, c&apos;est s&apos;autoriser à être surpris. C&apos;est retrouver ce que le voyage était avant internet.&rdquo;
          </p>
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────── */}
      <div style={{ background: BG, padding: '96px 72px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '16px' }}>
            Questions fréquentes
          </p>
          <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '64px' }}>
            Ce que vous vous demandez
          </h2>
          {[
            { q: "Et si je n'ai pas d'expérience en trek ?", r: "Ce n'est pas un critère éliminatoire. J'adapte le niveau au groupe sélectionné. La motivation compte plus que le palmarès." },
            { q: "Que faut-il prévoir comme budget ?", r: "Cela dépend de la destination révélée. Comptez entre 1 700 € et 3 500 € tout compris selon la durée et la région du monde." },
            { q: "On peut y aller en couple ou entre amis ?", r: "Oui, mais je sélectionne des profils indépendamment. Si vous candidatez à plusieurs, vos dossiers sont étudiés séparément. Cela ne veut pas dire que vous ne serez pas pris tous les deux." },
          ].map((f, i, arr) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '36px 0', borderBottom: i === arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '14px' }}>{f.q}</p>
              <p style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85 }}>{f.r}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────── */}
      <div style={{ background: BGMID, padding: '80px 64px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: C, fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, marginBottom: '32px', letterSpacing: '-0.02em' }}>
          Prêt pour<br /><span style={{ color: ACCENT }}>l&apos;inconnu ?</span>
        </h2>
        <Link href="/candidater" style={{ fontFamily: J, fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', background: ACCENT, color: BGDARK, padding: '18px 56px', textDecoration: 'none', display: 'inline-block' }}>
          Candidater maintenant
        </Link>
      </div>
    </div>
  )
}
