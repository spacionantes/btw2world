'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#0d1a10'
const BGMID  = '#1a2e1e'
const ACCENT = '#f6b74d'

const EXPEDITIONS = [
  { id: 'kyrg',    name: 'Tian Shan',       country: 'Kirghizistan', continent: 'Asie centrale',   year: '2025', description: 'Hauts plateaux, yourtes, cols à 4000m',  iso: 'KGZ' },
  { id: 'nepal',   name: 'Annapurna',       country: 'Népal',        continent: 'Himalaya',         year: '2024', description: 'Thorong-La 5416m, villages sherpa',       iso: 'NPL' },
  { id: 'namibie', name: 'Désert du Namib', country: 'Namibie',      continent: 'Afrique australe', year: '2025', description: 'Sossusvlei, Skeleton Coast',              iso: 'NAM' },
]

// Codes ISO A3 des pays visités
const VISITED_ISO = new Set([
  'DZA', 'COM', 'MAR', 'TUN',          // Afrique
  'SGP', 'VNM',                         // Asie du Sud-Est
  'BEL', 'CZE', 'DNK', 'FRA', 'GRC',  // Europe
  'HUN', 'ITA', 'LUX', 'MCO', 'NLD',
  'NOR', 'POL', 'PRT', 'ESP', 'SWE',
  'CHE', 'GBR',
  'TUR',                                // Moyen-Orient
  'CAN', 'USA',                         // Amérique du Nord
  'AUS',                                // Océanie
  'BRA',                                // Amérique du Sud
  'IND',                                // Asie du Sud
])

const EXPEDITION_ISO = new Set(EXPEDITIONS.map(e => e.iso))

export default function WorldMapSection() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<unknown>(null)
  const [active, setActive] = useState<typeof EXPEDITIONS[0] | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    import('leaflet').then(async L => {
      // @ts-expect-error leaflet icon default
      delete L.Icon.Default.prototype._getIconUrl

      const map = L.map(mapRef.current!, {
        center: [25, 15],
        zoom: 2,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        minZoom: 2,
      })

      mapInstance.current = map

      // Fond ocean uniquement — les pays sont dessinés par GeoJSON
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 8,
        subdomains: 'abcd',
        opacity: 0.15,
      }).addTo(map)

      // Chargement du GeoJSON mondial
      const res = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      const geojson = await res.json()

      L.geoJSON(geojson, {
        style: (feature) => {
          const iso = feature?.properties?.ISO_A3 as string
          if (EXPEDITION_ISO.has(iso)) {
            return { fillColor: ACCENT, fillOpacity: 0.9, color: '#0a140e', weight: 0.8, opacity: 1 }
          }
          if (VISITED_ISO.has(iso)) {
            return { fillColor: '#8faa8f', fillOpacity: 0.75, color: '#0a140e', weight: 0.8, opacity: 1 }
          }
          return { fillColor: '#1a2e1e', fillOpacity: 1, color: '#0a140e', weight: 0.5, opacity: 1 }
        },
        onEachFeature: (feature, layer) => {
          const iso = feature?.properties?.ISO_A3 as string
          if (EXPEDITION_ISO.has(iso)) {
            const exp = EXPEDITIONS.find(e => e.iso === iso)!
            layer.on('click', () => setActive(prev => prev?.id === exp.id ? null : exp))
            layer.on('mouseover', () => (layer as L.Path).setStyle({ fillColor: '#ffd166', fillOpacity: 1 }))
            layer.on('mouseout',  () => (layer as L.Path).setStyle({ fillColor: ACCENT, fillOpacity: 0.9 }))
          } else if (VISITED_ISO.has(iso)) {
            layer.on('mouseover', () => (layer as L.Path).setStyle({ fillOpacity: 0.95 }))
            layer.on('mouseout',  () => (layer as L.Path).setStyle({ fillOpacity: 0.75 }))
          }
        },
      }).addTo(map)

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
            <div style={{ width: '20px', height: '10px', background: 'rgba(255,255,255,0.35)', borderRadius: '2px' }} />
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Pays visité</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '10px', background: ACCENT, borderRadius: '2px' }} />
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Expédition BTW2WORLD</span>
          </div>
        </div>
      </div>

      {/* Carte */}
      <div style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <div ref={mapRef} style={{ width: '100%', height: '480px', background: BGMID }} />

        <div style={{ position: 'absolute', top: '14px', right: '20px', fontFamily: M, fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', zIndex: 1000, pointerEvents: 'none' }}>
          Cliquer sur un pays doré
        </div>

        <AnimatePresence>
          {active && (
            <motion.div key={active.id}
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

      {/* Liste expéditions */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {EXPEDITIONS.map((dest, i, arr) => (
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
