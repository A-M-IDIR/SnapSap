import React from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import Skeleton from "@/COMPONENTS/SHARED/Skeleton";
import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

import WithPopUp from "@/RESOURCES/HOCS/WithPopUp";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

import C from "./style.module.scss";

function ActionBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate(QueryParamHandler.UpdateParam("profile", 1));
  };

  const handleQuickIssue = () => {
    navigate(QueryParamHandler.UpdateParam("new_issue", 1));
  };

  return (
    <motion.div
      exit={{
        backgroundColor: "#f4f5f7",
        borderRight: "1px solid #dcdcdc",
        transition: { delay: 0.3 },
      }}
      className={C.ActionBar}
    >
      <motion.div
        className={C.Holder}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <aside>
          <div className={C.Logo} onClick={() => navigate("/home")}>
            {SvgHandler.SnapSapLogoWhite()}
          </div>

          <sub>
            <Button
              icon={SvgHandler.Settings({ width: "22px" })}
              theme={buttonThemes.Clear}
              onMouseUp={() =>
                navigate(QueryParamHandler.UpdateParam("settings", "edit"))
              }
            />

            <Button
              icon={SvgHandler.Plus({ width: "16px" })}
              theme={buttonThemes.Clear}
              onMouseUp={handleQuickIssue}
            />
          </sub>
        </aside>

        <div className={C.Profile} onClick={handleProfile}>
          {user?.avatar ? (
            <img src={user.avatar} />
          ) : (
            <Skeleton
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#366AB6",
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ActionBar;
