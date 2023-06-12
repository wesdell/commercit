export interface IImage {
  key?: string
  _type: 'image'
  asset: IAsset
}

export interface IAsset {
  _type: 'reference'
  _ref: string
}

export interface ISlug {
  _type: 'slug'
  current: string
}
