'use client';

import { useState } from 'react';
import type { Sticker } from '@/lib/albums';
import StickerLightbox from './StickerLightbox';

export default function StickerCard({ sticker }: { sticker: Sticker }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition duration-150 hover:scale-105 hover:shadow-xl">
      <button
        onClick={() => setLightboxOpen(true)}
        aria-label={`View sticker ${sticker.number}: ${sticker.name}`}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-4xl"
      >
        🐶
      </button>
      <span className="mt-2 text-xs font-bold text-gray-400">
        #{sticker.number}
      </span>
      <span className="text-sm font-medium text-gray-700">{sticker.name}</span>
      <StickerLightbox
        sticker={sticker}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
