import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { expect, vi, describe, it, beforeEach, afterEach } from 'vitest'
import LikeButton from '../../app/_components/LikeButton'

describe('LikeButton', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('renders with initial like count', () => {
    const { container } = render(
      <LikeButton entityType="sticker" entityId={101} initialLikeCount={5} />,
    )
    const button = container.querySelector('button')
    expect(button).not.toBeNull()
    expect(button?.textContent).toContain('5')
  })

  it('optimistically increments count on click', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 101, likeCount: 6 }),
    } as Response)

    const { container } = render(
      <LikeButton entityType="sticker" entityId={101} initialLikeCount={5} />,
    )
    fireEvent.click(container.querySelector('button')!)
    await waitFor(() => expect(container.querySelector('button')?.textContent).toContain('6'))
  })

  it('disables button after liking', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 101, likeCount: 6 }),
    } as Response)

    const { container } = render(
      <LikeButton entityType="sticker" entityId={101} initialLikeCount={5} />,
    )
    const button = container.querySelector('button')!
    fireEvent.click(button)
    await waitFor(() => expect(button.disabled).toBe(true))
  })

  it('rolls back count on API failure', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response)

    const { container } = render(
      <LikeButton entityType="sticker" entityId={101} initialLikeCount={5} />,
    )
    const button = container.querySelector('button')!
    fireEvent.click(button)
    await waitFor(() => expect(button.textContent).toContain('5'))
  })

  it('calls correct endpoint for album entity type', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, likeCount: 3 }),
    } as Response)

    const { container } = render(
      <LikeButton entityType="album" entityId={1} initialLikeCount={2} />,
    )
    fireEvent.click(container.querySelector('button')!)
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith('/api/likes/album/1', { method: 'POST' }),
    )
  })
})
