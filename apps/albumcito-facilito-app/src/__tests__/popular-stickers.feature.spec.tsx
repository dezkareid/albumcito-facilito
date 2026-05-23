import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { expect } from 'vitest'
import { FilterChips } from '../../app/popular/_components/FilterChips'

const feature = await loadFeature('features/popular-stickers.feature')

describeFeature(feature, ({ Scenario, AfterEachScenario }) => {
  AfterEachScenario(() => {
    cleanup()
  })

  Scenario('User sees all filter chips on load', ({ Given, Then, And }) => {
    Given('the user is on the popular stickers page', () => {
      render(<FilterChips />)
    })
    Then('the filter chips "All", "Rare", "Common", and "Legendary" should be visible', () => {
      expect(screen.getByRole('button', { name: 'All' })).toBeDefined()
      expect(screen.getByRole('button', { name: 'Rare' })).toBeDefined()
      expect(screen.getByRole('button', { name: 'Common' })).toBeDefined()
      expect(screen.getByRole('button', { name: 'Legendary' })).toBeDefined()
    })
    And('the "All" chip should be active', () => {
      expect(screen.getByRole('button', { name: 'All' }).getAttribute('aria-pressed')).toBe('true')
    })
  })

  Scenario('User selects the "Rare" filter chip', ({ Given, When, Then, And }) => {
    Given('the user is on the popular stickers page', () => {
      render(<FilterChips />)
    })
    When('the user clicks the "Rare" chip', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Rare' }))
    })
    Then('the "Rare" chip should be active', () => {
      expect(screen.getByRole('button', { name: 'Rare' }).getAttribute('aria-pressed')).toBe('true')
    })
    And('the "All" chip should not be active', () => {
      expect(screen.getByRole('button', { name: 'All' }).getAttribute('aria-pressed')).toBe('false')
    })
  })

  Scenario('User selects "Legendary" and then switches back to "All"', ({ Given, When, Then, And }) => {
    Given('the user is on the popular stickers page', () => {
      render(<FilterChips />)
    })
    When('the user clicks the "Legendary" chip', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Legendary' }))
    })
    Then('the "Legendary" chip should be active', () => {
      expect(screen.getByRole('button', { name: 'Legendary' }).getAttribute('aria-pressed')).toBe('true')
    })
    When('the user clicks the "All" chip', () => {
      fireEvent.click(screen.getByRole('button', { name: 'All' }))
    })
    Then('the "All" chip should be active', () => {
      expect(screen.getByRole('button', { name: 'All' }).getAttribute('aria-pressed')).toBe('true')
    })
    And('the "Legendary" chip should not be active', () => {
      expect(screen.getByRole('button', { name: 'Legendary' }).getAttribute('aria-pressed')).toBe('false')
    })
  })
})
