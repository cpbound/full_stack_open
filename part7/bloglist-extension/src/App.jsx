/* eslint-disable no-trailing-spaces */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setNotificationMessage } from './reducers/notificationSlice'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [blogRefresh, setBlogRefresh] = useState(false)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [blogRefresh])

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
      dispatch(setNotificationMessage('Logged In Successfully (from Redux)'), 3)

      // -- React notifications -- \\
      // setInfoMessage('Logged in successfully')
      // setTimeout(() => {
      //   setInfoMessage(null)
      // }, 5000)
    } catch (exception) {
      // -- Redux Notifications -- \\
      dispatch(setNotificationMessage('Wrong credentials (from Redux)'), 3)

      // -- React Notifications -- \\
      // setInfoMessage('Wrong credentials')
      // setTimeout(() => {
      //   setInfoMessage(null)
      // }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    // -- Redux Notifications -- \\
    dispatch(setNotificationMessage('Logged Out Successfully (from Redux)'), 3)

    // -- React notifications -- \\
    // setInfoMessage(
    //   `Successfully Logged out. Y'all come back now y'hear, ${user.name}?`
    // )
    // setTimeout(() => {
    //   setInfoMessage(null)
    // }, 5000)

    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      // -- Redux Notifications -- \\
      dispatch(setNotificationMessage(`A blog with the title ${returnedBlog.title} has been added successfully.`), 3)

      // -- React notifications -- \\
      // setInfoMessage(
      //   `A blog with the title ${returnedBlog.title} has been added successfully.`
      // )
      // setTimeout(() => {
      //   setInfoMessage(null)
      // }, 5000)
    })
  }

  const updateLikes = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    setBlogRefresh(!blogRefresh)
  }

  const destroyBlog = async (id) => {
    await blogService.destroy(id)
    // -- Redux Notifications -- \\
    dispatch(setNotificationMessage('Blog deleted. Banned. Banned. Banned. Banned. Gone. Forever'), 3)

    // -- React notifications -- \\
    // setInfoMessage(
    //   'Blog deleted. Banned. Banned. Banned. Banned. Gone. Forever'
    // )
    // setTimeout(() => {
    //   setInfoMessage(null)
    // }, 5000)
    setBlogRefresh(!blogRefresh)
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
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            user={user}
          />
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
        <Form createBlog={addBlog} />
      </Togglable>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          user={user}
          destroyBlog={destroyBlog}
        />
      ))}
    </div>
  )
}
export default App
