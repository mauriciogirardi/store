import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { QuantitySelector } from './quantity-selector'

const defaultProps = {
  quantity: 2,
  label: 'Wireless Headphones',
  onIncrease: vi.fn(),
  onDecrease: vi.fn(),
  onRemove: vi.fn(),
}

describe('QuantitySelector', () => {
  it('should render the current quantity', () => {
    render(<QuantitySelector {...defaultProps} quantity={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('should render the fieldset with an accessible label', () => {
    render(<QuantitySelector {...defaultProps} />)
    expect(
      screen.getByRole('group', { name: `Quantity of ${defaultProps.label}` }),
    ).toBeInTheDocument()
  })

  it('should call onIncrease when increase button is clicked', async () => {
    const onIncrease = vi.fn()
    render(<QuantitySelector {...defaultProps} onIncrease={onIncrease} />)
    await userEvent.click(screen.getByRole('button', { name: `Increase quantity of ${defaultProps.label}` }))
    expect(onIncrease).toHaveBeenCalledOnce()
  })

  it('should call onDecrease when decrease button is clicked', async () => {
    const onDecrease = vi.fn()
    render(<QuantitySelector {...defaultProps} onDecrease={onDecrease} />)
    await userEvent.click(screen.getByRole('button', { name: `Decrease quantity of ${defaultProps.label}` }))
    expect(onDecrease).toHaveBeenCalledOnce()
  })

  it('should call onRemove when remove button is clicked', async () => {
    const onRemove = vi.fn()
    render(<QuantitySelector {...defaultProps} onRemove={onRemove} />)
    await userEvent.click(screen.getByRole('button', { name: `Remove ${defaultProps.label} from cart` }))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it('should disable the decrease button when quantity equals min', () => {
    render(<QuantitySelector {...defaultProps} quantity={1} min={1} />)
    expect(
      screen.getByRole('button', { name: `Decrease quantity of ${defaultProps.label}` }),
    ).toBeDisabled()
  })

  it('should not disable the decrease button when quantity is above min', () => {
    render(<QuantitySelector {...defaultProps} quantity={3} min={1} />)
    expect(
      screen.getByRole('button', { name: `Decrease quantity of ${defaultProps.label}` }),
    ).not.toBeDisabled()
  })

  it('should disable the increase button when quantity equals max', () => {
    render(<QuantitySelector {...defaultProps} quantity={10} max={10} />)
    expect(
      screen.getByRole('button', { name: `Increase quantity of ${defaultProps.label}` }),
    ).toBeDisabled()
  })

  it('should not disable the increase button when quantity is below max', () => {
    render(<QuantitySelector {...defaultProps} quantity={5} max={10} />)
    expect(
      screen.getByRole('button', { name: `Increase quantity of ${defaultProps.label}` }),
    ).not.toBeDisabled()
  })

  it('should not disable the decrease button when min is not provided', () => {
    render(<QuantitySelector {...defaultProps} quantity={1} />)
    expect(
      screen.getByRole('button', { name: `Decrease quantity of ${defaultProps.label}` }),
    ).not.toBeDisabled()
  })

  it('should not disable the increase button when max is not provided', () => {
    render(<QuantitySelector {...defaultProps} quantity={100} />)
    expect(
      screen.getByRole('button', { name: `Increase quantity of ${defaultProps.label}` }),
    ).not.toBeDisabled()
  })

  it('should show an error alert when error prop is provided', () => {
    render(<QuantitySelector {...defaultProps} error="Maximum quantity reached." />)
    expect(screen.getByRole('alert')).toHaveTextContent('Maximum quantity reached.')
  })

  it('should not show an error alert when error prop is not provided', () => {
    render(<QuantitySelector {...defaultProps} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
