import Link from 'next/link'
import { getPaginationProductsStockWithImages } from '@/actions'
import { Pagination, ProductSearch, ProductTable, Title } from '@/components'

interface Props {
  searchParams: {
    query?: string
    page?: string
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const query = searchParams.query || ''
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginationProductsStockWithImages({ page, query })

  return (
    <>
      <Title title="Matenimiento de productos" subtitle='Lista de todos los productos' />

      <div className='flex justify-end mb-5 gap-2'>
        <ProductSearch placeholder='Buscar producto...' />
        <Link
          className='btn-primary'
          href='/admin/product/create'>
          Crear producto
        </Link>
      </div>

      <div className="mb-10 overflow-auto">
        <ProductTable products={products} />
        {
          products.length > 0 && (
            <Pagination totalPages={totalPages} />
          )
        }
      </div >
    </>
  )
}
