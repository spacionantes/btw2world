'use client'

import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BG     = '#354f3b'
const ACCENT = '#f6b74d'
const VISITED_COLOR   = '#f6b74d'
const UNVISITED_COLOR = '#7a5e28'
const EXP_COLOR       = '#fff5d6'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const EXPEDITIONS = [
  {
    id: 'kyrg',
    country: 'Kirghizistan',
    continent: 'Asie centrale',
    year: '2025', month: 'Juillet',
    description: 'Hauts plateaux kirghiz, yourtes nomades, cols à 4000m. 14 jours de traversée dans les montagnes du Tian Shan.',
    lat: 41.2, lon: 74.5,
    image: '/images/15.jpg',
    people: 3,
    slug: 'kirghizistan-tian-shan',
  },
  {
    id: 'nepal',
    country: 'Népal',
    continent: 'Himalaya',
    year: '2024', month: 'Janvier',
    description: 'Circuit Annapurna, passage du Thorong-La à 5416m, villages sherpa. 18 jours dans l\'Himalaya.',
    lat: 28.4, lon: 84.1,
    image: '/images/11.jpg',
    people: 2,
    slug: 'nepal-annapurna',
  },
  {
    id: 'amazonie',
    country: 'Brésil',
    continent: 'Amérique du Sud',
    year: '2023', month: 'Mai',
    description: 'Jungle amazonienne au départ de Manaus, Rio Negro, faune sauvage. 12 jours d\'immersion totale en forêt tropicale.',
    lat: -3.1, lon: -60.0,
    image: '/images/Amazonie.jpeg',
    people: 6,
    slug: 'amazonie-manaus',
  },
]

const VISITED_ISO: Set<string> = new Set([
  '012','174','504','788','702','704','056','203','208','250','300','348',
  '380','442','492','528','578','616','620','724','752','756','826','792',
  '124','840','036','076','356','417','524',
])
const EXPEDITION_ISO: Set<string> = new Set(['417', '524', '076'])

const VISITED_BY_CONTINENT: Record<string, string[]> = {
  'Amérique du Nord': ['Canada', 'États-Unis'],
  'Amérique du Sud': ['Brésil'],
  'Afrique': ['Algérie', 'Comores', 'Maroc', 'Tunisie'],
  'Asie': ['Inde', 'Kirghizistan', 'Népal', 'Singapour', 'Vietnam'],
  'Europe': ['Belgique', 'Rép. tchèque', 'Danemark', 'France', 'Grèce', 'Hongrie', 'Italie', 'Luxembourg', 'Monaco', 'Norvège', 'Pays-Bas', 'Pologne', 'Portugal', 'Espagne', 'Suède', 'Suisse', 'Royaume-Uni', 'Turquie'],
  'Océanie': ['Australie'],
}

