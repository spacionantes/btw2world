'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '@/components/layout/PageHero'
import { VOYAGES, type TVoyage } from '@/lib/data'

const J = "'Jost', sans-serif"
const C = "'Cormorant Garamond', serif"
const M = "'DM Mono', monospace"

const STATUS_CONF: Record<string, { txt: string; color: string; bg: string }> = {
  ouvert:  { txt: 'Disponible',  color: '#1e2e22',              bg: '#f6b74d' },
  complet: { txt: 'Complet',     color: 'rgba(255,255,255,0.5)', bg: 'rgba(255,255,255,0.08)' },
  bientot: { txt: 'Bientôt',     color: '#f6b74d',               bg: 'rgba(246,183,77,0.12)' },
  passe:   { txt: 'Passé',       color: 'rgba(255,255,255,0.3)', bg: 'rgba(255,255,255,0.05)' },
}

function VoyageCard({ v, idx }: { v: TVoyage; idx: number }) {
  const [hov, setHov] = useState(false)
  const sc = STATUS_CONF[v.status]

  return (
    <Link href={`/destinations/${v.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.article
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', height: '80vh', overflow: 'hidden', marginBottom: '3px', background: '#2d4433', cursor: 'pointer' }}
      >
        <Image
          src={v.coverImage} alt={v.title} fill
          sizes="100vw" loading={idx === 0 ? 'eager' : 'lazy'}
          style={{
            objectFit: 'cover',
            transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: hov
            ? 'linear-gradient(180deg, rgba(10,22,16,0.25) 0%, rgba(10,22,16,0.88) 100%)'
            : 'linear-gradient(180deg, rgba(10,22,16,0.1) 0%, rgba(10,22,16,0.72) 100%)',
          transition: 'background 0.7s ease',
        }} />

        {/* Numéro translucide */}
        <div style={{ position: 'absolute', top: '40px', left: '56px', fontFamily: C, fontSize: '100px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
          {String(idx + 1).padStart(2, '0')}
        </div>

        {/* Status haut-droite */}
        <div style={{ position: 'absolute', top: '40px', right: '56px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)' }}>{v.continent}</span>
          <span style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', background: sc.bg, color: sc.color, padding: '5px 14px' }}>
            {v.status === 'ouvert' ? `${v.spotsLeft} places` : sc.txt}
          </span>
        </div>

        {/* Contenu bas */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 56px 56px' }}>
          {v.tags && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {v.tags.map(t => (
                <span key={t} style={{ fontFamily: M, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.18em', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.4)', padding: '4px 10px' }}>{t}</span>
              ))}
            </div>
          )}
          <h2 style={{ fontFamily: C, fontSize: 'clamp(56px, 8vw, 120px)', fontWeight: 300, fontStyle: 'italic', color: '#ffffff', lineHeight: 0.9, letterSpacing: '-0.015em', marginBottom: '20px' }}>
            {v.country}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <p style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.58)', lineHeight: 1.7, maxWidth: '500px' }}>{v.description}</p>
              <p style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)', marginTop: '12px' }}>
                {v.duration} jours · {new Date(v.departureDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <motion.div animate={{ x: hov ? 0 : -10, opacity: hov ? 1 : 0 }} transition={{ duration: 0.3 }}
              style={{ fontFamily: J, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#f6b74d', border: '1px solid rgba(246,183,77,0.5)', padding: '12px 28px', whiteSpace: 'nowrap' }}>
              {v.status === 'passe' ? 'Voir le récit' : "Voir l'expédition"} →
            </motion.div>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

export default function DestinationsPage() {
  const [filter, setFilter] = useState<'all' | 'ouvert' | 'passe'>('all')
  const shown = VOYAGES.filter(v => {
    if (filter === 'all') return true
    if (filter === 'ouvert') return v.status === 'ouvert' || v.status === 'bientot'
    return v.status === 'passe'
  })

  return (
    <div style={{ background: '#1e2e22', minHeight: '100dvh' }}>
      <PageHero
        image="/images/15.jpg"
        label="Les expéditions"
        title={"Terres\nexplorées"}
        subtitle="Kirghizistan · Népal · Namibie — et la prochaine que vous ne connaissez pas encore"
      />

      {/* Filtres */}
      <div style={{ padding: '48px 56px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {([['all', 'Toutes'], ['ouvert', 'Ouvertes'], ['passe', 'Passées']] as [string, string][]).map(([k, lbl]) => (
            <button key={k} onClick={() => setFilter(k as typeof filter)}
              style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', border: `1px solid ${filter === k ? '#f6b74d' : 'rgba(255,255,255,0.14)'}`, color: filter === k ? '#f6b74d' : 'rgba(255,255,255,0.38)', background: 'none', cursor: 'pointer', padding: '8px 18px', transition: 'all 0.2s' }}>
              {lbl}
            </button>
          ))}
        </div>
        <span style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase' }}>
          {shown.length} expédition{shown.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Liste voyages — pleine hauteur */}
      <div style={{ padding: '3px 0' }}>
        <AnimatePresence mode="wait">
          {shown.length > 0 ? shown.map((v, i) => <VoyageCard key={v.id} v={v} idx={i} />) : (
            <div style={{ padding: '120px 56px', textAlign: 'center' }}>
              <p style={{ fontFamily: C, fontSize: '32px', fontStyle: 'italic', color: 'rgba(255,255,255,0.3)' }}>Aucune expédition dans cette catégorie.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Pied */}
      <div style={{ padding: '80px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div>
          <p style={{ fontFamily: C, fontSize: '28px', fontStyle: 'italic', fontWeight: 300, color: '#ffffff', marginBottom: '8px' }}>Une idée en tête ?</p>
          <p style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.38)' }}>La prochaine destination vous attend.</p>
        </div>
        <Link href="/candidater" style={{ fontFamily: J, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', background: '#f6b74d', color: '#1e2e22', padding: '16px 44px', textDecoration: 'none', fontWeight: 500 }}>
          Candidater →
        </Link>
      </div>
    </div>
  )
}
