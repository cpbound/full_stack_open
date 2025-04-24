import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationMessage } from './reducers/notificationSlice'
import { initializeBlogs } from './reducers/blogSlice'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [blogRefresh, setBlogRefresh] = useState(false)
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      // -- Redux Notifications -- \\
      dispatch(
        setNotificationMessage('Logged In Successfully (from Redux)'),
        3
      )
    } catch (exception) {
      // -- Redux Notifications -- \\
      dispatch(setNotificationMessage('Wrong credentials (from Redux)'), 3)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    // -- Redux Notifications -- \\
    dispatch(setNotificationMessage('Logged Out Successfully (from Redux)'), 3)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  if (user === null) {
    return (
      <div>
        <Notification message={infoMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
        <h2>Blog List</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <Notification message={infoMessage} />
      <h2>
        [|[| <i>{user.name} logged in.</i> |]|]{' '}
      </h2>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
      <Togglable
        buttonLabel="Create New Blog"
        buttonClose={'Cancel'}
        ref={blogFormRef}
      >
        <Form />
      </Togglable>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}
export default App
