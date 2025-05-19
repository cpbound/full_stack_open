import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommendations = () => {
  const userResult = useQuery(ME);
  const booksResult = useQuery(ALL_BOOKS);

  if (userResult.loading || booksResult.loading) {
    return <div>Loading...</div>;
  }

  const favoriteGenre = userResult.data.me.favoriteGenre;
  const books = booksResult.data.allBooks.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre: <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
