import React from "react";

import { Droppable } from "react-beautiful-dnd";
import propTypes from "prop-types";

function WithDrop({ children, droppableId, type, placeHolder, ...rest }) {
  return (
    <Droppable droppableId={droppableId} type={type}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} {...rest}>
          {children}

          {placeHolder && provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

WithDrop.propTypes = {
  children: propTypes.any,
  droppableId: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  placeHolder: propTypes.bool,
};

export default WithDrop;
