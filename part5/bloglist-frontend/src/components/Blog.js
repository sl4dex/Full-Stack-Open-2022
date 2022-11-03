import { useState } from 'react'
import Togglable from './Togglable' 
import blogApi from '../services/blogs'


const Blog = ({blog}) => {
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
  function updateBlog({blog}){
    blog.likes += 1
    blogApi.update(blog.id, blog)
    setLikes(blog.likes)
  }
  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel='view'>
        <div>
        {blog.url} <br />
        likes: {likes} <button onClick={ () => updateBlog({blog})}>like</button><br />
        {blog.author}
        </div>
      </Togglable>
    </div>  
  )
}

export default Blog