'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

interface RegisterUser {
  name: string
  email: string
  password: string
}

export const registerUser = async (data: RegisterUser) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return {
      ok: true,
      message: 'Usuario creado correctamente',
      user
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al crear el usuario'
    }
  }
}
