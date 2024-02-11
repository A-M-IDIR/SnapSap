import React from "react";

import C from "./style.module.scss";

function BackGround() {
  return (
    <div className={C.BackGround}>
      <div className={C.Blur}></div>

      <img
        src={
          "https://images.unsplash.com/photo-1636471815144-616b00e21f24?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
    </div>
  );
}

export default BackGround;
