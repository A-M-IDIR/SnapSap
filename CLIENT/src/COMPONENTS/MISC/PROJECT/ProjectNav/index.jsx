import React from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProjectNavInfo from "./ProjectNavInfo";
import NavLink from "@/COMPONENTS/SHARED/NavLink";

import UseResize from "@/RESOURCES/HOOKS/SHARED/UseResize";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

import C from "./style.module.scss";

function ProjectNav() {
  const project = useSelector((state) => state.projectSlice.value);
  const [selected, setSelected] = React.useState(null);
  const [coolDown, setCoolDown] = React.useState(false);

  const navigate = useNavigate();
  const { windowWidth } = UseResize();

  React.useEffect(() => {
    if (QueryParamHandler.GetParam("section")) {
      setSelected(QueryParamHandler.GetParam("section"));
    }
  }, [QueryParamHandler.GetParam("section")]);

  React.useEffect(() => {
    if (coolDown) {
      setTimeout(() => {
        setCoolDown(false);
      }, 1000);
    }
  }, [coolDown]);

  const handleClick = (section) => {
    if (!coolDown) {
      navigate(
        `/project?id=${QueryParamHandler.GetParam("id")}&section=${section}`
      );
    }

    setCoolDown(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateX(-40px)" }}
      animate={{
        opacity: 1,
        transform: "translateX(0px)",
      }}
      exit={{ opacity: 0, transform: "translateX(-40px)" }}
      transition={{ ease: [0.8, 0, 0, 1], duration: 0.3 }}
      className={C.ProjectNav}
    >
      {windowWidth > 1000 && (
        <ProjectNavInfo
          project={project.projectName}
          category={project.group?.label}
          imageUrl={project.projectImage}
        />
      )}

      <section>
        <aside>
          <NavLink
            icon={SvgHandler.BackLog()}
            id={"backlog"}
            label={"LOG"}
            action={handleClick}
            selectedLinkId={selected}
            indicator={windowWidth > 1000 && true}
            style={{ minWidth: "120px" }}
          />

          <NavLink
            icon={SvgHandler.Board()}
            id={"board"}
            label={"BOARD"}
            action={handleClick}
            selectedLinkId={selected}
            indicator={windowWidth > 1000 && true}
            style={{ minWidth: "120px" }}
          />
        </aside>
      </section>
    </motion.div>
  );
}
export default ProjectNav;
