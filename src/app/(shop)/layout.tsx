import { Footer, Sidebar, TopMenu } from '@/components'

export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className='px-1 md:px-12 lg:px-24'>
        {children}
      </div>
      <Footer />
    </main>
  )
}
