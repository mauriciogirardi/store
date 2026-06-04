import { describe, expect, it } from 'vitest'
import { formatMoney } from './format-money'

describe('formatMoney', () => {
  it('should include the EUR currency symbol', () => {
    expect(formatMoney(10)).toMatch(/€/)
  })

  it('should format zero', () => {
    expect(formatMoney(0)).toMatch(/0/)
  })

  it('should format a value with two decimal places', () => {
    expect(formatMoney(49.99)).toMatch(/49[,.]99/)
  })

  it('should format a whole number with two decimal places', () => {
    expect(formatMoney(50)).toMatch(/50[,.]00/)
  })

  it('should format a large value', () => {
    expect(formatMoney(1000)).toMatch(/1[.,\s]?000/)
  })

  it('should return a string', () => {
    expect(typeof formatMoney(10)).toBe('string')
  })
})
