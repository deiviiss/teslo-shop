import { notFound, redirect } from 'next/navigation'
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
    redirect('/')
  }

  const processedProducts = products.map(product => ({
    ...product,
    description: product.description || 'No description provided'
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
