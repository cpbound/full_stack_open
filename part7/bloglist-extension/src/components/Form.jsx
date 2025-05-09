import { useState } from 'react'
import { useNotification } from '../contexts/NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { TextField, Button, Box, Paper } from '@mui/material'

const CreateBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const notify = useNotification()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    newBlogMutation.mutate(newBlog)
    notify(
      `A blog with the title ${newBlog.title} has been added successfully.`,
      3
    )
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Paper elevation={3} sx={{ p: 4, width: 400 }}>
      <Box
        component="form"
        onSubmit={handleCreate}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}
      >
        <TextField
          label="Title"
          name="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
        />
        <TextField
          label="Author"
          name="Author"
          value={author}
          onChange={handleAuthorChange}
          fullWidth
        />
        <TextField
          label="URL"
          name="Url"
          value={url}
          onChange={handleUrlChange}
          fullWidth
        />
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Box>
    </Paper>
  )
}

export default CreateBlogForm
