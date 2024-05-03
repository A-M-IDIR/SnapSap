import React from "react";

import propTypes from "prop-types";
import { motion } from "framer-motion";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { useNavigate, useLocation } from "react-router-dom";

import PriorityLabel from "@/COMPONENTS/SHARED/PriorityLabel";
import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import Assignees from "@/COMPONENTS/SHARED/Assignees";
import EstimatedTime from "@/COMPONENTS/SHARED/EstimatedTime";
import MiniTaskSummary from "@/COMPONENTS/SHARED/MiniTaskSummary";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import WithCopy from "@/RESOURCES/HOCS/WithCopy";

import C from "./style.module.scss";

function BackLogTask({
  _id,
  summary,
  priority,
  assignees,
  estimate,
  log,
  isDragging,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const handleMouseUp = () => {
    if (!isDragging) {
      navigate(QueryParamHandler.UpdateParam("task", _id));
    }
  };

  React.useEffect(() => {
    if (!isDragging) {
      navigate(QueryParamHandler.RemoveParam("drag"));

      return;
    }

    navigate(QueryParamHandler.UpdateParam("drag", 1));
  }, [isDragging]);

  return (
    <motion.div
      className={C.BackLogTask}
      whileHover={!isDragging && { backgroundColor: "rgb(246, 246, 246)" }}
      whileTap={{ backgroundColor: "rgb(252, 252, 252)" }}
    >
      <div className={C.HitBox} onMouseUp={handleMouseUp}></div>

      <aside style={{ width: "100%" }}>
        <PriorityLabel level={priority} />

        <MiniTaskSummary
          summary={summary}
          taskId={_id}
          log={log}
          style={
            urlParams.get("drag")
              ? { pointerEvents: "none" }
              : { pointerEvents: "all" }
          }
        />
      </aside>

      <aside style={{ minWidth: "max-content" }}>
        <Assignees
          assignees={assignees}
          style={
            urlParams.get("drag")
              ? { pointerEvents: "none" }
              : { pointerEvents: "all" }
          }
        />

        <div className={C.Divider}></div>

        <EstimatedTime
          estimate={estimate}
          style={
            urlParams.get("drag")
              ? { pointerEvents: "none" }
              : { pointerEvents: "all" }
          }
        />

        <div className={C.Divider}></div>

        <WithLabel
          label={"COPY-LINK"}
          isBottom={true}
          style={
            urlParams.get("drag")
              ? { pointerEvents: "none" }
              : { pointerEvents: "all" }
          }
        >
          <WithCopy content={`${document.location.href}&task=${_id}`}>
            <Button
              icon={SvgHandler.Copy({ width: "10px" })}
              style={{ height: "24px", width: "30px" }}
              theme={buttonThemes.LightGray}
            />
          </WithCopy>
        </WithLabel>
      </aside>
    </motion.div>
  );
}

export const BackLogTaskPropTypes = {
  _id: propTypes.string.isRequired,
  summary: propTypes.string,
  priority: propTypes.number.isRequired,
  assignees: propTypes.arrayOf(
    propTypes.shape({
      avatar: propTypes.string,
      userName: propTypes.string.isRequired,
    })
  ),
  isDragging: propTypes.bool,
};

BackLogTask.propTypes = BackLogTaskPropTypes;

export default BackLogTask;
