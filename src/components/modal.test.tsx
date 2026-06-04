import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Modal } from './modal'

HTMLDialogElement.prototype.showModal = vi.fn()
HTMLDialogElement.prototype.close = vi.fn()

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  children: <p>Modal content</p>,
}

describe('Modal', () => {
  it('should render children', () => {
    render(<Modal {...defaultProps} />)
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('should render the title when provided', () => {
    render(<Modal {...defaultProps} title="My Title" />)
    expect(screen.getByRole('heading', { name: 'My Title', hidden: true })).toBeInTheDocument()
  })

  it('should not render a heading when title is not provided', () => {
    render(<Modal {...defaultProps} />)
    expect(screen.queryByRole('heading', { hidden: true })).not.toBeInTheDocument()
  })

  it('should render the close button', () => {
    render(<Modal {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'Close modal', hidden: true })).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    render(<Modal {...defaultProps} onClose={onClose} />)
    await userEvent.click(screen.getByRole('button', { name: 'Close modal', hidden: true }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('should call showModal when open is true', () => {
    render(<Modal {...defaultProps} open={true} />)
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
  })

  it('should call close when open is false', () => {
    render(<Modal {...defaultProps} open={false} />)
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled()
  })

  it('should apply custom className to the dialog', () => {
    render(<Modal {...defaultProps} className="custom-class" />)
    expect(screen.getByRole('dialog', { hidden: true })).toHaveClass('custom-class')
  })

  it('should apply custom classNameTitle to the title', () => {
    render(<Modal {...defaultProps} title="Title" classNameTitle="title-class" />)
    expect(screen.getByRole('heading', { name: 'Title', hidden: true })).toHaveClass('title-class')
  })
})
