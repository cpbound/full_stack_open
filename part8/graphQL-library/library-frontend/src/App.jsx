import { useApolloClient, useSubscription } from "@apollo/client";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BOOK_ADDED } from "./queries";
import Authors from "./components/Authors";
import LoginForm from "./components/LoginForm";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import Notification from "./components/Notification";

const App = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      if (!data) return;
      const book = data.data.bookAdded;
      console.log("📚 New book added via subscription:", book);
      window.alert(`New book added: ${book.title} by ${book.author.name}`);
    },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("library-user-token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <Router>
      <Notification notification={error} />
      <div>
        {!token ? (
          <>
            <LoginForm setToken={setToken} setError={setError} />
            <nav>
              <button>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/authors"
                >
                  Authors
                </Link>
              </button>
              <button>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/books"
                >
                  Books
                </Link>
              </button>
            </nav>
          </>
        ) : (
          <div>
            <button onClick={() => logout()}>Logout</button>
            <nav>
              <button>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/authors"
                >
                  Authors
                </Link>
              </button>
              <button>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/books"
                >
                  Books
                </Link>
              </button>
              <button>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/add"
                >
                  Add book
                </Link>
              </button>
              <button>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/recommendations"
                >
                  Recommendations
                </Link>
              </button>
            </nav>
          </div>
        )}
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/" element={<Authors />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
