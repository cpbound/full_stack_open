import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            <strong>has</strong> {anecdote.votes} votes.
            <div>
              <button onClick={() => dispatch(vote(anecdote.id))}>Vote</button>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
