import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  it('should render a div element', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton').tagName).toBe('DIV')
  })

  it('should apply default classes', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('bg-zinc-200', 'animate-pulse', 'rounded-md', 'w-full')
  })

  it('should merge custom className with default classes', () => {
    render(<Skeleton data-testid="skeleton" className="h-10" />)
    const el = screen.getByTestId('skeleton')
    expect(el).toHaveClass('h-10', 'bg-zinc-200')
  })

  it('should forward additional props to the div element', () => {
    render(<Skeleton data-testid="skeleton" id="my-skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('id', 'my-skeleton')
  })
})
