import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Form from "./components/Form";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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

  if (user === null) {
    return (
      <>
        <Notification message={infoMessage} />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </>
    );
  }

  return (
    <div>
      <Notification message={infoMessage} />
      <h2>Blogs</h2>
      <h3>
        [|[| <i>{user.name} logged in.</i> |]|]{" "}
      </h3>
      <button onClick={handleLogout}>Logout</button>
      <h3>Create New</h3>
      <Form createBlog={addBlog} />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
