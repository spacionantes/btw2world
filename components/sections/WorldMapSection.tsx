'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#0d1a10'
const ACCENT = '#f6b74d'

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

const VISITED = [
  { name: 'Algérie',      lat: 28.0,  lon: 1.7   },
  { name: 'Comores',      lat: -11.7, lon: 43.3  },
  { name: 'Maroc',        lat: 31.8,  lon: -7.1  },
  { name: 'Tunisie',      lat: 33.9,  lon: 9.6   },
  { name: 'Singapour',    lat: 1.3,   lon: 103.8 },
  { name: 'Vietnam',      lat: 14.1,  lon: 108.3 },
  { name: 'Belgique',     lat: 50.8,  lon: 4.5   },
  { name: 'Rép. tchèque', lat: 49.8,  lon: 15.5  },
  { name: 'Danemark',     lat: 56.3,  lon: 9.5   },
  { name: 'France',       lat: 46.2,  lon: 2.2   },
  { name: 'Grèce',        lat: 39.1,  lon: 21.8  },
  { name: 'Hongrie',      lat: 47.2,  lon: 19.5  },
  { name: 'Italie',       lat: 41.9,  lon: 12.6  },
  { name: 'Luxembourg',   lat: 49.8,  lon: 6.1   },
  { name: 'Monaco',       lat: 43.7,  lon: 7.4   },
  { name: 'Pays-Bas',     lat: 52.1,  lon: 5.3   },
  { name: 'Norvège',      lat: 60.5,  lon: 8.5   },
  { name: 'Pologne',      lat: 51.9,  lon: 19.1  },
  { name: 'Portugal',     lat: 39.4,  lon: -8.2  },
  { name: 'Espagne',      lat: 40.5,  lon: -3.7  },
  { name: 'Suède',        lat: 60.1,  lon: 18.6  },
  { name: 'Suisse',       lat: 46.8,  lon: 8.2   },
  { name: 'Royaume-Uni',  lat: 51.5,  lon: -0.1  },
  { name: 'Turquie',      lat: 38.9,  lon: 35.2  },
  { name: 'Canada',       lat: 60.0,  lon: -96.8 },
  { name: 'États-Unis',   lat: 37.1,  lon: -95.7 },
  { name: 'Australie',    lat: -25.3, lon: 133.8 },
  { name: 'Brésil',       lat: -14.2, lon: -51.9 },
  { name: 'Inde',         lat: 20.6,  lon: 78.9  },
]

type TPoint = { lat: number; lng: number; name: string; kind: 'visited' | 'exp'; id?: string }

