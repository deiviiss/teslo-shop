import { notFound } from 'next/navigation'
import { ProductGrid, Title } from '@/components'
import { type ValidCategory } from '@/interfaces'
import { initialData } from '@/seed/seed'

const products = initialData.products
interface CategoryPageProps {
  params: {
    id: ValidCategory
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const id = params.id

  const productsFilter = products.filter(product => product.gender === id)

  if (productsFilter.length === 0) {
    notFound()
  }

  const labels: Record<ValidCategory, string> = {
    men: 'de hombre',
    women: 'de mujer',
    kid: 'de niño',
    unisex: 'unisex'
  }

  const description: Record<ValidCategory, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Unisex'
  }

  return (
    <>
      <Title
        title={`${description[id]}`}
        subtitle={`Toda la ropa ${labels[id]} que necesitas para estar a la moda.`}
        className="mb-2" />

      <ProductGrid products={productsFilter} />
    </>
  )
}
