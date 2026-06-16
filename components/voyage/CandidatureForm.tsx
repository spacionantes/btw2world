'use client'

import { useState, useRef } from 'react'

const J = "'Jost', sans-serif"
const M = "'DM Mono', monospace"
const C = "'Shippori Mincho B1', serif"
const BG = '#354f3b'
const ACCENT = '#f6b74d'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff',
  fontFamily: J,
  fontSize: '14px',
  fontWeight: 300,
  padding: '12px 16px',
  outline: 'none',
  transition: 'border-color 150ms',
}

const labelStyle: React.CSSProperties = {
  fontFamily: M,
  fontSize: '9px',
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: 'rgba(255,255,255,0.45)',
  display: 'block',
  marginBottom: '6px',
}

const EXPEDITIONS_PASSEES = [
  { value: 'kirghizistan-tian-shan', label: 'Kirghizistan — Tian Shan (Juillet 2025)' },
  { value: 'nepal-annapurna',        label: 'Népal — Circuit Annapurna (Janvier 2024)' },
  { value: 'amazonie-manaus',        label: 'Amazonie — Manaus (Mai 2023)' },
]

export default function CandidatureForm() {
  const [mode, setMode] = useState<'aveugle' | 'libre' | ''>('')
  const [destination, setDestination] = useState('')
  const [autreDestination, setAutreDestination] = useState('')
  const [files, setFiles] = useState<FileList | null>(null)
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    motivation: '', experience_voyage: '', contraintes: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('mode', mode)
      fd.append('destination', destination === 'autre' ? autreDestination : destination)
      if (files) Array.from(files).forEach(f => fd.append('fichiers', f))

      const res = await fetch('/api/candidature', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 40px', textAlign: 'center', minHeight: '400px' }}>
        <div>
          <p style={{ fontFamily: C, fontSize: '24px', fontStyle: 'italic', color: '#fff', marginBottom: '16px', lineHeight: 1.5 }}>
            Votre candidature a été envoyée.<br />À très vite, peut-être.
          </p>
          <p style={{ fontFamily: J, fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
            Vous recevrez une réponse sous 48h.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Identité */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Prénom *</label>
          <input name="prenom" type="text" required value={form.prenom} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Nom *</label>
          <input name="nom" type="text" required value={form.nom} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Email *</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Téléphone</label>
          <input name="telephone" type="tel" value={form.telephone} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      {/* Choix du mode */}
      <div>
        <label style={labelStyle}>Formule souhaitée *</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.08)' }}>
          {(['aveugle', 'libre'] as const).map(m => (
            <button key={m} type="button" onClick={() => { setMode(m); setDestination(''); setAutreDestination('') }}
              style={{
                padding: '20px 24px', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: mode === m ? ACCENT : 'rgba(255,255,255,0.03)',
                transition: 'background 0.25s',
              }}>
              <div style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase', color: mode === m ? BG : 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>
                Formule 0{m === 'aveugle' ? '1' : '2'}
              </div>
              <div style={{ fontFamily: C, fontSize: '22px', fontStyle: 'italic', color: mode === m ? BG : '#fff' }}>
                {m === 'aveugle' ? 'À l\'aveugle' : 'Mode libre'}
              </div>
              <div style={{ fontFamily: J, fontSize: '12px', fontWeight: 300, color: mode === m ? 'rgba(53,79,59,0.8)' : 'rgba(255,255,255,0.35)', marginTop: '6px' }}>
                {m === 'aveugle' ? 'La destination est révélée à J-7' : 'Vous choisissez la destination'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode libre — choix de destination */}
      {mode === 'libre' && (
        <div>
          <label style={labelStyle}>Destination souhaitée *</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: 'rgba(255,255,255,0.06)', marginBottom: destination === 'autre' ? '12px' : 0 }}>
            {EXPEDITIONS_PASSEES.map(exp => (
              <button key={exp.value} type="button" onClick={() => { setDestination(exp.value); setAutreDestination('') }}
                style={{
                  padding: '14px 20px', border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: destination === exp.value ? 'rgba(246,183,77,0.12)' : 'transparent',
                  borderLeft: destination === exp.value ? `3px solid ${ACCENT}` : '3px solid transparent',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: destination === exp.value ? ACCENT : 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                <span style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: destination === exp.value ? '#fff' : 'rgba(255,255,255,0.55)' }}>
                  {exp.label}
                </span>
              </button>
            ))}
            <button type="button" onClick={() => setDestination('autre')}
              style={{
                padding: '14px 20px', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: destination === 'autre' ? 'rgba(246,183,77,0.12)' : 'transparent',
                borderLeft: destination === 'autre' ? `3px solid ${ACCENT}` : '3px solid transparent',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: destination === 'autre' ? ACCENT : 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
              <span style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: destination === 'autre' ? '#fff' : 'rgba(255,255,255,0.55)' }}>
                Autre destination
              </span>
            </button>
          </div>
          {destination === 'autre' && (
            <input
              type="text"
              placeholder="Nom du pays ou de la région souhaitée..."
              value={autreDestination}
              onChange={e => setAutreDestination(e.target.value)}
              style={{ ...inputStyle, marginTop: '0' }}
            />
          )}
        </div>
      )}

      {/* Motivation */}
      <div>
        <label style={labelStyle}>Pourquoi souhaitez-vous partir avec BTW2WORLD ? *</label>
        <textarea
          name="motivation"
          required
          rows={5}
          value={form.motivation}
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Ce qui vous attire dans ce voyage, votre rapport à l'aventure..."
        />
      </div>

      {/* Expérience */}
      <div>
        <label style={labelStyle}>Niveau d&apos;expérience voyage</label>
        <select name="experience_voyage" value={form.experience_voyage} onChange={handleChange}
          style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="" style={{ background: '#1a2e1e' }}>Sélectionner</option>
          <option value="debutant"      style={{ background: '#1a2e1e' }}>Débutant</option>
          <option value="intermediaire" style={{ background: '#1a2e1e' }}>Intermédiaire</option>
          <option value="experimente"   style={{ background: '#1a2e1e' }}>Expérimenté</option>
          <option value="aventurier"    style={{ background: '#1a2e1e' }}>Aventurier</option>
        </select>
      </div>

      {/* Contraintes */}
      <div>
        <label style={labelStyle}>Contraintes spécifiques</label>
        <textarea name="contraintes" rows={3} value={form.contraintes} onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Régime alimentaire, mobilité, dates bloquées..." />
      </div>

      {/* Pièces jointes */}
      <div>
        <label style={labelStyle}>Pièces jointes — vidéo, lettre, diaporama (optionnel)</label>
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: '1px dashed rgba(255,255,255,0.2)', padding: '28px 24px',
            cursor: 'pointer', textAlign: 'center', transition: 'border-color 0.2s',
            background: 'rgba(255,255,255,0.03)',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
        >
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="video/*,.pdf,.ppt,.pptx,.key,.doc,.docx,image/*"
            style={{ display: 'none' }}
            onChange={e => setFiles(e.target.files)}
          />
          {files && files.length > 0 ? (
            <div>
              {Array.from(files).map((f, i) => (
                <p key={i} style={{ fontFamily: J, fontSize: '13px', color: ACCENT, fontWeight: 300, marginBottom: '4px' }}>
                  ✓ {f.name}
                </p>
              ))}
              <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginTop: '8px', textTransform: 'uppercase' }}>
                Cliquer pour modifier
              </p>
            </div>
          ) : (
            <>
              <p style={{ fontFamily: J, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', marginBottom: '6px' }}>
                Glisser-déposer ou cliquer pour ajouter des fichiers
              </p>
              <p style={{ fontFamily: M, fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
                Vidéo · PDF · Diaporama · Image
              </p>
            </>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          fontFamily: J, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em',
          background: ACCENT, color: BG, padding: '18px 40px', border: 'none',
          cursor: status === 'loading' ? 'wait' : 'pointer',
          alignSelf: 'flex-start', fontWeight: 600,
          opacity: status === 'loading' ? 0.7 : 1, transition: 'opacity 150ms',
        }}
      >
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma candidature →'}
      </button>

      {status === 'error' && (
        <p style={{ fontFamily: J, fontSize: '13px', color: 'rgba(255,100,100,0.8)' }}>
          Une erreur est survenue. Réessayez ou contactez-moi par email.
        </p>
      )}
    </form>
  )
}
