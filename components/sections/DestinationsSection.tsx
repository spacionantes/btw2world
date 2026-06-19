'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { VOYAGES } from '@/lib/data'

const J = "'Jost', sans-serif"
const C = "'Cormorant Garamond', serif"
const M = "'DM Mono', monospace"

const STATUS_LABEL: Record<string, string> = {
  ouvert: 'Places disponibles', complet: 'Complet', bientot: 'Bientôt', passe: 'Passé',
}

export default function DestinationsSection() {
  const shown = VOYAGES.filter(v => v.status !== 'passe').slice(0, 3)
  return (
    <section style={{ background: '#354f3b' }} className="section-pad">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '72px', flexWrap: 'wrap', gap: '24px' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p style={{ fontFamily: M, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#f6b74d', marginBottom: '20px' }}>03 Expéditions</p>
            <h2 style={{ fontFamily: C, fontSize: 'clamp(48px, 5vw, 80px)', fontWeight: 300, fontStyle: 'italic', color: '#ffffff', lineHeight: 0.92 }}>
              Partout où<br />il y a du vide
            </h2>
          </motion.div>
          <Link href="/destinations" style={{ fontFamily: J, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#f6b74d', textDecoration: 'none', borderBottom: '1px solid rgba(246,183,77,0.4)', paddingBottom: '4px', alignSelf: 'flex-end', flexShrink: 0 }}>
            Toutes les expéditions →
          </Link>
        </div>
        <div className="grid-3col">
          {shown.map((voyage, i) => (
            <motion.div key={voyage.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }} style={{ cursor: 'pointer' }}>
              <Link href={`/destinations/${voyage.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                {/* Image */}
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', marginBottom: '20px' }}>
                  <Image src={voyage.coverImage} alt={voyage.title} fill sizes="33vw" loading={i === 0 ? 'eager' : 'lazy'}
                    style={{ objectFit: 'cover', transition: 'transform 0.8s ease' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(30,46,34,0.85) 100%)' }} />
                  {/* Status */}
                  <div style={{ position: 'absolute', top: '20px', left: '20px', fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', background: voyage.status === 'ouvert' ? '#f6b74d' : 'rgba(0,0,0,0.45)', color: voyage.status === 'ouvert' ? '#354f3b' : 'rgba(255,255,255,0.6)', padding: '5px 12px', fontWeight: 500 }}>
                    {voyage.status === 'ouvert' ? `${voyage.spotsLeft} places` : STATUS_LABEL[voyage.status]}
                  </div>
                  {/* Country big italic */}
                  <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
                    <p style={{ fontFamily: C, fontSize: 'clamp(32px, 3.5vw, 52px)', fontStyle: 'italic', fontWeight: 300, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.01em' }}>
                      {voyage.country}
                    </p>
                  </div>
                </div>
                {/* Text */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>{voyage.continent} · {voyage.duration}j</p>
                    <p style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, maxWidth: '260px' }}>{voyage.description}</p>
                  </div>
                  <span style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', color: '#f6b74d', flexShrink: 0, marginTop: '-2px' }}>→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
