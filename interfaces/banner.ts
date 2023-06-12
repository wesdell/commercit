import type { IImage } from './';

export interface IBanner {
  desc: string
  discount: string
  image: IImage
  saleTime: string
  product: string
  buttonText: string
  largeText1: string
  largeText2: string
  smallText: string
  midText: string
  _type: 'banner'
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
}
