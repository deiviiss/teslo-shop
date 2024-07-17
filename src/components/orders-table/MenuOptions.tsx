'use client'

import Link from 'next/link'
import { IoTrashOutline, IoEllipsisHorizontalSharp, IoAlertCircleOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { deleteOrderById } from '@/actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Props {
  orderId: string
}

export const MenuOptions = ({ orderId }: Props) => {
  const openConfirmationDelete = () => {
    toast('Eliminar pedido', {
      description: `¿Estás seguro? Se eliminara el pedido #${orderId.split('-').at(-1)} el inventario se actualizara`,
      position: 'top-right',
      duration: Infinity,
      className: 'grid grid-cols-[1fr,110px] items-start justify-center text-sm p-2 col-span-2 pb-4',
      classNames: {
        content: 'flex items-start justify-center text-sm col-span-4 p-2'
      },
      actionButtonStyle: {
        color: 'white',
        backgroundColor: '#1E40AF',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      },
      action: {
        label: 'Confirmar',
        onClick: async () => { await handleDeleteOrder(orderId) }
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
        padding: '0.5rem 1rem',
        height: '2rem'
      }
    })
  }

  const handleDeleteOrder = async (orderId: string) => {
    const { ok, message } = await deleteOrderById(orderId)

    if (!ok) {
      toast.error(message, {
        position: 'top-right',
        duration: 2000
      })
      return
    }

    toast.success(message, {
      position: 'top-right',
      duration: 2000
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <IoEllipsisHorizontalSharp className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Seleccione</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IoAlertCircleOutline className='h-4 w-4 mr-2' />
          <Link
            href={`/orders/${orderId}`}
            className="hover:underline">
            Ver pedido
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IoTrashOutline className='h-4 w-4 mr-2' />
          <button
            className="hover:underline"
            onClick={() => { openConfirmationDelete() }}
          >
            Eliminar pedido
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
