'use client'

import { useState } from 'react'
import { VOYAGES } from '@/lib/data'

type FormData = {
  prenom: string
  nom: string
  email: string
  telephone: string
  voyage_vise: string
  motivation: string
  experience_voyage: string
  contraintes: string
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: 'var(--color-white)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  fontWeight: 300,
  padding: '12px 16px',
  outline: 'none',
  transition: 'border-color 150ms',
}

const labelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '9px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.18em',
  color: 'rgba(255,255,255,0.45)',
  display: 'block',
  marginBottom: '6px',
}

export default function CandidatureForm() {
  const [form, setForm] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    voyage_vise: '',
    motivation: '',
    experience_voyage: '',
    contraintes: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.motivation.length < 80) {
      alert('Votre motivation doit contenir au moins 80 caractères.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 40px',
          textAlign: 'center',
          minHeight: '400px',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontStyle: 'italic',
              color: 'var(--color-white)',
              marginBottom: '16px',
              lineHeight: 1.5,
            }}
          >
            Votre candidature a été envoyée.<br />À très vite, peut-être.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 300,
            }}
          >
            Vous recevrez une réponse sous 48h.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label htmlFor="prenom" style={labelStyle}>Prénom *</label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            required
            value={form.prenom}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="nom" style={labelStyle}>Nom *</label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            value={form.nom}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label htmlFor="email" style={labelStyle}>Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="telephone" style={labelStyle}>Téléphone</label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            value={form.telephone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Voyage */}
      <div>
        <label htmlFor="voyage_vise" style={labelStyle}>Quel voyage vous intéresse ?</label>
        <select
          id="voyage_vise"
          name="voyage_vise"
          value={form.voyage_vise}
          onChange={handleChange}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="" style={{ background: '#1a1a1a' }}>Sélectionner une expédition</option>
          {VOYAGES.filter((v) => v.status !== 'passe').map((v) => (
            <option key={v.id} value={v.slug} style={{ background: '#1a1a1a' }}>
              {v.title}
            </option>
          ))}
        </select>
      </div>

      {/* Motivation */}
      <div>
        <label htmlFor="motivation" style={labelStyle}>
          Pourquoi souhaitez-vous partir avec BTW2WORLD ? * ({form.motivation.length}/80 min)
        </label>
        <textarea
          id="motivation"
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
        <label htmlFor="experience_voyage" style={labelStyle}>Niveau d&apos;expérience voyage</label>
        <select
          id="experience_voyage"
          name="experience_voyage"
          value={form.experience_voyage}
          onChange={handleChange}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="" style={{ background: '#1a1a1a' }}>Sélectionner</option>
          <option value="debutant" style={{ background: '#1a1a1a' }}>Débutant</option>
          <option value="intermediaire" style={{ background: '#1a1a1a' }}>Intermédiaire</option>
          <option value="experimente" style={{ background: '#1a1a1a' }}>Expérimenté</option>
          <option value="aventurier" style={{ background: '#1a1a1a' }}>Aventurier</option>
        </select>
      </div>

      {/* Contraintes */}
      <div>
        <label htmlFor="contraintes" style={labelStyle}>Contraintes spécifiques</label>
        <textarea
          id="contraintes"
          name="contraintes"
          rows={3}
          value={form.contraintes}
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Régime alimentaire, mobilité, dates bloquées..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          background: 'rgba(255,255,255,0.92)',
          color: '#1a1a1a',
          padding: '16px 32px',
          border: 'none',
          cursor: status === 'loading' ? 'wait' : 'pointer',
          alignSelf: 'flex-start',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'opacity 150ms',
        }}
      >
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma candidature'}
      </button>

      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,100,100,0.8)' }}>
          Une erreur est survenue. Réessayez ou contactez-moi par email.
        </p>
      )}
    </form>
  )
}
