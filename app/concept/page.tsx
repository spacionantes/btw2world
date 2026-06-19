'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/layout/Nav'
import { motion, AnimatePresence } from 'framer-motion'

const J = "'Jost', sans-serif"
const C = "'Shippori Mincho B1', serif"
const M = "'DM Mono', monospace"
const BG     = '#354f3b'
const ACCENT = '#f6b74d'

const MODES = {
  aveugle: {
    label: 'À l\'aveugle',
    badge: '01',
    tagline: 'Vous partez dans un lieu reculé sans aucun indice.',
    places: '2 invités maximum par expédition',
    etapes: [
      { num: '01', titre: 'Candidature', corps: 'Montrez-moi votre motivation par le moyen qui vous semble le plus parlant. Chaque dossier sera étudié personnellement.' },
      { num: '02', titre: 'Sélection', corps: 'Je compose le groupe en prenant en compte tous les éléments. 2 invités maximum seront invités à nous rejoindre pour garantir une expérience immersive et une vraie cohésion chez nos hôtes.' },
      { num: '03', titre: 'Organisation', corps: 'Je m\'occupe de tout ce qui est nécessaire pour assurer le bon déroulement de l\'expédition : itinéraire, hébergements, transport, sécurité, vaccins.' },
      { num: '04', titre: 'Départ à l\'aveugle', corps: 'La destination sera révélée pendant le voyage. Une fois sur place nous rejoindrons directement la famille.' },
    ],
    avantages: [
      { titre: 'Nouvelle destination', texte: 'Un territoire que vous n\'auriez peut-être jamais choisi seul.' },
      { titre: 'Effet surprise total', texte: 'Pas d\'attentes construites. Juste la réalité du terrain, brute et entière.' },
      { titre: 'Équipe expérimentée', texte: 'Voyager avec quelqu\'un qui a l\'habitude des routes, des nouvelles cultures et des imprévus.' },
      { titre: 'Film du voyage', texte: 'Chaque nouvelle expédition donne lieu à un film complet tourné et monté.' },
    ],
  },
  libre: {
    label: 'Mode libre',
    badge: '02',
    tagline: 'Vous décidez d\'où vous partez et je m\'occupe de tout.',
    places: '3 à 4 invités par expédition',
    etapes: [
      { num: '01', titre: 'Votre idée', corps: 'Vous avez déjà une destination en tête. Seuls ou avec moi — vous choisissez le cadre, je m\'adapte à votre vision.' },
      { num: '02', titre: 'On organise ensemble', corps: 'On construit le voyage ensemble, avec ce que vous souhaitez et mes conseils aussi. L\'itinéraire se dessine selon vos envies et mon expérience du terrain.' },
      { num: '03', titre: 'Appel de cadrage', corps: 'Un appel pour affiner le projet : destination, dates, rythme, attentes spécifiques. Rien n\'est figé tant que vous n\'êtes pas satisfait.' },
      { num: '04', titre: 'Organisation complète', corps: 'Je prends en main toute la logistique. Hébergements, transport, sécurité, vaccins. Vous n\'avez plus qu\'à préparer vos bagages.' },
      { num: '05', titre: 'Expédition', corps: 'Le jour du départ, vous connaissez la destination, vous êtes prêt. Je suis là en tant que support ou accompagnateur pour que tout se passe au mieux.' },
    ],
    avantages: [
      { titre: 'Liberté totale sur les dates', texte: 'Vous choisissez quand partir. Pas de contrainte de groupe, pas de calendrier imposé.' },
      { titre: 'On organise ensemble le voyage', texte: 'Vous apportez vos envies, j\'apporte mon expérience du terrain. Le voyage se construit à deux.' },
      { titre: 'Moins d\'imprévus', texte: 'Tout est cadré, anticipé, discuté en amont. Vous partez en sachant exactement ce qui vous attend.' },
      { titre: 'Partez avec qui vous le souhaitez', texte: 'Seul, en couple, entre amis ou en famille — vous composez votre groupe. Je m\'adapte à votre dynamique et m\'assure que l\'expérience reste intime et authentique.' },
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

      {/* ── SELECTOR PLEINE LARGEUR ──────────────────── */}
      <div style={{ background: BG }}>

        {/* Titre section */}
        <div style={{ padding: '80px 72px 56px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: C, fontSize: 'clamp(64px, 9vw, 120px)', fontWeight: 800, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '20px' }}>
            Deux façons de voyager
          </h2>
          <p style={{ fontFamily: J, fontSize: '18px', fontWeight: 700, color: ACCENT }}>
            Choisissez votre formule
          </p>
        </div>

        {/* Deux grandes cartes toggle côte à côte — pleine largeur */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.1)' }}>
          {(['aveugle', 'libre'] as const).map(m => {
            const isActive = mode === m
            const md = MODES[m]
            return (
              <button key={m} onClick={() => setMode(m)}
                style={{
                  background: isActive ? ACCENT : 'rgba(0,0,0,0.25)',
                  border: 'none', cursor: 'pointer', padding: '56px 72px',
                  textAlign: 'left', transition: 'background 0.4s ease',
                  display: 'flex', flexDirection: 'column', gap: '20px',
                }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{
                    fontFamily: M, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: isActive ? 'rgba(66,98,72,0.7)' : 'rgba(255,255,255,0.35)',
                    padding: '4px 10px', border: `1px solid ${isActive ? 'rgba(66,98,72,0.3)' : 'rgba(255,255,255,0.15)'}`,
                  }}>
                    Formule {md.badge}
                  </span>
                  <span style={{
                    fontFamily: M, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: isActive ? BG : 'rgba(255,255,255,0.25)',
                  }}>
                    {isActive ? '— Sélectionné' : 'Choisir →'}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: C, fontSize: 'clamp(48px, 5.5vw, 88px)', fontWeight: 400, fontStyle: 'italic',
                  color: isActive ? BG : '#fff', lineHeight: 0.9, letterSpacing: '-0.02em',
                }}>
                  {md.label}
                </h3>

                <p style={{
                  fontFamily: J, fontSize: '20px', fontWeight: 300,
                  color: isActive ? 'rgba(53,79,59,0.9)' : 'rgba(255,255,255,0.55)',
                  lineHeight: 1.6, maxWidth: '480px',
                }}>
                  {md.tagline}
                </p>

              </button>
            )
          })}
        </div>
      </div>

      {/* ── FRISE CHRONOLOGIQUE ───────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div key={mode}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ background: BG, padding: '80px 0 0' }}>

            {/* Label formule */}
            <div style={{ padding: '0 72px 48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  background: isAveugle ? ACCENT : 'rgba(255,255,255,0.1)',
                  color: isAveugle ? BG : 'rgba(255,255,255,0.6)',
                  fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', padding: '6px 14px',
                }}>
                  Formule {current.badge}
                </span>
                <h2 style={{ fontFamily: C, fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1 }}>
                  {current.label}
                </h2>
              </div>
            </div>

            {/* Frise chronologique — ligne horizontale + étapes */}
            <div style={{ padding: '0 72px', position: 'relative' }}>

              {/* Ligne de connexion */}
              <div style={{
                position: 'absolute',
                top: '28px',
                left: 'calc(72px + 28px)',
                right: 'calc(72px + 28px)',
                height: '1px',
                background: isAveugle ? 'rgba(246,183,77,0.3)' : 'rgba(255,255,255,0.15)',
              }} />

              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${current.etapes.length}, 1fr)`,
              }}>
                {current.etapes.map((e, i) => (
                  <motion.div key={e.num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    style={{ padding: '0 28px 0 0', position: 'relative' }}
                  >
                    {/* Cercle numéro */}
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: isAveugle ? ACCENT : 'rgba(255,255,255,0.12)',
                      border: `2px solid ${isAveugle ? ACCENT : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '28px', position: 'relative', zIndex: 1,
                    }}>
                      <span style={{
                        fontFamily: C, fontSize: '20px', fontStyle: 'italic', fontWeight: 400,
                        color: isAveugle ? BG : '#fff',
                      }}>
                        {e.num}
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: C, fontSize: '28px', fontStyle: 'italic', fontWeight: 400,
                      color: '#fff', marginBottom: '16px', lineHeight: 1.1,
                    }}>
                      {e.titre}
                    </h3>
                    <p style={{
                      fontFamily: J, fontSize: '15px', fontWeight: 300,
                      color: 'rgba(255,255,255,0.55)', lineHeight: 1.85,
                    }}>
                      {e.corps}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Places */}
            <div style={{ margin: '56px 72px 0', padding: '24px 36px', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '18px', borderLeft: `4px solid ${isAveugle ? ACCENT : 'rgba(255,255,255,0.3)'}` }}>
              <p style={{ fontFamily: M, fontSize: '13px', letterSpacing: '0.25em', textTransform: 'uppercase', color: isAveugle ? ACCENT : '#fff', fontWeight: 700 }}>
                ↳ {current.places}
              </p>
            </div>

            {/* Avantages */}
            <div style={{ padding: '56px 72px 80px' }}>
              <p style={{ fontFamily: M, fontSize: '14px', letterSpacing: '0.22em', textTransform: 'uppercase', color: isAveugle ? ACCENT : '#fff', marginBottom: '32px', fontWeight: 700 }}>
                Ce que vous y gagnez
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: 'rgba(255,255,255,0.08)' }}>
                {current.avantages.map((a, i) => (
                  <div key={i} style={{ background: BG, padding: '36px 40px', display: 'flex', gap: '22px', alignItems: 'flex-start' }}>
                    <div style={{
                      fontFamily: C, fontSize: '44px', fontStyle: 'italic', fontWeight: 400,
                      color: isAveugle ? 'rgba(246,183,77,0.2)' : 'rgba(255,255,255,0.08)',
                      lineHeight: 1, flexShrink: 0, marginTop: '-4px',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: C, fontSize: '28px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '12px' }}>{a.titre}</h3>
                      <p style={{ fontFamily: J, fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>{a.texte}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── POURQUOI ────────────────────────── */}
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '96px 64px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          {mode === 'aveugle' ? (
            <>
              <p style={{ fontFamily: J, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.3em', color: ACCENT, marginBottom: '32px', fontWeight: 700 }}>
                Pourquoi à l&apos;aveugle ?
              </p>
              <h2 style={{ fontFamily: C, fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', marginBottom: '40px', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
                Parce que savoir à l&apos;avance tue<br />la moitié du voyage
              </h2>
              <p style={{ fontFamily: J, fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: '32px' }}>
                Quand vous connaissez la destination, vous cherchez des photos, lisez des avis, construisez des attentes. Vous arrivez avec un film déjà en tête.
              </p>
              <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}>
                &ldquo;Partir à l&apos;aveugle, c&apos;est s&apos;autoriser à être surpris. C&apos;est retrouver ce que le voyage était avant internet.&rdquo;
              </p>
            </>
          ) : (
            <>
              <p style={{ fontFamily: J, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.3em', color: ACCENT, marginBottom: '32px', fontWeight: 700 }}>
                Pourquoi le mode libre ?
              </p>
              <h2 style={{ fontFamily: C, fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', marginBottom: '40px', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
                Votre vision,<br />mon expérience
              </h2>
              <p style={{ fontFamily: J, fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: '32px' }}>
                Vous avez une destination en tête, des envies précises, peut-être des proches à emmener. Le mode libre, c&apos;est votre projet — je le construis avec vous et je vous accompagne sur le terrain.
              </p>
              <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}>
                &ldquo;Vous apportez l&apos;envie. J&apos;apporte le reste.&rdquo;
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────── */}
      <div style={{ background: BG, padding: '96px 72px' }}>
        <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '16px' }}>
          Questions fréquentes
        </p>
        <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '64px' }}>
          Ce que vous vous demandez
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px' }}>
          {[
            { q: "Et si je n'ai pas d'expérience en trek ?", r: "Ce n'est pas un critère éliminatoire. J'adapte le niveau au groupe sélectionné. La motivation compte plus que le palmarès." },
            { q: "Comment se passe le voyage concrètement ?", r: "De l'arrivée à l'aéroport au retour, je gère tout. Transport, hébergement, rencontres locales — vous n'avez qu'à vivre." },
            { q: "Que faut-il prévoir comme budget ?", r: "Cela dépend de la destination. Comptez entre 1 700 € et 3 500 € tout compris selon la durée et la région du monde." },
            { q: "Faut-il parler la langue du pays ?", r: "Non. Je sers de pont entre les cultures. Les rencontres se font souvent sans mot, juste par la présence et l'ouverture." },
            { q: "On peut y aller en couple ou entre amis ?", r: "Oui, mais je sélectionne des profils indépendamment. Si vous candidatez à plusieurs, vos dossiers sont étudiés séparément." },
            { q: "Y a-t-il des risques pour la sécurité ?", r: "Chaque destination est choisie après analyse approfondie. La sécurité du groupe est ma première priorité, avant même la beauté du cadre." },
          ].map((f, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '36px 0' }}>
              <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '14px' }}>{f.q}</p>
              <p style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85 }}>{f.r}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────── */}
      <div style={{ background: 'rgba(0,0,0,0.25)', padding: '80px 64px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: C, fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, marginBottom: '32px', letterSpacing: '-0.02em' }}>
          Prêt pour<br /><span style={{ color: ACCENT }}>l&apos;inconnu ?</span>
        </h2>
        <Link href="/candidater" style={{ fontFamily: J, fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', background: ACCENT, color: BG, padding: '18px 56px', textDecoration: 'none', display: 'inline-block' }}>
          Candidater maintenant
        </Link>
      </div>
    </div>
  )
}
