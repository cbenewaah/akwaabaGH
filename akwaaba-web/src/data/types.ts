export type Region =
  | 'Ahafo'
  | 'Ashanti'
  | 'Bono'
  | 'Bono East'
  | 'Central'
  | 'Eastern'
  | 'Greater Accra'
  | 'North East'
  | 'Northern'
  | 'Oti'
  | 'Savannah'
  | 'Upper East'
  | 'Upper West'
  | 'Volta'
  | 'Western'
  | 'Western North'

export type Category =
  | 'Heritage'
  | 'Nature'
  | 'Beach'
  | 'Wildlife'
  | 'Market'
  | 'Adventure'

export interface Destination {
  id: string
  name: string
  region: Region
  category: Category
  rating: number
  reviewCount: number
  tagline: string
  description: string
  hours: string
  entry: string
  bestTime: string
  goodFor: string
  address: string
  mapQuery: string
  image?: string
  featured?: boolean
  nearby: string[]
}

export interface Festival {
  id: string
  name: string
  blurb: string
  people: string
  region: Region
  month: string
  monthShort: string
  day: string
  dateLabel: string
  duration: string
  tag: string
  description: string
  expect: string
  location: string
  live?: boolean
  pairsWith?: string
}

export interface Review {
  id: string
  author: string
  initial: string
  color: string
  place: string
  destinationId?: string
  category: 'Heritage' | 'Nature' | 'Festivals'
  rating: number
  text: string
  likes: number
  time: string
}
