'use server'

import qrcode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'

// Configuración de las opciones para el cliente
const clientOptions = {
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
}

const client = new Client(clientOptions)

client.on('qr', qr => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Client is ready!')
})

client.on('message_create', message => {
  console.log(message.body)

  if (message.body === '!ping') {
    message.reply('pong')
  }
})

client.initialize()

export default client
