import 'reflect-metadata'
import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import * as assert from 'assert'

let app: INestApplication
let response: request.Response

Before(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()
  app = moduleFixture.createNestApplication()
  await app.init()
})

After(async () => {
  await app.close()
})

Given('the API is running', () => {
  assert.ok(app, 'App should be initialized')
})

When('a client sends a GET request to {string}', async (path: string) => {
  response = await request(app.getHttpServer()).get(path)
})

Then('the response status should be {int}', (status: number) => {
  assert.strictEqual(response.status, status)
})

Then('the response should be a non-empty list', () => {
  const body = response.body as unknown[]
  assert.ok(Array.isArray(body), 'Response body should be an array')
  assert.ok(body.length > 0, 'Response list should not be empty')
})

Then('the response body should contain a greeting', () => {
  assert.ok(response.text, 'Response body should not be empty')
})

Then('each item in the response should have a {string} field', (field: string) => {
  const body = response.body as Record<string, unknown>[]
  assert.ok(
    body.every((item) => field in item),
    `Every item should have a "${field}" field`,
  )
})
