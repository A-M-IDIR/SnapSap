import { createSlice } from "@reduxjs/toolkit";

export const ProjectListSlice = createSlice({
  name: "projectListSlice",
  initialState: {
    value: null,
  },
  reducers: {
    addProject: (state, action) => {
      state.value.push(action.payload);
    },
    setProjectList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addProject, setProjectList } = ProjectListSlice.actions;

export default ProjectListSlice.reducer;
