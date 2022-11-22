const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}) //.populate('blogs')
  response.status(200).json(users.map((u) => u.toJSON()))
})

// adding a user
usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.password.length < 3)
      return response.status(400).json({ error: 'Invalid password' })
    const saltRounds = 10
    // creating hash for password
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
