import React from "react";

import { useNavigate } from "react-router-dom";
import _ from "underscore";
import { motion } from "framer-motion";

import SearchBar from "@/COMPONENTS/SHARED/SearchBar";
import Button from "@/COMPONENTS/SHARED/Button";
import Filter from "@/COMPONENTS/SHARED/Filter";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

import C from "./style.module.scss";

function BackLogActions() {
  const navigate = useNavigate();

  const handleSelected = (selected) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (selected) {
      navigate(QueryParamHandler.UpdateParam("assignee", user._id));
    } else {
      navigate(QueryParamHandler.RemoveParam("assignee"));
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value.trim().toLowerCase();

    if (inputValue) {
      navigate(QueryParamHandler.UpdateParam("search", inputValue));
    } else {
      navigate(QueryParamHandler.RemoveParam("search"));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={C.BackLogActions}
    >
      <aside className={C.Left}>
        <WithLabel
          label={"SEARCH BY SUMMARY"}
          isBottom={true}
          style={{ width: "100%" }}
          labelStyle={{ top: "44px" }}
        >
          <SearchBar
            label={"SEARCH"}
            style={{ width: "100%" }}
            onChange={_.debounce(handleChange, 500)}
          />
        </WithLabel>

        <div className={C.Divider}></div>

        <WithLabel
          label={"ONLY-ME"}
          isBottom={true}
          labelStyle={{ top: "44px" }}
        >
          <Filter
            options={[
              {
                id: "only_me",
                label: SvgHandler.User({ width: "14px", paddingTop: "0.2rem" }),
              },
            ]}
            label={SvgHandler.User({ width: "14px", paddingTop: "0.2rem" })}
            onSelected={handleSelected}
            style={{ minWidth: "50px" }}
          />
        </WithLabel>
      </aside>

      <WithLabel
        label={"NEW-SPRINT"}
        isBottom={true}
        labelStyle={{ top: "44px" }}
      >
        <Button
          icon={SvgHandler.Plus()}
          style={{ width: "50px", height: "36px" }}
          onMouseUp={() =>
            navigate(QueryParamHandler.UpdateParam("sprint", "new"))
          }
        />
      </WithLabel>
    </motion.div>
  );
}

export default BackLogActions;
