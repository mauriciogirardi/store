import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Header } from './header'

vi.mock('@/stores/cart', () => ({
  useCartStore: vi.fn().mockReturnValue(0),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.ComponentProps<'a'> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/'),
}))

describe('Header', () => {
  it('should render a link to the store home page', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /store/i })).toHaveAttribute('href', '/')
  })

  it('should render the cart button', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument()
  })

  it('should render the Account label', () => {
    render(<Header />)
    expect(screen.getByText('Account')).toBeInTheDocument()
  })

  it('should render inside a header element', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
