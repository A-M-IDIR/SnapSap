import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";

import State from "./State";
import Skeleton from "@/COMPONENTS/SHARED/Skeleton";
import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { setProjectList } from "@/CONTEXT/MISC/HOME/ProjectListSlice";

import C from "./style.module.scss";

function ProjectCard({ _id, projectName, projectImage, lead, state }) {
  const projects = useSelector((state) => state.projectListSlice.value);
  const [projectDetails, setProjectDetails] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const deleteProjectMutation = UseRequest({
    onSuccess: () => {
      let updatedProjects = [...projects];
      updatedProjects = updatedProjects.filter((e) => e._id != _id);

      dispatch(setProjectList(updatedProjects));
      AlertHandler({ dispatch, message: "Deleted !", type: "success" });
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  const getDetailsMutation = UseRequest({
    onSuccess: (result) => {
      setProjectDetails(result.data);
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    getDetailsMutation.mutate({
      route: `project/detail?projectId=${_id}`,
      method: "GET",
    });
  }, []);

  const handleNavigate = (section) => {
    navigate(`/project?id=${_id}&section=${section}`);
  };

  const handleDelete = () =>
    deleteProjectMutation.mutate({
      route: `project`,
      method: "DELETE",
      load: {
        projectId: _id,
      },
    });

  return (
    <div className={C.ProjectCard}>
      <div className={C.HitBox} onClick={() => handleNavigate("backlog")}></div>

      <div className={C.SideOutline}></div>

      <div className={C.Main}>
        <div className={C.Title}>
          <aside>
            <p>{projectName}</p>

            <span></span>

            <div
              className={C.ProjectImage}
              onClick={() => handleNavigate("settings")}
            >
              {projectImage ? (
                <img
                  src={projectImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: "0.8",
                  }}
                />
              ) : (
                <Skeleton style={{ width: "100%", height: "100%" }} />
              )}
            </div>
          </aside>

          <WithLabel
            isBottom={true}
            label={
              lead._id === JSON.parse(localStorage.getItem("user"))._id
                ? "DELETE"
                : "LEAVE"
            }
            style={{ zIndex: 5 }}
            labelStyle={{
              backgroundColor: "rgb(255, 185, 0)",
              color: "black",
              fontWeight: "600",
              fontSize: "0.55rem",
              top: "30px",
            }}
          >
            <Button
              icon={SvgHandler.Bin({ width: "10px" })}
              style={{ width: "24px", height: "24px", marginRight: "-0.2rem" }}
              theme={buttonThemes.LightGray}
              onMouseUp={handleDelete}
            />
          </WithLabel>
        </div>

        <div className={C.Links}>
          <p className={C.Label}>QUICK LINKS</p>

          <WithLabel
            isBottom={true}
            label={"BACKLOG"}
            labelStyle={{ top: "25px", fontSize: "0.55rem" }}
          >
            <div className={C.Link} onMouseUp={() => handleNavigate("backlog")}>
              <p>Sprints</p>

              <p>{projectDetails ? projectDetails.logs.length - 1 : "-"}</p>
            </div>
          </WithLabel>

          <WithLabel
            isBottom={true}
            label={"BOARD"}
            labelStyle={{ top: "25px", fontSize: "0.55rem" }}
          >
            <div className={C.Link} onMouseUp={() => handleNavigate("board")}>
              <p>Issues</p>

              <p>{projectDetails ? projectDetails.issues.length : "-"}</p>
            </div>
          </WithLabel>
        </div>
      </div>

      <div className={C.More}>
        <WithLabel
          isBottom={true}
          label={"STATE"}
          style={{ zIndex: 5 }}
          labelStyle={{ top: "28px", fontSize: "0.55rem" }}
        >
          <State state={state} lead={lead} projectId={_id} />
        </WithLabel>

        <WithLabel
          isBottom={true}
          label={"LEAD"}
          style={{ zIndex: 5 }}
          labelStyle={{ top: "30px", fontSize: "0.55rem" }}
        >
          <div className={C.ProjectLead}>
            {lead?.avatar ? (
              <img src={lead.avatar} />
            ) : (
              <Skeleton style={{ width: "100%", height: "100%" }} />
            )}
          </div>
        </WithLabel>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  _id: propTypes.string.isRequired,
  projectName: propTypes.string.isRequired,
  ProjectImage: propTypes.string,
  state: propTypes.shape({
    label: propTypes.string.isRequired,
  }).isRequired,
  lead: propTypes.shape({
    avatar: propTypes.string,
  }).isRequired,
};

export default ProjectCard;
