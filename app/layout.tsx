import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "BTW2WORLD | L'Entre 2 Mondes",
  description: "Partir à l'aveugle en terre inconnue — Expéditions nature en petit groupe",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
