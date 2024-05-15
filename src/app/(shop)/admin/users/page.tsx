import { redirect } from 'next/navigation'
import { getPaginatedUsers } from '@/actions'
import { Pagination, Title, UsersTable } from '@/components'

export const revalidate = 0

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers()

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" subtitle='Lista de ordenes de todos los usuarios' />

      <div className="mb-10">
        <UsersTable users={users} />

        <Pagination totalPages={3} />
      </div>
    </>
  )
}
