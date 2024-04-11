const Blog = ({ blog, updateLikes }) => {
  const handleLikes = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    updateLikes(blog.id, blogObject);
  };

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>
        <i>Author: {blog.author}</i>
      </p>
      <a>{blog.url}</a>
      <p>
        <b>{blog.likes} ♥️ </b>
        <button onClick={handleLikes}>Like</button>
      </p>
      <p>Added by: {blog.user.username}</p>
    </div>
  );
};

export default Blog;
