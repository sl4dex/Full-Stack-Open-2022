const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

let loginResponse
// before each test, deletes all blogs from test db and saves them
// again one by one to have a fresh state
beforeEach(async () => {
  // delete all users and add root
  await helper.deleteCreateUsers()
  //then login root to get the token
  loginResponse = await api
    .post('/api/login')
    .send({username: 'root', password: 'myPassword'})

  await Blog.deleteMany({})
  
  const copiedBlogs = helper.myList.map(blog => new Blog(blog))
  const promiseArray = copiedBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('correct amount of blogs', async () => {
  const response = await api
    .get('/api/blogs')
  
  expect(response.body.length).toBe(5)
})
test('blogs contain id field', async() => {
  const response = await api.get('/api/blogs')
  // checks that id property exists for all blogs
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})


describe('POST new blog', () => {
  const newBlog = {
    title: 'async/await es god',
    author: 'anonimo',
    url: 'https://abc',
    // note that there is no likes field
  }
  
  test('length + 1', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.myList.length + 1)
  })

  test('new title in blogs list', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogsTitles = response.body.map(r => r.title)
    expect(blogsTitles).toContain('async/await es god')
  })

  test('new blog has likes: 0 by default', async () => {
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })

  test('if blog has no title, return 400', async () => {
    const newBlog2 = {
      // no title
      author: 'anonimo',
      url: 'https://abc',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(400)
  })
  test('if blog has no url, return 400', async () => {
    const newBlog3 = {
      title: 'async/await es god',
      author: 'anonimo',
      // no url
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog3)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(400)
  })
})

describe('.delete blog by id', () => {
  const newBlog = {
    title: 'async/await es god',
    author: 'anonimo',
    url: 'https://abc',
    likes: 3
  }
  test('check new length === length - 1', async () => {
    const createdBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response1 = await api.get('/api/blogs')
    await api
      .delete(`/api/blogs/${createdBlog.body.id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(204)
    const response2 = await api.get('/api/blogs')
    expect(response2.body).toHaveLength(response1.body.length - 1)
  })

  test('if no matching id, response is 400', () => {
    api.delete('/api/blogs/thisIdDoesntExist')
      .expect(400)
  })

})

describe('update blog by id (.put)', () => {
  const updatedBlog = {
    title: 'La IA nos asesina',
    author: 'sl4dex',
    url: 'https://abc',
    likes: 0
  }
  test('title is updated', async () => {
    const response1 = await api.get('/api/blogs')
    const response2 = await api.put(`/api/blogs/${response1.body[0].id}`)
      .send(updatedBlog)
      .expect(200)
    expect(response2.body.title).toBe('La IA nos asesina')
  })
  test('if no matching id, response is 400', () => {
    api.put('/api/blogs/thisIdDoesntExist')
      .send(updatedBlog)
      .expect(400)
  })
})

afterAll( () => {
  mongoose.connection.close()
})