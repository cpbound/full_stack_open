import { Link } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  TableContainer,
  Link as MuiLink,
} from '@mui/material'

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

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{ p: 2 }}>
        Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>User</strong>
            </TableCell>
            <TableCell>
              <strong>Blogs Created</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <MuiLink
                  component={Link}
                  to={`/users/${user.id}`}
                  underline="hover"
                >
                  {user.name}
                </MuiLink>
              </TableCell>
              <TableCell>{user.blogs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users
