import type { CollectionEntry } from '@/lib/collection';

interface Props {
  entries: CollectionEntry[];
}

export default function MyStickers({ entries }: Props) {
  if (entries.length === 0) {
    return <p className="text-sm text-gray-400">You have no stickers yet.</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6">
      {entries.map((entry) => (
        <div
          key={`${entry.stickerId}-${entry.albumId}`}
          className="flex flex-col items-center rounded-xl border border-amber-200 bg-amber-50 p-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-2xl">
            🐶
          </div>
          <span className="mt-1 text-xs font-bold text-gray-400">#{entry.stickerId}</span>
        </div>
      ))}
    </div>
  );
}
