'use server'

import { getUserSessionServer } from '@/actions'
import { type UserAddress, type Size } from '@/interfaces'
import prisma from '@/lib/prisma'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (productsId: ProductToOrder[], address: UserAddress) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'No se ha podido obtener la información del usuario'
    }
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map(product => product.productId)
      }
    }
  })

  const totalItemsInOrder = productsId.reduce((count, product) => count + product
    .quantity, 0)

  const { subTotal, tax, total } = productsId.reduce((totals, items) => {
    const productQuantity = items.quantity
    const product = products.find(product => product.id === items.productId)

    if (!product) throw new Error('Product not found - 500')

    const subTotal = product.price * productQuantity

    totals.subTotal += subTotal
    totals.tax += subTotal * 0.16
    totals.total += subTotal + subTotal * 0.16

    return totals
  }, { subTotal: 0, tax: 0, total: 0 })

  const orderItems = productsId.map(p => ({
    quantity: p.quantity,
    size: p.size,
    productId: p.productId,
    price: products.find(product => product.id === p.productId)?.price ?? 0
  }))

  const { country, userId, ...restAddress } = address

  // transaction db
  try {
    const prismaTX = await prisma.$transaction(async (tx) => {
      // Update stock
      const updatedProductsPromises = products.map(async (product) => {
        const size = productsId.find(item => item.productId === product.id)?.size
        const quantity = productsId.find(item => item.productId === product.id)?.quantity

        if (!quantity || quantity <= 0) {
          throw new Error('La cantidad de productos no puede ser 0')
        }

        if (!product.id) {
          throw new Error('Producto no encontrado')
        }

        if (!size) {
          throw new Error('Talla no encontrada')
        }

        const productStock = await tx.productStock.findFirst({
          where: {
            productId: product.id,
            size
          },
          select: {
            id: true,
            inStock: true
          }
        })

        // check if all products are in stock
        if (productStock === null || productStock.inStock === 0) {
          throw new Error(`Producto ${product.title} con talla ${size} agotado`)
        }

        return await tx.productStock.update({
          where: { id: productStock.id },
          data: {
            inStock: {
              decrement: quantity
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)

      // create order
      const order = await tx.order.create({
        data: {
          userId: user.id,
          itemsInOrder: totalItemsInOrder,
          subtotal: subTotal,
          tax,
          total,

          orderItem: {
            createMany: {
              data: orderItems
            }
          }
        }
      })

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: address.country,
          orderId: order.id
        }
      })

      return {
        order,
        updatedProducts,
        orderAddress
      }
    })

    return { ok: true, order: prismaTX.order }
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message }
    }
    return { ok: false, message: '' }
  }
}
