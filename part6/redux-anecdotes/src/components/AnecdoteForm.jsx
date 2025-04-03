import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
const AnnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    event.target.anecdote.value = "";
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
