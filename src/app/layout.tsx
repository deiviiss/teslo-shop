import type { Metadata } from 'next'
import { inter } from '@/config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Teslo | Shop'
  },
  description: 'Tienda de ropa online. Encuentra la ropa que necesitas para estar a la moda.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
