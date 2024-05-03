import React from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

import BoardActions from "@/COMPONENTS/MISC/PROJECT/Board/BoardActions";
import BoardHeader from "@/COMPONENTS/MISC/PROJECT/Board/BoardHeader";
import BoardList from "@/COMPONENTS/MISC/PROJECT/Board/BoardList";

import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import BoardDropHandler, {
  organize,
  sortArraysByIndex,
} from "@/RESOURCES/HANDLERS/BoardDropHandler";
import { setIssues } from "@/CONTEXT/MISC/PROJECT/IssueSlice";
import { boardLists } from "@/RESOURCES/CONSTANTS/Board";

import C from "./style.module.scss";

function Board() {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(useLocation().search);

  const issues = useSelector((state) => state.issueSlice.value);
  const [componentRendered, setComponentRendered] = React.useState(false);

  /******************** REQUESTS ********************/
  const getIssuesMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(setIssues(sortArraysByIndex(organize(result.data))));
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

  const handleDrop = (e) => {
    const { source, destination } = e;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (source.droppableId === destination.droppableId) {
      // GET THE LIST THAT WILL GET RE-ORDERED
      // TAKE OUT THE DRAGGED ITEM FROM THE LIST
      // PLACE BACK THE ITEM IN THE CORRECT SPOT
      // UPDATE THE INDEX OF EACH ITEM TO MATCH THE NEW ORDER
      // UPDATE THE STATE

      let list = [...issues[destination.droppableId]];

      const [draggedItem] = list.splice(source.index, 1);

      list.splice(destination.index, 0, draggedItem);

      list = list.map((item, boardIndex) => ({ ...item, boardIndex }));

      let updatedIssues = { ...issues };
      updatedIssues[destination.droppableId] = list;
      dispatch(setIssues(updatedIssues));

      orderIssuesMutation.mutate({
        route: "issue/reorder",
        method: "POST",
        load: { newOrder: list, board: true },
      });
    } else {
      // GET THE SOURCE & DESTINATION
      // TAKE OUT THE DRAGGED ITEM FROM THE SOURCE LIST
      // PLACE THE DRAGGED ITEM IN THE CORRECT SPOT INSIDE THE DESTINATION LIST
      // UPDATE THE INDEX OF EACH ITEM IN THE DESTINATION LIST TO MATCH THE NEW ORDER
      // UPDATE THE STATE

      let sourceList = [...issues[source.droppableId]];
      let destinationList = issues[destination.droppableId]
        ? [...issues[destination.droppableId]]
        : [];

      const [draggedItem] = sourceList.splice(source.index, 1);

      destinationList.splice(destination.index, 0, {
        ...draggedItem,
        state: destination.droppableId,
      });

      destinationList = destinationList.map((item, boardIndex) => ({
        ...item,
        boardIndex,
      }));

      let updatedIssues = { ...issues };
      updatedIssues[source.droppableId] = sourceList;
      updatedIssues[destination.droppableId] = destinationList;
      dispatch(setIssues(updatedIssues));

      updateIssueMutation.mutate({
        route: "issue",
        method: "PATCH",
        load: {
          issueId: draggedItem._id,
          updatedData: {
            state: boardLists.find((e) => e.label === destination.droppableId)
              .stateId,
          },
        },
      });
      orderIssuesMutation.mutate({
        route: "issue/reorder",
        method: "POST",
        load: { newOrder: sourceList, board: true },
      });
      orderIssuesMutation.mutate({
        route: "issue/reorder",
        method: "POST",
        load: { newOrder: destinationList, board: true },
      });
    }
  };

  React.useEffect(() => {
    const projectId = queryParams.get("id");

    getIssuesMutation.mutate({
      route: `issue?projectId=${projectId}&board=true`,
      load: { projectId },
      method: "GET",
    });
  }, []);

  React.useEffect(() => {
    const search = queryParams.get("search");
    const assignee = queryParams.get("assignee");
    const sprints = queryParams.get("sprints");

    if (!componentRendered) {
      setComponentRendered(true);

      return;
    }

    const filter = {
      board: true,
      project: queryParams.get("id"),
    };

    if (search) filter.summary = search;
    if (assignee) filter.assignees = assignee;
    if (sprints) filter.log = sprints.split(",");

    filterIssuesMutation.mutate({
      route: "issue/find",
      load: filter,
      method: "POST",
    });
  }, [
    queryParams.get("search"),
    queryParams.get("assignee"),
    queryParams.get("sprints"),
  ]);

  const handleDragEnd = (e) => {
    BoardDropHandler(
      e,
      orderIssuesMutation,
      updateIssueMutation,
      dispatch,
      setIssues,
      issues,
      boardLists
    );
  };

  return (
    <div className={C.Board}>
      <BoardHeader />

      <BoardActions />

      <div className={C.Container}>
        {!getIssuesMutation.isLoading && issues && (
          <DragDropContext onDragEnd={handleDragEnd}>
            {boardLists.map((e, i) => (
              <BoardList
                label={e.label}
                issues={issues[e.label]}
                key={i}
                index={i}
              />
            ))}
          </DragDropContext>
        )}
      </div>
    </div>
  );
}

export default Board;
