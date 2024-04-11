
const Blog = ({ blog }) => (
  (
    <div>
      <h3>{blog.title}</h3>
      <p>
        <i>{blog.author}</i>
      </p>
      {blog.url}
      <p>
        <b>{blog.likes} ♥️ </b>
        <button>Like</button>
      </p>
    </div>
  )
);

export default Blog;
