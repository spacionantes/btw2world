'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const J = "'Jost', sans-serif"
const C = "'Cormorant Garamond', serif"
const M = "'DM Mono', monospace"
const STATS = [
  { v: '6', l: 'Personnes max' },
  { v: 'J-7', l: 'Révélation' },
  { v: '100%', l: 'Sans agence' },
]

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] })
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const radius = useTransform(scrollYProgress, [0, 0.6, 1], ['24px 24px 0 0', '8px 8px 0 0', '0px'])
  return (
    <div ref={ref} style={{ marginTop: '-64px', position: 'relative', zIndex: 10 }}>
      <motion.section style={{ y, borderRadius: radius, background: '#426248', boxShadow: '0 -40px 120px rgba(0,0,0,0.55)' }}>
        <div className="grid-2col" style={{ minHeight: '90vh' }}>
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ padding: '96px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: M, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#f6b74d', marginBottom: '36px' }}>01 — Le guide</p>
            <h2 style={{ fontFamily: C, fontSize: 'clamp(52px, 5.5vw, 88px)', fontWeight: 300, fontStyle: 'italic', color: '#ffffff', lineHeight: 0.92, marginBottom: '40px' }}>
              Maxence,<br />l&apos;Explorateur
            </h2>
            <p style={{ fontFamily: J, fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.62)', lineHeight: 1.95, maxWidth: '420px', marginBottom: '16px' }}>
              Photographe et voyageur, je parcours le monde depuis des années à la recherche de paysages bruts et d&apos;instants vrais.
            </p>
            <p style={{ fontFamily: J, fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.62)', lineHeight: 1.95, maxWidth: '420px', marginBottom: '52px' }}>
              BTW2WORLD, c&apos;est l&apos;invitation à partager ces terres oubliées en petit groupe — sans agence, sans itinéraire figé.
            </p>
            <Link href="/qui-suis-je" style={{ fontFamily: J, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#f6b74d', textDecoration: 'none', borderBottom: '1px solid rgba(246,183,77,0.4)', paddingBottom: '4px', alignSelf: 'flex-start', marginBottom: '64px' }}>
              En savoir plus →
            </Link>
            <div style={{ display: 'flex', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {STATS.map(({ v, l }, i) => (
                <div key={l} style={{ flex: 1, paddingRight: i < 2 ? '28px' : '0', paddingLeft: i > 0 ? '28px' : '0', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <div style={{ fontFamily: C, fontSize: '48px', fontStyle: 'italic', fontWeight: 300, color: '#f6b74d', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', marginTop: '10px' }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1.2, delay: 0.15 }}
            style={{ position: 'relative', overflow: 'hidden', minHeight: '600px' }}>
            <Image src="/images/maxence.jpg" alt="Maxence" fill sizes="50vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(66,98,72,0.35) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', top: '32px', left: '32px', background: 'rgba(246,183,77,0.88)', color: '#1e2e22', fontFamily: J, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '7px 16px', fontWeight: 500 }}>
              Guide & Photographe
            </div>
            <div style={{ position: 'absolute', bottom: '48px', left: '40px', right: '40px', borderLeft: '2px solid rgba(246,183,77,0.5)', paddingLeft: '20px' }}>
              <p style={{ fontFamily: C, fontSize: '18px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                &ldquo;Je vous emmène où les cartes s&apos;arrêtent.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
