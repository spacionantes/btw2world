'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#0d1a10'
const BGMID  = '#1a2e1e'
const ACCENT = '#f6b74d'

const DESTINATIONS = [
  { id: 'kyrg',    name: 'Tian Shan',       country: 'Kirghizistan', continent: 'Asie centrale',   lat: 41.2,  lon: 74.5,  status: 'realise', year: '2025', description: 'Hauts plateaux, yourtes, cols à 4000m' },
  { id: 'nepal',   name: 'Annapurna',       country: 'Népal',        continent: 'Himalaya',         lat: 28.6,  lon: 84.0,  status: 'realise', year: '2024', description: 'Thorong-La 5416m, villages sherpa' },
  { id: 'namibie', name: 'Désert du Namib', country: 'Namibie',      continent: 'Afrique australe', lat: -22.9, lon: 18.5,  status: 'realise', year: '2025', description: 'Sossusvlei, Skeleton Coast' },
]

export default function WorldMapSection() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<unknown>(null)
  const [active, setActive] = useState<typeof DESTINATIONS[0] | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    // Import Leaflet côté client uniquement
    import('leaflet').then(L => {
      // Fix icônes Leaflet avec Next.js
      // @ts-expect-error leaflet icon default
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: [20, 30],
        zoom: 2,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      })

      mapInstance.current = map

      // Tiles CartoDB Dark (pas de clé API)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 8,
        subdomains: 'abcd',
      }).addTo(map)

      // Marqueur personnalisé SVG
      DESTINATIONS.forEach(dest => {
        const svgIcon = L.divIcon({
          html: `
            <div style="position:relative;width:24px;height:24px;cursor:pointer">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="${ACCENT}" stroke-width="1" opacity="0.5"/>
                <circle cx="12" cy="12" r="4" fill="${ACCENT}"/>
              </svg>
              <div style="position:absolute;top:-22px;left:50%;transform:translateX(-50%);white-space:nowrap;font-family:'DM Mono',monospace;font-size:8px;letter-spacing:0.15em;color:rgba(255,255,255,0.75);text-transform:uppercase">
                ${dest.country}
              </div>
            </div>
          `,
          className: '',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        L.marker([dest.lat, dest.lon], { icon: svgIcon })
          .addTo(map)
          .on('click', () => setActive(prev => prev?.id === dest.id ? null : dest))
      })

      // Contrôle zoom custom
      L.control.zoom({ position: 'bottomright' }).addTo(map)
    })

    return () => {
      if (mapInstance.current) {
        ;(mapInstance.current as { remove: () => void }).remove()
        mapInstance.current = null
      }
    }
  }, [])

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
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Destination réalisée</span>
          </div>
        </div>
      </div>

      {/* Carte Leaflet */}
      <div style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {/* CSS Leaflet */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

        <div ref={mapRef} style={{ width: '100%', height: '480px', background: BGMID }} />

        {/* Hint */}
        <div style={{ position: 'absolute', top: '14px', right: '20px', fontFamily: M, fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', zIndex: 1000, pointerEvents: 'none' }}>
          Cliquer sur un point
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              style={{
                position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(13,26,16,0.97)', border: '1px solid rgba(246,183,77,0.25)',
                padding: '20px 28px', backdropFilter: 'blur(12px)', minWidth: '240px', textAlign: 'center', zIndex: 1000,
              }}>
              <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: ACCENT, marginBottom: '8px' }}>
                {active.continent} · {active.year}
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
      </div>

      {/* Liste destinations */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {DESTINATIONS.map((dest, i, arr) => (
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