export default function WorldMapSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<{ pointOfView: (v: object, ms: number) => void; controls: () => { autoRotate: boolean; autoRotateSpeed: number; enableZoom: boolean } } | null>(null)
  const [activePanel, setActivePanel] = useState<typeof EXPEDITIONS[0] | null>(null)
  const [tooltip, setTooltip] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current

    Promise.all([
      import('globe.gl').then(m => m.default),
      import('three'),
      fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then(r => r.json()),
    ]).then(([Globe, THREE, geoData]) => {
      if (!el) return

      const allPoints: TPoint[] = [
        ...VISITED.map(v => ({ lat: v.lat, lng: v.lon, name: v.name, kind: 'visited' as const })),
        ...EXPEDITIONS.map(e => ({ lat: e.lat, lng: e.lon, name: e.country, kind: 'exp' as const, id: e.id })),
      ]

      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color('#0e1f12'),
        shininess: 10,
        specular: new THREE.Color('#1a3320'),
      })

      // @ts-expect-error globe.gl dynamic
      const globe = Globe()(el)
        .width(el.clientWidth)
        .height(560)
        .backgroundColor(BGDARK)
        .globeMaterial(material)
        .polygonsData(geoData.features)
        .polygonCapColor(() => '#192e1c')
        .polygonSideColor(() => 'rgba(0,0,0,0)')
        .polygonStrokeColor(() => 'rgba(255,255,255,0.07)')
        .polygonAltitude(0.003)
        .pointsData(allPoints)
        .pointColor((d: object) => (d as TPoint).kind === 'exp' ? ACCENT : 'rgba(255,255,255,0.55)')
        .pointAltitude((d: object) => (d as TPoint).kind === 'exp' ? 0.025 : 0.012)
        .pointRadius((d: object) => (d as TPoint).kind === 'exp' ? 0.55 : 0.18)
        .pointLabel((d: object) => {
          const p = d as TPoint
          return p.kind === 'exp'
            ? `<div style="font-family:'DM Mono',monospace;font-size:11px;letter-spacing:0.15em;color:#f6b74d;background:rgba(13,26,16,0.9);padding:6px 12px;border:1px solid rgba(246,183,77,0.3)">${p.name}</div>`
            : `<div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.12em;color:rgba(255,255,255,0.75);background:rgba(13,26,16,0.85);padding:4px 10px">${p.name}</div>`
        })
        .onPointClick((point: object) => {
          const p = point as TPoint
          if (p.kind === 'exp') {
            const exp = EXPEDITIONS.find(e => e.id === p.id)
            if (exp) {
              globe.pointOfView({ lat: exp.lat, lng: exp.lon, altitude: 1.8 }, 1400)
              setActivePanel(exp)
            }
          }
        })
        .onPointHover((point: object | null) => {
          setTooltip(point ? (point as TPoint).name : null)
          el.style.cursor = point && (point as TPoint).kind === 'exp' ? 'pointer' : 'grab'
        })

      const controls = globe.controls()
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.35
      controls.enableZoom = false

      globeRef.current = globe
      setLoaded(true)
    })

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ''
      globeRef.current = null
    }
  }, [])

  const handleExpeditionClick = (dest: typeof EXPEDITIONS[0]) => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: dest.lat, lng: dest.lon, altitude: 1.8 }, 1400)
    }
    setActivePanel(prev => prev?.id === dest.id ? null : dest)
  }

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
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.55)' }} />
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Pays visité</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT }} />
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Expédition BTW2WORLD</span>
          </div>
        </div>
      </div>

      {/* Globe */}
      <div style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)', background: BGDARK }}>
        {!loaded && (
          <div style={{ position: 'absolute', inset: 0, height: '560px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
            <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Chargement du globe…</p>
          </div>
        )}
        <div ref={containerRef} style={{ width: '100%', height: '560px', background: BGDARK }} />

        {tooltip && (
          <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', fontFamily: M, fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none', zIndex: 10 }}>
            {tooltip}
          </div>
        )}
        <div style={{ position: 'absolute', top: '14px', right: '20px', fontFamily: M, fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', zIndex: 10, pointerEvents: 'none' }}>
          Cliquer sur un point doré
        </div>
      </div>

      {/* Overlay sombre */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActivePanel(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(5,12,7,0.55)', zIndex: 498, backdropFilter: 'blur(2px)', cursor: 'pointer' }}
          />
        )}
      </AnimatePresence>

      {/* Panneau latéral */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            key={activePanel.id}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0,
              width: 'clamp(340px, 45vw, 640px)',
              height: '100vh',
              background: BGDARK,
              zIndex: 499,
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ flex: '0 0 55%', position: 'relative', overflow: 'hidden' }}>
              <Image src={activePanel.image} alt={activePanel.country} fill sizes="45vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,26,16,0.15) 40%, rgba(13,26,16,0.88) 100%)' }} />
              <button onClick={() => setActivePanel(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(13,26,16,0.7)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                ×
              </button>
              <div style={{ position: 'absolute', bottom: '24px', left: '32px' }}>
                <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: ACCENT, marginBottom: '6px' }}>
                  {activePanel.continent} · {activePanel.month} {activePanel.year}
                </p>
                <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 4vw, 52px)', fontStyle: 'italic', fontWeight: 400, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
                  {activePanel.country}
                </h2>
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
              <p style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85 }}>
                {activePanel.description}
              </p>
              <Link href={`/destinations/${activePanel.slug}`}
                style={{ fontFamily: J, fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.22em', background: ACCENT, color: BGDARK, padding: '15px 32px', textDecoration: 'none', display: 'inline-block', alignSelf: 'flex-start', marginTop: 'auto' }}>
                Voir l&apos;expédition →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liste expéditions */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {EXPEDITIONS.map((dest, i, arr) => (
          <motion.div key={dest.id}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => handleExpeditionClick(dest)}
            style={{
              flex: 1, padding: '28px 40px', cursor: 'pointer',
              borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              background: activePanel?.id === dest.id ? 'rgba(246,183,77,0.05)' : 'transparent',
              transition: 'background 0.3s',
            }}>
            <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, marginBottom: '6px' }}>{dest.month} {dest.year}</p>
            <p style={{ fontFamily: C, fontSize: '18px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '4px' }}>{dest.country}</p>
            <p style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>{dest.people} voyageurs</p>
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
