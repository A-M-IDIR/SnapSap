import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import BackLogTask from "@/COMPONENTS/MISC/PROJECT/BackLog/BackLogTask";
import SprintControls from "./SprintControls";
import LogMenu from "./LogMenu";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";
import WithDrop from "@/RESOURCES/HOCS/WithDrop";
import WithDrag from "@/RESOURCES/HOCS/WithDrag";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { setIssues } from "@/CONTEXT/MISC/PROJECT/IssueSlice";

import C from "./style.module.scss";

function BackLogList({
  _id,
  label,
  state,
  endDate,
  isMain,
  issues,
  animationDelay,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [canDrop, setCanDrop] = React.useState(false);
  const [isDue, setIsDue] = React.useState(false);
  const globalIssues = useSelector((state) => state.issueSlice.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************** REQUESTS ********************/
  const addNewIssueMutation = UseRequest({
    onSuccess: (result) => {
      let updatedIssues = { ...globalIssues };

      if (updatedIssues[label]) {
        updatedIssues = {
          ...updatedIssues,
          [label]: [...updatedIssues[label], result.data],
        };
      } else {
        updatedIssues[label] = [result.data];
      }

      dispatch(setIssues(updatedIssues));

      AlertHandler({ dispatch, message: "Added !", type: "success" });
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    if (isMain) {
      setIsOpen(true);

      return;
    }
  }, []);

  React.useEffect(() => {
    if (!QueryParamHandler.GetParam("drag")) {
      setCanDrop(false);
    }
  }, [QueryParamHandler.GetParam("drag")]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const dateToCompare = new Date(endDate);
      const currentDate = new Date();

      if (currentDate >= dateToCompare) {
        setIsDue(true);
      } else {
        setIsDue(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={
        !canDrop
          ? {
              opacity: 1,
              y: 0,
              transition: { delay: animationDelay.enter },
            }
          : { opacity: 1, y: 0, outlineColor: "#074db550" }
      }
      exit={{
        opacity: 0,
        y: -5,
        transition: {
          delay: animationDelay.exit,
          ease: [0.8, 0, 0, 1],
          duration: 0.3,
        },
      }}
      layout="preserve-aspect"
      className={C.BackLogList}
    >
      <div className={C.Header}>
        <aside>
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
            theme={buttonThemes.LightGrayBordered}
            onMouseUp={() => setIsOpen(!isOpen)}
          />

          <sub>
            <p className={C.Label}>{isMain ? "BACK-LOG" : label}</p>

            <p className={C.Counter}>{issues.length}</p>
          </sub>
        </aside>

        {!isMain && (
          <aside>
            <AnimatePresence>
              {state.label === "STARTED" && isDue && (
                <WithLabel
                  label={"EXCEEDED THE DEADLINE !"}
                  isBottom={true}
                  labelStyle={{
                    top: "40px",
                    backgroundColor: "rgb(255, 185, 0)",
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  <motion.p
                    className={C.Label}
                    style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                    onClick={() =>
                      navigate(QueryParamHandler.UpdateParam("sprint", _id))
                    }
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                  >
                    {SvgHandler.Alert({ width: "18px" })}
                  </motion.p>
                </WithLabel>
              )}
            </AnimatePresence>

            <SprintControls state={state} logId={_id} />

            <WithDropMenu
              DropMenu={(props) => <LogMenu {...props} logId={_id} />}
              withBackDrop={false}
            >
              <Button
                icon={SvgHandler.MenuDots()}
                style={{ height: "32px" }}
                theme={buttonThemes.LightGray}
              />
            </WithDropMenu>
          </aside>
        )}
      </div>

      <motion.div
        className={C.Logs}
        animate={isOpen ? { height: "max-content" } : { height: 0 }}
        transition={{ ease: [0.8, 0, 0, 1], duration: 0.3 }}
        onMouseEnter={() => {
          if (QueryParamHandler.GetParam("drag")) {
            setCanDrop(true);
          }
        }}
        onMouseLeave={() => setCanDrop(false)}
      >
        <WithDrop
          droppableId={label}
          type="GROUP"
          placeHolder={issues?.length === 0 ? false : true}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className={C.Container}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"CONTAINER"}
              >
                {issues.length === 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={C.Empty}
                  >
                    {SvgHandler.EmptyInbox({ width: "33px" })}
                  </motion.p>
                )}

                {issues.map((e, i) => (
                  <WithDrag draggableId={e._id} index={i} key={e._id}>
                    {(snapshot) => (
                      <BackLogTask isDragging={snapshot.isDragging} {...e} />
                    )}
                  </WithDrag>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </WithDrop>
      </motion.div>

      <footer style={isOpen ? { borderColor: "rgb(240,240,240)" } : {}}>
        <Button
          label={"ADD-ISSUE"}
          icon={SvgHandler.Plus({ width: "11px" })}
          theme={buttonThemes.LightGray}
          style={{
            width: "120px",
            height: "34px",
          }}
          onMouseUp={() =>
            addNewIssueMutation.mutate({
              route: "issue",
              method: "POST",
              load: {
                projectId: QueryParamHandler.GetParam("id"),
                logId: _id,
                summary: "-",
              },
            })
          }
        />
      </footer>
    </motion.div>
  );
}

BackLogList.defaultProps = {
  label: "-",
  issues: [],
  isMain: false,
  animationDelay: { enter: 0, exit: 0 },
};

BackLogList.propTypes = {
  label: propTypes.string.isRequired,
  issues: propTypes.array,
  state: propTypes.shape({
    label: propTypes.string,
  }),
  isMain: propTypes.bool,
  animationDelay: propTypes.shape({
    enter: propTypes.number,
    exit: propTypes.number,
  }),
};

export default BackLogList;
