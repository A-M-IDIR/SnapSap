import React from "react";

import propTypes from "prop-types";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import WithLabel from "@/RESOURCES/HOCS/WithLabel";

import C from "./style.module.scss";

function EstimatedTime({ estimate, ...rest }) {
  return (
    <WithLabel label={"ESTIMATED-TIME"} isBottom={true}>
      <div className={C.EstimatedTime} {...rest}>
        <span>{SvgHandler.DueTime()}</span>

        <p>{!estimate ? "-" : estimate}</p>
      </div>
    </WithLabel>
  );
}

EstimatedTime.propTypes = {
  estimate: propTypes.number.isRequired,
};

export default EstimatedTime;
