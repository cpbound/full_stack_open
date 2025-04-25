import Togglable from './Togglable'
import { useNotification } from '../hooks/useNotification'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const notify = useNotification()
  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: async (updatedBlog) => {
      return await blogService.update(blog.id, updatedBlog)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const destroyMutation = useMutation({
    mutationFn: async (id) => {
      return await blogService.destroy(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
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

  const handleDestroy = (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (confirm) {
      destroyMutation.mutate(blog.id)
      notify(`Deleted blog: ${blog.title} by ${blog.author}`, 5)
    }
  }

  if (user === null) {
    return (
      <div className="blogStyle">
        <div className="visible">
          <h3>{blog.title}</h3>
          <p>
            <i>Author: {blog.author}</i>
          </p>
        </div>
        <Togglable buttonLabel="View" buttonClose="Close">
          <div className="hidden">
            <a href={blog.url}>{blog.url}</a>
            <p>
              <b>{blog.likes} ♥️ </b>
              <button onClick={handleLike}>Like</button>
            </p>
            <p>Added by: {blog.user.username}</p>
          </div>
        </Togglable>
      </div>
    )
  }

  return (
    <div className="blogStyle">
      <div className="visible">
        <h3>{blog.title}</h3>
        <p>
          <i>Author: {blog.author}</i>
        </p>
      </div>
      <Togglable buttonLabel="View" buttonClose="Close">
        <div className="hidden">
          <a href={blog.url}>{blog.url}</a>
          <p>
            <b>{blog.likes} ♥️ </b>
            <button onClick={handleLike}>Like</button>
          </p>
          <p>Added by: {blog.user.username}</p>
        </div>
      </Togglable>
      {blog.user !== null}
      {blog.user.id === user.id && (
        <button onClick={() => handleDestroy(blog)}>Delete Blog</button>
      )}
    </div>
  )
}

export default Blog
