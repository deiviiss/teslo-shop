'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'
import { logout } from '@/actions'
import { useUiStore } from '@/store'

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
  const closeMenu = useUiStore((state) => state.closeSideMenu)

  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const isAdmin = session?.user?.role === 'admin'

  return (
    <div>
      {
        isSideMenuOpen && (
          <>
            {/* background */}
            <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'>
            </div>
            {/* blur */}
            <div onClick={closeMenu} className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'>
            </div>
          </>
        )
      }

      <nav className={
        clsx(
          'fixed p-5 right-0 top-0 w-full md:w-[350px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen
          }
        )
      }>

        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full bg-gray-50 rounded pl-10 pr-10 border-b-2 text-xl border-gray-300 focus:outline-none focus:border-blue-500'
          />
        </div>

        {/* menú */}
        <div>

          {
            !isAuthenticated
              ? (
                <Link href='/auth/login'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                  <IoLogInOutline size={30} />
                  <span className='ml-3 text-xl'>Ingresar</span>
                </Link>)
              : (
                <>
                  <Link href='/profile'
                    onClick={() => { closeMenu() }}
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                    <IoPersonOutline size={30} />
                    <span className='ml-3 text-xl'>Perfil</span>
                  </Link>

                  <Link href='/orders'
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                    <IoTicketOutline size={30} />
                    <span className='ml-3 text-xl'>Ordenes</span>
                  </Link>

                  <button
                    onClick={() => { logout() }}
                    className='flex items-center w-full mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                    <IoLogOutOutline size={30} />
                    <span className='ml-3 text-xl'>Salir</span>
                  </button>
                </>)
          }

          {/* divisor */}
          <div className="w-full h-px bg-gray-100 rounded transition-all"></div>
        </div>

        {
          isAdmin && (
            <>
              <Link href='/'
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoShirtOutline size={30} />
                <span className='ml-3 text-xl'>Productos</span>
              </Link>

              <Link href='/'
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoTicketOutline size={30} />
                <span className='ml-3 text-xl'>Ordenes</span>
              </Link>

              <Link href='/'
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoPeopleOutline size={30} />
                <span className='ml-3 text-xl'>Usuarios</span>
              </Link>
            </>)
        }

      </nav >

    </div >
  )
}
