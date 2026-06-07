'use client'

import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 's-0', label: 'Hero' },
  { id: 's-1', label: 'Qui suis-je' },
  { id: 's-2', label: 'Le concept' },
  { id: 's-3', label: 'Destinations' },
  { id: 's-4', label: 'Candidater' },
]

export default function DotsNav() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((section, index) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index)
        },
        { threshold: 0.5 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      {SECTIONS.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          aria-label={`Aller à ${section.label}`}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            background:
              index === activeIndex
                ? 'rgba(255,255,255,0.95)'
                : 'rgba(255,255,255,0.35)',
            transform: index === activeIndex ? 'scale(1.4)' : 'scale(1)',
            transition: 'all 200ms ease',
          }}
        />
      ))}
    </div>
  )
}
