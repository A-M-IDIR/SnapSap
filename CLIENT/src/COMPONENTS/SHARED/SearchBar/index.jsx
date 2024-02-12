import React from "react";

import propTypes from "prop-types";
import styled from "styled-components";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.idle.backgroundColor};
  border: ${(props) => props.theme.idle.border};
  color: ${(props) => props.theme.idle.color};

  &::placeholder {
    color: ${(props) => props.theme.idle.labelColor};
  }

  &:hover {
    background-color: ${(props) => props.theme.hover.backgroundColor};
    border-color: ${(props) => props.theme.hover.borderColor};
    color: ${(props) => props.theme.hover.color};

    &::placeholder {
      color: ${(props) => props.theme.hover.labelColor};
    }
  }

  &:focus {
    background-color: ${(props) => props.theme.focus.backgroundColor};
    border-color: ${(props) => props.theme.focus.borderColor};
    color: ${(props) => props.theme.focus.color};

    &::placeholder {
      color: ${(props) => props.theme.focus.labelColor};
    }
  }
`;

const StyledIcon = styled.div`
  svg {
    fill: ${(props) => props.theme.idle.iconColor};
  }
`;

function SearchBar(props) {
  const { label, icon, theme, action, ...rest } = props;

  return (
    <div className={C.SearchBar}>
      <StyledInput
        placeholder={label}
        theme={theme}
        onChange={action}
        {...rest}
      />

      <StyledIcon className={C.Icon} theme={theme}>
        {icon}
      </StyledIcon>
    </div>
  );
}

SearchBar.defaultProps = {
  label: "Search",
  icon: SvgHandler.Search(),
  theme: {
    idle: {},
    hover: {},
    focus: {},
  },
};

SearchBar.propTypes = {
  label: propTypes.string,
  icon: propTypes.element,
  action: propTypes.func,
  theme: propTypes.shape({
    idle: propTypes.shape({
      backgroundColor: propTypes.string,
      color: propTypes.string,
      border: propTypes.string,
      labelColor: propTypes.string,
      iconColor: propTypes.string,
    }).isRequired,
    hover: propTypes.shape({
      backgroundColor: propTypes.string,
      color: propTypes.string,
      borderColor: propTypes.string,
      labelColor: propTypes.string,
    }).isRequired,
    focus: propTypes.shape({
      backgroundColor: propTypes.string,
      color: propTypes.string,
      borderColor: propTypes.string,
      labelColor: propTypes.string,
    }).isRequired,
  }),
};

export default SearchBar;
