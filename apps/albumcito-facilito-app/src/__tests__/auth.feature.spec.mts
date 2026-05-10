import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber'
import { expect, vi } from 'vitest'
import { signupRequest, loginRequest } from '../../lib/auth'

const feature = await loadFeature('features/auth.feature')

describeFeature(feature, ({ Scenario }) => {
  Scenario('signupRequest returns username on success', ({ Given, When, Then }) => {
    let result: { username: string }

    Given('the signup API returns username {string}', (_ctx, username: string) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ username }),
      }))
    })
    When(
      'the user calls signupRequest with name {string}, email {string} and password {string}',
      async (_ctx, name: string, email: string, password: string) => {
        result = await signupRequest(name, email, password)
      },
    )
    Then('the result username should be {string}', (_ctx, username: string) => {
      expect(result.username).toBe(username)
    })
  })

  Scenario('signupRequest throws on duplicate email', ({ Given, When, Then }) => {
    let thrownError: Error | null = null

    Given('the signup API returns error {string}', (_ctx, message: string) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message }),
      }))
    })
    When(
      'the user calls signupRequest with name {string}, email {string} and password {string}',
      async (_ctx, name: string, email: string, password: string) => {
        try {
          await signupRequest(name, email, password)
        } catch (e) {
          thrownError = e as Error
        }
      },
    )
    Then('an error should be thrown with message {string}', (_ctx, message: string) => {
      expect(thrownError?.message).toBe(message)
    })
  })

  Scenario('loginRequest returns username on success', ({ Given, When, Then }) => {
    let result: { username: string }

    Given('the login API returns username {string}', (_ctx, username: string) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ username }),
      }))
    })
    When(
      'the user calls loginRequest with email {string} and password {string}',
      async (_ctx, email: string, password: string) => {
        result = await loginRequest(email, password)
      },
    )
    Then('the result username should be {string}', (_ctx, username: string) => {
      expect(result.username).toBe(username)
    })
  })

  Scenario('loginRequest throws on invalid credentials', ({ Given, When, Then }) => {
    let thrownError: Error | null = null

    Given('the login API returns error {string}', (_ctx, message: string) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message }),
      }))
    })
    When(
      'the user calls loginRequest with email {string} and password {string}',
      async (_ctx, email: string, password: string) => {
        try {
          await loginRequest(email, password)
        } catch (e) {
          thrownError = e as Error
        }
      },
    )
    Then('an error should be thrown with message {string}', (_ctx, message: string) => {
      expect(thrownError?.message).toBe(message)
    })
  })
})
