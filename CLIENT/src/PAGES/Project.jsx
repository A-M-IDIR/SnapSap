import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { ProjectLayout } from "@/COMPONENTS/LAYOUT/ProjectLayout";
import ActionBar from "@/COMPONENTS/MISC/PROJECT/ActionBar";
import ProjectNavLarge from "@/COMPONENTS/MISC/PROJECT/ProjectNavLarge";
import BackLog from "@/COMPONENTS/MISC/PROJECT/BackLog";
import KanBan from "@/COMPONENTS/MISC/PROJECT/KanBan";

const StyledProject = styled.div`
  overflow: hidden;

  display: flex;

  width: 100vw;
  height: 100dvh;

  .ProjectContent {
    overflow: hidden;

    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 100%;
    min-height: 100%;

    @media screen and (max-width: 1000px) {
      flex-direction: column;
    }
  }
`;

function Project() {
  const [section, setSection] = React.useState(null);

  const sections = {
    backlog: <BackLog />,
    board: <KanBan />,
    settings: <ProjectLayout.ProjectSettingsSkeleton />,
  };

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);

  React.useEffect(() => {
    if (!queryParams.get("id")) {
      navigate("/home");

      return;
    }

    if (!queryParams.get("section")) {
      navigate(`/project?id=${queryParams.get("id")}&section=backlog`);

      return;
    }

    setSection(queryParams.get("section"));
  }, [queryParams.get("section"), queryParams.get("id")]);

  return (
    <StyledProject>
      <ActionBar />

      <div className="ProjectContent">
        <ProjectNavLarge />

        <ProjectLayout.ProjectNavSmallSkeleton />

        {sections[section]}
      </div>
    </StyledProject>
  );
}

export default Project;
