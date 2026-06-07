import type { Metadata } from 'next'
import LandingPage from '@/components/LandingPage'

export const metadata: Metadata = {
  title: "BTW2WORLD — L'Entre 2 Mondes",
  description: "Expéditions nature en petit groupe. Destination révélée J-7. Un projet photographique et humain.",
}

export default function Home() {
  return <LandingPage />
}
