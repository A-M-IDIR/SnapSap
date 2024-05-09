import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import DescriptionInput from "@/COMPONENTS/SHARED/DescriptionInput";
import Selector from "@/COMPONENTS/SHARED/Selector";

import WithSectionLabel from "@/RESOURCES/HOCS/WithSectionLabel";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { setProjectList } from "@/CONTEXT/MISC/HOME/ProjectListSlice";
import { setIssues } from "@/CONTEXT/MISC/PROJECT/IssueSlice";

import C from "./style.module.scss";

function QuickIssue() {
  const globalIssues = useSelector((state) => state.issueSlice.value);
  const projects = useSelector((state) => state.projectListSlice.value);
  const [logs, setLogs] = React.useState(null);
  const [newIssue, setNewIssue] = React.useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************** REQUESTS ********************/
  const addNewIssueMutation = UseRequest({
    onSuccess: (result) => {
      if (
        location.pathname != "/project" ||
        QueryParamHandler.GetParam("id") != newIssue.projectId
      ) {
        navigate(QueryParamHandler.RemoveParam("new_issue"));
        AlertHandler({ dispatch, message: "Added !", type: "success" });

        return;
      }

      const label = logs.filter((e) => e._id === newIssue.logId)[0].label;

      let updatedIssues = { ...globalIssues };

      if (updatedIssues[label]) {
        updatedIssues = {
          ...updatedIssues,
          [label]: [...updatedIssues[label], result.data],
        };
      } else {
        updatedIssues[label] = [result.data];
      }

      dispatch(setIssues(updatedIssues));
      AlertHandler({ dispatch, message: "Added !", type: "success" });
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });

  const getProjectsMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(setProjectList(result.data));
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });

  const getLogsMutation = UseRequest({
    onSuccess: (result) => {
      setLogs(result.data);
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    if (projects) {
      return;
    }

    getProjectsMutation.mutate({
      route: "project",
      method: "GET",
    });
  }, []);

  React.useEffect(() => {
    let issue = { ...newIssue };
    delete issue["logId"];
    setNewIssue(issue);

    if (newIssue.projectId === undefined) {
      setLogs(null);

      return;
    }

    getLogsMutation.mutate({
      route: `log?projectId=${newIssue.projectId}`,
      method: "GET",
    });
  }, [newIssue.projectId]);

  const handleChange = (key, value) => {
    let issue = { ...newIssue };

    if (!value) {
      delete issue[key];
    } else {
      issue[key] = value;
    }

    setNewIssue(issue);
  };

  const handleCancle = () => {
    navigate(QueryParamHandler.RemoveParam("new_issue"));
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!newIssue.projectId || !newIssue.logId) {
      AlertHandler({
        dispatch,
        message: "Please Provide Project & Log.",
        type: "warning",
        duration: 2,
      });

      return;
    }

    addNewIssueMutation.mutate({
      route: "issue",
      method: "POST",
      load: {
        ...newIssue,
      },
    });
  };

  return (
    <form className={C.QuickIssue} onSubmit={handleConfirm}>
      <div className={C.Content}>
        <WithSectionLabel label={"SUMMARY"}>
          <input
            className={C.FieldInput}
            onChange={(e) => handleChange("summary", e.target.value)}
            required={true}
            spellCheck={false}
          />
        </WithSectionLabel>

        <aside>
          <WithSectionLabel label={"PROJECT"}>
            <Selector
              elements={projects ? projects : []}
              label={"projectName"}
              value={"_id"}
              defaultValue={[]}
              allowClear
              placeholder="-"
              variant="filled"
              style={{
                width: "100%",
                height: "38px",
                borderRadius: "0.2rem",
              }}
              onChange={(value) => handleChange("projectId", value)}
            />
          </WithSectionLabel>

          <WithSectionLabel label={"LOG"}>
            <Selector
              elements={logs ? logs : []}
              label={"label"}
              value={"_id"}
              selected={newIssue.logId}
              defaultValue={[]}
              allowClear
              placeholder="-"
              variant="filled"
              disabled={logs ? false : true}
              style={{
                width: "100%",
                height: "38px",
                borderRadius: "0.2rem",
              }}
              onChange={(value) => handleChange("logId", value)}
            />
          </WithSectionLabel>
        </aside>

        <WithSectionLabel label={"ABOUT"}>
          <DescriptionInput
            onChange={(description) => {
              handleChange("description", description);
            }}
          />
        </WithSectionLabel>
      </div>

      <div className={C.Footer}>
        <Button
          label={"CANCEL"}
          theme={buttonThemes.LightGray}
          style={{ height: "34px" }}
          onMouseUp={handleCancle}
          type="button"
        />

        <Button type="submit" label={"CREATE"} style={{ height: "34px" }} />
      </div>
    </form>
  );
}

export default QuickIssue;
