import { configureStore } from "@reduxjs/toolkit";
import GroupSlice from "./HOME/GroupSlice";
import ProjectSlice from "./HOME/ProjectSlice";
import AlertSlice from "./SHARED/AlertSlice";

export default configureStore({
  reducer: {
    groupSlice: GroupSlice,
    projectSlice: ProjectSlice,
    alertSlice: AlertSlice,
  },
});
