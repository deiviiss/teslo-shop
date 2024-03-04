import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const id = params.id

  if (id === 'kids') {
    notFound()
  }

  return (
    <div>
      <h1>CategoryPage {id} </h1>
    </div>
  )
}
