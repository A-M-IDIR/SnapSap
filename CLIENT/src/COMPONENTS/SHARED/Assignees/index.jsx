import React from "react";

import propTypes from "prop-types";
import { v4 } from "uuid";

import Skeleton from "@/COMPONENTS/SHARED/Skeleton";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";

import C from "./style.module.scss";

function Assignees({ assignees, ...rest }) {
  return (
    <div className={C.Assignees} {...rest}>
      {assignees?.length > 0 ? (
        assignees.slice(0, 2).map((e, i) => (
          <WithLabel label={e.userName} isBottom={true} key={v4()}>
            <div className={C.Assignee} style={{ zIndex: i }}>
              {e.avatar ? (
                <img
                  src={e.avatar}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Skeleton style={{ width: "100%", height: "100%" }} />
              )}
            </div>
          </WithLabel>
        ))
      ) : (
        <WithLabel label={"UNASSIGNED"} isBottom={true}>
          <div className={C.Assignee} key={v4()}>
            <Skeleton style={{ width: "100%", height: "100%" }} />
          </div>
        </WithLabel>
      )}
    </div>
  );
}

Assignees.propTypes = {
  assignees: propTypes.arrayOf(
    propTypes.shape({
      avatar: propTypes.string,
      userName: propTypes.string.isRequired,
    })
  ),
};

Assignees.defaultProps = {
  assignees: [],
};

export default Assignees;
