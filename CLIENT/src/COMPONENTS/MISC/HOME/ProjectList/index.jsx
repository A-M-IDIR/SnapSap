import React from "react";

import { motion } from "framer-motion";

import ListActions from "./ListActions";
import List from "./List";
import ProjectPopUp from "./ProjectPopUp";
import GroupList from "@/COMPONENTS/MISC/HOME/GroupList";

import WithView from "@/RESOURCES/HOCS/WithView";

import C from "./style.module.scss";

function ProjectList() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={C.ProjectList}
    >
      <div className={C.Header}>
        <ListActions />

        <GroupList />
      </div>

      <List />

      <WithView viewKey={"new"} style={{ padding: "30px" }}>
        <ProjectPopUp />
      </WithView>
    </motion.div>
  );
}

export default ProjectList;
