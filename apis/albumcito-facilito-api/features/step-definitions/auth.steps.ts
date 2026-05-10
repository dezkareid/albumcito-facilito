import 'reflect-metadata'
import { Given, When, Then, DataTable } from '@cucumber/cucumber'
import * as request from 'supertest'
import * as assert from 'assert'
import { ctx } from './shared'

Given('a user exists with email {string} and password {string}',
  async (email: string, password: string) => {
    await request(ctx.app!.getHttpServer())
      .post('/auth/signup')
      .send({ name: 'Test User', email, password })
  })

Given('a user is authenticated with email {string} and password {string}',
  async (email: string, password: string) => {
    const res = await request(ctx.app!.getHttpServer())
      .post('/auth/signup')
      .send({ name: 'Auth User', email, password })
    ctx.authToken = res.body.access_token
  })

When('a client sends a POST request to {string} with:',
  async (path: string, dataTable: DataTable) => {
    ctx.response = await request(ctx.app!.getHttpServer())
      .post(path)
      .send(dataTable.rowsHash())
  })

When('a client sends a GET request to {string} with the auth token',
  async (path: string) => {
    ctx.response = await request(ctx.app!.getHttpServer())
      .get(path)
      .set('Authorization', `Bearer ${ctx.authToken}`)
  })

Then('the response body should contain an access_token', () => {
  assert.ok(ctx.response!.body.access_token, 'access_token should be present')
})

Then('the response body should contain username {string}', (username: string) => {
  assert.strictEqual(ctx.response!.body.username, username)
})

Then('the response body should contain email {string}', (email: string) => {
  assert.strictEqual(ctx.response!.body.email, email)
})
