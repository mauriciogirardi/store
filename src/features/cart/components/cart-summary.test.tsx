import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CartSummary } from './cart-summary'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

const defaultProps = {
  quantity: 2,
  total: 99.98,
  hasMaxQuantityError: false,
}

describe('CartSummary', () => {
  it('should render the Order Summary heading', () => {
    render(<CartSummary {...defaultProps} />)
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
  })

  it('should display the quantity', () => {
    render(<CartSummary {...defaultProps} quantity={3} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should display the formatted total', () => {
    render(<CartSummary {...defaultProps} total={49.99} />)
    expect(screen.getByText(/49[,.]99/)).toBeInTheDocument()
  })

  it('should render the Continue Shopping button', () => {
    render(<CartSummary {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'Continue Shopping' })).toBeInTheDocument()
  })

  it('should render the Checkout button', () => {
    render(<CartSummary {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeInTheDocument()
  })

  it('should navigate to the store when Continue Shopping is clicked', async () => {
    render(<CartSummary {...defaultProps} />)
    await userEvent.click(screen.getByRole('button', { name: 'Continue Shopping' }))
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('should disable the Checkout button when quantity is zero', () => {
    render(<CartSummary {...defaultProps} quantity={0} />)
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeDisabled()
  })

  it('should disable the Checkout button when hasMaxQuantityError is true', () => {
    render(<CartSummary {...defaultProps} hasMaxQuantityError={true} />)
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeDisabled()
  })

  it('should enable the Checkout button when quantity is above zero and no error', () => {
    render(<CartSummary {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'Checkout' })).not.toBeDisabled()
  })

  it('should show the max quantity error message when hasMaxQuantityError is true', () => {
    render(<CartSummary {...defaultProps} hasMaxQuantityError={true} />)
    expect(screen.getByText(/some items have reached the maximum quantity/i)).toBeInTheDocument()
  })

  it('should not show the max quantity error message when hasMaxQuantityError is false', () => {
    render(<CartSummary {...defaultProps} hasMaxQuantityError={false} />)
    expect(screen.queryByText(/some items have reached the maximum quantity/i)).not.toBeInTheDocument()
  })
})
