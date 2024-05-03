import React from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import NavLink from "@/COMPONENTS/SHARED/NavLink";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

import C from "./style.module.scss";

function SideBar() {
  const [selected, setSelected] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (QueryParamHandler.GetParam("section")) {
      setSelected(QueryParamHandler.GetParam("section"));
    }
  }, [QueryParamHandler.GetParam("section")]);

  const handleNavigate = (id) => {
    navigate(`/home?section=${id}`);
  };

  return (
    <motion.div
      exit={
        QueryParamHandler.GetParam("out") === "true"
          ? {}
          : {
              backgroundColor: "#074db5",
              borderRight: "2px solid #074db5",
              transition: { delay: 0.3 },
            }
      }
      className={C.SideBar}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={C.Logo}
      >
        {SvgHandler.SnapSapLogo()}
      </motion.div>

      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <NavLink
          id={"projects"}
          icon={SvgHandler.Bolt({ width: "15px" })}
          style={{ width: "38px", height: "38px" }}
          action={handleNavigate}
          selectedLinkId={selected}
          indicator={true}
        />

        <WithLabel
          label={"COMING-SOON"}
          isBottom={true}
          labelStyle={{
            top: "11px",
            left: "85px",
            backgroundColor: "rgb(255, 185, 0)",
            color: "black",
            fontWeight: "600",
          }}
        >
          <NavLink
            id={"archives"}
            icon={SvgHandler.Archive({ width: "15px" })}
            style={{ width: "38px", height: "38px", cursor: "not-allowed" }}
            action={() => {}}
            selectedLinkId={selected}
            indicator={true}
          />
        </WithLabel>
      </motion.aside>
    </motion.div>
  );
}

export default SideBar;
