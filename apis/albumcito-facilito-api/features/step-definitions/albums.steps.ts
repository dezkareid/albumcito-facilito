import 'reflect-metadata'
import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import * as assert from 'assert'
import { ctx } from './shared'

Before(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()
  const app: INestApplication = moduleFixture.createNestApplication()
  await app.init()
  ctx.app = app
  ctx.response = null
  ctx.authToken = null
})

After(async () => {
  await ctx.app?.close()
  ctx.app = null
})

Given('the API is running', () => {
  assert.ok(ctx.app, 'App should be initialized')
})

When('a client sends a GET request to {string}', async (path: string) => {
  ctx.response = await request(ctx.app!.getHttpServer()).get(path)
})

Then('the response status should be {int}', (status: number) => {
  assert.strictEqual(ctx.response!.status, status)
})

Then('the response should be a non-empty list', () => {
  const body = ctx.response!.body as unknown[]
  assert.ok(Array.isArray(body), 'Response body should be an array')
  assert.ok(body.length > 0, 'Response list should not be empty')
})

Then('the response body should contain a greeting', () => {
  assert.ok(ctx.response!.text, 'Response body should not be empty')
})

Then('each item in the response should have a {string} field', (field: string) => {
  const body = ctx.response!.body as Record<string, unknown>[]
  assert.ok(
    body.every((item) => field in item),
    `Every item should have a "${field}" field`,
  )
})
