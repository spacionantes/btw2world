'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#0d1a10'
const BGMID  = '#1a2e1e'
const ACCENT = '#f6b74d'

// Projection équirectangulaire : viewBox 360x180
// x = lon + 180  (0→360)
// y = 90 - lat   (0→180)
function ll(lon: number, lat: number): string {
  return `${lon + 180},${90 - lat}`
}

type Destination = {
  id: string
  name: string
  country: string
  continent: string
  lon: number
  lat: number
  status: 'realise' | 'mystere'
  year?: string
  description: string
}

const DESTINATIONS: Destination[] = [
  { id: 'kyrg',    name: 'Tian Shan',       country: 'Kirghizistan', continent: 'Asie centrale',   lon: 74.5,  lat: 41.2,  status: 'realise', year: '2025', description: 'Hauts plateaux, yourtes, cols à 4000m' },
  { id: 'nepal',   name: 'Annapurna',       country: 'Népal',        continent: 'Himalaya',         lon: 84.0,  lat: 28.6,  status: 'realise', year: '2024', description: 'Thorong-La 5416m, villages sherpa' },
  { id: 'namibie', name: 'Désert du Namib', country: 'Namibie',      continent: 'Afrique australe', lon: 18.5,  lat: -22.9, status: 'realise', year: '2025', description: 'Sossusvlei, Skeleton Coast' },
  { id: 'next',    name: '???',             country: 'Destination secrète', continent: '???',       lon: -10.0, lat: 20.0,  status: 'mystere',              description: 'Révélée J-7 aux candidats retenus' },
]

