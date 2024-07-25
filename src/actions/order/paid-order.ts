'use server'

import { revalidatePath } from 'next/cache'
import { sendNotificationsPayment } from '@/actions'
import prisma from '@/lib/prisma'

export const paidOrder = async (orderId: string) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        status: 'paided',
        paidAt: new Date()
      }
    })

    // send notifications to user and admin
    await sendNotificationsPayment()

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
      message: 'Pago completado'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Pago no completado'
    }
  }
}
