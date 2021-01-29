// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

const User = require('./auth/auth-model')
const db = require('../data/dbConfig')

const gabby = {username: 'gabbyVicas', password: 'password'}
const password = {password: 'password'}

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

describe('create new user', () => {
  it('creates new user', async () => {
    let users
    await User.add(gabby)
    users = await db('users').first()
    expect(users).toMatchObject({ id: 1, ...gabby})
  })
})