import { notFound } from 'next/navigation'
import { getPaginationProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'

interface Props {
  searchParams: {
    page?: string
    take?: string
  }
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1

  const result = await getPaginationProductsWithImages({ page })

  if (!result) {
    return notFound()
  }

  const { products, totalPages } = result

  if (products.length === 0) {
    return (
      <div className='flex flex-col gap-3 items-center justify-center h-[300px] max-w-[920px] my-5 text-center mx-auto'>

        <Title title='No hay productos' subtitle='' />

      </div>
    )
  }

  const processedProducts = products.map(product => ({
    ...product,
    description: product.description || 'Sin descripción'
  }))

  return (
    <>
      <Title
        title="Tienda de ropa"
        subtitle="Toda la ropa que necesitas para estar a la moda."
        className="mb-2" />

      <ProductGrid products={processedProducts} />

      <Pagination totalPages={totalPages} />
    </>
  )
}
