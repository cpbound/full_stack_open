import Togglable from './Togglable'
import { useNotification } from '../contexts/NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs }) => {
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

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    likeMutation.mutate(updatedBlog)
  }

  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)

  return (
    <div className="blogStyle">
      <h1>{blog.title}</h1>
      <p>
        <i>{blog.author}</i>
      </p>
      <a href={blog.url}>{blog.url}</a>
      <p>
        <b>{blog.likes} ♥️ </b>
        <button onClick={handleLike}>Like</button>
      </p>
      <p>Added by: {blog.user.username}</p>
      <h3>Comments</h3>
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>Be the first to add a comment!</p>
      )}
    </div>
  )
}

export default Blog
