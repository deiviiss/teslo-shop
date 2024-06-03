'use server'

import twilio from 'twilio'

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export const sendWhatsappMessage = async (phone: string, message: string) => {
  try {
    await client.messages
      .create({
        body: message,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${phone}`
      })

    return true
  } catch (error) {
    return false
  }
}
