import type { Metadata } from 'next'
import LandingPage from '@/components/LandingPage'

export const metadata: Metadata = {
  title: "BTW2WORLD — L'Entre 2 Mondes",
  description: "Expéditions nature en petit groupe. Destination secrète révélée pendant le voyage. Un projet photographique et humain.",
}

export default function Home() {
  return <LandingPage />
}
