'use server'

import prisma from '@/lib/prisma'
import { sleep } from '@/utils'

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    sleep(100)

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
