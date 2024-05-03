import { configureStore } from "@reduxjs/toolkit";

import GroupSlice from "@/CONTEXT/MISC/HOME/GroupSlice";
import ProjectListSlice from "@/CONTEXT/MISC/HOME/ProjectListSlice";

import ProjectSlice from "@/CONTEXT/MISC/PROJECT/ProjectSlice";
import LogSlice from "@/CONTEXT/MISC/PROJECT/LogSlice";
import IssueSlice from "@/CONTEXT/MISC/PROJECT/IssueSlice";
import CurrentIssueSlice from "@/CONTEXT/MISC/PROJECT/CurrentIssueSlice";

import AlertSlice from "@/CONTEXT/SHARED/AlertSlice";

export default configureStore({
  reducer: {
    groupSlice: GroupSlice,
    projectSlice: ProjectSlice,
    projectListSlice: ProjectListSlice,
    alertSlice: AlertSlice,
    issueSlice: IssueSlice,
    currentIssueSlice: CurrentIssueSlice,
    logSlice: LogSlice,
  },
});
