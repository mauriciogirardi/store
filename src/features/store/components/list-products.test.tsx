import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useCartStore } from '@/stores/cart'
import { ListProduct } from './list-products'

HTMLDialogElement.prototype.showModal = vi.fn()
HTMLDialogElement.prototype.close = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: React.ComponentProps<'img'>) => (
    // biome-ignore lint/performance/noImgElement: test
    <img src={src} alt={alt} {...props} />
  ),
}))

const products = [
  {
    id: 1,
    title: 'Wireless Headphones',
    description: 'Great headphones.',
    price: 49.99,
    image: '/headphones.jpg',
    category: 'electronics',
    rating: { rate: 4.5, count: 200 },
  },
  {
    id: 2,
    title: 'Running Shoes',
    description: 'Comfortable shoes.',
    price: 89.99,
    image: '/shoes.jpg',
    category: "men's clothing",
    rating: { rate: 3.8, count: 95 },
  },
]

describe('ListProduct', () => {
  it('should render a list item for each product', () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<ListProduct products={products} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(products.length)
  })

  it('should render each product title', () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<ListProduct products={products} />)
    expect(screen.getByRole('heading', { name: 'Wireless Headphones' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Running Shoes' })).toBeInTheDocument()
  })

  it('should render each product image with correct alt text', () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<ListProduct products={products} />)
    expect(screen.getByRole('img', { name: 'Wireless Headphones' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Running Shoes' })).toBeInTheDocument()
  })

  it('should render the formatted price for each product', () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<ListProduct products={products} />)
    expect(screen.getByText(/49[,.]99/, { selector: 'p.font-bold' })).toBeInTheDocument()
    expect(screen.getByText(/89[,.]99/, { selector: 'p.font-bold' })).toBeInTheDocument()
  })

  it('should render the category tag for each product', () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<ListProduct products={products} />)
    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.getByText("men's clothing")).toBeInTheDocument()
  })

  it('should render an Add to Cart button for each product', () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<ListProduct products={products} />)
    expect(screen.getByRole('button', { name: `Add ${products[0].title} to cart` })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: `Add ${products[1].title} to cart` })).toBeInTheDocument()
  })

  it('should render an empty list when products array is empty', () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<ListProduct products={[]} />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('should apply custom className to the list', () => {
    useCartStore.setState({ items: [], quantity: 0, total: 0 })
    render(<ListProduct products={[]} className="custom-class" data-testid="list" />)
    expect(screen.getByTestId('list')).toHaveClass('custom-class')
  })
})
