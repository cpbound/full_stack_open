import { useNotification } from '../contexts/NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import blogService from '../services/blogs'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  Divider,
  Link,
} from '@mui/material'

const Blog = ({ blogs }) => {
  const notify = useNotification()
  const queryClient = useQueryClient()
  const [comment, setComment] = useState('')

  const likeMutation = useMutation({
    mutationFn: async (updatedBlog) => {
      return await blogService.update(blog.id, updatedBlog)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const commentMutation = useMutation({
    mutationFn: async (comment) => {
      return await blogService.addComment(blog.id, comment)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setComment('')
    },
  })

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    likeMutation.mutate(updatedBlog)
  }

  const handleComment = (e) => {
    e.preventDefault()
    commentMutation.mutate({ id: blog.id, comment })
  }

  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)

  return (
    <Card sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          <i>{blog.author}</i>
        </Typography>
        <Link href={blog.url} target="_blank" rel="noopener" underline="hover">
          {blog.url}
        </Link>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" fontWeight="bold">
            {blog.likes} ♥️
          </Typography>
          <Button variant="contained" onClick={handleLike}>
            Like
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          Added by: {blog.user.username}
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Comments
        </Typography>

        <Box
          component="form"
          onSubmit={handleComment}
          sx={{ mt: 1, display: 'flex', gap: 2 }}
        >
          <TextField
            fullWidth
            size="small"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            label="Add a comment"
            variant="outlined"
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Box>

        {blog.comments && blog.comments.length > 0 ? (
          <List sx={{ mt: 2 }}>
            {blog.comments.map((comment, index) => (
              <Box key={index}>
                <ListItem disablePadding>
                  <Typography variant="body2">{comment}</Typography>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        ) : (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Be the first to add a comment!
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default Blog
