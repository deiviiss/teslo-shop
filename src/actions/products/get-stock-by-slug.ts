'use server'

import prisma from '@/lib/prisma'

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug
      },
      select: {
        inStock: true
      }
    })

    if (!product) {
      return 0
    }

    const stock = product.inStock

    return stock || 0
  } catch (error) {
    return 0
  }
}
