import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogSlice'
import { setNotificationMessage } from '../reducers/notificationSlice'
import { useNotification } from '../hooks/useNotification'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const notify = useNotification()

  const handleDestroy = (blog) => {
    console.log(blog)
    notify((`Deleted blog: ${blog.title} by ${blog.author}`), 5)
    dispatch(removeBlog(blog))
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
              <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
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
            <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
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
