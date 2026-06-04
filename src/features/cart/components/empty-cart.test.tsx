import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { EmptyCart } from './empty-cart'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.ComponentProps<'a'> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('EmptyCart', () => {
  it('should render the empty cart heading', () => {
    render(<EmptyCart />)
    expect(screen.getByRole('heading', { name: 'Your cart is empty' })).toBeInTheDocument()
  })

  it('should render the descriptive message', () => {
    render(<EmptyCart />)
    expect(screen.getByText(/start shopping/i)).toBeInTheDocument()
  })

  it('should render a link to the store', () => {
    render(<EmptyCart />)
    expect(screen.getByRole('link', { name: 'Browse products' })).toHaveAttribute('href', '/')
  })
})
