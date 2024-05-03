import { createSlice } from "@reduxjs/toolkit";

export const CurrentIssueSlice = createSlice({
  name: "CurrentIssueSlice",
  initialState: {
    value: [],
  },
  reducers: {
    setIssue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIssue } = CurrentIssueSlice.actions;

export default CurrentIssueSlice.reducer;
