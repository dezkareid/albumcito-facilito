'use client';

import { useEffect, useRef, useState } from 'react';
import type { Sticker } from '@/lib/albums';

interface StickerLightboxProps {
  sticker: Sticker | null;
  open: boolean;
  onClose: () => void;
}

export default function StickerLightbox({ sticker, open, onClose }: StickerLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [animClass, setAnimClass] = useState('animate-lightbox-in');
  const isClosingRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      isClosingRef.current = false;
      setAnimClass('animate-lightbox-in');
      dialog.showModal();
    }
  }, [open]);

  function dismiss() {
    const dialog = dialogRef.current;
    if (!dialog || isClosingRef.current) return;
    isClosingRef.current = true;
    setAnimClass('animate-lightbox-out');

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      isClosingRef.current = false;
      dialog.close();
    };

    dialog.addEventListener('animationend', finish, { once: true });
    // fallback for prefers-reduced-motion (no animationend will fire)
    setTimeout(finish, 300);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) dismiss();
  }

  if (!sticker) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-label={`Sticker ${sticker.number}: ${sticker.name}`}
      onClick={handleBackdropClick}
      onClose={onClose}
      className={`${animClass} relative rounded-2xl p-8 shadow-2xl outline-none backdrop:bg-black/60`}
    >
      <button
        onClick={dismiss}
        aria-label="Close lightbox"
        className="absolute right-4 top-3 text-2xl leading-none text-gray-400 hover:text-gray-700"
      >
        ×
      </button>
      <div className="mt-4 flex flex-col items-center gap-4">
        <div
          className="flex items-center justify-center rounded-full bg-amber-100 text-8xl"
          style={{ width: 'min(80vmin, 300px)', height: 'min(80vmin, 300px)' }}
        >
          🐶
        </div>
        <span className="text-sm font-bold text-gray-400">#{sticker.number}</span>
        <span className="text-xl font-semibold text-gray-800">{sticker.name}</span>
      </div>
    </dialog>
  );
}
