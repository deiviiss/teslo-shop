import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'
import { getOrdersByUser } from '@/actions'
import { Pagination, Title } from '@/components'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { ok, orders, totalPages } = await getOrdersByUser({ page })

  if (!ok) {
    redirect('/auth/login')
  }

  if (orders?.length === 0) {
    return (
      <div className='flex flex-col gap-3 items-center justify-center h-[300px] max-w-[920px] my-5 text-center'>

        <h1>No tienes ordenes registradas</h1>

        <Link href="/" className='hover:underline'>
          Comienza a comprar
        </Link>

      </div>
    )
  }

  return (
    <>
      <Title title="Ordenes" subtitle='Lista de ordenes' />

      <div className="mb-10 overflow-auto">
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
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
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
                            <span className='mx-2 text-green-800'>Pagada</span>
                          </>)
                        : (
                          <>
                            <IoCardOutline className="text-red-800" />
                            <span className='mx-2 text-red-800'>No Pagada</span>
                          </>)
                    }

                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link
                      href={`/orders/${order.id}`}
                      className="hover:underline">
                      Ver orden
                    </Link>
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
