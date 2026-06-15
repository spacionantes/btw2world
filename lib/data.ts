export type TVoyage = {
  id: string
  slug: string
  title: string
  country: string
  continent: string
  coverImage: string
  departureDate: string
  duration: number
  spotsTotal: number
  spotsLeft: number
  status: 'ouvert' | 'complet' | 'bientot' | 'passe'
  description: string
  longDescription?: string
  coordinates: [number, number]
  videoUrl?: string
  blogUrl?: string
  gallery?: string[]
  tags?: string[]
}

export const VOYAGES: TVoyage[] = [
  {
    id: '1',
    slug: 'kirghizistan-tian-shan',
    title: 'Kirghizistan — Tian Shan',
    country: 'Kirghizistan',
    continent: 'Asie centrale',
    coverImage: '/images/15.jpg',
    departureDate: '2025-08-15',
    duration: 14,
    spotsTotal: 6,
    spotsLeft: 3,
    status: 'ouvert',
    description: 'Traversée des hauts plateaux kirghiz, nuits en yourte, cols à 4000m.',
    longDescription: `Une traversée de 14 jours dans les montagnes du Tian Shan, entre ciel et steppe. Chevaux sauvages, lacs turquoise, nuits sous les étoiles à 3500m d'altitude.

Le groupe — 5 personnes — a parcouru plus de 200km à cheval et à pied, traversé 3 cols de haute montagne et dormi chaque nuit sous une yourte différente. Aucun hôtel. Aucun itinéraire figé. Juste la steppe, les étoiles et les familles kirghizes qui nous ont accueillis.`,
    coordinates: [74.5698, 40.8601],
    videoUrl: 'https://www.youtube.com/embed/psMpoJfhKPU',
    blogUrl: '#',
    gallery: [
      '/images/15.jpg',
      '/images/13.jpg',
      '/images/14.jpg',
      '/images/kyrg-famille.jpg',
      '/images/kyrg-fille-cheval.jpg',
      '/images/kyrg-filles.jpg',
    ],
    tags: ['Montagne', 'Cheval', 'Yourte', 'Trek'],
  },
  {
    id: '4',
    slug: 'nepal-annapurna',
    title: 'Népal — Circuit Annapurna',
    country: 'Népal',
    continent: 'Himalaya',
    coverImage: '/images/11.jpg',
    departureDate: '2024-10-12',
    duration: 18,
    spotsTotal: 4,
    spotsLeft: 0,
    status: 'passe',
    description: 'Thorong-La Pass à 5416m, villages sherpa, glaciers éternels de l\'Annapurna.',
    longDescription: `18 jours dans l'Himalaya. Le circuit Annapurna — l'un des treks les plus sauvages du monde — avec 4 personnes dont les niveaux allaient du randonneur occasionnel à l'alpiniste confirmé.

Le passage du Thorong-La à 5416m reste le moment le plus fort : partir à 3h du matin dans le froid, les lampes frontales comme seuls repères, et arriver au col au lever du soleil. Aucun mot ne suffit.`,
    coordinates: [84.0167, 28.5967],
    videoUrl: 'https://www.youtube.com/embed/hUvQnEXjK_w',
    blogUrl: '#',
    gallery: [
      '/images/11.jpg',
      '/images/12.jpg',
    ],
    tags: ['Himalaya', 'Trek', 'Altitude', 'Sherpa'],
  },
  {
    id: '2',
    slug: 'namibie-desert',
    title: 'Namibie — Désert du Namib',
    country: 'Namibie',
    continent: 'Afrique australe',
    coverImage: '/images/16.jpg',
    departureDate: '2025-11-01',
    duration: 12,
    spotsTotal: 4,
    spotsLeft: 0,
    status: 'complet',
    description: 'Dunes de Sossusvlei, Skeleton Coast, ciel étoilé du désert.',
    longDescription: `Namibie, novembre 2025. Quatre personnes, un 4x4, l'immensité du désert le plus ancien du monde.

Dunes de Sossusvlei au lever du soleil, Dead Vlei et ses arbres fossilisés, nuits sur la Skeleton Coast. Un silence absolu, comme nulle part ailleurs.`,
    coordinates: [18.4904, -22.9576],
    blogUrl: '#',
    gallery: ['/images/hero-bg.jpg', '/images/12.jpg'],
    tags: ['Désert', 'Wildlife', 'Photography'],
  },
  {
    id: '3',
    slug: 'prochain-voyage',
    title: '??? — Destination secrète',
    country: '???',
    continent: '???',
    coverImage: '/images/14.jpg',
    departureDate: '2026-03-01',
    duration: 10,
    spotsTotal: 6,
    spotsLeft: 6,
    status: 'bientot',
    description: 'La destination sera révélée 7 jours avant le départ aux candidats retenus.',
    coordinates: [0, 20],
    tags: ['Mystère'],
  },
]

export const PHOTOS = [
  { id: '1', src: '/images/15.jpg', location: 'Lac Ala-Kul', country: 'Kirghizistan', theme: 'montagne' as const, alt: 'Lac turquoise Ala-Kul depuis le col' },
  { id: '2', src: '/images/13.jpg', location: 'Kel-Suu', country: 'Kirghizistan', theme: 'montagne' as const, alt: 'Canyon et lac turquoise de Kel-Suu' },
  { id: '3', src: '/images/14.jpg', location: 'Steppe', country: 'Kirghizistan', theme: 'montagne' as const, alt: 'Cavaliers sur la steppe kirghize' },
  { id: '4', src: '/images/kyrg-famille.jpg', location: 'Yourte', country: 'Kirghizistan', theme: 'portrait' as const, alt: 'Famille kirghize devant la yourte' },
  { id: '5', src: '/images/kyrg-fille-cheval.jpg', location: 'Steppe', country: 'Kirghizistan', theme: 'portrait' as const, alt: 'Petite fille à cheval dans la steppe' },
  { id: '6', src: '/images/kyrg-filles.jpg', location: 'Yourte', country: 'Kirghizistan', theme: 'portrait' as const, alt: 'Enfant kirghize' },
  { id: '7', src: '/images/11.jpg', location: 'Thorong-La 5416m', country: 'Népal', theme: 'montagne' as const, alt: 'Thorong-La Pass Népal' },
  { id: '8', src: '/images/12.jpg', location: 'Himalaya', country: 'Népal', theme: 'montagne' as const, alt: 'Randonneur face à l\'Himalaya' },
  { id: '9', src: '/images/maxence.jpg', location: 'Kirghizistan', country: 'Kirghizistan', theme: 'portrait' as const, alt: 'Maxence, guide BTW2WORLD' },
]
