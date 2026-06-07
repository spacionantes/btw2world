'use client'

interface GlassCardProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export default function GlassCard({ title, children, className = '' }: GlassCardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.18)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '28px 32px',
      }}
    >
      {title && (
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            color: 'var(--color-white)',
            marginBottom: '14px',
          }}
        >
          {title}
        </p>
      )}
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 300,
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </div>
  )
}
