import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { useCartStore } from '@/stores/cart'
import { AddCartButton } from './add-cart-button'

HTMLDialogElement.prototype.showModal = vi.fn()
HTMLDialogElement.prototype.close = vi.fn()

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: React.ComponentProps<'img'>) => (
    // biome-ignore lint/performance/noImgElement: test
    <img src={src} alt={alt} {...props} />
  ),
}))

const product = {
  id: 1,
  title: 'Wireless Headphones',
  description: 'Great headphones.',
  price: 49.99,
  image: '/headphones.jpg',
  category: 'electronics',
  rating: { rate: 4.5, count: 200 },
}

describe('AddCartButton', () => {
  it('should render the Add to Cart button', () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<AddCartButton product={product} />)
    expect(screen.getByRole('button', { name: `Add ${product.title} to cart` })).toBeInTheDocument()
  })

  it('should open the modal when Add to Cart is clicked', async () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<AddCartButton product={product} />)
    await userEvent.click(screen.getByRole('button', { name: `Add ${product.title} to cart` }))
    expect(screen.getByRole('heading', { name: 'Product added successfully', hidden: true })).toBeInTheDocument()
  })

  it('should add the product to the cart when clicked', async () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<AddCartButton product={product} />)
    await userEvent.click(screen.getByRole('button', { name: `Add ${product.title} to cart` }))
    expect(useCartStore.getState().items).toHaveLength(1)
  })

  it('should close the modal when Continue Shopping is clicked', async () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<AddCartButton product={product} />)
    await userEvent.click(screen.getByRole('button', { name: `Add ${product.title} to cart` }))
    await userEvent.click(screen.getByRole('button', { name: 'Continue Shopping', hidden: true }))
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled()
  })

  it('should navigate to cart when Go to Cart is clicked', async () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<AddCartButton product={product} />)
    await userEvent.click(screen.getByRole('button', { name: `Add ${product.title} to cart` }))
    await userEvent.click(screen.getByRole('button', { name: 'Go to Cart', hidden: true }))
    expect(mockPush).toHaveBeenCalledWith('/cart')
  })

  it('should show Max Quantity label when item is at max quantity', () => {
    useCartStore.setState({
      items: [{ ...product, quantity: 12 }],
      quantity: 12,
      total: product.price * 12,
    })
    render(<AddCartButton product={product} />)
    expect(screen.getByRole('button', { name: `Add ${product.title} to cart` })).toHaveTextContent('Max Quantity')
  })

  it('should disable the button when item is at max quantity', () => {
    useCartStore.setState({
      items: [{ ...product, quantity: 12 }],
      quantity: 12,
      total: product.price * 12,
    })
    render(<AddCartButton product={product} />)
    expect(screen.getByRole('button', { name: `Add ${product.title} to cart` })).toBeDisabled()
  })

  it('should show the max quantity modal title when button is clicked at max quantity', async () => {
    useCartStore.setState({
      items: [{ ...product, quantity: 12 }],
      quantity: 12,
      total: product.price * 12,
    })
    render(<AddCartButton product={product} />)
    await userEvent.click(screen.getByRole('button', { name: `Add ${product.title} to cart` }))
    expect(screen.getByRole('heading', { name: 'Maximum quantity (12) reached', hidden: true })).toBeInTheDocument()
  })

  it('should not add to cart when item is already at max quantity', async () => {
    useCartStore.setState({
      items: [{ ...product, quantity: 12 }],
      quantity: 12,
      total: product.price * 12,
    })
    render(<AddCartButton product={product} />)
    await userEvent.click(screen.getByRole('button', { name: `Add ${product.title} to cart` }))
    expect(useCartStore.getState().items[0].quantity).toBe(12)
  })
})
