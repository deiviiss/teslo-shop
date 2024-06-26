import Link from 'next/link'
import { PlaceOrder } from './ui/PlaceOrder'
import { ProductsInCart } from './ui/ProductsInCart'
import { Title } from '@/components'

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-1 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title title='Verificar Compra' subtitle="Estamos confirmado tu pedido." />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* cart */}
          <div className="flex flex-col mt-5">
            <span className=" text-xl">Ajustar compra</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>

            {/* items */}
            <ProductsInCart />
          </div>

          {/* summary */}
          <PlaceOrder />

        </div>
      </div>
    </div>
  )
}
