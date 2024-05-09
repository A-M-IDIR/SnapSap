import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

import WithSectionLabel from "@/RESOURCES/HOCS/WithSectionLabel";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { addLog, setLogs } from "@/CONTEXT/MISC/PROJECT/LogSlice";
import { states } from "@/RESOURCES/CONSTANTS/Sprint";

import C from "./style.module.scss";

function NewSprint({ sprint }) {
  const logs = useSelector((state) => state.logSlice.value);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [label, setLabel] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const updateSprintMutation = UseRequest({
    onSuccess: (result) => {
      const logIndex = logs.findIndex(
        (e) => e._id === QueryParamHandler.GetParam("sprint")
      );

      let updatedLogs = [...logs];
      updatedLogs[logIndex] = result.data;

      dispatch(setLogs(updatedLogs));
      navigate(QueryParamHandler.RemoveParam("sprint"));

      AlertHandler({ dispatch, message: "Updated !", type: "success" });
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });

  const addSprintMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(addLog(result.data));
      navigate(QueryParamHandler.RemoveParam("sprint"));

      AlertHandler({ dispatch, message: "Added !", type: "success" });
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    if (sprint) {
      setLabel(sprint.label);
      if (sprint.startDate) setStartDate(dayjs(sprint.startDate));
      if (sprint.endDate) setEndDate(dayjs(sprint.endDate));
    }
  }, []);

  const handleSave = () => {
    if (QueryParamHandler.GetParam("sprint") === "new") {
      addSprintMutation.mutate({
        route: `log`,
        method: "POST",
        load: {
          label,
          startDate,
          endDate,
          project: QueryParamHandler.GetParam("id"),
          state: states.AWAITING,
        },
      });
      return;
    }

    updateSprintMutation.mutate({
      route: `log?logId=${QueryParamHandler.GetParam("sprint")}`,
      method: "PATCH",
      load: { updatedData: { label, startDate, endDate } },
    });
  };

  return (
    <div className={C.NewSprint}>
      <WithSectionLabel label={"SPRINT-TITLE"}>
        <input
          type="text"
          spellCheck={false}
          className={C.FieldInput}
          placeholder="HM..."
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required={true}
        />
      </WithSectionLabel>

      <WithSectionLabel label={"START-DATE"}>
        <DatePicker
          showTime
          format={"MM-DD-YY / HH:mm"}
          variant="filled"
          value={startDate}
          disabledDate={(current) => {
            return current && current < dayjs().startOf("day");
          }}
          onChange={(_, dateStr) => {
            if (dateStr) {
              setStartDate(dayjs(dateStr));
            } else {
              setStartDate(null);
            }
          }}
          needConfirm={false}
          placeholder={"-"}
          style={{ height: "35px" }}
        />
      </WithSectionLabel>

      <WithSectionLabel label={"END-DATE"}>
        <DatePicker
          showTime
          format={"MM-DD-YY / HH:mm"}
          disabledDate={(current) => {
            return current && current < dayjs().startOf("day");
          }}
          variant="filled"
          value={endDate}
          onChange={(_, dateStr) => {
            if (dateStr) {
              setEndDate(dayjs(dateStr));
            } else {
              setEndDate(null);
            }
          }}
          needConfirm={false}
          placeholder={"-"}
          style={{ height: "35px" }}
        />
      </WithSectionLabel>

      <aside>
        <Button
          theme={buttonThemes.LightGray}
          style={{ height: "30px" }}
          label={"CANCEL"}
          onClick={() => {
            navigate(QueryParamHandler.RemoveParam("sprint"));
          }}
        />

        <Button
          style={{ height: "30px" }}
          label={"SAVE"}
          onClick={handleSave}
        />
      </aside>
    </div>
  );
}

export default NewSprint;
