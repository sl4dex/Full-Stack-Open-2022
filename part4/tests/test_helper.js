const User = require('../models/user')

// gets all users currently in the db
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
module.exports = {usersInDb}