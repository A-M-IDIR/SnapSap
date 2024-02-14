import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import propTypes from "prop-types";

import Priority from "@/COMPONENTS/SHARED/Priority";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function BoardTask(props) {
  const { description, assignees, priority, dueTime, isDragging } = props;

  const navigate = useNavigate();
  const urlParams = new URLSearchParams(useLocation().search);

  const handleMouseUp = () => {
    if (!isDragging) {
      // LATER USE TASK ID
      navigate(
        `/project?id=${urlParams.get("id")}&section=${"board"}&task=${v4()}`
      );
    }
  };

  return (
    <div
      className={`${C.BoardTask} ${isDragging && C.Dragging}`}
      onMouseUp={handleMouseUp}
    >
      <div className={C.Content}>
        <p>{description}</p>
      </div>

      <div className={C.Footer}>
        <div className={C.Assignees}>
          {assignees.slice(0, 2).map((e, i) => (
            <div className={C.Assignee} key={v4()}>
              <img src={e.avatar} />
            </div>
          ))}
        </div>

        <aside>
          <Priority level={priority} />

          <div className={C.DueTime}>
            <span>{SvgHandler.DueTime()}</span>

            <p>{dueTime}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export const taskPropTypes = {
  description: propTypes.string.isRequired,
  assignees: propTypes.array.isRequired,
  priority: propTypes.number.isRequired,
  dueTime: propTypes.string.isRequired,
  isDragging: propTypes.bool,
};

BoardTask.propTypes = taskPropTypes;

BoardTask.defaultProps = {
  description: "-",
  assignees: [],
  priority: 3,
  dueTime: "-",
  isDragging: false,
};

export default BoardTask;
