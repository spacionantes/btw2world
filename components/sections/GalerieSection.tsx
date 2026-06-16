'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PHOTOS } from '@/lib/data'

export default function GalerieSection() {
  const col1 = PHOTOS.filter((_, i) => i % 3 === 0)
  const col2 = PHOTOS.filter((_, i) => i % 3 === 1)
  const col3 = PHOTOS.filter((_, i) => i % 3 === 2)

  const renderCol = (photos: typeof PHOTOS, delay: number) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {photos.map((photo, i) => (
        <motion.div key={photo.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, delay: delay + i * 0.08 }}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'relative', aspectRatio: i % 2 === 0 ? '3/4' : '4/3' }}>
            <Image src={photo.src} alt={photo.alt} fill sizes="33vw" loading="lazy"
              style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
            />
            {/* Overlay hover */}
            <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,46,34,0.88) 0%, transparent 55%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px' }}
            >
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#f6b74d', marginBottom: '3px' }}>{photo.country}</p>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '15px', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>{photo.location}</p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <section style={{ background: '#1a3320' }} className="section-pad">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ marginBottom: '56px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}
        >
          <div>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#f6b74d', marginBottom: '16px' }}>Sur le terrain</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,4vw,58px)', fontWeight: 400, color: '#ffffff', lineHeight: 1.05 }}>
              Ce que les cartes<br />ne montrent pas
            </h2>
          </div>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '18px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.55)', maxWidth: '260px', lineHeight: 1.7 }}>
            Kirghizistan · Népal · et au-delà
          </p>
        </motion.div>

        <div className="grid-masonry">
          {renderCol(col1, 0)}
          {renderCol(col2, 0.1)}
          {renderCol(col3, 0.2)}
        </div>
      </div>
    </section>
  )
}
