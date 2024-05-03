import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { setLogs } from "@/CONTEXT/MISC/PROJECT/LogSlice";

import C from "./style.module.scss";

function LogMenu({ logId, setIsDropMenu }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logSlice.value);

  const menuRef = React.useRef(null);

  const options = [
    {
      label: "EDIT-LOG",
      icon: SvgHandler.Pen({ width: "13px" }),
      onMouseUp: () => {
        navigate(QueryParamHandler.UpdateParam("sprint", logId));
      },
    },
    {
      label: "DELETE",
      icon: SvgHandler.Bin(),
      onMouseUp: () => {
        deleteLogMutation.mutate({
          route: `log?logId=${logId}`,
          method: "DELETE",
        });
      },
    },
  ];

  /******************** REQUESTS ********************/
  const deleteLogMutation = UseRequest({
    onSuccess: () => {
      setIsDropMenu(false);

      setTimeout(() => {
        dispatch(setLogs(logs.filter((e) => e._id != logId)));
      }, 200);

      AlertHandler({ dispatch, message: "Deleted !", type: "success" });
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    const handleMouseMove = () => {
      menuRef.current.focus();
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 800, damping: 30 }}
      className={C.LogMenu}
      ref={menuRef}
      tabIndex={0}
      onBlur={() => {
        setIsDropMenu(false);
      }}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      <AnimatePresence>
        {options.map((e, i) => (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(5px)" }}
            animate={{
              opacity: 1,
              transform: "translateY(0)",
              transition: { delay: i * 0.1 },
            }}
            key={i}
          >
            <Button
              {...e}
              style={{
                justifyContent: "flex-start",
                width: "100%",
                height: "34px",
                fontSize: "0.75rem",
              }}
              theme={buttonThemes.LightGray}
              onMouseUp={e.onMouseUp}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
export default LogMenu;
