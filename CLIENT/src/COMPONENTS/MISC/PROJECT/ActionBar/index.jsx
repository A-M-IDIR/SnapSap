import React from "react";

import { useNavigate } from "react-router";

import Skeleton from "@/COMPONENTS/SHARED/Skeleton";

import WithPopUp from "@/RESOURCES/HOCS/WithPopUp";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function ActionBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className={C.ActionBar}>
      <aside>
        <div className={C.Logo} onClick={handleClick}>
          {SvgHandler.SnapSapLogoWhite()}
        </div>

        <sub>
          <WithPopUp PopElement={() => <></>}>
            <div className={C.Link}>{SvgHandler.Search({ width: "16px" })}</div>
          </WithPopUp>

          <WithPopUp PopElement={() => <></>}>
            <div className={C.Link}>{SvgHandler.Plus({ width: "16px" })}</div>
          </WithPopUp>
        </sub>
      </aside>

      <Skeleton
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#366AB6",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

export default ActionBar;
