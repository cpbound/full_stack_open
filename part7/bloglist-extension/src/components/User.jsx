import { useParams } from 'react-router-dom'
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from '@mui/material'

const User = ({ blogs }) => {
  const { id } = useParams()

  const userBlogs = blogs.filter((blog) => blog.user.id === id)
  const user = userBlogs[0].user

  if (!user) {
    return null
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Added blogs:
      </Typography>

      <List>
        {userBlogs.map((blog, index) => (
          <Box key={blog.id}>
            <ListItem>
              <ListItemText primary={blog.title} />
            </ListItem>
            {index < userBlogs.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  )
}

export default User