export default function WorldMapSection() {
  const [activePanel, setActivePanel] = useState<typeof EXPEDITIONS[0] | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [openContinent, setOpenContinent] = useState<string | null>('Europe')

  return (
    <section id="carte" style={{ background: BG, padding: '80px 0 0' }}>

      {/* Header */}
      <div style={{ padding: '0 72px 56px' }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '16px' }}>
          Terres explorées
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ fontFamily: C, fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
          L&apos;empreinte<br />du voyage
        </motion.h2>
      </div>

      {/* Carte + Sidebar — collées sans gap */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px' }}>

        {/* Carte SVG */}
        <div style={{ position: 'relative', background: BG, overflow: 'hidden' }}>
          {hoveredCountry && (
            <div style={{
              position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(30,50,35,0.95)', border: `1px solid ${ACCENT}`,
              padding: '6px 18px', zIndex: 10, pointerEvents: 'none', backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap' }}>
                {hoveredCountry}
              </span>
            </div>
          )}

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 148, center: [15, 10] }}
            style={{ width: '100%', height: '560px', display: 'block' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const id = String(geo.id).padStart(3, '0')
                  const isExp = EXPEDITION_ISO.has(id)
                  const isVisited = VISITED_ISO.has(id)
                  const fillColor = isExp ? EXP_COLOR : isVisited ? VISITED_COLOR : UNVISITED_COLOR
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        if (isVisited || isExp) setHoveredCountry(geo.properties.name)
                      }}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => {
                        if (isExp) {
                          const exp = EXPEDITIONS.find(e =>
                            (e.id === 'kyrg' && id === '417') ||
                            (e.id === 'nepal' && id === '524') ||
                            (e.id === 'amazonie' && id === '076')
                          )
                          if (exp) setActivePanel(prev => prev?.id === exp.id ? null : exp)
                        }
                      }}
                      style={{
                        default: {
                          fill: fillColor,
                          stroke: 'transparent',
                          strokeWidth: 0,
                          outline: 'none',
                          cursor: isExp ? 'pointer' : 'default',
                        },
                        hover: {
                          fill: isExp ? '#fff' : isVisited ? '#fac85e' : '#9a7a38',
                          stroke: 'transparent',
                          strokeWidth: 0,
                          outline: 'none',
                        },
                        pressed: { fill: fillColor, outline: 'none' },
                      }}
                    />
                  )
                })
              }
            </Geographies>

            {/* Marqueurs expéditions */}
            {EXPEDITIONS.map(exp => (
              <Marker key={exp.id} coordinates={[exp.lon, exp.lat]}
                onClick={() => setActivePanel(prev => prev?.id === exp.id ? null : exp)}>
                <circle r={6} fill={BG} stroke={ACCENT} strokeWidth={2} style={{ cursor: 'pointer' }} />
                <circle r={11} fill="none" stroke={ACCENT} strokeWidth={0.8} opacity={0.5} />
              </Marker>
            ))}
          </ComposableMap>

          {/* Légende */}
          <div style={{ display: 'flex', gap: '28px', padding: '14px 24px', background: 'rgba(30,50,35,0.7)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', background: UNVISITED_COLOR }} />
              <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Pas encore visité</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', background: VISITED_COLOR }} />
              <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Pays visité</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', background: EXP_COLOR }} />
              <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Expédition BTW2WORLD</span>
            </div>
          </div>
        </div>

        {/* Sidebar liste pays — directement collée à la carte */}
        <div style={{ background: 'rgba(0,0,0,0.15)', borderLeft: '1px solid rgba(255,255,255,0.1)', padding: '28px 24px', overflowY: 'auto', maxHeight: '582px' }}>
          <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: ACCENT, marginBottom: '20px' }}>
            Liste des pays
          </p>
          {Object.entries(VISITED_BY_CONTINENT).map(([continent, pays]) => (
            <div key={continent} style={{ marginBottom: '2px' }}>
              <button
                onClick={() => setOpenContinent(openContinent === continent ? null : continent)}
                style={{
                  width: '100%', textAlign: 'left', background: 'none', border: 'none',
                  cursor: 'pointer', padding: '10px 0',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                <span style={{
                  fontFamily: M, fontSize: '8px', letterSpacing: '0.15em',
                  color: openContinent === continent ? ACCENT : 'rgba(255,255,255,0.3)',
                  transition: 'color 0.2s', minWidth: '10px',
                }}>
                  {openContinent === continent ? '▾' : '▸'}
                </span>
                <span style={{
                  fontFamily: J, fontSize: '15px', fontWeight: 500,
                  color: openContinent === continent ? '#fff' : 'rgba(255,255,255,0.65)',
                  transition: 'color 0.2s',
                }}>{continent}</span>
                <span style={{ marginLeft: 'auto', fontFamily: M, fontSize: '9px', color: ACCENT, opacity: 0.7 }}>{pays.length}</span>
              </button>
              <AnimatePresence>
                {openContinent === continent && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}>
                    {pays.map(p => (
                      <p key={p} style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', padding: '6px 0 6px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        {p}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {activePanel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActivePanel(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(5,12,7,0.55)', zIndex: 498, backdropFilter: 'blur(2px)', cursor: 'pointer' }} />
        )}
      </AnimatePresence>

      {/* Panneau latéral expédition */}
      <AnimatePresence>
        {activePanel && (
          <motion.div key={activePanel.id}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'fixed', top: 0, right: 0, width: 'clamp(340px, 45vw, 640px)', height: '100vh', background: BG, zIndex: 499, display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ flex: '0 0 55%', position: 'relative', overflow: 'hidden' }}>
              <Image src={activePanel.image} alt={activePanel.country} fill sizes="45vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(66,98,72,0.15) 40%, rgba(66,98,72,0.88) 100%)' }} />
              <button onClick={() => setActivePanel(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(66,98,72,0.7)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                ×
              </button>
              <div style={{ position: 'absolute', bottom: '24px', left: '32px' }}>
                <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: ACCENT, marginBottom: '6px' }}>{activePanel.continent} · {activePanel.month} {activePanel.year}</p>
                <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 4vw, 52px)', fontStyle: 'italic', fontWeight: 400, color: '#fff', lineHeight: 0.9 }}>{activePanel.country}</h2>
              </div>
            </div>
            <div style={{ flex: 1, padding: '36px 32px 40px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ borderLeft: '2px solid rgba(246,183,77,0.3)', paddingLeft: '14px' }}>
                  <p style={{ fontFamily: M, fontSize: '7px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>Voyageurs</p>
                  <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', color: '#fff' }}>{activePanel.people}</p>
                </div>
                <div style={{ borderLeft: '2px solid rgba(246,183,77,0.3)', paddingLeft: '14px' }}>
                  <p style={{ fontFamily: M, fontSize: '7px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>Statut</p>
                  <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', color: '#fff' }}>Réalisée</p>
                </div>
              </div>
              <p style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85 }}>{activePanel.description}</p>
              <Link href={`/destinations/${activePanel.slug}`}
                style={{ fontFamily: J, fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.22em', background: ACCENT, color: BG, padding: '15px 32px', textDecoration: 'none', display: 'inline-block', alignSelf: 'flex-start', marginTop: 'auto' }}>
                Voir l&apos;expédition →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liste expéditions en bas */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {EXPEDITIONS.map((dest, i, arr) => (
          <motion.div key={dest.id}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setActivePanel(prev => prev?.id === dest.id ? null : dest)}
            style={{ flex: 1, padding: '28px 40px', cursor: 'pointer', borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', background: activePanel?.id === dest.id ? 'rgba(246,183,77,0.08)' : 'transparent', transition: 'background 0.3s' }}>
            <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, marginBottom: '6px' }}>{dest.month} {dest.year}</p>
            <p style={{ fontFamily: C, fontSize: '18px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '4px' }}>{dest.country}</p>
            <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>{dest.people} voyageurs</p>
          </motion.div>
        ))}
        <div style={{ flex: 1, padding: '28px 40px', borderLeft: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(246,183,77,0.35)', marginBottom: '6px' }}>Prochain</p>
          <p style={{ fontFamily: C, fontSize: '18px', fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>???</p>
          <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.2)' }}>Révélée J-7 aux candidats</p>
        </div>
      </div>
    </section>
  )
}
