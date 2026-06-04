import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CartFeatureSkeleton } from './cart-skeleton'

describe('CartFeatureSkeleton', () => {
  it('should render a section with aria-busy true', () => {
    render(<CartFeatureSkeleton />)
    expect(screen.getByRole('region', { name: 'Loading cart...' })).toHaveAttribute('aria-busy', 'true')
  })

  it('should render 3 cart item skeletons', () => {
    const { container } = render(<CartFeatureSkeleton />)
    const cards = container.querySelectorAll('.col-span-2 > div > div')
    expect(cards).toHaveLength(3)
  })
})
