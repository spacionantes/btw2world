'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { TVoyage } from '@/lib/data'

const STATUS_LABELS = {
  ouvert: 'Ouvert',
  complet: 'Complet',
  bientot: 'Bientôt',
  passe: 'Passé',
}

const STATUS_COLORS = {
  ouvert: 'rgba(255,255,255,0.9)',
  complet: 'rgba(255,255,255,0.4)',
  bientot: 'rgba(255,255,255,0.6)',
  passe: 'rgba(255,255,255,0.3)',
}

interface VoyageCardProps {
  voyage: TVoyage
}

export default function VoyageCard({ voyage }: VoyageCardProps) {
  const date = new Date(voyage.departureDate).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <Link
      href={`/destinations/${voyage.slug}`}
      style={{ display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <Image
          src={voyage.coverImage}
          alt={`Expédition ${voyage.title}`}
          fill
          style={{ objectFit: 'cover', transition: 'transform 400ms ease' }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)',
          }}
        />
        {/* Status badge */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: STATUS_COLORS[voyage.status],
            border: `1px solid ${STATUS_COLORS[voyage.status]}`,
            padding: '3px 8px',
          }}
        >
          {STATUS_LABELS[voyage.status]}
        </span>

        {/* Card content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px 18px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '4px',
            }}
          >
            {voyage.continent}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--color-white)',
              marginBottom: '6px',
              lineHeight: 1.2,
            }}
          >
            {voyage.title}
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.65)',
                fontWeight: 300,
              }}
            >
              {date} · {voyage.duration}j
            </span>
            {voyage.spotsLeft > 0 && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.75)',
                  letterSpacing: '0.08em',
                }}
              >
                {voyage.spotsLeft}/{voyage.spotsTotal} places
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
