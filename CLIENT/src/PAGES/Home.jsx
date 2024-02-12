import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { HomeLayout } from "@/COMPONENTS/LAYOUT/HomeLayout";

const StyledHome = styled.div`
  overflow: hidden;

  display: flex;
  justify-content: space-between;

  width: 100vw;
  height: 100dvh;

  user-select: none;

  section {
    overflow: hidden;

    width: 100%;
    height: 100%;
    max-height: 100%;
  }
`;

function Home() {
  const [section, setSection] = React.useState(null);

  const sections = {
    projects: <HomeLayout.ProjectListSkeleton />,
    archives: <HomeLayout.ArchiveListSkeleton />,
    trash: <HomeLayout.TrashListSkeleton />,
  };

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);

  React.useEffect(() => {
    if (!queryParams.get("section")) {
      navigate("/home?section=projects");

      return;
    }

    setSection(queryParams.get("section"));
  }, [queryParams.get("section")]);

  return (
    <StyledHome>
      <HomeLayout.SideBarSkeleton />

      <section>
        <HomeLayout.NavBarSkeleton />

        {sections[section]}
      </section>
    </StyledHome>
  );
}

export default Home;
