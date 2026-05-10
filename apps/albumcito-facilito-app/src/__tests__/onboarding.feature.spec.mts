import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber';
import { vi, expect } from 'vitest';
import { addStickerToCollection, type CollectionEntry } from '../../lib/collection';

const feature = await loadFeature('features/onboarding.feature');

describeFeature(feature, ({ Scenario }) => {
  Scenario('addStickerToCollection succeeds and returns the entry', ({ Given, When, Then }) => {
    let result: CollectionEntry;

    Given('the collection API accepts the sticker', () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            userId: 'user-1',
            stickerId: 101,
            albumId: 1,
            addedAt: new Date().toISOString(),
          }),
        }),
      );
    });

    When('the user calls addStickerToCollection with stickerId 101 and albumId 1', async () => {
      result = await addStickerToCollection(101, 1);
    });

    Then('the result should contain stickerId 101', () => {
      expect(result.stickerId).toBe(101);
      vi.unstubAllGlobals();
    });
  });

  Scenario(
    'addStickerToCollection throws when the API returns an error',
    ({ Given, When, Then }) => {
      let thrownError: Error | null = null;

      Given('the collection API returns error {string}', (_ctx, message: string) => {
        vi.stubGlobal(
          'fetch',
          vi.fn().mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message }),
          }),
        );
      });

      When(
        'the user calls addStickerToCollection with stickerId 101 and albumId 1',
        async () => {
          try {
            await addStickerToCollection(101, 1);
          } catch (err) {
            thrownError = err as Error;
          }
        },
      );

      Then('an error should be thrown with message {string}', (_ctx, message: string) => {
        expect(thrownError).not.toBeNull();
        expect(thrownError!.message).toBe(message);
        vi.unstubAllGlobals();
      });
    },
  );
});
