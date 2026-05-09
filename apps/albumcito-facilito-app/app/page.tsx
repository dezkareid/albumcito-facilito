import { fetchAlbums } from '@/lib/albums';
import AlbumCard from './_components/AlbumCard';

export default async function Home() {
  const albums = await fetchAlbums();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-900">Albumcito Facilito</h1>
        <p className="mt-2 text-gray-500">Choose an album to start collecting Cody stickers.</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </main>
  );
}