// Continents en polygones simplifiés (coordonnées géographiques réelles)
const CONTINENTS = [
  {
    id: 'na',
    label: '',
    points: [
      [-168,72],[-130,72],[-95,75],[-65,47],[-52,46],[-62,44],[-82,24],[-88,15],
      [-84,9],[-78,8],[-76,8],[-77,9],[-83,10],[-90,16],[-104,18],[-118,22],
      [-122,37],[-124,48],[-140,59],[-155,60],[-168,72],
    ]
  },
  {
    id: 'sa',
    label: '',
    points: [
      [-81,11],[-64,12],[-60,9],[-50,2],[-35,-5],[-35,-8],[-38,-13],[-40,-20],
      [-42,-22],[-44,-23],[-48,-28],[-50,-30],[-52,-33],[-55,-35],[-65,-42],
      [-66,-55],[-70,-55],[-74,-45],[-80,-38],[-80,-28],[-75,-14],[-80,0],[-81,11],
    ]
  },
  {
    id: 'eu',
    label: '',
    points: [
      [-10,36],[-5,36],[0,38],[3,43],[10,44],[15,44],[18,40],[25,40],
      [28,42],[30,46],[30,48],[22,54],[20,60],[15,68],[5,62],
      [0,51],[-5,48],[-8,42],[-10,36],
    ]
  },
  {
    id: 'af',
    label: '',
    points: [
      [-17,15],[-17,22],[-12,28],[0,30],[10,37],[22,37],[37,30],[44,12],
      [50,12],[52,12],[50,0],[42,-12],[40,-16],[36,-18],[35,-22],[30,-24],
      [27,-30],[18,-35],[15,-35],[12,-34],[8,-26],[5,-2],[-3,5],
      [-17,14],[-17,15],
    ]
  },
  {
    id: 'as',
    label: '',
    points: [
      [26,42],[30,46],[35,42],[38,37],[42,38],[48,30],[58,22],[60,22],
      [65,24],[72,22],[76,8],[80,10],[92,8],[100,5],[104,1],[108,2],
      [120,23],[122,30],[130,35],[135,35],[140,38],[142,46],[142,54],
      [135,50],[130,48],[125,50],[120,54],[105,52],[95,52],[80,55],
      [68,55],[60,55],[50,58],[45,65],[40,68],[35,68],[30,65],[28,60],
      [26,56],[26,42],
    ]
  },
  {
    id: 'as2',
    label: '',
    points: [
      [98,20],[100,14],[104,10],[108,12],[110,20],[108,24],[104,22],[98,20],
    ]
  },
  {
    id: 'au',
    label: '',
    points: [
      [114,-22],[118,-20],[122,-18],[128,-14],[132,-12],[136,-12],[140,-14],
      [144,-18],[148,-20],[152,-24],[154,-28],[152,-34],[148,-38],[144,-38],
      [138,-36],[132,-34],[128,-34],[122,-34],[116,-34],[112,-28],[114,-22],
    ]
  },
]

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

      {/* Carte SVG */}
      <div style={{ position: 'relative', background: BGMID, borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 360 180"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Fond océan */}
          <rect width="360" height="180" fill={BGMID} />

          {/* Grille méridiens/parallèles */}
          {[-150,-120,-90,-60,-30,0,30,60,90,120,150].map(lon => (
            <line key={lon} x1={lon+180} y1={0} x2={lon+180} y2={180} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          ))}
          {[-60,-30,0,30,60].map(lat => (
            <line key={lat} x1={0} y1={90-lat} x2={360} y2={90-lat} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          ))}
          {/* Équateur */}
          <line x1={0} y1={90} x2={360} y2={90} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeDasharray="4 4" />

          {/* Continents */}
          {CONTINENTS.map(c => (
            <polygon
              key={c.id}
              points={c.points.map(([lon, lat]) => ll(lon, lat)).join(' ')}
              fill="rgba(255,255,255,0.07)"
              stroke="rgba(255,255,255,0.13)"
              strokeWidth="0.6"
              strokeLinejoin="round"
            />
          ))}

          {/* Lignes de connexion entre destinations réalisées */}
          {(() => {
            const realises = DESTINATIONS.filter(d => d.status === 'realise')
            return realises.map((d, i) => {
              if (i === realises.length - 1) return null
              const next = realises[i + 1]
              return (
                <line key={`link-${d.id}`}
                  x1={d.lon + 180} y1={90 - d.lat}
                  x2={next.lon + 180} y2={90 - next.lat}
                  stroke="rgba(246,183,77,0.2)" strokeWidth="0.6" strokeDasharray="2 2"
                />
              )
            })
          })()}

          {/* Pinpoints */}
          {DESTINATIONS.map(dest => {
            const cx = dest.lon + 180
            const cy = 90 - dest.lat
            const isActive = active?.id === dest.id

            if (dest.status === 'mystere') return (
              <g key={dest.id} onClick={() => setActive(isActive ? null : dest)} style={{ cursor: 'pointer' }}>
                <circle cx={cx} cy={cy} r={6} fill="rgba(246,183,77,0.06)" stroke={ACCENT} strokeWidth="0.6" strokeDasharray="1.5 1.5" />
                <circle cx={cx} cy={cy} r={1.5} fill="rgba(246,183,77,0.5)" />
                <text x={cx} y={cy - 8} textAnchor="middle" fontSize="4" fontFamily={M} fill="rgba(246,183,77,0.5)" letterSpacing="0.5">???</text>
              </g>
            )

            return (
              <g key={dest.id} onClick={() => setActive(isActive ? null : dest)} style={{ cursor: 'pointer' }}>
                {isActive && <circle cx={cx} cy={cy} r={12} fill="rgba(246,183,77,0.1)" />}
                <circle cx={cx} cy={cy} r={7} fill="transparent" stroke={ACCENT} strokeWidth="0.7" opacity={0.45} />
                <circle cx={cx} cy={cy} r={isActive ? 4 : 2.5} fill={ACCENT} />
                <text x={cx} y={cy - 10} textAnchor="middle" fontSize="4.5" fontFamily={M} fill="rgba(255,255,255,0.65)" letterSpacing="0.3">
                  {dest.country.toUpperCase()}
                </text>
              </g>
            )
          })}
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
                padding: '20px 28px', backdropFilter: 'blur(12px)', minWidth: '240px', textAlign: 'center', zIndex: 10,
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
