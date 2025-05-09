import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>Blog List</h2>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {blogs.map((blog) => (
            <ListItemButton
              key={blog.id}
              LinkComponent={Link}
              to={`/blogs/${blog.id}`}
              divider
              sx={{
                borderRadius: 2,
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <ListItemText
                primary={blog.title}
                secondary={blog.author}
              ></ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default BlogList
