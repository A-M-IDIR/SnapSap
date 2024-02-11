import React from "react";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function Header() {
  return (
    <div className={C.Header}>
      <div className={C.IconHolder}>
        {SvgHandler.SnapSapLogoWhite({ width: "100%" })}
      </div>
    </div>
  );
}

export default Header;
