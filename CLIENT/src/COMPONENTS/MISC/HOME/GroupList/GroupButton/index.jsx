import React from "react";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function GroupButton({ ...rest }) {
  return (
    <button className={C.GroupButton} {...rest}>
      <div className={C.Icon}>{SvgHandler.AddFolder({ width: "15px" })}</div>
    </button>
  );
}

export default GroupButton;
