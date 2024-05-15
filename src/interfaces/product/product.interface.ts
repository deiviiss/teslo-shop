export interface Product {
  id: string
  description?: string | null
  images: string[]
  inStock: number
  price: number
  sizes: Size[]
  slug: string
  tags: string[]
  title: string
  // type: ValidType
  gender: ValidGender
}

export interface CartProduct {
  id: string
  slug: string
  title: string
  price: number
  size: Size
  quantity: number
  image: string
}

export type ValidGender = 'men' | 'women' | 'kid' | 'unisex'

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'

export type ValidType = 'shirts' | 'pants' | 'hoodies' | 'hats'

export interface ProductImage {
  id: string
  url: string
  productId?: string
}

export interface Category {
  id: string
  description: string | null
  name: string
}
