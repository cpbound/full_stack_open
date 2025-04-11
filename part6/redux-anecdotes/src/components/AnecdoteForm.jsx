import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { selectNotification } from "../reducers/notificationReducer";
// import anecdoteService from "../services/anecdotes";

const AnnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(selectNotification(`You created the anecdote: '${content}'`, 5));
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
