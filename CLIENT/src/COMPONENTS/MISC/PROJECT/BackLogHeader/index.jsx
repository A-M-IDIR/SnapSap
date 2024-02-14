import React from "react";

import PageInfo from "@/COMPONENTS/SHARED/PageInfo";
import Button from "@/COMPONENTS/SHARED/Button";

import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function BackLogHeader() {
  const LightGrayButtonArgs = {
    idle: {
      backgroundColor: "rgb(240, 240, 240)",
      color: "rgb(60, 60, 60)",
    },
    hover: {
      backgroundColor: "rgb(220, 220, 220)",
      color: "rgb(60, 60, 60)",
    },
    active: { backgroundColor: "rgb(230, 230, 230)" },
  };

  return (
    <div className={C.BackLogHeader}>
      <PageInfo
        label="SNAP BACKLOG"
        links={[
          { label: "Projects", path: "#" },
          { label: "SnapSap", path: "#" },
          { label: "BackLog", path: "#" },
        ]}
      />

      <WithDropMenu>
        <Button icon={SvgHandler.MenuDots()} theme={LightGrayButtonArgs} />
      </WithDropMenu>
    </div>
  );
}

export default BackLogHeader;
