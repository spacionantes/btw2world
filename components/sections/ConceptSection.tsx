'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const J = "'Jost', sans-serif"
const C = "'Cormorant Garamond', serif"
const M = "'DM Mono', monospace"

const STEPS = [
  { num: '01', title: 'Vous candidatez', body: "Formulaire en ligne. Je lis chaque candidature personnellement — pas d'algorithme." },
  { num: '02', title: 'Je compose le groupe', body: "2 à 6 profils sélectionnés pour leur complémentarité. L'équilibre humain compte autant que la destination." },
  { num: '03', title: 'Destination J-7', body: 'Sept jours avant le départ, les retenus reçoivent la destination. Pas une heure avant.' },
  { num: '04', title: 'On part. Ensemble.', body: "Terrain, logistique, sécurité, photo — je gère tout. Vous apportez l'ouverture d'esprit." },
]

export default function ConceptSection() {
  return (
    <section style={{ background: '#2d4433' }} className="section-pad">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '80px', flexWrap: 'wrap', gap: '32px' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p style={{ fontFamily: M, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#f6b74d', marginBottom: '20px' }}>02 — Le concept</p>
            <h2 style={{ fontFamily: C, fontSize: 'clamp(48px, 5vw, 80px)', fontWeight: 300, fontStyle: 'italic', color: '#ffffff', lineHeight: 0.92 }}>L&apos;Entre 2 Mondes</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
            style={{ fontFamily: C, fontSize: '20px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: '360px', lineHeight: 1.7 }}>
            Pas de destination connue avant le départ. L&apos;aventure commence quand on lâche prise.
          </motion.p>
        </div>
        <div className="grid-4col" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {STEPS.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: '52px 32px 52px 0', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', paddingLeft: i > 0 ? '32px' : '0' }}>
              <div style={{ fontFamily: C, fontSize: '80px', fontStyle: 'italic', fontWeight: 300, color: '#f6b74d', opacity: 0.55, lineHeight: 1, marginBottom: '24px' }}>{step.num}</div>
              <h3 style={{ fontFamily: C, fontSize: '24px', fontWeight: 500, color: '#ffffff', marginBottom: '14px', lineHeight: 1.2 }}>{step.title}</h3>
              <p style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.85 }}>{step.body}</p>
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: '60px' }}>
          <Link href="/concept" style={{ fontFamily: J, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#f6b74d', textDecoration: 'none', borderBottom: '1px solid rgba(246,183,77,0.4)', paddingBottom: '4px' }}>
            Découvrir le concept →
          </Link>
        </div>
      </div>
    </section>
  )
}
