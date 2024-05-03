import React from "react";

import { useDispatch } from "react-redux";

import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { states } from "@/RESOURCES/CONSTANTS/Project";

import C from "./style.module.scss";

function State({ lead, projectId, state }) {
  const [rendered, setRendered] = React.useState(false);
  const [currentState, setCurrentState] = React.useState(null);

  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const updatedProjectMutation = UseRequest({
    onSuccess: () => {},
    onError: () => AlertHandler(dispatch, "Error Updating Project sTATE."),
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    if (state) setCurrentState(states[state.label]);
  }, [state]);

  React.useEffect(() => {
    if (currentState) {
      setRendered(true);
    }

    if (rendered) {
      updatedProjectMutation.mutate({
        route: "project",
        method: "PATCH",
        load: {
          projectId,
          updatedData: {
            state: currentState._id,
          },
        },
      });
    }
  }, [currentState]);

  const handleUpdateState = () => {
    if (lead._id === JSON.parse(localStorage.getItem("user"))._id) {
      if (currentState.label === "WAITING") {
        setCurrentState(states["STARTED"]);
      } else if (currentState.label === "STARTED") {
        setCurrentState(states["CLOSED"]);
      } else {
        setCurrentState(states["WAITING"]);
      }
    }
  };

  return (
    <div
      className={C.State}
      style={
        lead._id != JSON.parse(localStorage.getItem("user"))._id
          ? {
              cursor: "not-allowed",
            }
          : {}
      }
      onMouseUp={handleUpdateState}
    >
      <p style={{ backgroundColor: currentState?.color }}>
        {currentState?.label}
      </p>
    </div>
  );
}

export default State;
