import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import Selector from "@/COMPONENTS/SHARED/Selector";

import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { setLogs } from "@/CONTEXT/MISC/PROJECT/LogSlice";
import { setIssues } from "@/CONTEXT/MISC/PROJECT/IssueSlice";

import MEDAL from "/public/ICONS/MEDAL.png";

import C from "./style.module.scss";

function EndSprint({ _id, label, closedIssues, openIssues }) {
  const logs = useSelector((state) => state.logSlice.value);
  const issues = useSelector((state) => state.issueSlice.value);
  const [targetSprint, setTargetSprint] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************** REQUESTS ********************/
  const deleteSprintMutation = UseRequest({
    onSuccess: () => {
      dispatch(
        setLogs(
          logs.filter((e) => e._id != QueryParamHandler.GetParam("sprint"))
        )
      );
      navigate(
        `/project?id=${QueryParamHandler.GetParam(
          "id"
        )}&section=${QueryParamHandler.GetParam("section")}`
      );
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });

  const moveManyIssuesMutation = UseRequest({
    onSuccess: () => {
      let updatedIssues = { ...issues };

      openIssues.forEach((e) => {
        const targetIssue = updatedIssues[e.log.label].filter(
          (el) => el._id == e._id
        )[0];
        const targetSprintLabel = logs.find(
          (log) => log._id === targetSprint
        )?.label;

        updatedIssues[e.log.label] = updatedIssues[e.log.label].filter(
          (el) => el._id != e._id
        );

        if (updatedIssues[targetSprintLabel]) {
          updatedIssues = {
            ...updatedIssues,
            [targetSprintLabel]: [
              ...updatedIssues[targetSprintLabel],
              targetIssue,
            ],
          };
        } else {
          updatedIssues[targetSprintLabel] = [targetIssue];
        }
      });

      dispatch(setIssues(updatedIssues));

      deleteSprintMutation.mutate({
        route: `log?logId=${QueryParamHandler.GetParam("sprint")}`,
        method: "DELETE",
      });
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  const handleConfirm = () => {
    if (targetSprint) {
      moveManyIssuesMutation.mutate({
        route: "issue/transfer",
        method: "PATCH",
        load: {
          issues: openIssues,
          logId: logs.find((log) => log._id === targetSprint)._id,
        },
      });

      return;
    }

    deleteSprintMutation.mutate({
      route: `log?logId=${QueryParamHandler.GetParam("sprint")}`,
      method: "DELETE",
    });
  };

  return (
    <div className={C.EndSprint}>
      <div className={C.Header}>
        <img src={MEDAL} />
      </div>

      <div className={C.Content}>
        <div className={C.Title}>
          <h2>COMPLETE {label}</h2>

          <div className={C.Shadow}></div>
        </div>

        <p style={{ marginBottom: "0.8rem" }}>This sprint contains : </p>

        <div className={C.Info}>
          <p>-</p>

          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "15px",
              padding: "0 0.2rem",
              backgroundColor: "rgb(215, 215, 255)",
            }}
          >
            {openIssues.length}
          </p>

          <p>open issues.</p>
        </div>

        <div className={C.Info}>
          <p>-</p>

          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "15px",
              padding: "0 0.2rem",
              backgroundColor: "rgb(215, 215, 255)",
            }}
          >
            {closedIssues.length}
          </p>

          <p>completed issues.</p>
        </div>
      </div>

      <div className={C.Action}>
        {openIssues && openIssues.length > 0 ? (
          <>
            <p
              style={{
                marginBottom: "0.4rem",
                color: "rgb(100,100,100)",
                fontSize: "0.7rem",
              }}
            >
              Move open issues to
            </p>

            <Selector
              defaultValue={[]}
              elements={logs.filter((e) => e._id != _id)}
              label={"label"}
              value={"_id"}
              placeholder="-"
              variant="filled"
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              style={{
                width: "100%",
                minWidth: "120px",
                height: "30px",
                fontSize: "0.4rem",
              }}
              size="small"
              onChange={(value) => setTargetSprint(value)}
            />
          </>
        ) : (
          <p>That's all of them - well done!</p>
        )}
      </div>

      <div className={C.Footer}>
        <Button
          theme={buttonThemes.LightGray}
          style={{ height: "30px" }}
          label={"CANCLE"}
          onClick={() => {
            navigate(QueryParamHandler.RemoveParam("sprint"));
          }}
        />

        <Button
          style={{ height: "30px" }}
          label={"CONFIRM"}
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
}

export default EndSprint;
