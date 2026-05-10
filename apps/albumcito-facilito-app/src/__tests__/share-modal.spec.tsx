import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { expect, vi, describe, it, beforeEach, afterEach } from 'vitest';
import { createRef } from 'react';
import ShareModal from '../../app/_components/ShareModal';

function renderModal(overrides?: Partial<Parameters<typeof ShareModal>[0]>) {
  const triggerRef = createRef<HTMLButtonElement>();
  const onClose = vi.fn();
  render(
    <ShareModal
      url="https://example.com/albums/1"
      title="Test Album"
      onClose={onClose}
      triggerRef={triggerRef}
      {...overrides}
    />,
  );
  return { onClose };
}

describe('ShareModal', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders with role="dialog"', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('has aria-labelledby pointing to the title', () => {
    renderModal();
    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBe('share-modal-title');
    expect(document.getElementById(labelId!)).not.toBeNull();
  });

  it('calls onClose when Escape key is pressed', () => {
    const { onClose } = renderModal();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when close button is clicked', () => {
    const { onClose } = renderModal();
    fireEvent.click(screen.getByLabelText('Close sharing modal'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when backdrop is clicked', () => {
    const { onClose } = renderModal();
    // The backdrop is the first child of the portal container — clicking outside the panel
    const backdrop = screen.getByRole('dialog').parentElement as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when panel itself is clicked', () => {
    const { onClose } = renderModal();
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls navigator.clipboard.writeText with the url on copy-link click', async () => {
    renderModal();
    fireEvent.click(screen.getByText('Copy link'));
    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://example.com/albums/1'),
    );
  });

  it('shows "Copied!" after successful copy', async () => {
    renderModal();
    fireEvent.click(screen.getByText('Copy link'));
    await waitFor(() => expect(screen.getByText('Copied!')).toBeDefined());
  });

  it('shows fallback input when clipboard is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: null,
      writable: true,
      configurable: true,
    });
    renderModal();
    fireEvent.click(screen.getByText('Copy link'));
    await waitFor(() =>
      expect((screen.getByLabelText('Share URL') as HTMLInputElement).value).toBe(
        'https://example.com/albums/1',
      ),
    );
  });

  it('renders Facebook, Twitter, and WhatsApp share buttons', () => {
    renderModal();
    expect(screen.getByText('Share on Facebook')).toBeDefined();
    expect(screen.getByText('Share on X (Twitter)')).toBeDefined();
    expect(screen.getByText('Share on WhatsApp')).toBeDefined();
  });
});
