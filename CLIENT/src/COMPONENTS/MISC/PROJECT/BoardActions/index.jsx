import React from "react";

import SearchBar from "@/COMPONENTS/SHARED/SearchBar";
import Filter from "@/COMPONENTS/SHARED/Filter";
import Members from "@/COMPONENTS/SHARED/Members";

import C from "./style.module.scss";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

function BoardActions() {
  return (
    <div className={C.BoardActions}>
      <aside className={C.Left}>
        <SearchBar
          label={"Search"}
          fullWidth={true}
          style={{ width: "100%" }}
        />

        {/* <Members
          members={[
            {
              avatar:
                "https://images.unsplash.com/photo-1706313296876-ba53e6c1670b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ]}
        /> */}
      </aside>

      <aside>
        <Filter
          options={[
            { id: "sprint_1", label: "Sprint 1" },
            { id: "sprint_2", label: "Sprint 2" },
          ]}
          label="Sprint"
          onSelected={(e) => console.log(e)}
          dropRight={true}
        />

        <Filter
          options={[
            {
              id: "only_me",
              label: SvgHandler.User({ width: "14px", paddingTop: "0.2rem" }),
            },
          ]}
          label={SvgHandler.User({ width: "14px", paddingTop: "0.2rem" })}
          onSelected={(selected) => {
            if (selected) {
              console.log("APPLY THIS FILTER ::", selected.id);
            } else {
              console.log("CLEAR OUT THE FILTER");
            }
          }}
          style={{ minWidth: "50px" }}
          title="ONLY MY ISSUES"
        />
      </aside>
    </div>
  );
}

export default BoardActions;
