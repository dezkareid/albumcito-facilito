import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber'
import { expect, vi } from 'vitest'
import { fetchTopAlbums } from '../../lib/albums'
import type { AlbumWithLikes } from '../../lib/albums'

const MOCK_TOP_ALBUMS: AlbumWithLikes[] = [
  { id: 1, name: "Cody's Adventure 2024", description: 'Epic!', totalStickers: 30, likeCount: 15 },
  { id: 2, name: "Cody's World Tour", description: 'World!', totalStickers: 20, likeCount: 8 },
]

const feature = await loadFeature('features/home-liked-albums.feature')

describeFeature(feature, ({ Scenario }) => {
  Scenario('fetchTopAlbums returns albums with like counts', ({ Given, When, Then, And }) => {
    let result: AlbumWithLikes[]

    Given('the top albums API responds with 2 albums', () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => MOCK_TOP_ALBUMS,
      }))
    })
    When('the fetchTopAlbums function is called', async () => {
      result = await fetchTopAlbums()
    })
    Then('it should return an array of albums', () => {
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(2)
    })
    And('each album should have a likeCount field', () => {
      for (const album of result) {
        expect(album).toHaveProperty('likeCount')
        expect(typeof album.likeCount).toBe('number')
      }
    })
  })

  Scenario('fetchTopAlbums returns empty array when no albums are liked', ({ Given, When, Then }) => {
    let result: AlbumWithLikes[]

    Given('the top albums API responds with an empty list', () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      }))
    })
    When('the fetchTopAlbums function is called', async () => {
      result = await fetchTopAlbums()
    })
    Then('it should return an empty array', () => {
      expect(result).toEqual([])
    })
  })
})
