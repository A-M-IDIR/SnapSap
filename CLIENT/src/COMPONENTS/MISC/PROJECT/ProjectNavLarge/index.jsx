import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import ProjectNavInfo from "@/COMPONENTS/MISC/PROJECT/ProjectNavInfo";
import NavLink from "@/COMPONENTS/SHARED/NavLink";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function ProjectNavLarge() {
  const [selected, setSelected] = React.useState(null);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);

  const handleClick = (section) => {
    setSelected(section);
    navigate(`/project?id=${queryParams.get("id")}&section=${section}`);
  };

  React.useEffect(() => {
    setSelected(queryParams.get("section"));
  }, []);

  return (
    <div className={C.ProjectNavLarge}>
      <ProjectNavInfo
        category="N.Z.T"
        project="SnapSap"
        imageUrl="https://images.unsplash.com/photo-1705447551093-7f1f038a313b?q=80&w=2039&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <section>
        <NavLink
          icon={SvgHandler.BackLog()}
          id={"backlog"}
          label={"BackLog"}
          action={handleClick}
          selectedLinkId={selected}
        />

        <NavLink
          icon={SvgHandler.Board()}
          id={"board"}
          label={"Board"}
          action={handleClick}
          selectedLinkId={selected}
        />

        <NavLink
          icon={SvgHandler.Settings()}
          id={"settings"}
          label={"Settings"}
          action={handleClick}
          selectedLinkId={selected}
        />
      </section>
    </div>
  );
}
export default ProjectNavLarge;
