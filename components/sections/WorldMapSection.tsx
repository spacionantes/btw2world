'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#0d1a10'
const BGMID  = '#243429'
const ACCENT = '#f6b74d'

type Destination = {
  id: string
  name: string
  country: string
  continent: string
  // position en % sur la carte SVG (x, y)
  x: number
  y: number
  status: 'realise' | 'mystere'
  year?: string
  description: string
}

const DESTINATIONS: Destination[] = [
  { id: 'kyrg',    name: 'Tian Shan',       country: 'Kirghizistan', continent: 'Asie centrale',   x: 67.2, y: 28.0, status: 'realise', year: '2025', description: 'Hauts plateaux, yourtes, cols à 4000m' },
  { id: 'nepal',   name: 'Annapurna',       country: 'Népal',        continent: 'Himalaya',         x: 69.8, y: 34.5, status: 'realise', year: '2024', description: 'Thorong-La 5416m, villages sherpa' },
  { id: 'namibie', name: 'Désert du Namib', country: 'Namibie',      continent: 'Afrique australe', x: 51.2, y: 67.5, status: 'realise', year: '2025', description: 'Sossusvlei, Skeleton Coast' },
  { id: 'next',    name: '???',             country: 'Destination secrète', continent: '???',       x: 30,   y: 45,   status: 'mystere',              description: 'Révélée J-7 aux candidats retenus' },
]

// Carte monde SVG simplifiée — continents en paths approximatifs
const WORLD_PATH = `
M 8,38 C 10,32 14,28 18,30 C 22,26 26,28 28,32 C 30,28 34,24 38,26
  C 40,22 44,20 46,24 C 48,18 52,16 54,22 C 58,16 64,18 66,24
  C 70,18 76,20 78,26 C 82,22 88,24 90,28 C 94,24 98,26 100,32
  C 102,28 106,30 108,36 C 110,32 114,34 114,40
  C 112,46 110,50 108,48 C 106,54 102,56 100,52
  C 98,58 94,60 90,56 C 88,62 82,64 78,60
  C 76,66 70,68 66,62 C 64,68 58,70 54,64
  C 52,70 48,72 46,66 C 44,72 40,74 38,68
  C 34,74 30,72 28,66 C 26,72 22,70 18,64
  C 14,70 10,68 8,62 Z
`

