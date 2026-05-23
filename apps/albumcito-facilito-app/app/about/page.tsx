import { RandomStickerButton } from './RandomStickerButton'

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Albumcito Facilito</h1>
      <p className="mt-4 text-gray-600">
        Albumcito Facilito is your digital home for collecting Cody stickers. Browse the full album,
        mark the stickers you own, and keep track of the ones you still need to complete your
        collection. Every Cody sticker has a unique number — can you catch them all?
      </p>

      <section className="mt-10" aria-labelledby="random-sticker-heading">
        <h2 id="random-sticker-heading" className="mb-4 text-lg font-semibold text-gray-800">
          Try your luck
        </h2>
        <RandomStickerButton />
      </section>
    </main>
  )
}
