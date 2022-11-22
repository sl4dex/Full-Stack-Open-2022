const bcrypt = require('bcrypt')
const User = require('../models/user')

const myList = [
  {
    title: 'IA y como no te va a dejar sin trabajo',
    author: 'sl4dex',
    url: 'https://abc',
    likes: 0,
  },
  {
    title: 'C Compilation',
    author: 'Salvador D',
    url: 'https://www.linkedin.com/pulse/c-compilation-salvador-d-/',
    likes: 3,
  },
  {
    title: 'Recursion',
    author: 'Salvador D',
    url: 'https://www.linkedin.com/pulse/recursion-salvador-diaz/',
    likes: 5,
  },
  {
    title:
      'What happens when you type google.com in your browser and press Enter',
    author: 'Salvador D',
    url: 'https://www.linkedin.com/pulse/what-happens-when-you-type-googlecom-your-browser-press-salvador-diaz/',
    likes: 2,
  },
  {
    title: 'lol',
    author: 'unnamed',
    url: 'https://abc',
    likes: 0,
  },
]

// gets all users currently in the db
const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const deleteCreateUsers = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('myPassword', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
}

module.exports = {
  usersInDb,
  deleteCreateUsers,
  myList,
}
