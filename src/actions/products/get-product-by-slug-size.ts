'use server'

import { type Size } from '@/interfaces'
import prisma from '@/lib/prisma'

interface IParams {
  slug: string
  size: Size
}

export const getProductBySlugSize = async ({ slug, size }: IParams) => {
  try {
    const product = await prisma.productStock.findFirst({
      include: {
        product: {
          include: {
            productImage: true
          }
        }
      },
      where: {
        product: {
          slug
        },
        size
      }
    })

    if (!product) {
      return null
    }

    return {
      ...product,
      images: product.product.productImage.map((image) => image.url)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
