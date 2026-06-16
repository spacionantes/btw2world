import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: '#354f3b',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '40px 56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '24px',
    }}>
      <span style={{
        fontFamily: "'Jost',sans-serif",
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.25)',
      }}>
        © {new Date().getFullYear()} BTW2WORLD
      </span>

      <nav style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        {[
          { href: '/qui-suis-je', label: 'Le projet' },
          { href: '/concept', label: 'Le concept' },
          { href: '/destinations', label: 'Expéditions' },
          { href: '/galerie', label: 'Galerie' },
          { href: '/candidater', label: 'Candidater' },
        ].map(link => (
          <Link key={link.href} href={link.href} style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
          }}>
            {link.label}
          </Link>
        ))}
      </nav>

      <a href="mailto:contact@btw2world.com" style={{
        fontFamily: "'Jost',sans-serif",
        fontSize: '10px',
        letterSpacing: '0.08em',
        color: '#f6b74d',
        textDecoration: 'none',
        opacity: 0.75,
      }}>
        contact@btw2world.com
      </a>
    </footer>
  )
}
