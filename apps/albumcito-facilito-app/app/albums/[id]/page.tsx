import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchAlbums, fetchStickers } from '@/lib/albums';
import StickerCard from '@/app/_components/StickerCard';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const albums = await fetchAlbums();
  return albums.map((a) => ({ id: String(a.id) }));
}

export default async function AlbumPage({ params }: Props) {
  const { id } = await params;
  const albumId = Number(id);

  const [albums, stickers] = await Promise.all([
    fetchAlbums(),
    fetchStickers(albumId),
  ]);

  const album = albums.find((a) => a.id === albumId);
  if (!album) notFound();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          ← Back to albums
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">{album.name}</h1>
        <p className="mt-1 text-gray-500">{album.description}</p>
        <p className="mt-1 text-sm text-indigo-600 font-medium">
          {stickers.length} stickers
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {stickers.map((sticker) => (
            <StickerCard key={sticker.id} sticker={sticker} />
          ))}
        </div>
      </div>
    </main>
  );
}
