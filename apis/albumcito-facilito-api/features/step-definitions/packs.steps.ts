import 'reflect-metadata';
import { Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { ctx } from './shared';

interface PackBody {
  id: number;
  albumId: number;
  albumName: string;
  name: string;
  stickersPerPack: number;
  priceCents: number;
  currency: string;
}

Then('the response body should expose all pack fields', () => {
  const body = ctx.response!.body as PackBody;
  for (const field of [
    'id',
    'albumId',
    'albumName',
    'name',
    'stickersPerPack',
    'priceCents',
    'currency',
  ]) {
    assert.ok(field in body, `Pack should have a "${field}" field`);
  }
  assert.ok(Number.isInteger(body.priceCents), 'priceCents should be an integer');
  assert.strictEqual(body.currency, 'MXN');
});

Then('the packs should be ordered by albumId then id', () => {
  const body = ctx.response!.body as PackBody[];
  const sorted = [...body].sort((a, b) => a.albumId - b.albumId || a.id - b.id);
  assert.deepStrictEqual(body, sorted);
});

Then('the response body should contain pack id {int}', (id: number) => {
  assert.strictEqual((ctx.response!.body as PackBody).id, id);
});

Then('every pack in the response should have albumId {int}', (albumId: number) => {
  const body = ctx.response!.body as PackBody[];
  assert.ok(Array.isArray(body), 'Response body should be an array');
  assert.ok(body.every((p) => p.albumId === albumId));
});
