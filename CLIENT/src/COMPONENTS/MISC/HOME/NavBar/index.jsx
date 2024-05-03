import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Skeleton from "@/COMPONENTS/SHARED/Skeleton";
import InboxMenu from "@/COMPONENTS/MISC/HOME/InboxMenu";
import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";
import WithPopUp from "@/RESOURCES/HOCS/WithPopUp";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";

import C from "./style.module.scss";

function NavBar() {
  const [inboxes, setInboxes] = React.useState([]);
  const [notify, setNotify] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const getNotificationMutation = UseRequest({
    onSuccess: (result) => {
      setInboxes(result.data);
      const newInboxes = result.data.filter((inbox) => inbox.isRead === false);
      if (newInboxes.length > 0) {
        setNotify(true);
      } else {
        setNotify(false);
      }
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  const openInboxMutation = UseRequest({
    onSuccess: () => {
      setNotify(false);
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    getNotificationMutation.mutate({
      route: "user/inbox",
      method: "GET",
    });

    // THIS INTERVAL IS TEMPORARY UNTILL SOCKETS ARE ADDED
    const interval = setInterval(() => {
      getNotificationMutation.mutate({
        route: "user/inbox",
        method: "GET",
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleProfile = () => {
    navigate(QueryParamHandler.UpdateParam("profile", 1));
  };

  const handleQuickIssue = () => {
    navigate(QueryParamHandler.UpdateParam("new_issue", 1));
  };

  return (
    <div className={C.NavBar}>
      <aside>
        <Button
          label={"QUICK-ISSUE"}
          style={{ height: "33px", padding: "0.85rem", fontSize: "0.7rem" }}
          onMouseDown={handleQuickIssue}
        />
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
                inboxes={inboxes}
                setInboxes={setInboxes}
                {...props}
              />
            )}
            backDropOpacity={0}
            withBackDrop={false}
          >
            <Button
              icon={SvgHandler.Notification({ width: "13px" })}
              theme={notify ? buttonThemes.Blue : buttonThemes.LightGray}
              style={{ width: "40px", height: "36px" }}
              onMouseUp={() => {
                if (notify) {
                  openInboxMutation.mutate({
                    route: "user/inbox/open",
                    method: "GET",
                  });
                }
              }}
            />
          </WithDropMenu>

          <div className={C.Line}></div>

          <div className={C.Profile} onClick={handleProfile}>
            {user?.avatar ? (
              <img src={user.avatar} />
            ) : (
              <Skeleton
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </div>
        </span>
      </aside>
    </div>
  );
}

export default NavBar;
