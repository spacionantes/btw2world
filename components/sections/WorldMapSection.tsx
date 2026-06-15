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
  { id: 'kyrg',  name: 'Tian Shan',  country: 'Kirghizistan', continent: 'Asie centrale', year: '2025', description: 'Hauts plateaux, yourtes, cols à 4000m', lat: 41.2, lon: 74.5 },
  { id: 'nepal', name: 'Annapurna', country: 'Népal',         continent: 'Himalaya',      year: '2024', description: 'Thorong-La 5416m, villages sherpa',    lat: 28.4, lon: 84.1 },
]

const VISITED = [
  { name: 'Algérie',          lat: 28.0,  lon: 1.7   },
  { name: 'Comores',          lat: -11.7, lon: 43.3  },
  { name: 'Maroc',            lat: 31.8,  lon: -7.1  },
  { name: 'Tunisie',          lat: 33.9,  lon: 9.6   },
  { name: 'Singapour',        lat: 1.3,   lon: 103.8 },
  { name: 'Vietnam',          lat: 14.1,  lon: 108.3 },
  { name: 'Belgique',         lat: 50.8,  lon: 4.5   },
  { name: 'Rép. tchèque',     lat: 49.8,  lon: 15.5  },
  { name: 'Danemark',         lat: 56.3,  lon: 9.5   },
  { name: 'France',           lat: 46.2,  lon: 2.2   },
  { name: 'Grèce',            lat: 39.1,  lon: 21.8  },
  { name: 'Hongrie',          lat: 47.2,  lon: 19.5  },
  { name: 'Italie',           lat: 41.9,  lon: 12.6  },
  { name: 'Luxembourg',       lat: 49.8,  lon: 6.1   },
  { name: 'Monaco',           lat: 43.7,  lon: 7.4   },
  { name: 'Pays-Bas',         lat: 52.1,  lon: 5.3   },
  { name: 'Norvège',          lat: 60.5,  lon: 8.5   },
  { name: 'Pologne',          lat: 51.9,  lon: 19.1  },
  { name: 'Portugal',         lat: 39.4,  lon: -8.2  },
  { name: 'Espagne',          lat: 40.5,  lon: -3.7  },
  { name: 'Suède',            lat: 60.1,  lon: 18.6  },
  { name: 'Suisse',           lat: 46.8,  lon: 8.2   },
  { name: 'Royaume-Uni',      lat: 51.5,  lon: -0.1  },
  { name: 'Turquie',          lat: 38.9,  lon: 35.2  },
  { name: 'Canada',           lat: 60.0,  lon: -96.8 },
  { name: 'États-Unis',       lat: 37.1,  lon: -95.7 },
  { name: 'Australie',        lat: -25.3, lon: 133.8 },
  { name: 'Brésil',           lat: -14.2, lon: -51.9 },
  { name: 'Inde',             lat: 20.6,  lon: 78.9  },
]

export default function WorldMapSection() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<unknown>(null)
  const [active, setActive] = useState<typeof EXPEDITIONS[0] | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<{ name: string; x: number; y: number } | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    import('leaflet').then(L => {
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

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 8,
        subdomains: 'abcd',
      }).addTo(map)

      // Points pays visités — petits cercles blancs avec tooltip hover
      VISITED.forEach(({ name, lat, lon }) => {
        const icon = L.divIcon({
          html: `<svg viewBox="0 0 10 10" width="10" height="10">
            <circle cx="5" cy="5" r="3.5" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          </svg>`,
          className: '',
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        })

        const marker = L.marker([lat, lon], { icon }).addTo(map)

        marker.on('mouseover', (e) => {
          const containerPoint = map.latLngToContainerPoint([lat, lon])
          setHoveredCountry({ name, x: containerPoint.x, y: containerPoint.y })
        })
        marker.on('mouseout', () => setHoveredCountry(null))
      })

      // Expéditions BTW2WORLD — points gold cliquables
      EXPEDITIONS.forEach(dest => {
        const icon = L.divIcon({
          html: `
            <div style="position:relative;width:28px;height:28px;cursor:pointer">
              <svg viewBox="0 0 28 28" width="28" height="28">
                <circle cx="14" cy="14" r="12" fill="none" stroke="${ACCENT}" stroke-width="1" opacity="0.5"/>
                <circle cx="14" cy="14" r="5" fill="${ACCENT}"/>
              </svg>
              <div style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);white-space:nowrap;font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:0.14em;color:rgba(255,255,255,0.85);text-transform:uppercase">
                ${dest.country}
              </div>
            </div>
          `,
          className: '',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })

        L.marker([dest.lat, dest.lon], { icon })
          .addTo(map)
          .on('click', () => setActive(prev => prev?.id === dest.id ? null : dest))
      })

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
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Pays visité</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT }} />
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Expédition BTW2WORLD</span>
          </div>
        </div>
      </div>

      {/* Carte */}
      <div style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <div ref={mapRef} style={{ width: '100%', height: '480px', background: BGMID }} />

        {/* Tooltip pays visité */}
        {hoveredCountry && (
          <div style={{
            position: 'absolute', zIndex: 1000, pointerEvents: 'none',
            left: hoveredCountry.x + 14, top: hoveredCountry.y - 28,
            background: 'rgba(13,26,16,0.95)', border: '1px solid rgba(255,255,255,0.12)',
            padding: '5px 12px', backdropFilter: 'blur(8px)',
          }}>
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>
              {hoveredCountry.name}
            </span>
          </div>
        )}

        <div style={{ position: 'absolute', top: '14px', right: '20px', fontFamily: M, fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', zIndex: 1000, pointerEvents: 'none' }}>
          Cliquer sur un point doré
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
