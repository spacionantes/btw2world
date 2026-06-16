'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const WorldMap = dynamic(() => import('@/components/map/WorldMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: '520px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.3)',
      fontFamily: "'Jost',sans-serif",
      fontSize: '11px',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    }}>
      Chargement de la carte…
    </div>
  ),
})

export default function MapSection() {
  return (
    <section style={{ background: '#1a2e1e', padding: '96px 56px 64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '56px' }}
        >
          <p style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#f6b74d',
            marginBottom: '16px',
          }}>
            Les terres explorées
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 4vw, 58px)',
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1.05,
          }}>
            Là où tout a commencé
          </h2>
        </motion.div>

        <WorldMap />

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '15px',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.35)',
          marginTop: '24px',
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}>
          Cliquez sur un pin pour découvrir l&apos;expédition
        </p>
      </div>
    </section>
  )
}
