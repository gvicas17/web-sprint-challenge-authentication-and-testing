// Write your tests here


const db = require('../data/dbConfig')
const server = require('./server')
const request = require('supertest')

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

describe('POST new user', () => {
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

describe('POST login existing user', () => {
  it('logs in existing user succesfully', async () => {
    await request(server).post('/api/auth/register').send(gabby)
     const res = await request(server).post('/api/auth/login').send(gabby)
     expect(res.status).toBe(200)
  })
  it('sends appropriate error when invalid credientals are used', async () => {
      await request(server).post('/api/auth/register').send(gabby)
      const res = await request(server).post('/api/auth/login').send({username: 'gabby', password: 'password'})
      expect(res.status).toBe(401)
  })
})

describe('GET jokes', () => {
  it('returns correct server response when not logged in', async () => {
   const res = await request(server).get('/api/jokes/')
    expect(res.status).toBe(401)
  })
  it('returns jokes when logged in', async () => {
    const res = await request(server).get('/api/jokes/')
    expect(res.text).toBe("\"token required\"")
  })
})