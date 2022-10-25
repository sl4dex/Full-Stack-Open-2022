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
    .expect('Content-Type', /json/)
  
})

test('correct amount of blogs', async () => {
  const response = await api
    .get('/api/blogs')
  
  expect(response.body.length).toBe(5)
})

afterAll( () => {
  mongoose.connection.close()
})