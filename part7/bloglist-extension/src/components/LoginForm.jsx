import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userSlice'
import { setNotificationMessage } from '../reducers/notificationSlice'
import login from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ username, password, setUsername, setPassword }) => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await login({ username, password })
      console.log('logged in', user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotificationMessage('Logged in', 5))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotificationMessage('Wrong username or password', 5))
    }
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}

          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm
