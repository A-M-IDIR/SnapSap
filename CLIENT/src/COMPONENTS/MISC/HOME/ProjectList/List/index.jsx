import React from "react";

import _ from "underscore";
import { Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import ProjectCard from "@/COMPONENTS/MISC/HOME/ProjectList/ProjectCard";

import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { setProjectList } from "@/CONTEXT/MISC/HOME/ProjectListSlice";

import C from "./style.module.scss";

function List() {
  const projects = useSelector((state) => state.projectListSlice.value);
  const [rendered, setRendered] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************** REQUESTS ********************/
  const getProjectsMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(setProjectList(result.data));
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });

  const filterProjectMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(setProjectList(result.data));
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    getProjectsMutation.mutate({
      route: "project",
      method: "GET",
    });

    // THIS INTERVAL IS TEMPORARY UNTILL SOCKETS ARE ADDED
    const interval = setInterval(() => {
      if (
        QueryParamHandler.GetParam("search") ||
        QueryParamHandler.GetParam("group")
      ) {
        return;
      }

      getProjectsMutation.mutate({
        route: "project",
        method: "GET",
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    let filter = {
      projectName: null,
      group: null,
    };

    if (!rendered) {
      setRendered(true);

      return;
    }

    if (!QueryParamHandler.GetParam("search")) {
      delete filter["projectName"];
    } else {
      filter["projectName"] = QueryParamHandler.GetParam("search");
    }

    if (!QueryParamHandler.GetParam("group")) {
      delete filter["group"];
    } else {
      filter["group"] = QueryParamHandler.GetParam("group").split(",");
    }

    filterProjectMutation.mutate({
      route: "project/filter",
      load: filter,
      method: "POST",
    });
  }, [
    QueryParamHandler.GetParam("search"),
    QueryParamHandler.GetParam("group"),
  ]);

  const handleNewProject = () => {
    navigate(QueryParamHandler.UpdateParam("new", 1));
  };

  return (
    <div className={C.List}>
      <div className={C.Label}>
        <div className={C.Icon}>{SvgHandler.Bolt()}</div>

        <p>PROJECTS</p>
      </div>

      <AnimatePresence mode="wait">
        {projects?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ ease: [0.8, 0, 0, 1], duration: 0.3 }}
            className={C.ListContent}
            key={"PROJECTS"}
          >
            <AnimatePresence mode="popLayout">
              {projects.map((e, i) => (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { ease: [0.8, 0, 0, 1], delay: i * 0.1 },
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                    transition: { ease: [0.8, 0, 0, 1] },
                  }}
                  key={e._id}
                  layout
                >
                  <ProjectCard {...e} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {projects?.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -5,
            }}
            transition={{ ease: [0.8, 0, 0, 1], duration: 0.3 }}
            key={"EMPTY"}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              height: "250px",
            }}
          >
            <Empty
              description={false}
              image={
                "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              }
            ></Empty>

            <Button
              label={"CREATE-NOW"}
              style={{
                fontSize: "0.7rem",
                height: "30px",
                padding: "0 0.8rem",
              }}
              theme={buttonThemes.LightGray}
              onMouseUp={handleNewProject}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default List;
