import React from "react";

import { Draggable } from "react-beautiful-dnd";
import propTypes from "prop-types";

function WithDrag({ children, draggableId, index }) {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children(snapshot)}
        </div>
      )}
    </Draggable>
  );
}

WithDrag.propTypes = {
  children: propTypes.any,
  draggableId: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
};

export default WithDrag;
