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
    title: 'Kirghizistan',
    country: 'Kirghizistan',
    continent: 'Asie centrale',
    coverImage: '/images/15.jpg',
    departureDate: '2025-07-01',
    duration: 20,
    spotsTotal: 3,
    spotsLeft: 0,
    status: 'passe',
    description: 'Une immersion totale de 20 jours à travers les steppes sauvages d\'Asie Centrale.',
    longDescription: `Une immersion totale de 20 jours à travers les steppes sauvages d'Asie Centrale.

Ce périple simple et authentique mène les voyageurs à la rencontre de la population kirghize, à la découverte d'un mode de vie et d'une culture d'une infinie richesse.

Le groupe a partagé le quotidien des familles locales au rythme des chevauchées, en vivant au sein de yourtes traditionnelles au bord du grand lac Son Koul.

Le voyage s'est ensuite poursuivi en traversant le pays du sud vers l'est, sans itinéraire figé, guidé par l'hospitalité unique des campements nomades.

Aucun confort moderne, aucun filtre. Juste l'immensité de la steppe, les moments partagés avec nos hôtes et la beauté calme des grands espaces.

Une véritable déconnexion et une pause hors du temps, filmée à hauteur d'homme.`,
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
    title: 'Népal',
    country: 'Népal',
    continent: 'Himalaya',
    coverImage: '/images/11.jpg',
    departureDate: '2024-01-12',
    duration: 15,
    spotsTotal: 2,
    spotsLeft: 0,
    status: 'passe',
    description: 'Une immersion humaine et suspendue de 15 jours sur les hauts plateaux du Népal.',
    longDescription: `Une immersion humaine et suspendue de 15 jours sur les hauts plateaux du Népal.

Ce périple au cœur de l'Himalaya, surnommé le toit du monde, mène les voyageurs à la rencontre de la culture locale et de sa population d'une infinie richesse.

Le groupe a partagé la vie quotidienne des habitants en marchant à travers les Annapurnas, avant de s'installer au sein d'une famille accueillante dans le village de Chapakoth.

Le voyage s'est ensuite terminé par la découverte du safari de Chitwan, sans itinéraire figé, guidé par la bienveillance et l'hospitalité unique de nos hôtes.

Aucun artifice, aucun filtre. Juste la grandeur des montagnes de l'Himalaya, les moments de vie partagés au bout du monde et la sérénité des grands espaces.

Une véritable déconnexion et une pause hors du temps, filmée à hauteur d'homme.`,
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
    id: '5',
    slug: 'amazonie-manaus',
    title: 'Amazonie — Manaus',
    country: 'Brésil',
    continent: 'Amérique du Sud',
    coverImage: '/images/Amazonie.jpeg',
    departureDate: '2023-05-20',
    duration: 12,
    spotsTotal: 6,
    spotsLeft: 0,
    status: 'passe',
    description: 'Jungle amazonienne, Rio Negro, Manaus — immersion totale en forêt tropicale.',
    coordinates: [-60.0, -3.1],
    tags: ['Jungle', 'Amazonie', 'Faune', 'Pirogue'],
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
    description: 'La destination sera révélée pendant le voyage aux candidats retenus.',
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
