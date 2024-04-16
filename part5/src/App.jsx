import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Form from "./components/Form";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [blogRefresh, setBlogRefresh] = useState(false);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, [blogRefresh]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setInfoMessage("Logged in successfully");
      setTimeout(() => {
        setInfoMessage(null);
      }, 5000);
    } catch (exception) {
      setInfoMessage("Wrong credentials");
      setTimeout(() => {
        setInfoMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setInfoMessage(
      `Successfully Logged out. Y'all come back now y'hear, ${user.name}?`
    );
    setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setInfoMessage(
        `A blog with the title ${returnedBlog.title} has been added successfully.`
      );
      setTimeout(() => {
        setInfoMessage(null);
      }, 5000);
    });
  };

  const updateLikes = async (id, blogObject) => {
    await blogService.update(id, blogObject);
    setBlogRefresh(!blogRefresh);
  };

  if (user === null) {
    return (
      <div>
        <Notification message={infoMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
        <h2>Blog List</h2>
        {blogs.map((blog) => (
          <div key={blog.id} className="blogStyle">
            <br />
            <Togglable buttonLabel={blog.title} buttonClose={"Close"}>
              <Blog blog={blog} updateLikes={updateLikes} />
            </Togglable>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Notification message={infoMessage} />
      <h3>
        [|[| <i>{user.name} logged in.</i> |]|]{" "}
      </h3>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
      <Togglable
        buttonLabel="Create New Blog"
        buttonClose={"Cancel"}
        ref={blogFormRef}
      >
        <Form createBlog={addBlog} />
      </Togglable>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="blogStyle">
          <br />
          <Togglable buttonLabel={blog.title} buttonClose={"Close"}>
            <Blog blog={blog} updateLikes={updateLikes} />
          </Togglable>
        </div>
      ))}
    </div>
  );
};
export default App;
