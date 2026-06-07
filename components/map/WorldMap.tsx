'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { VOYAGES } from '@/lib/data'

/* Projection équirectangulaire → % dans viewBox 100×50 */
function xy(lon: number, lat: number) {
  return { x: ((lon + 180) / 360) * 100, y: ((90 - lat) / 180) * 50 }
}

/* Continents en paths SVG réalistes (simplifiés mais reconnaissables) */
const LAND = `
  M13 6 L18 5 L22 7 L25 10 L26 15 L24 20 L22 24 L18 27 L14 25 L11 20 L10 14 L11 9 Z
  M16 28 L21 27 L23 30 L23 35 L21 42 L17 44 L14 41 L13 36 L14 30 Z
  M47 6 L53 5 L57 7 L58 11 L56 14 L52 16 L47 15 L44 12 L44 8 Z
  M46 17 L58 16 L60 20 L59 28 L57 35 L54 41 L50 43 L46 40 L43 34 L43 23 Z
  M57 5 L72 4 L82 6 L87 10 L88 16 L84 22 L78 26 L68 27 L58 24 L55 18 L55 10 Z
  M69 10 L76 10 L80 14 L79 20 L74 22 L69 20 L67 14 Z
  M76 31 L83 30 L86 33 L85 38 L81 41 L76 40 L74 36 Z
  M12 38 L20 38 L20 42 L16 43 L12 41 Z
`

export default function WorldMap() {
  const router = useRouter()
  const [tooltip, setTooltip] = useState<{
    voyage: typeof VOYAGES[0]
    x: number
    y: number
  } | null>(null)

  const pins = VOYAGES.filter(v => v.status !== 'bientot')

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '2px', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 100 50"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Fond océan */}
        <rect width="100" height="50" fill="#162a1e" />

        {/* Grille géo subtile */}
        {[-60, -30, 0, 30, 60].map(lat => {
          const y = ((90 - lat) / 180) * 50
          return <line key={`lat${lat}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.12" />
        })}
        {[-120, -60, 0, 60, 120].map(lon => {
          const x = ((lon + 180) / 360) * 100
          return <line key={`lon${lon}`} x1={x} y1="0" x2={x} y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.12" />
        })}
        {/* Équateur */}
        <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(246,183,77,0.08)" strokeWidth="0.2" />

        {/* Masses terrestres */}
        <path d={LAND} fill="#3a5f46" stroke="#426248" strokeWidth="0.25" strokeLinejoin="round" />

        {/* Pins destinations */}
        {pins.map((voyage, i) => {
          const { x, y } = xy(voyage.coordinates[0], voyage.coordinates[1])
          const isOpen = voyage.status === 'ouvert'

          return (
            <g
              key={voyage.id}
              transform={`translate(${x},${y})`}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(`/destinations/${voyage.slug}`)}
              onMouseEnter={(e) => {
                const parent = (e.currentTarget.closest('svg') as SVGSVGElement)
                  .parentElement!.getBoundingClientRect()
                setTooltip({ voyage, x: e.clientX - parent.left, y: e.clientY - parent.top })
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Halo externe pulsant */}
              <motion.circle
                r={1.8}
                fill="none"
                stroke={isOpen ? '#f6b74d' : 'rgba(255,255,255,0.5)'}
                strokeWidth={0.35}
                initial={{ r: 1.8, opacity: 0.5 }}
                animate={{ r: [1.8, 3.2, 1.8], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              />
              {/* Point */}
              <circle r={0.8} fill={isOpen ? '#f6b74d' : 'rgba(255,255,255,0.6)'} />
              <circle r={0.35} fill={isOpen ? '#1e2e22' : 'rgba(30,46,34,0.8)'} />

              {/* Label */}
              <text
                y={-1.8}
                textAnchor="middle"
                fontSize="1.4"
                fill={isOpen ? 'rgba(246,183,77,0.9)' : 'rgba(255,255,255,0.6)'}
                style={{ fontFamily: "'Jost',sans-serif", letterSpacing: '0.05em', pointerEvents: 'none' }}
              >
                {voyage.country}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Légende */}
      <div style={{
        position: 'absolute', bottom: '12px', left: '16px',
        display: 'flex', gap: '16px', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f6b74d' }} />
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.45)' }}>Ouvert</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.45)' }}>Passé</span>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              left: Math.min(tooltip.x + 14, window?.innerWidth - 220 || tooltip.x + 14),
              top: tooltip.y - 75,
              background: 'rgba(30,46,34,0.97)',
              border: '1px solid rgba(246,183,77,0.3)',
              padding: '12px 16px',
              pointerEvents: 'none',
              zIndex: 20,
              minWidth: '170px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.22em', color: '#f6b74d', marginBottom: '4px' }}>
              {tooltip.voyage.continent}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '15px', color: '#fff', marginBottom: '3px' }}>
              {tooltip.voyage.country}
            </p>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>
              {tooltip.voyage.duration} jours · Cliquer →
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
