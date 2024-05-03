import React from "react";

import propTypes from "prop-types";
import styled from "styled-components";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.idle.backgroundColor};
  border: ${(props) => props.theme.idle.border};
  color: ${(props) => props.theme.idle.textColor};

  &::placeholder {
    color: ${(props) => props.theme.idle.labelColor};
  }

  &:hover {
    background-color: ${(props) => props.theme.hover.backgroundColor};
    color: ${(props) => props.theme.hover.textColor};
    border-color: ${(props) => props.theme.hover.borderColor};

    &::placeholder {
      color: ${(props) => props.theme.hover.labelColor};
    }
  }

  &:focus {
    background-color: ${(props) => props.theme.focus.backgroundColor};
    color: ${(props) => props.theme.focus.textColor};
    border-color: ${(props) => props.theme.focus.borderColor};

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

function SearchBar({ label, icon, theme, ...rest }) {
  return (
    <div className={`${C.SearchBar}`}>
      <StyledInput
        placeholder={label}
        theme={theme}
        className={C.Input}
        {...rest}
        id="search"
        spellCheck={false}
        autoComplete="off"
      />

      <StyledIcon className={C.Icon} theme={theme}>
        {icon}
      </StyledIcon>
    </div>
  );
}

SearchBar.defaultProps = {
  label: "SEARCH",
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
  theme: propTypes.shape({
    idle: propTypes.shape({
      backgroundColor: propTypes.string,
      textColor: propTypes.string,
      labelColor: propTypes.string,
      iconColor: propTypes.string,
      border: propTypes.string,
    }).isRequired,
    hover: propTypes.shape({
      backgroundColor: propTypes.string,
      textColor: propTypes.string,
      labelColor: propTypes.string,
      borderColor: propTypes.string,
    }).isRequired,
    focus: propTypes.shape({
      backgroundColor: propTypes.string,
      textColor: propTypes.string,
      labelColor: propTypes.string,
      borderColor: propTypes.string,
    }).isRequired,
  }),
};

export default SearchBar;
