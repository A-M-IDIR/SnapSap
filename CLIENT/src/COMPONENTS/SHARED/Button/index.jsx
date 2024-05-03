import React from "react";

import propTypes from "prop-types";
import styled from "styled-components";

import C from "./style.module.scss";

const StyledButton = styled.button`
  position: relative;

  background-color: ${(props) => props.theme.idle.backgroundColor};
  color: ${(props) => props.theme.idle.textColor};
  outline: ${(props) => props.theme.idle.border};

  p {
    font-weight: ${(props) => props.theme.idle.fontWeight};
  }

  svg {
    fill: ${(props) => props.theme.idle.iconColor};
  }

  &:hover {
    background-color: ${(props) => props.theme.hover.backgroundColor};
    color: ${(props) => props.theme.hover.textColor};
    outline-color: ${(props) => props.theme.hover.borderColor};

    svg {
      fill: ${(props) => props.theme.hover.iconColor};
    }
  }

  &:active {
    background-color: ${(props) => props.theme.active.backgroundColor};
    outline-color: ${(props) => props.theme.active.borderColor};
    color: ${(props) => props.theme.active.textColor};

    svg {
      fill: ${(props) => props.theme.active.iconColor};
    }
  }
`;

function Button({ theme, label, icon, ...rest }) {
  return (
    <StyledButton
      className={`${C.Button} ${icon && !label && C.IconButton}`}
      theme={theme}
      {...rest}
    >
      <>{icon && <>{icon}</>}</>

      <>{label && <p>{label}</p>}</>
    </StyledButton>
  );
}

Button.propTypes = {
  label: propTypes.string,
  icon: propTypes.element,
  theme: propTypes.shape({
    idle: propTypes.shape({
      backgroundColor: propTypes.string,
      textColor: propTypes.string,
      iconColor: propTypes.string,
      border: propTypes.string,
      fontWeight: propTypes.string,
    }).isRequired,
    hover: propTypes.shape({
      backgroundColor: propTypes.string,
      textColor: propTypes.string,
      iconColor: propTypes.string,
      borderColor: propTypes.string,
    }).isRequired,
    active: propTypes.shape({
      backgroundColor: propTypes.string,
      textColor: propTypes.string,
      iconColor: propTypes.string,
      borderColor: propTypes.string,
    }).isRequired,
  }),
};

Button.defaultProps = {
  theme: {
    idle: {},
    hover: {},
    active: {},
  },
};

export const buttonThemes = {
  LightGray: {
    idle: {
      backgroundColor: "rgb(240, 240, 240)",
      textColor: "rgb(60, 60, 60)",
      iconColor: "rgb(100,100,100)",
      fontWeight: "700",
    },
    hover: {
      backgroundColor: "rgb(220, 220, 220)",
      textColor: "rgb(60, 60, 60)",
      iconColor: "rgb(60, 60, 60)",
    },
    active: {
      backgroundColor: "rgb(230, 230, 230)",
    },
  },
  Clear: {
    idle: {
      backgroundColor: "rgba(145, 190, 255, 0.2)",
      iconColor: "rgba(145, 190, 255, 0.6)",
    },
    hover: {
      backgroundColor: "rgb(255, 255, 255,0.2)",
      iconColor: "rgba(145, 190, 255, 1)",
    },
    active: {
      backgroundColor: "rgb(255, 255, 255,0.2)",
      iconColor: "rgba(145, 190, 255, 1)",
    },
  },
  LightGrayBordered: {
    idle: {
      backgroundColor: "rgb(240, 240, 240)",
      textColor: "rgb(60, 60, 60)",
      iconColor: "rgb(100,100,100)",
      border: "1.55px solid white",
    },
    hover: {
      backgroundColor: "rgb(220, 220, 220)",
      textColor: "rgb(60, 60, 60)",
      iconColor: "rgb(60, 60, 60)",
      borderColor: "rgb(170, 170, 255)",
    },
    active: {
      backgroundColor: "rgb(230, 230, 230)",
    },
  },
  Red: {
    idle: {
      backgroundColor: "#FFDEDE",
      textColor: "rgb(100, 100, 100)",
      iconColor: "rgb(100,100,100)",
    },
    hover: {
      backgroundColor: "#FFB4B4",
      iconColor: "rgb(100,100,100)",
    },
    active: {
      backgroundColor: "#FFC5C5",
    },
  },
  Blue: {
    idle: {
      backgroundColor: "#DEEFFF",
      textColor: "rgb(100, 100, 100)",
      iconColor: "rgb(100,100,100)",
    },
    hover: {
      backgroundColor: "#D1E9FF",
      iconColor: "rgb(100,100,100)",
    },
    active: {
      backgroundColor: "#D7ECFF",
    },
  },
  Yellow: {
    idle: {
      backgroundColor: "rgb(255, 185, 0)",
      textColor: "rgb(40, 40, 40)",
      iconColor: "rgb(40, 40, 40)",
    },
    hover: {
      backgroundColor: "rgb(255, 185, 0)",
      iconColor: "rgb(40, 40, 40)",
    },
    active: {
      backgroundColor: "rgb(255, 185, 0)",
    },
  },
  ExtraRed: {
    idle: {
      backgroundColor: "red",
      textColor: "black",
      iconColor: "black",
    },
    hover: {
      backgroundColor: "red",
      iconColor: "black",
    },
    active: {
      backgroundColor: "red",
    },
  },
};

export default Button;
