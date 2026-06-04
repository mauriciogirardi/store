import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Rating } from './rating'

describe('Rating', () => {
  it('should render the aria-label with rate and count', () => {
    render(<Rating rating={{ rate: 4.3, count: 120 }} />)
    expect(
      screen.getByRole('img', { name: 'Rating: 4.3 out of 5 stars, based on 120 reviews' }),
    ).toBeInTheDocument()
  })

  it('should display the rate formatted to one decimal place', () => {
    render(<Rating rating={{ rate: 4, count: 10 }} />)
    expect(screen.getByText('4.0')).toBeInTheDocument()
  })

  it('should display the count formatted in pt-BR locale', () => {
    render(<Rating rating={{ rate: 3.5, count: 1500 }} />)
    expect(screen.getByText(/1\.500/)).toBeInTheDocument()
  })

  it('should render full stars equal to the floored rate', () => {
    const { container } = render(<Rating rating={{ rate: 3.7, count: 10 }} />)
    const filledOverlays = container.querySelectorAll('[style*="width: 100%"]')
    expect(filledOverlays).toHaveLength(3)
  })

  it('should render a partial star when rate has a decimal part', () => {
    const { container } = render(<Rating rating={{ rate: 3.7, count: 10 }} />)
    const partialOverlay = container.querySelector('[style*="width: 70%"]')
    expect(partialOverlay).toBeInTheDocument()
  })

  it('should not render any partial star when rate is a whole number', () => {
    const { container } = render(<Rating rating={{ rate: 4, count: 10 }} />)
    const allOverlays = container.querySelectorAll('[style]')
    const partialOverlays = Array.from(allOverlays).filter(
      (el) => !el.getAttribute('style')?.includes('width: 100%'),
    )
    expect(partialOverlays).toHaveLength(0)
  })

  it('should apply custom className', () => {
    render(<Rating rating={{ rate: 4, count: 10 }} className="custom-class" />)
    expect(screen.getByRole('img')).toHaveClass('custom-class')
  })

  it('should forward additional props to the wrapper div', () => {
    render(<Rating rating={{ rate: 4, count: 10 }} data-testid="rating" />)
    expect(screen.getByTestId('rating')).toBeInTheDocument()
  })
})
