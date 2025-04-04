import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

const AnnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(newAnecdote(content));
    event.target.anecdote.value = "";
    dispatch(setNotification(`You created the anecdote: '${content}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000)
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default AnnecdoteForm;
