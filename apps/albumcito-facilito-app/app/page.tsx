import { fetchAlbums, fetchTopAlbums } from '@/lib/albums';
import { fetchTopStickers } from '@/lib/stickers';
import AlbumCard from './_components/AlbumCard';
import LikeButton from './_components/LikeButton';
import StickerCard from './_components/StickerCard';

export default async function Home() {
  const [albums, topStickers, topAlbums] = await Promise.all([
    fetchAlbums(),
    fetchTopStickers(),
    fetchTopAlbums(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Albumcito Facilito</h1>
          <p className="mt-2 text-gray-500">Choose an album to start collecting Cody stickers.</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>

        <section aria-labelledby="top-stickers-heading">
          <h2 id="top-stickers-heading" className="text-2xl font-bold text-gray-900">
            Top Stickers
          </h2>
          <p className="mt-1 text-sm text-gray-500">The most loved Cody stickers right now.</p>
          {topStickers.length === 0 ? (
            <p className="mt-6 text-gray-400 italic">No stickers have been liked yet. Be the first!</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {topStickers.map((sticker) => (
                <div key={sticker.id} className="flex flex-col items-center gap-2">
                  <StickerCard sticker={sticker} />
                  <LikeButton
                    entityType="sticker"
                    entityId={sticker.id}
                    initialLikeCount={sticker.likeCount}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="liked-albums-heading">
          <h2 id="liked-albums-heading" className="text-2xl font-bold text-gray-900">
            Most Liked Albums
          </h2>
          <p className="mt-1 text-sm text-gray-500">Albums the community is collecting the most.</p>
          {topAlbums.length === 0 ? (
            <p className="mt-6 text-gray-400 italic">No albums have been liked yet. Be the first!</p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topAlbums.map((album) => (
                <div key={album.id} className="flex flex-col gap-2">
                  <AlbumCard album={album} />
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-gray-400">{album.likeCount} likes</span>
                    <LikeButton
                      entityType="album"
                      entityId={album.id}
                      initialLikeCount={album.likeCount}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
