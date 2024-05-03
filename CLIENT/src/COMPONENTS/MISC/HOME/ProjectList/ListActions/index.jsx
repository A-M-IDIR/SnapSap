import React from "react";

import { useNavigate } from "react-router-dom";
import _ from "underscore";

import SearchBar from "@/COMPONENTS/SHARED/SearchBar";
import Button from "@/COMPONENTS/SHARED/Button";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

import C from "./style.module.scss";

function ListActions() {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const inputValue = e.target.value.trim().toLowerCase();

    if (!inputValue) {
      navigate(QueryParamHandler.RemoveParam("search"));

      return;
    }

    navigate(QueryParamHandler.UpdateParam("search", inputValue));
  };

  const handleNewProject = () => {
    navigate(QueryParamHandler.UpdateParam("new", 1));
  };

  return (
    <div className={C.ListActions}>
      <WithLabel
        isBottom={true}
        label={"SEARCH BY TITLE"}
        style={{ zIndex: 5, width: "100%", maxWidth: "250px" }}
        labelStyle={{ top: "40px" }}
      >
        <SearchBar
          label={"SEARCH"}
          style={{ width: "100%", height: "34px" }}
          onChange={_.debounce(handleChange, 500)}
        />
      </WithLabel>

      <Button
        icon={SvgHandler.Plus()}
        style={{ width: "50px", height: "34px" }}
        onMouseUp={handleNewProject}
      />
    </div>
  );
}

export default ListActions;
