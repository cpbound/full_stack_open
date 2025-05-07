import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  console.log(blogs, user)
  return (
    <div>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default BlogList
