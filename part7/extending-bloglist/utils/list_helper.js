// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const reducer = (accumulator, current) => {
  return accumulator + current.likes
}

const getTotalLikes = (blogs) => {
  return blogs.reduce(reducer, 0)
}

const getFavBlog = (blogs) => {
  return blogs.reduce((acc, curr) => {
    if (curr.likes > acc) return curr.likes
    return acc
  }, blogs[0].likes)
}

const moreBlogs = (blogs) => {
  let authors = {}
  blogs.forEach((blog) => {
    authors[blog.author] = 0
  })
  blogs.forEach((blog) => {
    for (let key in authors) {
      if (key === blog.author) authors[key] += 1
    }
  })
  // first elem of authors dictionary
  let max = Object.keys(authors)[0]
  // returns elem with more blogs
  for (let key in authors) {
    if (authors[key] > authors[max]) max = key
  }
  return { author: max, blogs: authors[max] }
}

const mostLikes = (blogs) => {
  let authors = {}
  blogs.forEach((blog) => {
    authors[blog.author] = 0
  })
  blogs.forEach((blog) => {
    for (let key in authors) {
      if (key === blog.author) authors[key] += blog.likes
    }
  })
  // first elem of authors dictionary
  let max = Object.keys(authors)[0]
  // returns elem with more blogs
  for (let key in authors) {
    if (authors[key] > authors[max]) max = key
  }
  return { author: max, likes: authors[max] }
}

module.exports = {
  dummy,
  getTotalLikes,
  getFavBlog,
  moreBlogs,
  mostLikes,
}
