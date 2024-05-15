'use server'

import { validateUserAdmin } from '@/actions'
import prisma from '@/lib/prisma'

export const getPaginatedUsers = async () => {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    return {
      ok: false,
      message: 'Debe estar autenticado para realizar como administrador'
    }
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: 'desc'
    }
  })

  if (!users) {
    return {
      ok: false,
      message: 'No se encontraron usuarios'
    }
  }

  return {
    ok: true,
    users
  }
}
