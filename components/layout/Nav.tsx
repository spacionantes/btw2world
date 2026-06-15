'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BGDARK = '#0d1a10'
const ACCENT = '#f6b74d'

const LINKS = [
  { href: '/qui-suis-je', label: 'Le projet' },
  { href: '/concept',     label: 'Le concept' },
  { href: '/destinations',label: 'Expéditions' },
  { href: '/galerie',     label: 'Galerie' },
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
        padding: '22px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(13,26,16,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Image src="/images/logo.png" alt="BTW2WORLD" width={34} height={34}
            style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
        </Link>

        {/* Liens centre — desktop */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }} className="hidden md:flex">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href}
              style={{
                fontFamily: J, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase',
                color: isActive(l.href) ? '#fff' : 'rgba(255,255,255,0.6)',
                textDecoration: 'none', fontWeight: 400,
                borderBottom: isActive(l.href) ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
                paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s',
              }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA droite + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/candidater" className="hidden md:block"
            style={{
              fontFamily: J, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
              background: ACCENT, color: BGDARK, padding: '10px 22px',
              textDecoration: 'none', fontWeight: 600,
            }}>
            Candidater ↗
          </Link>

          <button className="md:hidden" onClick={() => setOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.75)' }} />)}
            </div>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: BGDARK, zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
            <button onClick={() => setOpen(false)}
              style={{ position: 'absolute', top: '24px', right: '28px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', fontSize: '28px' }}>×</button>
            {[...LINKS, { href: '/candidater', label: 'Candidater' }].map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link href={l.href} onClick={() => setOpen(false)}
                  style={{ fontFamily: C, fontSize: '36px', fontStyle: 'italic', fontWeight: 300, color: '#fff', textDecoration: 'none', display: 'block' }}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
