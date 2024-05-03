import React from "react";

import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import BackLogList from "../BackLogList";

import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

import C from "./style.module.scss";

function Sprints({ logs, open, issues }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={C.Sprints}
    >
      <AnimatePresence mode="wait">
        {open && logs.slice(1).length > 0 && (
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            exit={{ y: -5, opacity: 0 }}
            className={C.Container}
            key={"SPRINTS"}
          >
            <AnimatePresence mode="sync">
              {logs.slice(1).map((e, i) => (
                <BackLogList
                  {...e}
                  issues={issues[e.label]}
                  key={e._id}
                  animationDelay={{
                    enter: i * 0.05 + 0.35,
                    exit: i * 0.05,
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {open && logs.slice(1).length === 0 && (
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            exit={{ y: -5, opacity: 0 }}
            key={"EMPTY"}
          >
            <Empty
              description={false}
              image={
                "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              }
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                height: "250px",
                userSelect: "none",
              }}
            >
              <Button
                label={"CREATE-NOW"}
                style={{
                  fontSize: "0.7rem",
                  height: "30px",
                  padding: "0 0.8rem",
                }}
                theme={buttonThemes.LightGray}
                onMouseUp={() =>
                  navigate(QueryParamHandler.UpdateParam("sprint", "new"))
                }
              />
            </Empty>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Sprints;
