// crear un router para blogs
const blogRouter = require('express').Router()
// pedir el schema de Blog
const Blog = require('../models/blog')

// como ya pusimos /api/blogs como prefijo en app.js, no hace falta ponerlo
blogRouter.get('/', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => next(error))
  })
  
  blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
  })

module.exports = blogRouter

// El enrutador es de hecho un middleware, que se puede utilizar
// para definir "rutas relacionadas" en un solo lugar, que
// normalmente se coloca en su propio módulo.
// (Parecido a los blueprints de Flask???)