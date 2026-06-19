'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import type { TVoyage } from '@/lib/data'

const J = "'Jost', sans-serif"
const C = "'Shippori Mincho B1', serif"
const M = "'DM Mono', monospace"

const BGDARK = '#354f3b'
const BGMID  = '#354f3b'
const BG     = '#354f3b'
const ACCENT = '#f6b74d'

const STATUS_LABELS: Record<string, string> = {
  ouvert: 'Ouvert',
  complet: 'Complet',
  bientot: 'À venir',
  passe: 'Réalisé',
}

export default function VoyageDetail({ voyage }: { voyage: TVoyage }) {
  const [playing, setPlaying] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <div style={{ background: BGDARK, minHeight: '100dvh' }}>

      {/* ── Hero plein écran ─────────────────────── */}
      <div style={{ height: '95dvh', position: 'relative', overflow: 'hidden' }}>
        <Image src={voyage.coverImage} alt={voyage.title} fill sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,20,14,0.2) 0%, rgba(10,20,14,0.1) 40%, rgba(10,20,14,0.92) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Nav />

          {/* Contenu bas hero */}
          <div style={{ marginTop: 'auto', padding: '0 72px 64px' }}>
            {/* Tags */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {voyage.tags?.map(t => (
                <span key={t} style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', border: `1px solid rgba(246,183,77,0.4)`, color: ACCENT, padding: '5px 14px' }}>{t}</span>
              ))}
            </motion.div>

            {/* Titre */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: C, fontSize: 'clamp(48px, 7vw, 104px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.88, marginBottom: '24px', letterSpacing: '-0.02em' }}>
              {voyage.title}
            </motion.h1>

            {/* Meta */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
              style={{ display: 'flex', gap: '28px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.45)' }}>
                {voyage.continent}
              </span>
              <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.45)' }}>
                {voyage.duration} jours
              </span>
              <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.28em', color: voyage.status === 'ouvert' ? ACCENT : 'rgba(255,255,255,0.45)', background: voyage.status === 'ouvert' ? 'rgba(246,183,77,0.12)' : 'transparent', padding: voyage.status === 'ouvert' ? '4px 12px' : '0' }}>
                {voyage.status === 'ouvert' ? `${voyage.spotsLeft} place${voyage.spotsLeft > 1 ? 's' : ''} disponible${voyage.spotsLeft > 1 ? 's' : ''}` : STATUS_LABELS[voyage.status]}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Corps ───────────────────────────────── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 72px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '80px', alignItems: 'start' }}>

        {/* Gauche — texte + galerie + vidéo */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>

          {/* Description longue */}
          {voyage.longDescription ? (
            voyage.longDescription.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontFamily: J, fontSize: '17px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 2, marginBottom: '24px', maxWidth: '640px' }}>
                {para}
              </p>
            ))
          ) : (
            <p style={{ fontFamily: J, fontSize: '17px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 2, maxWidth: '640px' }}>
              {voyage.description}
            </p>
          )}

          {/* Séparateur */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '56px 0' }} />

          {/* Vidéo */}
          {voyage.videoUrl && (
            <div style={{ marginBottom: '64px' }}>
              <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: ACCENT, marginBottom: '20px' }}>
                Le film du voyage
              </p>
              <div style={{ position: 'relative', aspectRatio: '16/9', background: BGMID, overflow: 'hidden', border: '1px solid rgba(246,183,77,0.15)' }}>
                {!playing ? (
                  <div onClick={() => setPlaying(true)}
                    style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', cursor: 'pointer' }}>
                    <Image src={voyage.coverImage} alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.3 }} />
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}
                      style={{ position: 'relative', zIndex: 2, width: '72px', height: '72px', border: `2px solid ${ACCENT}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="22" height="22" viewBox="0 0 20 20"><path d="M7 4L17 10L7 16V4Z" fill={ACCENT} /></svg>
                    </motion.div>
                    <span style={{ position: 'relative', zIndex: 2, fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.45)' }}>Voir le film</span>
                  </div>
                ) : (
                  <iframe src={`${voyage.videoUrl}?autoplay=1`} allow="autoplay; fullscreen"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
                )}
              </div>
            </div>
          )}

          {/* Galerie photos */}
          {voyage.gallery && voyage.gallery.length > 0 && (
            <div style={{ marginBottom: '64px' }}>
              <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: ACCENT, marginBottom: '28px' }}>
                Galerie
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                {voyage.gallery.map((src, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                    onClick={() => setLightbox(src)}
                    style={{ position: 'relative', aspectRatio: i === 0 ? '16/9' : '4/3', overflow: 'hidden', cursor: 'zoom-in', gridColumn: i === 0 ? '1 / -1' : 'auto' }}>
                    <Image src={src} alt={`Photo ${i + 1}`} fill sizes={i === 0 ? '100vw' : '50vw'}
                      style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Sidebar sticky */}
        <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          style={{ position: 'sticky', top: '32px' }}>

          {/* Infos pratiques */}
          <div style={{ background: BGMID, border: '1px solid rgba(255,255,255,0.07)', padding: '32px', marginBottom: '10px' }}>
            <p style={{ fontFamily: M, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.25)', marginBottom: '24px' }}>
              Infos pratiques
            </p>
            {[
              { l: 'Durée', v: `${voyage.duration} jours` },
              { l: 'Groupe', v: `${voyage.spotsTotal} pers.` },
              { l: 'Statut', v: voyage.status === 'ouvert' ? `${voyage.spotsLeft} place${voyage.spotsLeft > 1 ? 's' : ''}` : STATUS_LABELS[voyage.status] },
              { l: 'Départ', v: new Date(voyage.departureDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) },
            ].map((row, i, arr) => (
              <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '13px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <span style={{ fontFamily: M, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)' }}>{row.l}</span>
                <span style={{ fontFamily: C, fontSize: '17px', fontStyle: 'italic', color: '#fff' }}>{row.v}</span>
              </div>
            ))}

            {voyage.status === 'ouvert' && (
              <Link href="/candidater"
                style={{ display: 'block', marginTop: '28px', fontFamily: J, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.22em', background: ACCENT, color: BGDARK, padding: '16px 0', textAlign: 'center', textDecoration: 'none', fontWeight: 600 }}>
                Je candidate →
              </Link>
            )}
          </div>

          {/* Lien blog */}
          {voyage.blogUrl && voyage.blogUrl !== '#' && (
            <div style={{ background: BG, border: '1px solid rgba(255,255,255,0.06)', padding: '24px', marginBottom: '10px' }}>
              <p style={{ fontFamily: C, fontSize: '16px', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', marginBottom: '14px', lineHeight: 1.6 }}>
                Le récit complet de cette expédition est sur le blog.
              </p>
              <a href={voyage.blogUrl}
                style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: ACCENT, textDecoration: 'none', borderBottom: `1px solid ${ACCENT}`, paddingBottom: '2px' }}>
                Lire le récit →
              </a>
            </div>
          )}

          {/* Retour */}
          <Link href="/"
            style={{ fontFamily: M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', display: 'block', marginTop: '8px' }}>
            ← Retour à l&apos;accueil
          </Link>
        </motion.aside>
      </div>

      {/* ── Lightbox ─────────────────────────────── */}
      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '40px' }}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%' }}>
            <Image src={lightbox} alt="Photo" fill style={{ objectFit: 'contain' }} sizes="90vw" />
          </div>
          <button onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: '24px', right: '32px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '32px', cursor: 'pointer', fontFamily: J }}>
            ×
          </button>
        </motion.div>
      )}
    </div>
  )
}
