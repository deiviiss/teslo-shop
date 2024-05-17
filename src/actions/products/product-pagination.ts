'use server'

import { type Gender } from '@prisma/client'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginationProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {
  page = validatePageNumber(page)

  try {
    // get products
    const productsDB = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },
      where: {
        gender
      }
    })

    const totalCount = await prisma.product.count({
      where: {
        gender
      }
    })

    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages,
      products: productsDB.map(product => ({
        ...product,
        images: product.ProductImage.map((image) => image.url)
      }))
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
