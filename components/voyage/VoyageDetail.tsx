'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import type { TVoyage } from '@/lib/data'

const STATUS_LABELS: Record<string, string> = {
  ouvert: 'Ouvert',
  complet: 'Complet',
  bientot: 'Bientôt',
  passe: 'Passé',
}

const F = "'Jost',sans-serif"
const D = "'Cormorant Garamond',serif"
const C = "'Jost',sans-serif"

export default function VoyageDetail({ voyage }: { voyage: TVoyage }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div style={{ background: '#426248', minHeight: '100dvh' }}>

      {/* Hero */}
      <div style={{ height: '80dvh', position: 'relative', overflow: 'hidden' }}>
        <Image src={voyage.coverImage} alt={voyage.title} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(30,46,34,0.15),rgba(30,46,34,0.88))', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Nav />
          <div style={{ marginTop: 'auto', padding: '0 56px 64px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {voyage.tags?.map(t => (
                <span key={t} style={{ fontFamily: F, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, border: '1px solid rgba(246,183,77,0.4)', color: '#f6b74d', padding: '4px 12px' }}>{t}</span>
              ))}
            </div>
            <h1 style={{ fontFamily: D, fontSize: 'clamp(48px,7vw,92px)', fontWeight: 400, color: '#fff', lineHeight: 0.95, marginBottom: '20px' }}>{voyage.title}</h1>
            <p style={{ fontFamily: F, fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>
              {voyage.continent} · {voyage.duration} jours
              {voyage.status === 'ouvert' ? ` · ${voyage.spotsLeft} place${voyage.spotsLeft > 1 ? 's' : ''} dispo` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '72px 56px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '72px' }} className="max-md:grid-cols-1">

        {/* Gauche : texte + vidéo + galerie */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

          {voyage.longDescription?.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontFamily: C, fontSize: '21px', fontWeight: 300, color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, marginBottom: '24px' }}>{para}</p>
          ))}

          {/* Vidéo */}
          {voyage.videoUrl && (
            <div style={{ marginTop: '48px' }}>
              <p style={{ fontFamily: F, fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.3em', color: '#f6b74d', marginBottom: '16px' }}>Le film du voyage</p>
              <div style={{ position: 'relative', aspectRatio: '16/9' as const, background: '#1e2e22', border: '1px solid rgba(246,183,77,0.2)', overflow: 'hidden' }}>
                {!playing ? (
                  <div onClick={() => setPlaying(true)} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: '14px', cursor: 'pointer' }}>
                    <Image src={voyage.coverImage} alt="" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.4 }} />
                    <motion.div whileHover={{ scale: 1.1 }} style={{ position: 'relative', zIndex: 2, width: '68px', height: '68px', border: '2px solid #f6b74d', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M7 4L17 10L7 16V4Z" fill="#f6b74d" /></svg>
                    </motion.div>
                    <span style={{ position: 'relative', zIndex: 2, fontFamily: F, fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}>Voir le film</span>
                  </div>
                ) : (
                  <iframe
                    src={`${voyage.videoUrl}?autoplay=1`}
                    allow="autoplay; fullscreen"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Galerie */}
          {voyage.gallery && voyage.gallery.length > 0 && (
            <div style={{ marginTop: '48px' }}>
              <p style={{ fontFamily: F, fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.3em', color: '#f6b74d', marginBottom: '16px' }}>Galerie</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {voyage.gallery.map((src, i) => (
                  <div key={i} style={{ position: 'relative', aspectRatio: '4/3' as const, overflow: 'hidden' }}>
                    <Image src={src} alt={`Photo ${i + 1}`} fill sizes="50vw" style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ position: 'sticky', top: '32px', alignSelf: 'start' }}>
          <div style={{ background: '#2d4433', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', marginBottom: '12px' }}>
            <p style={{ fontFamily: F, fontSize: '9px', textTransform: 'uppercase' as const, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>Infos pratiques</p>
            {[
              { l: 'Durée', v: `${voyage.duration} jours` },
              { l: 'Groupe', v: `${voyage.spotsTotal} pers. max` },
              { l: 'Statut', v: voyage.status === 'ouvert' ? `${voyage.spotsLeft} place${voyage.spotsLeft > 1 ? 's' : ''}` : STATUS_LABELS[voyage.status] },
            ].map(row => (
              <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontFamily: F, fontSize: '9px', textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}>{row.l}</span>
                <span style={{ fontFamily: C, fontSize: '16px', color: '#fff' }}>{row.v}</span>
              </div>
            ))}
            <Link href="/candidater" style={{ display: 'block', marginTop: '24px', fontFamily: F, fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.2em', background: '#f6b74d', color: '#1e2e22', padding: '14px 0', textAlign: 'center' as const, textDecoration: 'none', fontWeight: 600 }}>
              Je candidate
            </Link>
          </div>

          {voyage.blogUrl && voyage.blogUrl !== '#' && (
            <div style={{ background: '#1e2e22', border: '1px solid rgba(246,183,77,0.15)', padding: '20px', marginBottom: '12px' }}>
              <p style={{ fontFamily: C, fontSize: '16px', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', marginBottom: '12px', lineHeight: 1.6 }}>Récit complet sur le blog.</p>
              <a href={voyage.blogUrl} style={{ fontFamily: F, fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.18em', color: '#f6b74d', textDecoration: 'none', borderBottom: '1px solid #f6b74d', paddingBottom: '2px' }}>Lire le récit →</a>
            </div>
          )}

          <Link href="/destinations" style={{ fontFamily: F, fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', display: 'block' }}>
            ← Toutes les expéditions
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
