import { notFound } from 'next/navigation'
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from '@/components'
import { titleFont } from '@/config/fonts'
import { initialData } from '@/seed/seed'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params
  const product = initialData.products.find(product => product.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className='mt5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>

      {/* mobile slideshow */}
      <div className='col-span-1 md:col-span-2'>
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className='block md:hidden'
        />
      </div>

      {/* desktop sideshow */}
      <div className='col-span-1 md:col-span-2 bg-slate-200'>
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className='hidden md:block'
        />
      </div>

      {/* details */}
      <div className="col-span-1 px-5 bg-blue-200">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">$ {product.price}</p>

        {/* color selector */}
        {/* size selector */}
        <SizeSelector selectedSize={product.sizes[2]} availableSizes={product.sizes} />
        {/* count selector */}
        <QuantitySelector quantity={3} />

        {/* button */}
        <button className='btn-primary my-5'>Agregar al carrito</button>

        {/* description */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
