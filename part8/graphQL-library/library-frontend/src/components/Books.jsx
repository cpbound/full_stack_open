import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const [genre, setGenre] = useState(null);
  const { data } = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  const allGenres = useQuery(ALL_BOOKS);

  if (!data || !allGenres) return <div>loading...</div>;

  const genres = [
    ...new Set(allGenres.data?.allBooks.flatMap((book) => book.genres)),
  ];

  const filteredBooks = data?.allBooks;

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
