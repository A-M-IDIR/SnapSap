import React from "react";

import SearchBar from "@/COMPONENTS/SHARED/SearchBar";
import Members from "@/COMPONENTS/SHARED/Members";
import Button from "@/COMPONENTS/SHARED/Button";

import WithPopUp from "@/RESOURCES/HOCS/WithPopUp";

import C from "./style.module.scss";

function BackLogActions() {
  return (
    <div className={C.BackLogActions}>
      <aside className={C.Left}>
        <SearchBar
          label={"Search"}
          fullWidth={true}
          style={{ width: "100%" }}
        />

        <Members
          members={[
            {
              avatar:
                "https://images.unsplash.com/photo-1706313296876-ba53e6c1670b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ]}
        />
      </aside>

      <WithPopUp PopElement={() => <></>}>
        <Button label={"NEW-SPRINT"} style={{ height: "36px" }} />
      </WithPopUp>
    </div>
  );
}

export default BackLogActions;
