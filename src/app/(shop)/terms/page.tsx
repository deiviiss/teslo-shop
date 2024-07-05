import Link from 'next/link'
import { Title, ButtonBackPage } from '@/components'

export default async function TermsPage() {
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='max-w-[920px] mx-auto'>
          <Title title="Términos y condiciones" subtitle='' />
          <div className='px-3 py-4'>
            <p>
              Bienvenido a nuestro sitio web. Este es un ecommerce de ejemplo que simula el flujo de compra. Al utilizar nuestros servicios, acepta los siguientes términos y condiciones de uso. Si no está de acuerdo con estos términos, le recomendamos no utilizar nuestros servicios.
            </p>
          </div>

          <div className='px-3'>
            <h2 className='text-2xl font-bold py-4 text-black'>
              1. Servicios Simulados
            </h2>
            <p className='pb-4'>
              Este sitio web es una simulación de un ecommerce y los productos agregados al carrito no serán entregados. Las transacciones realizadas son solo de prueba y no tienen validez comercial.
            </p>

            <h2 className='text-2xl font-bold py-4 text-black'>
              2. Registro de Usuarios
            </h2>
            <p className='pb-4'>
              Al registrarse, los usuarios aceptan que la base de datos puede ser reiniciada en cualquier momento, lo que puede resultar en la pérdida de la información registrada.
            </p>

            <h2 className='text-2xl font-bold py-4 text-black'>
              3. Privacidad de los Datos
            </h2>
            <p className='pb-4'>
              Para ofrecer nuestros servicios de manera efectiva, recopilamos y almacenamos información personal como la dirección de entrega, correo electrónico y número de teléfono. Puede obtener más información sobre cómo manejamos sus datos en nuestra {' '}
              <Link className='hover:underline hover:text-warning font-semibold' href={'/privacy'}>
                Política de Privacidad
              </Link>.
            </p>

            <h2 className='text-2xl font-bold py-4 text-black'>
              4. Modificaciones de los Términos y Condiciones
            </h2>
            <p className='pb-4'>
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Le recomendamos revisar periódicamente esta página para estar al tanto de los cambios. El uso continuo de nuestros servicios después de los cambios constituirá su aceptación de los términos modificados.
            </p>

            <h2 className='text-2xl font-bold py-4 text-black'>
              5. Ley Aplicable
            </h2>
            <p className='pb-4'>
              Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes aplicables. Cualquier disputa que surja en relación con estos términos será resuelta exclusivamente por los tribunales competentes.
            </p>
          </div>

          <div className='flex justify-center w-full gap-4  m-8 text-center mx-auto'>
            <Link className='btn-primary' target='_blank' href={'https://wa.me/529811250049'}>
              Contáctanos
            </Link>

            <ButtonBackPage />
          </div>
        </div>
      </div>
    </>
  )
}
