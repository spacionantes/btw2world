import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''

    let prenom, nom, email, motivation

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      prenom     = formData.get('prenom') as string
      nom        = formData.get('nom') as string
      email      = formData.get('email') as string
      motivation = formData.get('motivation') as string
    } else {
      const body  = await req.json()
      prenom     = body.prenom
      nom        = body.nom
      email      = body.email
      motivation = body.motivation
    }

    if (!prenom || !nom || !email || !motivation) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
