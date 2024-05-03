import React from "react";

import { motion } from "framer-motion";
import propTypes from "prop-types";

import BoardTask from "@/COMPONENTS/MISC/PROJECT/Board/BoardTask";
import { taskPropTypes } from "@/COMPONENTS/MISC/PROJECT/Board/BoardTask";

import WithDrag from "@/RESOURCES/HOCS/WithDrag";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import WithDrop from "@/RESOURCES/HOCS/WithDrop";

import C from "./style.module.scss";

function BoardList({ label, issues, index }) {
  const [canDrop, setCanDrop] = React.useState(false);

  const urlParams = new URLSearchParams(location.search);

  React.useEffect(() => {
    if (!urlParams.get("drag")) {
      setCanDrop(false);
    }
  }, [urlParams.get("drag")]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={
        !canDrop
          ? {
              opacity: 1,
              y: 0,
              transition: { delay: index * 0.05 },
            }
          : { opacity: 1, y: 0, outlineColor: "#074db572" }
      }
      exit={{
        opacity: 0,
        y: -10,
        transition: { delay: index * 0.05 },
      }}
      className={C.BoardList}
    >
      <p className={C.Head}>
        {label} {issues?.length}
      </p>

      <WithDrop
        droppableId={label}
        placeHolder={issues?.length === 0 ? false : true}
        type="GROUP"
        className={C.List}
        onMouseEnter={() => {
          if (urlParams.get("drag")) {
            setCanDrop(true);
          }
        }}
        onMouseLeave={() => setCanDrop(false)}
      >
        {issues?.length === 0 && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={C.Empty}
          >
            {SvgHandler.EmptyInbox({ width: "30px" })}
          </motion.p>
        )}

        {issues.map((e, i) => (
          <WithDrag draggableId={`${label}_ITEM_${i}`} index={i} key={i}>
            {(snapshot) => (
              <BoardTask isDragging={snapshot.isDragging} {...e} />
            )}
          </WithDrag>
        ))}
      </WithDrop>
    </motion.div>
  );
}

BoardList.propTypes = {
  label: propTypes.string.isRequired,
  issues: propTypes.arrayOf(propTypes.shape(taskPropTypes)),
};

BoardList.defaultProps = {
  label: "-",
  issues: [],
};

export default BoardList;
