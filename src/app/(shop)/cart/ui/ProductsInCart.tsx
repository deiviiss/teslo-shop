'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { QuantitySelector } from '@/components'
import { useCartStore } from '@/store'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)

  const productsInCart = useCartStore(state => state.cart)

  const updateProductQuantity = useCartStore(state => state.updateProductQuantity)

  const removeProductFromCart = useCartStore(state => state.removeProductFromCart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <p>Loading...</p>
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
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="">
              <Link
                className='hover:underline cursor-pointer'
                href={`/product/${product.slug}`}>
                <p className="">{product.title}</p>
              </Link>
              <p>{product.size}</p>
              <p className="">$ {product.price}</p>
              <QuantitySelector quantity={product.quantity} onQuantityChange={(value) => { updateProductQuantity(product, value) }} />

              <button onClick={() => { removeProductFromCart(product) }} className='underline mt-3'>Remover</button>
            </div>
          </div>
        ))
      }
    </>
  )
}
