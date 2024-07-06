import { type Metadata, type ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getPaginationProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { type ValidGender } from '@/interfaces'

interface Props {
  params: {
    gender: ValidGender
  }
  searchParams: {
    page?: string
    take?: string
  }
}

const description: Record<ValidGender, string> = {
  men: 'Hombres',
  women: 'Mujeres',
  kid: 'Niños',
  unisex: 'Unisex'
}

const labels: Record<ValidGender, string> = {
  men: 'de hombre',
  women: 'de mujer',
  kid: 'de niño',
  unisex: 'unisex'
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const gender = params.gender

  return {
    title: `Categoria de ${description[gender]}`,
    description: `Toda la ropa ${labels[gender]} que necesitas para estar a la moda.`,
    openGraph: {
      title: `Categoria de ${description[gender]}`,
      description: `Toda la ropa ${labels[gender]} que necesitas para estar a la moda.`
    }
  }
}

export default async function GenderByPage({ params, searchParams }: Props) {
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
        title={`${description[gender]}`}
        subtitle={`Toda la ropa ${labels[gender]} que necesitas para estar a la moda.`}
        className="mb-2" />

      <ProductGrid products={processedProducts} />

      <Pagination totalPages={totalPages} />
    </>
  )
}
