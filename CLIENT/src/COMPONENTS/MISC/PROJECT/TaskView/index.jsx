import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import C from "./style.module.scss";

function TaskView() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(useLocation().search);

  const handleClose = () => {
    navigate(
      `/project?id=${urlParams.get("id")}&section=${urlParams.get("section")}`
    );
  };

  return (
    <AnimatePresence>
      {urlParams.get("task") && (
        <>
          <motion.div
            className={C.BackDrop}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            key={"BACK-DROP"}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default TaskView;
