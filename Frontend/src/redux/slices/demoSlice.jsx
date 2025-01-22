import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const demoSlice = createSlice({
  name: "demoSlice",
  initialState: initialState,
  reducers: {
    addApplication: (state, action) => {
      action.payload.forEach((t) => {
        if (!state.find((task) => task._id == t._id)) {
          state.push(t);
        }
      });
    },
    addOneApplication: (state, action) => {
      state.push(action.payload);
    },
    updateApplication: (state, action) => {
      return state.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    },
    replaceTask: (state, action) => {
      return action.payload;
    },
    deleteApplication: (state, action) => {
      return state.filter((task) => task._id != action.payload.id);
    },
  },
});

export const { addOneApplication, addApplication, deleteApplication, updateApplication, replaceTask } = demoSlice.actions;
export default demoSlice.reducer;
