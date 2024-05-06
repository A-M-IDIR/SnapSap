import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import _ from "underscore";

import SearchBar from "@/COMPONENTS/SHARED/SearchBar";
import Filter from "@/COMPONENTS/SHARED/Filter";
import Selector from "@/COMPONENTS/SHARED/Selector";

import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { states } from "@/RESOURCES/CONSTANTS/Sprint";

import C from "./style.module.scss";

function BoardActions() {
  const [logs, setLogs] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************** REQUESTS ********************/
  const getLogsMutation = UseRequest({
    onSuccess: (result) => {
      console.log(result.data);
      setLogs(
        result.data.filter(
          (e) => e.label != "BACK_LOG" && e.state._id != states.AWAITING
        )
      );
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    if (QueryParamHandler.GetParam("id")) {
      getLogsMutation.mutate({
        route: `log?projectId=${QueryParamHandler.GetParam("id")}`,
        method: "GET",
      });
    }
  }, []);

  const handleChange = (e) => {
    const inputValue = e.target.value.trim().toLowerCase();

    if (inputValue) {
      navigate(QueryParamHandler.UpdateParam("search", inputValue));
    } else {
      navigate(QueryParamHandler.RemoveParam("search"));
    }
  };

  const handleSelected = (selected) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (selected) {
      navigate(QueryParamHandler.UpdateParam("assignee", user._id));
    } else {
      navigate(QueryParamHandler.RemoveParam("assignee"));
    }
  };

  const handleSprintChange = (value) => {
    if (value == "") {
      navigate(QueryParamHandler.RemoveParam("sprints"));

      return;
    }

    navigate(QueryParamHandler.UpdateParam("sprints", value));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={C.BoardActions}
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

      <aside className={C.Right}>
        <WithLabel
          label={"SPRINT"}
          isBottom={true}
          labelStyle={{ top: "44px" }}
          style={{
            width: "100%",
            maxWidth: "150px",
            height: "36px",
          }}
        >
          <Selector
            elements={logs}
            label={"label"}
            value={"_id"}
            defaultValue={[]}
            mode="multiple"
            // variant="filled"
            allowClear
            maxTagCount={0}
            style={{
              width: "100%",
              height: "36px",
              // backgroundColor: "rgb(245, 245, 245)",
            }}
            className={"Select"}
            placeholder="-"
            onChange={handleSprintChange}
          />
        </WithLabel>
      </aside>
    </motion.div>
  );
}

export default BoardActions;
