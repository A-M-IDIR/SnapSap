import React from "react";

import C from "./style.module.scss";

function Outline({ layer }) {
  return <div className={C.Outline} ref={layer}></div>;
}

export default Outline;
