'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"

const LINKS = [
  { href: '#le-projet',    label: 'Le projet' },
  { href: '#le-concept',   label: 'Le concept' },
  { href: '#expeditions',  label: 'Expéditions' },
  { href: '#galerie',      label: 'Galerie' },
  { href: '#contact',      label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    if (!isHome) {
      router.push(`/${id}`)
      return
    }
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '22px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(30,46,34,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <button onClick={() => scrollTo('#hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image src="/images/logo.png" alt="BTW2WORLD" width={34} height={34}
            style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
        </button>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }} className="hidden md:flex">
          {LINKS.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              style={{ fontFamily: J, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 400 }}>
              {l.label}
            </button>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {[0,1,2].map(i => <div key={i} style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.75)' }} />)}
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: '#1e2e22', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
            <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: '24px', right: '28px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', fontSize: '28px' }}>×</button>
            {LINKS.map((l, i) => (
              <motion.button key={l.href} onClick={() => scrollTo(l.href)}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                style={{ fontFamily: C, fontSize: '36px', fontStyle: 'italic', fontWeight: 300, color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
