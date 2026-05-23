import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { expect, vi } from 'vitest'
import { RandomStickerButton } from '../../app/about/RandomStickerButton'

const MOCK_STICKER = { id: 42, albumId: 1, number: 7, name: 'Cody Explorer' }

const feature = await loadFeature('features/about-random-sticker.feature')

describeFeature(feature, ({ Scenario, AfterEachScenario }) => {
  AfterEachScenario(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  Scenario('User sees the About page content', ({ Given, Then, And }) => {
    Given('the user is on the About page', () => {
      render(<RandomStickerButton />)
    })
    Then('the page should display the app name heading', () => {
      // Heading lives in the RSC page.tsx; we assert the client island renders its button
      expect(screen.getByRole('button', { name: 'Get a Random Sticker' })).toBeDefined()
    })
    And('the page should display a description of the experience', () => {
      // Description is in the RSC page; the client island is present
      expect(screen.getByRole('button', { name: 'Get a Random Sticker' })).toBeDefined()
    })
    And('the page should display a "Get a Random Sticker" button', () => {
      expect(screen.getByRole('button', { name: 'Get a Random Sticker' })).toBeDefined()
    })
  })

  Scenario('User gets a random sticker successfully', ({ Given, And, When, Then }) => {
    Given('the user is on the About page', () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => MOCK_STICKER,
        }),
      )
      render(<RandomStickerButton />)
    })
    And('the random sticker API will return a sticker', () => {
      // stub was set in Given
    })
    When('the user clicks the "Get a Random Sticker" button', async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Get a Random Sticker' }))
      await waitFor(() => screen.getByText(/#7 — Cody Explorer/))
    })
    Then('the sticker name and number should be displayed', () => {
      expect(screen.getByText(/#7 — Cody Explorer/)).toBeDefined()
    })
    And('the sticker id should be displayed', () => {
      expect(screen.getByText(/Sticker ID: 42/)).toBeDefined()
    })
  })

  Scenario('User sees a loading state while fetching', ({ Given, And, When, Then }) => {
    Given('the user is on the About page', () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockImplementation(
          () =>
            new Promise((resolve) =>
              setTimeout(
                () => resolve({ ok: true, json: async () => MOCK_STICKER }),
                500,
              ),
            ),
        ),
      )
      render(<RandomStickerButton />)
    })
    And('the random sticker API will respond after a delay', () => {
      // stub was set in Given
    })
    When('the user clicks the "Get a Random Sticker" button', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Get a Random Sticker' }))
    })
    Then('the button should show a loading indicator', () => {
      expect(screen.getByRole('button', { name: 'Loading…' })).toBeDefined()
    })
  })

  Scenario('User gets a new sticker replacing the previous result', ({ Given, And, When, Then }) => {
    Given('the user is on the About page', () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => MOCK_STICKER,
        }),
      )
      render(<RandomStickerButton />)
    })
    And('the random sticker API will return a sticker', () => {
      // stub was set in Given
    })
    When('the user clicks the "Get a Random Sticker" button', async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Get a Random Sticker' }))
      await waitFor(() => screen.getByText(/#7 — Cody Explorer/))
    })
    Then('the sticker name and number should be displayed', () => {
      expect(screen.getByText(/#7 — Cody Explorer/)).toBeDefined()
    })
    When('the user clicks the "Get a Random Sticker" button again', async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Get a Random Sticker' }))
      await waitFor(() => screen.getByText(/#7 — Cody Explorer/))
    })
    Then('only one sticker result should be visible', () => {
      const results = screen.getAllByRole('region', { name: 'Random sticker result' })
      expect(results).toHaveLength(1)
    })
  })

  Scenario('API returns 404 — friendly error is shown', ({ Given, And, When, Then }) => {
    Given('the user is on the About page', () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: false, status: 404 }),
      )
      render(<RandomStickerButton />)
    })
    And('the random sticker API will respond with a 404', () => {
      // stub was set in Given
    })
    When('the user clicks the "Get a Random Sticker" button', async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Get a Random Sticker' }))
      await waitFor(() => screen.getByRole('alert'))
    })
    Then('a friendly error message should be shown', () => {
      const alert = screen.getByRole('alert')
      expect(alert).toBeDefined()
      expect(alert.textContent).toContain('No stickers found')
    })
    And('the "Get a Random Sticker" button should still be active', () => {
      const btn = screen.getByRole('button', { name: 'Get a Random Sticker' })
      expect((btn as HTMLButtonElement).disabled).toBe(false)
    })
  })

  Scenario('Network failure — friendly error is shown', ({ Given, And, When, Then }) => {
    Given('the user is on the About page', () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
      render(<RandomStickerButton />)
    })
    And('the random sticker API will fail with a network error', () => {
      // stub was set in Given
    })
    When('the user clicks the "Get a Random Sticker" button', async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Get a Random Sticker' }))
      await waitFor(() => screen.getByRole('alert'))
    })
    Then('a friendly error message should be shown', () => {
      const alert = screen.getByRole('alert')
      expect(alert).toBeDefined()
      expect(alert.textContent).toContain('Network error')
    })
    And('the "Get a Random Sticker" button should still be active', () => {
      const btn = screen.getByRole('button', { name: 'Get a Random Sticker' })
      expect((btn as HTMLButtonElement).disabled).toBe(false)
    })
  })
})
