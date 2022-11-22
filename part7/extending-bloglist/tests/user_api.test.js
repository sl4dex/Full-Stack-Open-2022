const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const User = require('../models/user')

const app = require('../app')
const api = supertest(app)

describe('having initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('myPassword', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    // gets all users currently in the db
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'sl4dex',
      name: 'Salvador Diaz',
      password: 'salvasabe',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('server responds with 400 for short username', async () => {
    const badUser = {
      username: 'sl',
      name: 'Salvador Diaz',
      password: 'salvasabe',
    }

    await api.post('/api/users').send(badUser).expect(400, {
      error:
        'User validation failed: username: Path `username` (`sl`) is shorter than the minimum allowed length (3).',
    })
  })

  test('server responds with 400 for short password', async () => {
    const badUser = {
      username: 'sl4dex',
      name: 'Salvador Diaz',
      password: 'sa',
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400, { error: 'Invalid password' })
  })
  test('server responds with 400 for repeated username', async () => {
    const badUser = {
      username: 'root',
      name: 'Salvador Diaz',
      password: 'salvasabe',
    }

    await api.post('/api/users').send(badUser).expect(400, {
      error:
        'User validation failed: username: Error, expected `username` to be unique. Value: `root`',
    })
  })
})
