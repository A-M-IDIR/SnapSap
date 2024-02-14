import React from "react";

import PageInfo from "@/COMPONENTS/SHARED/PageInfo";
import Button from "@/COMPONENTS/SHARED/Button";
import Filter from "@/COMPONENTS/SHARED/Filter";

import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function KanBanHeader() {
  const LightGrayButtonArgs = {
    idle: {
      backgroundColor: "rgb(240, 240, 240)",
      color: "rgb(120, 120, 120)",
      iconColor: "rgb(150,150,150)",
    },
    hover: {
      backgroundColor: "rgb(235,235,235)",
      color: "rgb(100,100,100)",
      iconColor: "rgb(140,140,140)",
    },
    active: { backgroundColor: "rgb(238,238,238)" },
  };

  return (
    <div className={C.KanBanHeader}>
      <PageInfo
        label="SNAP BAORD"
        links={[
          { label: "Projects", path: "#" },
          { label: "SnapSap", path: "#" },
          { label: "Board", path: "#" },
        ]}
      />

      <aside>
        {/* <Button label={"COMPLETE-SPRINT"} /> */}

        <WithDropMenu>
          <Button icon={SvgHandler.MenuDots()} theme={LightGrayButtonArgs} />
        </WithDropMenu>
      </aside>
    </div>
  );
}

export default KanBanHeader;
