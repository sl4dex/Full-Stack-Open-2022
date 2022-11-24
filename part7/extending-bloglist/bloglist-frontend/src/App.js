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
import { initialUsers } from './redux/usersSlice'
import { logIn } from './redux/loggeduserSlice'
import {
  BrowserRouter as Router,
  Routes, Route//, Link
} from "react-router-dom"
import Users from './components/Users'
import User from './components/User'

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
  const user = useSelector(state => state.loggedUser)
  
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // initial blogs and usersare fetched from the server
  useEffect(() => {
    dispatch(initialBlogs())
    dispatch(initialUsers())
  }, [])
  // for mantaining session if user refreshes page
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(storedUser.token)
      dispatch(logIn(storedUser))
    }
  }, [])

  // manages the values in the login form
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // user is the response from login
      const user = await loginService.login({ username, password })
      dispatch(logIn(user))

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
    <Router>
      <Notification />
      <Error />
      {user === null || user.length === 0 ? (
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
                  <b>{user[0].name}</b> logged-in <button onClick={logOut}>logout</button>
                </p>
              </div>
            )
      }
      <Routes>
        <Route path='/' element={
          <div>
              <BlogForm
                setNewTitle={setNewTitle}
                setNewAuthor={setNewAuthor}
                setNewUrl={setNewUrl}
                newTitle={newTitle}
                newAuthor={newAuthor}
                newUrl={newUrl}
              />
            <BlogList />
          </div>
        } />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </Router>
  )
}

export default App
