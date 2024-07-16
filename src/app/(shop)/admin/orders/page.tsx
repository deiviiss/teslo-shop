import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'
import { getPaginatedOrders, validateUserAdmin } from '@/actions'
import { CardOrderAdmin, MenuOptions, Pagination, Title } from '@/components'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrdersPage({ searchParams }: Props) {
  await validateUserAdmin()

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { ok, orders, totalPages } = await getPaginatedOrders({ page })

  if (!ok) {
    redirect('/auth/login')
  }

  if (orders?.length === 0) {
    return (
      <div className='flex flex-col gap-3 items-center justify-center h-[300px] max-w-[920px] mx-auto my-5 text-center'>

        <h1>No se ha hecho ninguna pedido</h1>

        <Link href="/" className='hover:underline'>
          Haz una compra!
        </Link>

      </div>
    )
  }

  const processOrders = orders?.map(order => {
    const orderItem = {
      id: order.id,
      name: `${order.orderAddresses?.firstName} ${order.orderAddresses?.lastName}`,
      isPaid: order.isPaid
    }

    return orderItem
  })

  return (
    <>
      <Title title="Todos los pedidos" subtitle='Lista de pedidos de todos los usuarios' />

      <div className='sm:hidden w-full mb-10'>
        {processOrders?.map(order => (
          <CardOrderAdmin
            key={order.id}
            order={order} />
        ))}
      </div>

      <div className="hidden sm:block mb-10 overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map(order => (
                <tr
                  key={order.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id.split('-').at(-1)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.orderAddresses?.firstName} {order.orderAddresses?.lastName}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {
                      order.isPaid
                        ? (
                          <>
                            <IoCardOutline className="text-green-800" />
                            <span className='mx-2 text-green-800'>Pagado</span>
                          </>)
                        : (
                          <>
                            <IoCardOutline className="text-red-800" />
                            <span className='mx-2 text-red-800'>No Pagado</span>
                          </>)
                    }

                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 text-center">
                    <MenuOptions orderId={order.id} />
                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>

        <Pagination totalPages={totalPages || 1} />
      </div>
    </>
  )
}
