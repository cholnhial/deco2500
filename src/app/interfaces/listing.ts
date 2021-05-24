export interface Listing {
  id?: number,
  title: string,
  description: string,
  category: string,
  condition: string,
  postedOn?: string,
  distance?: string,
  available?: boolean,
  views?: number,
  images?: Array<string>,
  location: string
}
