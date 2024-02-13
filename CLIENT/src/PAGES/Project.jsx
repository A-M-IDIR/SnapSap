import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { ProjectLayout } from "@/COMPONENTS/LAYOUT/ProjectLayout";

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
    backlog: <ProjectLayout.BackLogSkeleton />,
    board: <ProjectLayout.BoardSkeleton />,
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
      <ProjectLayout.ActionBarSkeleton />

      <div className="ProjectContent">
        <ProjectLayout.ProjectNavLargeSkeleton />

        <ProjectLayout.ProjectNavSmallSkeleton />

        {sections[section]}
      </div>
    </StyledProject>
  );
}

export default Project;
