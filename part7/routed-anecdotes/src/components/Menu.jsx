import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateAnecdote from "./CreateAnecdote";
import About from "./About";
import AnecdoteList from "./AnecdoteList";

const Menu = (props) => {
  console.log(props)
  const padding = {
    padding: 5,
  };
  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          Anecdotes
        </Link>
        <Link style={padding} to="/create">
          Create new
        </Link>
        <Link style={padding} to="/about">
          About
        </Link>
      </div>

      <Routes>
        <Route
          path="/"
          element={<AnecdoteList anecdotes={props.anecdotes} />}
        />
        <Route path="/create" element={<CreateAnecdote addNew={props.addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default Menu;
