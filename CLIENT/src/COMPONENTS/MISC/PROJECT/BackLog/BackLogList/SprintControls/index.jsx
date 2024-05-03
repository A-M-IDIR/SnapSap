import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { setLogs } from "@/CONTEXT/MISC/PROJECT/LogSlice";
import { states } from "@/RESOURCES/CONSTANTS/Sprint";

function SprintControls({ logId, state }) {
  const logs = useSelector((state) => state.logSlice.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************** REQUESTS ********************/
  const updateSprintMutation = UseRequest({
    onSuccess: (result) => {
      const logIndex = logs.findIndex((e) => e._id === logId);

      let updatedLogs = [...logs];
      updatedLogs[logIndex] = result.data;

      dispatch(setLogs(updatedLogs));
      AlertHandler({ dispatch, message: "Started !", type: "success" });
    },
    onError: (error) => {
      navigate(QueryParamHandler.UpdateParam("sprint", logId));

      setTimeout(() => {
        AlertHandler({ dispatch, error, duration: 2 });
      }, 200);
    },
  });
  /******************** REQUESTS ********************/

  const handleClick = () => {
    if (state.label === "STARTED") {
      navigate(QueryParamHandler.UpdateParam("sprint", logId));
      navigate(QueryParamHandler.UpdateParam("end", "1"));
    } else {
      updateSprintMutation.mutate({
        route: `log?logId=${logId}`,
        method: "PATCH",
        load: { updatedData: { state: states.STARTED } },
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <WithLabel
        isBottom={true}
        label={state.label === "STARTED" ? "END-SPRINT" : "START-SPRINT"}
        labelStyle={{ top: "42px" }}
        key={2}
      >
        <Button
          icon={
            state.label === "STARTED"
              ? SvgHandler.Pause({ width: "10.5px" })
              : SvgHandler.Play({ width: "9.5px", marginLeft: "0.03rem" })
          }
          style={{ width: "40px", height: "32px" }}
          theme={
            state.label === "STARTED" ? buttonThemes.Red : buttonThemes.Blue
          }
          onMouseUp={handleClick}
        />
      </WithLabel>
    </AnimatePresence>
  );
}

export default SprintControls;
