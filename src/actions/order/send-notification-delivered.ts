'use server'

import { sendWhatsappMessage, sendSmsMessage, getUserSessionServer, getPhoneNumberAdmin, getEmailAdmin, sendEmail } from '@/actions'

export const sendNotificationsDelivered = async () => {
  const user = await getUserSessionServer()
  const { phoneNumberAdmin } = await getPhoneNumberAdmin()
  const { emailAdmin } = await getEmailAdmin()

  if (!user || phoneNumberAdmin === null || emailAdmin === null) {
    return {
      ok: false,
      message: 'No se pudo enviar la notificación de entrega'
    }
  }

  // send whatsapp to user to notify delivery
  await sendWhatsappMessage(user.phoneNumber, `¡${user.name}, su pedido ha sido entregado! Gracias por su compra.`)

  // send whatsapp to admin to notify delivery
  await sendWhatsappMessage(`${phoneNumberAdmin.phoneNumber}`, `¡El pedido de ${user.name} ha sido entregado!`)

  // send sms to user to notify delivery
  await sendSmsMessage(user.phoneNumber, `¡${user.name}, su pedido ha sido entregado! Gracias por su compra.`)

  // send sms to admin to notify delivery
  await sendSmsMessage(`${phoneNumberAdmin.phoneNumber}`, `¡El pedido de ${user.name} ha sido entregado!`)

  // send email to user to notify delivery
  await sendEmail({
    email: user.email,
    subject: 'Pedido entregado',
    message: `
      <p>Hola ${user.name},</p>
      <p>Su pedido ha sido entregado. Gracias por su compra.</p>
      <p>SLDS</p>
      `
  })

  // send email to admin to notify delivery
  await sendEmail({
    email: emailAdmin.email,
    subject: `Pedido de ${user.name} entregado`,
    message: `
      <p>Hola,</p>
      <p>El pedido de ${user.name} ha sido entregado.</p>
      <p>SLDS</p>
      `
  })
}
