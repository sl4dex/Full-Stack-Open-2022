import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

const Notification = ({message}) => {
  if(!message)
    return null
  
  return (
    <div className='success'>
      {message}
    </div>
  )
}
const Error = ({message}) => {
  if(!message)
    return null
  
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [noti, setNoti] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // empry array as parameter assures hook only executes when the component
  // renders for the first time
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // manages the values in the login form
  const handleLogin =  async (event) => {
    event.preventDefault()
    try {
      const user = await loginService
        .login({username, password})
      // user is the response from login
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      setNoti('Login successful')
      setTimeout(() => {
        setNoti(null)
      }, 5000) 
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  // html del formulario
  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username 
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password 
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )
  const writingTitle = event => setNewTitle(event.target.value)
  const writingAuthor = event => setNewAuthor(event.target.value)
  const writingUrl = event => setNewUrl(event.target.value)

  const blogForm = () => (
    <form onSubmit={() => blogService.create({title: newTitle, author: newAuthor, url: newUrl})}>
      <h2> New blog</h2>
      <div>
        title <input value={newTitle} onChange={writingTitle} />
      </div>
      <div>
        author <input value={newAuthor} onChange={writingAuthor} />
      </div>
      <div>
        url <input value={newUrl} onChange={writingUrl} />
      </div>
        <button type="submit">post</button>
    </form>
  )
  function logOut() {
    window.localStorage.clear()
    window.location.reload()
  }
  return (
    <div>
      <Notification message={noti} />
      <Error message={errorMessage} />

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in <button onClick={logOut}>logout</button></p>
        {blogForm()}
      </div>
      }

      <h2>Blogs</h2>
      {blogs.map(blog => 
        <ul key={blog.id}>
          <li>{blog.title}</li>
          <li>{blog.author}</li>
          <li>{blog.url}</li>
          <li>{blog.likes}</li>
        </ul>)}
    </div>
)
}

export default App
