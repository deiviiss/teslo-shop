import clsx from 'clsx'
import Image from 'next/image'
import { IoCardOutline } from 'react-icons/io5'
import { Title } from '@/components'
import { initialData } from '@/seed/seed'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

interface Props {
  params: {
    id: string
  }
}

export default function OrderByIdPage({ params }: Props) {
  const { id } = params

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} subtitle="Estos son los datos de tu orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* cart */}
          <div className="flex flex-col mt-5">
            <div
              className={
                clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  {
                    'bg-red-500': false,
                    'bg-green-700': true
                  }
                )
              }
            >
              <IoCardOutline size={30} className='mr-2' />
              <span>Pendiente de pago</span>
            </div>

            {/* items */}
            {
              productsInCart.map(product => (
                <div key={product.slug} className="flex flex-col mt-5">

                  <Image
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="">
                    <p className="">{product.title}</p>
                    <p className="">$ {product.price} x 3</p>
                    <p className='font-bold'>Subtotal: $ {product.price * 3}</p>

                  </div>
                </div>
              ))
            }
          </div>

          {/* summary */}
          <div className='bg-white rounded-xl shadow-xl p-7'>

            <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
            <div className="mb-10">
              <p>David Hilera</p>
              <p>Av. Siempre Viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldía Cuauhtémoc</p>
              <p>Ciudad de México, CDMX</p>
              <p>C.P. 12345</p>
              <p>123.123.123</p>
            </div>

            {/* divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              <span className='text-right'>No. Productos</span>
              <span className='text-right'>3 artículos</span>

              <span className='text-right'>Subtotal</span>
              <span className='text-right'>$ 100</span>

              <span className='text-right'>Impuestos (15%)</span>
              <span className='text-right'>$ 100</span>

              <span className='mt-5 text-2xl text-right'>Total</span>
              <span className='mt-5 text-2xl text-right'>$ 100</span>
            </div>

            <div className='mt-5 mb-2 w-full'>

              <div
                className={
                  clsx(
                    'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                    {
                      'bg-red-500': false,
                      'bg-green-700': true
                    }
                  )
                }
              >
                <IoCardOutline size={30} className='mr-2' />
                <span>Pendiente de pago</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div >
  )
}
