import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    loadperson: (state, action) => {
      state.info = action.payload;
    },
    removeperson: (state, action) => {
      state.info = null;
    },
  },
});

export default personSlice.reducer;
export const { loadperson, removeperson } = personSlice.actions;
