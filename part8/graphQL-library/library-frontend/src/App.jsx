import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");

  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        <button onClick={() => setPage("add")}>Add book</button>
      </div>

      <Authors authors = {result.data.allAuthors} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
