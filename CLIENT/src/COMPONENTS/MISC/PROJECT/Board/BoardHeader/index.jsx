import React from "react";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import PageInfo from "@/COMPONENTS/SHARED/PageInfo";
import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import WithCopy from "@/RESOURCES/HOCS/WithCopy";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

import C from "./style.module.scss";

function BoardHeader() {
  const project = useSelector((state) => state.projectSlice.value);

  const queryParams = new URLSearchParams(location.search);

  return (
    <div className={C.BoardHeader}>
      <div className={C.Holder}>
        <div className={C.Banner}>
          <img src={project.projectBanner} style={{ width: "100%" }} />
        </div>

        <PageInfo
          label={`${project ? project.projectTag : "-"} BOARD`}
          links={[
            { label: "Projects", path: "/home" },
            {
              label: "SnapSap",
              path: QueryParamHandler.UpdateParam("settings", "edit"),
            },
            {
              label: "Board",
              path: `/project?id=${queryParams.get("id")}&section=board`,
            },
          ]}
        />

        <WithCopy
          content={`${document.location.origin}/home?section=projects&join=${project._id}`}
        >
          <WithLabel
            isBottom={true}
            label={"INVITE LINK !"}
            labelStyle={{
              top: "40px",
              backgroundColor: "rgb(255, 185, 0)",
              color: "black",
              fontWeight: "700",
              fontSize: "0.6rem",
            }}
          >
            <motion.div
              as={motion.div}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ ease: [0.8, 0, 0, 1], duration: 0.4 }}
            >
              <Button
                icon={SvgHandler.Copy({
                  width: "14px",
                })}
                style={{ zIndex: "5", width: "50px", height: "30px" }}
                theme={buttonThemes.Yellow}
              />
            </motion.div>
          </WithLabel>
        </WithCopy>
      </div>
    </div>
  );
}

export default BoardHeader;
