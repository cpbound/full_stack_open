import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();

  const setNotification = (message) => {
    dispatch({ type: "SET", payload: message });
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      setNotification(error.message);
    }
  });

  const queryClient = useQueryClient();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    // if (content.length < 5) {
    //   setNotification("Anecdote must be longer than five characters");
    //   return;
    // }

    try {
      await newAnecdoteMutation.mutateAsync({ content, votes: 0 });
      setNotification(`A new anecdote ${content} created`);
    } catch (error) {
      setNotification(error.message);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
