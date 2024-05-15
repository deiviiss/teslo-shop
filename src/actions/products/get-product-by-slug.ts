'use server'

import prisma from '@/lib/prisma'

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: true
      },
      where: {
        slug
      }
    })

    if (!product) {
      return null
    }

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
