import React from "react";

import styled from "styled-components";
import propTypes from "prop-types";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

const StyledPriority = styled.div`
  svg {
    fill: ${(props) => getPriority(props.level).backGround};
  }
`;

const getPriority = (level) => {
  if (level >= 4) {
    return {
      backGround: "#FF3535",
      textColor: "black",
      text: "HIGHEST",
    };
  } else if (level === 3) {
    return {
      backGround: "#FF8080",
      textColor: "black",
      text: "HIGH",
    };
  } else if (level === 2) {
    return {
      backGround: "#FF8B1F",
      textColor: "black",
      text: "MED",
    };
  } else if (level === 1) {
    return { backGround: "#31DB06", textColor: "black", text: "LOW" };
  } else if (level <= 0) {
    return {
      backGround: "#7FF661",
      textColor: "black",
      text: "LOWEST",
    };
  }
};

function Priority(props) {
  const { level } = props;

  return (
    <StyledPriority className={C.Priority} level={level}>
      {SvgHandler.Bahai()}
    </StyledPriority>
  );
}

Priority.propTypes = {
  level: propTypes.number.isRequired,
};

Priority.defaultProps = {
  level: 2,
};

export default Priority;
