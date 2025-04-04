import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const upVote = (id, content) => {
    dispatch(addVote(id));
    dispatch(setNotification(`${content} was up voted!`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            <strong>has</strong> {anecdote.votes} votes.
            <div>
              <button onClick={() => upVote(anecdote.id, anecdote.content)}>Vote</button>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
