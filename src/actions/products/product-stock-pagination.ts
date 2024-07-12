'use server'

// import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  query?: string
  page?: number
  take?: number
}

export const getPaginationProductsStockWithImages = async ({ page = 1, take = 12, query = '' }: PaginationOptions) => {
  page = validatePageNumber(page)

  try {
    // get stock products
    const productsStockDB = await prisma.productStock.findMany({
      where: {
        product: {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        }
      },
      take,
      skip: (page - 1) * take,
      include: {
        product: {
          include: {
            productImage: {
              take: 2,
              select: {
                id: true,
                url: true
              }
            }
          }
        }
      },
      orderBy: [
        {
          product: {
            title: 'asc'
          }
        }
        // {
        //   orderBySize: 'asc'
        // }
      ]
    })

    if (!productsStockDB) {
      return {
        currentPage: page,
        totalPages: 0,
        products: []
      }
    }

    const totalCount = await prisma.productStock.count({
      where: {
        product: {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        }
      }
    })

    const totalPages = Math.ceil(totalCount / take)

    const productsStock = productsStockDB.map(produtStock => ({
      size: produtStock.size,
      inStock: produtStock.inStock,
      product: {
        ...produtStock.product
      }
    }))

    // revalidatePath('/admin/products')

    return {
      currentPage: page,
      totalPages,
      products: productsStock
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
