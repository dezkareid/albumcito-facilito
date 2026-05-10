import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber'
import { expect, vi } from 'vitest'
import { fetchTopStickers } from '../../lib/stickers'
import type { StickerWithLikes } from '../../lib/stickers'

const MOCK_TOP_STICKERS: StickerWithLikes[] = [
  { id: 101, albumId: 1, number: 1, name: 'Cody #1', likeCount: 10 },
  { id: 201, albumId: 2, number: 1, name: 'Cody #1', likeCount: 7 },
  { id: 301, albumId: 3, number: 1, name: 'Cody #1', likeCount: 3 },
]

const feature = await loadFeature('features/home-top-stickers.feature')

describeFeature(feature, ({ Scenario }) => {
  Scenario('fetchTopStickers returns stickers with like counts', ({ Given, When, Then, And }) => {
    let result: StickerWithLikes[]

    Given('the top stickers API responds with 3 stickers', () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => MOCK_TOP_STICKERS,
      }))
    })
    When('the fetchTopStickers function is called', async () => {
      result = await fetchTopStickers()
    })
    Then('it should return an array of stickers', () => {
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(3)
    })
    And('each sticker should have a likeCount field', () => {
      for (const sticker of result) {
        expect(sticker).toHaveProperty('likeCount')
        expect(typeof sticker.likeCount).toBe('number')
      }
    })
  })

  Scenario('fetchTopStickers returns empty array when no stickers are liked', ({ Given, When, Then }) => {
    let result: StickerWithLikes[]

    Given('the top stickers API responds with an empty list', () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      }))
    })
    When('the fetchTopStickers function is called', async () => {
      result = await fetchTopStickers()
    })
    Then('it should return an empty array', () => {
      expect(result).toEqual([])
    })
  })
})
