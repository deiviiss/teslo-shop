import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'
import { Title } from '@/components'

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div>
      <Title title="Perfil" subtitle='Datos del perfil' />

      <p>{session?.user.name}</p>
      <p>{session?.user.role}</p>
    </div>
  )
}
