import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // createAnecdote: (state, action) => {
    //   state.push(action.payload);
    // },
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
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
