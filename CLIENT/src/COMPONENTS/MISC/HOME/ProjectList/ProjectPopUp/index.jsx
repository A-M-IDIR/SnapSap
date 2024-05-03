import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Selector from "@/COMPONENTS/SHARED/Selector";
import DescriptionInput from "@/COMPONENTS/SHARED/DescriptionInput";
import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import ImageBrowser from "@/COMPONENTS/SHARED/ImageBrowser";
import ImageUploader from "@/COMPONENTS/SHARED/ImageUploader";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import WithSectionLabel from "@/RESOURCES/HOCS/WithSectionLabel";
import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { addProject } from "@/CONTEXT/MISC/HOME/ProjectListSlice";
import { states } from "@/RESOURCES/CONSTANTS/Project";

import C from "./style.module.scss";

function ProjectPopUp() {
  const groups = useSelector((state) => state.groupSlice.value);
  const [newProject, setNewProject] = React.useState({
    stateId: states.WAITING._id,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const addProjectMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(addProject(result.data));
      navigate(QueryParamHandler.RemoveParam("new"));

      AlertHandler({ dispatch, message: "Added !", type: "success" });
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  /******************** REQUESTS ********************/

  const handleChange = (key, value) => {
    const updatedProject = { ...newProject };

    if (value === "") {
      delete updatedProject[key];
    } else {
      updatedProject[key] = value;
    }

    setNewProject(updatedProject);
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (validate(dispatch, newProject.projectName, newProject.projectTag)) {
      addProjectMutation.mutate({
        route: "project",
        method: "POST",
        load: newProject,
      });
    }
  };

  const handleCancle = () => navigate(QueryParamHandler.RemoveParam("new"));

  return (
    <form className={C.ProjectPopUp} onSubmit={handleConfirm}>
      <div className={C.Header}>
        <div className={C.Banner}>
          <img src={newProject.projectBanner} style={{ width: "100%" }} />
        </div>

        <div className={C.ProjectImage}>
          <ImageUploader
            onChange={(downloadURL) =>
              handleChange("projectImage", downloadURL)
            }
            image={newProject.projectImage}
            fileKey={"NEW_PROJECT_IMAGE"}
            contentStyle={{ zIndex: "15px" }}
            imageStyle={{ width: "100%", height: "100%" }}
          />
        </div>

        <div
          className={C.Actions}
          style={{
            position: "absolute",
            left: "10px",
            bottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <WithDropMenu
            DropMenu={(props) => (
              <ImageBrowser
                style={{
                  position: "absolute",
                  bottom: "-5px",
                  transform: "translate(0, 100%)",
                  zIndex: "500",
                }}
                onChange={(value) =>
                  handleChange("projectBanner", value.urls.regular)
                }
                {...props}
              />
            )}
            withBackDrop={true}
            backDropOpacity={0}
          >
            <Button
              icon={SvgHandler.Pen({ width: "12px" })}
              style={{ width: "30px", height: "30px" }}
              theme={buttonThemes.LightGray}
              type="button"
            />
          </WithDropMenu>

          <WithLabel
            label={"GROUP"}
            isBottom={true}
            labelStyle={{ top: "40px" }}
          >
            <Selector
              elements={groups}
              label={"label"}
              value={"_id"}
              defaultValue={[]}
              allowClear
              placeholder="-"
              variant="filled"
              style={{
                width: "120px",
                height: "30px",
                borderRadius: "0.2rem",
              }}
              className={C.GroupSelect}
              onChange={(value) => handleChange("group", value)}
            />
          </WithLabel>
        </div>
      </div>

      <div className={C.Content}>
        <aside>
          <WithSectionLabel label={"TITLE"}>
            <input
              className={C.FieldInput}
              onChange={(e) => handleChange("projectName", e.target.value)}
              required={true}
              spellCheck={false}
            />
          </WithSectionLabel>

          <WithSectionLabel label={"TAG"}>
            <input
              className={C.FieldInput}
              style={{ textTransform: "uppercase" }}
              onChange={(e) => handleChange("projectTag", e.target.value)}
              spellCheck={false}
            />
          </WithSectionLabel>
        </aside>

        <WithSectionLabel label={"ABOUT"}>
          <DescriptionInput
            onChange={(description) => {
              handleChange("description", description);
            }}
          />
        </WithSectionLabel>
      </div>

      <div className={C.Footer}>
        <Button
          label={"CANCLE"}
          theme={buttonThemes.LightGray}
          style={{ height: "34px" }}
          onMouseUp={handleCancle}
          type="button"
        />

        <Button type="submit" label={"CREATE"} style={{ height: "34px" }} />
      </div>
    </form>
  );
}

// THIS IS TEMPORARY
const validate = (dispatch, projectName, projectTag) => {
  if (projectName.length < 4) {
    AlertHandler({ dispatch, message: "Title Too Short.", type: "warning" });

    return false;
  }

  if (projectName.length > 12) {
    AlertHandler({ dispatch, message: "Title Too Long.", type: "warning" });

    return false;
  }

  if (projectTag?.length <= 2) {
    AlertHandler({ dispatch, message: "Tag Is Too Short.", type: "warning" });

    return false;
  }

  if (projectTag?.length > 6) {
    AlertHandler({ dispatch, message: "Tag Is Too Long.", type: "warning" });

    return false;
  }

  return true;
};

export default ProjectPopUp;
