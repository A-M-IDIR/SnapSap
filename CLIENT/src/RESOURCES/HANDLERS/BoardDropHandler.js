export default function BoardDropHandler(
  e,
  orderIssuesMutation,
  updateIssueMutation,
  dispatch,
  setIssues,
  issues,
  boardLists
) {
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
}

export const organize = (data) => {
  const groupedissues = {};

  data.forEach((item) => {
    const { issueState } = item;

    if (!groupedissues[issueState.label]) {
      groupedissues[issueState.label] = [];
    }

    groupedissues[issueState.label].push(item);
  });

  return groupedissues;
};

export const sortArraysByIndex = (inputObject) => {
  const sortedObject = {};

  Object.keys(inputObject).forEach((key) => {
    const sortedArray = inputObject[key]
      .slice()
      .sort((a, b) => a.boardIndex - b.boardIndex);

    sortedObject[key] = sortedArray;
  });

  return sortedObject;
};
