import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    newAnecdote: (state, action) => {
      const content = action.payload;
      state.push({ content, votes: 0, id: getId() });
    },
    addVote: (state, action) => {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state
        .map((a) => (a.id !== id ? a : votedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote: (state, action) => {
      const content = action.payload;
      console.log(content)
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { newAnecdote, addVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
