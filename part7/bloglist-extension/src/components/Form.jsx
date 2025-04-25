import { useState } from 'react'
import { useNotification } from '../contexts/NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

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
    }
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
    notify((`A blog with the title ${newBlog.title} has been added successfully.`), 3)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        <input type="text" name="Title" placeholder='Title' value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <input type="text" name="Author" placeholder='Author' value={author} onChange={handleAuthorChange} />
      </div>
      <div>
        <input type="text" name="Url" placeholder='URL' value={url} onChange={handleUrlChange} />
      </div>
      <br />
      <button type="click">Create</button>
    </form>
  )
}

export default CreateBlogForm
