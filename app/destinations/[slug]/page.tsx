import { notFound } from 'next/navigation'
import { VOYAGES } from '@/lib/data'
import VoyageDetail from '@/components/voyage/VoyageDetail'

export function generateStaticParams() {
  return VOYAGES.map(v => ({ slug: v.slug }))
}

export default async function VoyagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const voyage = VOYAGES.find(v => v.slug === slug)
  if (!voyage) notFound()
  return <VoyageDetail voyage={voyage} />
}
