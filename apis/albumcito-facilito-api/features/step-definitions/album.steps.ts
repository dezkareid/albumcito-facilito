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

Then('the response body should contain a greeting', () => {
  assert.ok(response.text, 'Response body should not be empty')
})
