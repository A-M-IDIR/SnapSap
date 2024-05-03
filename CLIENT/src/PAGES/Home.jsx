import React from "react";

import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import SideBar from "@/COMPONENTS/MISC/HOME/SideBar";
import NavBar from "@/COMPONENTS/MISC/HOME/NavBar";
import ProjectList from "@/COMPONENTS/MISC/HOME/ProjectList";
import Profile from "@/COMPONENTS/SHARED/Profile";
import QuickIssue from "@/COMPONENTS/SHARED/QuickIssue";

import WithView from "@/RESOURCES/HOCS/WithView";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { setProject } from "@/CONTEXT/MISC/PROJECT/ProjectSlice";
import { setProjectList } from "@/CONTEXT/MISC/HOME/ProjectListSlice";
import { setGroups } from "@/CONTEXT/MISC/HOME/GroupSlice";

const StyledHome = styled.div`
  overflow: hidden;

  display: flex;
  justify-content: space-between;

  width: 100vw;
  height: 100dvh;

  profile-select: none;

  section {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    width: 100%;
    height: 100%;
    max-height: 100%;
  }
`;

function Home() {
  const [section, setSection] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sections = {
    projects: <ProjectList key={"PROJECTS"} />,
  };

  /******************** REQUESTS ********************/
  const sendProjectRequest = UseRequest({
    onSuccess: () => {
      navigate(QueryParamHandler.RemoveParam("join"));
      AlertHandler({
        dispatch,
        message: "Request Sent !",
        type: "success",
        duration: 2,
      });
    },
    onError: (error) => {
      navigate(QueryParamHandler.RemoveParam("join"));

      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    if (!QueryParamHandler.GetParam("section")) {
      navigate("/home?section=projects");

      return;
    }

    setSection(QueryParamHandler.GetParam("section"));
  }, [QueryParamHandler.GetParam("section")]);

  React.useEffect(() => {
    if (QueryParamHandler.GetParam("join")) {
      sendProjectRequest.mutate({
        route: "project/join",
        method: "POST",
        load: {
          projectId: QueryParamHandler.GetParam("join"),
        },
      });
    }
  }, [QueryParamHandler.GetParam("join")]);

  React.useEffect(() => {
    dispatch(setProject(null));
    dispatch(setGroups([]));
    dispatch(setProjectList(null));
  }, []);

  return (
    <StyledHome>
      <Helmet>{section && <title>{section.toUpperCase()}</title>}</Helmet>

      <SideBar />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <NavBar />

        <AnimatePresence mode="wait">{sections[section]}</AnimatePresence>
      </motion.section>

      <WithView viewKey={"profile"} style={{ padding: "30px" }}>
        <Profile />
      </WithView>

      <WithView viewKey={"new_issue"} style={{ padding: "30px" }}>
        <QuickIssue />
      </WithView>
    </StyledHome>
  );
}

export default Home;
