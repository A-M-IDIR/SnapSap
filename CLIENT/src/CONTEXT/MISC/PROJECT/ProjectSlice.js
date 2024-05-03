import { createSlice } from "@reduxjs/toolkit";

export const ProjectSlice = createSlice({
  name: "projectSlice",
  initialState: {
    value: null,
  },
  reducers: {
    setProject: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProject } = ProjectSlice.actions;

export default ProjectSlice.reducer;
