import React from "react";

import propTypes from "prop-types";
import styled from "styled-components";

import C from "./style.module.scss";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.idle.backgroundColor};
  color: ${(props) => props.theme.idle.color};
  outline: ${(props) => props.theme.idle.border};

  svg {
    fill: ${(props) => props.theme.idle.iconColor};
  }

  &:hover {
    background-color: ${(props) => props.theme.hover.backgroundColor};
    color: ${(props) => props.theme.hover.color};
    outline-color: ${(props) => props.theme.hover.borderColor};

    svg {
      fill: ${(props) => props.theme.hover.iconColor};
    }
  }

  &:active {
    background-color: ${(props) => props.theme.active.backgroundColor};
    outline-color: ${(props) => props.theme.active.borderColor};

    svg {
      fill: ${(props) => props.theme.active.iconColor};
    }
  }
`;

function Button(props) {
  const { theme, label, icon, action, ...rest } = props;

  return (
    <StyledButton
      className={`${C.Button} ${icon && !label && C.IconButton}`}
      onClick={action}
      theme={theme}
      {...rest}
    >
      <>{icon && <>{icon}</>}</>

      <>{label && <p>{label}</p>}</>
    </StyledButton>
  );
}

Button.defaultProps = {
  theme: {
    idle: {},
    hover: {},
    active: {},
  },
};

Button.propTypes = {
  label: propTypes.string,
  icon: propTypes.element,
  action: propTypes.func,
  theme: propTypes.shape({
    idle: propTypes.shape({
      backgroundColor: propTypes.string,
      color: propTypes.string,
      border: propTypes.string,
      iconColor: propTypes.string,
    }).isRequired,
    hover: propTypes.shape({
      backgroundColor: propTypes.string,
      color: propTypes.string,
      borderColor: propTypes.string,
      iconColor: propTypes.string,
    }).isRequired,
    active: propTypes.shape({
      backgroundColor: propTypes.string,
      borderColor: propTypes.string,
      iconColor: propTypes.string,
    }).isRequired,
  }),
};

export default Button;
