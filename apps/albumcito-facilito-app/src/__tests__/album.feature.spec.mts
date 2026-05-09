import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber'
import { expect } from 'vitest'

const feature = await loadFeature('features/album.feature')

describeFeature(feature, ({ Scenario }) => {
  Scenario('User starts with an empty collection', ({ Given, Then, And }) => {
    let collection: number[] = []

    Given('the user has no stickers', () => {
      collection = []
    })
    Then('the collection should be empty', () => {
      expect(collection).toHaveLength(0)
    })
    And('the completion percentage should be 0', () => {
      expect(collection.length).toBe(0)
    })
  })

  Scenario('User marks a sticker as collected', ({ Given, When, Then }) => {
    let collection: number[] = []

    Given('the user has no stickers', () => {
      collection = []
    })
    When('the user collects sticker number {int}', (_ctx, stickerNumber: number) => {
      collection.push(stickerNumber)
    })
    Then('the collection should contain sticker {int}', (_ctx, stickerNumber: number) => {
      expect(collection).toContain(stickerNumber)
    })
  })
})
