import Link from 'next/link';
import type { Album } from '@/lib/albums';

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <Link
      href={`/albums/${album.id}`}
      className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-3xl">
        📚
      </div>
      <h2 className="text-lg font-semibold text-gray-900">{album.name}</h2>
      <p className="mt-1 text-sm text-gray-500">{album.description}</p>
      <p className="mt-3 text-xs font-medium text-indigo-600">
        {album.totalStickers} stickers
      </p>
    </Link>
  );
}
