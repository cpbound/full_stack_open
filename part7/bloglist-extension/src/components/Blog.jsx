import Togglable from "./Togglable";
import { useNotification } from "../contexts/NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";
import blogs from "../services/blogs";

const Blog = ({ blogs }) => {
  // const notify = useNotification();
  // const queryClient = useQueryClient();

  // const likeMutation = useMutation({
  //   mutationFn: async (updatedBlog) => {
  //     return await blogService.update(blog.id, updatedBlog);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["blogs"] });
  //   },
  // });

  // const destroyMutation = useMutation({
  //   mutationFn: async (id) => {
  //     return await blogService.destroy(id);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["blogs"] });
  //   },
  // });

  // const handleLike = () => {
  //   const updatedBlog = {
  //     ...blog,
  //     likes: blog.likes + 1,
  //     user: blog.user.id,
  //   };

  //   likeMutation.mutate(updatedBlog);
  // };

  // const handleDestroy = (blog) => {
  //   const confirm = window.confirm(
  //     `Remove blog ${blog.title} by ${blog.author}?`
  //   );
  //   if (confirm) {
  //     destroyMutation.mutate(blog.id);
  //     notify(`Deleted blog: ${blog.title} by ${blog.author}`, 5);
  //   }
  // };
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);
  return (
    <div className="blogStyle">
      <h3>{blog.title}</h3>
      <p>
        <i>Author: {blog.author}</i>
      </p>
      <a href={blog.url}>{blog.url}</a>
      <p>
        <b>{blog.likes} ♥️ </b>
        {/* <button onClick={handleLike}>Like</button> */}
      </p>
      <p>Added by: {blog.user.username}</p>
    </div>
  );

  // return (
  //   <div className="blogStyle">
  //     <h3>{blog.title}</h3>
  //     <p>
  //       <i>Author: {blog.author}</i>
  //     </p>
  //     <a href={blog.url}>{blog.url}</a>
  //     <p>
  //       <b>{blog.likes} ♥️ </b>
  //       <button onClick={handleLike}>Like</button>
  //     </p>
  //     <p>Added by: {blog.user.username}</p>
  //     {blog.user !== null}
  //     {blog.user.id === user.id && (
  //       <button onClick={() => handleDestroy(blog)}>Delete Blog</button>
  //     )}
  //   </div>
  // );
};

export default Blog;
