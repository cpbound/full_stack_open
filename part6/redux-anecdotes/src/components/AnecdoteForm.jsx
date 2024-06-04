import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdotes.value;
    console.log("add", content);
    event.target.anecdotes.value = "";
    dispatch(createAnecdote(content));
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdotes" />
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
