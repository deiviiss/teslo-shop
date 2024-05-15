import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'
import { Title } from '@/components'

export default async function ProfilePage() {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/')
  }

  return (
    <div>
      <Title title="Perfil" subtitle='Datos del perfil' />

      <p>{user.name}</p>
      <p>{user.role}</p>
    </div>
  )
}
