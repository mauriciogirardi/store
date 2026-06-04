import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tag } from './tag'

describe('Tag', () => {
  it('should render the category text', () => {
    render(<Tag category="electronics" />)
    expect(screen.getByText('electronics')).toBeInTheDocument()
  })

  it('should return null when category is not provided', () => {
    const { container } = render(<Tag />)
    expect(container.firstChild).toBeNull()
  })

  it('should return null when category is an empty string', () => {
    const { container } = render(<Tag category="" />)
    expect(container.firstChild).toBeNull()
  })

  it('should apply default classes', () => {
    render(<Tag category="books" />)
    expect(screen.getByText('books')).toHaveClass('bg-blue-500', 'text-white', 'rounded-full', 'capitalize')
  })

  it('should merge custom className with default classes', () => {
    render(<Tag category="books" className="custom-class" />)
    expect(screen.getByText('books')).toHaveClass('custom-class', 'bg-blue-500')
  })

  it('should render as a span element', () => {
    render(<Tag category="clothing" />)
    expect(screen.getByText('clothing').tagName).toBe('SPAN')
  })

  it('should forward additional props to the span element', () => {
    render(<Tag category="toys" data-testid="tag" />)
    expect(screen.getByTestId('tag')).toBeInTheDocument()
  })
})
