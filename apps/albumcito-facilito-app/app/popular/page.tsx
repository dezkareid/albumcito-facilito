import Link from 'next/link'
import { fetchTopStickers } from '@/lib/stickers'
import type { StickerWithLikes } from '@/lib/stickers'
import { FilterChips } from './_components/FilterChips'

function formatLikeCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`
  }
  return String(count)
}

function rankBadgeClass(rank: number): string {
  if (rank === 1) return 'bg-yellow-400 text-yellow-900'
  if (rank === 2) return 'bg-gray-300 text-gray-700'
  if (rank === 3) return 'bg-orange-300 text-orange-900'
  return 'bg-blue-100 text-blue-600'
}

function StickerRankCard({
  sticker,
  rank,
  maxLikes,
}: {
  sticker: StickerWithLikes
  rank: number
  maxLikes: number
}) {
  const progressPercent = maxLikes > 0 ? Math.round((sticker.likeCount / maxLikes) * 100) : 0

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${rankBadgeClass(rank)}`}
          aria-label={`Rank ${rank}`}
        >
          {rank}
        </span>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-2xl">
          🐶
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-400">#{String(sticker.number).padStart(3, '0')}</p>
          <p className="truncate font-semibold text-gray-900">{sticker.name}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-gray-600">
          <span aria-hidden="true">🔥</span>
          <span>{formatLikeCount(sticker.likeCount)}</span>
        </div>

        <button
          type="button"
          aria-label={`Bookmark ${sticker.name}`}
          className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      <div className="mt-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-blue-500 transition-all"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progressPercent}% popularity`}
          />
        </div>
      </div>
    </div>
  )
}

export default async function PopularPage() {
  const allStickers = await fetchTopStickers()
  const stickers = allStickers.slice(0, 10)
  const maxLikes = stickers.length > 0 ? stickers[0].likeCount : 0

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link
            href="/"
            aria-label="Go back to home"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Most Popular Stickers 🏆</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-6">
        <p className="mb-5 text-sm text-gray-500">Stickers everyone wants right now</p>

        <div className="mb-6">
          <FilterChips />
        </div>

        {stickers.length === 0 ? (
          <p className="mt-12 text-center text-gray-400 italic">No popular stickers yet. Be the first to like one!</p>
        ) : (
          <ol className="space-y-3" aria-label="Popular stickers ranked list">
            {stickers.map((sticker, index) => (
              <li key={sticker.id}>
                <StickerRankCard
                  sticker={sticker}
                  rank={index + 1}
                  maxLikes={maxLikes}
                />
              </li>
            ))}
          </ol>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4">
        <div className="mx-auto max-w-lg">
          <Link
            href="/"
            className="block w-full rounded-2xl bg-blue-600 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Complete Your Album ✨
          </Link>
        </div>
      </div>
    </div>
  )
}
