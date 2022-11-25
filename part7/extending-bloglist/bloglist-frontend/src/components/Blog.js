import React from 'react'
import Togglable from './Togglable'
import blogApi from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { notiLiking, notiHide } from '../redux/notificationSlice'
import { likeBlog, delBlog } from '../redux/blogSlice'
import { Link } from 'react-router-dom'

//const Blog = ({ blog, user, blogs, setBlogs }) => {
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedUser[0])

  // blog in argument is destructured so its a new one, not the same as the one in return
  function updateBlog({ blog }) {
    blogApi.update(blog.id, blog)
    dispatch(likeBlog(blog))
    // shows the notification for 3 seconds
    dispatch(notiLiking(blog.title))
    setTimeout(() => {
      dispatch(notiHide())
    }, 3000)
  }
  async function deleteBlog({ blog }) {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
      await blogApi.del(blog.id)
      dispatch(delBlog(blog.id))
    }
  }
  return (
    <div style={blogStyle}>
      <Link to={`blogs/${blog.id}`} >
        <div className='initial'>
          {blog.title} by {blog.author}
        </div>
      </Link>
      <Togglable buttonLabel='view'>
        <div className='more-details'>
          {blog.url} <br />
          likes: <span className='likes'>{blog.likes}</span>{' '}
          <button className='likeBtn' onClick={() => updateBlog({ blog })}>
            like
          </button>
          <br />
          {blog.user.username} <br />
          {user && user.username === blog.user.username && (
            <button className='remove' onClick={() => deleteBlog({ blog })}>
              remove
            </button>
          )}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
