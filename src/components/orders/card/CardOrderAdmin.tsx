'use client'

import { CopyIcon, EyeIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { IoCardOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { deleteOrderById } from '@/actions'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  order: {
    id: string
    name: string
    isPaid: boolean
  }
}

export const CardOrderAdmin = ({ order }: Props) => {
  const { name, id, isPaid } = order
  const openConfirmationDelete = () => {
    toast('Eliminar pedido', {
      description: `¿Estás seguro? Se eliminara el pedido #${id.split('-').at(-1)} el inventario se actualizara`,
      position: 'top-right',
      duration: Infinity,
      className: 'grid grid-cols-[1fr,110px] items-start justify-center text-sm p-2 col-span-2',
      classNames: {
        content: 'flex items-start justify-center text-sm col-span-4 p-2'
      },
      actionButtonStyle: {
        color: 'white',
        backgroundColor: '#1E40AF',
        font: 'message-box',
        padding: '0.5rem 1rem'
      },
      action: {
        label: 'Confirmar',
        onClick: async () => { await handleDeleteOrder(id) }
      },
      cancel:
      {
        label: 'Cancelar',
        onClick: () => { toast.dismiss() }
      },
      cancelButtonStyle: {
        color: 'white',
        backgroundColor: 'red',
        font: 'message-box',
        padding: '0.5rem 1rem'
      }
    })
  }

  const handleDeleteOrder = async (orderId: string) => {
    const { ok, message } = await deleteOrderById(orderId)

    if (!ok) {
      toast.error(message, {
        position: 'top-right'
      })
      return
    }

    toast.success(message, {
      position: 'top-right'
    })
  }

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
                  <span className='text-green-800'>Pagada</span>
                </>)
              : (
                <>
                  <IoCardOutline className="text-red-800" />
                  <span className='text-red-800'>No Pagada</span>
                </>)}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="h-8 gap-1">
            <Link
              href={`/orders/${id}`}
              className="hover:underline flex items-center gap-2">
              <EyeIcon className="h-3.5 w-3.5" />
              <span className='hidden min-[500px]:block'>Ver pedido</span>
            </Link>
          </Button>
          <Button
            onClick={() => {
              openConfirmationDelete()
            }}
            size="sm"
            variant="destructive"
            className="h-8 gap-1">
            <TrashIcon className="h-3.5 w-3.5" />
            <span className="hover:underline hidden min-[500px]:block">Eliminar</span>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
