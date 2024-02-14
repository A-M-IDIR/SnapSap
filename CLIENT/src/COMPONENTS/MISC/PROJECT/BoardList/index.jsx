import React from "react";

import propTypes from "prop-types";

import BoardTask from "@/COMPONENTS/MISC/PROJECT/BoardTask";

import WithDrag from "@/RESOURCES/HOCS/WithDrag";
import WithDrop from "@/RESOURCES/HOCS/WithDrop";
import { taskPropTypes } from "@/COMPONENTS/MISC/PROJECT/BoardTask";

import C from "./style.module.scss";

function BoardList(props) {
  const { label, items } = props;

  return (
    <div className={C.BoardList}>
      <p className={C.Head}>
        {label} {items.length}
      </p>

      <WithDrop droppableId={label} type="GROUP" className={C.List}>
        {items
          .sort((a, b) => a.index - b.index)
          .map((e, i) => (
            <WithDrag draggableId={`${label}_ITEM_${i}`} index={i} key={i}>
              {(snapshot) => (
                <BoardTask isDragging={snapshot.isDragging} {...e} />
              )}
            </WithDrag>
          ))}
      </WithDrop>
    </div>
  );
}

BoardList.propTypes = {
  label: propTypes.string.isRequired,
  items: propTypes.arrayOf(propTypes.shape(taskPropTypes)),
};

BoardList.defaultProps = {
  label: "-",
  items: [],
};

export default BoardList;
