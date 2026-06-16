'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const J = "'Jost', sans-serif"
const C = "'Shippori Mincho B1', serif"
const BGDARK = '#354f3b'
const ACCENT = '#f6b74d'

const LINKS = [
  { href: '/', label: 'Le projet' },
  { href: '/concept',     label: 'Le concept' },
  { href: '/destinations',label: 'Expéditions' },
  { href: '/galerie',     label: 'Galerie' },
  { href: '/candidater',  label: 'Candidater' },
]

const SOCIALS = [
  { href: 'https://www.instagram.com/btw2world?igsh=ZnNtYXBqd3Qycm1i', icon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  )},
  { href: 'https://www.youtube.com/@btw2wrld', icon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  )},
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isActive = (href: string) => pathname === href

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 40px',
        height: '70px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(13,26,16,0.97)' : 'rgba(13,26,16,0.55)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.04)',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
          <Image src="/images/logo.png" alt="BTW2WORLD" width={72} height={72}
            style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
        </Link>

        {/* Liens centre — desktop */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="hidden md:flex">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href}
              style={{
                fontFamily: J, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: isActive(l.href) ? '#fff' : 'rgba(255,255,255,0.65)',
                textDecoration: 'none', fontWeight: 400,
                borderBottom: isActive(l.href) ? '1px solid rgba(255,255,255,0.6)' : '1px solid transparent',
                paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s',
              }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Droite : icônes sociales + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
          {SOCIALS.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              className="hidden md:flex"
              style={{ color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
              {s.icon}
            </a>
          ))}

          {/* Séparateur */}
          <div className="hidden md:block" style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.15)' }} />

          {/* Hamburger */}
          <button onClick={() => setOpen(true)} aria-label="Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ width: '22px', height: '1px', background: 'rgba(255,255,255,0.8)' }} />
            <div style={{ width: '15px', height: '1px', background: 'rgba(255,255,255,0.8)' }} />
            <div style={{ width: '22px', height: '1px', background: 'rgba(255,255,255,0.8)' }} />
          </button>
        </div>
      </nav>

      {/* Overlay menu plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: BGDARK, zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '36px' }}>
            <button onClick={() => setOpen(false)}
              style={{ position: 'absolute', top: '24px', right: '28px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '28px', lineHeight: 1 }}>×</button>
            {LINKS.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link href={l.href} onClick={() => setOpen(false)}
                  style={{ fontFamily: C, fontSize: 'clamp(28px, 5vw, 48px)', fontStyle: 'italic', fontWeight: 300, color: isActive(l.href) ? ACCENT : '#fff', textDecoration: 'none', display: 'block' }}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.35)', display: 'flex' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
