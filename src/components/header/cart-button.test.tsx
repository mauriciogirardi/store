import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CartButton } from './cart-button'

vi.mock('@/stores/cart', () => ({
  useCartStore: vi.fn(),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.ComponentProps<'a'> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

import { useCartStore } from '@/stores/cart'

const mockUseCartStore = vi.mocked(useCartStore)

describe('CartButton', () => {
  it('should render a link to the cart page', () => {
    mockUseCartStore.mockReturnValue(0)
    render(<CartButton />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/cart')
  })

  it('should have aria-label "Cart" when quantity is zero', () => {
    mockUseCartStore.mockReturnValue(0)
    render(<CartButton />)
    expect(screen.getByRole('link', { name: 'Cart' })).toBeInTheDocument()
  })

  it('should not render the badge when quantity is zero', () => {
    mockUseCartStore.mockReturnValue(0)
    const { container } = render(<CartButton />)
    expect(container.querySelector('[aria-hidden="true"] ~ div')).toBeNull()
  })

  it('should render the badge with quantity when quantity is greater than zero', () => {
    mockUseCartStore.mockReturnValue(3)
    render(<CartButton />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should have aria-label with item count when quantity is 1', () => {
    mockUseCartStore.mockReturnValue(1)
    render(<CartButton />)
    expect(screen.getByRole('link', { name: 'Cart, 1 item' })).toBeInTheDocument()
  })

  it('should have aria-label with items count when quantity is greater than 1', () => {
    mockUseCartStore.mockReturnValue(5)
    render(<CartButton />)
    expect(screen.getByRole('link', { name: 'Cart, 5 items' })).toBeInTheDocument()
  })

  it('should display "99+" in the badge when quantity exceeds 99', () => {
    mockUseCartStore.mockReturnValue(100)
    render(<CartButton />)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('should have aria-label "more than 99 items" when quantity exceeds 99', () => {
    mockUseCartStore.mockReturnValue(100)
    render(<CartButton />)
    expect(screen.getByRole('link', { name: 'Cart, more than 99 items' })).toBeInTheDocument()
  })
})
