import React from "react";

import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import ErrorHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { setIssues } from "@/CONTEXT/MISC/PROJECT/IssueSlice";

import C from "./style.module.scss";

function MiniTaskSummary({ taskId, summary, log, ...rest }) {
  const [editable, setEditable] = React.useState(false);
  const [summaryValue, setSummaryValue] = React.useState(summary);
  const issues = useSelector((state) => state.issueSlice.value);

  const inputRef = React.useRef(null);
  const urlParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const updateIssueMutation = UseRequest({
    onSuccess: (result) => {
      let updatedIssues = { ...issues };
      let updatedIssuesList = [...updatedIssues[log.label ? log.label : log]]; // TO BE CORRECTED LATER
      const issueIndex = updatedIssuesList.findIndex((e) => e._id === taskId);

      updatedIssuesList[issueIndex] = result.data;
      updatedIssues[log.label ? log.label : log] = updatedIssuesList; // TO BE CORRECTED LATER

      dispatch(setIssues(updatedIssues));
    },
    onError: (error) => ErrorHandler({ dispatch, error }),
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    if (editable) {
      inputRef.current.focus();
    }
  }, [editable]);

  React.useEffect(() => {
    setSummaryValue(summary);
  }, [summary]);

  const handleInputChange = (e) => {
    setSummaryValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleUpdate();
    }
  };

  const handleChange = (updatedData) => {
    updateIssueMutation.mutate({
      route: "issue",
      method: "PATCH",
      load: {
        issueId: taskId,
        updatedData,
      },
    });
  };

  const handleUpdate = () => {
    handleChange({ summary: summaryValue });
    setEditable(false);
  };

  return (
    <div className={C.MiniTaskSummary}>
      {editable ? (
        <input
          ref={inputRef}
          className={`${C.SummaryInput} ${editable && C.InputActive}`}
          onChange={handleInputChange}
          onBlur={handleUpdate}
          onKeyDown={handleInputKeyDown}
          value={summaryValue}
          disabled={!editable}
          {...rest}
        />
      ) : (
        <WithLabel
          label={"SUMMARY"}
          isBottom={true}
          labelStyle={{ pointerEvents: "none" }}
        >
          <p
            className={C.SummaryInput}
            onClick={() => {
              if (!urlParams.get("drag")) setEditable(true);
            }}
            {...rest}
          >
            {updateIssueMutation.isLoading ? (
              summaryValue
            ) : (
              <> {summary.trim() === "" ? "-" : summary}</>
            )}
          </p>
        </WithLabel>
      )}
    </div>
  );
}

MiniTaskSummary.propTypes = {
  taskId: propTypes.string.isRequired,
  summary: propTypes.string.isRequired,
};

export default MiniTaskSummary;
