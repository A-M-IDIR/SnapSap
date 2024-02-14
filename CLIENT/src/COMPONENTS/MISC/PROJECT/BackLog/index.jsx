import React from "react";

import { DragDropContext } from "react-beautiful-dnd";

import BackLogHeader from "@/COMPONENTS/MISC/PROJECT/BackLogHeader";
import BackLogActions from "@/COMPONENTS/MISC/PROJECT/BackLogActions";
import BackLogList from "@/COMPONENTS/MISC/PROJECT/BackLogList";
import TaskView from "@/COMPONENTS/MISC/PROJECT/TaskView";

import C from "./style.module.scss";

const assignees = [
  {
    avatar:
      "https://images.unsplash.com/photo-1703371169541-7f743764127e?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1704212224803-42e34f022c36?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const data = [
  {
    description: "ITEM_2",
    assignees,
    priority: 2,
    dueTime: "12 Feb",
    id: "item_2",
    state: "AWAITING",
    log: "BACK_LOG",
    index: 2,
  },
  {
    description: "ITEM_3",
    assignees,
    priority: 4,
    dueTime: "12 Feb",
    id: "item_3",
    state: "AWAITING",
    log: "BACK_LOG",
    index: 3,
  },
  {
    description: "ITEM_1",
    assignees,
    priority: 3,
    dueTime: "12 Feb",
    id: "item_1",
    state: "AWAITING",
    log: "SPRINT_1",
    index: 1,
  },
  {
    description:
      "Ipsum ipsa quo sequi repellendus dignissimos consectetur voluptate nostrum sunt animi.",
    assignees,
    priority: 0,
    dueTime: "12 Feb",
    id: "item_4",
    state: "IN_PROGRESS",
    log: "SPRINT_1",
    index: 2,
  },
  {
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ipsa quo sequi repellendus dignissimos consectetur voluptate nostrum sunt animi.",
    assignees,
    priority: 1,
    dueTime: "12 Feb",
    state: "EVALUATION",
    log: "BACK_LOG",
    index: 1,
    id: "item_5",
  },
  {
    description: "Lorem ipsum dolor sit amet consectetur",
    assignees,
    priority: 4,
    dueTime: "12 Feb",
    id: "item_6",
    state: "COMPLETED",
    log: "SPRINT_1",
    index: 3,
  },
];

const dataLogList = [{ label: "SPRINT_1" }, { label: "SPRINT_2" }];

function BackLog() {
  const [items, setItems] = React.useState([]);

  const organize = (data) => {
    const groupedItems = {};

    data.forEach((item) => {
      const { log } = item;
      if (!groupedItems[log]) {
        groupedItems[log] = [];
      }

      groupedItems[log].push(item);
    });

    return groupedItems;
  };

  const sortArraysByIndex = (inputObject) => {
    const sortedObject = {};

    // Iterate through each key in the input object
    Object.keys(inputObject).forEach((key) => {
      // Sort the array based on the "index" property
      const sortedArray = inputObject[key].sort((a, b) => a.index - b.index);

      // Update the key in the sorted object
      sortedObject[key] = sortedArray;
    });

    return sortedObject;
  };

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

      let list = [...items[destination.droppableId]];

      const [draggedItem] = list.splice(source.index, 1);

      list.splice(destination.index, 0, draggedItem);

      list = list.map((item, index) => ({ ...item, index }));

      let updatedItems = { ...items };
      updatedItems[destination.droppableId] = list;
      setItems(sortArraysByIndex(updatedItems));
    } else {
      // GET THE SOURCE & DESTINATION
      // TAKE OUT THE DRAGGED ITEM FROM THE SOURCE LIST
      // PLACE THE DRAGGED ITEM IN THE CORRECT SPOT INSIDE THE DESTINATION LIST
      // UPDATE THE INDEX OF EACH ITEM IN THE DESTINATION LIST TO MATCH THE NEW ORDER
      // UPDATE THE STATE

      let sourceList = [...items[source.droppableId]];

      let destinationList = items[destination.droppableId]
        ? [...items[destination.droppableId]]
        : [];

      const [draggedItem] = sourceList.splice(source.index, 1);

      destinationList.splice(destination.index, 0, {
        ...draggedItem,
        log: destination.droppableId,
      });

      destinationList = destinationList.map((item, index) => ({
        ...item,
        index,
      }));

      let updatedItems = { ...items };
      updatedItems[source.droppableId] = sourceList;
      updatedItems[destination.droppableId] = destinationList;
      setItems(sortArraysByIndex(updatedItems));
    }
  };

  React.useEffect(() => {
    setItems(sortArraysByIndex(organize(data)));
  }, []);

  return (
    <div className={C.BackLog}>
      <BackLogHeader />

      <BackLogActions />

      <div className={C.Container}>
        <DragDropContext onDragEnd={handleDrop}>
          <BackLogList label={"BACK_LOG"} isLog={true} logs={items.BACK_LOG} />

          <div className={C.Divider}></div>

          {dataLogList.map((e, i) => (
            <BackLogList label={e.label} logs={items[e.label]} key={i} />
          ))}
        </DragDropContext>
      </div>

      <TaskView />
    </div>
  );
}

export default BackLog;
