import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUserDispatch, useUserValue } from './contexts/UserContext'
import { useNotification } from './contexts/NotificationContext'
import Blog from './components/Blog'
import Form from './components/Form'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const notify = useNotification()
  const user = useUserValue()
  const userDispatch = useUserDispatch()

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })
    }
  }, [userDispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    userDispatch({ type: 'CLEAR_USER' })
    notify('Logged Out Successfully', 3)
    setUsername('')
    setPassword('')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
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
      <Notification />
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
