import { notFound } from 'next/navigation'
import { getPaginationProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { type ValidGender } from '@/interfaces'

interface PageProps {
  params: {
    gender: ValidGender
  }
  searchParams: {
    page?: string
    take?: string
  }
}

export default async function GenderByPage({ params, searchParams }: PageProps) {
  const { gender } = params
  const page = searchParams.page ? Number(searchParams.page) : 1

  // const allowedCategories = ['men', 'women', 'kid']
  // if (!allowedCategories.includes(gender)) {
  //   notFound()
  // }

  const result = await getPaginationProductsWithImages({ page, gender })

  if (!result) {
    notFound()
  }

  const { products, totalPages } = result

  const labels: Record<ValidGender, string> = {
    men: 'de hombre',
    women: 'de mujer',
    kid: 'de niño',
    unisex: 'unisex'
  }

  const description: Record<ValidGender, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Unisex'
  }

  const processedProducts = products.map(product => ({
    ...product,
    description: product.description || 'No description provided'
  }))

  return (
    <>
      <Title
        title={`${description[gender]}`}
        subtitle={`Toda la ropa ${labels[gender]} que necesitas para estar a la moda.`}
        className="mb-2" />

      <ProductGrid products={processedProducts} />

      <Pagination totalPages={totalPages} />
    </>
  )
}
