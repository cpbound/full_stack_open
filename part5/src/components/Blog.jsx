const Blog = ({ blog, updateLikes, destroyBlog, user }) => {
  const handleLikes = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    updateLikes(blog.id, blogObject);
  };

  const handleDestroy = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      destroyBlog(blog.id);
    }
  };

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>
        <i>Author: {blog.author}</i>
      </p>
      <a href={blog.url}>{blog.url}</a>
      <p>
        <b>{blog.likes} ♥️ </b>
        <button onClick={handleLikes}>Like</button>
      </p>
      <p>Added by: {blog.user.username}</p>
      <div>
        <button onClick={handleDestroy}>Delete blog</button>
      </div>
    </div>
  );
};

export default Blog;
