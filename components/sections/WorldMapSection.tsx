'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#0d1a10'
const BGMID  = '#243429'
const ACCENT = '#f6b74d'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

type Destination = {
  id: string
  name: string
  country: string
  continent: string
  coordinates: [number, number]
  status: 'realise' | 'bientot' | 'mystere'
  year?: string
  description: string
}

const DESTINATIONS: Destination[] = [
  {
    id: 'kyrg',
    name: 'Tian Shan',
    country: 'Kirghizistan',
    continent: 'Asie centrale',
    coordinates: [74.5, 41.2],
    status: 'realise',
    year: '2025',
    description: 'Hauts plateaux, yourtes, cols à 4000m',
  },
  {
    id: 'nepal',
    name: 'Annapurna',
    country: 'Népal',
    continent: 'Himalaya',
    coordinates: [84.0, 28.6],
    status: 'realise',
    year: '2024',
    description: 'Thorong-La 5416m, villages sherpa',
  },
  {
    id: 'namibie',
    name: 'Désert du Namib',
    country: 'Namibie',
    continent: 'Afrique australe',
    coordinates: [18.5, -22.9],
    status: 'realise',
    year: '2025',
    description: 'Sossusvlei, Skeleton Coast',
  },
  {
    id: 'prochain',
    name: '???',
    country: 'Destination secrète',
    continent: '???',
    coordinates: [20, 10],
    status: 'mystere',
    description: 'Révélée J-7 aux candidats retenus',
  },
]

export default function WorldMapSection() {
  const [active, setActive] = useState<Destination | null>(null)
  const [position, setPosition] = useState({ coordinates: [20, 10] as [number, number], zoom: 1 })

  return (
    <section id="carte" style={{ background: BGDARK, padding: '104px 0 0', position: 'relative', overflow: 'hidden' }}>
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
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: `1px solid ${ACCENT}`, background: 'transparent' }} />
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>À venir</span>
          </div>
        </div>
      </div>

      {/* Carte */}
      <div style={{ position: 'relative', background: BGMID, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 140, center: [20, 20] }}
          style={{ width: '100%', height: '520px' }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={(pos) => setPosition({ coordinates: pos.coordinates as [number,number], zoom: pos.zoom })}
            minZoom={1}
            maxZoom={6}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgba(255,255,255,0.04)"
                    stroke="rgba(255,255,255,0.07)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: 'rgba(255,255,255,0.07)', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {DESTINATIONS.map((dest) => (
              <Marker
                key={dest.id}
                coordinates={dest.coordinates}
                onClick={() => setActive(active?.id === dest.id ? null : dest)}
                style={{ cursor: 'pointer' }}
              >
                {dest.status === 'mystere' ? (
                  /* Point mystère — pulsant */
                  <g>
                    <circle r={10} fill="rgba(246,183,77,0.08)" />
                    <circle r={5} fill="rgba(246,183,77,0.15)" stroke={ACCENT} strokeWidth={0.8} strokeDasharray="2 2" />
                    <text textAnchor="middle" y={-14} style={{ fontFamily: M, fontSize: '7px', fill: 'rgba(246,183,77,0.5)', letterSpacing: '0.1em' }}>???</text>
                  </g>
                ) : (
                  /* Point réalisé */
                  <g>
                    {active?.id === dest.id && (
                      <circle r={18} fill="rgba(246,183,77,0.12)" />
                    )}
                    <circle
                      r={active?.id === dest.id ? 7 : 5}
                      fill={ACCENT}
                      style={{ transition: 'r 0.2s' }}
                    />
                    <circle r={10} fill="transparent" stroke={ACCENT} strokeWidth={0.8} opacity={0.4} />
                    <text
                      textAnchor="middle"
                      y={-16}
                      style={{ fontFamily: M, fontSize: '8px', fill: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', pointerEvents: 'none' }}
                    >
                      {dest.country}
                    </text>
                  </g>
                )}
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip destination active */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(13,26,16,0.95)', border: '1px solid rgba(246,183,77,0.25)',
                padding: '20px 28px', backdropFilter: 'blur(12px)', minWidth: '260px', textAlign: 'center',
              }}
            >
              <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: ACCENT, marginBottom: '8px' }}>
                {active.continent} {active.year ? `· ${active.year}` : ''}
              </p>
              <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '6px' }}>
                {active.name}
              </p>
              <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                {active.description}
              </p>
              <button onClick={() => setActive(null)}
                style={{ marginTop: '14px', fontFamily: M, fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer' }}>
                fermer ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint zoom */}
        <div style={{ position: 'absolute', top: '16px', right: '24px', fontFamily: M, fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
          Scroll to zoom · Drag to pan
        </div>
      </div>

      {/* Liste destinations sous la carte */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {DESTINATIONS.filter(d => d.status === 'realise').map((dest, i, arr) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setActive(active?.id === dest.id ? null : dest)}
            style={{
              flex: 1, padding: '28px 40px', cursor: 'pointer',
              borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              background: active?.id === dest.id ? 'rgba(246,183,77,0.05)' : 'transparent',
              transition: 'background 0.3s',
            }}
          >
            <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, marginBottom: '6px' }}>{dest.year}</p>
            <p style={{ fontFamily: C, fontSize: '18px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '4px' }}>{dest.country}</p>
            <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>{dest.description}</p>
          </motion.div>
        ))}
        <div style={{ flex: 1, padding: '28px 40px', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(246,183,77,0.4)', marginBottom: '6px' }}>Prochain</p>
          <p style={{ fontFamily: C, fontSize: '18px', fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>???</p>
          <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.2)' }}>Révélée J-7 aux candidats</p>
        </div>
      </div>
    </section>
  )
}
