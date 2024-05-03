import React from "react";

import Button from "@/COMPONENTS/SHARED/Button";
import UpdateInfo from "../UpdateInfo";

import WithPopUp from "@/RESOURCES/HOCS/WithPopUp";

import C from "./style.module.scss";

function Info({ infoLabel, infoKey, defaultInfo, infoType }) {
  return (
    <div className={C.Info}>
      <p className={C.InfoContent}>{defaultInfo}</p>

      <WithPopUp
        PopElement={({ popUp }) => (
          <UpdateInfo
            defaultInfo={defaultInfo}
            infoLabel={infoLabel}
            infoKey={infoKey}
            popUp={popUp}
            infoType={infoType}
          />
        )}
        position={{ x: "center" }}
      >
        <Button label={"EDIT"} style={{ height: "34px" }} />
      </WithPopUp>
    </div>
  );
}

export default Info;
