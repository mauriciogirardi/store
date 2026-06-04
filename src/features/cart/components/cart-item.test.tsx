import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CartItems } from './cart-item'

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: React.ComponentProps<'img'>) => (
    // biome-ignore lint/performance/noImgElement: test
    <img src={src} alt={alt} {...props} />
  ),
}))

const product = {
  id: 1,
  title: 'Wireless Headphones',
  description: 'High quality wireless headphones with noise cancellation.',
  price: 49.99,
  image: '/headphones.jpg',
  category: 'electronics',
  rating: { rate: 4.5, count: 200 },
}

const defaultProps = {
  product,
  quantity: 1,
  onIncrease: vi.fn(),
  onDecrease: vi.fn(),
  onRemove: vi.fn(),
}

describe('CartItems', () => {
  it('should render the product title', () => {
    render(<CartItems {...defaultProps} />)
    expect(screen.getByRole('heading', { name: product.title })).toBeInTheDocument()
  })

  it('should render the product description', () => {
    render(<CartItems {...defaultProps} />)
    expect(screen.getByText(product.description)).toBeInTheDocument()
  })

  it('should render the product image with correct alt text', () => {
    render(<CartItems {...defaultProps} />)
    expect(screen.getByRole('img', { name: product.title })).toBeInTheDocument()
  })

  it('should render the total price', () => {
    render(<CartItems {...defaultProps} quantity={2} />)
    expect(screen.getByText(/total price/i, { selector: '.sr-only' })).toBeInTheDocument()
  })

  it('should not show unit price when quantity is 1', () => {
    render(<CartItems {...defaultProps} quantity={1} />)
    expect(screen.queryByText(/unit price/i, { selector: '.sr-only' })).not.toBeInTheDocument()
  })

  it('should show unit price when quantity is greater than 1', () => {
    render(<CartItems {...defaultProps} quantity={2} />)
    expect(screen.getByText(/unit price/i, { selector: '.sr-only' })).toBeInTheDocument()
  })

  it('should call onIncrease when increase button is clicked', async () => {
    const onIncrease = vi.fn()
    render(<CartItems {...defaultProps} onIncrease={onIncrease} />)
    await userEvent.click(
      screen.getByRole('button', { name: `Increase quantity of ${product.title}` }),
    )
    expect(onIncrease).toHaveBeenCalledOnce()
  })

  it('should call onDecrease when decrease button is clicked', async () => {
    const onDecrease = vi.fn()
    render(<CartItems {...defaultProps} quantity={2} onDecrease={onDecrease} />)
    await userEvent.click(
      screen.getByRole('button', { name: `Decrease quantity of ${product.title}` }),
    )
    expect(onDecrease).toHaveBeenCalledOnce()
  })

  it('should call onRemove when remove button is clicked', async () => {
    const onRemove = vi.fn()
    render(<CartItems {...defaultProps} onRemove={onRemove} />)
    await userEvent.click(screen.getByRole('button', { name: `Remove ${product.title} from cart` }))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it('should disable the decrease button when quantity equals the minimum', () => {
    render(<CartItems {...defaultProps} quantity={1} />)
    expect(
      screen.getByRole('button', { name: `Decrease quantity of ${product.title}` }),
    ).toBeDisabled()
  })

  it('should disable the increase button when quantity reaches the maximum', () => {
    render(<CartItems {...defaultProps} quantity={12} />)
    expect(
      screen.getByRole('button', { name: `Increase quantity of ${product.title}` }),
    ).toBeDisabled()
  })

  it('should show an error alert when quantity reaches the maximum', () => {
    render(<CartItems {...defaultProps} quantity={12} />)
    expect(screen.getByRole('alert')).toHaveTextContent(
      'You have reached the maximum quantity allowed for this item.',
    )
  })

  it('should not show an error alert when quantity is below the maximum', () => {
    render(<CartItems {...defaultProps} quantity={5} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
