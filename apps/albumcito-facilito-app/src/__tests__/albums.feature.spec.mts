import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber'
import { expect, vi } from 'vitest'
import { fetchAlbums, fetchStickers } from '../../lib/albums'

const MOCK_ALBUMS = [
  { id: 1, name: "Cody's Adventure 2024", description: 'Collect all 30 Cody stickers!', totalStickers: 30 },
  { id: 2, name: "Cody's World Tour", description: 'Join Cody worldwide!', totalStickers: 20 },
]

const MOCK_STICKERS = Array.from({ length: 30 }, (_, i) => ({
  id: 100 + i + 1,
  albumId: 1,
  number: i + 1,
  name: `Cody #${i + 1}`,
}))

const feature = await loadFeature('features/albums.feature')

describeFeature(feature, ({ Scenario }) => {
  Scenario('Albums data fetcher returns a list', ({ Given, When, Then, And }) => {
    let result: typeof MOCK_ALBUMS

    Given('the albums API responds with a valid list', () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => MOCK_ALBUMS,
      }))
    })
    When('the fetchAlbums function is called', async () => {
      result = await fetchAlbums()
    })
    Then('it should return a non-empty array of albums', () => {
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })
    And('each album should have an id, name, description, and totalStickers', () => {
      for (const album of result) {
        expect(album).toHaveProperty('id')
        expect(album).toHaveProperty('name')
        expect(album).toHaveProperty('description')
        expect(album).toHaveProperty('totalStickers')
      }
    })
  })

  Scenario('Stickers data fetcher returns a list for a valid album', ({ Given, When, Then, And }) => {
    let result: typeof MOCK_STICKERS

    Given('the stickers API responds with a valid list for album {int}', (_ctx, _albumId: number) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => MOCK_STICKERS,
      }))
    })
    When('the fetchStickers function is called with album id {int}', async (_ctx, albumId: number) => {
      result = await fetchStickers(albumId)
    })
    Then('it should return a non-empty array of stickers', () => {
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })
    And('each sticker should have a number and a name', () => {
      for (const sticker of result) {
        expect(sticker).toHaveProperty('number')
        expect(sticker).toHaveProperty('name')
      }
    })
  })
})
