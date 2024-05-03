import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import BackLogHeader from "@/COMPONENTS/MISC/PROJECT/BackLog/BackLogHeader";
import BackLogActions from "@/COMPONENTS/MISC/PROJECT/BackLog/BackLogActions";
import BackLogList from "@/COMPONENTS/MISC/PROJECT/BackLog/BackLogList";
import Sprints from "./Sprints";

import WithCollapse from "@/RESOURCES/HOCS/WithCollapse";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import BackLogDropHandler, {
  organize,
  sortArraysByIndex,
} from "@/RESOURCES/HANDLERS/BackLogDropHandler";
import { setLogs } from "@/CONTEXT/MISC/PROJECT/LogSlice";
import { setIssues } from "@/CONTEXT/MISC/PROJECT/IssueSlice";

import C from "./style.module.scss";

function BackLog() {
  const [componentRendered, setComponentRendered] = React.useState(false);
  const logs = useSelector((state) => state.logSlice.value);
  const issues = useSelector((state) => state.issueSlice.value);

  const containerRef = React.useRef(null);

  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const getIssuesMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(setIssues(sortArraysByIndex(organize(result.data))));
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });

  const getLogsMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(setLogs(result.data));
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });

  const orderIssuesMutation = UseRequest({
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });

  const updateIssueMutation = UseRequest({
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });

  const filterIssuesMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(setIssues(sortArraysByIndex(organize(result.data))));
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    const projectId = QueryParamHandler.GetParam("id");

    getLogsMutation.mutate({
      route: `log?projectId=${projectId}`,
      method: "GET",
    });
    getIssuesMutation.mutate({
      route: `issue?projectId=${projectId}`,
      method: "GET",
    });
  }, []);

  React.useEffect(() => {
    const search = QueryParamHandler.GetParam("search");
    const assignee = QueryParamHandler.GetParam("assignee");

    if (!componentRendered) {
      setComponentRendered(true);

      return;
    }

    const filter = {
      project: QueryParamHandler.GetParam("id"),
    };

    if (search) filter.summary = search;
    if (assignee) filter.assignees = assignee;

    filterIssuesMutation.mutate({
      route: "issue/find",
      load: filter,
      method: "POST",
    });
  }, [
    QueryParamHandler.GetParam("search"),
    QueryParamHandler.GetParam("assignee"),
  ]);

  const handleDragEnd = (e) => {
    BackLogDropHandler(
      e,
      orderIssuesMutation,
      updateIssueMutation,
      dispatch,
      setIssues,
      issues,
      logs
    );
  };

  return (
    <div className={C.BackLog}>
      <BackLogHeader />

      <BackLogActions />

      <div className={C.Container} ref={containerRef}>
        {!getIssuesMutation.isLoading && issues && logs && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className={C.Holder}>
              <BackLogList
                {...logs[0]}
                issues={issues[logs[0]?.label]}
                isLog={true}
                animationDelay={{ enter: 0.35, exit: 0 }}
              />

              <WithCollapse containerRef={containerRef} elements={logs}>
                <Sprints logs={logs} issues={issues} />
              </WithCollapse>
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}

export default BackLog;
