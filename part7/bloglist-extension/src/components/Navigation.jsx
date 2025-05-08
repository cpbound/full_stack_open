import { Link } from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => {
  return (
    <nav className="navStyle">
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {user ? (
        <>
          <em>{user.name} logged in</em>{' '}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Log in to post a new blog</p>
      )}
    </nav>
  )
}

export default Navigation
