'use client'

import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { tittleFont } from '@/config/fonts'
import { useUiStore } from '@/store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* logo */}
      <div>
        <Link href={'/'}>
          <span className={`${tittleFont.className} antialiased font-bold`}>Teslo | Shop</span>
        </Link>
      </div>

      {/* center menu */}
      <div className='hidden sm:block'>
        <Link href={'/category/men'} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Hombres</Link>
        <Link href={'/category/women'} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Mujeres</Link>
        <Link href={'/category/kids'} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Niños</Link>
      </div>

      {/* search cart menu */}
      <div className='flex items-center'>
        <Link href={'/search'} className='mx-2'>
          <IoSearchOutline className='w-5 h-5'></IoSearchOutline>
        </Link>

        <Link href={'/cart'} className='mx-2'>
          <div className='relative'>
            <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>3</span>
            <IoCartOutline className='w-5 h-5'></IoCartOutline>
          </div>
        </Link>

        <button type='button' onClick={openMenu} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Menú</button>
      </div>
    </nav>
  )
}