export default function WorldMapSection() {
  const [active, setActive] = useState<Destination | null>(null)

  return (
    <section id="carte" style={{ background: BGDARK, padding: '104px 0 0' }}>

      {/* Header */}
      <div style={{ padding: '0 72px 64px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '16px' }}>
            Terres explorées
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ fontFamily: C, fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
            L&apos;empreinte<br />du voyage
          </motion.h2>
        </div>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT }} />
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Réalisé</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: `1px dashed ${ACCENT}` }} />
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>À venir</span>
          </div>
        </div>
      </div>

      {/* Carte SVG interactive */}
      <div style={{ position: 'relative', background: BGMID, borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 200 110"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Fond océan */}
          <rect width="200" height="110" fill={BGMID} />

          {/* Grille subtile */}
          {[20,40,60,80,100,120,140,160,180].map(x => (
            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={110} stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />
          ))}
          {[20,40,60,80,100].map(y => (
            <line key={`h${y}`} x1={0} y1={y} x2={200} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />
          ))}

          {/* Continents — paths simplifiés */}
          {/* Amérique du Nord */}
          <path d="M8,18 L22,16 L28,20 L26,28 L22,34 L18,36 L12,32 L8,26 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
          {/* Amérique du Sud */}
          <path d="M18,42 L26,40 L28,48 L26,58 L22,64 L16,62 L14,54 L16,46 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
          {/* Europe */}
          <path d="M46,16 L56,14 L60,18 L58,26 L52,28 L46,26 L44,20 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
          {/* Afrique */}
          <path d="M46,30 L58,28 L62,36 L60,50 L56,62 L50,66 L44,60 L42,48 L44,36 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
          {/* Asie */}
          <path d="M62,14 L100,12 L108,18 L104,28 L96,32 L84,34 L72,30 L64,26 L60,20 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
          {/* Asie du Sud */}
          <path d="M72,32 L84,30 L88,38 L84,46 L76,48 L70,42 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
          {/* Australie */}
          <path d="M120,58 L136,56 L140,64 L136,72 L124,72 L118,66 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />

          {/* Lignes de connexion entre destinations réalisées */}
          {DESTINATIONS.filter(d => d.status === 'realise').map((d, i, arr) => {
            if (i === arr.length - 1) return null
            const next = arr[i + 1]
            return (
              <line key={`line-${d.id}`}
                x1={d.x} y1={d.y} x2={next.x} y2={next.y}
                stroke={`rgba(246,183,77,0.15)`} strokeWidth="0.4" strokeDasharray="1.5 1.5"
              />
            )
          })}

          {/* Pinpoints */}
          {DESTINATIONS.map((dest) => (
            <g key={dest.id} onClick={() => setActive(active?.id === dest.id ? null : dest)} style={{ cursor: 'pointer' }}>
              {dest.status === 'mystere' ? (
                <>
                  <circle cx={dest.x} cy={dest.y} r={4} fill="rgba(246,183,77,0.08)" stroke={ACCENT} strokeWidth="0.4" strokeDasharray="1 1" />
                  <circle cx={dest.x} cy={dest.y} r={1.2} fill="rgba(246,183,77,0.4)" />
                  <text x={dest.x} y={dest.y - 6} textAnchor="middle" style={{ fontSize: '3px', fontFamily: M, fill: 'rgba(246,183,77,0.5)', letterSpacing: '0.05em' }}>???</text>
                </>
              ) : (
                <>
                  {/* Halo actif */}
                  {active?.id === dest.id && (
                    <circle cx={dest.x} cy={dest.y} r={8} fill="rgba(246,183,77,0.1)" />
                  )}
                  {/* Cercle extérieur */}
                  <circle cx={dest.x} cy={dest.y} r={5} fill="transparent" stroke={ACCENT} strokeWidth="0.4" opacity={0.4} />
                  {/* Point central */}
                  <circle cx={dest.x} cy={dest.y} r={active?.id === dest.id ? 3 : 2} fill={ACCENT} style={{ transition: 'r 0.2s' }} />
                  {/* Label */}
                  <text x={dest.x} y={dest.y - 7} textAnchor="middle"
                    style={{ fontSize: '3px', fontFamily: M, fill: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em', pointerEvents: 'none' }}>
                    {dest.country.toUpperCase()}
                  </text>
                </>
              )}
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              style={{
                position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(13,26,16,0.96)', border: '1px solid rgba(246,183,77,0.25)',
                padding: '20px 28px', backdropFilter: 'blur(12px)', minWidth: '240px', textAlign: 'center',
              }}>
              <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: ACCENT, marginBottom: '8px' }}>
                {active.continent}{active.year ? ` · ${active.year}` : ''}
              </p>
              <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '6px' }}>{active.name}</p>
              <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{active.description}</p>
              <button onClick={() => setActive(null)}
                style={{ marginTop: '12px', fontFamily: M, fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer' }}>
                fermer ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ position: 'absolute', top: '12px', right: '20px', fontFamily: M, fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>
          Cliquer sur un point
        </div>
      </div>

      {/* Liste destinations */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {DESTINATIONS.filter(d => d.status === 'realise').map((dest, i, arr) => (
          <motion.div key={dest.id}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setActive(active?.id === dest.id ? null : dest)}
            style={{
              flex: 1, padding: '28px 40px', cursor: 'pointer',
              borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              background: active?.id === dest.id ? 'rgba(246,183,77,0.05)' : 'transparent',
              transition: 'background 0.3s',
            }}>
            <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, marginBottom: '6px' }}>{dest.year}</p>
            <p style={{ fontFamily: C, fontSize: '18px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '4px' }}>{dest.country}</p>
            <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>{dest.description}</p>
          </motion.div>
        ))}
        <div style={{ flex: 1, padding: '28px 40px', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(246,183,77,0.35)', marginBottom: '6px' }}>Prochain</p>
          <p style={{ fontFamily: C, fontSize: '18px', fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>???</p>
          <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.2)' }}>Révélée J-7 aux candidats</p>
        </div>
      </div>
    </section>
  )
}
