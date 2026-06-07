'use client'

interface SectionLabelProps {
  number: string
  label: string
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.25em',
        color: 'rgba(255,255,255,0.45)',
        marginBottom: '16px',
      }}
    >
      {number} — {label}
    </p>
  )
}
