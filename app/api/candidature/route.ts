import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { prenom, nom, email, motivation } = body

    if (!prenom || !nom || !email || !motivation) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    if (motivation.length < 80) {
      return NextResponse.json({ error: 'Motivation trop courte' }, { status: 400 })
    }

    // TODO: Insert into Supabase
    // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    // const { error } = await supabase.from('candidatures').insert([body])
    // if (error) throw error

    // TODO: Send confirmation email via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: process.env.RESEND_FROM_EMAIL!,
    //   to: email,
    //   subject: 'BTW2WORLD — Candidature reçue',
    //   html: `<p>Bonjour ${prenom}, votre candidature a bien été reçue. À très vite, peut-être.</p>`,
    // })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
