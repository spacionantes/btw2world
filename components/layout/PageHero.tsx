'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Nav from './Nav'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#426248'
const ACCENT = '#f6b74d'

interface PageHeroProps {
  image: string
  label: string
  title: string
  subtitle?: string
}

export default function PageHero({ image, label, title, subtitle }: PageHeroProps) {
  return (
    <div style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <Image src={image} alt={title} fill sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,20,14,0.3) 0%, rgba(10,20,14,0.1) 40%, rgba(10,20,14,0.85) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Nav />

        <div style={{ marginTop: 'auto', padding: '0 72px 72px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'inline-block', background: ACCENT, padding: '5px 14px', marginBottom: '24px' }}>
            <span style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: BGDARK, fontWeight: 600 }}>
              {label}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: C, fontSize: 'clamp(56px, 8vw, 116px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.88, letterSpacing: '-0.02em', maxWidth: '70vw', whiteSpace: 'pre-line' }}>
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65 }}
              style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', marginTop: '20px', letterSpacing: '0.04em' }}>
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}
