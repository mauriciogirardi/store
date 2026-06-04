import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { TProduct } from '@/http/get-products'
import { calcTotalPrice, calcTotalQuantity } from '@/utils/cart'

export type CartItem = TProduct & { quantity: number }

type State = {
  items: CartItem[]
  quantity: number
  total: number
}

interface Mutations {
  addToCart: (product: TProduct) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  resetStore: VoidFunction
}

const initialState: State = {
  items: [],
  quantity: 0,
  total: 0,
}

export const useCartStore = create<State & Mutations>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        addToCart: (product) => {
          const { items } = get()
          const existing = items.find((item) => item.id === product.id)

          const updatedItems = existing
            ? items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              )
            : [...items, { ...product, quantity: 1 }]

          set({
            items: updatedItems,
            quantity: calcTotalQuantity(updatedItems),
            total: calcTotalPrice(updatedItems),
          }, false, 'addToCart')
        },

        increaseQuantity: (id) => {
          const { items } = get()
          const updatedItems = items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          )

          set({
            items: updatedItems,
            quantity: calcTotalQuantity(updatedItems),
            total: calcTotalPrice(updatedItems),
          }, false, 'increaseQuantity')
        },

        decreaseQuantity: (id) => {
          const { items } = get()
          const updatedItems = items
            .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter((item) => item.quantity > 0)

          set({
            items: updatedItems,
            quantity: calcTotalQuantity(updatedItems),
            total: calcTotalPrice(updatedItems),
          }, false, 'decreaseQuantity')
        },

        removeFromCart: (id) => {
          const { items } = get()
          const updatedItems = items.filter((item) => item.id !== id)

          set({
            items: updatedItems,
            quantity: calcTotalQuantity(updatedItems),
            total: calcTotalPrice(updatedItems),
          }, false, 'removeFromCart')
        },

        resetStore: () => set(initialState, false, 'resetStore'),
      }),
      { name: 'cart-store' },
    ),
    {
      name: 'CartStore',
      enabled: process.env.NODE_ENV !== 'production',
    },
  ),
)
