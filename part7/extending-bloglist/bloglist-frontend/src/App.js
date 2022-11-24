import { React, useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { notiLogin, notiHide } from './redux/notificationSlice'
import { badLogin, errHide } from './redux/errorSlice'
import { initialBlogs } from './redux/blogSlice'

const Notification = () => {
  const msg = useSelector(state => state.notification.message)


  return <div className='success'>{msg}</div>
}
const Error = () => {
  const msg = useSelector(state => state.error.err)
  return <div className='error'>{msg}</div>
}

const App = () => {
  const dispatch = useDispatch()
  // const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initialBlogs())
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
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      // user is the response from login
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      dispatch(notiLogin(user.username))
      setTimeout(() => {
        dispatch(notiHide())
      }, 3000)
    } catch (exception) {
      dispatch(badLogin())
      setTimeout(() => {
        dispatch(errHide())
      }, 3000)
    }
  }

  function logOut() {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <Notification />
      <Error />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={logOut}>logout</button>
          </p>
          <BlogForm
            setNewTitle={setNewTitle}
            setNewAuthor={setNewAuthor}
            setNewUrl={setNewUrl}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
          />
        </div>
      )}

      <BlogList user={user} />
      {/* for all elements of array, if b has more likes than a, then b is sorted before a and viceversa */}
      {/* {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        ))} */}
    </div>
  )
}

export default App
