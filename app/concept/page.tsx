import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Le concept | BTW2WORLD',
  description: "Partir à l'aveugle — destination révélée J-7 avant le départ",
}

const ETAPES = [
  { num: '01', titre: 'Vous candidatez', corps: 'Formulaire en ligne. Je lis chaque candidature personnellement. Motivations, expérience voyage, contraintes spécifiques. Pas d\'algorithme.', image: '/images/kyrg-famille.jpg' },
  { num: '02', titre: 'Je compose le groupe', corps: '2 à 6 profils sélectionnés pour leur complémentarité. L\'équilibre humain est aussi important que la destination. Chaque profil enrichit le groupe.', image: '/images/14.jpg' },
  { num: '03', titre: 'Révélation à J-7', corps: 'Sept jours avant le départ, les retenus reçoivent la destination. Pas avant. Ce délai est calculé pour préparer le nécessaire sans avoir le temps de trop y penser.', image: '/images/12.jpg' },
  { num: '04', titre: 'On part. Ensemble.', corps: 'Terrain, logistique, sécurité, photo — je gère tout. Vous apportez l\'ouverture d\'esprit et la confiance. Le reste suit naturellement.', image: '/images/15.jpg' },
]

const FAQ = [
  { q: 'Et si je n\'ai pas d\'expérience en trek ?', r: 'Ce n\'est pas un critère éliminatoire. J\'adapte le niveau au groupe sélectionné. La motivation compte plus que le palmarès.' },
  { q: 'Que faut-il prévoir comme budget ?', r: 'Cela dépend de la destination révélée. Comptez entre 1500€ et 3500€ tout compris selon la durée et la région du monde.' },
  { q: 'On peut y aller en couple ou entre amis ?', r: 'Oui, mais je sélectionne des profils indépendamment. Si vous candidatez à plusieurs, vos dossiers sont étudiés séparément.' },
  { q: 'Que se passe-t-il si je ne suis pas retenu ?', r: 'Vous êtes notifié par email avec un retour personnalisé. Vous pouvez recandidater pour les prochaines expéditions.' },
]

export default function ConceptPage() {
  return (
    <div style={{ background: '#426248', minHeight: '100dvh' }}>
      <PageHero
        image="/images/14.jpg"
        label="Le concept"
        title={"L'Entre\n2 Mondes"}
        subtitle="La destination révélée 7 jours avant le départ"
      />

      {/* ── PHOTO LARGE — randonneur face aux montagnes ── */}
      <div style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
        <Image src="/images/12.jpg" alt="Randonneur face à l'Himalaya" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,46,34,0.5) 0%, transparent 40%, rgba(30,46,34,0.7) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '48px', left: '64px' }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: '48px', color: '#fff', textTransform: 'uppercase', lineHeight: 1 }}>Himalaya, Népal</p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em' }}>Expédition 2024 — Thorong-La 5416m</p>
        </div>
      </div>

      {/* ── ÉTAPES — alternées gauche/droite ─────────── */}
      <div style={{ background: '#426248' }}>
        {ETAPES.map((e, i) => (
          <div key={e.num} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', minHeight: '420px', direction: i % 2 === 0 ? 'ltr' : 'rtl' }} className="grid-2col-nosplit">
            {/* Texte */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px', background: i % 2 === 0 ? '#426248' : '#2d4433', direction: 'ltr' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 800, fontSize: '120px', color: 'rgba(246,183,77,0.1)', lineHeight: 1, marginBottom: '-32px' }}>{e.num}</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 'clamp(28px, 3vw, 48px)', textTransform: 'uppercase', color: '#fff', marginBottom: '20px' }}>{e.titre}</h2>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '17px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: '400px' }}>{e.corps}</p>
            </div>
            {/* Photo */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '380px', direction: 'ltr' }}>
              <Image src={e.image} alt={e.titre} fill sizes="50vw" style={{ objectFit: 'cover' }} loading="lazy" />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,46,34,0.2)' }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── POURQUOI L'AVEUGLE ───────────────────────── */}
      <div style={{ background: '#1e2e22', padding: '96px 64px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#f6b74d', marginBottom: '32px' }}>Pourquoi à l&apos;aveugle ?</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', color: '#fff', textTransform: 'uppercase', marginBottom: '40px', lineHeight: 0.9 }}>
            Parce que savoir à l&apos;avance tue<br />la moitié du voyage
          </h2>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, marginBottom: '24px' }}>
            Quand vous connaissez la destination, vous cherchez des photos, lisez des avis, construisez des attentes. Vous arrivez avec un film déjà en tête.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            &ldquo;Partir à l&apos;aveugle, c&apos;est s&apos;autoriser à être surpris. C&apos;est retrouver ce que le voyage était avant internet.&rdquo;
          </p>
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────── */}
      <div style={{ background: '#426248', padding: '96px 64px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#f6b74d', marginBottom: '16px' }}>Questions fréquentes</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 'clamp(36px, 4vw, 64px)', color: '#fff', textTransform: 'uppercase', marginBottom: '64px' }}>Ce que vous vous demandez</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {FAQ.map((f, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.12)', padding: '32px 0' }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: '22px', color: '#fff', marginBottom: '12px' }}>{f.q}</p>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>{f.r}</p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }} />
          </div>
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────── */}
      <div style={{ background: '#2d4433', padding: '80px 64px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 800, fontSize: 'clamp(48px, 6vw, 96px)', color: '#fff', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '32px' }}>
          Prêt pour<br /><span style={{ color: '#f6b74d' }}>l&apos;inconnu ?</span>
        </h2>
        <Link href="/candidater" style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', background: '#f6b74d', color: '#1e2e22', padding: '18px 56px', textDecoration: 'none', display: 'inline-block' }}>
          Candidater maintenant
        </Link>
      </div>
    </div>
  )
}
