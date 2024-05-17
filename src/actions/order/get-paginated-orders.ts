'use server'

import { validateUserAdmin } from '@/actions'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getPaginatedOrders = async ({ page = 1, take = 12 }: PaginationOptions) => {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    return {
      ok: false,
      message: 'Debe estar autenticado para realizar esta acción'
    }
  }

  page = validatePageNumber(page)

  const orders = await prisma.order.findMany({
    take,
    skip: (page - 1) * take,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      orderAddresses: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  })

  if (!orders) {
    return {
      ok: false,
      message: 'No se encontraron ordenes'
    }
  }
  console.log(orders)
  const totalCount = await prisma.order.count({})
  console.log(totalCount)
  const totalPages = Math.ceil(totalCount / take)
  console.log(totalPages)
  return {
    ok: true,
    orders,
    currentPage: page,
    totalPages
  }
}
