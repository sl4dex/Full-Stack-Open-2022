const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./dummy_returns_one.test')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
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

describe('blog post gets created succesfully', () => {
  const newBlog = {
    title: 'async/await es god',
    author: 'anonimo',
    url: 'https://abc',
    likes: 0
  }
  
  test('length + 1', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    console.log(response.body.length);
    expect(response.body).toHaveLength(helper.myList.length + 1)
  })
  test('new title in blogs list', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogsTitles = response.body.map(r => r.title)
    expect(blogsTitles).toContain('async/await es god')
  })
})

afterAll( () => {
  mongoose.connection.close()
})