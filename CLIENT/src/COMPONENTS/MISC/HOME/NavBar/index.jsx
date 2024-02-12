import React from "react";

import Skeleton from "@/COMPONENTS/SHARED/Skeleton";
import Button from "@/COMPONENTS/SHARED/Button";
import WorkMenu from "@/COMPONENTS/MISC/HOME/WorkMenu";
import InboxMenu from "@/COMPONENTS/MISC/HOME/InboxMenu";

import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";
import WithPopUp from "@/RESOURCES/HOCS/WithPopUp";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function NavBar() {
  const LightGrayArgs = {
    idle: {
      backgroundColor: "rgb(240, 240, 240)",
      color: "rgb(60, 60, 60)",
      iconColor: "rgb(100,100,100)",
    },
    hover: {
      backgroundColor: "rgb(220, 220, 220)",
      color: "rgb(60, 60, 60)",
      iconColor: "rgb(60, 60, 60)",
    },
    active: { backgroundColor: "rgb(230, 230, 230)" },
  };

  return (
    <div className={C.NavBar}>
      <aside>
        <WithDropMenu
          DropMenu={(props) => (
            <WorkMenu
              sizeBreak={600}
              style={{
                position: "absolute",
                bottom: "-12.5px",
                transform: "translateY(100%)",
                zIndex: "500",
              }}
              {...props}
            />
          )}
          withBackDrop={true}
        >
          <Expandable label={"WORK"} />
        </WithDropMenu>

        <WithPopUp PopElement={() => <></>}>
          <Button label={"QUICK-ISSUE"} style={{ height: "33px" }} />
        </WithPopUp>
      </aside>

      <aside>
        <span>
          <WithDropMenu
            DropMenu={(props) => (
              <InboxMenu
                sizeBreak={600}
                style={{
                  position: "absolute",
                  bottom: "-11px",
                  transform: "translate(-90.8%, 100%)",
                  zIndex: "500",
                }}
                {...props}
              />
            )}
            withBackDrop={true}
          >
            <Button
              icon={SvgHandler.Notification({ width: "13px" })}
              theme={LightGrayArgs}
              style={{ width: "36px", height: "36px" }}
            />
          </WithDropMenu>

          <div className={C.Line}></div>

          <Skeleton
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </span>
      </aside>
    </div>
  );
}

function Expandable(props) {
  const { label } = props;

  return (
    <div className={C.Expandable}>
      <p>{label}</p>

      <aside>{SvgHandler.CarretDown()}</aside>
    </div>
  );
}

export default NavBar;
