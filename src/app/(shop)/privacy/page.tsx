import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'
import { ButtonBackPage, Title } from '@/components'

export default async function PrivacyPage() {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/')
  }
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='max-w-[920px] mx-auto'>

          <Title title="Políticas de privacidad" subtitle='' />

          <div className='px-3 py-4'>
            <p>
              En nuestro sitio web, valoramos y respetamos su privacidad. Esta Política de Privacidad explica cómo recopilamos y utilizamos su información personal a través de nuestro sitio web y los servicios que ofrecemos.
            </p>
          </div>

          <div className='px-3'>
            <h2 className='text-2xl font-bold text-black py-4'>
              1. Información que Recopilamos
            </h2>
            <p className='pb-4'>
              Recopilamos su nombre, dirección de entrega, dirección de correo electrónico y número de teléfono cuando se registra en nuestro sitio web.
            </p>

            <h2 className='text-2xl font-bold text-black py-4'>
              2. Uso de su Información
            </h2>
            <p className='pb-4'>
              Utilizamos su información personal para los siguientes fines:
            </p>
            <ul className='list-disc pl-6'>
              <li>Para procesar simulaciones de pedidos.</li>
              <li>Para gestionar su cuenta y ofrecerle soporte.</li>
              <li>Para recopilar y analizar feedback y comentarios proporcionados por usted para mejorar nuestros servicios.</li>
            </ul>

            <h2 className='text-2xl font-bold text-black py-4'>
              3. Protección de su Información
            </h2>
            <p className='pb-4'>
              Tomamos medidas de seguridad para proteger su información contra el acceso no autorizado y garantizar su confidencialidad. Utilizamos prácticas estándar de la industria para proteger sus datos.
            </p>

            <h2 className='text-2xl font-bold text-black py-4'>
              4. Acceso y Control de su Información
            </h2>
            <p className='pb-4'>
              Usted tiene el derecho de acceder, corregir, actualizar o eliminar su información personal en cualquier momento. Puede hacerlo a través de su cuenta en nuestro sitio web o poniéndose en contacto con nosotros directamente.
            </p>

            <h2 className='text-2xl font-bold text-black py-4'>
              5. Cambios en esta Política de Privacidad
            </h2>
            <p className='pb-4'>
              Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Si realizamos cambios sustanciales, notificaremos dichos cambios en nuestro sitio web para mantenerlo informado sobre cómo afectarán a su información personal.
            </p>

            <p>
              Si tiene alguna pregunta sobre esta política de privacidad o cómo manejamos su información, no dude en ponerse en contacto con nosotros a través de nuestro formulario de contacto.
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
