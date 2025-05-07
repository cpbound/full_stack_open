import { Link } from 'react-router-dom'

const Users = ({ blogs }) => {
  const usersMap = blogs.reduce((acc, blog) => {
    const user = blog.user
    if (user) {
      acc[user.id] = acc[user.id] || { id: user.id, name: user.name, blogs: 0 }
      acc[user.id].blogs += 1
    }
    return acc
  }, {})

  const users = Object.values(usersMap)

  console.log(users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
