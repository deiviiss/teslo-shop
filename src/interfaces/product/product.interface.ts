export interface Product {
  id: string
  description?: string | null
  images: string[]
  price: number
  sizes: Size[]
  slug: string
  title: string
  gender: ValidGender
}

export interface ProductAdmin {
  id: string
  title: string
  slug: string
  description?: string | null
  gender: ValidGender
  price: number
  sizes: Size[]
  images: string[]
}

export interface ProductStock {
  size: Size
  inStock: number
  product: {
    id: string
    title: string
    description?: string | null
    slug: string
    gender: ValidGender
    categoryId: string
    price: number
    productImage: Array<{
      url: string
    }>
  }
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
