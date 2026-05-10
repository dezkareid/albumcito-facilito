'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Sticker } from '@/lib/albums';
import { addStickerToCollection } from '@/lib/collection';

interface Props {
  stickers: Sticker[];
  username: string;
}

export default function StickerPicker({ stickers, username }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleConfirm() {
    if (selected === null) return;
    setLoading(true);
    setError('');
    try {
      const sticker = stickers.find((s) => s.id === selected)!;
      await addStickerToCollection(sticker.id, sticker.albumId);
      router.push(`/dashboard/${username}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mb-8 sm:grid-cols-5 lg:grid-cols-6">
        {stickers.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => setSelected(sticker.id)}
            className={`flex flex-col items-center rounded-xl border p-3 transition-all ${
              selected === sticker.id
                ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500'
                : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40'
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-2xl">
              🐶
            </div>
            <span className="mt-1 text-xs font-bold text-gray-400">#{sticker.number}</span>
          </button>
        ))}
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <button
        onClick={handleConfirm}
        disabled={selected === null || loading}
        className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Adding to album…' : 'Add to my album'}
      </button>
    </div>
  );
}
