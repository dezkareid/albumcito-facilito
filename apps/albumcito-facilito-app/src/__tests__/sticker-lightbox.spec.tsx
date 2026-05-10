import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { expect, vi, describe, it, beforeEach, afterEach } from 'vitest'
import StickerLightbox from '../../app/_components/StickerLightbox'
import type { Sticker } from '@/lib/albums'

const mockSticker: Sticker = { id: 1, albumId: 1, number: 42, name: 'Cody Explorer' }

beforeEach(() => {
  // jsdom doesn't implement showModal/close; stub them
  HTMLDialogElement.prototype.showModal = vi.fn()
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.dispatchEvent(new Event('close'))
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('StickerLightbox', () => {
  it('renders sticker name and number when open', () => {
    render(<StickerLightbox sticker={mockSticker} open={true} onClose={vi.fn()} />)
    expect(screen.getByText('#42')).toBeTruthy()
    expect(screen.getByText('Cody Explorer')).toBeTruthy()
  })

  it('has aria-modal="true" on the dialog element', () => {
    const { container } = render(
      <StickerLightbox sticker={mockSticker} open={true} onClose={vi.fn()} />,
    )
    const dialog = container.querySelector('dialog')
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
  })

  it('calls showModal when open prop becomes true', () => {
    render(<StickerLightbox sticker={mockSticker} open={true} onClose={vi.fn()} />)
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when close button is clicked', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<StickerLightbox sticker={mockSticker} open={true} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close lightbox'))
    // dismiss() sets a 300ms fallback timeout (no animationend in jsdom)
    vi.advanceTimersByTime(350)
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('renders nothing when sticker is null', () => {
    const { container } = render(
      <StickerLightbox sticker={null} open={false} onClose={vi.fn()} />,
    )
    expect(container.querySelector('dialog')).toBeNull()
  })
})
