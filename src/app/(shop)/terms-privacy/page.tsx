import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'
import { Title } from '@/components'

export default async function TermsPrivacyPage() {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/')
  }

  return (
    <div>
      <Title title="Terminos y condiciones - Política de privacidad" subtitle='Construyendo' />

    </div>
  )
}
