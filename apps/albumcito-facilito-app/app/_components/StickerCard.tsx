'use client';

import type { Sticker } from '@/lib/albums';
import ShareButton from './ShareButton';

export default function StickerCard({ sticker }: { sticker: Sticker }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-4xl">
        🐶
      </div>
      <span className="mt-2 text-xs font-bold text-gray-400">
        #{sticker.number}
      </span>
      <span className="text-sm font-medium text-gray-700">{sticker.name}</span>
      <div className="mt-2">
        <ShareButton
          path={`/albums/${sticker.albumId}`}
          title={sticker.name}
          className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-500"
        />
      </div>
    </div>
  );
}
