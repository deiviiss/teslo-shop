'use server'

import { sendWhatsappMessage, sendSmsMessage, getUserSessionServer, getPhoneNumberAdmin, getEmailAdmin, sendEmail } from '@/actions'

export const sendNotificationsPayment = async () => {
  const user = await getUserSessionServer()
  const { phoneNumberAdmin } = await getPhoneNumberAdmin()
  const { emailAdmin } = await getEmailAdmin()

  if (!user || phoneNumberAdmin === null || emailAdmin === null) {
    return {
      ok: false,
      message: 'No se pudo enviar la notificación de pago'
    }
  }

  // send whatsapp to user to notify payment
  await sendWhatsappMessage(user.phoneNumber, `¡${user.name} gracias por realizar el pago! Ya hemos verificado la información del mismo. Su orden será enviada en el transcurso de 24 horas.`)

  // send whatsapp to admin to notify payment
  await sendWhatsappMessage(`${phoneNumberAdmin.phoneNumber}`, `¡${user.name} ha realizado un pago!`)

  // send sms to user to notify payment
  await sendSmsMessage(user.phoneNumber, `¡${user.name} gracias por realizar el pago! Ya hemos verificado la información del mismo. Su orden será enviada en el transcurso de 24 horas.`)

  // send sms to admin to notify payment
  await sendSmsMessage(`${phoneNumberAdmin.phoneNumber}`, `¡${user.name} ha realizado un pago!`)

  // send email to user to notify payment
  await sendEmail({
    email: user.email,
    subject: 'Pago confirmado',
    message: `
      <p>Hola</p>
      <p>¡${user.name} gracias por realizar el pago! Ya hemos verificado la información del mismo. Su orden será enviada en el transcurso de 24 horas.</p>
      <p>SLDS</p>
      `
  })

  // send email to admin to notify payment
  await sendEmail({
    email: emailAdmin.email,
    subject: `Pago de ${user.name} confirmado`,
    message: `
      <p>Hola</p>
      <p>¡${user.name} ha realizado un pago!</p>
      <p>Prepara su pedido.</p>
      <p>SLDS</p>
      `
  })
}
