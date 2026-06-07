'use client'

interface ScrollHintProps {
  targetId: string
}

export default function ScrollHint({ targetId }: ScrollHintProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'absolute',
        bottom: '32px',
        left: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.55)',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
      }}
    >
      <div
        style={{
          width: '1px',
          height: '32px',
          background: 'rgba(255,255,255,0.35)',
        }}
      />
      Défiler
    </button>
  )
}
