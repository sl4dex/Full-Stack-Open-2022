// crear un router para blogs
const blogRouter = require('express').Router()
// pedir el schema de Blog
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// gets the Authorization header from the request and checks for Bearer scheme
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// como ya pusimos /api/blogs como prefijo en app.js, no hace falta ponerlo
blogRouter.get('/', async (request, response, next) => {
  try{
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  }
  catch (exception) {
    next(exception)
  }
})
  
blogRouter.post('/', async (request, response, next) => {
  try{
    const token = getTokenFrom(request)
    // decodes token using internal SECRET string
    const decodedToken = jwt.verify(token, process.env.SECRET)
    // jwt.verify verifies the token, and aso returns the decoded token,
    // as you remember it is a dictionary containing the username and the internal _id
    if (!token || !decodedToken.id)
      return response.status(401).json({ error: 'token missing or invalid' })
    
    const blog = new Blog(request.body)
    // sets user creator as the one with the id of the decoed token
    const user = blog.user = await User.findById(decodedToken.id)
  
    const b = await blog.save()
    user.blogs = user.blogs.concat(b.id)
    response.status(201).json(b)
  }
  catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
  
})

blogRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  try{
    const resp = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      {new: true}
    )
    response.status(200).json(resp)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter

// El enrutador es de hecho un middleware, que se puede utilizar
// para definir "rutas relacionadas" en un solo lugar, que
// normalmente se coloca en su propio módulo.
// (Parecido a los blueprints de Flask???)