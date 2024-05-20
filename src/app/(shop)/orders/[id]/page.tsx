import { redirect } from 'next/navigation'
import { getOrderById } from '@/actions'
import { OrderStatus, PayPalButton, ProductImage, Title } from '@/components'
import { currencyFormat } from '@/utils'

interface Props {
  params: {
    id: string
  }
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params

  const { ok, order } = await getOrderById(id)

  if (!ok || !order) {
    redirect('/')
  }

  const orderItem = order.orderItem
  const orderAddress = order.orderAddresses
  return (
    <div className="flex justify-center items-center mb-72 px-1 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title className='' title={`Orden #${id.split('-').at(-1)}`} subtitle="Estos son los datos de tu pedido" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* cart */}
          <div className="flex flex-col mt-5">

            <OrderStatus isPaid={order.isPaid} />

            {/* items */}
            {
              orderItem.map((item, index) => (
                <div key={index} className="flex flex-col mt-5">
                  <ProductImage
                    src={item.product.ProductImage[0].url}
                    alt={item.product.title}
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div>
                    <span>{item.size} - {item.product.title}</span>
                    <p>{currencyFormat(item.price)} x {item.quantity}</p>
                    <p className='font-bold'>Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* summary */}
          <div className='bg-white rounded-xl shadow-xl p-7 pb-1'>

            <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
            <div className="mb-10">
              <p>{orderAddress?.firstName} {orderAddress?.lastName}</p>
              <p>{orderAddress?.address}</p>
              <p>{orderAddress?.city}</p>
              <p>CP {orderAddress?.postalCode}</p>
              <p>{orderAddress?.phone}</p>
            </div>

            {/* divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              <span className='text-right'>No. Productos</span>
              <span className='text-right'>{order.itemsInOrder === 1 ? '1 artículo' : `${order.itemsInOrder} artíulos`} artículos</span>

              <span className='text-right'>Subtotal</span>
              <span className='text-right'>{currencyFormat(order.subtotal)}</span>

              <span className='text-right'>IVA (16%)</span>
              <span className='text-right'>{currencyFormat(order.tax)}</span>

              <span className='mt-5 text-2xl text-right'>Total</span>
              <span className='mt-5 text-2xl text-right'>{currencyFormat(order.total)}</span>
            </div>

            {
              order.isPaid
                ? (
                  <div className='mt-10'>
                    <OrderStatus isPaid={order.isPaid} />
                  </div>)
                : (
                  <PayPalButton orderId={order.id} amount={order.total} />)
            }

          </div>

        </div>
      </div>
    </div >
  )
}
