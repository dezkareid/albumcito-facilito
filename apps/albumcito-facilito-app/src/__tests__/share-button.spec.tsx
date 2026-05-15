import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { expect, vi, describe, it, afterEach } from 'vitest';
import ShareButton from '../../app/_components/ShareButton';

describe('ShareButton', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders a button with share label', () => {
    render(<ShareButton path="/albums/1" title="Test Album" />);
    expect(screen.getByLabelText('Share Test Album')).toBeDefined();
  });

  it('does not show the modal initially', () => {
    render(<ShareButton path="/albums/1" title="Test Album" />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens the modal when the button is clicked', () => {
    render(<ShareButton path="/albums/1" title="Test Album" />);
    fireEvent.click(screen.getByLabelText('Share Test Album'));
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('closes the modal when onClose is triggered (Escape key)', () => {
    render(<ShareButton path="/albums/1" title="Test Album" />);
    fireEvent.click(screen.getByLabelText('Share Test Album'));
    expect(screen.getByRole('dialog')).toBeDefined();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes the modal when close button inside modal is clicked', () => {
    render(<ShareButton path="/albums/1" title="Test Album" />);
    fireEvent.click(screen.getByLabelText('Share Test Album'));
    fireEvent.click(screen.getByLabelText('Close sharing modal'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
