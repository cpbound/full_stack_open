import Togglable from './Togglable'

const Blog = ({ blog, updateLikes, destroyBlog, user }) => {
  const handleLikes = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateLikes(blog.id, blogObject)
  }

  const handleDestroy = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      destroyBlog(blog.id)
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
              <button onClick={handleLikes}>Like</button>
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
            <button onClick={handleLikes}>Like</button>
          </p>
          <p>Added by: {blog.user.username}</p>
        </div>
      </Togglable>
      {blog.user !== null}
      {blog.user.id === user.id && (
        <button onClick={handleDestroy}>Delete Blog</button>
      )}
    </div>
  )
}

export default Blog
