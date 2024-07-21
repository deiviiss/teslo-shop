'use server'

import { sendWhatsappMessage, sendSmsMessage, getUserSessionServer, getPhoneNumberAdmin, getEmailAdmin, sendEmail } from '@/actions'

export const sendNotificationsShipment = async () => {
  const user = await getUserSessionServer()
  const { phoneNumberAdmin } = await getPhoneNumberAdmin()
  const { emailAdmin } = await getEmailAdmin()

  if (!user || phoneNumberAdmin === null || emailAdmin === null) {
    return {
      ok: false,
      message: 'No se pudo enviar la notificación de envío'
    }
  }

  // send whatsapp to user to notify shipment
  await sendWhatsappMessage(user.phoneNumber, `¡${user.name}, su pedido ha sido enviado y llegará al final del día! Si no recibe su pedido hoy, por favor contáctenos.`)

  // send whatsapp to admin to notify shipment
  await sendWhatsappMessage(`${phoneNumberAdmin.phoneNumber}`, `¡El pedido de ${user.name} ha sido enviado y debe llegar al final del día! Si no se ha recibido, por favor revise.`)

  // send sms to user to notify shipment
  await sendSmsMessage(user.phoneNumber, `¡${user.name}, su pedido ha sido enviado y llegará al final del día! Si no recibe su pedido hoy, por favor contáctenos.`)

  // send sms to admin to notify shipment
  await sendSmsMessage(`${phoneNumberAdmin.phoneNumber}`, `¡El pedido de ${user.name} ha sido enviado y debe llegar al final del día! Si no se ha recibido, por favor revise.`)

  // send email to user to notify shipment
  await sendEmail({
    email: user.email,
    subject: 'Pedido enviado',
    message: `
      <p>Hola ${user.name},</p>
      <p>Su pedido ha sido enviado y llegará al final del día. Si no recibe su pedido hoy, por favor contáctenos.</p>
      <p>Gracias por su compra.</p>
      <p>SLDS</p>
      `
  })

  // send email to admin to notify shipment
  await sendEmail({
    email: emailAdmin.email,
    subject: `Pedido de ${user.name} enviado`,
    message: `
      <p>Hola,</p>
      <p>El pedido de ${user.name} ha sido enviado y debe llegar al final del día. Si no se ha recibido, por favor revise.</p>
      <p>SLDS</p>
      `
  })
}
