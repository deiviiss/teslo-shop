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

  const products = await prisma.productStock.findMany({
    where: {
      size: {
        in: productsId.map(product => product.size)
      },
      product: {
        id: {
          in: productsId.map(product => product.productId)
        }
      }
    },
    include: {
      product: true
    }
  })

  const totalItemsInOrder = productsId.reduce((count, product) => count + product
    .quantity, 0)

  const { subTotal, tax, total } = productsId.reduce((totals, items) => {
    const productQuantity = items.quantity
    const product = products.find(product => product.product.id === items.productId && product.size === items.size)

    if (!product) throw new Error('Product not found - 500')

    const subTotal = product.product.price * productQuantity

    totals.subTotal += subTotal
    totals.tax += subTotal * 0.16
    totals.total += subTotal + subTotal * 0.16

    return totals
  }, { subTotal: 0, tax: 0, total: 0 })

  const orderItems = productsId.map(p => ({
    quantity: p.quantity,
    size: p.size,
    productId: p.productId,
    price: products.find(product => product.productId === p.productId)?.product.price || 0
  }))

  const { country, userId, ...restAddress } = address

  // transaction db
  try {
    const prismaTX = await prisma.$transaction(async (tx) => {
      // Update stock
      const updatedProductsPromises = products.map(async (product) => {
        const size = productsId.find(item => item.productId === product.productId && item.size === product.size)?.size

        const quantity = productsId.find(item => item.productId === product.productId && item.size === product.size)?.quantity

        if (!quantity || quantity <= 0) {
          throw new Error('La cantidad no puede ser 0')
        }

        if (!size) {
          throw new Error('Talla no encontrada')
        }

        const productStock = await tx.productStock.findFirst({
          where: {
            productId: product.productId,
            size
          },
          select: {
            id: true,
            inStock: true
          }
        })

        // check if all products are in stock
        if (productStock === null || productStock.inStock === 0) {
          throw new Error(`Producto ${product.product.title} con talla ${size} agotado`)
        }

        if (productStock.inStock < quantity) {
          throw new Error(`Producto ${product.product.title} con talla ${size} no tiene suficiente stock`)
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
