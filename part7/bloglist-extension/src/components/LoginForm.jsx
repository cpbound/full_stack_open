import { useUserDispatch } from '../contexts/UserContext'
import { useNotification } from '../contexts/NotificationContext'
import login from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ username, password, setUsername, setPassword }) => {
  const userDispatch = useUserDispatch()
  const notify = useNotification()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })
      notify('Logged in', 5)
      setUsername('')
      setPassword('')
    } catch (error) {
      notify('Wrong username or password', 5)
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
