import { ProductGrid, Title } from '@/components'
import { initialData } from '@/seed/seed'

const products = initialData.products

export default function ShopPage() {
  return (
    <>
      <Title
        title="Tienda de ropa"
        subtitle="Toda la ropa que necesitas para estar a la moda."
        className="mb-2" />

      <ProductGrid products={products} />
    </>
  )
}
