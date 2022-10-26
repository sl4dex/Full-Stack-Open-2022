// crear un router para blogs
const blogRouter = require('express').Router()
// pedir el schema de Blog
const Blog = require('../models/blog')
const User = require('../models/user')

// como ya pusimos /api/blogs como prefijo en app.js, no hace falta ponerlo
blogRouter.get('/', async (request, response, next) => {
  // previous code using promises
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
  //   .catch(error => next(error))

  // now much cleaner with async await
  try{
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  }
  catch (exception) {
    next(exception)
  }
})
  
blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  
  // old code with promises
  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
  //   .catch(error => next(error))

  // now much cleaner with async await

  const user = blog.user = await User.findOne()
  try{
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