'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProductImage, QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)

  const productsInCart = useCartStore(state => state.cart)

  const updateProductQuantity = useCartStore(state => state.updateProductQuantity)

  const removeProductFromCart = useCartStore(state => state.removeProductFromCart)

  useEffect(() => {
    setLoaded(true)
    if (productsInCart.length === 0) {
      redirect('/empty')
    }
  }, [productsInCart])

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

            <ProductImage
              src={product.image}
              alt={product.title}
              width={100}
              height={100}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div>
              <Link
                className='hover:underline cursor-pointer'
                href={`/product/${product.slug}`}>
                {product.size} - {product.title}
              </Link>
              <p>{currencyFormat(product.price)}</p>
              <QuantitySelector quantity={product.quantity} onQuantityChange={(value) => { updateProductQuantity(product, value) }} />

              <button onClick={() => { removeProductFromCart(product) }} className='underline mt-3'>Remover</button>
            </div>
          </div>
        ))
      }
    </>
  )
}
