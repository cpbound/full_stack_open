import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState(null);

  if (!result.data) return <div>loading...</div>;

  const genres = [
    ...new Set(result.data?.allBooks.flatMap((book) => book.genres)),
  ];

  const filteredBooks = genre
    ? result.data?.allBooks.filter((book) => book.genres.includes(genre))
    : result.data?.allBooks;

  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
