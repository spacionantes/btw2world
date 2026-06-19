import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import CandidatureForm from '@/components/voyage/CandidatureForm'

export const metadata: Metadata = {
  title: 'Candidater | BTW2WORLD',
  description: "Rejoindre une expédition BTW2WORLD — candidature en ligne",
}

export default function CandidaterPage() {
  return (
    <div style={{ background: '#354f3b', minHeight: '100dvh' }}>
      <PageHero
        image="/images/12.jpg"
        label="Candidater"
        title={"Rejoindre\nl'expédition"}
      />

      {/* ── FORMULAIRE + PHOTO ───────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', minHeight: '80vh' }} className="grid-2col-nosplit">

        {/* Formulaire */}
        <div style={{ padding: '64px', background: '#354f3b', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontFamily: "'Shippori Mincho B1',serif", fontWeight: 700, fontSize: '36px', fontStyle: 'italic', color: '#fff', marginBottom: '40px' }}>
            Votre dossier de candidature
          </p>
          <CandidatureForm />
        </div>

        {/* Photo + ambiance */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image src="/images/12.jpg" alt="Expédition BTW2WORLD" fill sizes="40vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,46,34,0.3), rgba(30,46,34,0.7))' }} />

          {/* Citation en overlay */}
          <div style={{ position: 'absolute', bottom: '48px', left: '40px', right: '40px' }}>
            <p style={{ fontFamily: "'Shippori Mincho B1', serif", fontStyle: 'italic', fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: '16px' }}>
              &ldquo;Le bonheur est la seule chose qui se double quand on le partage.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
