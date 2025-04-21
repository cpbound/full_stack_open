import { useParams, Link } from "react-router-dom";
const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdoteToShow = anecdotes.find((n) => n.id === Number(id));
  return (
    <div>
      <h1>{anecdoteToShow.content}</h1>
      <p>has {anecdoteToShow.votes} votes</p>
      <p>
        for more info see{" "}
        <Link to={anecdoteToShow.info}>{anecdoteToShow.info}</Link>
      </p>
    </div>
  );
};

export default Anecdote;
