import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import propTypes from "prop-types";
import { motion } from "framer-motion";

import PriorityLabel from "@/COMPONENTS/SHARED/PriorityLabel";
import EstimatedTime from "@/COMPONENTS/SHARED/EstimatedTime";
import Assignees from "@/COMPONENTS/SHARED/Assignees";

import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

import C from "./style.module.scss";

function BoardTask({
  _id,
  summary,
  assignees,
  priority,
  estimate,
  isDragging,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  React.useEffect(() => {
    if (!isDragging) {
      navigate(QueryParamHandler.RemoveParam("drag"));

      return;
    }

    navigate(QueryParamHandler.UpdateParam("drag", 1));
  }, [isDragging]);

  const handleMouseUp = () => {
    if (!isDragging) {
      navigate(QueryParamHandler.UpdateParam("task", _id));
    }
  };

  return (
    <motion.div
      className={C.BoardTask}
      whileHover={
        !isDragging && {
          backgroundColor: "rgb(250, 250, 250)",
          y: -2,
        }
      }
      whileTap={{
        backgroundColor: "rgb(252, 252, 252)",
        y: 2,
      }}
      transition={{ type: "spring", stiffness: 800, damping: 30 }}
      style={isDragging ? { pointerEvents: "none" } : {}}
      onMouseUp={handleMouseUp}
    >
      <div className={C.Content}>
        <p>{!summary ? "-" : summary}</p>
      </div>

      <div
        className={C.Footer}
        style={
          urlParams.get("drag")
            ? { pointerEvents: "none" }
            : { pointerEvents: "all" }
        }
      >
        <Assignees assignees={assignees} />

        <aside>
          <PriorityLabel level={priority} />

          <div className={C.Divider}></div>

          <EstimatedTime estimate={estimate} />
        </aside>
      </div>
    </motion.div>
  );
}

export const taskPropTypes = {
  _id: propTypes.string.isRequired,
  summary: propTypes.string.isRequired,
  assignees: propTypes.arrayOf(
    propTypes.shape({
      avatar: propTypes.string,
      userName: propTypes.string.isRequired,
    })
  ),
  priority: propTypes.number.isRequired,
  estimate: propTypes.number.isRequired,
  isDragging: propTypes.bool,
};

BoardTask.propTypes = taskPropTypes;

export default BoardTask;
