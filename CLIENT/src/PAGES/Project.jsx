import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import ActionBar from "@/COMPONENTS/MISC/PROJECT/ActionBar";
import ProjectNav from "@/COMPONENTS/MISC/PROJECT/ProjectNav";
import Profile from "@/COMPONENTS/SHARED/Profile";
import QuickIssue from "@/COMPONENTS/SHARED/QuickIssue";
import Board from "@/COMPONENTS/MISC/PROJECT/Board";
import Sprint from "@/COMPONENTS/MISC/PROJECT/Sprint";
import Task from "@/COMPONENTS/MISC/PROJECT/Task";
import BackLog from "@/COMPONENTS/MISC/PROJECT/BackLog";
import Settings from "@/COMPONENTS/MISC/PROJECT/Settings";

import WithView from "@/RESOURCES/HOCS/WithView";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { setProject } from "@/CONTEXT/MISC/PROJECT/ProjectSlice";

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

    .SectionWrapper {
      overflow: hidden;

      width: 100%;
      height: 100%;
    }

    @media screen and (max-width: 1000px) {
      flex-direction: column;
    }
  }
`;

function Project() {
  const [section, setSection] = React.useState(null);
  const project = useSelector((state) => state.projectSlice.value);

  const sections = {
    backlog: <BackLog key={"BACK_LOG"} />,
    board: <Board key={"BOARD"} />,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const getProjectMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(setProject(result.data));
    },
    onError: (error) => {
      navigate("/home");

      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    if (!QueryParamHandler.GetParam("id")) {
      navigate("/home");

      return;
    }

    if (!QueryParamHandler.GetParam("section")) {
      navigate(
        `/project?id=${QueryParamHandler.GetParam("id")}&section=backlog`
      );

      return;
    }

    setSection(QueryParamHandler.GetParam("section"));
    getProjectMutation.mutate({
      route: `project/filter`,
      method: "POST",
      load: {
        projectId: QueryParamHandler.GetParam("id"),
      },
    });
  }, [QueryParamHandler.GetParam("section"), QueryParamHandler.GetParam("id")]);

  React.useEffect(() => {
    if (QueryParamHandler.GetParam("refetch")) {
      getProjectMutation.mutate({
        route: `project/filter`,
        method: "POST",
        load: {
          projectId: QueryParamHandler.GetParam("id"),
        },
      });
      navigate(QueryParamHandler.RemoveParam("refetch"));
    }
  }, [QueryParamHandler.GetParam("refetch")]);

  React.useEffect(() => {
    // THIS INTERVAL IS TEMPORARY UNTILL SOCKETS ARE ADDED
    const interval = setInterval(() => {
      getProjectMutation.mutate({
        route: `project/filter`,
        method: "POST",
        load: {
          projectId: QueryParamHandler.GetParam("id"),
        },
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledProject>
      <Helmet>
        {section && project && (
          <title>
            {project?.projectTag?.toUpperCase()} - {section?.toUpperCase()}
          </title>
        )}
      </Helmet>

      <ActionBar />

      {project && (
        <>
          <div className="ProjectContent">
            <ProjectNav />

            <motion.div
              className="SectionWrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatePresence mode="wait">
                {section && sections[section]}
              </AnimatePresence>
            </motion.div>
          </div>

          <WithView viewKey={"settings"} style={{ padding: "30px" }}>
            <Settings />
          </WithView>

          <WithView viewKey={"task"} style={{ padding: "4rem 2rem" }}>
            <Task />
          </WithView>

          <WithView viewKey={"sprint"}>
            <Sprint />
          </WithView>
        </>
      )}

      <WithView viewKey={"profile"} style={{ padding: "30px" }}>
        <Profile />
      </WithView>

      <WithView viewKey={"new_issue"} style={{ padding: "30px" }}>
        <QuickIssue />
      </WithView>
    </StyledProject>
  );
}

export default Project;
