import React from "react";

import styled from "styled-components";
import propTypes from "prop-types";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import WithLabel from "@/RESOURCES/HOCS/WithLabel";

import C from "./style.module.scss";

const getPriority = (level) => {
  if (level >= 3) {
    return {
      backGround: "#FF0000",
      textColor: "black",
      text: "HIGH",
    };
  } else if (level === 2) {
    return {
      backGround: "#518CFF",
      textColor: "black",
      text: "MEDIUM",
    };
  } else if (level <= 1) {
    return { backGround: "#12E500", textColor: "black", text: "LOW" };
  }
};

const StyledPriorityLabel = styled.div`
  svg {
    fill: ${(props) => getPriority(props.level).backGround};
  }
`;

function PriorityLabel({ level }) {
  return (
    <WithLabel label={getPriority(level).text} isBottom={true}>
      <StyledPriorityLabel className={C.PriorityLabel} level={level}>
        {SvgHandler.Bahai()}
      </StyledPriorityLabel>
    </WithLabel>
  );
}

PriorityLabel.propTypes = {
  level: propTypes.number.isRequired,
};

PriorityLabel.defaultProps = {
  level: 2,
};

export default PriorityLabel;
