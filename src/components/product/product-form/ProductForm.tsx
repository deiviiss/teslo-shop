'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { createUpdateProduct, deleteProductImage } from '@/actions'
import { ProductImage } from '@/components'
import { type ProductImage as ProductWithImage, type Product, type Category } from '@/interfaces'

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] }
  categories: Category[]
  params: {
    slug: string
  }
}

interface FormInputs {
  id?: string
  title: string
  slug: string
  description: string
  price: number
  inStock: number
  sizes: string[]
  tags: string
  categoryId: string
  gender: 'men' | 'women' | 'kid' | 'unisex'

  images?: FileList
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const noticeFailSaved = async () => {
  await Swal.fire({
    text: 'No se pudo guardar el producto, intente nuevamente',
    background: '#ffffff',
    icon: 'error',
    cancelButtonColor: '#d33',
    showConfirmButton: false,
    cancelButtonText: 'Cerrar',
    showCancelButton: true,
    color: '#000000'
  })
}

const noticeSuccessSaved = async () => {
  await Swal.fire({
    text: 'Producto guardado correctamente',
    background: '#ffffff',
    icon: 'success',
    showConfirmButton: false,
    color: '#000000',
    timer: 1500
  })
}

const noticeSuccessDeleteImage = async () => {
  await Swal.fire({
    text: 'Producto eliminado correctamente',
    background: '#ffffff',
    showConfirmButton: false,
    color: '#000000',
    position: 'top-end',
    timer: 1500
  })
}

export const ProductForm = ({ product, categories, params }: Props) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      description: product.description || undefined,
      tags: product.tags ? product.tags.join(', ') : '',
      sizes: product.sizes ?? [],
      images: undefined
    }
  })

  const onSizeSelector = (size: string) => {
    const sizes = new Set(getValues('sizes'))
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    setValue('sizes', Array.from(sizes))

    // const sizes = getValues('sizes')

    // if (sizes.includes(size)) {
    //   setValue('sizes', sizes.filter(s => s !== size))
    // }

    // if (!sizes.includes(size)) {
    //   setValue('sizes', [...sizes, size])
    // }
  }

  watch('sizes')

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true)
    const formData = new FormData()

    const { images, ...productToSave } = data

    if (productToSave.id) formData.append('id', productToSave.id)
    formData.append('title', productToSave.title)
    formData.append('slug', productToSave.slug)
    formData.append('description', productToSave.description)
    formData.append('price', productToSave.price.toString())
    formData.append('inStock', productToSave.inStock.toString())
    formData.append('sizes', productToSave.sizes.toString())
    formData.append('tags', productToSave.tags)
    formData.append('categoryId', productToSave.categoryId)
    formData.append('gender', productToSave.gender)

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    const { ok, product } = await createUpdateProduct(formData)

    if (!ok) {
      noticeFailSaved()
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    noticeSuccessSaved()
    router.replace(`/admin/product/${product?.slug}`)
  }

  const handleDeleteImageClick = async (id: string, url: string) => {
    setIsSubmitting(true)
    const rta = await deleteProductImage(id, url)
    if (!rta?.ok) {
      noticeFailSaved()
      setIsSubmitting(false)
      return
    }
    setIsSubmitting(false)
    noticeSuccessDeleteImage()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* texts */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('title', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('slug', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Precio</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('tags', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Género</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('gender', { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('categoryId', { required: true })}
          >
            <option value="">[Seleccione]</option>
            {
              categories.map(category => (
                <option className='capitalize' key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
        </div>
      </div>

      {/* size and photo selector */}
      <div className="w-full">

        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('inStock', { required: true, min: 0 })}
          />
        </div>

        {/* as checkboxes */}
        <div className="flex flex-col">

          <span>Tallas</span>
          <div className="flex flex-wrap mb-2">

            {
              sizes.map(size => (
                <div
                  key={size}
                  onClick={() => { onSizeSelector(size) }}
                  className={
                    clsx(
                      'p-2 border rounded-md mr-2 mb-2 cursor-pointer w-14 transition-all text-center',
                      {
                        'bg-blue-500 text-white': getValues('sizes').includes(size),
                        'bg-gray-200': !getValues('sizes').includes(size)
                      }
                    )
                  }>
                  <span>{size}</span>
                </div>
              ))
            }

          </div>

          {/* images */}
          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
              {...register('images')}
            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 overflow-auto h-96">
            {
              product.ProductImage &&
              product.ProductImage.map(image => (
                <div
                  className='flex flex-col items-center justify-center'
                  key={image.id}>
                  <ProductImage
                    src={image.url}
                    alt={product.title ? product.title : 'Producto'}
                    width={200}
                    height={200}
                    className="rounded-t shadow-md" />

                  <button
                    disabled={isSubmitting}
                    onClick={() => { handleDeleteImageClick(image.id, image.url) }}
                    type='button'
                    className={
                      clsx(
                        'w-full p-2 mt-2 rounded-b border border-t-0',
                        {
                          'btn-disabled': isSubmitting,
                          'btn-danger': !isSubmitting
                        }
                      )
                    }>
                    Eliminar
                  </button>
                </div>
              ))
            }
          </div>

        </div>
      </div>

      <div className='flex gap-2 w-full text-center'>
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            clsx(
              'w-full mt-4',
              {
                'btn-disabled': !isValid || isSubmitting,
                'btn-primary': isValid && !isSubmitting
              }
            )
          }>
          Guardar
        </button>
        <Link href="/admin/products"
          className={
            clsx(
              'w-full mt-4',
              {
                'btn-disabled': params.slug !== 'create' && (!isValid || isSubmitting),
                'btn-danger': params.slug === 'create' || (isValid && !isSubmitting)
              }
            )
          }>
          Cancelar
        </Link>
      </div>
    </form >
  )
}
