'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  bgImage: string
  overlayOpacity?: number
  children: React.ReactNode
  id: string
  className?: string
  overlayGradient?: boolean
}

export default function ParallaxSection({
  bgImage,
  overlayOpacity = 0.5,
  children,
  id,
  className = '',
  overlayGradient = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div id={id} ref={ref} className={`snap-section ${className}`}>
      {/* Background parallax */}
      <motion.div
        style={{
          y,
          position: 'absolute',
          inset: '-15% 0',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: overlayGradient
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)'
            : `rgba(0,0,0,${overlayOpacity})`,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </div>
  )
}
