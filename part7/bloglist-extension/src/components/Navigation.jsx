import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

const Navigation = ({ user, handleLogout }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </Box>
        {user ? (
          <>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              <em>{user.name} logged in</em>
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Typography variant="body1">Log in to post a new blog</Typography>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
