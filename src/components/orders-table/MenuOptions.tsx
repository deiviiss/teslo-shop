'use client'

import { type Status } from '@prisma/client'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { IoTrashOutline, IoEllipsisHorizontalSharp, IoSwapHorizontalOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { changeOrderStatus, deleteOrderById, getOrderById } from '@/actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { statusNameSpanish } from '@/utils'

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

  const openConfirmationChangeStatus = async () => {
    const { order } = await getOrderById(orderId)

    if (!order) {
      toast.error('Pedido no encontrado', {
        position: 'top-right',
        duration: 2000
      })
      return
    }

    let status: Status = order.status

    if (order.status === 'unpaid') {
      toast.error('El pedido no se ha pagado no se puede cambiar', {
        position: 'top-right',
        duration: 2000
      })
      return
    }

    if (order.status === 'paided') {
      status = 'shipped'
    }

    if (order.status === 'shipped') {
      status = 'delivered'
    }

    if (order.status === 'delivered') {
      toast.error('Pedido entregado no se puede cambiar', {
        position: 'top-right',
        duration: 2000
      })
      return
    }

    toast('Cambiar status', {
      description: `¿Estás seguro? Se cambiara el estado del pedido #${orderId.split('-').at(-1)} a ${statusNameSpanish[status]}`,
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
        onClick: async () => { await handleChangeStatus(orderId, status) }
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

  const handleChangeStatus = async (orderId: string, status: Status) => {
    const { ok, message } = await changeOrderStatus(orderId, status)

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
        <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          <span className="sr-only">Open menu</span>
          <IoEllipsisHorizontalSharp className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <EyeIcon className="h-3.5 w-3.5" />
          <Button
            size='sm'
            variant='ghost'
            className='h-6 gap-1'
            asChild
          >
            <Link
              href={`/orders/${orderId}`}
            >
              Ver pedido
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IoSwapHorizontalOutline className="h-3.5 w-3.5" />
          <Button
            size='sm'
            variant='ghost'
            className='h-6 gap-1'
            onClick={() => { openConfirmationChangeStatus() }}
          >
            Cambiar estado
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IoTrashOutline className="h-3.5 w-3.5" />
          <Button
            size='sm'
            variant='ghost'
            className='h-6'
            onClick={() => { openConfirmationDelete() }}
          >
            Eliminar pedido
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
