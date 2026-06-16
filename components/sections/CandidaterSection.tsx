'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const J = "'Jost', sans-serif"
const C = "'Cormorant Garamond', serif"
const M = "'DM Mono', monospace"

export default function CandidaterSection() {
  return (
    <section style={{ background: '#354f3b', padding: '140px 72px' }}>
      <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: M, fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#f6b74d', marginBottom: '32px' }}>
          04 — Rejoindre une expédition
        </p>
        <h2 style={{ fontFamily: C, fontSize: 'clamp(56px, 8vw, 120px)', fontWeight: 300, fontStyle: 'italic', color: '#ffffff', lineHeight: 0.88, letterSpacing: '-0.01em', marginBottom: '32px' }}>
          Prêt pour<br />l&apos;inconnu ?
        </h2>
        <p style={{ fontFamily: J, fontSize: '17px', fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.9, maxWidth: '560px', margin: '0 auto 56px' }}>
          Les places sont rares. Les profils, sélectionnés avec soin. Si quelque chose en vous répond à l&apos;appel, ne laissez pas passer.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/candidater" style={{ fontFamily: J, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', background: '#f6b74d', color: '#354f3b', padding: '16px 44px', textDecoration: 'none', fontWeight: 500 }}>
            Je candidate
          </Link>
          <a href="mailto:contact@btw2world.com" style={{ fontFamily: J, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '16px 44px', textDecoration: 'none' }}>
            Nous contacter
          </a>
        </div>
      </motion.div>
    </section>
  )
}
