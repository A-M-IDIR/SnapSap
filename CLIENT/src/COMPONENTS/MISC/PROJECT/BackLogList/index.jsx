import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import Button from "@/COMPONENTS/SHARED/Button";
import BackLogTask from "@/COMPONENTS/MISC/PROJECT/BackLogTask";

import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";
import WithPopUp from "@/RESOURCES/HOCS/WithPopUp";
import WithDrop from "@/RESOURCES/HOCS/WithDrop";
import WithDrag from "@/RESOURCES/HOCS/WithDrag";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function BackLogList(props) {
  const { label, logs, isLog } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const LightGrayButtonArgs = {
    idle: {
      backgroundColor: "rgb(240, 240, 240)",
      color: "rgb(150,150,150)",
      iconColor: "rgb(150,150,150)",
    },
    hover: {
      backgroundColor: "rgb(235,235,235)",
      color: "rgb(100,100,100)",
      iconColor: "rgb(140,140,140)",
    },
    active: {
      backgroundColor: "rgb(238,238,238)",
    },
  };

  const LightGrayBorderButtonArgs = {
    idle: {
      backgroundColor: "rgb(240, 240, 240)",
      color: "rgb(150,150,150)",
      iconColor: "rgb(150,150,150)",
      border: "1.55px solid white",
    },
    hover: {
      backgroundColor: "rgb(235,235,235)",
      color: "rgb(100,100,100)",
      iconColor: "rgb(140,140,140)",
      borderColor: "rgb(170, 170, 255)",
    },
    active: {
      backgroundColor: "rgb(238,238,238)",
    },
  };

  React.useEffect(() => {
    if (isLog) {
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }
  }, []);

  return (
    <div className={C.BackLogList}>
      <div
        className={C.Header}
        style={
          isOpen
            ? { borderColor: "rgb(240,240,240)" }
            : { borderColor: "rgb(240,240,240)" }
        }
      >
        <aside>
          {!isLog && (
            <Button
              icon={
                isOpen
                  ? SvgHandler.CaretDown({
                      marginBottom: "0.1rem",
                      width: "10px",
                    })
                  : SvgHandler.CaretUp({
                      transform: "rotate(90deg)",
                      width: "10px",
                      marginRight: "0.08rem",
                    })
              }
              style={{ height: "32px" }}
              theme={LightGrayBorderButtonArgs}
              action={() => setIsOpen(!isOpen)}
            />
          )}

          <sub>
            <p className={C.Label}>{isLog ? "BACK-LOG" : label}</p>

            <p className={C.Counter}>{logs.length}</p>
          </sub>
        </aside>

        <aside>
          {!isLog && (
            <Button label={"START-SPRINT"} style={{ height: "32px" }} />
          )}

          <WithDropMenu DropMenu={() => <></>}>
            <Button
              icon={SvgHandler.MenuDots()}
              style={{ height: "32px" }}
              theme={LightGrayButtonArgs}
            />
          </WithDropMenu>
        </aside>
      </div>

      <motion.div
        className={C.Logs}
        initial={{ height: 0 }}
        animate={isOpen ? { height: "max-content" } : { height: 0 }}
        transition={{ ease: [0.8, 0, 0, 0.8], duration: 0.3 }}
      >
        <WithDrop droppableId={label} type="GROUP">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"CONTAINER"}
                className={C.Container}
              >
                {logs.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={C.Empty}
                  >
                    THIS LOG IS EMPTY
                  </motion.p>
                ) : (
                  logs
                    .sort((a, b) => a.index - b.index)
                    .map((e, i) => (
                      <WithDrag
                        draggableId={`${label}_LOG_${i}`}
                        index={i}
                        key={i}
                      >
                        {(snapshot) => (
                          <BackLogTask
                            i={i}
                            isDragging={snapshot.isDragging}
                            {...e}
                          />
                        )}
                      </WithDrag>
                    ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </WithDrop>
      </motion.div>

      <footer style={isOpen ? { borderColor: "rgb(240,240,240)" } : {}}>
        <WithPopUp PopElement={() => <></>}>
          <Button
            label={"ADD-ISSUE"}
            icon={SvgHandler.Plus({ width: "11px" })}
            style={{
              width: "120px",
              height: "34px",
            }}
            theme={LightGrayButtonArgs}
          />
        </WithPopUp>
      </footer>
    </div>
  );
}

BackLogList.defaultProps = {
  logs: [],
};

export default BackLogList;
