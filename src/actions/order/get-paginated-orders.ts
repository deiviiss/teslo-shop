'use server'

import { validateUserAdmin } from '@/actions'
import prisma from '@/lib/prisma'

export const getPaginatedOrders = async () => {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    return {
      ok: false,
      message: 'Debe estar autenticado para realizar esta acción'
    }
  }

  const orders = await prisma.order.findMany({
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

  return {
    ok: true,
    orders
  }
}
