import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StoreSkeletonFeature } from './store-skeleton'

describe('StoreSkeletonFeature', () => {
  it('should render with aria-busy true', () => {
    render(<StoreSkeletonFeature />)
    expect(screen.getByLabelText('Loading products...')).toHaveAttribute('aria-busy', 'true')
  })

  it('should render 8 product skeleton cards', () => {
    const { container } = render(<StoreSkeletonFeature />)
    const cards = container.querySelectorAll('[aria-hidden="true"]')
    expect(cards).toHaveLength(8)
  })
})
