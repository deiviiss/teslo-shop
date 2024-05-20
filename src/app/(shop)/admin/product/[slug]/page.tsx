import { redirect } from 'next/navigation'
import { getCategories, getProductBySlug } from '@/actions'
import { ProductForm, Title } from '@/components'

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  if (!product && slug !== 'create') {
    redirect('/admin/products')
  }

  const title = (slug === 'create') ? 'Crear producto' : 'Editar producto'
  const subtitle = (slug === 'create') ? 'Creación de un nuevo producto' : 'Edición de un producto existente'

  return (
    <>
      <Title title={title} subtitle={subtitle} className=' text-lg' />

      <ProductForm product={product ?? {}} categories={categories ?? []} params={params} />
    </>
  )
}
