import { useNotification } from '../contexts/NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import blogService from '../services/blogs'

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
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
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
