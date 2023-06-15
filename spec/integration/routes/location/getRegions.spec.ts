import app from '../../../../src/app'
import request from 'supertest'
import { cleanUp, connectDB, disconnectDB } from '../../../test.db'
import users from '../../../fixtures/users.json'

const PATH = '/api/v1/regions'
let APIKey: string

beforeAll(async () => {
  await connectDB()
  APIKey = (await request(app).post('/auth/signup').send(users[0])).body.data
    .userAPIKey
})

afterAll(async () => {
  await cleanUp()
  await disconnectDB()
})

describe(`GET ${PATH}`, () => {
  test('should successfully get a list of the regions', async () => {
    const response = await request(app)
      .get(PATH)
      .set('Authorization', `Bearer ${APIKey}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBeTruthy()
    expect(response.body.data.size).toBeGreaterThan(0)
    expect(response.body.data.result.length).toEqual(response.body.data.size)
  })

  test('should get a list of regions with a valid json response', async () => {
    const response = await request(app)
      .get(PATH)
      .set('Authorization', `Bearer ${APIKey}`)

    expect(response.status).toBe(200)
    expect(response.body.success).toBeTruthy()
    expect(response.body.message).toBeDefined()
    expect(response.body.data.size).toBeDefined()
    expect(response.body.data.result).toBeDefined()
    expect(response.headers['content-type']).toContain('application/json')
  })

  test('should fail to get a list of the regions if API Key is not sent in the header', async () => {
    const response = await request(app).get(PATH)
    expect(response.status).toBe(401)
    expect(response.body.success).toBeFalsy()
    expect(response.body.data.size).toBeUndefined()
    expect(response.body.data.result).toBeUndefined()
  })
})