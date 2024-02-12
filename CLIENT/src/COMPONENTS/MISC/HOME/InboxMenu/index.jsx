import React from "react";

import Button from "@/COMPONENTS/SHARED/Button";

import UseResize from "@/RESOURCES/HOOKS/UseResize";
import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function InboxMenu(props) {
  const { sizeBreak, style, setIsDropMenu } = props;

  const [inbox, setInbox] = React.useState([]);

  const { windowWidth } = UseResize();

  const LightGray = {
    idle: {
      backgroundColor: "rgb(230,230,230)",
      color: "rgb(60, 60, 60)",
    },
    hover: { backgroundColor: "rgb(220, 220, 220)", color: "rgb(60, 60, 60)" },
    active: { backgroundColor: "rgb(230, 230, 230)" },
  };

  return (
    <div className={C.InboxMenu} style={windowWidth > sizeBreak ? style : {}}>
      <div className={C.Header}>
        <aside>
          <div className={C.Icon}>{SvgHandler.Inbox()}</div>

          <p className={C.Label}>INBOX</p>
        </aside>

        <WithDropMenu DropMenu={() => <></>}>
          <Button
            icon={SvgHandler.MenuDots()}
            theme={LightGray}
            style={{ height: "25px" }}
          />
        </WithDropMenu>
      </div>

      <div className={C.Content}>
        {inbox.length === 0 ? (
          <div className={C.Image}>
            <img src="public/ASSETS/ICONS/DESERT.png" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default InboxMenu;
