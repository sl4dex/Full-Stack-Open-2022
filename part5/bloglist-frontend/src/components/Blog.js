import { React, useState } from 'react'
import Togglable from './Togglable'
import blogApi from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [likes, setLikes] = useState(blog.likes)
  // blog in argument is destructured so its a new one, not the same as the one in return
  function updateBlog({ blog }){
    blog.likes += 1
    blogApi.update(blog.id, blog)
    setLikes(blog.likes)
  }
  async function deleteBlog({ blog }) {
    if  (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
      await blogApi.del(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }

  }
  return (
    <div style={blogStyle}>
      <div className='initial'>{blog.title} by {blog.author}</div>
      <Togglable buttonLabel='view'>
        <div className='more-details'>
          {blog.url} <br />
          likes: <span className='likes'>{likes}</span> <button className='likeBtn' onClick={ () => updateBlog({ blog })}>like</button><br />
          {blog.user.username} <br />
          { user && user.username === blog.user.username && <button className='remove' onClick={() => deleteBlog({ blog })}>remove</button>}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog