'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Nav from '@/components/layout/Nav'

const J = "'Jost', sans-serif"
const C = "'Cormorant Garamond', serif"

export default function HeroSection() {
  return (
    <div style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <Image
        src="/images/hero-bg.jpg"
        alt="BTW2WORLD — Kirghizistan"
        fill priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
      />

      {/* Overlay dégradé chaud — inspiré Yemenya */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(20,36,26,0.35) 0%, rgba(20,36,26,0.05) 35%, rgba(20,36,26,0.75) 100%)',
      }} />
      {/* Vignette latérale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 45%, rgba(10,22,16,0.55) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Nav />

        {/* Titre centré — Cormorant italic monumental */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 40px',
          gap: '20px',
        }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            style={{ fontFamily: J, fontSize: '10px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#f6b74d', fontWeight: 400 }}
          >
            L&apos;Entre 2 Mondes · Expéditions nature
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: C,
              fontSize: 'clamp(72px, 10vw, 152px)',
              fontWeight: 300, fontStyle: 'italic',
              color: '#ffffff', lineHeight: 0.9,
              letterSpacing: '-0.015em',
            }}
          >
            Partir à<br />l&apos;aveugle
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            style={{
              fontFamily: C, fontSize: 'clamp(18px, 2vw, 26px)',
              fontStyle: 'italic', fontWeight: 300,
              color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em',
            }}
          >
            en terre inconnue — destination révélée J&#8209;7
          </motion.p>
        </div>

        {/* Barre bas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{
            padding: '28px 48px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            flexWrap: 'wrap', gap: '16px',
          }}
        >
          <p style={{ fontFamily: J, fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Kirghizistan · Népal · et au-delà
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/candidater" style={{
              fontFamily: J, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
              background: '#f6b74d', color: '#354f3b', padding: '12px 28px', textDecoration: 'none', fontWeight: 500,
            }}>
              Candidater
            </Link>
            <Link href="/destinations" style={{
              fontFamily: J, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)',
              padding: '12px 28px', textDecoration: 'none',
            }}>
              Expéditions →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
