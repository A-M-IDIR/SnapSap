import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";

import Priority from "@/COMPONENTS/SHARED/Priority";

import C from "./style.module.scss";

function BackLogTask(props) {
  const { isDragging, description, priority, assignees } = props;

  const navigate = useNavigate();
  const urlParams = new URLSearchParams(useLocation().search);

  const handleMouseUp = () => {
    if (!isDragging) {
      // LATER USE TASK ID
      navigate(
        `/project?id=${urlParams.get("id")}&section=${"backlog"}&task=${v4()}`
      );
    }
  };

  return (
    <div className={C.BackLogTask} onMouseUp={handleMouseUp}>
      <aside style={{ width: "100%" }}>
        <Priority level={priority} />

        <p>{description}</p>
      </aside>

      <aside style={{ minWidth: "max-content" }}>
        <div className={C.Assignees}>
          {assignees.slice(0, 2).map((e, i) => (
            <div className={C.Assignee} key={v4()}>
              <img src={e.avatar} />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default BackLogTask;
