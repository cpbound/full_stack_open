import { useParams } from 'react-router-dom'

const User = ({ blogs }) => {
  const { id } = useParams()

  const userBlogs = blogs.filter((blog) => blog.user.id === id)
  const user = userBlogs[0].user

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs:</h2>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
