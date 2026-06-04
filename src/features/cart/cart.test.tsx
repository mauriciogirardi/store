import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CartFeature } from './cart'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.ComponentProps<'a'> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: React.ComponentProps<'img'>) => (
    // biome-ignore lint/performance/noImgElement: test
    <img src={src} alt={alt} {...props} />
  ),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

import { useCartStore } from '@/stores/cart'

const product = {
  id: 1,
  title: 'Wireless Headphones',
  description: 'Great headphones.',
  price: 49.99,
  image: '/headphones.jpg',
  category: 'electronics',
  rating: { rate: 4.5, count: 200 },
}

function seedCart(items: { quantity: number }[] = []) {
  useCartStore.setState({
    items: items.map((item, i) => ({ ...product, id: i + 1, quantity: item.quantity })),
    quantity: items.reduce((acc, item) => acc + item.quantity, 0),
    total: items.reduce((acc, item) => acc + item.quantity * product.price, 0),
  })
}

describe('CartFeature', () => {
  it('should render EmptyCart when there are no items', () => {
    seedCart([])
    render(<CartFeature />)
    expect(screen.getByRole('heading', { name: 'Your cart is empty' })).toBeInTheDocument()
  })

  it('should render cart items when the cart has products', () => {
    seedCart([{ quantity: 1 }])
    render(<CartFeature />)
    expect(screen.getByRole('heading', { name: product.title })).toBeInTheDocument()
  })

  it('should render the cart summary when the cart has products', () => {
    seedCart([{ quantity: 1 }])
    render(<CartFeature />)
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
  })

  it('should render one cart item per product in the store', () => {
    seedCart([{ quantity: 1 }, { quantity: 2 }])
    render(<CartFeature />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2)
  })

  it('should increase quantity when increase button is clicked', async () => {
    seedCart([{ quantity: 1 }])
    render(<CartFeature />)
    await userEvent.click(screen.getByRole('button', { name: `Increase quantity of ${product.title}` }))
    const fieldset = screen.getByRole('group', { name: `Quantity of ${product.title}` })
    expect(within(fieldset).getByText('2')).toBeInTheDocument()
  })

  it('should decrease quantity when decrease button is clicked above min', async () => {
    seedCart([{ quantity: 3 }])
    render(<CartFeature />)
    await userEvent.click(screen.getByRole('button', { name: `Decrease quantity of ${product.title}` }))
    const fieldset = screen.getByRole('group', { name: `Quantity of ${product.title}` })
    expect(within(fieldset).getByText('2')).toBeInTheDocument()
  })

  it('should remove item when remove button is clicked', async () => {
    seedCart([{ quantity: 2 }])
    render(<CartFeature />)
    await userEvent.click(screen.getByRole('button', { name: `Remove ${product.title} from cart` }))
    expect(screen.getByRole('heading', { name: 'Your cart is empty' })).toBeInTheDocument()
  })

  it('should show the max quantity error in the summary when an item reaches the limit', () => {
    seedCart([{ quantity: 12 }])
    render(<CartFeature />)
    expect(screen.getByText(/some items have reached the maximum quantity/i)).toBeInTheDocument()
  })

  it('should disable checkout when an item reaches the max quantity limit', () => {
    seedCart([{ quantity: 12 }])
    render(<CartFeature />)
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeDisabled()
  })
})
