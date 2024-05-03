import { createSlice } from "@reduxjs/toolkit";

export const IssueSlice = createSlice({
  name: "issueSlice",
  initialState: {
    value: null,
  },
  reducers: {
    setIssues: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIssues } = IssueSlice.actions;

export default IssueSlice.reducer;
