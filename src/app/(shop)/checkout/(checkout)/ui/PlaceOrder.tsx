'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { placeOrder } from '@/actions'

import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

const MySwal = withReactContent(Swal)

export const PlaceOrder = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const NoticeConfirm = () => {
    return (
      <p>Pedido generado con éxito, procede con el pago</p>
    )
  }

  const noticeConfirmOrder = async (id?: string) => {
    if (!id) return

    await MySwal.fire({
      html: <NoticeConfirm />,
      background: '#ffffff',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ver pedido',
      color: '#000000',
      preConfirm: () => {
        router.replace(`/orders/${id}`)
      }
    })
  }

  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)
  const address = useAddressStore(state => state.address)

  const { subtotal, tax, total, itemsInCart } = useCartStore(state => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true)
    if (itemsInCart === 0) {
      redirect('/empty')
    }
  }, [])

  if (!loaded) {
    return (
      <p>Cargando...</p>
    )
  }

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    const productToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    //! server action
    const rta = await placeOrder(productToOrder, address)

    // product sold out
    if (!rta.ok) {
      setIsPlacingOrder(false)
      setErrorMessage(String(rta.message))
      return
    }

    // order success
    clearCart()
    noticeConfirmOrder(rta.order?.id)
  }

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>

      <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
      <p className='text-xl'>{address.firstName} {address.lastName}</p>
      <div className="mb-10">
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
        <p>{address.city}, {address.country}</p>
      </div>

      {/* divider */}
      <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

      <h2 className='text-2xl mb-2'>Resumen de orden</h2>

      <div className='grid grid-cols-2'>
        <span className='text-right'>No. Productos</span>
        <span className='text-right'>{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artíulos`}</span>

        <span className='text-right'>Subtotal</span>
        <span className='text-right'>{currencyFormat(subtotal)}</span>

        <span className='text-right'>IVA (16%)</span>
        <span className='text-right'>{currencyFormat(tax)}</span>

        <span className='mt-5 text-2xl text-right'>Total</span>
        <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>
      </div>

      <div className='mt-5 mb-2 w-full'>

        <p className="mb-5">
          <span>
            Al hacer clic en &quot;Confirmar compra&quot;, aceptas nuestros <Link href="/terms" className="underline">términos y condiciones</Link> y <Link href={'/privacy'} className='underline'>política de privacidad</Link>
          </span>
        </p>

        <p className='pb-4 text-red-500'>{errorMessage}</p>

        <button
          disabled={isPlacingOrder}
          className={
            clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder
            })
          }
          onClick={async () => { await onPlaceOrder() }}
        >
          Confirmar compra
        </button>
      </div>
    </div >
  )
}
