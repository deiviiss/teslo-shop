import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'
import { Title } from '@/components'

export const metadata: Metadata = {
  title: 'Perfil de usuario',
  description: 'Contiene la información del usuario.'
}

const ProfilePage = async () => {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/')
  }

  const userName = user?.name || 'Nombre de usuario'
  const userImage = user?.image || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
  const userMail = user?.email || 'Correo electrónico'
  const userPhoneNumber = user?.phoneNumber || 'Número de teléfono'

  return (
    <div className='flex flex-col items-center gap-3 pb-10'>
      <Title title='Perfil' subtitle='' />

      <div className='flex flex-col items-center gap-3 p-3'>

        <Image src={userImage} alt={userName} width={100} height={100} className='rounded-full' />

        <div className='flex flex-col gap-2 my-4'>
          <p><span className='font-semibold'>Nombre:</span> {userName}</p>
          <p><span className='font-semibold'>Correo:</span> {userMail}</p>
          <p><span className='font-semibold'>Teléfono:</span> {userPhoneNumber}</p>

          <Link href='/orders' className='w-full text-center cursor-pointer hover:underline font-medium '>
            <span>Mis ordenes</span>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default ProfilePage
