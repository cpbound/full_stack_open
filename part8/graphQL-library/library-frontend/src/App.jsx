import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <div>
          <nav>
            <button>
              <Link to="/authors">Authors</Link>
            </button>
            <button>
              <Link to="/books">Books</Link>
            </button>
            <button>
              <Link to="/add">Add book</Link>
            </button>
          </nav>
        </div>
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
          <Route path="/" element={<Authors />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
