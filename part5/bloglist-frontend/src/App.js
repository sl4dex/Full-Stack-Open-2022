import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import LoginForm from './components/LoginForm' 
import BlogForm from './components/BlogForm' 

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

  function logOut() {
    window.localStorage.clear()
    window.location.reload()
  }
  
  return (
    <div>
      <Notification message={noti} />
      <Error message={errorMessage} />

      {user === null ?
      <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username}  password={password} /> :
      <div>
        <p>{user.name} logged-in <button onClick={logOut}>logout</button></p>
        <BlogForm setNewTitle={setNewTitle} setNewAuthor={setNewAuthor} setNewUrl={setNewUrl} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl}/>
      </div>
      }

      <h2>Blogs</h2>
      {/* for all elements of array, if b has more likes than a, then b is sorted before a and viceversa */}
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs}/>)}
    </div>
)
}

export default App
