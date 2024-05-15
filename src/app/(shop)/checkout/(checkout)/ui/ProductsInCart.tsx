'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)

  const productsInCart = useCartStore(state => state.cart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <>
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex flex-col mt-5">

            <Image
              src={`/products/${product.image}`}
              alt={product.title}
              width={100}
              height={100}
              className='mr-5 rounded'
            />

            <div>
              <span>
                {product.size} - {product.title} ({product.quantity})
              </span>
              <p className='font-semibold'>{currencyFormat(product.price * product.quantity)}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}