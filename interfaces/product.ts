import type { IImage, ISlug } from './';

export interface IProduct {
  details: string
  images: IImage[]
  name: string
  price: number
  slug: ISlug
  _rev: string
  _id: string
  _type: 'product'
  _createdAt: string
  _updatedAt: string
}

