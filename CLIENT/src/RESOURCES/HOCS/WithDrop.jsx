import React from "react";

import { Droppable } from "react-beautiful-dnd";
import propTypes from "prop-types";

function WithDrop(props) {
  const { children, droppableId, type, className } = props;

  return (
    <Droppable droppableId={droppableId} type={type}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={className}
        >
          {children}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

WithDrop.propTypes = {
  droppableId: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  className: propTypes.any,
  children: propTypes.any,
};

export default WithDrop;
