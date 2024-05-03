import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputNumber } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import TextArea from "@/COMPONENTS/SHARED/TextArea";
import Selector from "@/COMPONENTS/SHARED/Selector";
import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import DescriptionInput from "@/COMPONENTS/SHARED/DescriptionInput";
import TimeTracker from "@/COMPONENTS/SHARED/TimeTracker";

import WithCopy from "@/RESOURCES/HOCS/WithCopy";
import WithSectionLabel from "@/RESOURCES/HOCS/WithSectionLabel";
import UseResize from "@/RESOURCES/HOOKS/SHARED/UseResize";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { setIssues } from "@/CONTEXT/MISC/PROJECT/IssueSlice";
import { states } from "@/RESOURCES/CONSTANTS/Board";

import C from "./style.module.scss";

function Task() {
  const issues = useSelector((state) => state.issueSlice.value);
  const [task, setTask] = React.useState(null);
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { windowWidth } = UseResize();

  /******************* REQUESTS ********************/
  const getIssueMutation = UseRequest({
    onSuccess: (result) => {
      setTask(result.data);
    },
    onError: (error) => {
      navigate(QueryParamHandler.RemoveParam("task"));
      AlertHandler({ dispatch, error });
    },
  });

  const updateIssueMutation = UseRequest({
    onSuccess: (result) => {
      let updatedIssues = { ...issues };
      let updatedIssuesList = [
        ...updatedIssues[
          QueryParamHandler.GetParam("section") === "backlog"
            ? task.log.label
            : task.state.label
        ],
      ];

      const issueIndex = updatedIssuesList.findIndex((e) => e._id === task._id);

      updatedIssuesList[issueIndex] = result.data;
      updatedIssues[
        QueryParamHandler.GetParam("section") === "backlog"
          ? task.log.label
          : task.state.label
      ] = updatedIssuesList;

      dispatch(setIssues(updatedIssues));
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });

  const deleteIssueMutation = UseRequest({
    onSuccess: (result) => {
      let updatedIssues;
      let updatedList;

      if (QueryParamHandler.GetParam("section") === "backlog") {
        updatedIssues = { ...issues };
        updatedList = updatedIssues[result.data.log.label].filter(
          (e) => e._id != result.data._id
        );

        updatedIssues[result.data.log.label] = updatedList;
      } else {
        updatedIssues = { ...issues };
        updatedList = updatedIssues[result.data.state.label].filter(
          (e) => e._id != result.data._id
        );

        updatedIssues[result.data.state.label] = updatedList;
      }

      dispatch(setIssues(updatedIssues));
      navigate(QueryParamHandler.RemoveParam("task"));

      AlertHandler({ dispatch, message: "Deleted !", type: "success" });
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });
  /******************* REQUESTS ********************/

  React.useEffect(() => {
    if (QueryParamHandler.GetParam("task")) {
      getIssueMutation.mutate({
        route: "issue/find",
        method: "POST",
        load: { _id: QueryParamHandler.GetParam("task") },
      });
    }
  }, [QueryParamHandler.GetParam("task")]);

  const handleChange = (updatedData) => {
    updateIssueMutation.mutate({
      route: "issue",
      method: "PATCH",
      load: {
        issueId: task._id,
        updatedData,
      },
    });
  };

  const handleActions = {
    editBtn: () => {
      setOpen(!open);
    },
    deleteBtn: () => {
      deleteIssueMutation.mutate({
        route: `issue?issueId=${QueryParamHandler.GetParam("task")}`,
        method: "DELETE",
      });
    },
    closeBtn: () => {
      navigate(QueryParamHandler.RemoveParam("task"));
    },
  };

  if (task) {
    return (
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-5px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        exit={{ opacity: 0, transform: "translateY(-5px)" }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={C.Task}
      >
        <div className={C.Actions}>
          <aside>
            {windowWidth <= 900 && (
              <Button
                icon={
                  open
                    ? SvgHandler.Pen()
                    : SvgHandler.ArrowLeft({
                        width: "24px",
                        marginRight: "0.1rem",
                      })
                }
                theme={buttonThemes.LightGray}
                style={{
                  height: "30px",
                  borderRadius: "0.2rem",
                }}
                onMouseUp={handleActions.editBtn}
              />
            )}

            <WithCopy content={`${document.location.href}`}>
              <Button
                icon={SvgHandler.Link()}
                label={"COPY-LINK"}
                theme={buttonThemes.LightGray}
                style={{ height: "30px", borderRadius: "0.2rem" }}
              />
            </WithCopy>
          </aside>

          <aside>
            {QueryParamHandler.GetParam("section") === "backlog" && (
              <>
                <Selector
                  defaultValue={[states[task.state.label]]}
                  elements={[
                    { value: "65f7c0ec47ca29e08d705586", label: "TO-DO" },
                    { value: "65f7c12547ca29e08d705587", label: "DOING" },
                    { value: "65f7c13e47ca29e08d705588", label: "REVIEW" },
                    { value: "65f7c14b47ca29e08d705589", label: "DONE" },
                  ]}
                  label={"label"}
                  value={"value"}
                  placeholder="-"
                  variant="filled"
                  size="small"
                  style={{
                    width: "100%",
                    minWidth: "100px",
                    height: "30px",
                  }}
                  onChange={(value) => {
                    handleChange({ state: value });
                  }}
                />

                <div className={C.Divider}></div>
              </>
            )}

            <Button
              icon={SvgHandler.Bin()}
              theme={buttonThemes.LightGray}
              style={{
                width: "40px",
                minWidth: "40px",
                height: "30px",
                borderRadius: "0.2rem",
              }}
              onMouseUp={handleActions.deleteBtn}
            />

            <Button
              icon={SvgHandler.Cross()}
              theme={buttonThemes.LightGray}
              style={{
                width: "40px",
                minWidth: "40px",
                height: "30px",
                borderRadius: "0.2rem",
              }}
              onMouseUp={handleActions.closeBtn}
            />
          </aside>
        </div>

        <div className={C.Content}>
          <AnimatePresence mode={"wait"}>
            <>
              {(open || windowWidth > 900) && (
                <motion.aside
                  className={C.Info}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={"INFO"}
                >
                  <TextArea
                    label={"SUMMARY"}
                    text={task.summary}
                    action={(text) => handleChange({ summary: text })}
                  />

                  <div className={C.Description}>
                    <p className={C.Label}>DESCRIPTION</p>

                    <DescriptionInput
                      description={task.description}
                      onChange={(description) => {
                        handleChange({ description });
                      }}
                    />
                  </div>
                </motion.aside>
              )}

              {(windowWidth > 900 || !open) && (
                <motion.aside
                  className={C.Details}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={"DETAILS"}
                >
                  <WithSectionLabel label={"ASSIGNEES"}>
                    <Selector
                      defaultValue={task.assignees}
                      elements={task.project.members}
                      label={"userName"}
                      value={"_id"}
                      placeholder="-"
                      mode="multiple"
                      maxTagCount={1}
                      allowClear
                      style={{
                        width: "100%",
                        height: "36px",
                      }}
                      onChange={(value) => handleChange({ assignees: value })}
                    />
                  </WithSectionLabel>

                  <WithSectionLabel label={"REPORTER"}>
                    <Selector
                      defaultValue={[task.reporter]}
                      elements={task.project.members}
                      label={"userName"}
                      value={"_id"}
                      placeholder="-"
                      allowClear
                      style={{
                        width: "100%",
                        height: "36px",
                      }}
                      onChange={(value) => handleChange({ reporter: value })}
                    />
                  </WithSectionLabel>

                  <WithSectionLabel label={"PRIORITY"}>
                    <Selector
                      defaultValue={[getPriority(task.priority)]}
                      elements={[
                        { value: 1, label: "LOW" },
                        { value: 2, label: "MEDIUM" },
                        { value: 3, label: "HIGH" },
                      ]}
                      label={"label"}
                      value={"value"}
                      placeholder="-"
                      variant="filled"
                      size="small"
                      style={{
                        width: "50%",
                        maxWidth: "200px",
                        height: "36px",
                        fontSize: "0.9rem",
                      }}
                      onChange={(value) =>
                        handleChange({ priority: Number(value) })
                      }
                    />
                  </WithSectionLabel>

                  <WithSectionLabel label={"ESTIMATE (HOURS)"}>
                    <InputNumber
                      defaultValue={task.estimate}
                      variant="filled"
                      min={0}
                      step={0.5}
                      formatter={(value) => {
                        if (value % 1 === 0 || value % 1 === 0.5) {
                          return `${value}`;
                        }
                        return "";
                      }}
                      parser={(value) => {
                        return value.replace(/[^0-9.]/g, "");
                      }}
                      className="Number"
                      style={{
                        width: "50%",
                        maxWidth: "200px",
                        height: "36px",
                        fontSize: "0.9rem",
                      }}
                      onChange={(value) => handleChange({ estimate: value })}
                    />
                  </WithSectionLabel>

                  <WithSectionLabel label={"TIME TRACKING"}>
                    <TimeTracker
                      timeSpent={task.timeSpent}
                      estimate={task.estimate}
                      updateIssueMutation={updateIssueMutation}
                      onChange={(value) => handleChange({ timeSpent: value })}
                    />
                  </WithSectionLabel>
                </motion.aside>
              )}
            </>
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
}

/******************** CHANGE THIS LATER FOR A MORE DYNAMIC STATE SYSTEM  ********************/
const getPriority = (priority) => {
  if (priority >= 3) {
    return { label: "HIGH", value: 3 };
  } else if (priority === 2) {
    return { label: "MEDIUM", value: 2 };
  } else if (priority < 2) {
    return { label: "LOW", value: 1 };
  }
};
/********************  CHANGE THIS LATER FOR A MORE DYNAMIC STATE SYSTEM  ********************/

export default Task;
