'use client'

import { useState } from 'react'
import { QuantitySelector, SizeSelector } from '@/components'
import { type Size, type Product, type CartProduct } from '@/interfaces'
import { useCartStore } from '@/store'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [attempted, setAttempted] = useState<boolean>(false)

  const AddToCart = () => {
    setAttempted(true)

    if (!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size,
      quantity
    }

    addProductToCart(cartProduct)
    setAttempted(false)
    setQuantity(1)
    setSize(undefined)
    // Todo: show success message use sweet
    alert('Producto agregado al carrito')
  }

  return (
    <>
      {/* color selector */}

      {
        attempted && !size && (
          <span className='mb-10 text-red-500 fade-in'>
            Selecciona una talla*
          </span>
        )
      }

      {/* size selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={setSize}
      />

      {/* count selector */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* button */}
      <button
        onClick={AddToCart}
        className='btn-primary my-5'>Agregar al carrito</button>

    </>
  )
}
