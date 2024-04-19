'use server'

import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

export const getOrdersByUser = async () => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'Debe estar autenticado para realizar esta acción'
    }
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id
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

  return {
    ok: true,
    orders
  }
}
