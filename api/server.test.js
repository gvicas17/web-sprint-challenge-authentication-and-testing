// Write your tests here


const User = require('./auth/auth-model')
const db = require('../data/dbConfig')
const server = require('./server')
const request = require('supertest')
const router = require('./auth/auth-router')

const gabby = {username: 'gabbyVicas', password: 'password'}
const gabbyv = {username: 'gup', password: 'password'}


beforeAll(async () => {
  await db.migrate.rollback
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('create new user', () => {
  it('creates new user', async () => {
    let res
    res = await request(server).post('/api/auth/register').send(gabby)
    expect(res.body).toMatchObject({ id: 1, username: 'gabbyVicas'})
  })
  it('sends 201 for successfully creating new user', async () => {
    const res = await request(server).post('/api/auth/register').send(gabbyv)
    expect(res.status).toBe(201)
  })
})