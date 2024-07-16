'use client'

import { CopyIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { IoCardOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  order: {
    id: string
    name: string
    isPaid: boolean
  }
}

export const CardOrder = ({ order }: Props) => {
  const { name, id, isPaid } = order

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Orden #{id.split('-').at(-1)}
            <div className="relative">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(id)
                  toast('ID de orden copiado al portapapeles', {
                    position: 'top-right'
                  })
                }}
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 absolute"
              >
                <CopyIcon className="h-3 w-3" />
                <span className="sr-only">Copiar ID de orden</span>
              </Button>
            </div>
          </CardTitle>
          <CardDescription>Cliente: {name}</CardDescription>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {isPaid
              ? (
                <>
                  <IoCardOutline className="text-green-800" />
                  <span className='mx-2 text-green-800'>Pagada</span>
                </>)
              : (
                <>
                  <IoCardOutline className="text-red-800" />
                  <span className='mx-2 text-red-800'>No Pagada</span>
                </>)}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <EyeIcon className="h-3.5 w-3.5" />
            <Link
              href={`/orders/${id}`}
              className="hover:underline hidden min-[500px]:block">
              Ver pedido
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
