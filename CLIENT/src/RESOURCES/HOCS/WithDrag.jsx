import React from "react";

import { Draggable } from "react-beautiful-dnd";
import propTypes from "prop-types";

function WithDrag(props) {
  const { children, draggableId, index } = props;

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
  draggableId: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  children: propTypes.any,
};

export default WithDrag;
