import React from "react";

import { DragDropContext } from "react-beautiful-dnd";

import BoardList from "@/COMPONENTS/MISC/PROJECT/BoardList";

import C from "./style.module.scss";

// THIS IS JUST MOCK DATA
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
    index: 2,
  },
  {
    description: "ITEM_3",
    assignees,
    priority: 4,
    dueTime: "12 Feb",
    id: "item_3",
    state: "AWAITING",
    index: 3,
  },
  {
    description: "ITEM_1",
    assignees,
    priority: 3,
    dueTime: "12 Feb",
    id: "item_1",
    state: "AWAITING",
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
    index: 1,
  },
  {
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ipsa quo sequi repellendus dignissimos consectetur voluptate nostrum sunt animi.",
    assignees,
    priority: 1,
    dueTime: "12 Feb",
    state: "EVALUATION",
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
    index: 1,
  },
];

function Board() {
  const [items, setItems] = React.useState([]);

  const organize = (data) => {
    const groupedItems = {};

    data.forEach((item) => {
      const { state } = item;
      if (!groupedItems[state]) {
        groupedItems[state] = [];
      }

      groupedItems[state].push(item);
    });

    return groupedItems;
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
      setItems(updatedItems);
    } else {
      // GET THE SOURCE & DESTINATION
      // TAKE OUT THE DRAGGED ITEM FROM THE SOURCE LIST
      // PLACE THE DRAGGED ITEM IN THE CORRECT SPOT INSIDE THE DESTINATION LIST
      // UPDATE THE INDEX OF EACH ITEM IN THE DESTINATION LIST TO MATCH THE NEW ORDER
      // UPDATE THE STATE

      let sourceList = [...items[source.droppableId]];
      let destinationList = [...items[destination.droppableId]];

      const [draggedItem] = sourceList.splice(source.index, 1);

      destinationList.splice(destination.index, 0, {
        ...draggedItem,
        state: destination.droppableId,
      });

      destinationList = destinationList.map((item, index) => ({
        ...item,
        index,
      }));

      let updatedItems = { ...items };
      updatedItems[source.droppableId] = sourceList;
      updatedItems[destination.droppableId] = destinationList;
      setItems(updatedItems);
    }
  };

  React.useEffect(() => {
    setItems(organize(data));
  }, []);

  return (
    <div className={C.Board}>
      <DragDropContext onDragEnd={handleDrop}>
        <BoardList label={"AWAITING"} items={items.AWAITING} />

        <BoardList label={"IN_PROGRESS"} items={items.IN_PROGRESS} />

        <BoardList label={"EVALUATION"} items={items.EVALUATION} />

        <BoardList label={"COMPLETED"} items={items.COMPLETED} />
      </DragDropContext>
    </div>
  );
}

export default Board;
