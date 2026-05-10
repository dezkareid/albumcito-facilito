import 'reflect-metadata';
import { When, Then, DataTable } from '@cucumber/cucumber';
import * as request from 'supertest';
import * as assert from 'assert';
import { ctx } from './shared';

When(
  'an authenticated client sends a POST request to {string} with body:',
  async (path: string, dataTable: DataTable) => {
    const rawRows = dataTable.rowsHash();
    const body: Record<string, string | number> = {};
    for (const [key, value] of Object.entries(rawRows)) {
      body[key] = isNaN(Number(value)) ? value : Number(value);
    }
    ctx.response = await request(ctx.app!.getHttpServer())
      .post(path)
      .set('Authorization', `Bearer ${ctx.authToken}`)
      .send(body);
  },
);

Then('the response body should contain stickerId {int}', (stickerId: number) => {
  assert.strictEqual(ctx.response!.body.stickerId, stickerId);
});

Then('the collection should contain stickerId {int}', (stickerId: number) => {
  const body = ctx.response!.body as { stickerId: number }[];
  assert.ok(
    Array.isArray(body) && body.some((e) => e.stickerId === stickerId),
    `Collection should contain stickerId ${stickerId}`,
  );
});

Then('the response body should contain onboardingCompleted {word}', (value: string) => {
  const expected = value === 'true';
  assert.strictEqual(ctx.response!.body.onboardingCompleted, expected);
});
