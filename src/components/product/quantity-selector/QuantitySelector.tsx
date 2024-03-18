'use client'
import { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface QuantitySelectorProps {
  quantity: number
}

export const QuantitySelector = ({ quantity }: QuantitySelectorProps) => {
  const [count, setCount] = useState(quantity)

  const onQuantityChange = (value: number) => {
    if (count + value < 1) return

    if (count + value > 5) return

    setCount(count + value)
  }

  const onQuantityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim() === '' ? 1 : parseInt(event.target.value, 10)

    if (isNaN(value) || value < 1) {
      setCount(1)
      return
    }

    setCount(value)
  }

  return (
    <>
      <div className="flex">
        <button onClick={() => { onQuantityChange(-1) }}>
          <IoRemoveCircleOutline size={30} />
        </button>

        <input
          className='w-20 mx-3 px-5 bg-gray-100 text-center rounded'
          value={count}
          onChange={onQuantityInputChange}
        />

        < button onClick={() => { onQuantityChange(+1) }}>
          <IoAddCircleOutline size={30} />
        </button>
      </div >
      {
        count > 5 && (
          <p className='text-red-500 text-sm p-1'>Cantidad máxima permitida: 5</p>
        )
      }
    </>
  )
}
