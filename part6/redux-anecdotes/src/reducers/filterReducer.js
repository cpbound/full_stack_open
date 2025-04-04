import { createSlice } from "@reduxjs/toolkit";
// export const setFilter = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };

// const filterReducer = (state = { filter: "" }, action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return { ...state, filter: action.payload };
//     default:
//       return state;
//   }
// };

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
