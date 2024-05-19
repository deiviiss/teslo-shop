'use server'

import { Gender, type Size, type Product } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'

// config cloudinary //! Chance for folder name
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(0))),
  sizes: z.coerce
    .string()
    .transform(val => val.split(',')),
  categoryId: z.string().uuid(),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
})

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success) {
    return {
      ok: false,
      message: 'Error al crear el producto'
    }
  }

  const product = productParsed.data
  // config slug format
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()

  const { id, ...restProduct } = product

  // transaction for upload images, product
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product
      const tagsArray = restProduct.tags.split(',').map(tag => tag.trim().toLocaleLowerCase())

      if (id) {
        product = await tx.product.update({
          where: { id },
          data: {
            ...restProduct,
            sizes: {
              set: restProduct.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        })

        if (formData.getAll('images')) {
          const images = await uploadImages(formData.getAll('images') as File[])

          if (!images) {
            throw new Error('Error al subir las imagenes')
          }

          await prisma.productImage.createMany({
            data: images.map(image => ({
              productId: product.id,
              url: image ?? ''
            }))
          })
        }

        return { product }
      }

      if (!id) {
        product = await tx.product.create({
          data: {
            ...restProduct,
            sizes: {
              set: restProduct.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        })

        if (formData.getAll('images')) {
          const images = await uploadImages(formData.getAll('images') as File[])

          if (!images) {
            throw new Error('Error al subir las imagenes, rollingback transaction...')
          }

          await tx.productImage.createMany({
            data: images.map(image => ({
              productId: product.id,
              url: image ?? ''
            }))
          })
        }

        return { product }
      }
    })

    // revalidate paths in all routes where product name exist
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${prismaTx?.product.slug}`)
    revalidatePath(`/products/${prismaTx?.product.slug}`)

    return {
      ok: false,
      product: prismaTx?.product
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al crear/actualizar el producto'
    }
  }
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPomises = images.map(async (image: File) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')

        return await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`).then(r => r.secure_url)
      } catch (error) {
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPomises)

    return uploadedImages
  } catch (error) {
    return null
  }
}
