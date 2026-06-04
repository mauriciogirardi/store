import type { CartItem } from '@/stores/cart'

export const calcTotalQuantity = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0)

export const calcTotalPrice = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
