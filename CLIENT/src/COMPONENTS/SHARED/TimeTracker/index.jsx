import React from "react";

import { Progress } from "antd";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

const TimeTracker = ({
  timeSpent,
  estimate,
  updateIssueMutation,
  onChange,
}) => {
  const [estimateValue, setEstimateValue] = React.useState(estimate);
  const [timeSpentValue, setTimeSpentValue] = React.useState(timeSpent);

  const handleClick = () => {
    const increment = 0.5;

    if (timeSpentValue + increment > estimateValue) {
      setTimeSpentValue(0);
      onChange(0);
    } else {
      setTimeSpentValue(timeSpentValue + increment);
      onChange(timeSpentValue + increment);
    }
  };

  React.useEffect(() => {
    if (updateIssueMutation.data) {
      setEstimateValue(updateIssueMutation.data.data.estimate);
    }
  }, [updateIssueMutation.data]);

  return (
    <div className={C.TimeTracker} onMouseUp={handleClick}>
      <div className={C.Icon}>{SvgHandler.Time({ width: "32px" })}</div>

      <div className={C.View}>
        <Progress
          percent={(timeSpentValue * 100) / estimateValue}
          showInfo={false}
          size={"small"}
        />

        <div className={C.Info}>
          <p>{timeSpentValue}H LOGGED</p>

          <p>{estimateValue}H ESTIMATED</p>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
