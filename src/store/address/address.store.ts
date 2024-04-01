import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type UserAddress } from '@/interfaces'

interface State {
  address: UserAddress

  // methods
  setAddress: (address: State['address']) => void
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: ''
      },
      setAddress: (address) => {
        set({ address })
      }

    }),
    {
      name: 'address-storage'
    }
  )
)
