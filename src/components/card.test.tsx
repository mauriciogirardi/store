import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from './card'

describe('Card', () => {
  it('should renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('should applies default classes', () => {
    render(<Card data-testid="card" />)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-white', 'rounded-md', 'shadow-md', 'p-4')
  })

  it('should merges custom className with default classes', () => {
    render(<Card data-testid="card" className="custom-class" />)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class', 'bg-white')
  })

  it('should forwards additional props to the div element', () => {
    render(<Card data-testid="card" id="my-card" />)
    expect(screen.getByTestId('card')).toHaveAttribute('id', 'my-card')
  })

  it('should renders as a div element', () => {
    render(<Card data-testid="card" />)
    expect(screen.getByTestId('card').tagName).toBe('DIV')
  })
})
