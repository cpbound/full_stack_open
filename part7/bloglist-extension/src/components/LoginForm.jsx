import { useUserDispatch } from '../contexts/UserContext'
import { useNotification } from '../contexts/NotificationContext'
import login from '../services/login'
import blogService from '../services/blogs'
import { Paper, Box, Typography, TextField, Button } from '@mui/material'

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
    <Box display="flex" justifyContent="center" mt={6}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              type="text"
              value={username}
              label="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="password"
              value={password}
              label="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Box>
          <Button variant="contained" fullWidth type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default LoginForm
