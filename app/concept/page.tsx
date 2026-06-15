import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/layout/Nav'

export const metadata: Metadata = {
  title: 'Le concept | BTW2WORLD',
  description: "Partir à l'aveugle — destination révélée J-7 avant le départ",
}

const J = "'Jost', sans-serif"
const C = "'Bodoni Moda', serif"
const M = "'DM Mono', monospace"
const BG     = '#1a2e1e'
const BGDARK = '#0d1a10'
const BGMID  = '#243429'
const ACCENT = '#f6b74d'

const ETAPES = [
  { num: '01', titre: 'Candidature', corps: 'Un formulaire, quelques lignes sur vous. Je lis chaque dossier personnellement — motivations, expérience voyage, contraintes spécifiques. Pas d\'algorithme.' },
  { num: '02', titre: 'Sélection', corps: 'Je compose le groupe avec soin. Les places sont limitées à 2 invités pour garantir une expérience intime et une vraie cohésion sur le terrain.' },
  { num: '03', titre: 'Organisation', corps: 'Je prends en charge l\'intégralité de la logistique : itinéraire, hébergements, transport, sécurité. Vous n\'avez qu\'à vous préparer à partir.' },
  { num: '04', titre: 'Départ à l\'aveugle', corps: 'La destination est révélée à J-7. Puis on part. Terrain, photo, film — je gère tout. Vous apportez l\'ouverture d\'esprit et la confiance.' },
]

const AVANTAGES = [
  { titre: 'Nouvelle destination', texte: 'Chaque expédition ouvre sur un territoire que vous n\'auriez peut-être jamais choisi seul. C\'est ça, l\'entre-deux-mondes.' },
  { titre: 'Effet de surprise total', texte: 'Pas d\'attentes construites, pas de film en tête à l\'arrivée. Juste la réalité du terrain, brute et entière.' },
  { titre: 'Équipe expérimentée', texte: 'Voyager avec quelqu\'un qui connaît les routes, les cultures et les imprévus. Aucune agence impliquée.' },
  { titre: 'Un film du voyage', texte: 'Chaque expédition donne lieu à un film complet — tourné et monté par Maxence. Un souvenir à la hauteur de l\'aventure.' },
]

export default function ConceptPage() {
  return (
    <div style={{ background: BG, minHeight: '100dvh' }}>
      {/* Hero — image avec texte intégré */}
      <div style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}>
        <Image src="/images/concept hero.png" alt="Le concept BTW2WORLD" fill sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.08)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Nav />
        </div>
      </div>

      {/* ── MODES ─────────────────────────────────── */}
      <div style={{ background: BGDARK, padding: '96px 72px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '16px' }}>
            Formule proposée
          </p>
          <h2 style={{ fontFamily: C, fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '64px' }}>
            Mode à l&apos;aveugle
          </h2>

          {/* Étapes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' }} className="grid-4col">
            {ETAPES.map((e, i) => (
              <div key={e.num} style={{ background: BGDARK, padding: '40px 36px' }}>
                <div style={{ fontFamily: C, fontSize: '72px', fontStyle: 'italic', fontWeight: 400, color: 'rgba(246,183,77,0.15)', lineHeight: 1, marginBottom: '-12px' }}>{e.num}</div>
                <h3 style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '16px', marginTop: '16px' }}>{e.titre}</h3>
                <p style={{ fontFamily: J, fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.85 }}>{e.corps}</p>
              </div>
            ))}
          </div>

          {/* Places limitées */}
          <div style={{ marginTop: '1px', background: BGMID, padding: '28px 36px', display: 'flex', alignItems: 'center', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
            <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: ACCENT }}>
              Places limitées à 2 invités par expédition
            </p>
          </div>
        </div>
      </div>

      {/* ── AVANTAGES ─────────────────────────────── */}
      <div style={{ background: BG, padding: '96px 72px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '16px' }}>
            Ce que vous gagnez
          </p>
          <h2 style={{ fontFamily: C, fontSize: 'clamp(40px, 4.5vw, 64px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '64px' }}>
            Les avantages du mode à l&apos;aveugle
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {AVANTAGES.map((a, i) => (
              <div key={i} style={{ background: BG, padding: '48px 48px', display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: C, fontSize: '48px', fontStyle: 'italic', fontWeight: 400, color: 'rgba(246,183,77,0.25)', lineHeight: 1, flexShrink: 0, marginTop: '-6px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 style={{ fontFamily: C, fontSize: '24px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '14px' }}>{a.titre}</h3>
                  <p style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.85 }}>{a.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── POURQUOI L'AVEUGLE — section conservée ── */}
      <div style={{ background: BGDARK, padding: '96px 64px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: J, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: ACCENT, marginBottom: '32px' }}>
            Pourquoi à l&apos;aveugle ?
          </p>
          <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', marginBottom: '40px', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
            Parce que savoir à l&apos;avance tue<br />la moitié du voyage
          </h2>
          <p style={{ fontFamily: J, fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: '32px' }}>
            Quand vous connaissez la destination, vous cherchez des photos, lisez des avis, construisez des attentes. Vous arrivez avec un film déjà en tête.
          </p>
          <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}>
            &ldquo;Partir à l&apos;aveugle, c&apos;est s&apos;autoriser à être surpris. C&apos;est retrouver ce que le voyage était avant internet.&rdquo;
          </p>
        </div>
      </div>

      {/* ── FAQ ─────────────────────────────────────── */}
      <div style={{ background: BG, padding: '96px 72px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontFamily: M, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: '16px' }}>
            Questions fréquentes
          </p>
          <h2 style={{ fontFamily: C, fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '64px' }}>
            Ce que vous vous demandez
          </h2>
          {[
            {
              q: "Et si je n'ai pas d'expérience en trek ?",
              r: "Ce n'est pas un critère éliminatoire. J'adapte le niveau au groupe sélectionné. La motivation compte plus que le palmarès.",
            },
            {
              q: "Que faut-il prévoir comme budget ?",
              r: "Cela dépend de la destination révélée. Comptez entre 1 700 € et 3 500 € tout compris selon la durée et la région du monde.",
            },
            {
              q: "On peut y aller en couple ou entre amis ?",
              r: "Oui, mais je sélectionne des profils indépendamment. Si vous candidatez à plusieurs, vos dossiers sont étudiés séparément. Cela ne veut pas dire que vous ne serez pas pris tous les deux.",
            },
          ].map((f, i, arr) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '36px 0', borderBottom: i === arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <p style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: '14px' }}>{f.q}</p>
              <p style={{ fontFamily: J, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85 }}>{f.r}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────── */}
      <div style={{ background: BGMID, padding: '80px 64px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: C, fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, marginBottom: '32px', letterSpacing: '-0.02em' }}>
          Prêt pour<br /><span style={{ color: ACCENT }}>l&apos;inconnu ?</span>
        </h2>
        <Link href="/candidater" style={{ fontFamily: J, fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', background: ACCENT, color: BGDARK, padding: '18px 56px', textDecoration: 'none', display: 'inline-block' }}>
          Candidater maintenant
        </Link>
      </div>
    </div>
  )
}
