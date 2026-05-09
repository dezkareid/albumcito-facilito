import type { Sticker } from '@/lib/albums';

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
    </div>
  );
}
