import type { IImage, ISlug } from './';

export interface IProduct {
  details: string
  image: IImage[]
  name: string
  price: number
  quantity?: number
  slug: ISlug
  _rev: string
  _id: string
  _type: 'product'
  _createdAt: string
  _updatedAt: string
}

