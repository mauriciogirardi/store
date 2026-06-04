import { describe, expect, it } from 'vitest'
import { calcTotalPrice, calcTotalQuantity } from './cart'

const item = (price: number, quantity: number) => ({
  id: 1,
  title: 'Product',
  description: '',
  price,
  image: '',
  category: '',
  rating: { rate: 0, count: 0 },
  quantity,
})

describe('calcTotalQuantity', () => {
  it('should return 0 for an empty array', () => {
    expect(calcTotalQuantity([])).toBe(0)
  })

  it('should return the quantity of a single item', () => {
    expect(calcTotalQuantity([item(10, 3)])).toBe(3)
  })

  it('should sum quantities across multiple items', () => {
    expect(calcTotalQuantity([item(10, 2), item(20, 5)])).toBe(7)
  })
})

describe('calcTotalPrice', () => {
  it('should return 0 for an empty array', () => {
    expect(calcTotalPrice([])).toBe(0)
  })

  it('should return price times quantity for a single item', () => {
    expect(calcTotalPrice([item(10, 3)])).toBe(30)
  })

  it('should sum price times quantity across multiple items', () => {
    expect(calcTotalPrice([item(10, 2), item(5, 4)])).toBe(40)
  })

  it('should handle decimal prices correctly', () => {
    expect(calcTotalPrice([item(9.99, 2)])).toBeCloseTo(19.98)
  })
})
