import { redirect } from 'next/navigation'
import { getPaginatedUsers } from '@/actions'
import { Pagination, Title, UsersTable } from '@/components'

export const revalidate = 0

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function UsersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { ok, users = [], totalPages } = await getPaginatedUsers({ page })

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" subtitle='Lista de ordenes de todos los usuarios' />

      <div className="mb-10 overflow-auto">
        <UsersTable users={users} />

        <Pagination totalPages={totalPages || 1} />
      </div>
    </>
  )
}
