'use server'

import { type Gender } from '@prisma/client'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  query?: string
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginationProductsWithImages = async ({ page = 1, take = 12, gender, query = '' }: PaginationOptions) => {
  page = validatePageNumber(page)

  try {
    // get products
    const productsDB = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        productImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },
      where: {
        gender,
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      }
    })

    const totalCount = await prisma.product.count({
      where: {
        gender,
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      }
    })

    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages,
      products: productsDB.map(product => ({
        ...product,
        images: product.productImage.map((image) => image.url)
      }))
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
